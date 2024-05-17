const SearchBox = ({searchQuery, setSearchQuery} : any) => {

    return (
        <div className="p-2">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          className='rounded-full p-2 w-48 pl-5 bg-gray-100 outline-none text-sm'
          type="text"
          name=""
          id=""
          placeholder='Search'
        />
      </div>
    )
}

export default SearchBox;