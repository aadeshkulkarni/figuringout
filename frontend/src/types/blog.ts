import { Pagination } from './pagination';
import { Post } from './post';

export interface BlogResponse extends Pagination {
  posts: Post[];
}
