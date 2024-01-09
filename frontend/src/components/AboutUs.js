import React from 'react';

const AboutUs = () => {
  // Replace these URLs with your own image links
  const businessImageUrl = 'logoBig.png';
  const founderImageUrl = 'https://media.licdn.com/dms/image/C5603AQE4VBLfpp_okQ/profile-displayphoto-shrink_400_400/0/1609087411178?e=1709769600&v=beta&t=IDGY3tgvi06S-Qj4hMUAoAPaxoYjJeP-iPACroz3WHA';

  return (
    <div className="about-us">
      <section className="business-info">
        <img src={businessImageUrl} alt="Business" className="business-image" />
        <h1>The #1 P2P Lending Solution</h1>
        <p>Sky's P2P Lending Platform is a leading innovator for customer lacking access to credit. The idea is to enable lenders to lend their disposable income to generate interest; and borrowers who do not want to go through the slow and inefficient process of bank loan to acquire credit/loan. The credit score system is quietly working in the background to assess the user on how much they use the P2P lending system; whether the borrowers are repaying on time; and how much they have repaid. Understandably, the way banks assess loan approvals is different than how P2P lending assess approvals. The difference is that one entity which has a regulated body, and the other is where two people could come to a handshake agreement.</p>
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
