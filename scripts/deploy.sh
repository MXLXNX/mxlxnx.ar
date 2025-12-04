#!/bin/bash

# Load environment variables
if [ -f .env ]; then
  export $(cat .env | grep -v '#' | xargs)
else
  echo "Error: .env file not found"
  echo "Copy .env.example to .env and fill in your FTP credentials"
  exit 1
fi

# Check required variables
if [ -z "$FTP_HOST" ] || [ -z "$FTP_USER" ] || [ -z "$FTP_PASS" ]; then
  echo "Error: FTP credentials not set in .env"
  exit 1
fi

echo "🔨 Building site..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed"
  exit 1
fi

echo "📤 Deploying to FTP..."
lftp -c "
  set ssl:verify-certificate no;
  open -u $FTP_USER,$FTP_PASS $FTP_HOST;
  mirror --reverse --delete --verbose --exclude .git/ --exclude node_modules/ dist/ $FTP_DIR;
  quit
"

if [ $? -eq 0 ]; then
  echo "✅ Deploy successful!"
else
  echo "❌ Deploy failed"
  exit 1
fi
