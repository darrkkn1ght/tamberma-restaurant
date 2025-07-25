import React from 'react';
import { weeklyEvents } from '../../data/weeklyEvents';
import { Link } from 'react-router-dom';

const WeeklyEventsPreview = () => (
  <section className="py-10">
    <div className="flex items-center gap-4 mb-6">
      <img src="/images/menu/weekly-activities.jpg" alt="Events" className="w-16 h-16 rounded-xl object-cover shadow" />
      <h3 className="text-2xl font-bold text-orange-600">This Week at Tamberma</h3>
    </div>
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      {weeklyEvents.slice(0, 3).map((e, i) => (
        <div key={i} className="bg-white rounded-xl shadow p-4 flex flex-col">
          <div className="text-orange-500 font-semibold mb-1">{e.day}</div>
          <div className="font-bold text-lg mb-1">{e.event}</div>
          <div className="text-sm text-neutral-600 mb-1">Host: {e.host}</div>
          <div className="text-xs text-neutral-500">{e.time}</div>
        </div>
      ))}
    </div>
    <div className="text-center">
      <Link to="/events" className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow">
        See All Events
      </Link>
    </div>
  </section>
);

export default WeeklyEventsPreview; 