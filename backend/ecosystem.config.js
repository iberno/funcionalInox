module.exports = {
  apps: [{
    name: 'funcional-inox',
    script: 'dist/src/main.js',
    cwd: '/home/iberno/Projetos/FuncionalInox/backend',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3001,
    },
    env_file: '.env',
  }],
}
