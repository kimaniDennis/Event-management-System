import React from 'react';
import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      fetch('http://127.0.0.1:5555/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('signup response', data);
        })
        .catch((error) => {
          console.error('error signing up', error);
        });
    } else {
      fetch('http://127.0.0.1:5555/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('login data', data);
        })
        .catch((error) => {
          console.error('error logging in', error);
        });
    }
  };

  return (
    <div className="grid grid-cols-2 h-screen w-full items-center justify-center ml-[15%] mt-0">
      <div className="grid w-full h-screen justify-center">
        <form
          className="card flex flex-col gap-7 p-6 h-[500px] mt-[60px]"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full items-center justify-center mb-6">
            <h2 className="text-[#811181] text-3xl">
              {isSignUp ? 'Sign up' : 'Login'}
            </h2>
          </div>
          <input
            type="text"
            value={userName}
            onChange={handleNameChange}
            placeholder="Username..."
            className="form"
          />
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter email..."
            className="form"
          />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter password..."
            className="form"
          />
          <button
            type="submit"
            className="w-[300px] h-10 bg-gradient-to-r from-[#811181] to-[#c065c0] text-white px-4 py-2 rounded"
          >
            {isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        <p
          className="w-full items-center justify-center flex cursor-pointer"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp
            ? 'Already have an account? Log in'
            : "Don't have an account? Sign up"}
        </p>
      </div>
      <div className="flex h-screen w-full items-center ronded-sm shadow-lg justify-center">
        {/* <video
        className=" card w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        </>
      </video> */}
      </div>
    </div>
  );
}

export default Login;
