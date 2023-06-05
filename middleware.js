module.exports = function (req, res, next) {
  res.on('close', () => {
    console.log('closed');
  })
}
