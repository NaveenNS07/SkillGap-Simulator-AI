import { GoogleGenAI } from '@google/genai';
import { getCareerById } from '../data/careers';

// Helper to get active Gemini API key from environment or localStorage settings
export const getActiveGeminiKey = () => {
  return localStorage.getItem('skillgap_gemini_key') || import.meta.env.VITE_GEMINI_API_KEY || '';
};

/**
 * Robust JSON extraction helper in case Gemini wraps response in markdown code blocks
 */
function extractJSON(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (jsonMatch && jsonMatch[1]) {
      try {
        return JSON.parse(jsonMatch[1]);
      } catch (err) {
        // Fallback cleanup
      }
    }
    // Attempt greedy object extraction
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      const candidate = text.substring(firstBrace, lastBrace + 1);
      return JSON.parse(candidate);
    }
    throw new Error("Could not parse valid JSON from AI response");
  }
}

/**
 * 1. GENERATE SCENARIO
 */
export async function generateScenario(careerId, difficulty = 'Intermediate') {
  const career = getCareerById(careerId);
  const apiKey = getActiveGeminiKey();

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
You are the lead workplace scenario engine for a career simulation platform.
Generate a realistic, high-stakes workplace simulation scenario for a "${career.name}" role at a mid-to-large company.
Target Difficulty: ${difficulty}.

Return ONLY valid JSON matching this schema:
{
  "title": "Short descriptive scenario title",
  "companyContext": "Detailed 2-3 sentence company background and current crisis/project context.",
  "objective": "Clear single-sentence goal for the candidate.",
  "availableData": [
    { "metric": "Metric or Table Name", "value": "Value or concise summary data string" }
  ],
  "task": "Specific analytical/engineering task for candidate (e.g. 'What patterns do you investigate first and why?')",
  "constraints": ["Constraint 1 (e.g. tight deadline)", "Constraint 2 (e.g. limited cloud budget)"],
  "initialPromptOptions": ["Optional suggestion 1", "Optional suggestion 2"]
}
`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const parsed = extractJSON(response.text);
      return { ...parsed, isDemoFallback: false };
    } catch (err) {
      console.warn("Gemini API scenario generation failed, using intelligent role fallback:", err.message);
    }
  }

  // Realistic fallback data tailored per career (Data Scientist / Software Engineer / Product Manager)
  return getFallbackScenario(careerId, difficulty);
}

/**
 * 2. GENERATE ADAPTIVE EVENT (Curveball)
 */
export async function generateAdaptiveEvent(careerId, scenario, initialUserResponse) {
  const apiKey = getActiveGeminiKey();

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
You are an adaptive workplace simulation engine.
The candidate is working on the scenario: "${scenario.title}" (Career: ${careerId}).
Their initial response was: "${initialUserResponse}".

Generate a realistic dynamic event (breaking update, new metric anomaly, or changing constraint) that challenges their initial hypothesis and tests their ADAPTABILITY.

Return ONLY valid JSON with schema:
{
  "eventTitle": "Attention: New Telemetry / Update Received",
  "eventDescription": "2-3 sentences explaining the unexpected breakdown or new data discovery.",
  "adaptiveQuestion": "How does this new piece of evidence alter your original hypothesis? Explain what you would investigate next and your revised recommendation."
}
`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const parsed = extractJSON(response.text);
      return { ...parsed, isDemoFallback: false };
    } catch (err) {
      console.warn("Gemini API adaptive event failed, using intelligent fallback:", err.message);
    }
  }

  return getFallbackAdaptiveEvent(careerId, scenario, initialUserResponse);
}

/**
 * 3. EVALUATE SIMULATION (Evidence-based evaluation engine)
 */
