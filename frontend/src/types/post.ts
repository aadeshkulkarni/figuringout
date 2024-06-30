export interface Post {
  content: string;
  title: string;
  id: string;
  publishedDate: string;
  author: {
    id: string;
    name: string;
    email?: string;
    details?: string;
    profilePic?: string;
  };
  published: boolean;
  tagsOnPost: Array<{ tag: Tag }>;
  claps: [];
  bookmarks?: { id: string }[];
}

export interface Tag {
  id: string;
  tagName: string;
}
