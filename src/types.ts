export type CategorySlug = 'ai' | 'aplikasi' | 'perkembangan-teknologi';

export interface CategoryInfo {
  id: CategorySlug;
  name: string;
  shortName: string;
  description: string;
  iconName: string;
  accentColor: string;
  articleCount: number;
}

export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface CommentItem {
  id: string;
  author: string;
  avatar: string;
  date: string;
  content: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string[];
  keyPoints?: string[];
  category: CategorySlug;
  categoryLabel: string;
  author: Author;
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  featured?: boolean;
  trending?: boolean;
  views: number;
  likes: number;
  tags: string[];
}

export type PageView = 
  | 'home' 
  | 'articles' 
  | 'article-detail' 
  | 'category' 
  | 'about' 
  | 'contact';

export interface NavigationState {
  currentView: PageView;
  selectedArticleSlug?: string;
  selectedCategory?: CategorySlug;
  searchQuery?: string;
}