export async function evaluateSimulation(careerId, scenario, adaptiveEvent, userResponses) {
  const apiKey = getActiveGeminiKey();
  const career = getCareerById(careerId);

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
You are an expert executive assessor evaluating a job candidate's performance in a real-world simulation for the role of ${career.name}.

SCENARIO OBJECTIVE: ${scenario.objective}
INITIAL TASK: ${scenario.task}
CANDIDATE INITIAL REASONING: ${userResponses.initialResponse}

DYNAMIC ADAPTIVE EVENT: ${adaptiveEvent.eventDescription}
ADAPTIVE QUESTION: ${adaptiveEvent.adaptiveQuestion}
CANDIDATE REVISED RESPONSE & FINAL RECOMMENDATION: ${userResponses.adaptiveResponse}

Evaluate the candidate across all 7 dimensions strictly based on EVIDENCE from their text.
Return ONLY valid JSON matching this schema:
{
  "overallScore": 72,
  "technicalScore": 82,
  "problemSolvingScore": 76,
  "communicationScore": 70,
  "decisionMakingScore": 68,
  "adaptabilityScore": 74,
  "businessThinkingScore": 61,
  "strengths": [
    { "title": "Strength Title", "description": "Specific evidence from response showing strength." }
  ],
  "weaknesses": [
    { "title": "Weakness Title", "description": "Specific evidence from response showing room for growth." }
  ],
  "skillGaps": [
    {
      "skill": "Business Reasoning",
      "currentLevel": 61,
      "targetLevel": 85,
      "evidence": "Identified technical pattern but omitted financial revenue ROI impact.",
      "challenge": "Analyze customer churn dataset and present 3-point business recommendation",
      "estimatedEffort": "5-7 days"
    }
  ],
  "evidence": [
    { "dimension": "Business Thinking", "score": 61, "justification": "Identified mobile cancellation spike but failed to calculate impact on monthly recurring revenue." },
    { "dimension": "Adaptability", "score": 74, "justification": "Pivoted initial hypothesis quickly when mobile telemetry arrived." }
  ],
  "aiFeedback": "Comprehensive summary paragraph offering evidence-based advice for career readiness."
}
`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const parsed = extractJSON(response.text);
      return { ...parsed, isDemoFallback: false };
    } catch (err) {
      console.warn("Gemini API evaluation failed, using intelligent evaluation engine:", err.message);
    }
  }

  return getFallbackEvaluation(careerId, userResponses);
}

/**
 * 4. GENERATE PERSONALIZED ROADMAP
 */
export async function generatePersonalizedRoadmap(careerId, latestScore, skillGaps) {
  const apiKey = getActiveGeminiKey();
  const career = getCareerById(careerId);

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
Generate a personalized 4-stage career improvement roadmap for a candidate pursuing ${career.name}.
Their current readiness score is ${latestScore}%.
Their primary skill gaps are: ${JSON.stringify(skillGaps)}.

Return ONLY valid JSON:
{
  "roadmapTitle": "Tailored ${career.name} Readiness Roadmap",
  "stages": [
    {
      "phase": "Phase 1: Foundation",
      "focus": "Core focus area",
      "actionItems": ["Action 1", "Action 2"],
      "targetReadiness": 75
    },
    {
      "phase": "Phase 2: Targeted Practice",
      "focus": "Deep dive into primary gap",
      "actionItems": ["Action 1", "Action 2"],
      "targetReadiness": 82
    },
    {
      "phase": "Phase 3: Advanced Simulation",
      "focus": "Complex scenario re-simulation",
      "actionItems": ["Action 1", "Action 2"],
      "targetReadiness": 88
    },
    {
      "phase": "Phase 4: Job Readiness",
      "focus": "Portfolio & Senior evaluation",
      "actionItems": ["Action 1", "Action 2"],
      "targetReadiness": 95
    }
  ]
}
`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return extractJSON(response.text);
    } catch (e) {
      console.warn("Gemini roadmap failed, using template:", e.message);
    }
  }

  return getFallbackRoadmap(careerId, latestScore, skillGaps);
}

/* =========================================================================
   FALLBACK GENERATORS (Ensures 100% working demo app even offline or without key)
   ========================================================================= */

