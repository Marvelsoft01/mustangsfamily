import { BlogPost, BlogCategory, PaginationParams, BlogFilters, BlogListResponse } from "@/types/blog";
import blogLegendary1 from "@/assets/blog-legendary-1.jpg";
import blogEngineering1 from "@/assets/blog-engineering-1.jpg";
import blogCulture1 from "@/assets/blog-culture-1.jpg";
import blogModern1 from "@/assets/blog-modern-1.jpg";

// Mock data - replace with API calls later
const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Untold Story of the 1967 Shelby GT500",
    excerpt: "Discover the engineering marvel that defined an era and set the standard for American muscle cars.",
    content: "Full article content here...",
    category: "Legendary Mustangs",
    image: blogLegendary1,
    author: "Mustang Historian",
    publishedAt: "2025-01-15",
    readTime: "5 min read"
  },
  {
    id: "2",
    title: "Breaking Down the Coyote V8: Engineering Excellence",
    excerpt: "A deep dive into the technology that powers the modern Mustang GT - from dual overhead cams to variable valve timing.",
    content: "Full article content here...",
    category: "Engineering the Stallion",
    image: blogEngineering1,
    author: "Tech Editor",
    publishedAt: "2025-01-10",
    readTime: "8 min read"
  },
  {
    id: "3",
    title: "Mustang Clubs Around the World: A Global Passion",
    excerpt: "From Tokyo to Paris, see how Mustang enthusiasts are building communities and celebrating the pony car legacy.",
    content: "Full article content here...",
    category: "Global Mustang Culture",
    image: blogCulture1,
    author: "Community Manager",
    publishedAt: "2025-01-05",
    readTime: "6 min read"
  },
  {
    id: "4",
    title: "Dark Horse: The Future of Performance",
    excerpt: "Exploring how the 2025 Mustang Dark Horse combines raw power with cutting-edge technology for the next generation.",
    content: "Full article content here...",
    category: "Modern Era & Future Tech",
    image: blogModern1,
    author: "Performance Analyst",
    publishedAt: "2025-01-01",
    readTime: "7 min read"
  },
];

/**
 * Fetch blog posts with filtering and pagination
 * TODO: Replace with actual API call when backend is ready
 * Example: return fetch(`/api/blogs?category=${filters.category}&page=${page}&perPage=${perPage}`)
 */
export const getBlogPosts = async (
  pagination: PaginationParams,
  filters?: BlogFilters
): Promise<BlogListResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));

  let filteredPosts = [...mockBlogPosts];

  // Apply category filter
  if (filters?.category) {
    filteredPosts = filteredPosts.filter(post => post.category === filters.category);
  }

  // Calculate pagination
  const total = filteredPosts.length;
  const totalPages = Math.ceil(total / pagination.perPage);
  const start = (pagination.page - 1) * pagination.perPage;
  const end = start + pagination.perPage;
  const posts = filteredPosts.slice(start, end);

  return {
    posts,
    total,
    currentPage: pagination.page,
    totalPages
  };
};

/**
 * Get all available blog categories
 * TODO: Replace with API call when backend is ready
 */
export const getBlogCategories = async (): Promise<BlogCategory[]> => {
  return [
    "Legendary Mustangs",
    "Engineering the Stallion",
    "Global Mustang Culture",
    "Modern Era & Future Tech",
    "Mustang Life"
  ];
};

/**
 * Get a single blog post by ID
 * TODO: Replace with API call when backend is ready
 */
export const getBlogPost = async (id: string): Promise<BlogPost | null> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockBlogPosts.find(post => post.id === id) || null;
};
