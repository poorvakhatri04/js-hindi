# 🛡️ Video-eKYC-DAILOQA

A **real-time AI-powered Video e-KYC platform** for secure digital identity verification — combining **liveness detection, document intelligence, and multi-factor validation** into a production-ready pipeline.

Built with **FastAPI, React, ONNX models, and multi-layered AI validation**, this system ensures **fraud-resistant onboarding** for fintech and compliance-driven applications.

> **Core Focus:** Prevent spoofing, detect deepfakes, and ensure identity consistency across documents and biometric signals.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Liveness Detection System](#liveness-detection-system)
3. [OCR & Document Intelligence](#ocr--document-intelligence)
4. [Verification & Validation](#verification--validation)
5. [Demo](#demo)
6. [High Level Design](#high-level-design)
7. [Project Structure](#project-structure)
8. [API Endpoints](#api-endpoints)  
9. [Quick Start](#quick-start)
10. [Tech Stack](#tech-stack)
11. [Security Features](#security-features)
12. [Multi Layered Technical Sequence](#multi-layered-technical-sequence)
13. [Entity Relationship Diagram](#entity-relationship-diagram)
14. [License](#license) 

---

## Project Overview

This platform implements a **state-machine driven Video e-KYC workflow** with multiple AI validation layers:

-  **Biometric Liveness Verification**
-  **Document OCR with fallback intelligence**
-  **Government ID validation**
-  **Bank account verification**
-  **Deepfake & spoof detection**

Unlike basic KYC systems, this solution is designed to be:
- **Cost-efficient**
- **Fraud-resistant**
- **Real-time**
- **Extensible for compliance frameworks (UIDAI / RBI / KYC norms)**

---
## Liveness Detection System

A **multi-layered anti-spoofing pipeline** designed to prevent fraud and ensure real human presence.

### Models & Techniques

- **MiniFASNetV2 (ONNX)** → Face anti-spoofing  
- **MediaPipe Face Landmarks** → Real-time face tracking  
- **Moire Pattern Detection** → Detects screen replay attacks  
- **Texture Analysis** → Identifies printed/photo spoof attempts  
- **Behavioral Tracking** → Dot-follow head/eye movement validation  
- **Deepfake Detection** → Frame-level anomaly and synthetic face detection  

### Why Multi-Layer?

Single-model systems fail in real-world fraud scenarios.  
This system combines:

- **Behavioral signals** (movement tracking)
- **Visual signals** (face + texture)
- **Statistical signals** (model confidence & anomalies)

 Result: **Higher accuracy and stronger fraud resistance**

---

## OCR & Document Intelligence

### Dual-Layer Extraction Strategy

| Layer | Tool | Purpose |
|------|------|--------|
| Primary | Sarvam API | Structured data extraction |
| Fallback | Gemini Vision | Robust fallback for low-quality images |

### Aadhaar Handling

- **Front Side** → Name, DOB, Gender, Aadhaar Number  
- **Back Side** → Full Address  
- **Final Output** → Merged structured identity profile  

---

## Verification & Validation

### Identity Checks

- Aadhaar validation (UIDAI)
- PAN validation (NSDL)
- Cross-verification of:
  - Name  
  - Date of Birth  

Ensures both documents belong to the same individual  

---

### Bank Verification

- **API-based validation using Deepvue**
- Confirms:
  - Account holder name matches KYC identity  

Final step to ensure **financial identity consistency**

---
## Demo
<img width="1919" height="901" alt="Screenshot 2026-03-26 152737" src="https://github.com/user-attachments/assets/8239628e-590c-45c0-9861-58e9d186ce9f" />
<img width="1043" height="904" alt="Screenshot 2026-03-26 152837" src="https://github.com/user-attachments/assets/1467db0b-d28d-4492-a08c-fdaa98116411" />
<img width="1110" height="892" alt="Screenshot 2026-03-26 153036" src="https://github.com/user-attachments/assets/5fc8604a-1425-4af0-bc6b-ef7ba71453da" />

---

## High Level Design
```mermaid
graph TD
    User((User)) -->|HTTPS| FE[React Frontend]
    subgraph "Video-EKYC-DAILOQA Backend"
        API[FastAPI Gateway]
        Auth[Auth & OTP Service]
        Liveness[Liveness Engine]
        OCR[OCR Extraction Service]
        EKYC[Workflow Orchestrator]
    end
    
    Liveness --> MP[MediaPipe & MiniFASNet]
    OCR --> Sarvam[Sarvam AI API]
    OCR --> Gemini[Gemini 2.0 Fallback]
    EKYC --> MockBank[Mock UIDAI/NSDL API]
    API --> DB[(SQLite/PostgreSQL)]
```
---

## Project Structure
```
.
├── backend/                                 # Core backend (FastAPI + AI services)
│ ├── .venv/                                 # Python virtual environment
│
│ ├── app/                                   # Main application source
│ │
│ │ ├── api/                                 # API layer (routes/controllers)
│ │ │ └── v1/                                # Versioned API (v1)
│ │ │ ├── auth_routes.py                     # User auth (register/login/JWT)
│ │ │ ├── ekyc_routes.py                     # e-KYC orchestration endpoints
│ │ │ ├── liveness_routes.py                 # Real-time liveness detection APIs
│ │ │ ├── ocr_routes.py                      # Document OCR endpoints
│ │ │ └── otp_routes.py                      # Email OTP verification
│ │ │
│ │ ├── core/                                # Core utilities & configs
│ │ │ ├── config.py                          # Environment + app configuration
│ │ │ ├── otp.py                             # OTP generation logic
│ │ │ └── security.py                        # JWT, hashing, auth utilities
│ │ │
│ │ ├── models/                              # ML models & assets
│ │ │ ├── insightface/                       # Face recognition models
│ │ │ ├── face_landmarker.task               # MediaPipe face tracking model
│ │ │ └── minifasnet.onnx                    # Anti-spoofing CNN model
│ │ │
│ │ ├── schemas/                             # Pydantic schemas (data contracts)
│ │ │ ├── document/                          # OCR & document schemas
│ │ │ ├── ekyc/                              # e-KYC workflow schemas
│ │ │ ├── liveness/                          # Liveness request/response schemas
│ │ │ └── user/                              # User/auth schemas
│ │ │
│ │ ├── services/                            # Business logic & AI engines
│ │ │
│ │ │ ├── email_verification/                # OTP email service
│ │ │ │ ├── generate_otp.py                  # Generate OTP
│ │ │ │ └── verify_otp.py                    # Validate OTP
│ │ │ │
│ │ │ ├── liveness/                          # Multi-layer liveness detection engine
│ │ │ │ ├── behavioral_service.py            # Head/eye movement tracking
│ │ │ │ ├── deepfake_service.py              # Deepfake detection (Reality Defender)
│ │ │ │ ├── depth_service.py                 # Depth/3D face validation
│ │ │ │ ├── dot_service.py                   # Dot tracking logic
│ │ │ │ ├── liveness_engine.py               # Orchestrator (combines all signals)
│ │ │ │ ├── minifasnet_service.py            # CNN anti-spoofing
│ │ │ │ ├── moire_service.py                 # Screen replay detection
│ │ │ │ └── texture_service.py               # Texture-based spoof detection
│ │ │ │
│ │ │ ├── ocr/                               # Document intelligence layer
│ │ │ │ ├── extraction_service.py            # OCR pipeline controller
│ │ │ │ ├── gemini_service.py                # Gemini fallback OCR
│ │ │ │ └── sarvam_service.py                # Primary OCR (Sarvam API)
│ │ │ │
│ │ │ ├── bank_verification.py               # Bank account validation logic
│ │ │ └── email_service.py                   # Email sender (SMTP integration)
│ │ │
│ │ ├── session/                             # Session lifecycle management
│ │ ├── config.py                            # App-level config (fallback/global)
│ │ ├── db.py                                # Database connection & session
│ │ ├── main.py                              # FastAPI entrypoint
│ │ └── models.py                            # SQLAlchemy DB models
│ │
│ ├── session_snapshots/                     # Stored frames (liveness + deepfake checks)
│ ├── .env                                   # Environment variables (API keys, DB, etc.)
│ ├── pyproject.toml                         # Python project configuration
│ └── uv.lock                                # Dependency lock file
│
├── frontend/                                # React frontend (Vite + Tailwind)
│ ├── node_modules/                          # Dependencies
│ │
│ ├── src/                                   # Main frontend source
│ │ ├── components/                          # UI + feature components
│ │ │
│ │ │ ├── ui/                                # Reusable design system components
│ │ │ │ ├── button.jsx
│ │ │ │ ├── card.jsx
│ │ │ │ └── input.jsx
│ │ │ │
│ │ │ ├── AuthPage.jsx                       # Login/Register UI
│ │ │ ├── BankVerification.jsx               # Bank verification UI
│ │ │ ├── Dashboard.jsx                      # User dashboard
│ │ │ ├── DocumentCapture.jsx                # Upload/capture documents
│ │ │ ├── DocumentReview.jsx                 # Review extracted data
│ │ │ ├── LandingPage.jsx                    # Marketing/landing page
│ │ │ ├── LivenessDetection.jsx              # Real-time liveness UI
│ │ │ ├── ProcessSteps.jsx                   # Step-by-step flow UI
│ │ │ ├── ResultScreen.jsx                   # Final verification result
│ │ │ ├── StepIndicator.jsx                  # Progress tracker
│ │ │ └── WelcomeScreen.jsx                  # Entry screen
│ │ │
│ │ ├── lib/                                 # Utility helpers
│ │ │ └── utils.js
│ │ │
│ │ ├── services/                            # API integration layer
│ │ │ └── api.js                             # Axios client (backend communication)
│ │ │
│ │ ├── utils/                               # Custom logic
│ │ │ └── dotTracker.js                      # Behavioral liveness tracking logic
│ │ │
│ │ ├── App.jsx                              # Root component
│ │ ├── index.css                            # Global styles
│ │ └── main.jsx                             # React entrypoint
│ │
│ ├── index.html                             # HTML template
│ ├── package.json                           # Project dependencies
│ ├── package-lock.json
│ ├── postcss.config.js
│ ├── tailwind.config.js                     # Tailwind styling config
│ ├── vite.config.js                         # Vite bundler config
│ └── frontend.md                            # Frontend documentation
│
├── .gitignore
└── README.md
```
---

##  API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/v1/auth/register` | — | Register a new user |
| `POST` | `/api/v1/auth/login` | — | Authenticate user and return JWT |
| `POST` | `/api/v1/otp/verify` | — | Verify email OTP |

### Liveness & Biometrics

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/v1/liveness/session/start` | Bearer Token | Start liveness session |
| `POST` | `/api/v1/liveness/detect` | Bearer Token | Analyze frame for liveness & spoofing |
| `GET` | `/api/v1/liveness/session/result/{session_id}` | Bearer Token | Get final liveness result |

### Document OCR

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/v1/ocr/extract-aadhaar-front` | Bearer Token | Extract Aadhaar front details |
| `POST` | `/api/v1/ocr/extract-pan` | Bearer Token | Extract PAN card details |

### e-KYC Workflow

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/v1/ekyc/session/save-documents` | Bearer Token | Save extracted OCR data |
| `POST` | `/api/v1/ekyc/complete` | Bearer Token | Finalize e-KYC verification |

### Utility

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/health` | — | Health check endpoint |

---
## Quick Start

### 1. Backend Setup

```bash
cd backend
uv venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
uv pip install -e .
```
### 2. Start the server

```bash
cd backend
uvicorn app.main:app --reload
```
### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
---
## Tech Stack

| Component | Technology |
| :--- | :--- |
| **Backend** | Python, FastAPI, SQLAlchemy, Pydantic |
| **AI/ML** | MediaPipe Face Landmarker, MiniFASNet, InsightFace, ONNX Runtime |
| **Frontend** | React.js, Vite, Tailwind CSS, Lucide Icons, Axios |
| **APIs** | Sarvam AI, Google Gemini AI (Flash 2.0), SMTP for OTP |
| **Storage** | SQLite (Dev) / PostgreSQL (Prod) |

---
## Security Features
- Anti-Spoofing: Protection against high-res photos, video replays, and 3D masks.
- JWT Auth: Secure session management.
- OTP Verification: Email-based verification for user registration.
- Session Snapshots: Captures granular evidence during the liveness process for auditing.
---

## Multi Layered Technical Sequence
```mermaid
sequenceDiagram
    participant U as User
    participant FE as React UI
    participant BE as FastAPI Backend
    participant AI as Liveness/OCR Engines
    participant EXT as External APIs (Sarvam/Gemini)

    Note over U, FE: 1. Registration & Auth
    U->>FE: Enter Details
    FE->>BE: POST /auth/register
    BE->>BE: Generate & Send Email OTP
    U->>FE: Enter OTP
    FE->>BE: POST /otp/verify
    BE-->>FE: JWT Access Token

    Note over U, FE: 2. Liveness Detection
    FE->>BE: GET /liveness/session/start
    BE-->>FE: Challenges (Blink, Smile, Dot Path)
    loop Every Frame
        FE->>BE: POST /liveness/detect (Base64)
        BE->>AI: MiniFASNet + Moire + Texture
        AI-->>BE: Score
        BE-->>FE: Real-time Instruction (Move Closer/Hold)
    end
    FE->>BE: GET /liveness/result
    BE-->>FE: Status: ACCEPTED

    Note over U, FE: 3. Document OCR
    U->>FE: Upload Aadhaar/PAN
    FE->>BE: POST /ocr/extract (Parallel)
    BE->>EXT: Primary: Sarvam AI
    EXT-->>BE: Text/Error
    alt Sarvam Fails/Incomplete
        BE->>EXT: Fallback: Gemini 2.0 Flash Vision
        EXT-->>BE: OCR JSON
    end
    BE-->>FE: Extracted Form Data

    Note over U, FE: 4. Final Verification
    U->>FE: Review & Submit Form
    FE->>BE: POST /ekyc/verify-documents
    BE->>BE: Mock NSDL/UIDAI Penny Drop
    BE-->>FE: SUCCESS: Vaulted
```
---

## Entity Relationship Diagram
```mermaid
erDiagram
    USER ||--o{ EKYC_SESSION : "initiates"
    EKYC_SESSION ||--o{ DOCUMENT : "contains"
    EKYC_SESSION ||--o{ LIVENESS_RESULT : "validates"

    USER {
        uuid id PK
        string name
        string email
        string phone
        string kyc_status
        boolean is_kyc_completed
    }

    EKYC_SESSION {
        uuid id PK
        uuid user_id FK
        boolean liveness_verified
        boolean aadhaar_verified
        boolean pan_verified
        string status "pending | completed"
        json aadhaar_data
        json pan_data
    }

    DOCUMENT {
        uuid id PK
        uuid session_id FK
        string document_type "aadhaar_front | pan"
        string document_number
        json ocr_data
        boolean verified
    }

    LIVENESS_RESULT {
        uuid id PK
        uuid session_id FK
        float confidence
        boolean result
        json check_details "CNN, Moire, Texture"
    }
```
---

## License

This project is provided for **educational, internal use, and compliance testing purposes only**.

Unauthorized use, reproduction, modification, or distribution of this software for commercial purposes is strictly prohibited without prior permission from the author.
