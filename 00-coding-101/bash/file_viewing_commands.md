# File Viewing and Editing Commands

## Overview

File viewing and editing commands allow you to read, search, and modify file contents. These commands are essential for working with text files, configuration files, and logs.

## Essential File Viewing Commands

### 1. `head` - Display Beginning of Files

**What it does**: Shows the first few lines of a file.

**Syntax**: `head [options] [file...]`

**Common options**:

- `-n` - Number of lines to display
- `-c` - Number of bytes to display
- `-q` - Never print headers
- `-v` - Always print headers

**Examples**:

```bash
# Show first 10 lines (default)
head file.txt

# Show first 5 lines
head -n 5 file.txt
head -5 file.txt

# Show first 100 bytes
head -c 100 file.txt

# Show first lines of multiple files
head file1.txt file2.txt file3.txt

# Show first 20 lines with line numbers
head -n 20 file.txt | nl

# Show first lines of all .txt files
head *.txt

# Show first 5 lines without filename header
head -q -n 5 file.txt
```

**Use cases**:

- Preview file contents
- Check file headers
- View beginning of log files
- Quick file inspection

### 2. `tail` - Display End of Files

**What it does**: Shows the last few lines of a file.

**Syntax**: `tail [options] [file...]`

**Common options**:

- `-n` - Number of lines to display
- `-c` - Number of bytes to display
- `-f` - Follow (watch for changes)
- `-F` - Follow with retry
- `-q` - Never print headers
- `-v` - Always print headers

**Examples**:

```bash
# Show last 10 lines (default)
tail file.txt

# Show last 5 lines
tail -n 5 file.txt
tail -5 file.txt

# Show last 100 bytes
tail -c 100 file.txt

# Follow file changes (watch log files)
tail -f logfile.txt

# Follow with retry (if file is recreated)
tail -F logfile.txt

# Show last lines of multiple files
tail file1.txt file2.txt file3.txt

# Show last 20 lines with line numbers
tail -n 20 file.txt | nl

# Show last lines of all .log files
tail *.log

# Show last 5 lines without filename header
tail -q -n 5 file.txt
```

**Use cases**:

- View end of log files
- Monitor real-time log updates
- Check recent file changes
- View file endings

### 3. `less` - View Files Page by Page

**What it does**: Displays file contents one page at a time with navigation.

**Syntax**: `less [options] [file...]`

**Common options**:

- `-N` - Show line numbers
- `-S` - Chop long lines
- `-F` - Exit if file fits on one screen
- `-R` - Display raw control characters
- `-X` - Don't clear screen on exit

**Navigation in less**:

- `Space` - Next page
- `b` - Previous page
- `Enter` - Next line
- `k` - Previous line
- `g` - Go to beginning
- `G` - Go to end
- `/pattern` - Search forward
- `?pattern` - Search backward
- `n` - Next search result
- `N` - Previous search result
- `q` - Quit

**Examples**:

```bash
# View file with line numbers
less -N file.txt

# View file without line wrapping
less -S long_file.txt

# View multiple files
less file1.txt file2.txt

# Search for pattern in file
less file.txt
# Then type: /search_pattern

# View file and exit if it fits on screen
less -F short_file.txt

# View file with raw control characters
less -R binary_file.txt
```

**Use cases**:

- Read large files efficiently
- Search through file contents
- Navigate through documentation
- View log files

### 4. `more` - View Files Page by Page (Legacy)

**What it does**: Displays file contents one page at a time (older version of less).

**Syntax**: `more [options] [file...]`

**Navigation in more**:

- `Space` - Next page
- `Enter` - Next line
- `b` - Previous page
- `q` - Quit
- `/pattern` - Search forward

**Examples**:

```bash
# View file
more file.txt

# View with line numbers
more -n file.txt

# View multiple files
more file1.txt file2.txt
```

**Note**: `less` is generally preferred over `more` as it's more feature-rich.

### 5. `nano` - Simple Text Editor

**What it does**: Simple, user-friendly text editor for quick edits.

**Syntax**: `nano [options] [file...]`

**Common options**:

- `-w` - Don't wrap long lines
- `-c` - Show cursor position
- `-l` - Don't add newline at end
- `-T` - Set tab size

**Basic nano commands**:

- `Ctrl + O` - Save file
- `Ctrl + X` - Exit
- `Ctrl + W` - Search
- `Ctrl + G` - Help
- `Ctrl + K` - Cut line
- `Ctrl + U` - Paste
- `Ctrl + A` - Go to beginning of line
- `Ctrl + E` - Go to end of line

**Examples**:

```bash
# Edit existing file
nano file.txt

# Create new file
nano new_file.txt

# Edit with line wrapping disabled
nano -w long_file.txt

# Edit with cursor position display
nano -c file.txt

# Edit multiple files
nano file1.txt file2.txt
```

