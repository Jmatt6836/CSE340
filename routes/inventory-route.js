// Needed Resources 
const express = require("express"); 
const router = new express.Router(); 
const invController = require("../controllers/invController");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassification);
router.get("/detail/:vehicleId", invController.buildByVehicle);
router.get("/add-classification", invController.buildAddClassView);
router.get("/add-vehicle", invController.buildAddVehicleView);
router.get("/manage-inv", invController.managerView);

router.post("/add-classification", invController.addClassification);
router.post("/add-vehicle", invController.addVehicle);



module.exports = router;

