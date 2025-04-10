# Stage 1: Install dependencies
FROM node:18-slim AS deps

WORKDIR /app

# Install required OS packages (no OCR tools yet)
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json* ./
RUN npm ci


# Stage 2: Build the application
FROM node:18-slim AS builder

WORKDIR /app

# Install OCR dependencies in build stage
RUN apt-get update && apt-get install -y \
    poppler-utils \
    tesseract-ocr \
    tesseract-ocr-eng \
    && rm -rf /var/lib/apt/lists/*

COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build


# Stage 3: Run the application with OCR tools available
FROM node:18-slim AS runner

WORKDIR /app
ENV NODE_ENV=production

# ✅ Install OCR tools only (minimal)
RUN apt-get update && apt-get install -y \
    poppler-utils \
    tesseract-ocr \
    tesseract-ocr-eng \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 5000
CMD ["npm", "start"]
