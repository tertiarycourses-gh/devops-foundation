# Text Processing Commands

## Overview

Text processing commands are powerful tools for manipulating, analyzing, and transforming text data. These commands are essential for data analysis, log processing, and automation tasks.

## Essential Text Processing Commands

### 1. `grep` - Search for Patterns

**What it does**: Searches for patterns in text files or input streams.

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
- `-E` - Extended regex
- `-F` - Fixed strings (no regex)

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

# Extended regex (supports +, ?, |, etc.)
grep -E "pattern1|pattern2" file.txt

# Fixed string search (no regex interpretation)
grep -F ".*pattern.*" file.txt
```

**Use cases**:

- Search through log files
- Find specific text in files
- Filter command output
- Debug configuration issues

### 2. `sed` - Stream Editor

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

# Replace only on lines matching pattern
sed '/pattern/s/old/new/g' file.txt

# Insert text before line 5
sed '5i\New line text' file.txt

# Append text after line 5
sed '5a\New line text' file.txt

# Delete lines 3-7
sed '3,7d' file.txt

# Print lines between patterns
sed -n '/start/,/end/p' file.txt
```

**Use cases**:

- Text replacement
- Line filtering
- Format conversion
- Batch file editing

### 3. `awk` - Text Processing

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

# Print field count for each line
awk '{print NF " fields: " $0}' file.txt

# Print lines with field count
awk 'NF == 3' file.txt

# Print average of second field
awk '{sum += $2; count++} END {print "Average: " sum/count}' file.txt

# Print lines with specific field value
awk '$2 == "value"' file.txt

# Print lines with field containing pattern
awk '$1 ~ /pattern/' file.txt

# Print custom separator
awk -F: '{print $1, $3}' /etc/passwd

# Print with custom output separator
awk 'BEGIN {OFS="\t"} {print $1, $2, $3}' file.txt
```

**Use cases**:

- Data processing
- Report generation
- Log analysis
- Text formatting

### 4. `sort` - Sort Lines

**What it does**: Sorts lines in text files.

**Syntax**: `sort [options] [file...]`

**Common options**:

- `-n` - Numeric sort
- `-r` - Reverse sort
- `-u` - Remove duplicates
- `-k` - Sort by specific field
- `-t` - Field separator
- `-f` - Case-insensitive
- `-h` - Human-readable numbers

**Examples**:

```bash
# Basic sort
sort file.txt

# Numeric sort
sort -n numbers.txt

# Reverse sort
sort -r file.txt

# Remove duplicates
sort -u file.txt

# Sort by second field
sort -k2 file.txt

# Sort by second field numerically
sort -k2n file.txt

# Sort by multiple fields
sort -k1,1 -k2,2n file.txt

# Sort with custom separator
sort -t: -k3n /etc/passwd

# Case-insensitive sort
sort -f file.txt

# Sort human-readable numbers
sort -h sizes.txt

# Sort and remove duplicates
sort -u file.txt

# Sort in reverse order
sort -r file.txt

# Sort by specific field in reverse
sort -k2nr file.txt
```

**Use cases**:

- Organizing data
- Removing duplicates
- Preparing data for analysis
- Creating sorted lists

### 5. `uniq` - Remove Duplicates

**What it does**: Removes or reports duplicate lines.

**Syntax**: `uniq [options] [input [output]]`

**Common options**:

- `-c` - Count occurrences
- `-d` - Show only duplicates
- `-u` - Show only unique lines
- `-i` - Case-insensitive
- `-f` - Skip first N fields
- `-s` - Skip first N characters

**Examples**:

```bash
# Remove consecutive duplicates
uniq file.txt

# Count occurrences
uniq -c file.txt

# Show only duplicate lines
uniq -d file.txt

# Show only unique lines
uniq -u file.txt

# Case-insensitive comparison
uniq -i file.txt

# Skip first field when comparing
uniq -f1 file.txt

# Skip first 5 characters when comparing
uniq -s5 file.txt

# Remove duplicates (requires sorted input)
sort file.txt | uniq

# Count unique values
sort file.txt | uniq -c

# Find duplicate lines
sort file.txt | uniq -d
```

**Use cases**:

- Removing duplicate entries
- Counting occurrences
- Data deduplication
- Finding unique values

### 6. `wc` - Word Count

**What it does**: Counts lines, words, and characters.

**Syntax**: `wc [options] [file...]`

**Common options**:

- `-l` - Count lines only
- `-w` - Count words only
- `-c` - Count bytes only
- `-m` - Count characters only
- `-L` - Show longest line length

**Examples**:

```bash
# Count lines, words, and characters
wc file.txt

# Count lines only
wc -l file.txt

# Count words only
wc -w file.txt

# Count characters only
wc -c file.txt

# Count multiple files
wc file1.txt file2.txt file3.txt

# Show longest line length
wc -L file.txt

# Count lines in all .txt files
wc -l *.txt

