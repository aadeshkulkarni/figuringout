import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { BACKEND_URL } from '../config';
import Spinner from './Spinner';

interface SearchResult {
  posts: { title: string; id: string }[];
  users: { id: string; name: string }[];
  tags: { id: string; tagName: string }[];
}

const Search: React.FC = () => {
  const { id } = useParams();
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult>({ posts: [], users: [], tags: [] });
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setQuery('');
  }, [id]);
  const handleSearch = async (keyword: string) => {
    if (keyword.trim().length === 0) {
      setResults({ posts: [], users: [], tags: [] });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/search?keyword=${keyword}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching search results', error);
      setResults({ posts: [], users: [], tags: [] });
    } finally {
      setLoading(false);
    }
  };

  const getHighlightedText = (text: string, query: string) => {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) => {
          return part.toLowerCase() === query.toLowerCase() ? <b key={index}>{part}</b> : part;
        })}
      </span>
    );
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 200), []);

  useEffect(() => {
    debouncedSearch(query);
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  return (
    <div className="hidden md:block relative md:w-[190px] lg:w-[400px]">
      {loading && (
        <div className="inline-block absolute opacity-70 md:top-3 lg:top-3 md:left-[80%] lg:left-[90%]">
          <Spinner className="h-5 w-5" />
        </div>
      )}
      <input
        type="text"
        className="p-2 px-6 border rounded-full focus:outline-none focus:ring-black focus:ring-1 w-full bg-main text-main"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <>
          <div className="absolute top-9 left-0 right-0 bg-main border overflow-y-scroll no-scrollbar max-h-80 md:max-h-80 lg:max-h-96 border-gray-100 dark:border-gray-700 shadow-lg rounded-2xl mt-1 z-10 w-[230px] md:w-[400px] lg:w-[100%]">
            <div className="p-2">
              <h3 className="text-lg font-semibold py-2 pb-1">Posts</h3>
              {results.posts.length > 0 ? (
                results.posts.map((post) => (
                  <Link key={post.id} to={`/blog/${post.id}`} className="block p-1 cursor-pointer hover:bg-sub">
                    <div className="border-gray-300 dark:border-gray-800 border-b pb-2 hover:bg-slate-100 hover:dark:bg-slate-800">
                      {getHighlightedText(post.title, query)}
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-1">{loading ? 'loading...' : 'No posts found'} </div>
              )}
            </div>
            <div className="p-2">
              <h3 className="text-lg font-semibold">Users</h3>
              {results.users.length > 0 ? (
                results.users.map((user) => (
                  <Link key={user.id} to={`/profile/${user.id}`} className="block p-1 cursor-pointer hover:bg-sub">
                    <div>{getHighlightedText(user.name, query)}</div>
                  </Link>
                ))
              ) : (
                <div className="p-1">{loading ? 'Loading...' : 'No users found'} </div>
              )}
            </div>
            <div className="p-2">
              <h3 className="text-lg font-semibold">Tags</h3>
              {results.tags.length > 0 ? (
                results.tags.map((tag) => (
                  <Link key={tag.id} to={`/blogs?tag=${tag.id}`} className="block p-1 cursor-pointer hover:bg-sub">
                    <div>{getHighlightedText(tag.tagName, query)}</div>
                  </Link>
                ))
              ) : (
                <div className="p-1">{loading ? 'Loading...' : 'No tags found'} </div>
              )}
            </div>
          </div>
          <div
            className="overlay h-screen w-screen fixed top-0 left-0 bg-black bg-opacity-10"
            onClick={() => setQuery('')}
          ></div>
        </>
      )}
    </div>
  );
};

export default Search;
