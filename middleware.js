module.exports = (req, res, next) => {
  /**
   * Rudimentary check for collections
   */
  if(req.url.split('/').length !== 2){
    return next();
  }

  res.on('send', function(){
    console.log('resbody', res.body)
  });

  res.on('end', function(){
    console.log('resbody', res.body)
  });

  // console.log('res', res);
  next()
}

router.render = (req, res) => {
  res.jsonp({
    body: res.locals.data
  })
}
