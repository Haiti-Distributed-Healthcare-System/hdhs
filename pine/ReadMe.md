These should enable the pine to use Iowa Eduroam on boot with the detailed user creds
in wpa_wupplicant.conf

### Random Tips
- The py script was used to generate for the first time the wpa config, but 
that's now included in this repo, so I don't think it will ever need to be run again.
- `chsh -s /bin/bash john` to set a new users terminal to bash over just sh
- set/replace `/etc/wpa_supplicant/wpa_supplicant.conf` + and `/etc/network/interfaces`
