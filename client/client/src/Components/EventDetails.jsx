import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function EventDetails(){
    const [events,setEvents] = useState([]);
    const [eventToEdit, setEditOrders] = useState(null);
    const [editedEvents, setEditedEvents] = useState([]);

    useEffect(() =>{
        fetch(" http://127.0.0.1:5555/events")
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            setEvents(data)
        })
        .catch(error =>{
            console.log("error fetching", error);
        });
    });
}

const handleDelete = (event_id) => {
    fetch(` http://127.0.0.1:5555/event/${event_id}`,{
        method:'DELETE'
    })
    .then(response =>{
        if (response.ok) {
            alert("Event deleted successfully!");
            setEvents(preEvents => preEvents.filter(order => event_id !== event_id));
        }else{
            alert("Failed to delete event")
        }
    })
    .catch(error => {
        console.error("error deleting", error);
        alert("Failed to delete event");
    });
};

const handleEdit = (event_id) =>{
    setEventToEdit(event_id);
}

const handleInputChange = (e, key, index) => {
    const {value} = e.target;

    const updateEvents = [...editedEvents];
    if (!updatedEvents[index]) {
        updateEvents[index] = { ...events[index]};
    }
    updateEvents[index][key] = value;
    setEditedEvents(updatedEvents);
};

const handleUpdate = (event_id) => {
    const eventToUpdate = editedEvents.find(Event => event_id === event_id);
    if (!eventToUpdate) {
        console.error("Event not found");
        return;
    }
    fetch(`http://127.0.0.1:5555/event/${event_id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(eventToUpdate)
    })
    .then(response => {
        if (response.ok){
            alert("Event updated successfully!");
            setEventToEdit(null);
        }else{
            alert("Failed to update event")
        }
    })
    .catch(error =>{
        console.error("error updating event", error);
        alert("Failed to update event")
    });
}







export default EventDetails;