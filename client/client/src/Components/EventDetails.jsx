/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function EventDetails() {
    const [events, setEvents] = useState([]);
    const [eventToEdit, setEventToEdit] = useState(null);
    const [editedEvents, setEditedEvents] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5555/events")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setEvents(data);
            })
            .catch(error => {
                console.log("error fetching", error);
            });
    }, []);

    const handleDelete = (event_id) => {
        fetch(`http://127.0.0.1:5555/event/${event_id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    alert("Event deleted successfully!");
                    setEvents(prevEvents => prevEvents.filter(event => event.id !== event_id));
                } else {
                    alert("Failed to delete event");
                }
            })
            .catch(error => {
                console.error("error deleting", error);
                alert("Failed to delete event");
            });
    };

    const handleEdit = (event_id) => {
        setEventToEdit(event_id);
    };

    const handleInputChange = (e, key, index) => {
        const { value } = e.target;

        const updatedEvents = [...editedEvents];
        if (!updatedEvents[index]) {
            updatedEvents[index] = { ...events[index] };
        }
        updatedEvents[index][key] = value;
        setEditedEvents(updatedEvents);
    };

    const handleUpdate = (event_id) => {
        const eventToUpdate = editedEvents.find(event => event.id === event_id);
        if (!eventToUpdate) {
            console.error("Event not found");
            return;
        }
        fetch(`http://127.0.0.1:5555/event/${event_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(eventToUpdate)
        })
            .then(response => {
                if (response.ok) {
                    alert("Event updated successfully!");
                    setEventToEdit(null);
                } else {
                    alert("Failed to update event");
                }
            })
            .catch(error => {
                console.error("error updating event", error);
                alert("Failed to update event");
            });
    };

    return (
        <div className="mx-auto h-screen w-full flex-container sm:ml-[25%] lg:ml-[19%]">
            <div className="flex fixed w-full mb-5 shadow-md h-[70px] items-center justify-between rounded">
                <div className="flex items-center ml-[30px]">
                    <h1 className="items-center justify-center h-full flex">
                        Hello There! Here are your <span className="text-[#111c81]">Events</span>
                    </h1>
                </div>
                <div className="mr-[500px] flex items-center justify-center">
                    <Link to="/eventform">
                        <button className="bg-gradient-to-r from-[#111c81] to-[#c065c0] px-4 py-2 rounded text-white w-[150px] text-xl font-bold">
                            New Event
                        </button>
                    </Link>
                </div>
            </div>

            <div className="mt-[40px] justify-around items-center flex flex-wrap p-9 w-full h-full">
                {events.map((event, index) => (
                    <div className="flex w-full items-center justify-evenly p-2" key={event.id}>
                        <div className="card grid grid-cols-7 gap-9 w-full h-20 p-5 items-center justify-center">
                            <h1>{event.id}</h1>
                            {eventToEdit === event.id ? (
                                <>
                                    <input type="text" value={editedEvents[index]?.name || event.name} onChange={(e) => handleInputChange(e, 'name', index)} className="w-[100px] outline-none" />
                                    <input type="text" value={editedEvents[index]?.location || event.location} onChange={(e) => handleInputChange(e, 'location', index)} className="w-[100px] outline-none" />
                                    <input type="text" value={editedEvents[index]?.description || event.description} onChange={(e) => handleInputChange(e, 'description', index)} className="w-[100px] outline-none" />
                                    <input type="number" value={editedEvents[index]?.organizer_id || event.organizer_id} onChange={(e) => handleInputChange(e, 'organizer_id', index)} className="w-[100px] outline-none" />
                                    <input type="date" value={editedEvents[index]?.date || event.date} onChange={(e) => handleInputChange(e, 'date', index)} className="w-[100px] outline-none" />
                                    <input type="time" value={editedEvents[index]?.time || event.time} onChange={(e) => handleInputChange(e, 'time', index)} className="w-[100px] outline-none" />
                                </>
                            ) : (
                                <>
                                    <h1>{event.name}</h1>
                                    <h1>{event.location}</h1>
                                    <h1>{event.description}</h1>
                                    <h1>{event.organizer_id}</h1>
                                    <h1>{event.date}</h1>
                                    <h1>{event.time}</h1>
                                </>
                            )}
                            <button onClick={() => handleEdit(event.id)}>Edit</button>
                            <button onClick={() => handleDelete(event.id)} className="flex w-[100px] text-white font-bold text-lg h-10 rounded items-center justify-center bg-gradient-to-r from-[#f03333] to-[#ff5353]">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventDetails;
