# System Information Commands

## Overview

System information commands help you understand your system's status, resources, and processes. These commands are essential for system administration, troubleshooting, and monitoring.

## Essential System Commands

### 1. `whoami` - Show Current User

**What it does**: Displays the username of the current user.

**Syntax**: `whoami [options]`

**Examples**:

```bash
# Show current user
whoami
# Output: username

# Show current user with full name (if available)
whoami
# Output: john_doe
```

**Use cases**:

- Check which user you're logged in as
- Use in scripts to determine user context
- Verify user permissions

### 2. `uname` - System Information

**What it does**: Displays system information.

**Syntax**: `uname [options]`

**Common options**:

- `-a` - All information
- `-s` - Kernel name
- `-n` - Network node hostname
- `-r` - Kernel release
- `-v` - Kernel version
- `-m` - Machine hardware name
- `-p` - Processor type
- `-i` - Hardware platform
- `-o` - Operating system

**Examples**:

```bash
# Show all system information
uname -a
# Output: Linux hostname 5.4.0-generic #1 SMP x86_64 GNU/Linux

# Show kernel name
uname -s
# Output: Linux

# Show hostname
uname -n
# Output: mycomputer

# Show kernel release
uname -r
# Output: 5.4.0-generic

# Show machine architecture
uname -m
# Output: x86_64

# Show operating system
uname -o
# Output: GNU/Linux
```

**Use cases**:

- System identification
- Script compatibility checking
- Troubleshooting system issues
- Documentation

### 3. `df` - Disk Space Usage

**What it does**: Shows disk space usage for file systems.

**Syntax**: `df [options] [file...]`

**Common options**:

- `-h` - Human-readable sizes
- `-a` - Show all file systems
- `-T` - Show file system type
- `-i` - Show inode information
- `-l` - Local file systems only

**Examples**:

```bash
# Show disk usage
df
# Output:
# Filesystem     1K-blocks    Used Available Use% Mounted on
# /dev/sda1      52428800 10485760  41943040  20% /

# Show human-readable sizes
df -h
# Output:
# Filesystem      Size  Used Avail Use% Mounted on
# /dev/sda1        50G   10G   40G  20% /

# Show file system types
df -T
# Output:
# Filesystem     Type     1K-blocks    Used Available Use% Mounted on
# /dev/sda1      ext4     52428800 10485760  41943040  20% /

# Show inode usage
df -i
# Output:
# Filesystem     Inodes IUsed IFree IUse% Mounted on
# /dev/sda1      3276800 12345 3264455    1% /

# Show specific directory
df -h /home
# Output:
# Filesystem      Size  Used Avail Use% Mounted on
# /dev/sda2        100G   20G   80G  20% /home
```

**Use cases**:

- Monitor disk space
- Identify full file systems
- Plan storage requirements
- Troubleshoot space issues

### 4. `du` - Directory Space Usage

**What it does**: Shows disk usage of files and directories.

**Syntax**: `du [options] [file...]`

**Common options**:

- `-h` - Human-readable sizes
- `-s` - Summary only
- `-a` - Show all files
- `-d` - Maximum depth
- `-c` - Show total

**Examples**:

```bash
# Show directory sizes
du
# Output:
# 4       ./dir1
# 8       ./dir2
# 12      .

# Show human-readable sizes
du -h
# Output:
# 4.0K    ./dir1
# 8.0K    ./dir2
# 12K     .

# Show summary only
du -sh
# Output: 12K     .

# Show all files and directories
du -ah
# Output:
# 4.0K    ./dir1/file1.txt
# 4.0K    ./dir1
# 8.0K    ./dir2/file2.txt
# 8.0K    ./dir2
# 12K     .

# Show maximum depth of 2
du -h -d 2
# Output:
# 4.0K    ./dir1/subdir
# 8.0K    ./dir1
# 8.0K    ./dir2
# 20K     .

# Show total
du -ch *.txt
# Output:
# 4.0K    file1.txt
# 8.0K    file2.txt
# 12K     total
```

**Use cases**:

- Find large files and directories
- Monitor disk usage
- Clean up disk space
- Analyze storage patterns

### 5. `ps` - Process Status

**What it does**: Shows information about running processes.

**Syntax**: `ps [options]`

**Common options**:

- `aux` - All processes, user format, extended
- `ef` - All processes, full format
- `-p` - Process ID
- `-u` - User processes
- `-f` - Full format
- `-l` - Long format

**Examples**:

