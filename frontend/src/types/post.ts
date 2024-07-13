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

export interface User {
  id: string;
  email: string;
  name: string;
  details?: string | null;
  profilePic?: string | null;
  password: string;
  creationDate: Date | string;
  bookmarks: Bookmark[];
}

export interface Bookmark {
  id: string;
  userId: string;
  postId: string;
}