function getFallbackScenario(careerId, difficulty) {
  if (careerId === 'software-engineer') {
    return {
      title: "Production Incident: Payment Gateway Latency Spike",
      companyContext: "You are a backend software engineer at PayFlow, a financial checkout API processing \$4M daily. During peak flash sale hours, API p99 response time spiked from 140ms to 4,800ms, triggering automated timeout drops.",
      objective: "Isolate the root cause of the latency bottleneck and propose an emergency mitigation plan.",
      availableData: [
        { metric: "CPU Utilization", value: "32% (Normal)" },
        { metric: "DB Connection Pool", value: "100/100 exhausted (Blocking)" },
        { metric: "Redis Cache Hit Rate", value: "Dropped from 94% to 18%" },
        { metric: "Error Code", value: "504 Gateway Timeout on /v2/charge" }
      ],
      task: "Analyze the operational telemetry. What root cause do you investigate first and what immediate fix do you recommend?",
      constraints: ["Zero database downtime allowed", "Rollback requires 20-minute deployment pipeline"],
      initialPromptOptions: ["Investigate Redis cache eviction policy", "Increase Postgres max_connections pool"],
      isDemoFallback: true
    };
  }

  if (careerId === 'product-manager') {
    return {
      title: "User Retention Breakdown & Feature Prioritization",
      companyContext: "You are the Product Manager for SaaS Flow, a B2B productivity app. Month-1 user retention dropped from 45% to 28% following the Q3 redesign. Leadership demands a plan to stop subscriber churn.",
      objective: "Formulate a retention recovery strategy and prioritize the Q4 product backlog.",
      availableData: [
        { metric: "Free-to-Paid Conversion", value: "Down 12%" },
        { metric: "Top User Complaint", value: "Onboarding flow confusing / navigation hidden" },
        { metric: "Eng Time per Session", value: "Dropped from 24m to 9m" },
        { metric: "Feature Requests", value: "150+ requests for 'Classic Navigation Toggle'" }
      ],
      task: "What data points do you analyze first, and how do you prioritize fixing onboarding vs launching requested features?",
      constraints: ["Design team capacity limited to 2 sprints", "Engineering team locked on security audit"],
      initialPromptOptions: ["Ship immediate hotfix for classic navigation", "Run user interviews on onboarding funnel"],
      isDemoFallback: true
    };
  }

  // Default: Data Scientist
  return {
    title: "E-Commerce Revenue & Cancellation Diagnostics",
    companyContext: "You are working as a junior Data Scientist at ShopTrend, an e-commerce platform. Monthly revenue has unexpectedly decreased by 18% over the last 30 days despite steady web traffic.",
    objective: "Identify the root causes of revenue drop and recommend strategic next steps.",
    availableData: [
      { metric: "Monthly Orders", value: "124,000 (-2%)" },
      { metric: "Average Order Value (AOV)", value: "\$64.50 (-\$1.20)" },
      { metric: "Order Cancellation Rate", value: "18.4% (Up from 5.2%)" },
      { metric: "Web Traffic", value: "1.2M sessions (+1.5%)" },
      { metric: "Desktop vs Mobile Ratio", value: "Desktop 35% / Mobile 65%" }
    ],
    task: "What patterns do you investigate first and why? Present your initial diagnostic hypothesis.",
    constraints: ["Raw SQL database access restricted to 10k rows", "Report due to VP of Growth in 2 hours"],
    initialPromptOptions: ["Correlate cancellation rate with device segment", "Analyze payment gateway failure logs"],
    isDemoFallback: true
  };
}

function getFallbackAdaptiveEvent(careerId, scenario, initialUserResponse) {
  if (careerId === 'software-engineer') {
    return {
      eventTitle: "BREAKING INCIDENT: DB Connection Lock & Memory Leak",
      eventDescription: "Engineering monitoring just alerted that DB connections remain blocked even after restarting Redis. Memory profiler shows a thread-pool leak inside the new authentication middleware.",
      adaptiveQuestion: "Given this dynamic escalation, how does your original mitigation change? What specific code pattern or infrastructure architectural shift do you implement now?",
      isDemoFallback: true
    };
  }

  if (careerId === 'product-manager') {
    return {
      eventTitle: "ALERT: Competitor Launches Free Onboarding Tool",
      eventDescription: "A major competitor just launched a free automated onboarding widget and is aggressively poaching your churned enterprise accounts on LinkedIn.",
      adaptiveQuestion: "How does this competitive shift alter your backlog prioritization? Do you pivot resources or double down on core product improvements?",
      isDemoFallback: true
    };
  }

  return {
    eventTitle: "ALERT: Mobile Telemetry Cancellation Anomaly",
    eventDescription: "Fresh telemetry data just arrived: Mobile iOS app users show a staggering 42% order cancellation rate compared to 3.1% on Desktop. Further logs show mobile checkout button fails on iOS 17 update.",
    adaptiveQuestion: "Does this new evidence change your original diagnostic hypothesis? Explain your revised technical and business recommendation to the product team.",
    isDemoFallback: true
  };
}

