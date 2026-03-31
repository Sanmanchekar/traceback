# 📦 Installing Traceback

## One-Line Installation

Install Traceback with a single command:

### Recommended: Standard Installation (No sudo required)
```bash
curl -sSL https://raw.githubusercontent.com/Sanmanchekar/traceback/main/install.sh | bash
```

### Alternative: Using wget:
```bash
wget -qO- https://raw.githubusercontent.com/Sanmanchekar/traceback/main/install.sh | bash
```

### Legacy Installation (Binary approach)
```bash
curl -sSL https://raw.githubusercontent.com/Sanmanchekar/traceback/main/install-local.sh | bash
```

## What This Does

The installation script will:
1. ✅ Clone Traceback from GitHub
2. ✅ Install to `~/.traceback`
3. ✅ Build the TypeScript project
4. ✅ Create Claude Code commands
5. ✅ Configure for Claude Code integration
6. ✅ Verify installation

## After Installation

You can immediately use Traceback in Claude Code:

```bash
/traceback:analyze "your issue"
/traceback:solutions
/traceback:recommend
/traceback:implement solution-1
```

## Alternative Installation Methods

### Method 1: Clone and Install (Developer)
```bash
git clone https://github.com/Sanmanchekar/traceback.git
cd traceback
./install.sh
```

### Method 2: NPM Global Install (Coming Soon)
```bash
npm install -g @sanmanchekar/traceback
```

## System Requirements

- Node.js 16+ 
- npm or yarn
- git
- Unix-like system (macOS, Linux)

## Installation Locations

- **Traceback files**: `~/.traceback/`
- **Global command**: `/usr/local/bin/traceback`
- **Claude config**: `~/.claude/traceback.json`

## Verify Installation

After installation, verify it works:

```bash
# Check if command exists
which traceback

# Test the command
traceback

# Test an analysis
traceback analyze "test issue"
```

## Updating Traceback

To update to the latest version:

```bash
# Re-run the installation command
curl -sSL https://raw.githubusercontent.com/Sanmanchekar/traceback/main/install-from-url.sh | bash
```

## Uninstalling

To remove Traceback:

```bash
# Remove installation
rm -rf ~/.traceback

# Remove global command
sudo rm /usr/local/bin/traceback

# Remove Claude config
rm ~/.claude/traceback.json
```

## Troubleshooting

### Command not found
```bash
# Add to PATH if needed
export PATH="/usr/local/bin:$PATH"
echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.zshrc
```

### Permission denied
```bash
# Run with sudo
curl -sSL https://raw.githubusercontent.com/Sanmanchekar/traceback/main/install-from-url.sh | sudo bash
```

### Node.js not found
```bash
# Install Node.js first
brew install node  # macOS
# or
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -  # Linux
sudo apt-get install -y nodejs
```

## Claude Code Integration

Once installed, Traceback integrates with Claude Code automatically. You can use commands like:

```
You: /traceback analyze "database queries are slow"
[Traceback analyzes and shows root causes]

You: /traceback solutions
[Shows rated solutions]

You: Please implement solution 1
Claude: I'll implement the query optimization solution...
```

## Support

- **Repository**: https://github.com/Sanmanchekar/traceback
- **Issues**: https://github.com/Sanmanchekar/traceback/issues

## Installation Details

| Aspect | Traceback |
|--------|-----------|
| Install Command | `curl ... \| bash` |
| Install Location | `~/.traceback` |
| Commands | `/traceback:*` |
| Claude Integration | Automatic |
| Update Method | Re-run install |

---

That's it! One command and you're ready to use Traceback in Claude Code! 🚀