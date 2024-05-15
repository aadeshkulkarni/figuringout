import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useUserBlogs = (userId: string) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
      }
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/blog/bulkUser/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
export const useUser = (userId: string) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [editingDetails, setEditingDetails] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [error, setError] = useState<string>("");
  async function fetchUser() {
    if (loading) {
      return;
    }
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentUser(response.data.user);
    } catch (e) {
      setError("User not found");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  async function editUserDetails(
    details: string,
    updateUserOnSuccess: boolean = false
  ) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
      }
      setEditingDetails(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/updateDetail`,
        {
          details,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (updateUserOnSuccess) {
        setCurrentUser((prev: any) => ({ ...prev, details }));
      }
      return response.data;
    } catch (e) {
      return { error: "An error has occured trying to edit the user details" };
    } finally {
      setEditingDetails(false);
    }
  }
  return {
    loading,
    currentUser,
    editingDetails,
    editUserDetails,
    error,
  };
};
