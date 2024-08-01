import React, { useState, useEffect } from 'react';

const DeviceDetector = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // You can adjust the breakpoint as needed
      setIsMobile(window.matchMedia('(max-width: 767px)').matches);
    };

    // Set initial value
    handleResize();

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

export default DeviceDetector;
