import { resumeApi } from './resumeApi';

export const atsService = {
  analyzeResume: async (resumeText, jobDescription) => {
    return await resumeApi.analyzeTextATS(resumeText, jobDescription);
  }
};

