import React from 'react';
import Button from '../ui/Button';

const address = "Quarters 894, Rev'd Oyebode Crescent, Iyaganku, Ibadan";
const phone = '+234 805 409 0607';
const altLocation = 'Tamberma Ringroad (delivery only)';
const hours = [
  { day: 'Monday – Sunday', time: '11:00 AM – 12:00 AM' },
];
const mapSrc = 'https://www.google.com/maps?q=894+Rev%27d+Oyebode+Crescent,+Iyaganku+GRA,+Ibadan&output=embed';

const Location = () => (
  <section id="location" className="relative py-16 px-4 md:px-0 bg-neutral-50 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-primary-400/10 to-accent-400/10 pointer-events-none animate-parallax" aria-hidden="true" />
    <div className="relative max-w-5xl mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-neutral-100 p-8 md:p-12 animate-fade-in">
              <h2 className="font-display text-3xl md:text-4xl text-primary-500 mb-6 text-center tracking-tight">Visit Us</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="font-display text-xl text-neutral-900 font-semibold mb-1">Address</h3>
            <p className="font-sans text-neutral-700">{address}</p>
            <p className="font-sans text-neutral-700 text-sm">Alternative: {altLocation}</p>
          </div>
          <div>
            <h3 className="font-display text-xl text-neutral-900 font-semibold mb-1">Hours</h3>
            <ul className="font-sans text-neutral-700">
              {hours.map(h => (
                <li key={h.day}>{h.day}: <span className="font-medium text-neutral-900">{h.time}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xl text-neutral-900 font-semibold mb-1">Contact</h3>
            <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="text-primary-500 hover:underline font-medium transition-colors duration-150">{phone}</a>
          </div>
          <Button
            as="a"
            href="https://maps.google.com/?q=123+Urban+Ave,+Downtown+City,+NY+10001"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full md:w-auto"
          >
            Get Directions
          </Button>
        </div>
        <div className="flex-1 min-h-[300px] rounded-2xl overflow-hidden shadow-lg border border-neutral-100 animate-glass-morph">
          <iframe
            title="Tamberma Restaurant Location"
            src={mapSrc}
            width="100%"
            height="320"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-80 rounded-2xl"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
);

export default Location;
