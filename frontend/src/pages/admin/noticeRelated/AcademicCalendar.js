import React, { useState } from 'react';
import { BlueButton, RedButton} from '../../../components/buttonStyles';


const AcademicCalendar = () => {
    // State variables to manage calendar data
    const [events, setEvents] = useState([
        { id: 1, semester: 'Spring Semester', dates: 'January 10 - May 14', events: ['Spring Break: March 15 - March 19', 'Final Exams'] },
        { id: 2, semester: 'Fall Semester', dates: 'August 30 - December 10', events: ['Orientation Week: August 30 - September 3', 'Thanksgiving Break: November 25 - November 26'] }
    ]);
    const [newEvent, setNewEvent] = useState({ semester: '', dates: '', events: [] });

    // Function to handle adding a new event
    const handleAddEvent = () => {
        setEvents([...events, { ...newEvent, id: Date.now() }]);
        setNewEvent({ semester: '', dates: '', events: [] });
    };

    // Function to handle deleting an event
    const handleDeleteEvent = (id) => {
        setEvents(events.filter(event => event.id !== id));
    };

    // UI for displaying events
    const eventList = events.map(event => (
        <div key={event.id} className="col-md-6 mb-4">
            <div className="card h-100">
                <div className="card-body">
                    <h5 className="card-title text-center mb-4">{event.semester}</h5>
                    <p className="card-text"><strong>Dates:</strong> {event.dates}</p>
                    <ul className="list-group list-group-flush">
                        {event.events.map((detail, index) => (
                            <li key={index} className="list-group-item">{detail}</li>
                        ))}
                    </ul>
                    <RedButton color='error' className="btn btn-danger mt-3" onClick={() => handleDeleteEvent(event.id)}>Delete</RedButton>
                </div>
            </div>
        </div>
    ));

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Academic Calendar</h1>
            <div className="row">
                {eventList}
            </div>
            <div className="mt-4 mb-5 col-md-6 offset-md-3">
                <h3>Add New Event</h3>
                <div className="form-group">
                    <label htmlFor="semester">Semester</label>
                    <input type="text" placeholder='Semester' className="form-control" id="semester" value={newEvent.semester} onChange={(e) => setNewEvent({ ...newEvent, semester: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="dates">Dates</label>
                    <input type="text" className="form-control" placeholder='Date' id="dates" value={newEvent.dates} onChange={(e) => setNewEvent({ ...newEvent, dates: e.target.value })} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="events">Events</label>
                    <input type="text" className="form-control" placeholder='Data' id="events" value={newEvent.events.join(',')} onChange={(e) => setNewEvent({ ...newEvent, events: e.target.value.split(',') })} />
                </div>
                <BlueButton className="btn btn-primary" onClick={handleAddEvent}>Add Event</BlueButton>
            </div>
        </div>
    );
};

export default AcademicCalendar;
