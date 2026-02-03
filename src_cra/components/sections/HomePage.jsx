import React from 'react';
import Hero from './Hero';
import About from './About';
import MenuPreview from './MenuPreview';
import Gallery from './Gallery';
import Testimonials from './Testimonials';
import Location from './Location';
import Contact from './Contact';
import WeeklyEventsPreview from './WeeklyEventsPreview';
import { Helmet } from 'react-helmet-async';

const HomePage = () => (
  <>
    <Helmet>
      <title>Tamberma Restaurant & Bar | Multi-Cuisine, Nature-Infused Dining in Ibadan</title>
      <meta name="description" content="Experience Indian, Nigerian, Chinese, Continental, BBQ & Grill, and craft cocktails in a serene, African-inspired setting at Tamberma Restaurant & Bar, Ibadan." />
    </Helmet>
    <Hero />
    <About />
    <WeeklyEventsPreview />
    <MenuPreview />
    <Gallery />
    <Testimonials />
    <Location />
    <Contact />
  </>
);

export default HomePage; 