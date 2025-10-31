import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

function StudentCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events')  // Backend should filter events for the student
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(console.error);
  }, []);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
      initialView="timeGridWeek"
      events={events}
      editable={false}   // disable editing for students
      selectable={false} // disable selecting dates
    />
  );
}

export default StudentCalendar;
