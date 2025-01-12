document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("uploadImage");
  const uploadButton = document.getElementById("uploadButton");

  uploadButton.addEventListener("click", async () => {
    const file = fileInput.files[0];

    if (file) {
      // Send the image to the backend
      const results = await sendImageToBackend(file);

      // Display the results in the popup
      displayResults(results);
    } else {
      alert("Please upload an image.");
    }
  });
});

async function sendImageToBackend(imageBlob) {
  try {
    const formData = new FormData();
    formData.append("image", imageBlob);

    const response = await fetch("http://localhost:3000/similar-products", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch similar products from the backend.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending image to backend:", error);
    return null;
  }
}

function displayResults(results) {
  const resultsDiv = document.getElementById("results");

  resultsDiv.innerHTML = "";

  if (results && results.length > 0) {
    results.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.className = "product";

      productDiv.innerHTML = `
        <p><strong>${product.name}</strong></p>
        <p>Price: ${product.price}</p>
        <a href="${product.link}" target="_blank">View Product</a>
      `;

      resultsDiv.appendChild(productDiv);
    });
  } else {
    resultsDiv.innerHTML = "<p>No similar products found.</p>";
  }
}
