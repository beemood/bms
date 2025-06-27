module.exports = {
  apps: [
    {
      name: 'inventory-production',
      script: '../main.js',
      env: {
        MODE: 'PRODUCTION',
        PORT: 5003,
        DATASOURCE_URL:
          'postgresql://testuser:password@localhost:5432/inventory-dev-db',
      },
    },
    {
      name: 'inventory-dev',
      script: '../main.js',
      env: {
        MODE: 'DEV',
        PORT: 3003,
        DATASOURCE_URL:
          'postgresql://testuser:password@localhost:5432/inventory-dev-db',
      },
    },
  ],
};
