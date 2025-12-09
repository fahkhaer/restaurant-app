import { Command, CommandInput } from './command';

function SearchBar() {
  return (
    <>
      <div>
        <Command className='rounded-full justify-center h-14 border border-neutral-300 gap-2 px-4 md:min-w-[604px]'>
          <CommandInput placeholder='Search restaurants, food and drink' />
        </Command>
      </div>
    </>
  );
}

export default SearchBar;
