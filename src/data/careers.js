export const CAREERS = [
  {
    careerId: 'data-scientist',
    name: 'Data Scientist',
    title: 'Data Scientist',
    badge: 'Popular',
    icon: 'BarChart3',
    color: 'from-blue-500 to-indigo-600',
    accentColor: 'indigo',
    description: 'Analyze complex customer & financial data, discover hidden behavioral patterns, build statistical insights, and translate technical findings into strategic business decisions.',
    skills: [
      'Technical Reasoning (Python/SQL)',
      'Problem Solving',
      'Analytical Reasoning',
      'Communication & Visualization',
      'Decision Making',
      'Adaptability',
      'Business Thinking'
    ],
    difficultyLevels: ['Beginner', 'Intermediate', 'Advanced'],
    estimatedDuration: '15 - 25 mins',
    simulationTypes: [
      'Customer Churn & Revenue Diagnostics',
      'Recommendation System Performance',
      'Marketing Campaign Attribution'
    ],
    evaluationCriteria: [
      'Hypothesis Formulation',
      'Data Pattern Identification',
      'Pivot on New Constraints',
      'Executive Summary Clarity'
    ]
  },
  {
    careerId: 'software-engineer',
    name: 'Software Engineer',
    title: 'Software Engineer',
    badge: 'High Demand',
    icon: 'Code2',
    color: 'from-emerald-500 to-teal-600',
    accentColor: 'emerald',
    description: 'Debug distributed microservices, analyze incident root causes, optimize memory & latency bottlenecks, and design robust APIs under tight deadlines.',
    skills: [
      'Technical Problem Solving',
      'System Architecture',
      'Code Debugging',
      'Root Cause Analysis',
      'Technical Communication',
      'Adaptability (Live Outages)',
      'Engineering Trade-offs'
    ],
    difficultyLevels: ['Beginner', 'Intermediate', 'Advanced'],
    estimatedDuration: '20 - 30 mins',
    simulationTypes: [
      'Production Outage & Latency Spike',
      'API Microservice Rate Limiting',
      'Database Lock Contention'
    ],
    evaluationCriteria: [
      'Isolation of Fault Vector',
      'Code Snippet Analysis',
      'Response under Live Incident',
      'Long-term Architectural Fix'
    ]
  },
  {
    careerId: 'product-manager',
    name: 'Product Manager',
    title: 'Product Manager',
    badge: 'Leadership',
    icon: 'Layers',
    color: 'from-amber-500 to-orange-600',
    accentColor: 'amber',
    description: 'Deconstruct user problems, evaluate competing feature requests, calculate ROI trade-offs, align cross-functional engineering teams, and pivot product roadmaps.',
    skills: [
      'User Problem Definition',
      'Feature Prioritization (RICE)',
      'Data-driven Decision Making',
      'Stakeholder Alignment',
      'Adaptability to Market Shifts',
      'Business Strategy',
      'Communication'
    ],
    difficultyLevels: ['Beginner', 'Intermediate', 'Advanced'],
    estimatedDuration: '15 - 20 mins',
    simulationTypes: [
      'User Retention Breakdown',
      'Feature Backlog Prioritization',
      'Competitive Market Disruption'
    ],
    evaluationCriteria: [
      'Customer Empathy',
      'Quantitative Prioritization',
      'Stakeholder Trade-off Handling',
      'Product Vision Consistency'
    ]
  }
];

export const getCareerById = (id) => CAREERS.find(c => c.careerId === id) || CAREERS[0];
