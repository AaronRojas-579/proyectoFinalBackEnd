const jwt = require("jsonwebtoken")
require("dotenv").config()

function auth(req, res, next) {
    const {token} = req.cookies
    if (!token) {
      return res.status(401).json({
        error: 'not authenticated'
      });
    }
    // const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.PALABRA_SECRETA, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          error: 'not authorized'
        });
      }

      req.user = decoded.data;
      // El req.user estará presente siempre y cuando tengamos algunas de estas funciones como middleware, de lo contrario no exisitirá 
      next();
    });
};

function authAdmin(req, res, next) {
  const {token} = req.cookies
  // console.log(token)
  // console.log(jwt.decode(token))
  if (!token) {
    return res.status(401).json({
      error: 'not noseeee'
    });
  }
  jwt.verify(token, process.env.PALABRA_SECRETA, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        error: 'not nose'
      });
    }
    req.user = decoded.data;//Este trae todos los datos del usuario 
    // El req.user estará presente siempre y cuando tengamos algunas de estas funciones como middleware, de lo contrario no exisitirá 
    if(req.user.admin){
      next();
    }else{
      res.redirect("/productos")
    }
  });
};

module.exports = {auth,authAdmin}
