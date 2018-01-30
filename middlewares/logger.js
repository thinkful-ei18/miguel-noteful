
function ourLogger(req,res,next){
  const now = new Date();
  console.log('we are in our logger');
  console.log(`${now.toLocaleDateString()} ${now.toLocaleTimeString()} :${req.method} ${req.url}`);
  next();
}

module.exports = {ourLogger};