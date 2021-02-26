const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

module.exports = {
  apps : [{
    name: 'backend:fem-prod',
    script: 'dist/main.js',
    instances: 1,
    autorestart: true,
    watch: true,
    max_memory_restart: '256M',
  }],
};
