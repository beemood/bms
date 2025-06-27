/**
 * Get environement variable
 * @param {string} key
 */
function env(key) {
  const value = process.env[key];
  if (value == undefined) {
    throw new Error(`${key} env is required!`);
  }
  return value;
}

module.exports = {
  apps: [
    {
      name: 'inventory-production',
      script: '../dist/apis/inventory/main.js',
      env: {
        MODE: 'PRODUCTION',
        PORT: 5003,
        DATASOURCE_URL:
          'postgresql://testuser:password@localhost:5432/inventory-dev-db',
      },
    },
    {
      name: 'inventory-dev',
      script: '../dist/apis/inventory/main.js',
      env: {
        MODE: 'DEV',
        PORT: 3003,
        DATASOURCE_URL:
          'postgresql://testuser:password@localhost:5432/inventory-dev-db',
      },
    },
  ],
};
