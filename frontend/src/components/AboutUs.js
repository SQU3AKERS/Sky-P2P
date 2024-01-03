import React from 'react';

const AboutUs = () => {
  // Replace these URLs with your own image links
  const businessImageUrl = 'https://your-business-image-link.jpg';
  const founderImageUrl = 'https://media.licdn.com/dms/image/C5603AQE4VBLfpp_okQ/profile-displayphoto-shrink_400_400/0/1609087411178?e=1709769600&v=beta&t=IDGY3tgvi06S-Qj4hMUAoAPaxoYjJeP-iPACroz3WHA';

  return (
    <div className="about-us">
      <section className="business-info">
        <img src={businessImageUrl} alt="Business" className="business-image" />
        <h1>The #1 P2P Lending Solution</h1>
        <p>Your business description here. It should be concise and informative, explaining the core values and mission of your company.</p>
      </section>

      <section className="founder-info">
        <h1>Founder & CEO</h1>
        <img src={founderImageUrl} alt="Founder" className="founder-image" />
        <h2>Wong Tian Ren</h2>
        <p>Founder's description here. Include educational background, vision for the company, and any relevant achievements.</p>
      </section>
    </div>
  );
};

export default AboutUs;
