### Networking tips
These should enable the pine to use Iowa Eduroam on boot with the detailed user creds
in wpa_wupplicant.conf

- The py script was used to generate for the first time the wpa config, but 
that's now included in this repo, so I don't think it will ever need to be run again.
- `chsh -s /bin/bash john` to set a new users terminal to bash over just sh
- set/replace `/etc/wpa_supplicant/wpa_supplicant.conf` + and `/etc/network/interfaces`

### Controlling Led from bash:
- `sh -c "echo '0' > /sys/devices/platform/leds/leds/work-led/brightness"` - white led
- `sh -c "echo '0' > /sys/devices/platform/leds/leds/standby-led/brightness"` - red led

Further todos for configuration are listed [in this issue](https://github.com/Haiti-Distributed-Healthcare-System/hdhs/issues/20#issuecomment-586730519)
