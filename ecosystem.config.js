module.exports = {
  apps: [
    {
      name: 'Qarun',
      script: './server.js',
      watch: true,
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      },
      instances: 4,
      exec_mode: 'cluster'
    }
  ]
};
// pm2 start ecosystem.config.js -i 0 --watch --env production
// pm2 restart ecosystem.config.js
// pm2 reload ecosystem.config.js
// pm2 stop ecosystem.config.js
// pm2 delete ecosystem.config.js
//
// # Fork mode
// pm2 start ecosystem.config.js --name qarun
// # Cluster mode
// pm2 start app.js -i 0