```bash
# Show all processes
ps aux
# Output:
# USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
# root         1  0.0  0.0  22564  1234 ?        Ss   10:00   0:01 /sbin/init

# Show processes for current user
ps u
# Output:
# USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
# user      1234  0.0  0.1  12345  2345 pts/0    Ss   10:01   0:00 bash

# Show specific process
ps -p 1234
# Output:
#   PID TTY          TIME CMD
#  1234 pts/0    00:00:00 bash

# Show full format
ps -f
# Output:
# UID        PID  PPID  C STIME TTY          TIME CMD
# user      1234  1233  0 10:01 pts/0    00:00:00 bash

# Show processes by user
ps -u username
# Output:
# USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
# username  1234  0.0  0.1  12345  2345 pts/0    Ss   10:01   0:00 bash

# Show process tree
ps -ejH
# Output: Shows process hierarchy
```

**Process States**:

- `R` - Running
- `S` - Sleeping
- `D` - Uninterruptible sleep
- `Z` - Zombie
- `T` - Stopped or traced

**Use cases**:

- Monitor system processes
- Find resource-intensive processes
- Troubleshoot hanging processes
- System performance analysis

### 6. `top` - System Monitoring

**What it does**: Shows real-time system information and process list.

**Syntax**: `top [options]`

**Common options**:

- `-p` - Monitor specific process IDs
- `-u` - Monitor specific user
- `-n` - Number of iterations
- `-d` - Update interval
- `-b` - Batch mode

**Examples**:

```bash
# Start top
top

# Monitor specific process
top -p 1234

# Monitor user processes
top -u username

# Run for 5 iterations
top -n 5

# Update every 2 seconds
top -d 2

# Batch mode (for scripts)
top -b -n 1
```

**Top Interactive Commands**:

- `k` - Kill process
- `r` - Renice process
- `h` - Help
- `q` - Quit
- `1` - Toggle CPU cores
- `m` - Toggle memory display
- `t` - Toggle task/CPU display
- `P` - Sort by CPU usage
- `M` - Sort by memory usage
- `T` - Sort by time

**Use cases**:

- Real-time system monitoring
- Process performance analysis
- System troubleshooting
- Resource usage tracking

### 7. `htop` - Enhanced System Monitor

**What it does**: Interactive process viewer (enhanced version of top).

**Syntax**: `htop [options]`

**Examples**:

```bash
# Start htop
htop

# Show specific user processes
htop -u username

# Show process tree
htop -t

# Update every 2 seconds
htop -d 2
```

**Htop Features**:

- Color-coded display
- Mouse support
- Process tree view
- Better navigation
- More detailed information

### 8. `free` - Memory Usage

**What it does**: Shows memory usage information.

**Syntax**: `free [options]`

**Common options**:

- `-h` - Human-readable sizes
- `-s` - Update interval
- `-t` - Show total
- `-m` - Show in MB
- `-g` - Show in GB

**Examples**:

```bash
# Show memory usage
free
# Output:
#               total        used        free      shared  buff/cache   available
# Mem:        8192000     2048000     4096000      102400     2048000     6144000
# Swap:       2097152           0     2097152

# Show human-readable sizes
free -h
# Output:
#               total        used        free      shared  buff/cache   available
# Mem:           8.0G        2.0G        4.0G      100M        2.0G        6.0G
# Swap:          2.0G          0B        2.0G

# Show total
free -t
# Output: Shows total memory including swap

# Update every 5 seconds
free -s 5
# Output: Updates every 5 seconds
```

**Memory Types**:

- **Total** - Total physical memory
- **Used** - Memory currently in use
- **Free** - Unused memory
- **Shared** - Memory shared between processes
- **Buff/Cache** - Memory used for buffers and cache
- **Available** - Memory available for new processes

**Use cases**:

- Monitor memory usage
- Identify memory leaks
- System performance analysis
- Memory planning

### 9. `uptime` - System Uptime

**What it does**: Shows how long the system has been running.

**Syntax**: `uptime [options]`

**Examples**:

```bash
# Show uptime
uptime
# Output: 10:30:45 up 2 days, 3:45, 2 users, load average: 0.52, 0.58, 0.61

# Show uptime in a more readable format
uptime -p
# Output: up 2 days, 3 hours, 45 minutes
```

**Load Average**:

- Shows system load over 1, 5, and 15 minutes
- Values represent average number of processes waiting for CPU
- Values > number of CPU cores indicate high load

**Use cases**:

- System stability monitoring
- Performance analysis
- Maintenance scheduling
- System documentation

### 10. `w` - Show Who is Logged In

**What it does**: Shows who is logged in and what they're doing.

**Syntax**: `w [options] [user]`

**Examples**:

```bash
# Show all logged in users
w
# Output:
#  10:30:45 up 2 days, 3:45, 2 users, load average: 0.52, 0.58, 0.61
# USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
# user1    pts/0    192.168.1.100    09:15    1:15m  0.05s  0.05s bash
# user2    pts/1    192.168.1.101    10:00    0.30m  0.02s  0.02s vim file.txt

# Show specific user
w user1
# Output: Shows only user1's sessions
```

**Use cases**:

- Monitor user activity
- System security
- Resource usage tracking
- User management

