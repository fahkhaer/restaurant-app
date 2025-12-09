import Card from '@/components/ui/card';
import LoadMoreButton from '@/components/ui/loadMoreButton';

function Home() {
  const filter = [
    { desc: 'All Restaurant' },
    { desc: 'Nearby' },
    { desc: 'Discount' },
    { desc: 'Category' },
    { desc: 'Delivery' },
    { desc: 'Lunch' },
  ];
  return (
    <section>
      <div className='flex justify-between flex-wrap gap-3 my-10'>
        {filter.map((item, i) => (
          <div
            key={i}
            className='shadow-card bg-white rounded-2xl flex flex-col p-2 gap-2 flex-1 min-w-26.5 max-w-40.5'
          >
            <div className='w-full bg-[#E0ECFF] rounded-xl p-3 grid place-items-center'>
              <img
                className='size-12'
                src={`/src/assets/images/${item.desc}.png`}
                alt='icon'
              />
            </div>
            <p className='text-lg-bold text-center'>{item.desc}</p>
          </div>
        ))}
      </div>
      <span className='display-md-extrabold'>Recommended</span>
      <div className='flex justify-between gap-10'>
        <Card />
        <Card />
        <Card />
      </div>
      <LoadMoreButton className='mt-[41px]' />
    </section>
  );
}

export default Home;
