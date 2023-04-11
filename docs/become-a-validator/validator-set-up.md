---
sidebar_position: 1
---

# Validator Node Configuration

Instructions for configuring a Validator Node on the Nibiru Network.

## Hardware Requirements

| Component      | Requirement          |
|:---------------|:---------------------|
| CPU            | 8 cores              |
| RAM            | 32GB                 |
| OS             | CentOS 7.2 64-bit    |
| Disk (System)  | 100GB                |
| Disk (Data)    | 2TB                  |
| Network        | Internet connection  |

## Directory Structures

* Program directory: `/data/nibiru/bin`
* Data directory: `/data/nibiru/data`
* Default path: `/data/nibiru`
* Mining file storage directory: `/data/nibiru/data/keystore`

## 1. Update System Environment

**Time Syncronization**

```bash
# yum update -y
# yum upgrade -y
```

**Deploy time synchronization**

```bash
# yum -y install chrony
```

**Start time synchronization**

```bash
# systemctl start chronyd
```

**Check time syncronization status**

```bash
# systemctl status chronyd
```

![Alt text](check_time_synchronization.png)

**Update System Language**

```bash
# sudo vim /etc/default/locale
```

```
LANG="en_US.UTG-8"
LANGUAGE="en_US:en"
locale-gen -en_US:en
```

## 2 - Compile the Node Program

```bash
# mkdir -p /data/devent
# cd /data/devent
# git clone https://github.com/Nibiru-Network/Nibiru --recurse （this process is not needed）
# cd nibiru
# make all
```

## 3 - Deploy the Node

Create the working directory

```bash
# mkdir -p /data/nibiru/data
```

Copy the compiled node program to the working directory

```bash
# cp -r /data/devent/nibiru/build/bin /data/nibiru/
```

Generate the miner address keystore file in the `/data/nibiru/data/keystore` directory

```bash
# cd /data/nibiru
# ./bin/nbn --datadir data/ account new
```

![Alt text](keypassword.png)

**Make sure to generate your own password instead of `keypassword` and don't forget it!**

Write the password for the key file to the `/data/nibiru/data/password.txt` file.

```bash
# echo 'keypassword' > /data/nibiru/data/password.txt
```

## 4 - Create the Nibiru Startup Service

1. Start synchronous node mining
   
   ```bash
   # vim /lib/systemd/system/nbnchain.service
   ```
   
   ```
   [Unit]
    Description=Ethereum Nibiru Chain
    After=network.target
    
    [Service]
    Type=simple
    StandardOutput=syslog
    StandardError=syslog
    SyslogIdentifier=nibiru
    User=root
    WorkingDirectory=/data/nibiru
    ExecStart=/data/nibiru/bin/nbn --datadir /data/nibiru/data
    KillMode=process
    TimeoutStopSec=60
    Restart=on-failure
    RestartSec=5
    RemainAfterExit=no
    
    [Install]
    WantedBy=multi-user.target
   ```

2. Stop synchronous node mining
   ```bash
   # vim /lib/systemd/system/nbnchain.service
   ```

   ```
   [Unit]
    Description=Ethereum Nibiru chain
    After=network.target
    
    [Service]
    Type=simple
    StandardOutput=syslog
    StandardError=syslog
    SyslogIdentifier=nibiru
    User=root
    WorkingDirectory=/data/nibiru
    ExecStart=/data/nibiru/bin/nbn --datadir /data/nibiru/data --allow-insecure-unlock  -unlock ‘Miner address’ --password /data/nibiru/data/password.txt --mine 
    KillMode=process
    TimeoutStopSec=60
    Restart=on-failure
    RestartSec=5
    RemainAfterExit=no
    
    [Install]
    WantedBy=multi-user.target
   ```

## 5 - Start Nibiru Services

Create a self-starting node service

```bash
# systemctl enable nbnchain
```

Start the node service

```bash
# systemctl start nbnchain
```

Query the service running status

```bash
# systemctl status nbnchain
```

## 6 - Console Check

Enter the console

```bash
# ./bin/nbn attach data/nbn.ipc
```

Check the sync status

```
> eth.syncing
```

`True` = Synchronization still in progress

`False` = Synchronization is complete