export interface Post {
  content: string;
  title: string;
  id: string;
  publishedDate: string;
  author: {
    id: string;
    name: string;
    details?: string;
  };
  published: boolean;
  tagsOnPost: Array<{ tag: Tag }>;
  claps: [];
  bookmarkId?: string;
}

export interface Tag {
  id: string;
  tagName: string;
}
