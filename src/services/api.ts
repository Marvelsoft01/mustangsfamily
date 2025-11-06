/**
 * Django REST API Client
 * Base configuration and helper methods for API calls
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

interface ApiError {
  message: string;
  status?: number;
  details?: any;
}

/**
 * Base fetch wrapper with error handling
 */
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Important for CSRF cookies
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error: ApiError = {
        message: errorData.message || `HTTP error! status: ${response.status}`,
        status: response.status,
        details: errorData,
      };
      throw error;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error && 'status' in error) {
      throw error;
    }
    throw {
      message: error instanceof Error ? error.message : 'Network error occurred',
      details: error,
    } as ApiError;
  }
}

/**
 * GET request
 */
export async function apiGet<T>(endpoint: string): Promise<T> {
  return apiFetch<T>(endpoint, { method: 'GET' });
}

/**
 * POST request
 */
export async function apiPost<T>(
  endpoint: string,
  data: any,
  token?: string
): Promise<T> {
  const headers: HeadersInit = {};
  
  // Add JWT token if provided
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return apiFetch<T>(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
}

/**
 * PUT request
 */
export async function apiPut<T>(
  endpoint: string,
  data: any,
  token?: string
): Promise<T> {
  const headers: HeadersInit = {};
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return apiFetch<T>(endpoint, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });
}

/**
 * DELETE request
 */
export async function apiDelete<T>(
  endpoint: string,
  token?: string
): Promise<T> {
  const headers: HeadersInit = {};
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return apiFetch<T>(endpoint, {
    method: 'DELETE',
    headers,
  });
}

// Export the base URL for reference
export { API_BASE_URL };
