const { sourcePool, destinationPool } = require('../config/database');
const logger = require('../utils/logger');

class ETLService {
  async updateDimensions() {
    const sourceClient = await sourcePool.connect();
    const destClient = await destinationPool.connect();
    
    try {
      // Update users dimension
      await destClient.query(`
        INSERT INTO dim_users (user_id, username, email, created_at, updated_at)
        SELECT DISTINCT id, username, email, created_at, updated_at 
        FROM dblink('sourceconn', 'SELECT id, username, email, created_at, updated_at FROM users')
        AS users(id int, username varchar, email varchar, created_at timestamp, updated_at timestamp)
        ON CONFLICT (user_id) DO UPDATE SET
          username = EXCLUDED.username,
          email = EXCLUDED.email,
          updated_at = EXCLUDED.updated_at
      `);

      // Update other dimensions similarly...
      logger.info('Dimension tables updated successfully');
    } catch (error) {
      logger.error('Error updating dimensions:', error);
      throw error;
    } finally {
      sourceClient.release();
      destClient.release();
    }
  }

  async updateFacts() {
    const sourceClient = await sourcePool.connect();
    const destClient = await destinationPool.connect();
    
    try {
      await destClient.query(`
        INSERT INTO fact_energy (unit_id, device_id, date, energy_generated_wh, energy_compensated_wh, irradiance)
        SELECT 
          e.unit_id, e.device_id, e.date, 
          e.value AS energy_generated_wh, 
          ec.value AS energy_compensated_wh, 
          i.daily_irradiance AS irradiance
        FROM dblink('sourceconn', 'SELECT unit_id, device_id, date, value FROM energy')
        AS e(unit_id int, device_id int, date date, value decimal)
        LEFT JOIN dblink('sourceconn', 'SELECT unit_id, date, value FROM energy_compensate')
        AS ec(unit_id int, date date, value decimal)
        ON e.unit_id = ec.unit_id AND e.date = ec.date
        LEFT JOIN dblink('sourceconn', 'SELECT unit_id, date, daily_irradiance FROM irradiance')
        AS i(unit_id int, date date, daily_irradiance decimal)
        ON e.unit_id = i.unit_id AND e.date = i.date
        ON CONFLICT (unit_id, device_id, date) DO UPDATE SET
          energy_generated_wh = EXCLUDED.energy_generated_wh,
          energy_compensated_wh = EXCLUDED.energy_compensated_wh,
          irradiance = EXCLUDED.irradiance
      `);
      
      logger.info('Fact tables updated successfully');
    } catch (error) {
      logger.error('Error updating facts:', error);
      throw error;
    } finally {
      sourceClient.release();
      destClient.release();
    }
  }
}

module.exports = new ETLService();