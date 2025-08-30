#!/bin/bash

# CarZone.co.rw Deployment Script
# This script builds and deploys the React application to the production server

set -e  # Exit on any error

# Configuration
SERVER_HOST="185.207.251.230"
SERVER_USER="root"
REMOTE_DIR="/var/www/carzone.co.rw"
LOCAL_BUILD_DIR="build"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root directory."
    exit 1
fi

print_status "Starting deployment process for CarZone.co.rw..."

# Step 1: Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    print_status "Installing dependencies..."
    npm install
    print_success "Dependencies installed successfully"
else
    print_status "Dependencies already installed, skipping..."
fi

# Step 2: Build the React application
print_status "Building React application..."
npm run build

if [ ! -d "$LOCAL_BUILD_DIR" ]; then
    print_error "Build failed - build directory not found"
    exit 1
fi

print_success "React application built successfully"

# Step 3: Create a temporary archive for transfer
print_status "Creating deployment archive..."
ARCHIVE_NAME="carzone-deploy-$(date +%Y%m%d-%H%M%S).tar.gz"
tar -czf "$ARCHIVE_NAME" -C "$LOCAL_BUILD_DIR" .

print_success "Deployment archive created: $ARCHIVE_NAME"

# Step 4: Deploy to server
print_status "Connecting to server and deploying..."

# SSH command to deploy
ssh "$SERVER_USER@$SERVER_HOST" << 'ENDSSH'
    set -e
    
    # Function to print colored output on remote server
    print_status() {
        echo -e "\033[0;34m[INFO]\033[0m $1"
    }
    
    print_success() {
        echo -e "\033[0;32m[SUCCESS]\033[0m $1"
    }
    
    print_warning() {
        echo -e "\033[1;33m[WARNING]\033[0m $1"
    }
    
    print_error() {
        echo -e "\033[0;31m[ERROR]\033[0m $1"
    }
    
    # Check if /var/www exists
    if [ ! -d "/var/www" ]; then
        print_error "/var/www directory does not exist"
        exit 1
    fi
    
    # List existing websites for safety
    print_status "Existing websites in /var/www:"
    ls -la /var/www/ || echo "No existing websites found"
    
    # Create carzone.co.rw directory if it doesn't exist
    if [ ! -d "/var/www/carzone.co.rw" ]; then
        print_status "Creating /var/www/carzone.co.rw directory..."
        mkdir -p /var/www/carzone.co.rw
        print_success "Directory created successfully"
    else
        print_warning "Directory /var/www/carzone.co.rw already exists"
        
        # Create backup of existing content
        BACKUP_NAME="carzone-backup-$(date +%Y%m%d-%H%M%S)"
        print_status "Creating backup of existing content: $BACKUP_NAME"
        tar -czf "/tmp/$BACKUP_NAME.tar.gz" -C /var/www/carzone.co.rw .
        print_success "Backup created: /tmp/$BACKUP_NAME.tar.gz"
    fi
    
    # Clean the directory for fresh deployment
    print_status "Cleaning deployment directory..."
    rm -rf /var/www/carzone.co.rw/*
    
    print_success "Directory cleaned and ready for deployment"
ENDSSH

# Step 5: Transfer the archive
print_status "Transferring deployment archive to server..."
scp "$ARCHIVE_NAME" "$SERVER_USER@$SERVER_HOST:/tmp/"

# Step 6: Extract and deploy on server
print_status "Extracting and deploying files on server..."
ssh "$SERVER_USER@$SERVER_HOST" << ENDSSH
    set -e
    
    print_status() {
        echo -e "\033[0;34m[INFO]\033[0m \$1"
    }
    
    print_success() {
        echo -e "\033[0;32m[SUCCESS]\033[0m \$1"
    }
    
    # Extract the archive
    print_status "Extracting deployment archive..."
    tar -xzf "/tmp/$ARCHIVE_NAME" -C /var/www/carzone.co.rw/
    
    # Set proper permissions
    print_status "Setting proper permissions..."
    chown -R www-data:www-data /var/www/carzone.co.rw/
    chmod -R 755 /var/www/carzone.co.rw/
    
    # Clean up temporary files
    rm -f "/tmp/$ARCHIVE_NAME"
    
    print_success "Deployment completed successfully!"
    
    # Show final directory structure
    print_status "Final directory structure:"
    ls -la /var/www/carzone.co.rw/
    
    print_status "Website deployed to: /var/www/carzone.co.rw/"
ENDSSH

# Step 7: Clean up local archive
rm -f "$ARCHIVE_NAME"

print_success "Deployment completed successfully!"
print_status "Website is now live at: http://185.207.251.230/carzone.co.rw/"
print_status "Make sure to configure your web server (Apache/Nginx) to serve this directory"
print_warning "Don't forget to set up SSL certificates and domain configuration for production use" 