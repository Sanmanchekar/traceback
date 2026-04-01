#!/bin/bash

# Traceback - Uninstall Script
# Completely removes Traceback from your system

set -e

echo "═══════════════════════════════════════════════════════════"
echo "     🗑️  Uninstalling Traceback"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Configuration
TRACEBACK_DIR="$HOME/.traceback"
CLAUDE_COMMANDS_DIR="$HOME/.claude/commands"
LOCAL_BIN="$HOME/.local/bin"

# Confirm uninstallation
echo -e "${YELLOW}⚠️  This will remove Traceback completely from your system${NC}"
read -p "Are you sure you want to uninstall? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}Uninstall cancelled${NC}"
    exit 0
fi

echo ""
echo -e "${BLUE}🧹 Removing Traceback components...${NC}"

# Remove Traceback directory
if [ -d "$TRACEBACK_DIR" ]; then
    echo -e "  Removing Traceback engine..."
    rm -rf "$TRACEBACK_DIR"
fi

# Remove Claude Code commands
echo -e "  Removing Claude Code commands..."
rm -f "$CLAUDE_COMMANDS_DIR"/traceback-*.md 2>/dev/null || true

# Remove local bin if it exists
if [ -f "$LOCAL_BIN/traceback" ]; then
    echo -e "  Removing command link..."
    rm -f "$LOCAL_BIN/traceback"
fi

# Remove global bin if it exists (might need sudo)
if [ -f "/usr/local/bin/traceback" ]; then
    echo -e "  Removing global command..."
    sudo rm -f "/usr/local/bin/traceback" 2>/dev/null || rm -f "/usr/local/bin/traceback" 2>/dev/null || true
fi

# Remove any config files
if [ -f "$HOME/.claude/traceback.json" ]; then
    echo -e "  Removing configuration..."
    rm -f "$HOME/.claude/traceback.json"
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo -e "${GREEN}✅ Traceback has been uninstalled${NC}"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "Thank you for using Traceback!"
echo "You can reinstall anytime with:"
echo "curl -sSL https://raw.githubusercontent.com/Sanmanchekar/traceback/main/install.sh | bash"
echo ""

exit 0