const { resetDatabase, db } = require('../config/database');

const reset = async () => {
  try {
    console.log('⚠️  WARNING: This will delete all data!');
    await resetDatabase();
    console.log('✅ Database reset successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Reset failed:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
};

reset();
