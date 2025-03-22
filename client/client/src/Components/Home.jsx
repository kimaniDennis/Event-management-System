import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <div className="container mx-auto py-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">EventElevate</h1>
            <p className="text-lg text-gray-200 mb-6">
              Welcome to EventElevate, where seamless event management meets innovation, creating unforgettable experiences every time.
            </p>
            {/* Updated Start Now button to correctly redirect to the signup page */}
            <Link to="/signup">
              <button className="bg-white text-blue-500 px-8 py-3 rounded-full font-semibold hover:bg-blue-400 hover:text-white transition duration-300">
                Start Now
              </button>
            </Link>
          </div>
        </div>
      </header>

      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6">See Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { img: 'concert.jpg', title: 'Culture Fest' },
              { img: 'grandballroom.jpg', title: 'Gallery Display' },
              { img: 'weddings.jpg', title: "Tevin's Wedding" },
              { img: 'conference.jpg', title: 'Agri-Business Summit' },
              { img: 'brainstorming.jpg', title: 'Mathematics and Science Triathlon' },
              { img: 'beachscene.jpg', title: 'Sea Food and Cultural Exchange Festival' },
            ].map((event, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={`/src/Images/${event.img}`} alt={event.title} className="w-full h-64 object-cover object-center" />
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <i className="ri-map-pin-2-fill text-blue-500"></i>
                    <span className="ml-2 font-semibold">{event.title}</span>
                  </div>
                  <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-400">Read more</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Event Planning Tips</h2>
          <p className="text-lg text-gray-700 mb-6">
            Here are some valuable tips and advice to help you plan your next event successfully.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Tip #1: Start Early', text: 'Begin planning your event well in advance to ensure you have enough time to secure venues, vendors, and other essentials.' },
              { title: 'Tip #2: Set a Budget', text: 'Establish a budget for your event and allocate funds for different aspects such as venue rental, catering, decorations, and marketing.' },
              { title: 'Tip #3: Define Your Goals', text: 'Clearly define the objectives and goals of your event to ensure all planning efforts are aligned with your desired outcomes.' },
            ].map((tip, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
                <p className="text-gray-700">{tip.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-lg text-gray-700 mb-6">
            Discover the reasons why EventElevate is the perfect choice for your event management needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { img: 'happy.jpg', title: 'Making People Happy', text: 'We strive to create memorable experiences that bring joy and happiness to all attendees.' },
              { img: 'sportevent.jpg', title: 'Bringing People Together', text: 'Our events foster a sense of community and unity by bringing people together for shared experiences.' },
              { img: 'networking.jpg', title: 'Facilitating Networking', text: 'Our events provide opportunities for individuals to socialize, network, and build valuable connections.' },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <img src={`/src/Images/${feature.img}`} alt={feature.title} className="w-full h-64 object-cover object-center rounded-lg mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
