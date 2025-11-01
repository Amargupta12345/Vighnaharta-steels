// API utility functions for fetching data from backend

// Generic fetch helper
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  // Get API base URL - determine dynamically
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

  // Ensure endpoint starts with /
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${normalizedEndpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      cache: 'no-store', // Ensure fresh data on client side
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `API Error: ${response.status} ${response.statusText}`;

      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch {
        // If not JSON, use the text or status text
        errorMessage = errorText || errorMessage;
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data as T;
  } catch (error: any) {
    console.error(`API Error fetching ${url}:`, error);

    // Provide more helpful error messages
    if (error.message?.includes('404')) {
      throw new Error(`API endpoint not found: ${url}. Please check the route configuration.`);
    }

    throw error;
  }
}

// Products API
export const productsAPI = {
  // Get all products
  getAll: async (params?: { category?: string; featured?: boolean }) => {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.featured) queryParams.append('featured', 'true');

    const query = queryParams.toString();
    const endpoint = `/products${query ? `?${query}` : ''}`;
    return fetchAPI<{ success: boolean; data: any[]; total: number }>(endpoint);
  },

  // Get featured products
  getFeatured: async () => {
    return productsAPI.getAll({ featured: true });
  },

  // Get product by slug
  getBySlug: async (slug: string) => {
    return fetchAPI<{ success: boolean; data: any }>(`/products/${slug}`);
  },

  // Get products by category
  getByCategory: async (category: string) => {
    return productsAPI.getAll({ category });
  }
};

// Home page API
export const homeAPI = {
  getData: async () => {
    return fetchAPI<{ success: boolean; data: any }>('/home');
  }
};

// About page API
export const aboutAPI = {
  getData: async () => {
    return fetchAPI<{ success: boolean; data: any }>('/about');
  }
};

// Contact API
export const contactAPI = {
  getInfo: async () => {
    return fetchAPI<{ success: boolean; data: any }>('/contact');
  },

  submit: async (formData: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    subject: string;
    message: string;
  }) => {
    return fetchAPI<{ success: boolean; message: string; data: any }>('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }
};

// Quote API
export const quoteAPI = {
  submit: async (formData: {
    name: string;
    email: string;
    phone: string;
    company?: string;
    productType: string;
    specifications: string;
    quantity: string;
    deliveryDate?: string;
    deliveryLocation: string;
    message?: string;
  }) => {
    return fetchAPI<{ success: boolean; message: string; data: any }>('/quote', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  },

  getStatus: async (quoteId: string) => {
    return fetchAPI<{ success: boolean; data: any }>(`/quote?id=${quoteId}`);
  }
};

// Pages API (for dynamic content)
export const pagesAPI = {
  getPage: async (slug: string[]) => {
    const slugPath = slug.join('/');
    return fetchAPI<{ title: string; content: string; metadata: any }>(`/pages/${slugPath}`);
  }
};

// Testimonials API
export const testimonialsAPI = {
  getAll: async (params?: { featured?: boolean; limit?: number }) => {
    const queryParams = new URLSearchParams();
    if (params?.featured) queryParams.append('featured', 'true');
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const query = queryParams.toString();
    const endpoint = `/testimonials${query ? `?${query}` : ''}`;
    return fetchAPI<{ success: boolean; data: any[]; total: number }>(endpoint);
  },

  getFeatured: async (limit?: number) => {
    return testimonialsAPI.getAll({ featured: true, limit });
  }
};
