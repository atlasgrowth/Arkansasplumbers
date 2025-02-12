import React from 'react';
import './About.css';

// Variant 1: Parallax Background with Centered Overlay
export const AboutDesign1 = ({ business, loading }) => {
  // Determine the city; if not provided, use fallback text.
  const city = business?.basic_info?.city;
  const businessName = business?.basic_info?.name || "Your Trusted Plumber";
  const paragraphText = city 
    ? `Serving the community of ${city} with top-quality plumbing solutions. Our expertise and dedication have made us the local go-to for reliable plumbing services.`
    : `As your local trusted plumber, we pride ourselves on offering reliable, high-quality plumbing services tailored to your needs.`;

  return (
    <section className="about-design1 parallax">
      <div className="about-overlay">
        <h2 className="about-headline">About {businessName}</h2>
        <p className="about-paragraph">{paragraphText}</p>
      </div>
    </section>
  );
};

// Variant 2: Split Layout with Fixed Image and Text Side-by-Side
export const AboutDesign2 = ({ business, loading }) => {
  const city = business?.basic_info?.city;
  const businessName = business?.basic_info?.name || "Your Trusted Plumber";
  const paragraphText = city 
    ? `Based in ${city}, our expert team delivers innovative plumbing services that combine quality workmanship with unbeatable customer service.`
    : `We are dedicated to delivering innovative plumbing solutions with quality workmanship and exceptional service, making us your premier local plumber.`;

  return (
    <section className="about-design2">
      <div className="about-split-image"></div>
      <div className="about-split-content">
        <h2 className="about-headline">About {businessName}</h2>
        <p className="about-paragraph">{paragraphText}</p>
      </div>
    </section>
  );
};

// Variant 3: Card Layout with Hover and Floating Image
export const AboutDesign3 = ({ business, loading }) => {
  const city = business?.basic_info?.city;
  const businessName = business?.basic_info?.name || "Your Trusted Plumber";
  const paragraphText = city 
    ? `Serving ${city} and its surrounding areas, our plumbing services are designed with precision and care to meet every need, big or small.`
    : `Our plumbing services are crafted with precision and care, ensuring every customer receives the highest quality service possible.`;

  return (
    <section className="about-design3">
      <div className="about-card">
        <div className="about-card-image"></div>
        <div className="about-card-content">
          <h2 className="about-headline">About {businessName}</h2>
          <p className="about-paragraph">{paragraphText}</p>
        </div>
      </div>
    </section>
  );
};

// Master About component: Change selectedVariant to 1, 2, or 3 to choose a design.
const About = (props) => {
  const selectedVariant = 2; // Change this value to 2 or 3 to switch designs
  if (selectedVariant === 1) return <AboutDesign1 {...props} />;
  if (selectedVariant === 2) return <AboutDesign2 {...props} />;
  if (selectedVariant === 3) return <AboutDesign3 {...props} />;
  return <AboutDesign1 {...props} />;
};

export default About;
