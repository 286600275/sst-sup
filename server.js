process.env.NODE_ENV = process.env.NODE_ENV || 'production'
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = require('express')()
const nuxtConfig = require('./nuxt.config.js')
const redisConfig = require('./config/redis-config.js')
//redis
var sessionRedis = require('connect-redis')(session);
// Body parser，用来封装 req.body
app.use(bodyParser.json());
app.use(session({
  // store: new sessionRedis(redisConfig),
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 6000000 }
}));
// Sessions 来创建 req.session
app.post('/insur/api/logout', function(req, res) {
  delete req.session.User;
  res.json({ success: true });
  res.end();
});
const isProd = process.env.NODE_ENV === 'production';
const nuxt = new Nuxt(nuxtConfig);
// 生产模式不需要 build
if (!isProd) {
  const builder = new Builder(nuxt);
  builder.build();
}
app.use(nuxt.render);
app.listen({
  "host": "0.0.0.0",
  "port": "23099"
});
console.log('Server is listening on http://localhost:23099');