const express = require("express"); 
const router = new express.Router(); 
const util = require("../utilities/index");
const acctController = require("../controllers/accountController");

router.get("/login", acctController.buildLogin)
router.get("/register", acctController.buildRegister)
router.post('/register', acctController.registerClient)

module.exports = router;