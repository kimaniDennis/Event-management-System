import  { useState } from "react";

function EventForm() {
  const [input, setInput] = useState({
    event_name: "",
    location: "",
    description: "",
    organizer_id: "",
    date: "",
    time: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Combine date and time into a single datetime string with the desired format
    const datetime = `${input.date} ${input.time}:00`; // Assuming seconds as ':00'

    // Update input state with formatted datetime (optional step)
    setInput((prevInput) => ({
      ...prevInput,
      datetime: datetime,
    }));

    // Create a new object to send with formatted datetime
    const formData = {
      ...input,
      datetime: datetime,
    };

    fetch("http://127.0.0.1:5555/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Form submitted!");
          setInput({
            event_name: "",
            location: "",
            description: "",
            organizer_id: "",
            date: "",
            time: "",
          });
        } else {
          alert("Try again!");
        }
      })
      .catch((error) => {
        console.error("Could not submit form", error);
      });

    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex justify-center mt-8">
      <form className="card items-center justify-around h-[500px] w-[=300px] flex flex-col gap-1" onSubmit={handleSubmit}>
        <div className="animate-movit">
          <h1 className="text-3xl text-[#113481]">Create Event</h1>
        </div>
        <input
          value={input.event_name}
          onChange={handleChange}
          name="event_name"
          className="p-3 border-[1px] border-gray-300 rounded outline-none w-full"
          type="text"
          placeholder="Event Name"
        />
        <input
          value={input.location}
          onChange={handleChange}
          name="location"
          className="p-3 border-[1px] border-gray-300 rounded outline-none w-full"
          type="text"
          placeholder="Location"
        />
        <input
          value={input.description}
          onChange={handleChange}
          name="description"
          className="p-3 border-[1px] border-gray-300 rounded outline-none w-full"
          type="text"
          placeholder="Description"
        />
        <input
          value={input.organizer_id}
          onChange={handleChange}
          name="organizer_id"
          className="p-3 border-[1px] border-gray-300 rounded outline-none w-full"
          type="text"
          placeholder="Organizer ID"
        />
        <input
          value={input.date}
          onChange={handleChange}
          name="date"
          className="p-3 border-[1px] border-gray-300 rounded outline-none w-full"
          type="date" // Use type="date" for date input
          placeholder="Datetime"
        />
        <input
          value={input.time}
          onChange={handleChange}
          name="time"
          className="p-3 border-[1px] border-gray-300 rounded outline-none w-full"
          type="time" // Use type="time" for time input
          placeholder="Time"
        />
        <button type="submit" className="w-[300px] h-10 bg-gradient-to-r from-[#133569] to-[#133569] text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
      <div className="h-screen w-full items-center rounded-lg shadow-lg justify-center">
        <img src="src/assets/form_.jpeg" alt="form" />
      </div>
    </div>
  );
}

export default EventForm;
