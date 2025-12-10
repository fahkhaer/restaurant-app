import MyOrderCard from '@/components/MyOrderCard';
import SideBarProfile from '@/components/SideBarProfile';
import GiveReview from '@/components/ui/GiveReview';
import { Command, CommandInput } from '@/components/ui/command';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function Review() {
  return (
    <section className='flex gap-8'>
      <SideBarProfile />
      {/* right content */}
      <div className='flex-1 shadow-card p-6 space-y-5 rounded-2xl'>
        <h1>My Orders</h1>
        <div className='w-full md:w-[600px]'>
          <Command className='h-12 rounded-full justify-center border border-neutral-300 gap-2  md:min-w-[500px]'>
            <CommandInput
              className='text-neutral-600 text-sm'
              placeholder='Search book'
            />
          </Command>
        </div>

        {/* tabs */}
        <Tabs defaultValue='preparing'>
          <TabsList className='w-fit pt-0 pb-5 justify-start gap-3'>
            <span className='text-lg-bold text-[#0A0D12]'>Status</span>

            <TabsTrigger value='preparing' className='text-md-semibold '>
              Preparing
            </TabsTrigger>
            <TabsTrigger value='otw' className='text-md-semibold '>
              On The Way
            </TabsTrigger>
            <TabsTrigger value='delivered' className='text-md-semibold '>
              Delivered
            </TabsTrigger>
            <TabsTrigger value='done' className='text-md-semibold '>
              Done
            </TabsTrigger>
            <TabsTrigger value='canceled' className='text-md-semibold '>
              Canceled
            </TabsTrigger>
          </TabsList>

          {/* tab content */}
          <TabsContent
            value='preparing'
            className='flex flex-col mt-0 divide-neutral-300'
          >
            <MyOrderCard rightContent={<GiveReview />} />

            {/* <p className='text-center text-neutral-500 py-6'>
            No preparing loans found.
          </p> */}
          </TabsContent>

          <TabsContent
            value='otw'
            className='flex flex-col mt-0 divide-neutral-300'
          >
            <p className='text-center text-neutral-500 py-6'>
              No otw loans found.
            </p>
          </TabsContent>

          <TabsContent
            value='delivered'
            className='flex flex-col mt-0 divide-neutral-300'
          >
            <p className='text-center text-neutral-500 py-6'>
              No delivered loans found.
            </p>
          </TabsContent>

          <TabsContent
            value='done'
            className='flex flex-col mt-0 divide-neutral-300'
          >
            <p className='text-center text-neutral-500 py-6'>
              No done loans found.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

export default Review;