# Count total lines
wc -l *.txt | tail -1

# Count non-empty lines
grep -v '^$' file.txt | wc -l
```

**Use cases**:

- Document analysis
- Code metrics
- Data validation
- File size analysis

### 7. `cut` - Extract Sections

**What it does**: Extracts sections from lines of files.

**Syntax**: `cut [options] [file...]`

**Common options**:

- `-d` - Delimiter
- `-f` - Fields
- `-c` - Characters
- `-b` - Bytes

**Examples**:

```bash
# Extract first field (tab-delimited)
cut -f1 file.txt

# Extract first and third fields
cut -f1,3 file.txt

# Extract fields 1-3
cut -f1-3 file.txt

# Extract with custom delimiter
cut -d: -f1,3 /etc/passwd

# Extract characters 1-10
cut -c1-10 file.txt

# Extract characters 1, 3, 5
cut -c1,3,5 file.txt

# Extract from character 5 to end
cut -c5- file.txt

# Extract first 5 characters
cut -c-5 file.txt

# Extract bytes 1-10
cut -b1-10 file.txt
```

**Use cases**:

- Data extraction
- Column selection
- Format conversion
- Text parsing

### 8. `paste` - Merge Lines

**What it does**: Merges lines from multiple files.

**Syntax**: `paste [options] [file...]`

**Common options**:

- `-d` - Delimiter
- `-s` - Serial paste

**Examples**:

```bash
# Merge two files side by side
paste file1.txt file2.txt

# Merge with custom delimiter
paste -d: file1.txt file2.txt

# Serial paste (one file after another)
paste -s file1.txt file2.txt

# Merge with tab delimiter
paste -d'\t' file1.txt file2.txt

# Merge three files
paste file1.txt file2.txt file3.txt
```

**Use cases**:

- Combining data from multiple sources
- Creating tables
- Data merging
- Format conversion

### 9. `tr` - Translate Characters

**What it does**: Translates or deletes characters.

**Syntax**: `tr [options] set1 [set2]`

**Common options**:

- `-d` - Delete characters
- `-s` - Squeeze repeats
- `-c` - Complement

**Examples**:

```bash
# Convert lowercase to uppercase
tr 'a-z' 'A-Z' < file.txt

# Convert uppercase to lowercase
tr 'A-Z' 'a-z' < file.txt

# Replace spaces with tabs
tr ' ' '\t' < file.txt

# Replace tabs with spaces
tr '\t' ' ' < file.txt

# Delete specific characters
tr -d 'aeiou' < file.txt

# Squeeze multiple spaces into single space
tr -s ' ' < file.txt

# Delete non-printable characters
tr -d '\000-\037' < file.txt

# Convert newlines to spaces
tr '\n' ' ' < file.txt

# Convert spaces to newlines
tr ' ' '\n' < file.txt

# Remove duplicate characters
tr -s 'a' < file.txt
```

**Use cases**:

- Character conversion
- Text cleaning
- Format standardization
- Data preprocessing

### 10. `join` - Join Files

**What it does**: Joins lines from two files on a common field.

**Syntax**: `join [options] file1 file2`

**Common options**:

- `-1` - Field from file1
- `-2` - Field from file2
- `-t` - Field separator
- `-a` - Print unpairable lines

**Examples**:

```bash
# Join on first field
join file1.txt file2.txt

# Join on specific fields
join -1 2 -2 1 file1.txt file2.txt

# Join with custom separator
join -t: file1.txt file2.txt

# Print unpairable lines from file1
join -a1 file1.txt file2.txt

# Print unpairable lines from both files
join -a1 -a2 file1.txt file2.txt
```

**Use cases**:

- Database-like operations
- Data merging
- Relationship mapping
- Data analysis

## Advanced Text Processing

### 11. `comm` - Compare Files

**What it does**: Compares two sorted files line by line.

**Syntax**: `comm [options] file1 file2`

**Common options**:

- `-1` - Suppress lines unique to file1
- `-2` - Suppress lines unique to file2
- `-3` - Suppress lines common to both files

**Examples**:

```bash
# Compare two files
comm file1.txt file2.txt

# Show only lines unique to file1
comm -23 file1.txt file2.txt

# Show only lines unique to file2
comm -13 file1.txt file2.txt

# Show only common lines
comm -12 file1.txt file2.txt
```

### 12. `diff` - Compare Files

**What it does**: Shows differences between files.

**Syntax**: `diff [options] file1 file2`

**Common options**:

- `-u` - Unified format
- `-c` - Context format
- `-y` - Side by side
- `-r` - Recursive

**Examples**:

```bash
# Show differences
diff file1.txt file2.txt

# Unified format
diff -u file1.txt file2.txt

# Context format
diff -c file1.txt file2.txt

# Side by side comparison
diff -y file1.txt file2.txt

# Recursive comparison
diff -r dir1/ dir2/
```

## Practical Examples

### Example 1: Log Analysis

```bash
# Extract unique IP addresses from log file
grep "access" logfile.txt | awk '{print $1}' | sort | uniq

