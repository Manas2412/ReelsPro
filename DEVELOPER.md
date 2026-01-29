# Reels Pro - Developer Documentation 🛠️

This file contains technical details about the Reels Pro architecture, data models, and API endpoints.

## 🏗️ Architecture

Reels Pro is built as a full-stack Next.js application using the App Router. It leverages a serverless architecture where Next.js API routes handle backend logic and database interactions.

### Data Models

#### User (`models/User.ts`)
- `email`: Unique string (Required)
- `password`: Hashed string (Required)
- `createdAt`/`updatedAt`: Automated timestamps

#### Video Reel (`models/Video.ts`)
- `title`: String (Required)
- `description`: String (Required)
- `videoUrl`: ImageKit path (Required)
- `thumbnailUrl`: String (Required)
- `transformation`: Object (Height, Width, Quality)
- `controls`: Boolean (Default: true)

#### Product (`models/Product.ts`)
- `name`: String (Required)
- `description`: String (Required)
- `imageUrl`: ImageKit path (Required)
- `price`: Number (Required)

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user.
- `GET /api/auth/session`: Get current session data (NextAuth).

### Media & Content
- `GET /api/videos`: Fetch all video reels.
- `POST /api/videos`: Upload a new video (Requires Auth).
- `GET /api/products`: Fetch all product listings.
- `POST /api/products`: Create a new product (Requires Auth).

### ImageKit
- `GET /api/imagekit-auth`: Provides authentication parameters for client-side ImageKit uploads.

## 🔧 Core Components

- **FileUpload.tsx**: Generic component that handles both Image and Video uploads to ImageKit with validation.
- **VideoFeed.tsx**: Responsive grid component for displaying video content.
- **MainPage.tsx**: The landing experience featuring a hero section and curated feed.
- **apiClient.ts**: A singleton class for making type-safe requests to the backend.

## 🧪 Development Notes

- **Peer Dependencies**: Use `--legacy-peer-deps` when installing, as some packages have strict React version requirements that conflict with React 19.
- **ImageKit Folders**: Uploads are organized into `/videos` and `/images` folders within your ImageKit dashboard.
- **Styling Tokens**: Custom themes are managed in `tailwind.config.ts` using DaisyUI.

## 🐳 Docker Production Setup

The production environment is orchestrated via Docker Compose and includes Nginx as a reverse proxy.

### Dockerfile Optimizations:
- **Base Image**: Uses `node:22-alpine` for a minimal footprint.
- **Process Management**: Uses `pm2-runtime` to manage the Next.js process, ensuring automatic restarts and logs.
- **Build Phase**: API routes are marked as `force-dynamic` to bypass database connection requirements during the build.

### Nginx Configuration (`nginx-prod/nginx-prod.conf`):
- Listens on port 80.
- Proxies requests to the `reels_pro` service on port 3000.
- Handles WebSocket upgrades for Next.js hot reloading and real-time features.
- Sets standard proxy headers (`Host`, `X-Real-IP`, `X-Forwarded-For`).

### CD Workflow (`.github/workflows/cd_prod.yml`):
- Triggers on push to `main`.
- Connects to the production server via SSH.
- Performs a `git pull`, followed by `docker compose up --build -d`.
- Performs health checks on the containers and PM2 status.

### Environment Requirements:
Docker's `--env-file` flag is strict. Ensure your `.env` file does **not** contain:
- Quotes around values (e.g., use `SECRET=abc` not `SECRET="abc"`)
- Whitespace before or after the `=` sign
- Trailing spaces at the end of lines


