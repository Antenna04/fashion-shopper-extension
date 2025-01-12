// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Ensure asynchronous response by returning true
  if (request.action === "captureImage") {
    // Find the first image on the page (you can customize this for specific sites)
    const image = document.querySelector("img");
    if (image) {
      sendResponse({ imageUrl: image.src });
    } else {
      sendResponse({ error: "No image found on this page." });
    }
    return true; // Return true to indicate that sendResponse will be called asynchronously
  }

  if (request.action === "extractProduct") {
    const title = document.querySelector("h1") ? document.querySelector("h1").innerText : "Title not found";
    const price = document.querySelector(".price") ? document.querySelector(".price").innerText : "Price not found";
    const image = document.querySelector("img") ? document.querySelector("img").src : "Image not found";

    const product = { title, price, image };

    sendResponse(product);
    return true; // Return true to keep the message channel open
  }

  // Handle any other actions (if needed)
});
