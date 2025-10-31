import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

function TeacherCalendar() {
  const [events, setEvents] = useState([]);

  // Load events from backend
  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(console.error);
  }, []);

  // Handle date/time selection by teacher
  const handleDateSelect = (selectInfo) => {
    let title = prompt('Enter class title');
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection

    if (title) {
      const newEvent = {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
      };

      // Save event to backend
      fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      })
      .then(res => res.json())
      .then(savedEvent => {
        setEvents([...events, savedEvent]); // update state with saved event
      });
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      selectable={true}
      select={handleDateSelect}
      events={events}
      editable={true} // if you want to allow drag & drop to edit events
      eventDrop={(info) => {
        // Handle drag & drop update here
        const updatedEvent = {
          id: info.event.id,
          start: info.event.start.toISOString(),
          end: info.event.end.toISOString(),
          title: info.event.title,
        };
        fetch(`/api/events/${info.event.id}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(updatedEvent),
        });
      }}
    />
  );
}

export default TeacherCalendar;
