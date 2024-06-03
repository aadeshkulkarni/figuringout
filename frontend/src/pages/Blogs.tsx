import Appbar from '../components/Appbar';
import BlogsList from '../components/BlogsList';

const Blogs = () => (
  <>
    <Appbar skipAuthCheck />
    <BlogsList />
  </>
);

export default Blogs;
