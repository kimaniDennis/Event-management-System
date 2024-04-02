import React from 'react';

function Home() {
  return (
    <div>
     <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <div className="container mx-auto py-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">EventElevate</h1>
            <p className="text-lg text-gray-200 mb-6">Welcome to EventElevate, where seamless event management meets innovation, creating unforgettable experiences every time.</p>
            <button className="bg-white text-blue-500 px-8 py-3 rounded-full font-semibold hover:bg-blue-400 hover:text-white transition duration-300">Start Now</button>
          </div>
        </div>
      </header>

      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6 items-center justify-center flex">See Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src="/src/Images/concert.jpg" alt="concert" className="w-full h-64 object-cover object-center" />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <i className="ri-map-pin-2-fill text-blue-500"></i>
                  <span className="ml-2 font-semibold">Culture Fest</span>
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-400">Read more</button>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src="/src/Images/grandballroom.jpg" alt="Gallery" className="w-full h-64 object-cover object-center" />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <i className="ri-map-pin-2-fill text-blue-500"></i>
                  <span className="ml-2 font-semibold">Gallery Display</span>
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-400">Read more</button>
              </div>
              </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src="/src/Images/weddings.jpg" alt="concert" className="w-full h-64 object-cover object-center" />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <i className="ri-map-pin-2-fill text-blue-500"></i>
                  <span className="ml-2 font-semibold">Tevin's Wedding</span>
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-400">Read more</button>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src="/src/Images/conference.jpg" alt="concert" className="w-full h-64 object-cover object-center" />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <i className="ri-map-pin-2-fill text-blue-500"></i>
                  <span className="ml-2 font-semibold">Agri-Business Summit</span>
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-400">Read more</button>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src="/src/Images/brainstorming.jpg" alt="concert" className="w-full h-64 object-cover object-center" />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <i className="ri-map-pin-2-fill text-blue-500"></i>
                  <span className="ml-2 font-semibold">Mathematics  and Science Triathlon</span>
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-400">Read more</button>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src="/src/Images/beachscene.jpg" alt="concert" className="w-full h-64 object-cover object-center" />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <i className="ri-map-pin-2-fill text-blue-500"></i>
                  <span className="ml-2 font-semibold">Sea Food and Cultural Exchange Festival</span>
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-400">Read more</button>
              </div>
            </div>
            </div>
        </div>
      </section>

      <section className="py-12 bg-gray-100">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Event Planning Tips</h2>
          <p className="text-lg text-gray-700">Here are some valuable tips and advice to help you plan your next event successfully.</p>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Tip #1: Start Early</h3>
            <p className="text-gray-700">Begin planning your event well in advance to ensure you have enough time to secure venues, vendors, and other essentials.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Tip #2: Set a Budget</h3>
            <p className="text-gray-700">Establish a budget for your event and allocate funds for different aspects such as venue rental, catering, decorations, and marketing.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Tip #3: Define Your Goals</h3>
            <p className="text-gray-700">Clearly define the objectives and goals of your event to ensure all planning efforts are aligned with your desired outcomes.</p>
          </div>
          {/* Add more tips here */}
        </div>
      </div>
      </section>

      <section className="py-12">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-lg text-gray-700">Discover the reasons why EventElevate is the perfect choice for your event management needs.</p>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src="/src/Images/happy.jpg" alt="Making people happy" className="w-full h-64 object-cover object-center rounded-lg mb-4" />
            <h3 className="text-xl font-semibold mb-2">Making People Happy</h3>
            <p className="text-gray-700">We strive to create memorable experiences that bring joy and happiness to all attendees.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src="/src/Images/sportevent.jpg" alt="Bringing people together" className="w-full h-64 object-cover object-center rounded-lg mb-4" />
            <h3 className="text-xl font-semibold mb-2">Bringing People Together</h3>
            <p className="text-gray-700">Our events foster a sense of community and unity by bringing people together for shared experiences.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src="/src/Images/networking.jpg" alt="People are able to socialize and network" className="w-full h-64 object-cover object-center rounded-lg mb-4" />
            <h3 className="text-xl font-semibold mb-2">Facilitating Networking</h3>
            <p className="text-gray-700">Our events provide opportunities for individuals to socialize, network, and build valuable connections.</p>
          </div>
        </div>
      </div>
    </section>

    </div>
  );
}

export default Home;
