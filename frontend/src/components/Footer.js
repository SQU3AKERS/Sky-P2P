import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="logo">
            <h1 className="platform-title"> 
            <img src="logo512.png" alt="Logo" />
            ⠀Sky's P2P Lending Platform</h1>
          </div>
          <p>
            Sky's P2P Lending Platform (registered with relevant authority) is building the financing infrastructure of tomorrow, working with great clients and continued technological development in the P2P lending industry. Interested to join our team? We'd love to hear from you.
          </p>
          <p>
            I wonder if anyone bothers reading this area. I am trying to make it discreet and let the user feel that this is a professional website that has no flaws. Oh, you're still reading? I guess you can say that this is a rather odd easter egg. Remember to drink water and have a nice day!
          </p>  
          <p>Terms of Use | Privacy Notice | Data Guidelines</p>
          <div className="social-links">
            <a href="https://www.youtube.com/watch?v=mx86-rTclzA" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/128/145/145802.png" alt="Facebook" />
            </a>
            <a href="https://www.youtube.com/watch?v=mx86-rTclzA" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/128/4138/4138124.png" alt="Instagram" />
            </a>
            <a href="https://www.youtube.com/watch?v=mx86-rTclzA" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/128/4494/4494497.png" alt="LinkedIn" />
            </a>
            <a href="https://www.youtube.com/watch?v=mx86-rTclzA" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/128/5969/5969020.png" alt="Twitter or X whatever Elon Musk is thinking" />
            </a>
        </div>
      </div>

      <div className="footer-center">
      <h3>Contacts</h3>
        <p>Address: Unit E-05-01, Level 5, Asia Pacific University, Jalan Teknologi 5, Taman Teknologi Malaysia, 57000 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Malaysia.</p>
        <p>Email: sky@company.com</p>
        <p>Management Team: +60 10-2200 891</p>
        <p>Public Relation Team: +60 16-6200 891</p>
      </div>

      <div className="footer-right">
        <h3>Newsletter</h3>
        <form action="#" method="post">
          <input type="email" name="email" placeholder="Email*" required />
          <input type="text" name="name" placeholder="Name*" required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>

      <div className="footer-bottom">
        <p>
          Copyright © {new Date().getFullYear()} Sky's P2P Lending Platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