**Use cases**:

- Quick text file edits
- Simple configuration changes
- Creating small scripts
- Beginner-friendly editing

### 6. `vim` - Advanced Text Editor

**What it does**: Powerful, feature-rich text editor with multiple modes.

**Syntax**: `vim [options] [file...]`

**Vim modes**:

- **Normal mode** - Navigation and commands
- **Insert mode** - Text editing
- **Visual mode** - Text selection
- **Command mode** - Execute commands

**Basic vim commands**:

**Navigation (Normal mode)**:

- `h, j, k, l` - Move cursor (left, down, up, right)
- `w` - Next word
- `b` - Previous word
- `0` - Beginning of line
- `$` - End of line
- `gg` - Beginning of file
- `G` - End of file
- `Ctrl + f` - Page down
- `Ctrl + b` - Page up

**Editing**:

- `i` - Enter insert mode
- `a` - Append after cursor
- `o` - New line below
- `O` - New line above
- `dd` - Delete line
- `yy` - Copy line
- `p` - Paste
- `u` - Undo
- `Ctrl + r` - Redo

**Search and replace**:

- `/pattern` - Search forward
- `?pattern` - Search backward
- `n` - Next search result
- `N` - Previous search result
- `:%s/old/new/g` - Replace all occurrences
- `:%s/old/new/gc` - Replace with confirmation

**File operations**:

- `:w` - Save file
- `:q` - Quit
- `:wq` - Save and quit
- `:q!` - Quit without saving
- `:x` - Save and quit (if modified)

**Examples**:

```bash
# Edit file
vim file.txt

# Edit file and go to specific line
vim +10 file.txt

# Edit file and search for pattern
vim +/pattern file.txt

# Edit multiple files
vim file1.txt file2.txt

# Edit file in read-only mode
vim -R file.txt
```

**Use cases**:

- Advanced text editing
- Programming
- System administration
- Large file editing

## Advanced File Viewing

### 7. `grep` - Search for Patterns

**What it does**: Searches for patterns in files or text.

**Syntax**: `grep [options] pattern [file...]`

**Common options**:

- `-i` - Case-insensitive search
- `-v` - Invert match (show non-matching lines)
- `-r` or `-R` - Recursive search
- `-n` - Show line numbers
- `-l` - Show only filenames
- `-c` - Show only count
- `-A` - Show lines after match
- `-B` - Show lines before match
- `-C` - Show context lines

**Examples**:

```bash
# Basic search
grep "pattern" file.txt

# Case-insensitive search
grep -i "pattern" file.txt

# Show line numbers
grep -n "pattern" file.txt

# Show only filenames containing pattern
grep -l "pattern" *.txt

# Show count of matches
grep -c "pattern" file.txt

# Recursive search
grep -r "pattern" directory/

# Show 3 lines after match
grep -A 3 "pattern" file.txt

# Show 2 lines before and after match
grep -C 2 "pattern" file.txt

# Invert match (show non-matching lines)
grep -v "pattern" file.txt

# Search with regular expressions
grep "^[A-Z]" file.txt  # Lines starting with uppercase
grep "[0-9]$" file.txt  # Lines ending with digit

# Search in multiple files
grep "pattern" file1.txt file2.txt file3.txt

# Search in all .txt files
grep "pattern" *.txt
```

**Use cases**:

- Search through log files
- Find specific text in files
- Filter command output
- Debug configuration issues

### 8. `sed` - Stream Editor

**What it does**: Performs text transformations on input streams.

**Syntax**: `sed [options] 'script' [file...]`

**Common options**:

- `-i` - Edit files in place
- `-n` - Suppress automatic printing
- `-e` - Add script to commands
- `-f` - Read script from file

**Examples**:

```bash
# Replace first occurrence per line
sed 's/old/new/' file.txt

# Replace all occurrences
sed 's/old/new/g' file.txt

# Replace with case-insensitive
sed 's/old/new/gi' file.txt

# Edit file in place
sed -i 's/old/new/g' file.txt

# Delete lines containing pattern
sed '/pattern/d' file.txt

# Print only lines 5-10
sed -n '5,10p' file.txt

# Add line numbers
sed '=' file.txt | sed 'N;s/\n/ /'

# Remove empty lines
sed '/^$/d' file.txt

# Replace tabs with spaces
sed 's/\t/    /g' file.txt

# Multiple substitutions
sed -e 's/old1/new1/g' -e 's/old2/new2/g' file.txt
```

**Use cases**:

- Text replacement
- Line filtering
- Format conversion
- Batch file editing

### 9. `awk` - Text Processing

**What it does**: Powerful text processing and pattern scanning.

**Syntax**: `awk [options] 'program' [file...]`

**Examples**:

