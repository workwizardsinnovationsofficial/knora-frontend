import { academicMockData } from '../mock/academics';

export const academicService = {
  getUniversities: async () => academicMockData.universities,
  getRegulations: async () => academicMockData.regulations,
  getBranches: async () => academicMockData.branches,
  getYears: async () => academicMockData.years,
  getSemesters: async () => academicMockData.semesters,
  getSubjects: async () => academicMockData.subjectsSample,
  getAcademicStats: async () => academicMockData.stats
};
