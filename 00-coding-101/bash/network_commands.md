# Network and Connectivity Commands

## Overview

Network and connectivity commands help you test network connections, transfer data, and manage network resources. These commands are essential for system administration, troubleshooting, and web development.

## Essential Network Commands

### 1. `ping` - Test Network Connectivity

**What it does**: Tests connectivity to a host by sending ICMP echo requests.

**Syntax**: `ping [options] host`

**Common options**:

- `-c` - Number of packets to send
- `-i` - Interval between packets
- `-s` - Packet size
- `-t` - Timeout
- `-W` - Time to wait for response
- `-q` - Quiet mode

**Examples**:

```bash
# Basic ping
ping google.com

# Send 5 packets
ping -c 5 google.com

# Send packets every 2 seconds
ping -i 2 google.com

# Send larger packets (1000 bytes)
ping -s 1000 google.com

# Set timeout to 5 seconds
ping -W 5 google.com

# Quiet mode (summary only)
ping -q -c 10 google.com

# Ping specific IP address
ping 8.8.8.8

# Ping with custom interval and count
ping -c 3 -i 1 google.com
```

**Use cases**:

- Test network connectivity
- Measure network latency
- Troubleshoot network issues
- Monitor network performance

### 2. `curl` - Transfer Data from/to Servers

**What it does**: Transfers data from or to servers using various protocols.

**Syntax**: `curl [options] [URL...]`

**Common options**:

- `-o` - Output to file
- `-O` - Output to file with original name
- `-X` - HTTP method
- `-H` - HTTP header
- `-d` - POST data
- `-u` - User authentication
- `-k` - Allow insecure connections
- `-v` - Verbose output
- `-s` - Silent mode
- `-w` - Write out format

**Examples**:

```bash
# Download file
curl -O https://example.com/file.txt

# Download with custom name
curl -o myfile.txt https://example.com/file.txt

# GET request
curl https://api.example.com/data

# POST request
curl -X POST -d "name=value" https://api.example.com/submit

# POST with JSON data
curl -X POST -H "Content-Type: application/json" \
     -d '{"name":"John","age":30}' \
     https://api.example.com/users

# Basic authentication
curl -u username:password https://example.com/secure

# Download with progress bar
curl -# -O https://example.com/largefile.zip

# Test HTTP response code
curl -o /dev/null -s -w "%{http_code}" https://example.com

# Follow redirects
curl -L https://example.com

# Save cookies
curl -c cookies.txt https://example.com

# Use saved cookies
curl -b cookies.txt https://example.com

# Upload file
curl -F "file=@local_file.txt" https://example.com/upload

# Download multiple files
curl -O https://example.com/file1.txt -O https://example.com/file2.txt
```

**Use cases**:

- Download files
- Test web APIs
- Web scraping
- File uploads
- HTTP testing

### 3. `wget` - Download Files

**What it does**: Downloads files from the web.

**Syntax**: `wget [options] [URL...]`

**Common options**:

- `-O` - Output filename
- `-c` - Continue download
- `-r` - Recursive download
- `-np` - No parent directories
- `-P` - Directory prefix
- `-q` - Quiet mode
- `-v` - Verbose mode
- `-U` - User agent
- `-w` - Wait between downloads

**Examples**:

```bash
# Download file
wget https://example.com/file.txt

# Download with custom name
wget -O myfile.txt https://example.com/file.txt

# Continue interrupted download
wget -c https://example.com/largefile.zip

# Download to specific directory
wget -P /downloads https://example.com/file.txt

# Recursive download
wget -r https://example.com/

# Recursive download with limits
wget -r -l 2 -np https://example.com/

# Download with custom user agent
wget -U "Mozilla/5.0" https://example.com/

# Download with wait time
wget -w 2 https://example.com/file1.txt https://example.com/file2.txt

# Download in background
wget -b https://example.com/largefile.zip

# Download with progress bar
wget -q --show-progress https://example.com/file.txt
```

**Use cases**:

- Download files and websites
- Mirror websites
- Batch downloads
- Resume interrupted downloads

### 4. `ssh` - Secure Shell Connection

**What it does**: Connects to remote servers securely.

**Syntax**: `ssh [options] [user@]host [command]`

**Common options**:

- `-p` - Port number
- `-i` - Identity file
- `-X` - Enable X11 forwarding
- `-L` - Local port forwarding
- `-D` - Dynamic port forwarding
- `-v` - Verbose mode
- `-o` - SSH options

**Examples**:

```bash
# Connect to remote server
ssh user@server.com

# Connect with specific port
ssh -p 2222 user@server.com

# Connect with private key
ssh -i ~/.ssh/id_rsa user@server.com

# Execute command remotely
ssh user@server.com "ls -la"

# Enable X11 forwarding
ssh -X user@server.com

# Local port forwarding
ssh -L 8080:localhost:80 user@server.com

# Dynamic port forwarding (SOCKS proxy)
ssh -D 1080 user@server.com

# Connect with specific SSH options
ssh -o "StrictHostKeyChecking=no" user@server.com

# Connect with compression
ssh -C user@server.com

# Connect with verbose output
ssh -v user@server.com
```