## Advanced System Commands

### 11. `lscpu` - CPU Information

**What it does**: Shows CPU architecture information.

**Examples**:

```bash
# Show CPU information
lscpu
# Output:
# Architecture:        x86_64
# CPU op-mode(s):      32-bit, 64-bit
# Byte Order:          Little Endian
# CPU(s):              8
# On-line CPU(s) list: 0-7
# Thread(s) per core:  2
# Core(s) per socket:  4
# Socket(s):           1
# NUMA node(s):        1
# Vendor ID:           GenuineIntel
# CPU family:          6
# Model:               142
# Model name:          Intel(R) Core(TM) i7-8550U CPU @ 1.80GHz
```

### 12. `lsblk` - Block Device Information

**What it does**: Shows block device information.

**Examples**:

```bash
# Show block devices
lsblk
# Output:
# NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
# sda      8:0    0  100G  0 disk
# ├─sda1   8:1    0   50G  0 part /
# └─sda2   8:2    0   50G  0 part /home

# Show filesystem information
lsblk -f
# Output: Shows filesystem types and labels
```

### 13. `lsof` - List Open Files

**What it does**: Shows files opened by processes.

**Examples**:

```bash
# Show all open files
lsof

# Show files opened by specific process
lsof -p 1234

# Show files opened by specific user
lsof -u username

# Show network connections
lsof -i

# Show specific port
lsof -i :80
```

## Practical Examples

### Example 1: System Health Check

```bash
# Check system uptime
uptime

# Check memory usage
free -h

# Check disk usage
df -h

# Check load average
top -n 1 | head -5

# Check running processes
ps aux | head -10
```

### Example 2: Process Monitoring

```bash
# Find processes using most CPU
ps aux --sort=-%cpu | head -10

# Find processes using most memory
ps aux --sort=-%mem | head -10

# Monitor specific process
top -p $(pgrep -f "process_name")

# Check if process is running
pgrep -f "process_name"
```

### Example 3: Disk Space Management

```bash
# Check disk usage
df -h

# Find largest directories
du -h --max-depth=1 /home | sort -hr

# Find large files
find /home -type f -size +100M -exec ls -lh {} \;

# Clean up old files
find /tmp -type f -mtime +7 -delete
```

### Example 4: System Performance Analysis

```bash
# Monitor system in real-time
htop

# Check CPU usage
top -n 1 | grep "Cpu(s)"

# Check memory usage
free -h

# Check I/O statistics
iostat

# Check network statistics
netstat -i
```

## Tips and Tricks

### 1. Combining Commands

```bash
# Get system summary
echo "=== System Information ===" && \
echo "Uptime:" && uptime && \
echo "Memory:" && free -h && \
echo "Disk:" && df -h

# Monitor specific process
watch -n 1 'ps aux | grep "process_name" | grep -v grep'
```

### 2. Creating System Reports

```bash
# Create system report
{
    echo "=== System Report $(date) ==="
    echo "Uptime: $(uptime)"
    echo "Memory: $(free -h | grep Mem)"
    echo "Disk: $(df -h | grep '/$')"
    echo "Load: $(uptime | awk '{print $10, $11, $12}')"
} > system_report.txt
```

### 3. Monitoring Scripts

```bash
#!/bin/bash
# System monitoring script

while true; do
    echo "=== $(date) ==="
    echo "Load: $(uptime | awk '{print $10, $11, $12}')"
    echo "Memory: $(free -h | grep Mem | awk '{print $3 "/" $2}')"
    echo "Disk: $(df -h / | tail -1 | awk '{print $5}')"
    sleep 60
done
```

## Common Mistakes

### 1. Not Understanding Load Average

```bash
# Load average > number of CPU cores = high load
# Check number of CPU cores
nproc
# or
lscpu | grep "CPU(s):"
```

### 2. Ignoring Swap Usage

```bash
# High swap usage indicates memory pressure
free -h
# If swap usage is high, consider adding more RAM
```

### 3. Not Monitoring Disk Space Regularly

```bash
# Set up monitoring for disk space
df -h | awk '$5 > "80%" {print $0}'
# This will show filesystems with >80% usage
```

## Practice Exercises

1. **Basic System Check**:

   ```bash
   # Check your system information
   uname -a

   # Check uptime
   uptime

   # Check memory usage
   free -h

   # Check disk usage
   df -h
   ```

2. **Process Analysis**:

   ```bash
   # List your processes
   ps u

   # Find top CPU users
   ps aux --sort=-%cpu | head -5

   # Find top memory users
   ps aux --sort=-%mem | head -5
   ```

3. **System Monitoring**:

   ```bash
   # Start top and observe
   top

   # Monitor specific process
   top -p $$

   # Check system load
   uptime
   ```

---

**Next**: Learn about [Text Processing Commands](text_processing_commands.md) to manipulate and analyze text data.
