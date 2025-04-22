import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    navigate('/eventform'); // Go to event creation form
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard'); // Go to dashboard
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Hi, Welcome to EventElevate! 🎉</h1>
        <p className="text-gray-600">Do you wish to create an event or view your dashboard?</p>

        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={handleCreateEvent}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Create an Event
          </button>
          <button
            onClick={handleGoToDashboard}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
