export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'World News' | 'Breaking Events' | 'Movies' | 'Series' | 'Anime' | 'Reviews';
  author: string;
  date: string;
  imageUrl: string;
  tags: string[];
  featured?: boolean;
  views?: number;
}

export interface ThemeSettings {
  primaryColor: string;
  darkMode: boolean;
  headingFont: string;
  bodyFont: string;
}

export interface Comment {
  id: string;
  postId: string;
  user: string;
  text: string;
  date: string;
}