
const { predictStatus } = require('../controllers/ticket');

module.exports = (app) => {

  app.get('/api/ticket', (req, res, next) => {
    predictStatus(req,res);
  });

  app.post('/api/ticket', (req, res, next) => {
    predictStatus(req,res);
  });
};
