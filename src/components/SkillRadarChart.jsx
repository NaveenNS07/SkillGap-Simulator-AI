import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';

export default function SkillRadarChart({ scores }) {
  const data = [
    { subject: 'Technical', score: scores?.technicalScore || 70, fullMark: 100 },
    { subject: 'Problem Solving', score: scores?.problemSolvingScore || 70, fullMark: 100 },
    { subject: 'Communication', score: scores?.communicationScore || 70, fullMark: 100 },
    { subject: 'Decision Making', score: scores?.decisionMakingScore || 70, fullMark: 100 },
    { subject: 'Adaptability', score: scores?.adaptabilityScore || 70, fullMark: 100 },
    { subject: 'Business Thinking', score: scores?.businessThinkingScore || 70, fullMark: 100 },
  ];

  return (
    <div className="w-full h-64 sm:h-80 relative flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="rgba(255, 255, 255, 0.1)" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={{ fill: '#64748b', fontSize: 9 }}
            axisLine={false} 
          />
          <Radar
            name="Candidate Performance"
            dataKey="score"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
