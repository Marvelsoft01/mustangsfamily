export type BlogCategory = 
  | "Legendary Mustangs"
  | "Engineering the Stallion"
  | "Global Mustang Culture"
  | "Modern Era & Future Tech"
  | "Mustang Life";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  image: string;
  author: string;
  publishedAt: string;
  readTime: string;
}

export interface PaginationParams {
  page: number;
  perPage: number;
}

export interface BlogFilters {
  category?: BlogCategory;
  search?: string;
}

export interface BlogListResponse {
  posts: BlogPost[];
  total: number;
  currentPage: number;
  totalPages: number;
}
