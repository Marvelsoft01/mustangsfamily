/**
 * Django API Response Types
 */

export interface DjangoCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface DjangoAuthor {
  id: number;
  name: string;
  email?: string;
  bio?: string;
  avatar?: string;
}

export interface DjangoTag {
  id: number;
  name: string;
  slug: string;
}

export interface DjangoPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: number | DjangoCategory;
  author: number | DjangoAuthor;
  tags?: number[] | DjangoTag[];
  image?: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  read_time?: string;
  is_published?: boolean;
}

export interface DjangoComment {
  id: number;
  post: number;
  author_name: string;
  author_email?: string;
  content: string;
  created_at: string;
  is_approved?: boolean;
}

export interface DjangoSiteSettings {
  site_name?: string;
  logo?: string;
  description?: string;
  footer_text?: string;
  social_links?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface DjangoPaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
