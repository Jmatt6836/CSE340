const express = require("express"); 
const router = new express.Router(); 
const util = require("../utilities/index");
const acctController = require("../controllers/accountController");
const regValidate = require('../utilities/account-validation');


router.get("/login", acctController.buildLogin)
router.get("/register", acctController.buildRegister)
router.post("/register", regValidate.registationRules(), regValidate.checkRegData, acctController.registerClient)

router.post(
    "/login",
    (req, res) => {
      res.status(200).send('login process')
    }
  )

module.exports = router;