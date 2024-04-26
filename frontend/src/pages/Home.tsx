import Appbar from "../components/Appbar";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <div>
      <Appbar />
      <Hero />
      <div className=" bg-gray-100 text-gray-800 grid grid-cols-12">
        <div className="col-span-12 order-2 md:order-1 md:col-span-6 p-6">
          <h1 className="text-6xl font-extralight py-2">Everyone has a story to tell.</h1>
          <p className="py-4 text-lg leading-8">
            Medium is a home for human stories and ideas. Here, anyone can share insightful perspectives, useful knowledge, and life wisdom with the world—without building a mailing list or a
            following first. The internet is noisy and chaotic; Medium is quiet yet full of insight. It’s simple, beautiful, collaborative, and helps you find the right audience for whatever you have
            to say.
          </p>
          <p className="py-4 text-lg leading-8">
            We believe that what you read and write matters. Words can divide or empower us, inspire or discourage us. In a world where the most sensational and surface-level stories often win, we’re
            building a system that rewards depth, nuance, and time well spent. A space for thoughtful conversation more than drive-by takes, and substance over packaging.
          </p>
          <p className="py-4 text-lg leading-8">Ultimately, our goal is to deepen our collective understanding of the world through the power of writing.</p>
        </div>
        <img className="col-span-12 order-1 md:order-2 md:col-span-6 h-full object-cover" src="https://images.pexels.com/photos/211816/pexels-photo-211816.jpeg" alt="blog-image"/>
      </div>
    </div>
  );
};

export default Home;
