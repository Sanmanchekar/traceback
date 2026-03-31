#!/bin/bash

# Traceback Local Installation (No sudo required)
# Usage: curl -sSL https://raw.githubusercontent.com/Sanmanchekar/traceback/main/install-local.sh | bash

set -e

echo "═══════════════════════════════════════════════════════════"
echo "     Traceback - AI Root Cause Analysis Tool"
echo "     Installing locally (no sudo required)..."
echo "═══════════════════════════════════════════════════════════"
echo ""

# Configuration
REPO_URL="https://github.com/Sanmanchekar/traceback.git"
INSTALL_DIR="$HOME/.traceback"
LOCAL_BIN="$HOME/.local/bin"

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

# Create local bin directory
mkdir -p "$LOCAL_BIN"

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
if [ -f "traceback-command.js" ]; then
    chmod +x traceback-command.js
fi

# Create wrapper script that works from any directory
echo -e "${BLUE}🔗 Creating local command...${NC}"

cat > "$LOCAL_BIN/traceback" << 'EOF'
#!/bin/bash
# Traceback local wrapper
export NODE_PATH="$HOME/.traceback/node_modules"
cd "$HOME/.traceback" && node "$HOME/.traceback/traceback" "$@"
EOF

chmod +x "$LOCAL_BIN/traceback"

# Add to PATH if not already there
if [[ ":$PATH:" != *":$HOME/.local/bin:"* ]]; then
    echo -e "${YELLOW}⚠️  Adding $LOCAL_BIN to PATH...${NC}"
    
    # Detect shell and add to appropriate profile
    if [ -n "$ZSH_VERSION" ]; then
        echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
        echo -e "${GREEN}✅ Added to ~/.zshrc${NC}"
    elif [ -n "$BASH_VERSION" ]; then
        echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
        echo -e "${GREEN}✅ Added to ~/.bashrc${NC}"
    else
        echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.profile
        echo -e "${GREEN}✅ Added to ~/.profile${NC}"
    fi
    
    # Add to current session
    export PATH="$HOME/.local/bin:$PATH"
fi

# Create Claude Code configuration
echo -e "${BLUE}🤖 Configuring for Claude Code...${NC}"

mkdir -p "$HOME/.claude"
cat > "$HOME/.claude/traceback.json" << EOF
{
  "name": "traceback",
  "version": "1.0.0",
  "commands": {
    "/traceback": {
      "path": "$LOCAL_BIN/traceback",
      "description": "AI-powered Root Cause Analysis"
    }
  }
}
EOF

echo -e "${GREEN}✅ Claude Code configuration created${NC}"

# Verify installation
echo -e "${BLUE}🧪 Verifying installation...${NC}"

# Check if command is available
if [ -x "$LOCAL_BIN/traceback" ]; then
    echo -e "${GREEN}✅ Traceback command installed successfully${NC}"
else
    echo -e "${RED}❌ Installation verification failed${NC}"
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
echo -e "${GREEN}🔗 Command available at: $LOCAL_BIN/traceback${NC}"
echo ""
echo -e "${YELLOW}⚡ To use traceback immediately:${NC}"
echo "  export PATH=\"\$HOME/.local/bin:\$PATH\""
echo "  traceback"
echo ""
echo -e "${BLUE}🔄 Or restart your terminal to activate PATH changes${NC}"