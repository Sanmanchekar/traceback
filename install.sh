#!/bin/bash

echo "📦 Installing Traceback for Claude Code..."

# Get the directory of the script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Build the project
echo "🔨 Building Traceback..."
cd "$DIR"
npm install
npm run build

# Make the traceback command executable
chmod +x "$DIR/traceback"

# Create a symlink in /usr/local/bin for global access
echo "🔗 Creating global command link..."
if [ -w /usr/local/bin ]; then
  ln -sf "$DIR/traceback" /usr/local/bin/traceback
  echo "✅ Traceback installed globally at /usr/local/bin/traceback"
else
  echo "⚠️  Cannot write to /usr/local/bin, trying with sudo..."
  sudo ln -sf "$DIR/traceback" /usr/local/bin/traceback
  echo "✅ Traceback installed globally at /usr/local/bin/traceback"
fi

echo ""
echo "✅ Installation complete!"
echo ""
echo "📚 You can now use Traceback in Claude Code:"
echo ""
echo "  /traceback analyze \"your issue description\""
echo "  /traceback solutions"
echo "  /traceback recommend"
echo "  /traceback implement solution-1"
echo "  /traceback status"
echo ""
echo "🎯 Example workflow:"
echo "  1. /traceback analyze \"API endpoints are slow\""
echo "  2. /traceback solutions"
echo "  3. /traceback recommend"
echo "  4. /traceback implement solution-1"
echo ""
echo "Type 'traceback' in any terminal to test it!"