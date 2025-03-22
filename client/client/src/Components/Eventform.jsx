import { useState, useEffect } from "react";

function EventForm() {
  const [formData, setFormData] = useState({
    eventName: "",
    location: "",
    description: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  // Retrieve the token from localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      console.log("Token retrieved:", storedToken); // Debugging
    } else {
      console.warn("No token found in localStorage");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to CREATE an event (POST request)
  const handleCreateEvent = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("You must be logged in to create an event.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5555/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          event_name: formData.eventName,
          location: formData.location,
          description: formData.description,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Event created successfully!");
        setFormData({ eventName: "", location: "", description: "" }); // Clear form
      } else {
        setMessage(`Failed to create event: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setMessage("Something went wrong.");
    }
  };

  // Function to UPDATE an event (PUT request)
  const handleUpdateEvent = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("You must be logged in to update an event.");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5555/event/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          event_name: formData.eventName,
          location: formData.location,
          description: formData.description,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Event updated successfully!");
        setIsEditing(false);
        setFormData({ eventName: "", location: "", description: "" }); // Reset form
      } else {
        setMessage(`Failed to update event: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          {isEditing ? "Edit Event" : "Create Event"}
        </h2>

        {message && <p className="text-center text-green-600">{message}</p>}

        <form className="mt-6 space-y-4" onSubmit={isEditing ? handleUpdateEvent : handleCreateEvent}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Name</label>
            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isEditing ? "Update Event" : "Create Event"}
          </button>
        </form>

        {isEditing && (
          <button
            onClick={() => setIsEditing(false)}
            className="mt-4 w-full py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100"
          >
            Cancel Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default EventForm;
