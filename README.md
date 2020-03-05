<p align="center">
  <a href="https://www.chihaiti.org/"><img align="center" width="160" height="160" src="https://i.imgur.com/02fwcFL.png"></a>
  <h2 align="center">Haiti Community Health Initiative Application</h2>
</p>
<p align="center">
  A containerized progressive web application paired with patient data management tooling built to serve the <a href="https://www.chihaiti.org/">Haiti Community Health Initiative</a> in their mission to help form healthy and self-directed communities in Haiti.
</p>

---

## Getting Started

The application runs on docker, which can be installed [here](https://docs.docker.com/install/).
If you're a linux user, you'll also need to install [docker-compose](https://docs.docker.com/compose/install/) separately. Otherwise, it's included in the Mac and PC versions of "Docker Desktop"

- The PWA and accompanying database can be started by running the command `docker-compose -f dev-docker-compose up` from the root directory.
  - `docker-compose -f dev-docker-compose up` will then stop the docker processes from running in the background.
- Once the images have been built and the processes started, the PWA can be seen at your localhost, at the port specified in [dev-docker-compose.yml](https://github.com/Haiti-Distributed-Healthcare-System/hdhs/blob/dev/dev-docker-compose.yml).
- More tips to troubleshoot docker are available [here](https://github.com/Haiti-Distributed-Healthcare-System/hdhs/wiki/Using-Docker).
