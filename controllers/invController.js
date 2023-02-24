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

module.exports = invCont