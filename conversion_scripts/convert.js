const fs = require("fs");
const csv = require("csv-parser");

const results = [];

fs.createReadStream("Book1.csv")
  .pipe(csv())
  .on("data", (row) => {

    // Skip blank rows or rows without Unique ID
    if (!row["Unique ID"] || row["Unique ID"].trim() === "" || row["Unique ID"] === "0") {
      return;
    }

    results.push({
      UniqueId: Number(row["Unique ID"]) || 0,
      name: row["Revised Name"]?.trim() || "",
      Pieces: Number(row["Pieces"]) || 0,
      category: row["Category"]?.trim() || "OTHERS",
      quantity: Number(row["Quantity"]) || 0,
      unit: row["Unit"]?.trim() || "-",
      supplier: row["Supplier"]?.trim() || "",
      remarks: row["Remarks"]?.trim() || ""
    });
  })
  .on("end", () => {
    fs.writeFileSync("output.json", JSON.stringify(results, null, 2));
    console.log("JSON array created → output.json");
  });
