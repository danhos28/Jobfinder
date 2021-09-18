import Button from './Button';

const SearchBar = () => (
  <div className="flex justify-between items-center pt-[60px] h-40 w-full sm:w-[90vw] md:w-3/4 bg-gray-100 px-7 gap-4">
    <input placeholder="Search ..." className="h-12 flex-grow px-4" />
    <Button type="submit" variant="blue">
      <div className="flex items-center gap-2">
        <div className="hidden sm:block">SEARCH</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </Button>
  </div>
);

export default SearchBar;
