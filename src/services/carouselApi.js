const API_BASE_URL = 'http://localhost:8000/api/v1';

export const carouselApi = {
  // Get active carousel slides for homepage
  getSlides: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/carousel/slides`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to fetch slides');
      return json.data || [];
    } catch (error) {
      console.warn('Backend unavailable, using default client carousel slides.');
      return null;
    }
  },

  // Admin: Get all slides including hidden/drafts
  getAllSlidesAdmin: async () => {
    const res = await fetch(`${API_BASE_URL}/admin/carousel/slides`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to fetch admin slides');
    return json.data || [];
  },

  // Admin: Create a new slide
  createSlide: async (slideData) => {
    const res = await fetch(`${API_BASE_URL}/admin/carousel/slides`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slideData)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to create slide');
    return json.data;
  },

  // Admin: Update an existing slide
  updateSlide: async (slideId, slideData) => {
    const res = await fetch(`${API_BASE_URL}/admin/carousel/slides/${slideId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slideData)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to update slide');
    return json.data;
  },

  // Admin: Delete a slide
  deleteSlide: async (slideId) => {
    const res = await fetch(`${API_BASE_URL}/admin/carousel/slides/${slideId}`, {
      method: 'DELETE'
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to delete slide');
    return json;
  }
};
