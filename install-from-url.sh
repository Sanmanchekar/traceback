#!/bin/bash

# Traceback Installation Script - Like Manifold
# Usage: curl -sSL https://raw.githubusercontent.com/Sanmanchekar/traceback/main/install-from-url.sh | bash

set -e

echo "═══════════════════════════════════════════════════════════"
echo "     Traceback - AI Root Cause Analysis Tool"
echo "     Installing from GitHub (like Manifold)..."
echo "═══════════════════════════════════════════════════════════"
echo ""

# Configuration
REPO_URL="https://github.com/Sanmanchekar/traceback.git"
INSTALL_DIR="$HOME/.traceback"
BIN_DIR="/usr/local/bin"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "${BLUE}🔍 Checking prerequisites...${NC}"

if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git is not installed. Please install git first.${NC}"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed. Please install npm first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ All prerequisites met${NC}"

# Remove old installation if exists
if [ -d "$INSTALL_DIR" ]; then
    echo -e "${YELLOW}⚠️  Removing old installation...${NC}"
    rm -rf "$INSTALL_DIR"
fi

# Clone repository
echo -e "${BLUE}📦 Cloning Traceback from GitHub...${NC}"
git clone "$REPO_URL" "$INSTALL_DIR"

# Navigate to install directory
cd "$INSTALL_DIR"

# Install dependencies
echo -e "${BLUE}📥 Installing dependencies...${NC}"
npm install --silent

# Build the project
echo -e "${BLUE}🔨 Building Traceback...${NC}"
npm run build

# Make executables
chmod +x traceback
chmod +x traceback-command.js

# Create global command link
echo -e "${BLUE}🔗 Creating global command...${NC}"

# Create wrapper script that works from any directory
cat > "$INSTALL_DIR/traceback-global" << 'EOF'
#!/bin/bash
# Traceback global wrapper
export NODE_PATH="$HOME/.traceback/node_modules"
cd "$HOME/.traceback" && node "$HOME/.traceback/traceback" "$@"
EOF

chmod +x "$INSTALL_DIR/traceback-global"

# Install globally
if [ -w "$BIN_DIR" ]; then
    ln -sf "$INSTALL_DIR/traceback-global" "$BIN_DIR/traceback"
    echo -e "${GREEN}✅ Installed globally at $BIN_DIR/traceback${NC}"
else
    echo -e "${YELLOW}⚠️  Need sudo access to install globally...${NC}"
    sudo ln -sf "$INSTALL_DIR/traceback-global" "$BIN_DIR/traceback"
    echo -e "${GREEN}✅ Installed globally at $BIN_DIR/traceback${NC}"
fi

# Create Claude Code configuration
echo -e "${BLUE}🤖 Configuring for Claude Code...${NC}"

mkdir -p "$HOME/.claude"
cat > "$HOME/.claude/traceback.json" << 'EOF'
{
  "name": "traceback",
  "version": "1.0.0",
  "commands": {
    "/traceback": {
      "path": "/usr/local/bin/traceback",
      "description": "AI-powered Root Cause Analysis"
    }
  }
}
EOF

echo -e "${GREEN}✅ Claude Code configuration created${NC}"

# Verify installation
echo -e "${BLUE}🧪 Verifying installation...${NC}"

if command -v traceback &> /dev/null; then
    echo -e "${GREEN}✅ Traceback command is available${NC}"
else
    echo -e "${RED}❌ Installation verification failed${NC}"
    echo "Please add /usr/local/bin to your PATH"
    exit 1
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo -e "${GREEN}✨ Traceback installed successfully!${NC}"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo -e "${BLUE}📚 Usage in Claude Code:${NC}"
echo ""
echo "  /traceback analyze \"your issue description\""
echo "  /traceback solutions"
echo "  /traceback recommend"
echo "  /traceback implement solution-1"
echo "  /traceback status"
echo ""
echo -e "${YELLOW}💡 Example workflow:${NC}"
echo "  1. /traceback analyze \"API is slow\""
echo "  2. /traceback solutions"
echo "  3. /traceback recommend"
echo "  4. Let Claude implement the solution"
echo ""
echo -e "${GREEN}🎯 Installation location: $INSTALL_DIR${NC}"
echo -e "${GREEN}🔗 Command available at: $(which traceback)${NC}"
echo ""
echo "Type 'traceback' to test the installation!"