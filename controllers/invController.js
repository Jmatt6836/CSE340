const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invCont = {}

invCont.buildByClassification = async function(req, res, next){
    const classificationId = req.params.classificationId
    let data = await invModel.getVehiclesByClassificationId
    (classificationId)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification-view", {
        title: className + " vehicles",
        nav,
        message: null,
        data,
    })
}

invCont.buildByVehicle = async function(req, res, next){
    const vehicleId = req.params.vehicleId
    let data = await invModel.getVehicleById
    (vehicleId)
    const page = await utilities.buildpage(data[0])
    let nav = await utilities.getNav()
    const name = data[0].inv_year + " " + data[0].inv_make + " " + data[0].inv_model;
    res.render("./inventory/vehicle-detail", {
        title: name,
        nav,
        message: null,
        page,

    })
}

invCont.managerView = async function (req, res, next) {
    let nav = await utilities.getNav();
    res.render("inventory/manage-inv.ejs", {
      title: `Vehicle Management`,
      nav,
      message: null,
    });
  };
  
  invCont.buildAddClassView = async function (req, res, next) {
    let nav = await utilities.getNav();
    res.render("inventory/add-classification.ejs", {
      title: `Add New Classification`,
      nav,
      message: null,
    });
  };
  invCont.buildAddVehicleView = async function (req, res, next) {
    let nav = await utilities.getNav();
    let selectOptions = await utilities.buildClassDropDown();
    res.render("inventory/add-vehicle.ejs", {
      title: `Add New Vehicle`,
      nav,
      selectOptions,
      message: null,
    });
  };

/* ****************************************
 *  Process Add New Classification
 **************************************** */
invCont.addClassification = async function (req, res) {
    let nav = await utilities.getNav();
  
    const { classification_name } = req.body;
  
    const addClassResult = await invModel.addClassification(classification_name);
    // console.log(addClassResult);
    if (addClassResult) {
      res.status(201).render("inventory/manage-inv.ejs", {
        title: "Vehicle Management",
        nav,
        message: `The ${classification_name} classification was successfully added.`,
        errors: null,
      });
    } else {
      const message = "Sorry, the Addition of New Classification failed.";
      res.status(501).render("inventory/add-classification.ejs", {
        title: "Add New Classification",
        nav,
        message,
        errors: null,
      });
    }
  };
  /* ****************************************
   *  Process Add New Vehicle
   **************************************** */
  invCont.addVehicle = async function (req, res) {
    let nav = await utilities.getNav();
  
    const {
      classification_id,
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
    } = req.body;
    // console.log(classification_id);
    const addVehicleResult = await invModel.addVehicle(
      classification_id,
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color
    );
    // console.log(addVehicleResult);
    if (addVehicleResult) {
      res.status(201).render("inventory/manage-inv.ejs", {
        title: "Vehicle Management",
        nav,
        message: `The ${inv_make} ${inv_model} classification was successfully added.`,
        errors: null,
      });
    } else {
      const message = "Sorry, the Addition of New Vehicle failed.";
      res.status(501).render("inventory/add-vehicle.ejs", {
        title: "Add New Vehicle",
        nav,
        message,
        errors: null,
      });
    }
  };

module.exports = invCont