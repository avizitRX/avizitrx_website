import os
from bangla_pdf_ocr import process_pdf

# Define paths
pdf_path = os.path.join("scripts", "textbook.pdf")
output_txt_path = os.path.join("data", "textbook.txt")

# Ensure data directory exists
os.makedirs("data", exist_ok=True)

if not os.path.exists(pdf_path):
    raise FileNotFoundError(f"Textbook not found at {pdf_path}. Please place your PDF there.")

print("Starting local offline OCR on the 100-page textbook (this will take a couple of minutes)...")

# Process PDF using local Tesseract OCR for Bengali ('ben')
process_pdf(pdf_path, output_txt_path, language="ben")

print(f"✅ OCR Complete! Saved extracted text to {output_txt_path}")
