import React from "react";
import { Helmet } from "react-helmet";
import { HelmetProvider } from "react-helmet-async";
const HelmetTest = () => {
  return (
<HelmetProvider>
      <div>
        <Helmet>
          <title>Service-TrovKa</title>
          <meta name="description" content="Get all service with TrovKa" />
          
          {/* Open Graph meta tags */}
          <meta property="og:title" content="Service-TrovKa" />
          <meta property="og:description" content="Get all service with TrovKa" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="http://localhost:5173/home-not-login" />
          <meta property="og:image" content="https://i.pinimg.com/736x/c3/95/44/c3954438fedca66f0f57c727f5dd236c.jpg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:site_name" content="TrovKa" />
          <meta property="og:locale" content="en_US" />
        </Helmet>
      </div>
    </HelmetProvider>
  );
};

export default HelmetTest;