**Use cases**:

- Remote server access
- Secure file transfers
- Remote command execution
- Port forwarding

### 5. `scp` - Secure Copy

**What it does**: Securely copies files between hosts.

**Syntax**: `scp [options] source destination`

**Common options**:

- `-r` - Recursive copy
- `-P` - Port number
- `-i` - Identity file
- `-p` - Preserve timestamps
- `-v` - Verbose mode
- `-C` - Enable compression

**Examples**:

```bash
# Copy file to remote server
scp file.txt user@server.com:/home/user/

# Copy file from remote server
scp user@server.com:/home/user/file.txt ./

# Copy directory recursively
scp -r directory/ user@server.com:/home/user/

# Copy with specific port
scp -P 2222 file.txt user@server.com:/home/user/

# Copy with private key
scp -i ~/.ssh/id_rsa file.txt user@server.com:/home/user/

# Copy with preserved timestamps
scp -p file.txt user@server.com:/home/user/

# Copy with compression
scp -C largefile.zip user@server.com:/home/user/

# Copy multiple files
scp file1.txt file2.txt user@server.com:/home/user/

# Copy with verbose output
scp -v file.txt user@server.com:/home/user/
```

**Use cases**:

- Secure file transfers
- Backup files to remote servers
- Deploy applications
- Transfer configuration files

### 6. `netstat` - Network Statistics

**What it does**: Shows network connections, routing tables, and interface statistics.

**Syntax**: `netstat [options]`

**Common options**:

- `-t` - TCP connections
- `-u` - UDP connections
- `-l` - Listening sockets
- `-p` - Show process/program name
- `-n` - Show numerical addresses
- `-a` - Show all sockets
- `-i` - Show interface statistics
- `-r` - Show routing table

**Examples**:

```bash
# Show all connections
netstat -a

# Show TCP connections
netstat -t

# Show listening ports
netstat -l

# Show process names
netstat -p

# Show numerical addresses
netstat -n

# Show TCP listening ports
netstat -tl

# Show UDP listening ports
netstat -ul

# Show interface statistics
netstat -i

# Show routing table
netstat -r

# Show all TCP connections with process names
netstat -tpn

# Show listening ports with process names
netstat -tlpn
```

**Use cases**:

- Monitor network connections
- Troubleshoot network issues
- Check listening ports
- Analyze network traffic

### 7. `ss` - Socket Statistics

**What it does**: Shows socket statistics (modern replacement for netstat).

**Syntax**: `ss [options]`

**Common options**:

- `-t` - TCP sockets
- `-u` - UDP sockets
- `-l` - Listening sockets
- `-p` - Show process information
- `-n` - Show numerical addresses
- `-a` - Show all sockets
- `-s` - Show summary

**Examples**:

```bash
# Show all sockets
ss -a

# Show TCP sockets
ss -t

# Show listening sockets
ss -l

# Show process information
ss -p

# Show numerical addresses
ss -n

# Show TCP listening sockets
ss -tl

# Show UDP listening sockets
ss -ul

# Show summary
ss -s

# Show all TCP connections with process info
ss -tpn

# Show listening ports with process info
ss -tlpn
```

**Use cases**:

- Monitor network connections
- Check listening ports
- Analyze socket usage
- Network troubleshooting

### 8. `nslookup` - Name Server Lookup

**What it does**: Queries DNS servers for domain information.

**Syntax**: `nslookup [options] [host] [server]`

**Examples**:

```bash
# Look up domain
nslookup google.com

# Look up with specific DNS server
nslookup google.com 8.8.8.8

# Interactive mode
nslookup
> google.com
> exit

# Look up reverse DNS
nslookup 8.8.8.8

# Look up MX records
nslookup -type=mx google.com

# Look up A records
nslookup -type=a google.com
```

**Use cases**:

- DNS troubleshooting
- Domain information lookup
- Network diagnostics
- Email server configuration

### 9. `dig` - DNS Lookup Utility

**What it does**: DNS lookup utility with detailed output.

**Syntax**: `dig [options] [host] [type]`

**Common options**:

- `+short` - Short output
- `+trace` - Trace from root
- `+noall` - No flags
- `+answer` - Show answer section only
- `@server` - Use specific DNS server

**Examples**:

```bash
# Basic DNS lookup
dig google.com

# Short output
dig +short google.com

# Look up specific record type
dig google.com MX

# Use specific DNS server
dig @8.8.8.8 google.com

# Trace from root
dig +trace google.com

# Show only answer section
dig +noall +answer google.com

# Look up reverse DNS
dig -x 8.8.8.8

# Look up with custom record type
dig google.com AAAA
```

