const LenderPortfolio = require('../models/lenderPortfolioModel'); // Replace with your actual model

const portfolioController = {};

portfolioController.getPortfolioById = async (userId) => {
  try {
    console.log(`Fetching portfolio for user ID: ${userId}`);
    
    // Fetch portfolio data from the LenderPortfolio model
    const portfolio = await LenderPortfolio.findAll({
      where: { LenderID: userId }
    });

    console.log(`Portfolio retrieved for user ID: ${userId}, Number of entries: ${portfolio.length}`);

    // Process and return the portfolio data as needed
    return portfolio; // This might be an array of portfolio entries
  } catch (error) {
    console.error(`Error in getPortfolioById for user ID ${userId}:`, error);
    throw error; // Rethrowing the error to be handled by the route
  }
};

module.exports = portfolioController;