# Count requests by IP address
grep "access" logfile.txt | awk '{print $1}' | sort | uniq -c | sort -nr

# Find error messages
grep -i "error" logfile.txt | tail -20

# Extract timestamps and error messages
grep -i "error" logfile.txt | awk '{print $1, $2, $NF}'

# Count different types of errors
grep -i "error" logfile.txt | awk '{print $NF}' | sort | uniq -c
```

### Example 2: Data Processing

```bash
# Process CSV data
awk -F, '{print $1, $3}' data.csv

# Calculate sum of second column
awk -F, '{sum += $2} END {print "Total: " sum}' data.csv

# Find average of numeric column
awk -F, '{sum += $2; count++} END {print "Average: " sum/count}' data.csv

# Filter data by condition
awk -F, '$2 > 100' data.csv

# Sort by specific column
sort -t, -k2n data.csv

# Remove duplicate rows
sort -u data.csv
```

### Example 3: Text Cleaning

```bash
# Remove empty lines
sed '/^$/d' file.txt

# Remove leading/trailing whitespace
sed 's/^[ \t]*//;s/[ \t]*$//' file.txt

# Convert Windows line endings to Unix
sed 's/\r$//' file.txt

# Remove HTML tags
sed 's/<[^>]*>//g' file.txt

# Convert multiple spaces to single space
tr -s ' ' < file.txt

# Remove non-printable characters
tr -d '\000-\037' < file.txt
```

### Example 4: File Comparison

```bash
# Find common lines between files
comm -12 <(sort file1.txt) <(sort file2.txt)

# Find lines unique to each file
comm -3 <(sort file1.txt) <(sort file2.txt)

# Compare files and show differences
diff -u file1.txt file2.txt

# Find files with same content
diff -q file1.txt file2.txt
```

## Tips and Tricks

### 1. Combining Commands

```bash
# Process log file to extract unique users
grep "login" logfile.txt | awk '{print $3}' | sort | uniq -c | sort -nr

# Count word frequency in file
cat file.txt | tr ' ' '\n' | sort | uniq -c | sort -nr

# Extract email addresses
grep -o '[A-Za-z0-9._%+-]\+@[A-Za-z0-9.-]\+\.[A-Za-z]\{2,\}' file.txt

# Find duplicate lines
sort file.txt | uniq -d
```

### 2. Using Pipes Effectively

```bash
# Process command output
ls -la | grep "^-" | awk '{print $9}' | head -10

# Monitor log file in real-time
tail -f logfile.txt | grep "error"

# Process data from multiple sources
cat file1.txt file2.txt | sort | uniq
```

### 3. Creating Data Reports

```bash
# Generate summary report
{
    echo "=== Data Summary ==="
    echo "Total lines: $(wc -l < data.txt)"
    echo "Unique values: $(sort data.txt | uniq | wc -l)"
    echo "Most common value: $(sort data.txt | uniq -c | sort -nr | head -1)"
} > report.txt
```

## Common Mistakes

### 1. Not Using Quotes for Patterns

```bash
# Wrong - may not work with special characters
grep pattern file.txt

# Correct
grep "pattern" file.txt
```

### 2. Forgetting to Sort Before uniq

```bash
# Wrong - uniq only removes consecutive duplicates
uniq file.txt

# Correct
sort file.txt | uniq
```

### 3. Not Understanding Field Separators

```bash
# Wrong - assumes tab delimiter
cut -f1 file.txt

# Correct - specify delimiter
cut -d: -f1 file.txt
```

## Practice Exercises

1. **Basic Text Processing**:

   ```bash
   # Create test file
   echo -e "apple\nbanana\ncherry\napple\ndate" > fruits.txt

   # Count lines
   wc -l fruits.txt

   # Remove duplicates
   sort fruits.txt | uniq

   # Count unique fruits
   sort fruits.txt | uniq -c
   ```

2. **Data Analysis**:

   ```bash
   # Create data file
   echo -e "Alice,25,Engineer\nBob,30,Manager\nCharlie,35,Developer" > data.csv

   # Extract names
   cut -d, -f1 data.csv

   # Calculate average age
   cut -d, -f2 data.csv | awk '{sum += $1; count++} END {print sum/count}'

   # Find people over 30
   awk -F, '$2 > 30' data.csv
   ```

3. **Log Processing**:

   ```bash
   # Create sample log
   echo -e "192.168.1.1 GET /page1\n192.168.1.2 GET /page2\n192.168.1.1 GET /page1" > access.log

   # Extract IP addresses
   awk '{print $1}' access.log

   # Count requests by IP
   awk '{print $1}' access.log | sort | uniq -c

   # Find unique pages accessed
   awk '{print $3}' access.log | sort | uniq
   ```

---

**Next**: Learn about [Network and Connectivity Commands](network_commands.md) to work with network connections and data transfer.
