# Develop

To serve the app locally and try it out from your phone on the same network (where wlp1s0 is the
interface of that network on your computer):

```sh
REACT_NATIVE_PACKAGER_HOSTNAME="$(ifconfig wlp1s0 | grep inet\  | sed -e "s/.*inet //;s/ .*//")" npm start
```
