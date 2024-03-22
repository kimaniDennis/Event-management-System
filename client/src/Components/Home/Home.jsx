import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file for styling

function Home() {
  return (
    <div className='home'>
      <header className='header'>
        <h1 className='title'>Eventbrite</h1>
        <p className='description'>Your ultimate event planning platform</p>
        <Link to='/planner' className='start-planning-button'>Start Planning Here!</Link>
      </header>
      <section className='image-section'>
        <div className='grid-container'>
          <div className='grid-item'>
            <img src='/src/Images/concert.jpg' alt='Concert' className='fade-in' />
            <div className='overlay'>
              <h2>Concert</h2>
              <p>Find upcoming concerts near you</p>
            </div>
          </div>
          <div className='grid-item'>
            <img src='/src/Images/sportevent.jpg' alt='Sport Event' className='fade-in' />
            <div className='overlay'>
              <h2>Sport Event</h2>
              <p>Join exciting sports events</p>
            </div>
          </div>
          <div className='grid-item'>
            <img src='/src/Images/weddings.jpg' alt='Weddings' className='fade-in' />
            <div className='overlay'>
              <h2>Weddings</h2>
              <p>Plan your dream wedding</p>
            </div>
          </div>
          <div className='grid-item'>
            <img src='/src/Images/happy.jpg' alt='Happy Participants' className='fade-in' />
            <div className='overlay'>
              <h2>Happy Participants</h2>
              <p>Discover joyful events</p>
            </div>
          </div>
          <div className='grid-item'>
            <img src='/src/Images/conference.jpg' alt='Conference' className='fade-in' />
            <div className='overlay'>
              <h2>Conference</h2>
              <p>Attend informative conferences</p>
            </div>
          </div>
          <div className='grid-item'>
            <img src='/src/Images/grandballroom.jpg' alt='Grand Ballroom' className='fade-in' />
            <div className='overlay'>
              <h2>Grand Ballroom</h2>
              <p>Host grand events in style</p>
            </div>
          </div>
          <div className='grid-item'>
            <img src='/src/Images/networking.jpg' alt='Networking' className='fade-in' />
            <div className='overlay'>
              <h2>Networking</h2>
              <p>Connect with professionals</p>
            </div>
          </div>
          <div className='grid-item'>
            <img src='/src/Images/brainstorming.jpg' alt='Brainstorming' className='fade-in' />
            <div className='overlay'>
              <h2>Brainstorming</h2>
              <p>Spark creative ideas</p>
            </div>
          </div>
          <div className='grid-item'>
            <img src='/src/Images/beachscene.jpg' alt='Beach Scene' className='fade-in' />
            <div className='overlay'>
              <h2>Beach Scene</h2>
              <p>Relaxing beach events</p>
            </div>
          </div>
          <div className='grid-item'>
            <img src='/src/Images/snowscene.jpg' alt='Snow Scene' className='fade-in' />
            <div className='overlay'>
              <h2>Snow Scene</h2>
              <p>Enjoy snowy adventures</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
