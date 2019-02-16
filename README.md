## moa hats

## prerequisitos

```instalar
$ sudo npm install -g yo generator-fwsp-hydra hydra-cli
```
info https://github.com/flywheelsports/hydra

tener redis preinstalado y corriendo info https://redis.io/topics/quickstart

## instalar proyecto

```
$ cd order-ad-service && npm install
```
corre en puerto 5000
```
node order-ad-service.js
```
```
$ cd order-pay && npm install
```
corre en puerto 3000
```
node index.js
```

## API

http://localhost:3000/order-pay?pageNo=5

http://localhost:3000/order-pay?pageNo=3&gt=400&lt=1000

http://localhost:5000/v1/order-ad?pageNo=1