//belum disesuaikan di figma

import { Search } from 'lucide-react';
import { Command, CommandInput } from './command';

function SearchBar() {
  return (
    <>
      <div>
        <Command className='rounded-full justify-center h-22 border border-neutral-300 gap-2 px-4 md:min-w-[500px]'>
          <CommandInput
            className='text-neutral-600 text-sm '
            placeholder='Search book'
          />
        </Command>
      </div>
      {/* for mobile */}
      <div className='flex gap-6 items-center '>
        <Search className='lg:hidden block' />
      </div>
    </>
  );
}

export default SearchBar;
