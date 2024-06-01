import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Blog from './pages/Blog';
import Blogs from './pages/Blogs';
import Publish from './pages/Publish';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Bookmarks from './pages/Bookmarks';
import User from './pages/User';
import Contributor from './pages/Contributor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/profile/:id" element={<User />} />
        <Route path="/contributors" element={<Contributor />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
