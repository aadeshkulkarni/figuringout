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
      name: "",
    },
  });

  useEffect(() => {
    async function fetchBlogs() {
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
    fetchBlogs();
  }, [id]);

  return {
    loading,
    blog,
  };
};
