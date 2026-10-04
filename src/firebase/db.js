import { db } from './config';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';

// Helper for local storage persistence fallback
const LOCAL_STORAGE_KEY_USERS = 'skillgap_users';
const LOCAL_STORAGE_KEY_SIMS = 'skillgap_simulations';

const getLocalUsers = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USERS) || '{}');
const setLocalUser = (uid, data) => {
  const users = getLocalUsers();
  users[uid] = { ...(users[uid] || {}), ...data };
  localStorage.setItem(LOCAL_STORAGE_KEY_USERS, JSON.stringify(users));
};

const getLocalSimulations = (uid) => {
  const allSims = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_SIMS) || '{}');
  return allSims[uid] || [];
};

const saveLocalSimulation = (uid, simData) => {
  const allSims = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_SIMS) || '{}');
  const userSims = allSims[uid] || [];
  
  // replace existing or add new
  const index = userSims.findIndex(s => s.simulationId === simData.simulationId);
  if (index >= 0) {
    userSims[index] = simData;
  } else {
    userSims.unshift(simData);
  }
  
  allSims[uid] = userSims;
  localStorage.setItem(LOCAL_STORAGE_KEY_SIMS, JSON.stringify(allSims));
};

/**
 * Save or update User document in Firestore
 */
export async function saveUserProfile(user) {
  if (!user || !user.uid) return;
  const userRef = doc(db, 'users', user.uid);
  const data = {
    uid: user.uid,
    name: user.displayName || user.name || user.email.split('@')[0],
    email: user.email,
    photoURL: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
    updatedAt: new Date().toISOString(),
    totalSimulations: user.totalSimulations || 0,
    averageReadiness: user.averageReadiness || 0,
    currentCareer: user.currentCareer || 'data-scientist'
  };

  try {
    await setDoc(userRef, { ...data, updatedAt: serverTimestamp() }, { merge: true });
  } catch (err) {
    console.warn("Firestore saveUserProfile fallback to LocalStorage:", err.message);
  }
  setLocalUser(user.uid, data);
  return data;
}

/**
 * Get User profile from Firestore or LocalStorage
 */
export async function getUserProfile(uid) {
  if (!uid) return null;
  try {
    const userRef = doc(db, 'users', uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data();
    }
  } catch (err) {
    console.warn("Firestore getUserProfile fallback to LocalStorage:", err.message);
  }
  const localUsers = getLocalUsers();
  return localUsers[uid] || null;
}

/**
 * Save a completed simulation to users/{userId}/simulations/{simulationId}
 */
export async function saveSimulationResult(uid, simulationData) {
  if (!uid || !simulationData.simulationId) return;

  const simDocRef = doc(db, 'users', uid, 'simulations', simulationData.simulationId);
  const payload = {
    ...simulationData,
    userId: uid,
    completedAt: new Date().toISOString()
  };

  try {
    await setDoc(simDocRef, { ...payload, completedAt: serverTimestamp() }, { merge: true });
  } catch (err) {
    console.warn("Firestore saveSimulationResult fallback to LocalStorage:", err.message);
  }

  // Always save locally as well
  saveLocalSimulation(uid, payload);

  // Recalculate user summary statistics
  try {
    const userSims = await getUserSimulations(uid);
    const total = userSims.length;
    const avgScore = total > 0 ? Math.round(userSims.reduce((acc, curr) => acc + (curr.overallScore || 0), 0) / total) : 0;
    
    await updateDoc(doc(db, 'users', uid), {
      totalSimulations: total,
      averageReadiness: avgScore,
      updatedAt: serverTimestamp()
    });
    setLocalUser(uid, { totalSimulations: total, averageReadiness: avgScore });
  } catch (e) {
    // local update
    const userSims = getLocalSimulations(uid);
    const total = userSims.length;
    const avgScore = total > 0 ? Math.round(userSims.reduce((acc, curr) => acc + (curr.overallScore || 0), 0) / total) : 0;
    setLocalUser(uid, { totalSimulations: total, averageReadiness: avgScore });
  }

  return payload;
}

/**
 * Get all user simulations ordered by date desc
 */
export async function getUserSimulations(uid) {
  if (!uid) return [];
  try {
    const q = query(
      collection(db, 'users', uid, 'simulations'),
      orderBy('startedAt', 'desc')
    );
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map(doc => doc.data());
    }
  } catch (err) {
    console.warn("Firestore getUserSimulations fallback to LocalStorage:", err.message);
  }
  return getLocalSimulations(uid);
}

/**
 * Get single simulation by ID
 */
export async function getSimulationById(uid, simulationId) {
  if (!uid || !simulationId) return null;
  try {
    const ref = doc(db, 'users', uid, 'simulations', simulationId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data();
    }
  } catch (err) {
    console.warn("Firestore getSimulationById fallback to LocalStorage:", err.message);
  }
  const userSims = getLocalSimulations(uid);
  return userSims.find(s => s.simulationId === simulationId) || null;
}
