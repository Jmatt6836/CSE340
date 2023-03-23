const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.buildNav = function (data) {
  let list = "<ul>"
  list += '<li><a class="navlink" href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a class="navlink" href="/inv/type/' + row.classification_id + '" title="See our inventory of ' + row.classification_name + ' vehicles">' + row.classification_name + "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}
/* ************************
 * Builds the navigation bar
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  nav = Util.buildNav(data)
  return nav
}

Util.buildpage = async function (vehicle) {
  let html = `
    <div >
    <img src="${vehicle.inv_image}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model} on CSE Motors">
    <h3> ${vehicle.inv_make} ${vehicle.inv_model} Details</h3>
    <p class="car-price">Price: $${new Intl.NumberFormat('en-US').format(vehicle.inv_price)}</p>
    <p class="car-description">Description: ${vehicle.inv_description}</p>
    <p class="car-color">Color: ${vehicle.inv_color}</p>
    <p class="car-mileage">Mileage: ${new Intl.NumberFormat('en-US').format(vehicle.inv_miles)}</p>
    </div>
  `
  return html
}

Util.buildClassDropDown = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let list = "<select id='classification_id' name='classification_id'>"
  list += "<option>Choose a Classification</option>"
      data.rows.forEach((row) => {
      list += "<option value='" + row.classification_id +"'"
          if (classification_id != null && row.classification_id == classification_id) {
              list += " selected "
      }
      list += ">" + row.classification_name + "</option>"
  })
  list += '</select>'
  return list
}

module.exports = Util