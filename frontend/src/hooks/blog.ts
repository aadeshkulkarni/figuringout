import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config';
import axios from 'axios';

export const useAI = () => {
  const navigate = useNavigate();
  async function generateBlog(title: string) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin');
      }
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog/generate`,
        {
          title: title,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      return { error: 'An error has occured trying to edit the blog' };
    }
  }

  return {
    generateBlog,
  };
};
