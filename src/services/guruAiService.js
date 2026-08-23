export const guruAiService = {
  sendMessage: async (userMessage) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let text = "Hello! I am **Guru.AI**, your 24/7 student assistant on KNORA. How can I help you with B.Tech academics, DSA problem solving, resume building, or placement prep today?";
        const msg = (userMessage || '').toLowerCase();

        if (msg.includes('dsa') || msg.includes('algorithm') || msg.includes('tree')) {
          text = "For DSA, start by mastering Arrays, Linked Lists, Trees, and Dynamic Programming. Practice solving 2-3 LeetCode problems daily and review time complexity analysis!";
        } else if (msg.includes('resume') || msg.includes('ats')) {
          text = "To pass ATS filters, ensure your resume includes technical keywords (Python, React, SQL, DSA), quantified impact metrics, and clean single-column formatting!";
        } else if (msg.includes('academic') || msg.includes('notes') || msg.includes('syllabus')) {
          text = "You can explore structured B.Tech unit notes, previous question papers, and video lectures in the **Academics** section of KNORA!";
        }

        resolve({
          id: `guru-${Date.now()}`,
          sender: 'guru',
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      }, 700);
    });
  }
};
