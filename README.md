# FightYourPCN

Upload your UK parking ticket (PCN) and receive an AI-generated appeal draft for £1.

## Tech Stack
- **Frontend**: Vite + React + Tailwind CSS
- **Backend**: Express.js (Node.js)
- **Database**: SQLite (via team-db CLI)
- **Payments**: Stripe Checkout
- **AI**: OpenRouter (OpenAI-compatible)
- **PDF**: pdf-lib

## Project Structure
- `/client`: React frontend
- `/server`: Express backend

## Getting Started

### Prerequisites
- Node.js (v18+)
- Stripe Account (for API keys)
- OpenRouter Account (for API keys)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/fightyourpcn-a11y/Fightyourpcn.git
   cd Fightyourpcn
   ```

2. **Frontend Setup**
   ```bash
   cd client
   npm install
   npm run dev
   ```

3. **Backend Setup**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env with your live keys
   npm start
   ```

## Configuration
The server requires the following environment variables in `server/.env`:
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `OPENROUTER_API_KEY`: Your OpenRouter API key
- `CLIENT_URL`: The URL of your frontend (e.g., http://localhost:5173)
- `PORT`: Server port (default 5000)

## License
This project is for internal use.

## Disclaimer
FightYourPCN provides AI-generated informational assistance and draft appeal documents only. It does not provide legal advice or solicitor representation.
