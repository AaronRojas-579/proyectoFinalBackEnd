const router = require("express").Router()

const {registerJwt,loginJwt,logoutJwt} = require('../controllers/controller.jwt')

router.post("/register",registerJwt)
router.post("/login",loginJwt)
router.get("/logout",logoutJwt)

module.exports = router