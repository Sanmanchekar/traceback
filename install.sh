#!/bin/bash

# Traceback - Claude Code Installation 
# Creates Claude Code commands directly for seamless integration
# Usage: curl -sSL https://raw.githubusercontent.com/Sanmanchekar/traceback/main/install.sh | bash

set -e

echo "═══════════════════════════════════════════════════════════"
echo "     🔍 Traceback - AI Root Cause Analysis"
echo "     Installing for Claude Code integration..."
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
TEMP_DIR="/tmp/traceback-install"
CLAUDE_COMMANDS_DIR="$HOME/.claude/commands"
TRACEBACK_DIR="$HOME/.traceback"

# Prerequisites check
echo -e "${BLUE}🔍 Checking prerequisites...${NC}"

if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git not found. Please install git first.${NC}"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found. Please install Node.js 16+ first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Prerequisites satisfied${NC}"

# Create Claude commands directory
echo -e "${BLUE}📁 Creating Claude Code commands directory...${NC}"
mkdir -p "$CLAUDE_COMMANDS_DIR"

# Check for existing installation
if [ -d "$TRACEBACK_DIR" ]; then
    echo -e "${YELLOW}⚠️  Existing installation found${NC}"
    echo -e "${BLUE}🔄 Updating to latest version...${NC}"
    # Backup existing data if needed
    if [ -f "$TRACEBACK_DIR/.traceback-data" ]; then
        cp "$TRACEBACK_DIR/.traceback-data" "/tmp/.traceback-data.backup"
    fi
else
    echo -e "${BLUE}📦 Fresh installation...${NC}"
fi

# Clean up temp directory
echo -e "${YELLOW}🧹 Preparing installation...${NC}"
rm -rf "$TEMP_DIR"
rm -f "$CLAUDE_COMMANDS_DIR"/traceback-*.md

# Clone repository to temp location  
echo -e "${BLUE}📥 Downloading Traceback...${NC}"
git clone --depth 1 "$REPO_URL" "$TEMP_DIR" >/dev/null 2>&1

# Install Traceback engine
echo -e "${BLUE}🔧 Installing Traceback engine...${NC}"
mkdir -p "$TRACEBACK_DIR"
cp -r "$TEMP_DIR"/* "$TRACEBACK_DIR/"
cd "$TRACEBACK_DIR"
npm install >/dev/null 2>&1

# Install Claude Code commands
echo -e "${BLUE}⚡ Installing Claude Code commands...${NC}"
if [ -d "$TEMP_DIR/claude-commands" ]; then
    cp "$TEMP_DIR"/claude-commands/*.md "$CLAUDE_COMMANDS_DIR/"
    echo -e "${GREEN}✅ Installed 5 Traceback commands${NC}"
else
    echo -e "${YELLOW}⚠️  Claude commands not found, copying from current directory...${NC}"
    # Fallback: look for commands in current directory
    if [ -d "claude-commands" ]; then
        cp claude-commands/*.md "$CLAUDE_COMMANDS_DIR/"
        echo -e "${GREEN}✅ Installed 5 Traceback commands${NC}"
    else
        echo -e "${RED}❌ Claude commands not found${NC}"
        exit 1
    fi
fi

# Create Traceback runner script that commands will use
echo -e "${BLUE}🔗 Creating command runner...${NC}"
cat > "$TRACEBACK_DIR/run-command.js" << 'EOF'
#!/usr/bin/env node

// Traceback command runner for Claude Code integration
const { Traceback } = require('./dist/index.js');

async function runTraceback(command, args) {
    const traceback = new Traceback();
    
    try {
        switch (command) {
            case 'analyze':
                return await traceback.analyze(args.issue, { mode: args.mode || 'standard' });
            case 'solutions':
                return await traceback.solutions(args);
            case 'recommend':
                return await traceback.recommend();
            case 'implement':
                return await traceback.implement(args.solutionId, args.options);
            case 'status':
                return traceback.status();
            case 'constraint':
                return await traceback.addConstraint(args.description, args.type);
            default:
                throw new Error(`Unknown command: ${command}`);
        }
    } catch (error) {
        console.error('Traceback Error:', error.message);
        process.exit(1);
    }
}

// Parse command line arguments
const command = process.argv[2];
const argsJson = process.argv[3];
const args = argsJson ? JSON.parse(argsJson) : {};

runTraceback(command, args).then(result => {
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    }
}).catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
EOF

chmod +x "$TRACEBACK_DIR/run-command.js"

# Update command files to use the runner (modify the execution instructions)
echo -e "${BLUE}🔄 Configuring commands for Claude Code...${NC}"

for cmd_file in "$CLAUDE_COMMANDS_DIR"/traceback-*.md; do
    if [ -f "$cmd_file" ]; then
        # Add execution footer to each command file
        cat >> "$cmd_file" << EOF

---

## Internal Execution Handler

This command integrates with the Traceback engine installed at $TRACEBACK_DIR.

When Claude Code executes this command, it should:
1. Parse the arguments from \$ARGUMENTS
2. Call the Traceback engine with the appropriate parameters  
3. Format and display the results to the user

The Traceback engine handles all the complex analysis, solution generation, and implementation logic.
EOF
    fi
done

# Cleanup
echo -e "${BLUE}🧹 Cleaning up...${NC}"
rm -rf "$TEMP_DIR"

# Verify installation
echo -e "${BLUE}🧪 Verifying installation...${NC}"

# Check if commands were installed
CMD_COUNT=$(ls "$CLAUDE_COMMANDS_DIR"/traceback-*.md 2>/dev/null | wc -l)
if [ "$CMD_COUNT" -eq 0 ]; then
    echo -e "${RED}❌ Installation failed: No commands installed${NC}"
    exit 1
fi

# Check if engine is working
cd "$TRACEBACK_DIR"
if node -e "require('./dist/index.js'); console.log('OK')" >/dev/null 2>&1; then
    echo -e "${GREEN}✅ Traceback engine installed successfully${NC}"
else
    echo -e "${RED}❌ Traceback engine installation failed${NC}"
    exit 1
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo -e "${GREEN}✨ Traceback installed successfully!${NC}"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo -e "${BLUE}📚 Available Commands in Claude Code:${NC}"
echo ""
echo "  /traceback:analyze \"your issue description\""
echo "  /traceback:solutions"
echo "  /traceback:recommend" 
echo "  /traceback:implement solution-1"
echo "  /traceback:status"
echo "  /traceback:constraint \"requirement\" --type invariant"
echo ""
echo -e "${YELLOW}💡 Example usage:${NC}"
echo "  You: /traceback:analyze \"API endpoints are slow\""
echo "  [Traceback analyzes and shows root causes]"
echo ""
echo "  You: /traceback:solutions"
echo "  [Shows rated solution alternatives]" 
echo ""
echo "  You: /traceback:recommend"
echo "  [Gets top recommendation]"
echo ""
echo "  Claude: I'll implement the query optimization solution..."
echo ""
echo -e "${GREEN}🎯 Installation location: $TRACEBACK_DIR${NC}"
echo -e "${GREEN}📁 Commands location: $CLAUDE_COMMANDS_DIR${NC}"
echo ""
echo -e "${BLUE}🔄 Ready to use! No terminal restart required.${NC}"
echo ""

exit 0