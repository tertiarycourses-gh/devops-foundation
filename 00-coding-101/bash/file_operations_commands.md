# File Operations Commands

## Overview

File operations commands allow you to create, copy, move, rename, and delete files and directories. These are essential for managing your file system and organizing your work.

## Essential File Operations Commands

### 1. `touch` - Create Empty Files

**What it does**: Creates empty files or updates file timestamps.

**Syntax**: `touch [options] file...`

**Common options**:

- `-a` - Change access time only
- `-m` - Change modification time only
- `-c` - Don't create file if it doesn't exist
- `-t` - Use specified timestamp

**Examples**:

```bash
# Create a single empty file
touch file1.txt

# Create multiple files
touch file1.txt file2.txt file3.txt

# Create file with spaces (use quotes)
touch "my file.txt"

# Update timestamp without creating file
touch -c existing_file.txt

# Create file with specific timestamp
touch -t 202312011200 file.txt  # Dec 1, 2023 12:00
```

**Use cases**:

- Create placeholder files
- Update file timestamps
- Create multiple files quickly
- Trigger rebuilds in build systems

### 2. `mkdir` - Create Directories

**What it does**: Creates new directories.

**Syntax**: `mkdir [options] directory...`

**Common options**:

- `-p` - Create parent directories if needed
- `-m` - Set file permissions
- `-v` - Verbose output

**Examples**:

```bash
# Create a single directory
mkdir my_directory

# Create multiple directories
mkdir dir1 dir2 dir3

# Create nested directories
mkdir -p parent/child/grandchild

# Create directory with specific permissions
mkdir -m 755 secure_directory

# Create directory with verbose output
mkdir -v new_project
# Output: mkdir: created directory 'new_project'

# Create directory with spaces
mkdir "My Project"
mkdir My\ Project
```

**Use cases**:

- Organize projects into directories
- Create backup directories
- Set up development environments
- Organize downloads and documents

### 3. `cp` - Copy Files and Directories

**What it does**: Copies files and directories from source to destination.

**Syntax**: `cp [options] source... destination`

**Common options**:

