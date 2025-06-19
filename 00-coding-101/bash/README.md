# Bash Commands Fundamentals

## Overview

Bash (Bourne Again Shell) is a command-line interface and scripting language that's essential for DevOps, system administration, and development. This guide covers the most commonly used bash commands with practical examples.

## Why Learn Bash?

- **System Administration**: Essential for managing servers and systems
- **DevOps Automation**: Scripting repetitive tasks and deployments
- **Development**: Running build tools, package managers, and development servers
- **Troubleshooting**: Diagnosing and fixing system issues
- **File Management**: Efficiently organizing and manipulating files

## Learning Path

### Step 1: Navigation Commands

- `pwd` - Print working directory
- `cd` - Change directory
- `ls` - List files and directories
- `ll` - Long listing format

### Step 2: File Operations

- `cat` - Concatenate and display files
- `touch` - Create empty files
- `mkdir` - Create directories
- `cp` - Copy files and directories
- `mv` - Move/rename files and directories
- `rm` - Remove files and directories

### Step 3: File Viewing and Editing

- `head` - Display beginning of files
- `tail` - Display end of files
- `less` - View files page by page
- `nano` - Simple text editor
- `vim` - Advanced text editor

### Step 4: System Information

- `whoami` - Show current user
- `uname` - System information
- `df` - Disk space usage
- `du` - Directory space usage
- `ps` - Process status
- `top` - System monitoring

### Step 5: Text Processing

- `grep` - Search for patterns
- `sed` - Stream editor
- `awk` - Text processing
- `sort` - Sort lines
- `uniq` - Remove duplicates
- `wc` - Word count

### Step 6: Network and Connectivity

- `ping` - Test network connectivity
- `curl` - Transfer data from/to servers
- `wget` - Download files
- `ssh` - Secure shell connection
- `scp` - Secure copy

## Getting Started

### 1. Open Terminal

**macOS/Linux:**

- Press `Ctrl + Alt + T` (Linux)
- Open Terminal app (macOS)
- Or press `F12` and type `terminal`

**Windows:**

- Open Command Prompt or PowerShell
- Or install WSL (Windows Subsystem for Linux)

### 2. Basic Commands Practice

Start with these essential commands:

```bash
# See where you are
pwd

# List files in current directory
ls

# Change to home directory
cd ~

# List files with details
ls -la
```

### 3. Command Structure

Most bash commands follow this pattern:

```bash
command [options] [arguments]
```

Examples:

```bash
ls -la /home/user    # command + options + argument
cp file1 file2       # command + arguments
mkdir -p dir1/dir2   # command + option + argument
```

## Command Categories

### Navigation Commands

Commands for moving around the file system and understanding your location.

### File Management Commands

Commands for creating, copying, moving, and deleting files and directories.

### Text Processing Commands

Commands for viewing, searching, and manipulating text content.

### System Commands

Commands for getting information about the system and processes.

### Network Commands

Commands for network connectivity and data transfer.

## Best Practices

### 1. Use Tab Completion

Press `Tab` to auto-complete file and directory names:

```bash
cd /ho[TAB]          # Completes to /home/
ls /usr/bin/py[TAB]  # Completes to python
```

### 2. Use Command History

- Press `↑` to see previous commands
- Press `↓` to see next commands
- Use `history` to see all commands
- Use `Ctrl + R` to search command history

### 3. Use Wildcards

```bash
ls *.txt             # All .txt files
ls file*             # All files starting with "file"
ls [abc]*            # Files starting with a, b, or c
```

### 4. Use Pipes and Redirection

```bash
ls | grep .txt       # Pipe output to grep
cat file.txt > output.txt  # Redirect output to file
cat file.txt >> output.txt # Append to file
```

## Common Patterns

### 1. Finding Files

```bash
find . -name "*.txt"           # Find all .txt files
find . -type f -name "file*"   # Find files starting with "file"
find . -size +1M               # Find files larger than 1MB
```

### 2. Searching Content

```bash
grep "pattern" file.txt        # Search for pattern in file
grep -r "pattern" directory/   # Search recursively
grep -i "pattern" file.txt     # Case-insensitive search
```

### 3. Process Management

```bash
ps aux | grep process_name     # Find running processes
kill -9 process_id            # Force kill process
top                           # Monitor system resources
```

## Safety Tips

### 1. Be Careful with rm

```bash
# Dangerous - removes everything!
rm -rf /

# Safer - use -i for interactive mode
rm -i file.txt

# Use trash instead of rm when possible
trash file.txt
```

### 2. Backup Important Files

```bash
# Always backup before major changes
cp important_file.txt important_file.txt.backup
```

### 3. Test Commands First

```bash
# Use --dry-run or -n when available
rsync -n source/ destination/  # See what would be copied
```

## Next Steps

After mastering these commands:

1. **Learn Shell Scripting**: Create automated scripts
2. **Explore Advanced Tools**: sed, awk, find
3. **Practice with Real Projects**: Use commands in daily tasks
4. **Learn Package Managers**: apt, yum, brew
5. **Study System Administration**: User management, services

## Additional Resources

- [Bash Reference Manual](https://www.gnu.org/software/bash/manual/)
- [Advanced Bash-Scripting Guide](https://tldp.org/LDP/abs/html/)
- [Bash Cheat Sheet](https://devhints.io/bash)
- [Linux Command Library](https://linuxcommandlibrary.com/)

## Practice Exercises

1. **File Organization**: Create a directory structure and organize files
2. **Text Processing**: Search and replace text in files
3. **System Monitoring**: Check system resources and processes
4. **Automation**: Create simple scripts for repetitive tasks

---

**Ready to master the command line? Start with the navigation commands and work your way up! 🐧**

_Remember: The command line is your friend. The more you use it, the more powerful you become._
