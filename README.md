# Reels Pro 🎬

A premium short-form video sharing platform and product showcase built with Next.js 15, specialized in high-performance media delivery and modern aesthetics.

![Reels Pro](https://ik.imagekit.io/krj9xyvmrh/tr:h-400/main-preview.png)

## 🚀 Features

- **🎥 Dynamic Video Reels**: High-quality short-form video streaming with ImageKit optimization.
- **📸 Product Showcase**: Create and explore product listings with beautiful imagery.
- **🔐 Secure Authentication**: Full user authentication system powered by NextAuth.js.
- **⚡ Real-time Uploads**: Advanced file upload system with progress tracking and validation.
- **🎨 Modern UI/UX**: Built with Tailwind CSS and DaisyUI, featuring a sleek dark theme and responsive design.
- **🔗 ImageKit Integration**: Automated video transformations, thumbnails, and optimized image delivery.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Auth**: [NextAuth.js](https://next-auth.js.org/)
- **Media SDK**: [ImageKit.io](https://imagekit.io/)
- **Process Manager**: [PM2](https://pm2.keymetrics.io/) (for production)
- **Reverse Proxy**: [Nginx](https://www.nginx.com/)

## 🏗️ Production Architecture

Reels Pro is designed for high availability and performance. The production environment uses a multi-container Docker setup:

1.  **Next.js App**: Running on Node.js 22, managed by PM2 for automatic restarts and monitoring.
2.  **Nginx Proxy**: Acts as a reverse proxy to handle incoming traffic on port 80 and forward it to the application.
3.  **Docker Compose**: Orchestrates both containers and manages the shared network.

## 🏁 Getting Started

### Prerequisites

- Node.js 18.x or later
- MongoDB Atlas account
- ImageKit.io account

### Environment Variables

Create a `.env` file in the root directory and add the following:

```env
# Database
MONGODB_URI=your_mongodb_uri

# Authentication
NEXTAUTH_SECRET=your_auth_secret
NEXTAUTH_URL=http://localhost:3000

# ImageKit (Media Delivery)
IMAGEKIT_PRIVATE_KEY=your_private_key
NEXT_PUBLIC_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_URL_ENDPOINT=your_url_endpoint
```

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Manas2412/ReelsPro.git
    cd ReelsPro
    ```

2.  **Install dependencies**:
    ```bash
    npm install --legacy-peer-deps
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Access the application**:
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🐳 Docker Usage (Production)

For production-ready deployment, use Docker Compose:

```bash
# Build and start the containers in detached mode
docker compose up --build -d
```

This will spin up:
-   A Next.js container (Reels Pro) listening on port 3000.
-   An Nginx container listening on port 80.

## 🚀 Automated Deployment (CI/CD)

The project features a GitHub Actions workflow (`.github/workflows/cd_prod.yml`) for automated deployment.

### Required GitHub Secrets:
To enable auto-deployment, add the following secrets to your GitHub repository:
- `PROD_HOST`: Production server IP address or domain.
- `SSH_PRIVATE_KEY`: Your SSH private key for server access.
- `SSH_PASSPHRASE`: (Optional) If your private key is encrypted.

The workflow automatically:
1. Pulls the latest code from `main`.
2. Rebuilds and restarts Docker containers.
3. Verifies container health and PM2 status.

## 📁 Project Structure

- `app/`: Next.js App Router pages and API routes.
- `components/`: Reusable UI components (VideoFeed, FileUpload, etc.).
- `lib/`: Utility functions, API client, and database connection.
- `models/`: Mongoose schemas for Users, Videos, and Products.
- `nginx-prod/`: Nginx configuration for production reverse proxy.
- `public/`: Static assets and icons.

## 📖 Documentation

For more detailed technical information, including API endpoints and data models, please refer to the [Developer Documentation](DEVELOPER.md).

## 📝 License

This project is licensed under the MIT License.

