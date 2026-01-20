const RawMaterial = require("../models/RawMaterial.model");
const Product = require("../models/Product.model");
const ProductMaterial = require("../models/ProductComponent.model");

const addRawMaterialusingpostman = async (req, res) => {
  try {
    const materials = req.body;


    if (!Array.isArray(materials) || materials.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Provide an array of raw materials",
      });
    }

  
    for (let i = 0; i < materials.length; i++) {
      const item = materials[i];
      if (!item.name) {
        return res.status(400).json({
          success: false,
          message: `Name is required for item at index ${i}`,
        });
      }
      if (item.UniqueId === undefined) {
        return res.status(400).json({
          success: false,
          message: `UniqueId is required for item '${item.name}'`,
        });
      }
    }

   
    try {
      const insertedMaterials = await RawMaterial.insertMany(materials, {
        ordered: false, 
      });

      return res.status(201).json({
        success: true,
        message: `${insertedMaterials.length} raw materials added successfully`,
        data: insertedMaterials,
      });
    } catch (insertError) {
      if (insertError.name === "ValidationError" || insertError.writeErrors) {
        const errors = [];

        // For bulk inserts, Mongoose stores failed docs in `writeErrors`
        if (insertError.writeErrors) {
          insertError.writeErrors.forEach((err) => {
            const doc = err.err.op || {};
            errors.push({
              UniqueId: doc.UniqueId,
              name: doc.name,
              reason: err.err.errmsg || err.err.message,
            });
          });
        } else {
          // Single validation error (not bulk)
          errors.push({
            reason: insertError.message,
          });
        }

        return res.status(400).json({
          success: false,
          message: "Some raw materials failed validation",
          errors,
        });
      }

      throw insertError; // rethrow if not validation-related
    }
  } catch (error) {
    console.error("Error adding raw materials:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding raw materials",
      error: error.message,
    });
  }
};


const addProduct = async (req, res) => {
  try {
    const { productId, name, assemblyTime, totalComponents, remarks } = req.body;

    if (!productId || !name || !assemblyTime) {
      return res.status(400).json({
        success: false,
        message: "'productId', 'name', and 'assemblyTime' are required"
      });
    }

    const newProduct = new Product({
      productId,
      name,
      assemblyTime,
      totalComponents: totalComponents || 0,
      remarks: remarks || ""
    });

    await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: newProduct
    });

  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({
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
      return res.status(400).json({
        success: false,
        message: "Product name is required",
      });
    }
    if (!materials || !Array.isArray(materials) || materials.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Materials array is required",
      });
    }


    for (let i = 0; i < materials.length; i++) {
      const { uniqueId, quantity } = materials[i];
      if (uniqueId === undefined || quantity === undefined) {
        return res.status(400).json({
          success: false,
          message: `Missing 'uniqueId' or 'quantity' at index ${i}`,
        });
      }
    }

  
    const productDoc = await Product.findOne({ name: productName });
    if (!productDoc) {
      return res.status(404).json({
        success: false,
        message: `Product '${productName}' not found`,
      });
    }

    const materialsWithIds = [];

    for (let m of materials) {
     
      if (m.uniqueId === 0) {
        console.log(`⏭️ Ignored material with UniqueId 0: ${m.rawMaterial}`);
        continue;
      }

      const rawMaterialDoc = await RawMaterial.findOne({ UniqueId: m.uniqueId });
      if (!rawMaterialDoc) {
        return res.status(404).json({
          success: false,
          message: `Raw material with UniqueId '${m.uniqueId}' not found`,
        });
      }

      // ✅ Push even if quantity is negative
      materialsWithIds.push({
        rawMaterial: rawMaterialDoc._id,
        quantity: m.quantity, // keep as-is (can be negative)
      });
    }

    // ✅ Check if any valid materials remain
    if (materialsWithIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid materials to add (all had UniqueId 0)",
      });
    }

   
    const newProductMaterial = new ProductMaterial({
      product: productDoc._id,
      materials: materialsWithIds,
    });

    await newProductMaterial.save();

    
    await newProductMaterial.populate([
      { path: "product", select: "name quantity assemblyTime" },
      { path: "materials.rawMaterial", select: "name UniqueId category unit" },
    ]);

    res.status(201).json({
      success: true,
      message: "Product materials linked successfully",
      data: newProductMaterial,
    });
  } catch (error) {
    console.error("Error adding product material:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding product material",
      error: error.message,
    });
  }
};


module.exports = { addRawMaterialusingpostman , addProduct , addProductMaterial };
