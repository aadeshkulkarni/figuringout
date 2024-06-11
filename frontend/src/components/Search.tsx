import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { BACKEND_URL } from '../config';

interface SearchResult {
  posts: { title: string; id: string }[];
  users: { id: string; name: string }[];
  tags: { id: string; tagName: string }[];
}

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult>({ posts: [], users: [], tags: [] });
  const [loading, setLoading] = useState<boolean>(false);

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

  const debouncedSearch = useCallback(debounce(handleSearch, 200), []);

  useEffect(() => {
    debouncedSearch(query);
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  return (
    <div className="hidden md:block relative md:w-[190px] lg:w-[400px] dark:text-black">
      <input
        type="text"
        className="p-2 px-6 border rounded-full focus:outline-none focus:ring-black focus:ring-1 w-full"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <>
          <div className="absolute top-9 left-0 right-0 bg-white border shadow-lg rounded mt-1 z-10 md:w-[450px] lg:w-[600px] dark:bg-gray-950">
            <div className="p-2">
              <h3 className="text-lg font-semibold py-2 pb-1 dark:text-white">Posts</h3>
              {results.posts.length > 0 ? (
                results.posts.map((post) => (
                  <Link key={post.id} to={`/blog/${post.id}`} className="block p-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 dark:text-white">
                    <div>{post.title}</div>
                  </Link>
                ))
              ) : (
                <div className="p-1">{loading ? 'Loading...' : 'No posts found'} </div>
              )}
            </div>
            <div className="p-2">
              <h3 className="text-lg font-semibold dark:text-white">Users</h3>
              {results.users.length > 0 ? (
                results.users.map((user) => (
                  <Link key={user.id} to={`/profile/${user.id}`} className="block p-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 dark:text-white">
                    <div>{user.name}</div>
                  </Link>
                ))
              ) : (
                <div className="p-1">{loading ? 'Loading...' : 'No users found'} </div>
              )}
            </div>
            <div className="p-2">
              <h3 className="text-lg font-semibold dark:text-white">Tags</h3>
              {results.tags.length > 0 ? (
                results.tags.map((tag) => (
                  <div key={tag.id} className="p-1 cursor-pointer dark:text-white dark:hover:bg-gray-900">
                    {tag.tagName}
                  </div>
                ))
              ) : (
                <div className="p-1">{loading ? 'Loading...' : 'No tags found'} </div>
              )}
            </div>
          </div>
          <div
            className="overlay h-screen w-screen fixed top-0 left-0 bg-black bg-opacity-10 "
            onClick={() => setQuery('')}
          ></div>
        </>
      )}
    </div>
  );
};

export default Search;
