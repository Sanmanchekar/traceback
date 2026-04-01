#!/bin/bash

# Traceback - Update Script
# Updates existing installation to latest version from GitHub

set -e

echo "═══════════════════════════════════════════════════════════"
echo "     🔄 Updating Traceback to Latest Version"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Configuration
REPO_URL="https://github.com/Sanmanchekar/traceback.git"
TRACEBACK_DIR="$HOME/.traceback"
CLAUDE_COMMANDS_DIR="$HOME/.claude/commands"
TEMP_DIR="/tmp/traceback-update-$$"

# Check if Traceback is installed
if [ ! -d "$TRACEBACK_DIR" ]; then
    echo -e "${RED}❌ Traceback not installed. Please install first:${NC}"
    echo "curl -sSL https://raw.githubusercontent.com/Sanmanchekar/traceback/main/install.sh | bash"
    exit 1
fi

echo -e "${BLUE}📦 Backing up current installation...${NC}"
cp -r "$TRACEBACK_DIR" "$TRACEBACK_DIR.backup"

echo -e "${BLUE}📥 Downloading latest version...${NC}"
git clone --depth 1 "$REPO_URL" "$TEMP_DIR" >/dev/null 2>&1

echo -e "${BLUE}🔄 Updating Traceback engine...${NC}"
cd "$TEMP_DIR"
npm install --silent >/dev/null 2>&1
npm run build >/dev/null 2>&1

# Copy updated files
cp -r dist/* "$TRACEBACK_DIR/dist/" 2>/dev/null || true
cp -r src/* "$TRACEBACK_DIR/src/" 2>/dev/null || true
cp package.json "$TRACEBACK_DIR/"
cp -r node_modules "$TRACEBACK_DIR/" 2>/dev/null || true

echo -e "${BLUE}📝 Updating Claude Code commands...${NC}"
if [ -d "$TEMP_DIR/claude-commands" ]; then
    cp "$TEMP_DIR"/claude-commands/*.md "$CLAUDE_COMMANDS_DIR/" 2>/dev/null || true
    echo -e "${GREEN}✅ Updated Claude Code commands${NC}"
fi

# Clean up
echo -e "${BLUE}🧹 Cleaning up...${NC}"
rm -rf "$TEMP_DIR"
rm -rf "$TRACEBACK_DIR.backup"

echo ""
echo "═══════════════════════════════════════════════════════════"
echo -e "${GREEN}✨ Traceback updated successfully!${NC}"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo -e "${BLUE}📋 What's New:${NC}"
echo "  • /traceback:test command for testing solutions"
echo "  • Built-in token optimization (40-60% reduction)"
echo "  • Improved performance and bug fixes"
echo ""
echo -e "${YELLOW}💡 No need to restart Claude Code${NC}"
echo "  Commands are updated automatically"
echo ""

exit 0