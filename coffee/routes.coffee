# art = require './controllers/art'
home = require './controllers/home'
user = require './controllers/user'
# git = require './controllers/git'
# admin = require './controllers/admin'
sign = require './controllers/sign'
active = require './controllers/active'
# note = require './controllers/note'

module.exports = (app)->
  app.get '/', home.homepage
  app.get '/recommend',home.recommend
  app.get '/active/:active_id',active.active
  app.get '/home/limit',home.limit
  app.get '/home/limit/:limit_id',home.limitinfo
  app.get '/art/:art_id',home.art
  app.post '/limit/post/:limit_id',home.limitpost

  # api
  app.post '/active/join/:active_id',active.joina

  # sign
  app.get '/sign/*', sign.before
  app.get '/sign/in', sign.in
  app.get '/sign/out', sign.out
  app.post '/sign/in', sign.post
  # register
  app.get '/sign/up', sign.up
  app.post '/sign/up', sign.uppost

  # user
  app.get '/user/*', user.before
  app.get '/user/center', user.center
  app.get '/user/lots', user.lots
  app.get '/user/regs', user.regs
  app.get '/user/cars', user.cars
  app.get '/user/info', user.info
  app.post '/user/info', user.infopost
  app.post '/user/cars', user.carspost
  app.get '/api/user', user.api

  # admin
  app.get '/admin/active/new', active.new
  app.post '/admin/active/new', active.newpost


  # app.get '*', note.notfind

console.log "routes loaded."