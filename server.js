const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint to fetch similar products
app.post("/similar-products", async (req, res) => {
  try {
    // Implement FashionCLIP or similar logic for testing
    const products = [
      { name: "Product 1", price: "$50", link: "https://example.com" },
      { name: "Product 2", price: "$45", link: "https://example.com" }
    ];
    res.json(products);
  } catch (error) {
    console.error("Error in /similar-products:", error.message);
    res.status(500).json({ error: "Failed to fetch similar products" });
  }
});

// Endpoint to fetch coupons
app.get("/coupons", (req, res) => {
  try {
    const coupons = [
      { code: "SAVE20", description: "20% off" },
      { code: "FREESHIP", description: "Free Shipping" }
    ];
    res.json(coupons);
  } catch (error) {
    console.error("Error in /coupons:", error.message);
    res.status(500).json({ error: "Failed to fetch coupons" });
  }
});

// Function to send image to Python backend for similarity scoring
async function fetchSimilarProducts(imagePath) {
  try {
    const formData = new FormData();
    formData.append("image", fs.createReadStream(imagePath));

    // Send the image to the Python backend
    const response = await axios.post("http://localhost:8000/image-similarity", formData, {
      headers: formData.getHeaders(),
    });

    console.log("Response from Python Backend:", response.data);
    return response.data.similarity_scores;
  } catch (err) {
    console.error("Error fetching similar products:", err.message);
    return null;
  }
}

// Example usage of fetchSimilarProducts
fetchSimilarProducts("./example.jpg").then((scores) => {
  if (scores) {
    console.log("Similarity Scores:", scores);
  } else {
    console.log("Failed to fetch similarity scores.");
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
 