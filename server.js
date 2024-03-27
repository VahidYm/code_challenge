require('dotenv').config({ path: "./.env" });
const log = require('./helpers/logger');
const App = require('./app');
const app = new App();

app.server.listen(process.env.PORT, () => {
  const port =  process.env.PORT || 3030;
  log.info(`Listening on port ${port}`);

  process.on('SIGTERM', () => {
        log.info('SIGTERM signal received: closing HTTP server')
        this.server.close(() => {
            log.info('HTTP server closed')
        });
    });
});