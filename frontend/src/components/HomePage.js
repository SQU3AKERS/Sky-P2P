const HomePage = () => {
        const businessImageUrl = 'logoBig.png';
      
        return (
          <div className="about-us">
            <section className="business-info">
              <img src={businessImageUrl} alt="Business" className="business-image" />
              <h1>Welcome to Sky's P2P Lending Platform</h1>
              <h2>The #1 P2P Lending Solution For Everyone!</h2>
            </section>
          </div>
        );
};

export default HomePage;
