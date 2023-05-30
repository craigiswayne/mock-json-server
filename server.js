const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults({
  // delay: 1000 * (Math.round(Math.random() * 5))
  // delay: 1000 * 10
})

/**
 * Force a delay on responses
 * The delay is anywhere between 0 and 5 seconds
 */
server.use((req,res,next) => {
  // setTimeout(next,1000 * (Math.round(Math.random() * 5)));
  setTimeout(next,1000 * 5);
});

server.use(middlewares)

/**
 * Change the responses for collections
 * Wrap in a pagination object
 * @param req
 * @param res
 */
router.render = (req, res) => {
  if(req.url.split('/').length !== 2){
    res.send(res.locals.data)
    return;
  }

  res.json({
    results: res.locals.data,
    total: res.locals.data.length,
    page: 1
  })
}

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running')
})
