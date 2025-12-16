import MyOrderCard from '@/components/MyOrderCard';
import GiveReview from '@/components/ui/GiveReview';
import { Command, CommandInput } from '@/components/ui/command';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/custom/tabs';
import { useMyOrders } from '@/services/api/order';
import type { Order, OrderStatus } from '@/types/order';
import { useState } from 'react';

function MyOrderPage() {
  const [status, setStatus] = useState<OrderStatus>('done');

  //review success
  const [reviewedTx, setReviewedTx] = useState<string[]>([]);

  const { data, isLoading, isError } = useMyOrders(status);
  console.log('orderangua', data);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  const handleStatusChange = (value: string) => {
    const validStatuses: OrderStatus[] = [
      'preparing',
      'on_the_way',
      'delivered',
      'done',
      'cancelled',
    ];
    if (validStatuses.includes(value as OrderStatus)) {
      setStatus(value as OrderStatus);
    }
  };

  return (
    <div className='flex-1 shadow-card p-6 space-y-5 rounded-2xl'>
      <h1>My Orders</h1>
      <div className='w-full md:w-[600px]'>
        <Command className='h-12 rounded-full justify-center border border-neutral-300 gap-2 md:min-w-[500px]'>
          <CommandInput
            className='text-neutral-600 text-sm'
            placeholder='Search book'
          />
        </Command>
      </div>

      <Tabs defaultValue='done' onValueChange={handleStatusChange}>
        <TabsList className='w-fit pt-0 pb-5 justify-start gap-3'>
          <span className='text-lg-bold text-[#0A0D12]'>Status</span>
          <TabsTrigger value='preparing'>Preparing</TabsTrigger>
          <TabsTrigger value='on_the_way'>On The Way</TabsTrigger>
          <TabsTrigger value='delivered'>Delivered</TabsTrigger>
          <TabsTrigger value='done'>Done</TabsTrigger>
          <TabsTrigger value='cancelled'>Cancelled</TabsTrigger>
        </TabsList>

        {['preparing', 'on_the_way', 'delivered', 'done', 'cancelled'].map(
          (tab) => (
            <TabsContent
              key={tab}
              value={tab}
              className='flex flex-col mt-0 space-y-5 divide-neutral-300'
            >
              {(data?.orders?.length ?? 0) > 0 ? (
                data?.orders?.map((order: Order) => (
                  <MyOrderCard
                    key={order.id}
                    order={order}
                    rightContent={
                      <GiveReview
                        transactionId={order.transactionId}
                        restaurantId={order.restaurants[0].restaurant.id}
                        menus={order.restaurants[0].items}
                        hasReviewed={reviewedTx.includes(order.transactionId)}
                        onSuccess={() =>
                          setReviewedTx((prev) => [
                            ...prev,
                            order.transactionId,
                          ])
                        }
                      />
                    }
                  />
                ))
              ) : (
                <p className='text-center text-neutral-500 py-6'>
                  No {tab.replace('_', ' ')} order found.
                </p>
              )}
            </TabsContent>
          )
        )}
      </Tabs>
    </div>
  );
}

export default MyOrderPage;
