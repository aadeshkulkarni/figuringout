import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { BlogType } from "../pages/Blogs";
import { useNavigate } from "react-router-dom";

export const useBlogs = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
      }
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs(response.data.posts);
      setLoading(false);
    }
    fetchBlogs();
  }, []);

  return {
    loading,
    blogs,
  };
};

export const useBlog = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<BlogType>({
    id: "",
    title: "",
    content: "",
    publishedDate: "",
    author: {
      id: "",
      name: "",
    },
  });

  async function fetchBlog() {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
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
    const response = await axios.delete(
      `${BACKEND_URL}/api/v1/blog/${blogId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.message;
  }

  async function editBlog({
    id,
    title,
    content,
  }: {
    id: string;
    title: string;
    content: string;
  }) {
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
      return { error: "An error has occured trying to edit the blog" };
    } finally {
      setLoading(false);
    }
  }

  async function bookmarkBlog() {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog/bookmark`,
        {
          id,
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
      return { error: "An error has occured trying to edit the blog" };
    } finally {
      setLoading(false);
    }
  }

  async function unbookmarkBlog() {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog/unbookmark`,
        {
          id,
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
      return { error: "An error has occured trying to edit the blog" };
    } finally {
      setLoading(false);
    }
  }
  return {
    loading,
    blog,
    deleteBlog,
    editBlog,
    bookmarkBlog,
    unbookmarkBlog,
  };
};

export const useUserBookmarks = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    async function fetchBookmarks() {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
      }
      const response = await axios.get(`${BACKEND_URL}/api/v1/user/bookmarks`, {
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