```bash
# Print first field of each line
awk '{print $1}' file.txt

# Print lines with more than 3 fields
awk 'NF > 3' file.txt

# Print lines where first field matches pattern
awk '$1 ~ /pattern/' file.txt

# Print sum of second field
awk '{sum += $2} END {print sum}' file.txt

# Print formatted output
awk '{printf "%-20s %s\n", $1, $2}' file.txt

# Print lines with specific condition
awk '$3 > 100' file.txt

# Print unique values in first field
awk '{print $1}' file.txt | sort | uniq

# Print lines between patterns
awk '/start/,/end/' file.txt
```

**Use cases**:

- Data processing
- Report generation
- Log analysis
- Text formatting

## Practical Examples

### Example 1: Log File Analysis

```bash
# View recent log entries
tail -n 50 /var/log/syslog

# Search for error messages
grep -i "error" /var/log/syslog

# Search for specific date
grep "2023-12-01" /var/log/syslog

# Monitor log file in real-time
tail -f /var/log/syslog

# Count error messages
grep -c "error" /var/log/syslog

# Show lines around error messages
grep -C 2 "error" /var/log/syslog
```

### Example 2: Configuration File Editing

```bash
# View configuration file
less /etc/nginx/nginx.conf

# Search for specific setting
grep -n "server_name" /etc/nginx/nginx.conf

# Edit configuration file
sudo nano /etc/nginx/nginx.conf

# Backup before editing
sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.backup

# Replace setting in configuration
sudo sed -i 's/old_value/new_value/g' /etc/nginx/nginx.conf
```

### Example 3: Text Processing Pipeline

```bash
# Process log file to extract unique IP addresses
grep "access" logfile.txt | awk '{print $1}' | sort | uniq

# Count word frequency in file
cat file.txt | tr ' ' '\n' | sort | uniq -c | sort -nr

# Extract email addresses from file
grep -o '[A-Za-z0-9._%+-]\+@[A-Za-z0-9.-]\+\.[A-Za-z]\{2,\}' file.txt

# Find duplicate lines
sort file.txt | uniq -d

# Remove duplicate lines
sort file.txt | uniq > unique_file.txt
```

## Tips and Tricks

### 1. Combining Commands

```bash
# View file with line numbers and search
cat -n file.txt | grep "pattern"

# View last 20 lines of log file
tail -n 20 logfile.txt | less

# Search in multiple files and show context
grep -r -C 2 "pattern" directory/ | less
```

### 2. Using Pipes Effectively

```bash
# Process command output
ls -la | grep "^-" | awk '{print $9}' | head -10

# Monitor system processes
ps aux | grep "process_name" | tail -f

# Find large files
find . -type f -size +1M | head -10
```

### 3. File Comparison

```bash
# Compare two files
diff file1.txt file2.txt

# Show only differences
diff -u file1.txt file2.txt

# Compare files side by side
diff -y file1.txt file2.txt
```

## Common Mistakes

### 1. Not Using Quotes for Patterns

```bash
# Wrong - may not work with special characters
grep pattern file.txt

# Correct
grep "pattern" file.txt
```

### 2. Forgetting to Save in Editors

```bash
# In nano: Ctrl + O, then Enter
# In vim: :w
```

### 3. Not Checking File Permissions

```bash
# Check if you can read/write file
ls -l file.txt

# Use sudo if needed
sudo nano /etc/config/file.conf
```

## Practice Exercises

1. **Basic File Viewing**:

   ```bash
   # Create test file
   echo -e "Line 1\nLine 2\nLine 3\nLine 4\nLine 5" > test.txt

   # View first 3 lines
   head -n 3 test.txt

   # View last 2 lines
   tail -n 2 test.txt

   # View with line numbers
   cat -n test.txt

   # Search for "Line"
   grep "Line" test.txt
   ```

2. **Log Analysis**:

   ```bash
   # Create sample log file
   echo -e "2023-12-01 10:00:01 INFO: System started\n2023-12-01 10:01:15 ERROR: Connection failed\n2023-12-01 10:02:30 INFO: Connection restored" > sample.log

   # View log entries
   cat sample.log

   # Search for errors
   grep "ERROR" sample.log

   # Show timestamps only
   awk '{print $1, $2}' sample.log
   ```

3. **Text Processing**:

   ```bash
   # Create data file
   echo -e "Alice 25 Engineer\nBob 30 Manager\nCharlie 35 Developer" > data.txt

   # View data
   cat data.txt

   # Extract names only
   awk '{print $1}' data.txt

   # Find people over 30
   awk '$2 > 30' data.txt

   # Replace "Engineer" with "Software Engineer"
   sed 's/Engineer/Software Engineer/g' data.txt
   ```

---

**Next**: Learn about [System Information Commands](system_commands.md) to get information about your system and processes.