function getFallbackEvaluation(careerId, userResponses) {
  const respText = (userResponses.initialResponse + " " + userResponses.adaptiveResponse).toLowerCase();
  
  // Calculate slightly dynamic score based on detail in user response
  const wordCount = respText.split(/\s+/).length;
  const bonus = Math.min(15, Math.floor(wordCount / 10));

  const overall = Math.min(92, Math.max(58, 68 + bonus));

  return {
    overallScore: overall,
    technicalScore: Math.min(95, overall + 10),
    problemSolvingScore: Math.min(90, overall + 4),
    communicationScore: Math.min(88, overall - 2),
    decisionMakingScore: Math.min(85, overall - 4),
    adaptabilityScore: Math.min(92, overall + 2),
    businessThinkingScore: Math.min(80, overall - 9),
    strengths: [
      {
        title: "Strong Analytical Reasoning",
        description: "You evaluated multiple potential variables (cancellation rates, device segments) before jumping to conclusions."
      },
      {
        title: "High Adaptability",
        description: "You swiftly revised your hypothesis upon receiving the dynamic mobile telemetry anomaly."
      }
    ],
    weaknesses: [
      {
        title: "Business Impact Quantification",
        description: "You identified the technical failure pattern but did not quantify the financial revenue impact or customer LTV loss."
      },
      {
        title: "Executive Communication",
        description: "Your final recommendation could benefit from a structured 3-bullet executive action plan."
      }
    ],
    skillGaps: [
      {
        skill: "Business Reasoning",
        currentLevel: Math.min(80, overall - 9),
        targetLevel: 85,
        evidence: "Identified mobile cancellation anomaly but failed to translate tech bug into monetary loss metrics for leadership.",
        challenge: "Analyze a customer churn dataset and present a 3-point executive business ROI recommendation.",
        estimatedEffort: "5-7 days"
      }
    ],
    evidence: [
      {
        dimension: "Business Thinking",
        score: Math.min(80, overall - 9),
        justification: "Focus was primarily on technical bug fix without addressing customer experience retention strategies."
      },
      {
        dimension: "Adaptability",
        score: Math.min(92, overall + 2),
        justification: "Incorporated breaking iOS telemetry immediately into updated hypothesis."
      }
    ],
    aiFeedback: `Demonstrated solid ${getCareerById(careerId).name} technical skills and analytical reasoning. To advance to senior readiness, focus on connecting technical anomalies directly to business revenue impact and structuring recommendations for C-suite decision makers.`,
    isDemoFallback: true
  };
}

function getFallbackRoadmap(careerId, latestScore, skillGaps) {
  const careerName = getCareerById(careerId).name;
  return {
    roadmapTitle: `Personalized ${careerName} Mastery Roadmap`,
    stages: [
      {
        phase: "Phase 1: Diagnostic Foundation",
        focus: "Strengthen Business Reasoning & Metric Attribution",
        actionItems: [
          "Complete 'E-Commerce Churn ROI Analysis' targeted challenge",
          "Study financial unit economics (LTV, CAC, Churn rate)"
        ],
        targetReadiness: Math.min(80, latestScore + 8)
      },
      {
        phase: "Phase 2: Complex Scenario Simulation",
        focus: "Practice Multi-Constraint Decision Making",
        actionItems: [
          `Re-simulate ${careerName} Advanced Incident`,
          "Practice structured 3-bullet executive synthesis under time limits"
        ],
        targetReadiness: Math.min(88, latestScore + 16)
      },
      {
        phase: "Phase 3: Portfolio & Real-World Case Studies",
        focus: "Build Cross-Functional Alignment",
        actionItems: [
          "Document evidence-based case study in Skill Profile",
          "Conduct peer review of engineering trade-offs"
        ],
        targetReadiness: 94
      }
    ]
  };
}
