import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Spinner from './components/Spinner';
import { ThemeProvider } from '@/components/theme-provider';
// const Home = lazy(() => import('./pages/Home'));
const Signup = lazy(() => import('./pages/Signup'));
const Signin = lazy(() => import('./pages/Signin'));
const Blog = lazy(() => import('./pages/Blog'));
const Blogs = lazy(() => import('./pages/Blogs'));
const Publish = lazy(() => import('./pages/Publish'));
const Edit = lazy(() => import('./pages/Edit'));
const Bookmarks = lazy(() => import('./pages/Bookmarks'));
const User = lazy(() => import('./pages/User'));
const Contributor = lazy(() => import('./pages/Contributor'));
const Error = lazy(() => import('./pages/404'));
function App() {
  return (
    <ThemeProvider>
      <div>
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="w-screen h-screen flex justify-center items-center">
                <Spinner />
              </div>
            }
          >
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
              <Route path='*' element={<Error />} />
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/" element={<Blogs />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-main bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(17,94,89,0.3),rgba(255,255,255,0))]"></div>
      </div>
    </ThemeProvider>
  );
}

export default App;
