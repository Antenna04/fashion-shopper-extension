from fastapi import FastAPI, File, UploadFile
from PIL import Image
import torch
from transformers import CLIPProcessor, CLIPModel

app = FastAPI()

# Load the FashionCLIP model and processor
model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

@app.post("/image-similarity")
async def image_similarity(image: UploadFile = File(...)):
    # Load the uploaded image
    image = Image.open(image.file).convert("RGB")

    # Define categories for comparison (e.g., fashion-related terms)
    categories = ["dress", "shirt", "shoes", "jeans", "jacket"]

    # Preprocess the image and prepare input for the model
    inputs = processor(text=categories, images=image, return_tensors="pt", padding=True)

    # Generate embeddings and similarity scores
    outputs = model(**inputs)
    logits_per_image = outputs.logits_per_image  # Image-to-text similarity scores
    scores = logits_per_image.softmax(dim=1).tolist()  # Normalize scores using softmax

    # Combine scores with category names for better readability
    result = [{"category": cat, "score": score} for cat, score in zip(categories, scores[0])]

    # Return the similarity scores
    return {"similarity_scores": result}
