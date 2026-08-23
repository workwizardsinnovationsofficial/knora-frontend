import { eventsMockData } from '../mock/events';

export const eventService = {
  getHackathons: async () => eventsMockData.hackathons,
  getEvents: async () => eventsMockData.events,
  getAllOpportunities: async () => [...eventsMockData.hackathons, ...eventsMockData.events]
};
