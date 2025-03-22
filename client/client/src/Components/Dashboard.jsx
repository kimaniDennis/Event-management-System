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
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:5555/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-10 px-6 sm:px-10 text-white">
      <h2 className="text-4xl font-extrabold text-center drop-shadow-lg">My Events</h2>

      {loading && <p className="text-center mt-4 text-lg animate-pulse">Loading events...</p>}
      {error && <p className="text-center text-red-200">{error}</p>}

      <div className="max-w-5xl mx-auto mt-8">
        <button
          onClick={() => navigate("/eventform")}
          className="mb-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition"
        >
          + Create New Event
        </button>

        <div className="grid gap-6 md:grid-cols-2">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="bg-white shadow-lg rounded-xl p-6 text-gray-800 transform transition hover:scale-105">
                <h3 className="text-2xl font-bold text-gray-900">{event.eventName}</h3>
                <p className="text-gray-600 mt-1">📍 {event.location}</p>
                <p className="mt-2 text-gray-700">{event.description}</p>

                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleEdit(event)}
                    className="px-4 py-2 bg-yellow-400 text-white rounded-lg shadow-md hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-200">No events found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
