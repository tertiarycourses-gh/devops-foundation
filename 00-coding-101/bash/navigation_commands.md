# Navigation Commands

## Overview

Navigation commands help you move around the file system and understand your current location. These are the most fundamental commands you'll use in bash.

## Essential Navigation Commands

### 1. `pwd` - Print Working Directory

**What it does**: Shows your current directory location.

**Syntax**: `pwd [options]`

**Common options**:

- `-L` - Show logical path (follows symlinks)
- `-P` - Show physical path (resolves symlinks)

**Examples**:

```bash
# Basic usage
pwd
# Output: /home/user/documents

# With logical path (follows symlinks)
pwd -L
# Output: /home/user/documents

# With physical path (resolves symlinks)
pwd -P
# Output: /home/user/actual/documents
```

**Use cases**:

- Check where you are before making changes
- Use in scripts to get current directory
- Verify you're in the right location

### 2. `cd` - Change Directory

**What it does**: Changes your current working directory.

**Syntax**: `cd [directory]`

**Common options**:

- No options (changes to home directory)
- `-` (changes to previous directory)
- `~` (changes to home directory)

**Examples**:

```bash
# Change to home directory
cd
cd ~
cd $HOME

# Change to specific directory
cd /home/user/documents
cd documents

# Change to parent directory
cd ..

# Change to previous directory
cd -

# Change to directory with spaces (use quotes)
cd "My Documents"
cd My\ Documents

# Change to absolute path
cd /usr/local/bin

# Change to relative path
cd ../sibling_directory
cd ./child_directory
```

**Special directories**:

```bash
cd ~        # Home directory
cd /        # Root directory
cd ..       # Parent directory
cd .        # Current directory (no change)
cd -        # Previous directory
```

**Use cases**:

- Navigate to project directories
- Move between different work areas
- Access system directories

### 3. `ls` - List Files and Directories

**What it does**: Lists files and directories in the current or specified directory.

**Syntax**: `ls [options] [directory]`

**Common options**:

- `-a` - Show all files (including hidden)
- `-l` - Long format (detailed listing)
- `-h` - Human-readable file sizes
- `-t` - Sort by modification time
- `-r` - Reverse sort order
- `-R` - Recursive (show subdirectories)
- `-F` - Add file type indicators

**Examples**:

```bash
# Basic listing
ls
# Output: file1.txt  file2.txt  directory1

# Long format
ls -l
# Output: -rw-r--r-- 1 user group 1024 Jan 1 12:00 file1.txt

# Show all files (including hidden)
ls -a
# Output: .  ..  .hidden  file1.txt  file2.txt

# Human-readable sizes
ls -lh
# Output: -rw-r--r-- 1 user group 1.0K Jan 1 12:00 file1.txt

# Sort by time (newest first)
ls -lt

# Reverse sort order
ls -lr

# Recursive listing
ls -R
# Output:
# .:
# file1.txt  directory1
#
# ./directory1:
# subfile1.txt

# Add file type indicators
ls -F
# Output: file1.txt  file2.txt  directory1/  script.sh*
```

**File type indicators**:

- `/` - Directory
- `*` - Executable file
- `@` - Symbolic link
- `|` - Named pipe
- `=` - Socket

**Use cases**:

- See what files are in a directory
- Check file permissions and ownership
- Find recently modified files
- Explore directory structure

### 4. `ll` - Long Listing (Alias)

**What it does**: Alias for `ls -la` (long listing with all files).

**Syntax**: `ll [directory]`

**Note**: This is typically an alias, not a standalone command.

**Examples**:

```bash
# Long listing with all files
ll
# Output:
# drwxr-xr-x  2 user group 4096 Jan 1 12:00 .
# drwxr-xr-x  3 user group 4096 Jan 1 12:00 ..
# -rw-r--r--  1 user group 1024 Jan 1 12:00 file1.txt
# -rw-r--r--  1 user group 2048 Jan 1 12:00 file2.txt

# In specific directory
ll /home/user/documents
```

**Understanding the output**:

```
drwxr-xr-x  2 user group 4096 Jan 1 12:00 directory_name
││││││││││  │ │    │     │    │   │   │
││││││││││  │ │    │     │    │   │   └── File/Directory name
││││││││││  │ │    │     │    │   └────── Modification time
││││││││││  │ │    │     │    └────────── Modification date
││││││││││  │ │    │     └─────────────── File size in bytes
││││││││││  │ │    └────────────────────── Group name
││││││││││  │ └─────────────────────────── Owner name
││││││││││  └────────────────────────────── Number of hard links
│││││││││└────────────────────────────────── Others permissions
││││││││└─────────────────────────────────── Group permissions
│││││││└──────────────────────────────────── Owner permissions
││││││└───────────────────────────────────── File type (d=directory, -=file)
```

