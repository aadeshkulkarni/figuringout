import Appbar from '../components/Appbar';
import BlogsList from '../components/BlogsList';
import Hero from '../components/Hero';

const Home = () => {
  return (
    <div>
      <Appbar skipAuthCheck />
      <Hero />
      <BlogsList />
    </div>
  );
};

export default Home;
