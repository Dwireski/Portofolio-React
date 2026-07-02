FROM dunglas/frankenphp:php8.3-bookworm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libsqlite3-dev \
    nodejs \
    npm \
    && docker-php-ext-install pdo_sqlite mbstring exif pcntl bcmath gd \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install PHP dependencies (tanpa Redis)
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Install Node dependencies
RUN npm install --legacy-peer-deps

# Build frontend
RUN npm run build

# Create necessary directories and set permissions
RUN mkdir -p storage/framework/{sessions,views,cache} storage/logs bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache \
    && chown -R www-data:www-data /app

# Set environment variables
ENV APP_ENV=production
ENV APP_DEBUG=false
ENV CACHE_DRIVER=file
ENV SESSION_DRIVER=file
ENV QUEUE_CONNECTION=sync

# Expose port
EXPOSE 80

# Start command
CMD ["php", "artisan", "migrate", "--force", "&&", "php", "artisan", "storage:link", "&&", "php", "artisan", "serve", "--host=0.0.0.0", "--port=80"]