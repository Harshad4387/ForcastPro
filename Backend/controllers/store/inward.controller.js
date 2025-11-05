const RawMaterial = require("../../models/RawMaterial.model");
const Product = require("../../models/Product.model");
const ProductMaterial = require("../../models/ProductComponent.model");

const addRawMaterial = async (req, res) => {
  try {
    const materials = req.body; // Expecting an array of objects

    // Validate
    if (!Array.isArray(materials) || materials.length === 0) {
      return res.status(400).json({ success: false, message: "Provide an array of raw materials" });
    }

    // Optional: Validate each object has a name
    for (let i = 0; i < materials.length; i++) {
      if (!materials[i].name) {
        return res.status(400).json({ success: false, message: `Name is required for item at index ${i}` });
      }
    }

    // Insert all materials at once
    const insertedMaterials = await RawMaterial.insertMany(materials);

    res.status(201).json({
      success: true,
      message: `${insertedMaterials.length} raw materials added successfully`,
    });
  } catch (error) {
    console.error("Error adding raw materials:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding raw materials",
      error: error.message
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, assemblyTime, totalComponents, remarks } = req.body;

    
    if (!name || !assemblyTime) {
      return res.status(400).json({
        success: false,
        message: "Both 'name' and 'assemblyTime' are required"
      });
    }

    const newProduct = new Product({
      name,
      assemblyTime,
      totalComponents,
      remarks
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: newProduct
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding product",
      error: error.message
    });
  }
};

const addProductMaterial = async (req, res) => {
  try {
    const { product: productName, materials } = req.body;

    
    if (!productName) {
      return res.status(400).json({ success: false, message: "Product name is required" });
    }

  
    if (!materials || !Array.isArray(materials) || materials.length === 0) {
      return res.status(400).json({ success: false, message: "Materials array is required" });
    }

    for (let i = 0; i < materials.length; i++) {
      if (!materials[i].rawMaterial || !materials[i].quantity) {
        return res.status(400).json({
          success: false,
          message: `Each material must have 'rawMaterial' name and 'quantity' (error at index ${i})`
        });
      }
    }

   
    const productDoc = await Product.findOne({ name: productName });
    if (!productDoc) {
      return res.status(404).json({ success: false, message: `Product '${productName}' not found` });
    }

    
    const materialsWithIds = [];
    for (let m of materials) {
      const rawMaterialDoc = await RawMaterial.findOne({ name: m.rawMaterial });
      if (!rawMaterialDoc) {
        return res.status(404).json({ success: false, message: `Raw material '${m.rawMaterial}' not found` });
      }
      materialsWithIds.push({
        rawMaterial: rawMaterialDoc._id,
        quantity: m.quantity
      });
    }

 
    const newProductMaterial = new ProductMaterial({
      product: productDoc._id,
      materials: materialsWithIds
    });

    await newProductMaterial.save();


    await newProductMaterial.populate([
      { path: "product", select: "name" },
      { path: "materials.rawMaterial", select: "name category" }
    ]);

    res.status(201).json({
      success: true,
      message: "Product with materials added successfully",
      data: newProductMaterial
    });
  } catch (error) {
    console.error("Error adding product material:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding product material",
      error: error.message
    });
  }
};


module.exports = { addRawMaterial , addProduct , addProductMaterial };
