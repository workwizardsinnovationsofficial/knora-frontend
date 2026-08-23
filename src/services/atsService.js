export const atsService = {
  analyzeResume: async (resumeText, jobDescription) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const wordsInDesc = (jobDescription || '').toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
        const wordsInResume = (resumeText || '').toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
        
        const setDesc = new Set(wordsInDesc);
        const setResume = new Set(wordsInResume);
        
        let matchCount = 0;
        const missing = [];
        
        setDesc.forEach((word) => {
          if (setResume.has(word)) {
            matchCount++;
          } else if (['python', 'react', 'java', 'sql', 'docker', 'aws', 'algorithms', 'git', 'rest', 'api', 'cloud', 'typescript', 'redux'].includes(word)) {
            missing.push(word);
          }
        });

        const totalDescKeyWords = Math.max(1, setDesc.size);
        const matchPct = Math.min(96, Math.max(62, Math.round((matchCount / totalDescKeyWords) * 100) + 50));

        resolve({
          overallScore: 82, // Section 24 specification: 82 / 100
          keywordMatch: 88,
          skillsMatch: 81,
          formattingScore: 90,
          missingKeywords: missing.length > 0 ? missing.slice(0, 6) : ['System Design', 'Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Microservices'],
          recommendations: [
            'Include quantified metrics (e.g., "Improved query efficiency by 40%")',
            'Add explicit mentions of Docker and Cloud Deployment skills',
            'Ensure project titles align directly with backend and fullstack job descriptions'
          ]
        });
      }, 900);
    });
  }
};
