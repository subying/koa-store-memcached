# koa-session-memcached

## 安装

```shell
npm install koa-session-memcached
```

## 配置
``` javascript
const session = require('koa-generic-session');
const MemcachedStore = require('./libs/sessionMemcached');
app.use(session{
    store:new MemcachedStore(Server locations, options) //配置参考 memcached
})
```