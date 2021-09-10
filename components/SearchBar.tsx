import Button from './Button';

const SearchBar = () => (
  <div className="flex justify-between items-center pt-[60px] h-40 w-3/4 bg-gray-100 px-7 gap-4 ">
    <input placeholder="Search ..." className="h-12 flex-grow px-4" />
    <Button type="submit" variant="blue">
      SEARCH
    </Button>
  </div>
);

export default SearchBar;
