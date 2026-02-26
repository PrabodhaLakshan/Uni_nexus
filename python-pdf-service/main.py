from fastapi import FastAPI
from pydantic import BaseModel
import requests

app = FastAPI(title="PDF Verification Service", version="1.0")

class VerifyRequest(BaseModel):
    pdf_url: str
    template_version: str = "v1"

@app.get("/health")
def health():
    return {"ok": True, "service": "pdf-verifier"}

@app.post("/verify")
def verify(req: VerifyRequest):
    # 1) Download PDF
    r = requests.get(req.pdf_url, timeout=30)
    r.raise_for_status()
    pdf_bytes = r.content

    # 2) TODO: here you will do template checks + extraction
    # For now return mock to test pipeline
    return {
        "verified": True,
        "score": 80,
        "reasons": [],
        "extractedMarks": [
            {"moduleCode": "ITPM", "moduleName": "IT Project Management", "marks": 85, "grade": "A", "semesterTag": "Y2S2"},
            {"moduleCode": "SE", "moduleName": "Software Engineering", "marks": 78, "grade": "A-", "semesterTag": "Y2S2"},
        ],
    }