**Use cases**:

- Quick detailed view of directory contents
- Check file permissions and ownership
- See hidden files and directories

## Advanced Navigation

### 5. `pushd` and `popd` - Directory Stack

**What they do**: Manage a stack of directories for easy navigation.

**Examples**:

```bash
# Push current directory onto stack and change to new directory
pushd /home/user/documents
# Output: /home/user/documents /home/user

# Push another directory
pushd /var/log
# Output: /var/log /home/user/documents /home/user

# Pop the top directory off the stack and change to it
popd
# Output: /home/user/documents /home/user

# View directory stack
dirs -v
# Output:
# 0  /home/user/documents
# 1  /home/user
```

### 6. `tree` - Directory Tree

**What it does**: Shows directory structure in a tree format.

**Syntax**: `tree [options] [directory]`

**Examples**:

```bash
# Show directory tree
tree
# Output:
# .
# ├── file1.txt
# ├── file2.txt
# └── directory1
#     ├── subfile1.txt
#     └── subdirectory
#         └── subfile2.txt

# Limit depth
tree -L 2

# Show only directories
tree -d

# Show file sizes
tree -h
```

## Practical Examples

### Example 1: Project Navigation

```bash
# Start from home
cd ~

# Navigate to projects directory
cd projects

# List available projects
ls -la

# Enter a specific project
cd my-web-app

# Check current location
pwd
# Output: /home/user/projects/my-web-app

# List project files
ls -la
```

### Example 2: System Exploration

```bash
# Go to root directory
cd /

# List system directories
ls -la

# Navigate to important system directories
cd /etc
ls -la | head -10

cd /var/log
ls -la

# Return to home
cd ~
```

### Example 3: Working with Paths

```bash
# Current location
pwd
# Output: /home/user/documents/work

# Go to parent directory
cd ..
pwd
# Output: /home/user/documents

# Go to sibling directory
cd personal
pwd
# Output: /home/user/documents/personal

# Go back to work
cd ../work
pwd
# Output: /home/user/documents/work
```

## Tips and Tricks

### 1. Tab Completion

```bash
# Type part of a directory name and press Tab
cd /ho[TAB]          # Completes to /home/
cd /usr/bin/py[TAB]  # Completes to python
```

### 2. Using Variables

```bash
# Use environment variables
cd $HOME
cd $PWD

# Use previous command result
cd $(dirname /path/to/file)
```

### 3. Quick Navigation

```bash
# Go to home directory
cd ~
cd

# Go to previous directory
cd -

# Go to parent directory
cd ..
```

### 4. Working with Spaces

```bash
# Use quotes
cd "My Documents"

# Use backslash
cd My\ Documents

# Use tab completion (handles spaces automatically)
cd My[TAB]
```

## Common Mistakes

### 1. Forgetting Quotes

```bash
# Wrong - will fail with spaces
cd My Documents

# Correct
cd "My Documents"
cd My\ Documents
```

### 2. Case Sensitivity

```bash
# Wrong - Linux is case sensitive
cd Documents

# Correct - match exact case
cd documents
```

### 3. Relative vs Absolute Paths

```bash
# Relative path (from current directory)
cd documents

# Absolute path (from root)
cd /home/user/documents
```

## Practice Exercises

1. **Basic Navigation**:

   ```bash
   # Start from home directory
   cd ~

   # Create a test directory structure
   mkdir -p test_nav/{dir1,dir2,dir3}
   cd test_nav

   # Practice moving between directories
   cd dir1
   pwd
   cd ../dir2
   pwd
   cd ../dir3
   pwd
   cd ../..
   pwd
   ```

2. **File Exploration**:

   ```bash
   # Explore your home directory
   cd ~
   ls -la

   # Navigate to common directories
   cd Documents
   ls -la

   cd Downloads
   ls -la

   # Return to home
   cd ~
   ```

3. **System Navigation**:

   ```bash
   # Explore system directories
   cd /etc
   ls -la | head -10

   cd /var/log
   ls -la

   cd /usr/bin
   ls | grep python
   ```

---

**Next**: Learn about [File Operations Commands](file_operations_commands.md) to create, copy, move, and delete files.
