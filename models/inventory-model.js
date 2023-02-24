const pool = require("../databases/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}





async function getVehiclesByClassificationId(classificationId){
  try{
    const data = await pool.query("SELECT * FROM public.inventory AS i JOIN public.classification AS c ON i.classification_id = c.classification_id WHERE i.classification_id = $1",[classificationId])
    return data.rows
  } catch (error){
    console.error('getclassificationbyid error' + error)
  }
}

async function getVehicleById(vehicleId){
  try{
    const data = await pool.query("SELECT * FROM public.inventory WHERE inventory.inv_id = $1",[vehicleId]);
    return data.rows
  } catch (error){
    console.error('getvehiclebyid error' + error)
  }
}
  module.exports = {getClassifications, getVehiclesByClassificationId,getVehicleById }