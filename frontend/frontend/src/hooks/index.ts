import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import useSearchBlogs from "./useSearchBlogs"; // Import the new hook
import { BlogType } from "../pages/Blogs";

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    async function fetchBlogs() {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`);
      setBlogs(response.data.posts);
      setLoading(false);
    }
    fetchBlogs();
  }, []);

  const { searchQuery, setSearchQuery, searchedData } = useSearchBlogs(blogs);

  return {
    loading,
    blogs: searchedData,
    searchQuery,
    setSearchQuery,
  };
};

export const useBlog = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submittingBookmark, setSubmittingBookmark] = useState(false);
  const [submittingClap, setSubmittingClap] = useState(false);
  const [blog, setBlog] = useState<BlogType>({
    id: "",
    title: "",
    content: "",
    publishedDate: "",
    author: {
      id: "",
      name: "",
    },
    claps: [],
  });

  async function fetchBlog() {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signup");
    }
    const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setBlog(response.data.post);
    setLoading(false);
  }

  useEffect(() => {
    fetchBlog();
  }, [id]);

  async function deleteBlog(blogId: string) {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
    const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/${blogId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.message;
  }

  async function editBlog({ id, title, content }: { id: string; title: string; content: string }) {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
    setLoading(true);
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/v1/blog`,
        {
          id: id,
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      return { error: "An error has occurred trying to edit the blog" };
    } finally {
      setLoading(false);
    }
  }

  async function bookmarkBlog() {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
    setSubmittingBookmark(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/bookmark`,
        {
          blogId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchBlog();
      return response.data;
    } catch (e) {
      return { error: "An error has occurred trying to edit the blog" };
    } finally {
      setSubmittingBookmark(false);
    }
  }

  async function unbookmarkBlog(bookmarkId: string) {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
    setSubmittingBookmark(true);
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/v1/bookmark/${bookmarkId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchBlog();
      return response.data;
    } catch (e) {
      return { error: "An error has occurred trying to edit the blog" };
    } finally {
      setSubmittingBookmark(false);
    }
  }

  async function likeBlog() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
      }
      setSubmittingClap(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/clap`,
        {
          blogId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchBlog();
      return response.data;
    } catch (e) {
      return { error: "An error has occurred trying to edit the blog" };
    } finally {
      setSubmittingClap(false);
    }
  }

  return {
    loading,
    blog,
    submittingBookmark,
    submittingClap,
    deleteBlog,
    editBlog,
    bookmarkBlog,
    unbookmarkBlog,
    likeBlog,
  };
};

export const useBookmarks = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    async function fetchBookmarks() {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
      }
      const response = await axios.get(`${BACKEND_URL}/api/v1/bookmark`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookmarks(response.data.payload);
      setLoading(false);
    }
    fetchBookmarks();
  }, []);

  return {
    loading,
    bookmarks,
  };
};
