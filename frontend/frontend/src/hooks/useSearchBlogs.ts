import { useState, useEffect } from "react";


const useSearchBlogs = (initialBlogs) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedData, setSearchedData] = useState(initialBlogs);

  useEffect(() => {
    if (searchQuery) {
      const debouncedSearch = setTimeout(() => {
        setSearchedData(
          initialBlogs.filter((blog) =>
            blog.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      }, 500); // Adjust the debounce delay as needed

      return () => clearTimeout(debouncedSearch);
    } else {
      setSearchedData(initialBlogs);
    }
  }, [searchQuery, initialBlogs]);

  return { searchQuery, setSearchQuery, searchedData };
};

export default useSearchBlogs;
