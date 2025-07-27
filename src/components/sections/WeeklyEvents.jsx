import React, { useState } from 'react';
import { weeklyEvents } from '../../data/weeklyEvents';

const WeeklyEvents = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  return (
    <section className="py-12 max-w-4xl mx-auto px-4">
      {/* Banner */}
      <div className="mb-8 rounded-3xl overflow-hidden shadow-lg cursor-zoom-in relative">
        <img
          src="/images/menu/weekly-activities.jpg"
          alt="Weekly Events Banner"
          className="w-full h-96 object-cover"
          onClick={() => { setModalImg('/images/menu/weekly-activities.jpg'); setShowModal(true); }}
          tabIndex={0}
          role="button"
          aria-label="Zoom weekly activities banner"
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { setModalImg('/images/menu/weekly-activities.jpg'); setShowModal(true); } }}
        />
        <span className="absolute bottom-2 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">Click to zoom</span>
      </div>
      {/* Modal for zoomed images */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setShowModal(false)} role="dialog" aria-modal="true">
          <img
            src={modalImg}
            alt="Zoomed Event"
            className="max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl border-4 border-white"
            onClick={e => e.stopPropagation()}
          />
          <button
            className="absolute top-8 right-8 text-white text-3xl font-bold bg-black/60 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/80 focus:outline-none"
            onClick={() => setShowModal(false)}
            aria-label="Close zoomed image"
          >
            &times;
          </button>
        </div>
      )}
              <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">Our Weekly Events</h2>
      {/* Events Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {weeklyEvents.map((e, i) => (
          <div
            key={i}
            className="group bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl focus-within:shadow-2xl cursor-pointer"
            tabIndex={0}
            aria-label={`Zoom image for ${e.event}`}
            onClick={() => { setModalImg(e.image); setShowModal(true); }}
            onKeyDown={ev => { if (ev.key === 'Enter' || ev.key === ' ') { setModalImg(e.image); setShowModal(true); } }}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={e.image}
                alt={e.event}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-active:scale-100"
                loading="lazy"
              />
              <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-3 py-1 rounded-full shadow">{e.day}</span>
              <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">Click to zoom</span>
            </div>
            <div className="flex-1 flex flex-col justify-between p-4">
              <h3 className="text-lg font-bold text-orange-700 mb-1">{e.event}</h3>
              <div className="text-sm text-neutral-700 mb-2">Host: <span className="font-medium">{e.host}</span></div>
              <div className="text-sm text-orange-600 font-semibold">{e.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-10 text-lg text-orange-700 font-semibold">
        We are <span className="bg-orange-400 text-white px-2 py-1 rounded">OPEN!</span> 11AM - 11PM Everyday
      </div>
      <div className="text-center mt-2 text-sm text-neutral-600">
        Tamberma Restaurant & Bar, 1, Oba Aleshinloye Crescent, Iyaganku GRA, Ibadan.<br/>
        Reservations: +234 807 559 0939
      </div>
    </section>
  );
};

export default WeeklyEvents; 