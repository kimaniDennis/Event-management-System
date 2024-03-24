import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='bg-gray-200 min-h-screen'>
      <header className='bg-blue-500 text-white py-8'>
        <div className='container mx-auto px-4'>
          <h1 className='text-3xl font-bold'>Eventbrite</h1>
          <p className='text-lg'>Your ultimate event planning platform</p>
          <Link to='/planner' className='mt-4 inline-block bg-white text-blue-500 py-2 px-6 rounded-lg shadow-md hover:bg-blue-400 hover:text-white transition duration-300'>Start Planning Here!</Link>
        </div>
      </header>
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {events.map((event, index) => (
              <div key={index} className='relative overflow-hidden rounded-lg shadow-md'>
                <img src={event.image} alt={event.title} className='w-full h-auto' />
                <div className='absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center p-4 transition duration-300 opacity-0 hover:opacity-100'>
                  <h2 className='text-white text-lg font-semibold'>{event.title}</h2>
                  <p className='text-white'>{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const events = [
  { title: 'Concert', description: 'Find upcoming concerts near you', image: '/src/Images/concert.jpg' },
  { title: 'Sport Event', description: 'Join exciting sports events', image: '/src/Images/sportevent.jpg' },
  { title: 'Weddings', description: 'Plan your dream wedding', image: '/src/Images/weddings.jpg' },
  { title: 'Happy Participants', description: 'Discover joyful events', image: '/src/Images/happy.jpg' },
  { title: 'Conference', description: 'Attend informative conferences', image: '/src/Images/conference.jpg' },
  { title: 'Grand Ballroom', description: 'Host grand events in style', image: '/src/Images/grandballroom.jpg' },
  { title: 'Networking', description: 'Connect with professionals', image: '/src/Images/networking.jpg' },
  { title: 'Brainstorming', description: 'Spark creative ideas', image: '/src/Images/brainstorming.jpg' },
  { title: 'Beach Scene', description: 'Relaxing beach events', image: '/src/Images/beachscene.jpg' },
  { title: 'Snow Scene', description: 'Enjoy snowy adventures', image: '/src/Images/snowscene.jpg' },
];

export default Home;
