module.exports = {
  apps: [{
    name: 'funcional-inox',
    script: 'dist/src/main.js',
    instances: 1,
    exec_mode: 'fork',
    env_file: '.env',
    env: {
      NODE_ENV: 'production',
      PORT: 3001,
    },
  }],
}
