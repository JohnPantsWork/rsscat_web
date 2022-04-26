import React from 'react';
import Header from '../components/homepage/Header';
import Footer from '../components/homepage/Footer';
import Showcase from '../components/homepage/Showcase';
import '../styles/homepage/homepage.css';

const Homepage = () => {
  return (
    <div>
      <Header />
      <Showcase />
      <Footer />
    </div>
  );
};

export default Homepage;
