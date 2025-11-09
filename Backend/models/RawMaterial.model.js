const mongoose = require("mongoose");

const rawMaterialSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  UniqueId : {type : Number , required : true },
  category: {
    type: String,
    enum: [
    "VIRAT FUSE",                
    "CONTACTOR",           
    "CONNECTORS",               
    "CONVERTOR RELAY(RED RELAY)",
    "MO. AUTO(GSM)",
    "MK1 RELAY(BLACK)",
    "MK2 DMC RELAY(WHITE)",
    "MU RELAY",
    "VIRAT CAPACITOR",
    "EPCOSS CAPACITOR",
    "BOX CAPACITOR",
    "COIL",
    "MCB",
    "BASE",
    "8MM DOL STATER(B)",
    "10MM DOLSTATER(DMC)",
    "MU2 DMC STATER",
    "PATTIKIT",
    "SWITCH",
    "METER",
    "TRANSFORMER",
    "WIRE",
    "READY WIRE SETS",
    "WIRE CONECTOR",
    "BLANCK PCB",
    "READY PCB",
    "SANMAN CAPACITOR",
    "METAL/PLASTIK BODY",
    "SCREW",
    "OUTER BOX",
    "KNOB \\ CLAMP \\ AUXILIRY",
    "ELECTRONIC COMPONENTS",
    "READY PANEL",
    "STICKER",
    "SOLDER METAL",
    "NUTBOLT(3mm)",
    "GROMMET 9MM (3/8)",    
    "OTHERS"               
  ],
    default: "OTHERS"
  },
  quantity: { type: Number }, 
  unit: { 
    type: String, 
    enum: [
      "PCS", 
      "BOX", 
      "SET",
      "BANDAL",
      "PACKET",
      "-", 
      "UNIT",
      "NOS",
      "KG"
    ], 
    default: "-"
  },
  size: { type: Number },
  supplier: {
    type : String,
    
  },
  remarks: { type: String }
});

const RawMaterial = mongoose.model("RawMaterial", rawMaterialSchema);
module.exports = RawMaterial;
