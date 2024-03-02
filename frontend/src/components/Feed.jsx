import BlogCard from "../components/BlogCard";

import SearchIcon from "../assets/icon/search.svg";
import CrossIcon from "../assets/icon/cross.svg";

const Feed = ({
  blogs,
  searchText,
  setSearchText,
  searchResults,
  setSearchResults,
  handleSearchChange,
  handleCutButton,
}) => {
  return (
    <div>
      <div className="flex items-center justify-center gap-4 ml-4 my-4 px-4 py-2 w-[95%] rounded-md border-2 border-gray-400">
        <img src={SearchIcon} alt="search_icon" className="w-5" />
        <input
          placeholder="Search blogs by author, title, description, content and tag"
          value={searchText}
          onChange={handleSearchChange}
          className="rounded-md w-full outline-none"
        />
        {searchText && searchText ? (
          <img
            src={CrossIcon}
            alt="cut_icon"
            className="w-6 cursor-pointer"
            onClick={handleCutButton}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="h-[76vh] overflow-scroll no-scrollbar">
        {searchText
          ? searchResults &&
            searchResults.map((blog) => (
              <BlogCard
                key={blog._id}
                post={blog}
                renderingOn="Feed"
                author={blog.author.fullname}
                authorId={blog.author._id}
              />
            ))
          : blogs &&
            blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                post={blog}
                renderingOn="Feed"
                author={blog.author.fullname}
                authorId={blog.author._id}
              />
            ))}
      </div>
    </div>
  );
};

export default Feed;