**Use cases**:

- DNS troubleshooting
- Domain analysis
- Network diagnostics
- DNS server testing

### 10. `telnet` - Telnet Client

**What it does**: Connects to remote hosts using Telnet protocol.

**Syntax**: `telnet [options] host [port]`

**Examples**:

```bash
# Connect to host on default port
telnet example.com

# Connect to specific port
telnet example.com 80

# Test if port is open
telnet example.com 22

# Connect to localhost
telnet localhost 8080
```

**Use cases**:

- Testing port connectivity
- Debugging network services
- Legacy system access
- Network troubleshooting

## Advanced Network Commands

### 11. `nc` (netcat) - Network Swiss Army Knife

**What it does**: Versatile networking utility for reading/writing data across networks.

**Examples**:

```bash
# Test port connectivity
nc -zv example.com 80

# Create simple server
nc -l 8080

# Connect to server
nc example.com 8080

# Transfer file
nc -l 8080 > received_file.txt
nc example.com 8080 < file_to_send.txt

# Port scanning
nc -zv example.com 20-30
```

### 12. `traceroute` - Trace Network Route

**What it does**: Shows the network path to a destination.

**Examples**:

```bash
# Trace route to host
traceroute google.com

# Use TCP instead of UDP
traceroute -T google.com

# Use ICMP instead of UDP
traceroute -I google.com

# Set number of queries
traceroute -q 3 google.com
```

## Practical Examples

### Example 1: Network Connectivity Test

```bash
# Test basic connectivity
ping -c 3 google.com

# Test DNS resolution
nslookup google.com

# Test HTTP connectivity
curl -I https://google.com

# Test specific port
telnet google.com 80
```

### Example 2: Download and Transfer Files

```bash
# Download file with curl
curl -O https://example.com/file.txt

# Download file with wget
wget https://example.com/file.txt

# Upload file to server
scp file.txt user@server.com:/home/user/

# Download file from server
scp user@server.com:/home/user/file.txt ./
```

### Example 3: Network Monitoring

```bash
# Check listening ports
netstat -tlpn

# Check active connections
ss -t

# Monitor network interface
netstat -i

# Check routing table
netstat -r
```

### Example 4: API Testing

```bash
# Test GET request
curl https://api.example.com/users

# Test POST request
curl -X POST -H "Content-Type: application/json" \
     -d '{"name":"John"}' \
     https://api.example.com/users

# Test with authentication
curl -u username:password https://api.example.com/secure

# Test response time
curl -w "@curl-format.txt" -o /dev/null -s https://api.example.com/
```

## Tips and Tricks

### 1. Network Troubleshooting Script

```bash
#!/bin/bash
# Network diagnostic script

echo "=== Network Diagnostics ==="
echo "Testing connectivity to Google..."
ping -c 3 google.com

echo "Testing DNS resolution..."
nslookup google.com

echo "Testing HTTP connectivity..."
curl -I https://google.com

echo "Checking listening ports..."
netstat -tlpn | head -10
```

### 2. Port Scanner Script

```bash
#!/bin/bash
# Simple port scanner

host=$1
start_port=$2
end_port=$3

for port in $(seq $start_port $end_port); do
    nc -zv $host $port 2>&1 | grep "open"
done
```

### 3. Download Manager Script

```bash
#!/bin/bash
# Download multiple files

urls=(
    "https://example.com/file1.txt"
    "https://example.com/file2.txt"
    "https://example.com/file3.txt"
)

for url in "${urls[@]}"; do
    echo "Downloading $url..."
    curl -O "$url"
done
```

## Common Mistakes

### 1. Not Checking Network Connectivity

```bash
# Always test connectivity first
ping -c 1 google.com || echo "No internet connection"
```

### 2. Not Using Secure Protocols

```bash
# Use HTTPS instead of HTTP
curl https://example.com  # Good
curl http://example.com   # Less secure
```

### 3. Not Handling Errors

```bash
# Check if download succeeded
curl -f -O https://example.com/file.txt || echo "Download failed"
```

## Practice Exercises

1. **Basic Network Testing**:

   ```bash
   # Test connectivity to multiple hosts
   for host in google.com github.com stackoverflow.com; do
       echo "Testing $host..."
       ping -c 1 $host
   done
   ```

2. **Port Scanning**:

   ```bash
   # Check common ports on localhost
   for port in 22 80 443 8080; do
       nc -zv localhost $port
   done
   ```

3. **File Transfer**:
   ```bash
   # Download and upload test
   echo "Hello World" > test.txt
   scp test.txt user@server.com:/tmp/
   scp user@server.com:/tmp/test.txt downloaded.txt
   ```

---

**Congratulations! You've completed the Bash Commands Fundamentals course.**

**Next Steps**:

- Practice using these commands daily
- Create your own scripts and automation
- Explore advanced bash scripting
- Learn about shell scripting best practices
