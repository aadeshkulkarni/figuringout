import React from "react";

interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBox = ({ searchQuery, setSearchQuery }: SearchBoxProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <input
      type="text"
      value={searchQuery}
      onChange={handleInputChange}
      placeholder="Search..."
      className="border rounded-lg px-3 py-2 text-sm"
    />
  );
};

export default SearchBox;
