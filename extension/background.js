chrome.runtime.onInstalled.addListener(() => {
    console.log("FashionHelper installed!");
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "fetchSimilarProducts") {
      fetch("http://localhost:8000/similar-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: message.image })
      })
        .then((response) => response.json())
        .then((data) => sendResponse(data))
        .catch((error) => console.error(error));
      return true; // Keep the message channel open
    }
  });
  
  