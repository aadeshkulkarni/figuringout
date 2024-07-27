import axios from 'axios';
import { useState } from 'react';
import { BACKEND_URL } from '../config';

interface Thought {
  id: string;
  content: string;
  authorId: string;
}

const Thought = () => {
  const [thought, setThought] = useState('');
  const { createThought, EditThought, deleteThought, getAllThoughts, thoughts } = ThoughtHook();

  const handleAddThought = () => {
    createThought(thought);
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-10">Thought</h1>
      <p className="text-center mt-5">This is a thought page</p>
      <div>
        <h1>Create a Thought</h1>
        <div>
            <textarea
              className="w-96 h-36 p-2 border border-gray-300 rounded-md"
              placeholder="What's on your mind?"
              value={thought}
              onChange={(e) => setThought(e.target.value)}
            ></textarea>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleAddThought}>
              Post
            </button>
        </div>
      </div>
      <div>
        <h1>Thoughts</h1>
        <button onClick={getAllThoughts}>Get All Thoughts</button>
        <div>
          {thoughts.map((thought : any) => (
            <div key={thought.id}>
              <p>{thought.content}</p>
              <button onClick={() => EditThought(thought.id)}>Edit</button>
              <button onClick={() => deleteThought(thought.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const ThoughtHook = () => {
  const token = localStorage.getItem('token');
  const [thoughts, setThoughts] = useState<Thought[]>([]);

  async function createThought(thought : string) {

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/thought`, {
        thought
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  async function EditThought( id : string) {
    try {
      const response = await axios.put(`${BACKEND_URL}/api/v1/thought/${id}`, {
        newThought: 'This is a new thought'
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteThought( id : string) {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/v1/thought/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    );
      console.log(response);
    }
    catch (error) {
      console.error(error);
    }
  }

  async function getAllThoughts() {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/thought`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
      );
      setThoughts(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  async function getThought( id : string) {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/thought/${id}`);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }


  return {
    createThought,
    EditThought,
    deleteThought,
    getAllThoughts,
    getThought,
    thoughts,
  }
}


export default Thought