
  module.exports = {
    apps: [
      {
        name: 'images-api', 
        script: './server.js', 
        watch: true,               
        env: {
          NODE_ENV: "development",    
                      
        },
        env_production: {
          NODE_ENV: "production",    
                         
        }
      },
      {
        name: "ecosystem",            // Nombre del segundo proceso
        script: "ecosystem.config.js",
        args: "--env production",     
        watch: false                 
      }
    ]
  };
 