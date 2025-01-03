const cron = require('node-cron');
const etlService = require('./src/services/etl');
const logger = require('./src/utils/logger');
const { sourcePool, destinationPool } = require('./src/config/database');

async function updateDataWarehouse() {
  try {
    logger.info('Starting DW update process');
    
    // Update dimension tables
    await etlService.updateDimensions();
    
    // Update fact tables
    await etlService.updateFacts();
    
    logger.info('DW update completed successfully');
  } catch (error) {
    logger.error('Error in DW update process:', error);
  }
}

// Schedule updates to run daily at 1 AM (São Paulo timezone)
cron.schedule('0 1 * * *', updateDataWarehouse, {
  scheduled: true,
  timezone: "America/Sao_Paulo"
});

logger.info('DW Update Scheduler is running...');

// Graceful shutdown handling
async function shutdown() {
  logger.info('Shutting down...');
  await sourcePool.end();
  await destinationPool.end();
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);