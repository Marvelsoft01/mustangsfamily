import { BlogPost, BlogCategory, PaginationParams, BlogFilters, BlogListResponse } from "@/types/blog";
import { apiGet, apiPost } from "./api";
import { DjangoPost, DjangoCategory, DjangoPaginatedResponse, DjangoAuthor, DjangoSiteSettings } from "@/types/django";

/**
 * Map Django category to BlogCategory string
 */
const mapCategory = (category: DjangoCategory | number): BlogCategory => {
  if (typeof category === 'number') {
    return "Mustang Life"; // Default fallback
  }
  
  const categoryMap: Record<string, BlogCategory> = {
    "legendary-mustang": "Legendary Mustangs",
    "legendary-mustangs": "Legendary Mustangs",
    "engineering-the-stallion": "Engineering the Stallion",
    "global-mustang-culture": "Global Mustang Culture",
    "modern-era-future-tech": "Modern Era & Future Tech",
    "mustang-life": "Mustang Life",
  };
  
  return categoryMap[category.slug] || category.name as BlogCategory;
};

/**
 * Map Django post to BlogPost format
 */
const mapDjangoPost = (djangoPost: DjangoPost): BlogPost => {
  const category = typeof djangoPost.category === 'object' 
    ? djangoPost.category 
    : { id: djangoPost.category, name: 'Mustang Life', slug: 'mustang-life' };
    
  const author = typeof djangoPost.author === 'object'
    ? djangoPost.author
    : { id: djangoPost.author, name: 'Anonymous', email: '' };

  return {
    id: djangoPost.slug || String(djangoPost.id),
    title: djangoPost.title,
    excerpt: djangoPost.excerpt,
    content: djangoPost.content,
    category: mapCategory(category),
    image: djangoPost.image || '',
    author: author.name,
    publishedAt: djangoPost.published_at,
    readTime: djangoPost.read_time || '5 min read',
  };
};

/**
 * Fetch blog posts with filtering and pagination from Django API
 */
export const getBlogPosts = async (
  pagination: PaginationParams,
  filters?: BlogFilters
): Promise<BlogListResponse> => {
  try {
    // Build query parameters
    const params = new URLSearchParams();
    params.append('page', String(pagination.page));
    params.append('page_size', String(pagination.perPage));
    
    if (filters?.category) {
      // Convert category name to slug for Django
      const categorySlug = filters.category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');
      params.append('category', categorySlug);
    }

    if (filters?.search) {
      params.append('q', filters.search);
    }

    const response = await apiGet<DjangoPaginatedResponse<DjangoPost>>(
      `/posts/?${params.toString()}`
    );

    // Validate response structure
    if (!response || !response.results || !Array.isArray(response.results)) {
      console.error('Invalid response structure:', response);
      return {
        posts: [],
        total: 0,
        currentPage: 1,
        totalPages: 0,
      };
    }

    const posts = response.results.map(mapDjangoPost);
    const totalPages = Math.ceil(response.count / pagination.perPage);

    return {
      posts,
      total: response.count,
      currentPage: pagination.page,
      totalPages,
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    // Return empty result on error
    return {
      posts: [],
      total: 0,
      currentPage: 1,
      totalPages: 0,
    };
  }
};

/**
 * Search blog posts
 */
export const searchBlogPosts = async (
  query: string,
  pagination: PaginationParams
): Promise<BlogListResponse> => {
  try {
    const params = new URLSearchParams();
    params.append('q', query);
    params.append('page', String(pagination.page));
    params.append('page_size', String(pagination.perPage));

    const response = await apiGet<DjangoPaginatedResponse<DjangoPost>>(
      `/posts/search/?${params.toString()}`
    );

    // Validate response structure
    if (!response || !response.results || !Array.isArray(response.results)) {
      console.error('Invalid search response structure:', response);
      return {
        posts: [],
        total: 0,
        currentPage: 1,
        totalPages: 0,
      };
    }

    const posts = response.results.map(mapDjangoPost);
    const totalPages = Math.ceil(response.count / pagination.perPage);

    return {
      posts,
      total: response.count,
      currentPage: pagination.page,
      totalPages,
    };
  } catch (error) {
    console.error('Error searching blog posts:', error);
    return {
      posts: [],
      total: 0,
      currentPage: 1,
      totalPages: 0,
    };
  }
};

/**
 * Get all available blog categories from Django API
 */
export const getBlogCategories = async (): Promise<BlogCategory[]> => {
  try {
    const categories = await apiGet<DjangoCategory[]>('/categories/');
    return categories.map(cat => mapCategory(cat));
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Return default categories on error
    return [
      "Legendary Mustangs",
      "Engineering the Stallion",
      "Global Mustang Culture",
      "Modern Era & Future Tech",
      "Mustang Life"
    ];
  }
};

/**
 * Get a single blog post by slug from Django API
 */
export const getBlogPost = async (slug: string): Promise<BlogPost | null> => {
  try {
    const djangoPost = await apiGet<DjangoPost>(`/posts/${slug}/`);
    return mapDjangoPost(djangoPost);
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error);
    return null;
  }
};

