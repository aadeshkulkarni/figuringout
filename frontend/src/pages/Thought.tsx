import Appbar from '@/components/Appbar';
import RemoveIcon from '@/components/icons/Remove';
import WriteIcon from '@/components/icons/Write';
import { BACKEND_URL } from '@/config';
import axios from 'axios';
import React, { FormEvent, useEffect, useState } from 'react';
interface Thought {
  id: string;
  content: string;
  publishedDate: Date;
  published: boolean;
  authorId: string;
  author: {
    name: string;
  };
}

const Thought = () => {
  const [content, setContent] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState('');

  const [thoughts, setthoughts] = useState<Thought[]>();
  const userId = JSON.parse(localStorage.getItem('user') as string).id;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isEdit) {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/thought/create`,
          {
            content,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        console.log(response);
        alert('posted your thought successfully');
        window.location.reload();
      } catch (error) {
        alert('something went wrong');
      }
    } else {
      try {
        const response = await axios.put(
          `${BACKEND_URL}/api/v1/thought/update`,
          {
            id:editId,
            content,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        console.log(response);
        alert('updated your thought successfully');
        window.location.reload();
      } catch (error) {
        alert('something went wrong');
      }
    }
  };
  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      setContent(content + '\n');
    }
    console.log(content);
  };

  const handleEdit = (itemId: string, content: string) => {
    setIsEdit(true);
    setContent(content);
    setEditId(itemId);
  };

  const handleCancel = ()=>{
    setIsEdit(false)
    setContent("")
    setEditId("")
  }

  const handleDelete =  async(id:string)=>{
    try {
      
      await axios.delete(
        `${BACKEND_URL}/api/v1/thought/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        alert("deleted successfully")
        window.location.reload()
    } catch (error) {
      // alert("something went wrong")
    }
  }

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${BACKEND_URL}/api/v1/thought/all/${userId}`);
      const { thoughts } = response.data;
      setthoughts(thoughts);
      console.log(thoughts);
    };

    getData();
  }, []);

  return (
    <>
      <Appbar />
      <div className="flex w-full h-full flex-col">
        <div className="flex w-full flex-col items-center justify-center pt-6 mb-2">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-96 h-96 mt-6 items-center justify-start gap-4 border-2 border-gray-400 p-6"
          >
            <div> write your thought</div>
            <textarea
              name="content"
              className="rounded-lg"
              value={content}
              style={{ backgroundColor: '#d3d3d3', height: '80%', width: '95%', color: 'black' }}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleEnter}
            />
            <div className="w-full items-center justify-center flex gap-2">
              <button type="submit" className="bg-gray-100 text-black rounded-md p-2">
                publish
              </button>
             {isEdit&& <button type="button" className="bg-red-100 text-black rounded-md p-2" onClick={handleCancel}>
                cancel
              </button>}
            </div>
          </form>
        </div>
        <hr />
        <div className="flex w-full items-center pt-3  flex-col">
          <div className="text-xl mb-2">My Thoughts</div>
          {thoughts && thoughts.length !== 0 ? (
            thoughts.map((item) => {
              return (
                <div className="border-2 border-gray-200 rounded-md flex flex-col items-center h-40 w-80" key={item.id}>
                  <div className="mb-2 flex">
                    <div>author: {item.author.name}</div>
                    <button
                      type="button"
                      className="focus:outline-none hover:bg-sub rounded-3xl focus:ring-4 focus:ring-gray-100 font-medium flex items-center gap-2 text-sm px-3 md:px-5 "
                      onClick={() => handleEdit(item.id, item.content)}
                    >
                      <WriteIcon />
                    </button>
                    <button
                      type="button"
                      className="focus:outline-none hover:bg-sub rounded-3xl focus:ring-4 focus:ring-gray-100 font-medium flex items-center gap-2 text-sm   "
                      onClick={()=> handleDelete(item.id)}
                    >
                      <RemoveIcon />
                    </button>
                  </div>
                  <div className="w-full p-2">
                    <div>{item.content}</div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="mt-7 text-2xl">No thoughts yet</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Thought;