- `-r` or `-R` - Recursive (for directories)
- `-i` - Interactive (prompt before overwrite)
- `-v` - Verbose output
- `-p` - Preserve permissions and timestamps
- `-f` - Force (don't prompt, overwrite)
- `-n` - Don't overwrite existing files

**Examples**:

```bash
# Copy a single file
cp file1.txt file1_backup.txt

# Copy file to directory
cp file1.txt /home/user/documents/

# Copy multiple files to directory
cp file1.txt file2.txt file3.txt /home/user/documents/

# Copy directory recursively
cp -r source_directory/ destination_directory/

# Interactive copy (prompt before overwrite)
cp -i file1.txt existing_file.txt

# Verbose copy (show what's being copied)
cp -v file1.txt file1_backup.txt
# Output: 'file1.txt' -> 'file1_backup.txt'

# Preserve permissions and timestamps
cp -p original.txt backup.txt

# Copy with wildcards
cp *.txt /backup/
cp file*.txt /backup/

# Copy hidden files
cp -r .* /backup/
```

**Use cases**:

- Create backups of important files
- Duplicate configuration files
- Copy project files to different locations
- Archive files before modifications

### 4. `mv` - Move/Rename Files and Directories

**What it does**: Moves or renames files and directories.

**Syntax**: `mv [options] source... destination`

**Common options**:

- `-i` - Interactive (prompt before overwrite)
- `-v` - Verbose output
- `-f` - Force (don't prompt, overwrite)
- `-n` - Don't overwrite existing files
- `-b` - Make backup of existing file

**Examples**:

```bash
# Rename a file
mv old_name.txt new_name.txt

# Move file to different directory
mv file.txt /home/user/documents/

# Move and rename
mv file.txt /home/user/documents/new_name.txt

# Move multiple files to directory
mv file1.txt file2.txt file3.txt /home/user/documents/

# Move directory
mv old_directory/ new_directory/

# Interactive move (prompt before overwrite)
mv -i file1.txt existing_file.txt

# Verbose move (show what's being moved)
mv -v file1.txt file1_renamed.txt
# Output: 'file1.txt' -> 'file1_renamed.txt'

# Make backup of existing file
mv -b file1.txt existing_file.txt
# Creates existing_file.txt~

# Move with wildcards
mv *.txt /archive/
mv file*.txt /archive/
```

**Use cases**:

- Rename files and directories
- Organize files by moving them to appropriate directories
- Archive old files
- Restructure project directories

### 5. `rm` - Remove Files and Directories

**What it does**: Removes files and directories.

**Syntax**: `rm [options] file...`

**Common options**:

- `-r` or `-R` - Recursive (for directories)
- `-i` - Interactive (prompt before removal)
- `-v` - Verbose output
- `-f` - Force (don't prompt, ignore errors)
- `-d` - Remove empty directories

**Examples**:

```bash
# Remove a single file
rm file1.txt

# Remove multiple files
rm file1.txt file2.txt file3.txt

# Remove directory and contents
rm -r directory_name/

# Interactive removal (prompt before each file)
rm -i file1.txt file2.txt

# Verbose removal (show what's being removed)
rm -v file1.txt
# Output: removed 'file1.txt'

# Force removal (no prompts)
rm -f file1.txt

# Remove empty directories
rm -d empty_directory/

# Remove with wildcards
rm *.tmp
rm file*.txt

# Remove hidden files
rm .hidden_file
rm -r .hidden_directory/
```

**⚠️ Safety Tips**:

```bash
# DANGEROUS - removes everything!
rm -rf /

# Safer alternatives
rm -i file.txt                    # Interactive mode
rm --preserve-root -rf /          # Preserve root
trash file.txt                    # Use trash instead
```

**Use cases**:

- Clean up temporary files
- Remove old backups
- Delete unwanted files
- Clean up disk space

### 6. `cat` - Concatenate and Display Files

**What it does**: Displays file contents, concatenates files, or creates files.

**Syntax**: `cat [options] [file...]`

**Common options**:

- `-n` - Number all output lines
- `-b` - Number non-blank lines
- `-s` - Squeeze multiple blank lines
- `-A` - Show non-printing characters
- `-T` - Show tabs as ^I

**Examples**:

```bash
# Display file contents
cat file.txt

# Display multiple files
cat file1.txt file2.txt file3.txt

# Number all lines
cat -n file.txt

# Number non-blank lines
cat -b file.txt

# Create file with content
cat > new_file.txt << EOF
This is line 1
This is line 2
This is line 3
EOF

# Append to file
cat >> existing_file.txt << EOF
Additional line 1
Additional line 2
EOF

# Display with non-printing characters
cat -A file.txt

# Concatenate files into new file
cat file1.txt file2.txt > combined.txt

# Display file with line numbers
cat -n /etc/passwd | head -10
```

**Use cases**:

- View file contents quickly
- Combine multiple files
- Create simple text files
- Check configuration files

## Advanced File Operations

### 7. `ln` - Create Links

**What it does**: Creates hard links or symbolic links between files.

**Syntax**: `ln [options] target link_name`

**Common options**:

- `-s` - Create symbolic link
- `-i` - Interactive (prompt before overwrite)
- `-v` - Verbose output
- `-f` - Force (remove existing link)

**Examples**:

```bash
# Create hard link
ln file1.txt file1_link.txt

# Create symbolic link
ln -s file1.txt file1_symlink.txt

# Create symbolic link to directory
ln -s /path/to/directory link_name

# Create absolute symbolic link
ln -s /absolute/path/to/file link_name

# Create relative symbolic link
ln -s ../relative/path/to/file link_name

# Interactive link creation
ln -i file1.txt existing_link.txt

# Verbose link creation
ln -v file1.txt file1_link.txt
# Output: 'file1.txt' -> 'file1_link.txt'
```

**Hard vs Symbolic Links**:

- **Hard links**: Point to the same inode, share the same data
- **Symbolic links**: Point to the path of another file

### 8. `chmod` - Change File Permissions

**What it does**: Changes file permissions and modes.

**Syntax**: `chmod [options] mode file...`

**Examples**:

```bash
# Make file executable
chmod +x script.sh

# Remove write permission
chmod -w file.txt

# Set specific permissions (octal)
chmod 755 script.sh
chmod 644 file.txt

# Set permissions recursively
chmod -R 755 directory/

# Add execute permission for owner
chmod u+x script.sh

# Remove read permission for others
chmod o-r file.txt

# Set read/write for owner, read for group and others
chmod 644 file.txt
```

**Permission Numbers**:

- `4` - Read (r)
- `2` - Write (w)
- `1` - Execute (x)
- `0` - No permissions

**Examples**:

- `755` = rwxr-xr-x (owner: rwx, group: r-x, others: r-x)
- `644` = rw-r--r-- (owner: rw-, group: r--, others: r--)

### 9. `chown` - Change File Owner

**What it does**: Changes file owner and group.

**Syntax**: `chown [options] owner[:group] file...`

**Examples**:

```bash
# Change owner
chown newuser file.txt

# Change owner and group
chown newuser:newgroup file.txt

# Change group only
chown :newgroup file.txt

# Change recursively
chown -R newuser:newgroup directory/

# Change owner to current user
chown $USER file.txt
```

## Practical Examples

### Example 1: Project Setup

```bash
# Create project structure
mkdir -p my_project/{src,docs,tests,backup}

# Create initial files
touch my_project/src/main.py
touch my_project/src/config.py
touch my_project/README.md

# Copy template files
cp template.py my_project/src/template.py

# Make scripts executable
chmod +x my_project/run.sh

# Create symbolic link for easy access
ln -s my_project ~/current_project
```

### Example 2: Backup Strategy

```bash
# Create backup directory
mkdir -p ~/backups/$(date +%Y%m%d)

# Copy important files
cp -r ~/documents ~/backups/$(date +%Y%m%d)/

# Create compressed backup
tar -czf ~/backups/$(date +%Y%m%d).tar.gz ~/documents

# Remove old backups (older than 30 days)
find ~/backups -name "*.tar.gz" -mtime +30 -delete
```

### Example 3: File Organization

```bash
# Create organized directory structure
mkdir -p ~/organized/{images,documents,music,videos}

# Move files by extension
mv ~/Downloads/*.jpg ~/organized/images/
mv ~/Downloads/*.pdf ~/organized/documents/
mv ~/Downloads/*.mp3 ~/organized/music/
mv ~/Downloads/*.mp4 ~/organized/videos/

# Create symbolic links for quick access
ln -s ~/organized ~/quick_access
```

## Safety Best Practices

### 1. Always Use Interactive Mode for Dangerous Operations

```bash
# Safer file removal
rm -i file.txt

# Safer directory removal
rm -ri directory/

# Safer copying (prompt before overwrite)
cp -i source.txt destination.txt
```

### 2. Use Trash Instead of rm When Possible

```bash
# Install trash-cli
sudo apt install trash-cli  # Ubuntu/Debian
brew install trash          # macOS

# Use trash instead of rm
trash file.txt              # Moves to trash instead of deleting
trash-restore               # Restore files from trash
```

### 3. Backup Before Major Changes

```bash
# Create backup before modifications
cp important_file.txt important_file.txt.backup

# Use version control
git add .
git commit -m "Backup before changes"
```

### 4. Test Commands First

```bash
# Use --dry-run when available
rsync -n source/ destination/  # See what would be copied

# Use echo to preview commands
echo rm -i *.tmp              # See what command would be executed
```

## Common Mistakes

### 1. Forgetting -r for Directories

```bash
# Wrong - won't work for directories
cp directory/ destination/
rm directory/

# Correct
cp -r directory/ destination/
rm -r directory/
```

### 2. Using rm -rf Without Care

```bash
# DANGEROUS
rm -rf /home/user/  # Could delete everything

# Safer
rm -ri /home/user/  # Interactive mode
```

### 3. Not Checking File Existence

```bash
# Check if file exists before operations
if [ -f file.txt ]; then
    cp file.txt backup.txt
else
    echo "File not found"
fi
```

## Practice Exercises

1. **Basic File Operations**:

   ```bash
   # Create test directory
   mkdir file_ops_practice
   cd file_ops_practice

   # Create test files
   touch file1.txt file2.txt file3.txt

   # Create subdirectory
   mkdir subdir

   # Copy files to subdirectory
   cp file*.txt subdir/

   # Rename files
   mv file1.txt renamed_file.txt

   # List contents
   ls -la
   ls -la subdir/

   # Clean up
   cd ..
   rm -rf file_ops_practice
   ```

2. **File Organization**:

   ```bash
   # Create organized structure
   mkdir -p organized/{text,images,archives}

   # Create sample files
   touch organized/text/{doc1.txt,doc2.txt}
   touch organized/images/{img1.jpg,img2.png}
   touch organized/archives/{archive1.zip,archive2.tar}

   # Create symbolic links
   ln -s organized ~/quick_access

   # Verify structure
   tree organized/
   ls -la ~/quick_access
   ```

3. **Backup Practice**:

   ```bash
   # Create test files
   mkdir backup_test
   cd backup_test
   echo "Important data" > important.txt
   echo "Configuration" > config.txt

   # Create backup
   mkdir backup
   cp *.txt backup/

   # Modify original
   echo "Modified data" > important.txt

   # Compare
   diff important.txt backup/important.txt

   # Restore from backup
   cp backup/important.txt important.txt
   ```

---

**Next**: Learn about [File Viewing and Editing Commands](file_viewing_commands.md) to read and modify file contents.
