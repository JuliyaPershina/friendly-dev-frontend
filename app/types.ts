export type Project = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  image: string;
  url: string;
  date: string;
  category: string;
  featured: boolean;
};

export type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string;
  cover?: string | null;
};

export type StrapiResponse<T> = {
  data: T[];
};

export type StrapiProject = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  image?: { url: string };
  url: string;
  date: string;
  category: string;
  featured: boolean;
};

export type StrapiPost = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  content: string;
  cover?: { url: string } | null;
};