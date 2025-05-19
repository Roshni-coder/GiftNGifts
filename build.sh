#!/bin/bash

# This script builds the project using the specified build tool.
# Build Client
echo "Building Client...\n"
cd Client && yarn build && cd ..

# Build Server
echo "Building Server...\n"
cd Server && yarn build && cd ..

# Build Admin
echo "Building Admin...\n"
cd Admin && yarn build && cd ..

# Build Seller
echo "Building Seller...\n"
cd Seller && yarn build && cd ..

echo "\nBuild completed successfully!\n"

# Restart the server
echo "Restarting the server...\n"
pm2 restart gng-server
echo "Server restarted successfully!\n"