
import Input from "antd/es/input";
import Tooltip from "antd/es/tooltip"

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  totalCount: number;
}

export default function SearchBar({ onSearch, totalCount }: SearchBarProps): JSX.Element {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    onSearch(newSearchTerm);
  };

  return (
    <div className='flex items-center	justify-end'>
      <span data-testid="count" className="inline-block px-2 py-1 mr-2 text-sm font-semibold text-white bg-blue-800 rounded">
         {totalCount}
      </span>
      <Input
        className='lg:w-1/4 md:w-1/2'
        placeholder="Filter podcasts..."
        allowClear
        onChange={handleSearch}
        suffix={totalCount > 0 && (
          <Tooltip title="Enter the name or title of the podcast">
            <span role="img"
                  aria-label="icono-informativo"
                  style={{ fontSize: "18px", color: "gray" }}>
            ℹ️
          </span>
          </Tooltip>
        )}
      />
    </div>
  );
}
