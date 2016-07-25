# koa-store-memcached

## 安装

```shell
npm install koa-store-memcached
```

## 配置
``` javascript
const session = require('koa-generic-session');
const MemcachedStore = require('koa-store-memcached');
app.use(session{
    store:new MemcachedStore(Server locations, options) //配置参考 memcached
})
```