interface CalendarSnippetProps {
  events: Array<{ time: string; title: string }>;
}

export default function CalendarSnippet({ events }: CalendarSnippetProps) {
  return (
    <div className="calendar-snippet">
      <div className="snippet-header">
        <span className="snippet-icon">📅</span>
        <h4>Tomorrow's Schedule</h4>
      </div>
      <div className="calendar-events">
        {events.map((event, index) => (
          <div key={index} className="calendar-event">
            <div className="event-time">{event.time}</div>
            <div className="event-title">{event.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
