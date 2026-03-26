# 🛡️ Video-EKYC-DAILOQA

An advanced, real-time Digital Identity Verification platform. This system implements a robust Video-eKYC workflow involving AI-driven liveness detection, document OCR, and multi-factor authentication.

---

## 🚀 System Overview

Our eKYC process is designed as a secure state-machine flow ensuring maximum compliance and security.

### 🔄 The eKYC Journey
1. **Authentication**: Secure Login/Signup with E-mail OTP.
2. **Liveness Detection**: Multi-layered check (MiniFASNet, Moire, Texture, & Behavioral) to ensure a real human presence.
3. **Document OCR**: Automatic extraction of data from Aadhaar and PAN cards.
4. **Data Review**: User-verified document information.
5. **Bank Verification**: Final validation via Penny-drop or API-based bank check.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Backend** | Python, FastAPI, SQLAlchemy, Pydantic |
| **AI/ML** | MediaPipe, MiniFASNet, InsightFace, ONNX Runtime |
| **Frontend** | React.js, Vite, Tailwind CSS, Lucide Icons |
| **Storage** | SQLite (Dev) / PostgreSQL (Prod) |

---

## 📂 Project Structure

### [Backend](./backend)
- `app/api/v1/`: API endpoints for Auth, EKYC, Liveness, and OCR.
- `app/services/liveness/`: The core Liveness Engine including `deepfake_service.py` and `texture_service.py`.
- `app/models/`: Pre-trained ONNX models for face landmarker and anti-spoofing.

### [Frontend](./frontend)
- `src/components/`: Modular UI components like `LivenessDetection.jsx` and `DocumentCapture.jsx`.
- `src/services/api.js`: Axios-based client for backend communication.
- `src/utils/dotTracker.js`: Logic for behavioral liveness head-movement tracking.

---

## ⚙️ Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- [uv](https://github.com/astral-sh/uv) (Recommended for Python)

### 1. Setup Backend
cd backend
uv venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
uv pip install -e .
python -m app.main

### 2. Setup Frontend
cd backend
uv venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
uv pip install -e .
python -m app.main

## 🔒 Security Features
- Anti-Spoofing: Protection against high-res photos, video replays, and 3D masks.
- JWT Auth: Secure session management.
- OTP Verification: Email-based verification for user registration.
- Session Snapshots: Captures granular evidence during the liveness process for auditing.

## 📝 License
This project is for internal use and compliance testing.
