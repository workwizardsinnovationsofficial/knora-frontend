import { jobsMockData } from '../mock/jobs';

export const jobService = {
  getJobs: async (filter = {}) => {
    let list = [...jobsMockData];
    if (filter.category && filter.category !== 'All') {
      list = list.filter(j => j.category === filter.category);
    }
    if (filter.type && filter.type !== 'All') {
      list = list.filter(j => j.type === filter.type);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(j => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.skills.some(s => s.toLowerCase().includes(q)));
    }
    return list;
  },

  getJobById: async (jobId) => {
    return jobsMockData.find(j => j.id === jobId) || jobsMockData[0];
  }
};
