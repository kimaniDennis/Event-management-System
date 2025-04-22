import { useState, useEffect } from "react";

function Settings() {
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    // Fetch user info here (example only)
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:5555/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Save user settings here
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:5555/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => alert("Settings updated!"))
      .catch(err => alert("Something went wrong."));
  };

  return (
    <div className="p-8 bg-white rounded shadow max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>
        <button
          onClick={handleSave}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Settings;
