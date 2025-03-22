import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5555/events");
      if (!response.ok) throw new Error("Failed to fetch events");

      const data = await response.json();
      setEvents(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const response = await fetch(`http://127.0.0.1:5555/events/${eventId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setEvents(events.filter((event) => event.id !== eventId));
      } else {
        alert("Failed to delete event");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleEdit = (event) => {
    navigate("/eventform", { state: { event } });
  };

  return (
    <div className="h-screen bg-gray-100 py-10 px-6 sm:px-10">
      <h2 className="text-3xl font-bold text-center text-gray-800">Event Dashboard</h2>

      {loading && <p className="text-center text-gray-600 mt-4">Loading events...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="max-w-4xl mx-auto mt-6">
        <button
          onClick={() => navigate("/eventform")}
          className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Create New Event
        </button>

        <div className="grid gap-6 md:grid-cols-2">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-xl font-semibold text-gray-800">{event.eventName}</h3>
                <p className="text-gray-600">📍 {event.location}</p>
                <p className="mt-2 text-gray-700">{event.description}</p>

                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleEdit(event)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No events found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