/**
 * Get authors from Django API
 */
export const getAuthors = async (): Promise<DjangoAuthor[]> => {
  try {
    return await apiGet<DjangoAuthor[]>('/authors/');
  } catch (error) {
    console.error('Error fetching authors:', error);
    return [];
  }
};

/**
 * Get posts by category slug
 */
export const getPostsByCategory = async (
  categorySlug: string,
  pagination: PaginationParams
): Promise<BlogListResponse> => {
  try {
    const params = new URLSearchParams();
    params.append('page', String(pagination.page));
    params.append('page_size', String(pagination.perPage));

    const response = await apiGet<DjangoPaginatedResponse<DjangoPost>>(
      `/posts/category/${categorySlug}/?${params.toString()}`
    );

    // Validate response structure
    if (!response || !response.results || !Array.isArray(response.results)) {
      console.error('Invalid category response structure:', response);
      return {
        posts: [],
        total: 0,
        currentPage: 1,
        totalPages: 0,
      };
    }

    const posts = response.results.map(mapDjangoPost);
    const totalPages = Math.ceil(response.count / pagination.perPage);

    return {
      posts,
      total: response.count,
      currentPage: pagination.page,
      totalPages,
    };
  } catch (error) {
    console.error(`Error fetching posts for category ${categorySlug}:`, error);
    return {
      posts: [],
      total: 0,
      currentPage: 1,
      totalPages: 0,
    };
  }
};

/**
 * Get posts by tag slug
 */
export const getPostsByTag = async (
  tagSlug: string,
  pagination: PaginationParams
): Promise<BlogListResponse> => {
  try {
    const params = new URLSearchParams();
    params.append('page', String(pagination.page));
    params.append('page_size', String(pagination.perPage));

    const response = await apiGet<DjangoPaginatedResponse<DjangoPost>>(
      `/posts/tag/${tagSlug}/?${params.toString()}`
    );

    // Validate response structure
    if (!response || !response.results || !Array.isArray(response.results)) {
      console.error('Invalid tag response structure:', response);
      return {
        posts: [],
        total: 0,
        currentPage: 1,
        totalPages: 0,
      };
    }

    const posts = response.results.map(mapDjangoPost);
    const totalPages = Math.ceil(response.count / pagination.perPage);

    return {
      posts,
      total: response.count,
      currentPage: pagination.page,
      totalPages,
    };
  } catch (error) {
    console.error(`Error fetching posts for tag ${tagSlug}:`, error);
    return {
      posts: [],
      total: 0,
      currentPage: 1,
      totalPages: 0,
    };
  }
};

/**
 * Get posts by author ID
 */
export const getPostsByAuthor = async (
  authorId: number,
  pagination: PaginationParams
): Promise<BlogListResponse> => {
  try {
    const params = new URLSearchParams();
    params.append('page', String(pagination.page));
    params.append('page_size', String(pagination.perPage));

    const response = await apiGet<DjangoPaginatedResponse<DjangoPost>>(
      `/posts/author/${authorId}/?${params.toString()}`
    );

    // Validate response structure
    if (!response || !response.results || !Array.isArray(response.results)) {
      console.error('Invalid author response structure:', response);
      return {
        posts: [],
        total: 0,
        currentPage: 1,
        totalPages: 0,
      };
    }

    const posts = response.results.map(mapDjangoPost);
    const totalPages = Math.ceil(response.count / pagination.perPage);

    return {
      posts,
      total: response.count,
      currentPage: pagination.page,
      totalPages,
    };
  } catch (error) {
    console.error(`Error fetching posts for author ${authorId}:`, error);
    return {
      posts: [],
      total: 0,
      currentPage: 1,
      totalPages: 0,
    };
  }
};

/**
 * Get comments for a post
 */
export const getComments = async (postId: number) => {
  try {
    return await apiGet<any[]>(`/comments/${postId}/`);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};

/**
 * Submit a comment to Django API
 */
export const submitComment = async (
  postId: string,
  authorName: string,
  authorEmail: string,
  content: string
): Promise<boolean> => {
  try {
    await apiPost('/comments/', {
      post: postId,
      author_name: authorName,
      author_email: authorEmail,
      content,
    });
    return true;
  } catch (error) {
    console.error('Error submitting comment:', error);
    return false;
  }
};

/**
 * Get site settings
 */
export const getSiteSettings = async (): Promise<DjangoSiteSettings | null> => {
  try {
    return await apiGet<DjangoSiteSettings>('/site/');
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
};
