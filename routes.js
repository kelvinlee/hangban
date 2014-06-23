// Generated by CoffeeScript 1.7.1
var active, home, sign, user;

home = require('./controllers/home');

user = require('./controllers/user');

sign = require('./controllers/sign');

active = require('./controllers/active');

module.exports = function(app) {
  app.get('/', home.homepage);
  app.get('/recommend', home.recommend);
  app.get('/active/:active_id', active.active);
  app.get('/home/limit', home.limit);
  app.get('/home/limit/:limit_id', home.limitinfo);
  app.get('/art/:art_id', home.art);
  app.post('/limit/post/:limit_id', home.limitpost);
  app.post('/active/join/:active_id', active.joina);
  app.get('/sign/*', sign.before);
  app.get('/sign/in', sign["in"]);
  app.get('/sign/out', sign.out);
  app.post('/sign/in', sign.post);
  app.get('/sign/up', sign.up);
  app.post('/sign/up', sign.uppost);
  app.get('/user/*', user.before);
  app.get('/user/center', user.center);
  app.get('/user/lots', user.lots);
  app.get('/user/regs', user.regs);
  app.get('/user/cars', user.cars);
  app.get('/user/info', user.info);
  app.post('/user/info', user.infopost);
  app.post('/user/cars', user.carspost);
  app.get('/api/user', user.api);
  app.get('/admin/active/new', active["new"]);
  return app.post('/admin/active/new', active.newpost);
};

console.log("routes loaded.");