'use strict';
/**
 * @description koa session memcached
 * @author subying
 */

const Memcached = require('memcached');
var EventEmitter = require('events');

class sessionMemcached extends EventEmitter{
    constructor(serverLocations, options){
        super();
        var memcached = new Memcached(serverLocations, options);
        this.client = memcached;
        memcached.on('error', this.emit.bind(this, 'disconnect'));
        memcached.on('end', this.emit.bind(this, 'disconnect'));
        memcached.on('connect', this.emit.bind(this, 'connect'));
    }

    /*
     *@description 获取
     *@param key {String}
    */
    get(key){
        var memcached = this.client;
        return new Promise(function(resolve, reject) {
            memcached.get(key, function (err, data) {
              if(!err){
                  resolve(data);
              }else{
                  reject(err);
              }
            });
        });
    }

    /*
     *@description 设置
     *@param key {String}
     *@param value
     *@param expires {Number} 过期时间设置 单位为毫秒  因为koa-generic-session 默认的是毫秒,默认值是86400000（24小时）
    */
    set(key,value,expires){
        var memcached = this.client;
        return new Promise(function(resolve, reject) {
            // expires要转换成秒  因为memcached设置用的是秒
            memcached.set(key,value,expires/1000,function (err, data) {
              if(!err){
                  resolve(data);
              }else{
                  reject(err);
              }
            });
        });
    }

    /*
     *@description 删除
     *@param key {String}
    */
    destroy(key){
        var memcached = this.client;
        return new Promise(function(resolve, reject) {
            memcached.delete(key,function (err, data) {
              if(!err){
                  resolve(data);
              }else{
                  reject(err);
              }
            });
        });
    }
}

module.exports = sessionMemcached;