import pronote from './instance';
import User from './models/User';

export async function connect() {
  try {
    await pronote.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
connect();

export async function migrate() {
  try {
    await pronote.query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true });

    await User.sync({ force: true });
    console.log('List of tables users');

    console.log('Database & tables created!');
  } catch (error) {
    console.error('Unable to sync', error);
  }
}
migrate();
