const API_BASE_URL = 'http://localhost:8000/api/resumes';

const getHeaders = () => {
  const token = localStorage.getItem('knora_access_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const resumeApi = {
  createResume: async (title = 'My Resume', templateId = 'knora-modern') => {
    const token = localStorage.getItem('knora_access_token');
    if (!token) {
      throw new Error('UNAUTHENTICATED');
    }

    const res = await fetch(`${API_BASE_URL}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ title, templateId })
    });
    const json = await res.json();
    if (!res.ok) {
      if (res.status === 401) throw new Error('UNAUTHENTICATED');
      throw new Error(json.message || 'Failed to create resume');
    }
    return json.data;
  },

  listResumes: async () => {
    const token = localStorage.getItem('knora_access_token');
    if (!token) return [];

    try {
      const res = await fetch(`${API_BASE_URL}`, {
        headers: getHeaders()
      });
      const json = await res.json();
      if (!res.ok) return [];
      return json.data || [];
    } catch (e) {
      return [];
    }
  },

  getResume: async (id) => {
    if (!id || id.startsWith('local-')) return null;

    const res = await fetch(`${API_BASE_URL}/${id}`, {
      headers: getHeaders()
    });
    const json = await res.json();
    if (!res.ok) {
      if (res.status === 401) throw new Error('UNAUTHENTICATED');
      throw new Error(json.message || 'Failed to fetch resume details');
    }
    return json.data;
  },

  updateResume: async (id, data) => {
    const token = localStorage.getItem('knora_access_token');
    if (!token) {
      throw new Error('UNAUTHENTICATED');
    }

    // If local offline ID, convert to real backend resume first
    if (!id || id.startsWith('local-')) {
      const newResume = await resumeApi.createResume(data.title || 'My Resume', data.template_id || 'knora-modern');
      id = newResume._id || newResume.id;
    }

    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) {
      if (res.status === 401) throw new Error('UNAUTHENTICATED');
      throw new Error(json.message || 'Failed to update resume');
    }
    return json.data;
  },

  deleteResume: async (id) => {
    if (!id || id.startsWith('local-')) return { id };

    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    const json = await res.json();
    if (!res.ok) {
      if (res.status === 401) throw new Error('UNAUTHENTICATED');
      throw new Error(json.message || 'Failed to delete resume');
    }
    return json.data;
  },

  duplicateResume: async (id) => {
    if (!id || id.startsWith('local-')) throw new Error('Cannot duplicate offline draft. Please sign in to sync first.');

    const res = await fetch(`${API_BASE_URL}/${id}/duplicate`, {
      method: 'POST',
      headers: getHeaders()
    });
    const json = await res.json();
    if (!res.ok) {
      if (res.status === 401) throw new Error('UNAUTHENTICATED');
      throw new Error(json.message || 'Failed to duplicate resume');
    }
    return json.data;
  },

  generatePdf: async (id) => {
    const token = localStorage.getItem('knora_access_token');
    if (!token) throw new Error('UNAUTHENTICATED');

    const res = await fetch(`${API_BASE_URL}/${id}/generate/pdf`, {
      method: 'POST',
      headers: getHeaders()
    });
    const json = await res.json();
    if (!res.ok) {
      if (res.status === 401) throw new Error('UNAUTHENTICATED');
      throw new Error(json.message || 'Failed to generate PDF');
    }
    return json.data;
  },

  generateDocx: async (id) => {
    const token = localStorage.getItem('knora_access_token');
    if (!token) throw new Error('UNAUTHENTICATED');

    const res = await fetch(`${API_BASE_URL}/${id}/generate/docx`, {
      method: 'POST',
      headers: getHeaders()
    });
    const json = await res.json();
    if (!res.ok) {
      if (res.status === 401) throw new Error('UNAUTHENTICATED');
      throw new Error(json.message || 'Failed to generate DOCX');
    }
    return json.data;
  },

  listResumeFiles: async (id) => {
    if (!id || id.startsWith('local-')) return [];

    const res = await fetch(`${API_BASE_URL}/${id}/files`, {
      headers: getHeaders()
    });
    const json = await res.json();
    if (!res.ok) return [];
    return json.data || [];
  },

  getDownloadUrl: async (id, fileId) => {
    const res = await fetch(`${API_BASE_URL}/${id}/files/${fileId}/download`, {
      headers: getHeaders()
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to get download link');
    return json.data;
  },

  deleteResumeFile: async (id, fileId) => {
    const res = await fetch(`${API_BASE_URL}/${id}/files/${fileId}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to delete resume file');
    return json.data;
  },

  enhanceAI: async (id, payload) => {
    if (!id || id.startsWith('local-')) {
      // Local fallback calculation for offline AI enhance
      if (payload.action === 'summary') {
        return { enhancedText: `Results-driven developer with technical expertise. ${payload.text || ''}` };
      }
      if (payload.action === 'bullet') {
        return { enhancedText: `Architected and implemented key features, improving overall efficiency. ${payload.text || ''}` };
      }
      if (payload.action === 'suggest_skills') {
        return { suggestedSkills: ['Python', 'React', 'FastAPI', 'MongoDB', 'Docker'] };
      }
      return { enhancedText: payload.text };
    }

    const res = await fetch(`${API_BASE_URL}/${id}/ai/enhance`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) {
      if (res.status === 401) throw new Error('UNAUTHENTICATED');
      throw new Error(json.message || 'Failed AI enhancement');
    }
    return json.data;
  },

  analyzeATS: async (id) => {
    if (!id || id.startsWith('local-')) {
      return {
        overallScore: 88,
        atsCompatibility: 91,
        contentQuality: 86,
        readability: 94,
        completeness: 92,
        warnings: ['Add a LinkedIn or GitHub link', 'Add measurable achievements'],
        passed: ['Contact info complete', 'Education structured', 'Skills listed']
      };
    }

    const res = await fetch(`${API_BASE_URL}/${id}/ats/analyze`, {
      method: 'POST',
      headers: getHeaders()
    });
    const json = await res.json();
    if (!res.ok) return null;
    return json.data;
  },

  tailorJob: async (id, jobDescription) => {
    if (!id || id.startsWith('local-')) {
      return {
        matchPercentage: 82,
        matchedSkills: ['Python', 'React', 'SQL'],
        missingSkills: ['Django', 'REST API'],
        recommendations: ['Highlight REST API experience in your projects if accurate.']
      };
    }

    const res = await fetch(`${API_BASE_URL}/${id}/tailor`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ job_description: jobDescription })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed job tailoring analysis');
    return json.data;
  }
};
