import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import InitialAnimation from './components/animation/InitialAnimation';
import CartService from "./components/cart/CartService";

function App() {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const { t, i18n } = useTranslation(); // useTranslation hook

  useEffect(() => {
    const delay = 1000; // Delay before starting the animation (e.g., 1 second)
    const timer = setTimeout(() => {
      setIsAnimationComplete(true);
    }, 3000 + delay); // Total time (3 seconds + delay)

    return () => clearTimeout(timer);
  }, []);

  const changeLanguage = (lng) => {
    console.log(`Changing language to: ${lng}`); // Debug log
    i18n.changeLanguage(lng)
      .then(() => console.log(`Language changed to: ${i18n.language}`)) // Debug log
      .catch((error) => console.error(`Failed to change language: ${error}`)); // Debug log
  };

  return (
    <>
      <Metadata
        title="Home | TrovKa"
        description="Welcome to Service-TrovKa"
        author="SainaIna"
        keywords="services, trovka, home"
        thumbnail="https://k-quicksight.istad.co/opengraph-image.jpg?d3bb2a9115260a5a"
      />
      {!isAnimationComplete && <InitialAnimation />}
      <div className={`${isAnimationComplete ? 'block' : 'hidden'}`}>
        {/* Your main content goes here */}
        {/* Example usage of CartService */}
        <CartService />
      </div>
    </>
  );
}

export default App;
