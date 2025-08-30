# CarZone.co.rw Deployment Guide

This guide explains how to deploy the CarZone website to the production server.

## Prerequisites

1. **SSH Access**: Ensure you have SSH access to the server `root@185.207.251.230`
2. **SSH Key Setup**: For automated deployment, set up SSH key authentication
3. **Node.js**: Make sure Node.js is installed on your local machine
4. **npm**: Ensure npm is available

## Quick Deployment

To deploy the website, simply run:

```bash
./deploy.sh
```

## What the Deployment Script Does

The `deploy.sh` script performs the following steps:

1. **Validates Environment**: Checks if you're in the correct directory and have the necessary files
2. **Installs Dependencies**: Runs `npm install` if node_modules doesn't exist
3. **Builds Application**: Creates a production build using `npm run build`
4. **Creates Archive**: Packages the built files into a compressed archive
5. **Connects to Server**: Establishes SSH connection to `185.207.251.230`
6. **Safely Creates Directory**: Creates `/var/www/carzone.co.rw` without affecting other websites
7. **Backs Up Existing Content**: If the directory already exists, creates a backup
8. **Deploys Files**: Extracts the archive and sets proper permissions
9. **Cleans Up**: Removes temporary files

## Safety Features

- **Non-destructive**: The script only affects the `carzone.co.rw` directory
- **Backup Creation**: Automatically backs up existing content before overwriting
- **Error Handling**: Stops execution if any step fails
- **Permission Setting**: Sets proper web server permissions (www-data:www-data)

## Server Configuration

After deployment, you'll need to configure your web server:

### Apache Configuration
Create a virtual host configuration:

```apache
<VirtualHost *:80>
    ServerName carzone.co.rw
    DocumentRoot /var/www/carzone.co.rw
    
    <Directory /var/www/carzone.co.rw>
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/carzone_error.log
    CustomLog ${APACHE_LOG_DIR}/carzone_access.log combined
</VirtualHost>
```

### Nginx Configuration
Create a server block:

```nginx
server {
    listen 80;
    server_name carzone.co.rw;
    root /var/www/carzone.co.rw;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    error_log /var/log/nginx/carzone_error.log;
    access_log /var/log/nginx/carzone_access.log;
}
```

## SSL Certificate Setup

For production, set up SSL certificates:

```bash
# Using Let's Encrypt
sudo certbot --apache -d carzone.co.rw

# Or for Nginx
sudo certbot --nginx -d carzone.co.rw
```

## Troubleshooting

### Common Issues

1. **SSH Connection Failed**
   - Verify SSH key is set up correctly
   - Check if the server is accessible
   - Ensure you have root access

2. **Build Failed**
   - Check if all dependencies are installed
   - Verify Node.js version compatibility
   - Check for any build errors in the console

3. **Permission Denied**
   - Ensure the script is executable: `chmod +x deploy.sh`
   - Check if you have write permissions to the project directory

4. **Website Not Loading**
   - Verify web server configuration
   - Check if the domain points to the correct server
   - Ensure firewall allows HTTP/HTTPS traffic

### Manual Deployment

If the script fails, you can deploy manually:

```bash
# Build locally
npm install
npm run build

# Transfer files manually
scp -r build/* root@185.207.251.230:/var/www/carzone.co.rw/

# Set permissions on server
ssh root@185.207.251.230 "chown -R www-data:www-data /var/www/carzone.co.rw && chmod -R 755 /var/www/carzone.co.rw"
```

## Backup and Rollback

The script automatically creates backups in `/tmp/` on the server. To rollback:

```bash
# Connect to server
ssh root@185.207.251.230

# List available backups
ls -la /tmp/carzone-backup-*

# Restore from backup
tar -xzf /tmp/carzone-backup-YYYYMMDD-HHMMSS.tar.gz -C /var/www/carzone.co.rw/
```

## Monitoring

After deployment, monitor the website:

- Check server logs: `/var/log/apache2/` or `/var/log/nginx/`
- Monitor server resources: `htop`, `df -h`
- Test website functionality
- Verify SSL certificate status

## Support

For deployment issues, check:
1. Server logs for errors
2. Web server configuration
3. DNS settings
4. Firewall rules 