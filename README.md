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
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

### Prerequisites

- Node.js 18.x or later
- MongoDB Atlas account
- ImageKit.io account

### Environment Variables

Create a `.env` file in the root directory and add the following:

```env
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_auth_secret

IMAGEKIT_PRIVATE_KEY=your_private_key
NEXT_PUBLIC_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_URL_ENDPOINT=your_url_endpoint
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Manas2412/ReelsPro.git
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### 🐳 Docker Usage

Alternatively, you can run the application using Docker for a consistent environment.

**1. Build the Docker image:**
```bash
docker build -t reels-pro .
```

**2. Run the container:**
Ensure your `.env` file is properly formatted (no quotes around values, no trailing spaces).
```bash
docker run -p 3000:3000 --env-file .env reels-pro
```

**3. Access the app:**
Visit [http://localhost:3000](http://localhost:3000).

#### 🛠️ Using Docker Compose (Recommended)

To simplify the process, you can use Docker Compose which automatically handles the build and environment variables:

```bash
docker compose up --build
```


## 📁 Project Structure

- `app/`: Next.js App Router pages and API routes.
- `components/`: Reusable UI components (VideoFeed, FileUpload, etc.).
- `lib/`: Utility functions, API client, and database connection.
- `models/`: Mongoose schemas for Users, Videos, and Products.
- `public/`: Static assets.

## 📝 License

This project is licensed under the MIT License.
