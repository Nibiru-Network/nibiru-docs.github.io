---
sidebar_position: 1
---

# Validator Node Configuration

Instructions for configuring a Validator Node on the Nibiru Network. This setup assumes you're
logged in as `root`.

## Hardware Requirements

| Component      | Requirement          |
|:---------------|:---------------------|
| CPU            | 8 cores              |
| RAM            | 32GB                 |
| OS             | CentOS 7.2 64-bit    |
| Disk (System)  | 100GB                |
| Disk (Data)    | 2TB                  |
| Network        | Internet connection  |

## Directory Structure

* Program directory: `/data/nibiru/bin`
* Data directory: `/data/nibiru/data`
* Default path: `/data/nibiru`
* Mining file storage directory: `/data/nibiru/data/keystore`

## 1. Setup System Environment

#### a. Update and upgrade system
This ensures the system and packages are on the latest versions.
```bash
yum update -y && yum upgrade -y
```

#### b. Install time synchronization
`chrony` is a versatile implementation of the Network Time Protocol (NTP). It can synchronise 
the system clock with NTP servers, reference clocks (e.g. GPS receiver), and manual input using 
wristwatch and keyboard. It can also operate as an NTPv4 (RFC 5905) server and peer to provide 
a time service to other computers in the network.

```bash
yum -y install chrony
```

#### c. Start time synchronization
```bash
systemctl start chronyd
```

#### d. Check time syncronization status
```bash
systemctl status chronyd
```

![Alt text](check_time_synchronization.png)

#### e. Update System Language

```bash
sudo vim /etc/default/locale
```

```
LANG="en_US.UTG-8"
LANGUAGE="en_US:en"
locale-gen -en_US:en
```

## 2 - Compile the Nibiru daemon

```bash
mkdir -p /data/devent
cd /data/devent
git clone https://github.com/Nibiru-Network/Nibiru.git 
cd Nibiru
make nbn (or make all)
```

## 3 - Setup the Nibiru working directory

#### a. Create the working directory
```bash
mkdir -p /data/nibiru/data
```

#### b. Copy the compiled Nibiru daemon to the working directory
```bash
cp -r /data/devent/Nibiru/build/bin /data/nibiru/
```

#### c. Generate the miner address keystore file in the `/data/nibiru/data/keystore` directory
```bash
cd /data/nibiru
./bin/nbn --datadir data/ account new
```

![Alt text](keypassword.png)

**Make sure to generate your own password instead of `keypassword` and don't forget it!**

#### d. Write the password for the key file to the `/data/nibiru/data/password.txt` file.

```bash
echo 'keypassword' > /data/nibiru/data/password.txt
```

## 4 - Begin syncing to Nibiru Network
Now that the keys have been created and the directory structure set,
it's time to synchronize the node with the network.

#### a. Create nbnchain.service file
This service file will synchronize your node with the network. 

```bash
sudo cat <<EOF >> /lib/systemd/system/nbnchain.service
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
EOF
```

#### b. Start Nibiru service

1. Create a self-starting node service
```bash
systemctl enable nbnchain
```

2. Start the node service
```bash
systemctl start nbnchain
```

To query the service to ensure it is running correctly,
you may run the following command:
```bash
systemctl status nbnchain
```

### c. Check if node is synchronizing

1. Enter the console
```bash
cd /data/nibiru/
./bin/nbn attach data/nbn.ipc
```

2. Check the sync status
```bash
> eth.syncing
```

`True` = Synchronization still in progress

`False` = Synchronization is complete

Once the node is synced with the network, you can continue on to step 5.

## 5 - Update systemd daemon to be a validator
Now that the node is synced, you may turn it into a validator. The first step
is to update the service file so that it may sign blocks. Currently it has no
access to the keys you created before, so we'll need to fix that. The only
line that needs modified is the `ExecStart` row.

#### a. Modify the nbnchain.service file
```bash
sudo vim /lib/systemd/system/nbnchain.service
```

```ini
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
ExecStart=/data/nibiru/bin/nbn --datadir /data/nibiru/data --allow-insecure-unlock  -unlock 'MINER_ADDRESS_HERE' --password /data/nibiru/data/password.txt --mine 
KillMode=process
TimeoutStopSec=60
Restart=on-failure
RestartSec=5
RemainAfterExit=no

[Install]
WantedBy=multi-user.target
```

#### b. Reload the daemon
This informs the operating system that a change has been made in the
service file.

```bash
sudo systemctl daemon-reload
```

#### c. Restart the nbnchain service
```bash
sudo systemctl restart nbnchain
```

Now that your node is synced and the service file is set up to be a validator on Nibiru Network,
you may now continue and [**stake to your validator**](validator-staking.md).
