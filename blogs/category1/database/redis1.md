---
title: redis使用教程
date: 2021-07-30
tags:
 - redis
categories:
 - 数据库相关
sidebar: auto
---

![vuepress](https://img.shields.io/badge/vuepress-0.14.8-brightgreen.svg)
![leancloud-storage](https://img.shields.io/badge/leancloud--storage-3.10.1-orange.svg)
![valine](https://img.shields.io/badge/valine-1.3.4-blue.svg)

::: tip redis简介
学习视频链接 [redis 狂神说](https://www.bilibili.com/video/BV1S54y1R7SB/) 来查看视频。
:::

## 大纲

**1.学习资料**
**2.掌握技能**
**3.学以致用**

## 内容


::: warning linux安装redis

 - 安装步骤：
   - 下载安装包：
   - 将安装包传到linux系统
   - [安装包](https://www.runoob.com/redis/redis-install.html)
 常用命令：通过指定的配置文件启动

 启动redis：redis-server /usr/local/redis/etc/redis.conf

 停止redis:pkill redis

 卸载redis:

 1. ​	rm -rf /usr/local/redis    //删除安装目录
 2.    rm -rf /usr/bin/redis-*   //删除所有redis相关命令脚本
 3.    rm -rf /root/download/redis-6.0.6  //删除redis解压文件夹

 检查后台进程是否存在

 ​	ps -ef | grep redis

 检查6379端口是否在监听

 ​	netstat -lntp | grep 6379

 关闭redis

 ​	redis-cli shutdown

 ​	redis-server

 :::

## 	1、学习资料：

::: theorem 视频资料

 - [学习视频](https://www.bilibili.com/video/BV1S54y1R7SB?from=search&seid=10108796014805883663) 
 - [学习文档](https://www.runoob.com/redis/redis-tutorial.html)

 在安装的时候make遇到的问题:没有名为XXX的成员。[解决的方案](https://blog.csdn.net/u010637366/article/details/107779134)
::: right
来自[ 安装详细文档 ](https://www.cnblogs.com/happywish/p/10944253.html)
:::

## 2、学习内容：

> Redis能干嘛？
>
> - 内存存储、持久化、内存中是断电即失，持久化很重要（rdb,aof）
> - 效率高，可以用于高速缓存
> - 发布订阅系统
> - 地图信息分析
> - 计时器，计数器

> - Redis优势：
>   - 性能高，读的速度是110000次/s，写的速度81000次/s
>   - 丰富的数据类型，支持二级制的Strings,Lists,hashes，Sets及Ordered Sets数据类型操作。
>   - 原子-Redis所有的操作都是原子性的，要么全部成功、要么全部失败。单操publish/subscribe通知,key过期等特性。

> Redis命令：
>
> - 客户端的基本语法：redis -cli
>   - 描述：该命令会连接本地的redis服务。
> - 测试redis服务是否启动：ping
>   - 描述：该命令用于检测redis服务是否启动。

> - 连接远程服务执行命令：
>   - redis -cli -h host  -p port -a psassword
>   - 例：redis -cli -h 127.0.0.1 -p 6379  -a "admin123"

| 名称                   | 作用                               |
| ---------------------- | ---------------------------------- |
| DEL key                | 该命令用于删除存在的key            |
| DUMP key               | 序列化给定key ，并返回被序列化的值 |
| EXISTS key             | 检查给定key是否存在                |
| EXPIREAT key timestamp | 用于为key设置过期时间              |
| TYPE key               | 返回key所存储的类型                |

Redis字符串的命令

| 名称                   | 作用                        |
| ---------------------- | --------------------------- |
| SET key value          | 设置指定key的值             |
| GETRANGE key start end | 返回 key 中字符串值的子字符 |
| GET key                | 获取指定 key 的值。         |

注意事项：

redis默认不是后台启动



> 命令：
>
> 1.  查看redis进程是否开启：ps -ef|grep redis


> 命令：
>
> 1. 关闭redis服务：shutdown

#### 3、 redis性能测试

:::danger
 测试性能命令
:::


```bash
#测试：100个并发连接 100000请求  在bin目录下
./redis-benchmark -h localhost -p 6379 -c 100 -n 100000
```


# 基础知识

::: tip 
 redis有16个数据库，默认使用第一个
 切换数据库：select 3
 查看数据库大小：d

 :::

```bash
127.0.0.1:6379> select 3  #切换数据库
127.0.0.1:6379[3]> dbsize #查看db大小
(integer) 0
127.0.0.1:6379[3]> 
127.0.0.1:6379[3]> set name qingjiang
OK
127.0.0.1:6379[3]> get name
"qingjiang"
127.0.0.1:6379[3]> dbsize
(integer) 1
127.0.0.1:6379[3]> 
127.0.0.1:6379[3]> keys *  #查看所有的key
1) "name"
127.0.0.1:6379> flushdb #清空当前的key
127.0.0.1:6379> keys *
(empty array)

```
::: theorem
 Redis是单线程！Redis是基于内存操做，CPU不是Redis的瓶颈，Redis的瓶颈是根据机器的内存和网络带宽，既可以使用单线程来实现。Redis是C语言写的。
 为什么单线程还那么快？

 误区1：高性能的服务器一定是多线程的。

 误区2：多线程（CPU）一定比单线程的效率高。

 CPU>内存>硬盘

 核心:将所有的数据放在内存中，所以使用单线程去操作效率是最高的，多线程（CPU上下文切换：耗时的操作）对于内存系统来说，没有上下文切换效率是最高的。
:::
```bash
127.0.0.1:6379> keys *  #查看所有的key
1) "name"
127.0.0.1:6379> EXISTS name #查看当前key是否存在
(integer) 1
127.0.0.1:6379> MOVE name 1 #移除当前key
(integer) 1
127.0.0.1:6379> get name
(nil)
127.0.0.1:6379> set name chenchunmei
OK
127.0.0.1:6379> get name 
"chenchunmei"
127.0.0.1:6379> EXPIRE name 10 #设置当前key的过期时间
(integer) 1
127.0.0.1:6379> ttl namw  #查看当前key的过期时间
(integer) -2
127.0.0.1:6379> ttl name
(integer) 3
127.0.0.1:6379> ttl name
(integer) -2
127.0.0.1:6379> get name
(nil)
127.0.0.1:6379> type age  #查看当前key的类型
string
127.0.0.1:6379> 


```

# 一、基本数据类型

## 1、Redis的类型（String(字符串)）

::: theorem String(字符串)
:::

```bash
127.0.0.1:6379> set view 0 #设置初始值为0
OK
127.0.0.1:6379> INCR view #自增1
(integer) 1
127.0.0.1:6379> get view  #获取
"1"
127.0.0.1:6379> incr view 
(integer) 2
127.0.0.1:6379> get view
"2"
127.0.0.1:6379> decr view #自减1
(integer) 1
127.0.0.1:6379> get view
"1"
127.0.0.1:6379> incrby view 10 #设置步长为10
(integer) 11
127.0.0.1:6379> decrby view 5 #减少步长5
(integer) 6

```

> 1、getrange  --获取范围的值
>
> 2、setrange -- 设置范围的值

```bash
127.0.0.1:6379> set key1 'chnchs'
OK
127.0.0.1:6379> get key1
"chnchs"
127.0.0.1:6379> GETRANGE key1 0 2 #截取从0开始[0,2]
"chn"
127.0.0.1:6379> SETRANGE key1 1 XXXX #替换
(integer) 6
127.0.0.1:6379> get key1
"cXXXXs"

```

> 1、setex (set with expire【到期】)  ---设置过期时间
>
> 2、setnx (set if not exits)                  --设置时是否存在

```bash
127.0.0.1:6379> setex name 10 name  #设置name的值为1且过期时间为10秒
OK
127.0.0.1:6379> get name
"name"
127.0.0.1:6379> ttl name
(integer) 1
127.0.0.1:6379> get name
(nil)
127.0.0.1:6379> setnx name 1	
(integer) 1
127.0.0.1:6379> get name
"1"
127.0.0.1:6379> setnx name 2 #如果name不存在则设置name的值为2，存在则不会管。
(integer) 0
127.0.0.1:6379> get name
"1"
127.0.0.1:6379> 

```

> 1、mset --设置多个值
>
> 2、mget -- 获取多个值

```bash
127.0.0.1:6379> mset key1 1 key2 2 key3 3 #设置多个值
OK
127.0.0.1:6379> mget key1 key2 key3 #获取多个值
1) "1"
2) "2"
3) "3"
127.0.0.1:6379> msetnx key1 name key4 4 #设置多个值，并判断是否存在，原子性，要是有一个存在，则另一个也不会添加成功
(integer) 0
127.0.0.1:6379> get key4
(nil)
127.0.0.1:6379> 

```

> 对象类型

```bash
127.0.0.1:6379> mset user:1:name chenchunmei user:1:age 2 #mset设置多个值来存一个对象
OK
127.0.0.1:6379> mget user:1:name user:1:age #获取多个值
1) "chenchunmei"
2) "2"
127.0.0.1:6379> 

```

> getset 	 --先get后set

```bash
127.0.0.1:6379> set name redis
OK
127.0.0.1:6379> getset name 3  #先获取值然后设置3
"redis"
127.0.0.1:6379> get name
"3"
127.0.0.1:6379> 
```

> String使用的场景：value除了是我们的字符串也可以是数字。
>
> 1. 计数器
> 2. 统计多单位计数的数量

## 2、Redis的类型（list（列表））

::: theorem list列表类型：所有的命令都是l开头的。
 1. lpush  ---从左边放数据
 2. rpush --从右边放数据
 3. lrange -- 从左边获取范围
:::


```bash
127.0.0.1:6379> lpush list one  #从左边放一个对象到list
(integer) 1
127.0.0.1:6379> lpush list two
(integer) 2
127.0.0.1:6379> lpush list three
(integer) 3
127.0.0.1:6379> LRANGE list 0 -1 #查询所有的数据
1) "three"
2) "two"
3) "one"
127.0.0.1:6379> rpush list the #从右边放一个对象到list
(integer) 4
127.0.0.1:6379> LRANGE list 0 -1
1) "three"
2) "two"
3) "one"
4) "the"
```

> 1. lpop --弹出第一个
> 2. rpop ---弹出最后一个
> 3. lindex --根据指定的索引获取值

```bash
127.0.0.1:6379> lrange list 0 -1
1) "tree"
2) "teo"
3) "one"
127.0.0.1:6379> lpop list #弹出第一个数据
"tree"
127.0.0.1:6379> LRANGE list 0 -1
1) "teo"
2) "one"
127.0.0.1:6379> rpop list #弹出最后一个
"one"
127.0.0.1:6379> LRANGE list 0 -1
1) "teo"
127.0.0.1:6379> rpush list after
(integer) 2
127.0.0.1:6379> LRANGE list 0 -1
1) "teo"
2) "after"
127.0.0.1:6379> lindex list 0 #根据索引获取值
"teo"
127.0.0.1:6379> 
```

> 1.  lrem -- 移除指定的值
> 2. ltrim -- 截取

```bash
127.0.0.1:6379> lrem list 1 after  #移除1个list值为after
(integer) 1
127.0.0.1:6379> LRANGE list 0 -1
1) "teo"
127.0.0.1:6379> LRANGE list 0 -1
1) "six"
2) "three"
3) "two"
4) "one"
127.0.0.1:6379> ltrim list 0 2  #截取列表从0到2的位置
OK
127.0.0.1:6379> LRANGE list 0 -1
1) "six"
2) "three"
3) "two"
```

> rpoplpush --移除第一个并放到另一个列表中

```bash
1) "six"
2) "three"
3) "two"
127.0.0.1:6379> rpoplpush list mylist #弹出最后一个放到新的列表中
"two"
127.0.0.1:6379> LRANGE mylist 0 -1
1) "two"
127.0.0.1:6379> 
```

> exists --判断列表是否存在
> lset -- 将列表中指定下标的值替换成另外的值 如果不存在列表就去更新就会报错。

```bash
127.0.0.1:6379> EXISTS list  #查询是否存在该列表
(integer) 1 #存在
127.0.0.1:6379> EXISTS list1 
(integer) 0 #不存在
127.0.0.1:6379> 
127.0.0.1:6379> lset list 1 1 #更新替换操作
OK
127.0.0.1:6379> LRANGE list 0 -1
1) "six"
2) "1"
127.0.0.1:6379> lset list1 0 2 #不存在则报错
(error) ERR no such key
127.0.0.1:6379> lset listt  3 3
(error) ERR no such key
```

> linsert -- 根据指定的值的前后插入值。

```bash
127.0.0.1:6379> linsert list after 1 9 #在值为1的后面添加9
(integer) 4
127.0.0.1:6379> LRANGE list 0 -1
1) "six"
2) "1"
3) "9"
4) "1"
```

> 小结：实际上list就是一个链表，相当于消息队列（lpush,rpop），栈（lpush,lpop）
## 3、Redis的类型（set（集合））

> set中的值不能重复。

> 1. sadd  --添加值
> 2. smembers -- 查看成员
> 3. sismenber -- 判断某个值是否在集合中。
> 4. scard -- 查看集合总数
> 5. srandmenber --随机抽选指定个数的元素

```bash
127.0.0.1:6379> sadd myset 1 2 3 #在set集合添加多个值
(integer) 3
127.0.0.1:6379> sadd myset 4 #set集合添加一个值
(integer) 1
127.0.0.1:6379> smembers myset #查看set集合中的所有元素
1) "1"
2) "2"
3) "3"
4) "4"
127.0.0.1:6379> sismember myset 2 #查看某个值是否存在该集合
(integer) 1
127.0.0.1:6379> scard myset #查看该集合的总数
(integer) 4
127.0.0.1:6379> srandmember myset 1 #随机查看集合的一个值
1) "1"
127.0.0.1:6379> srandmember myset 2#随机查看集合的两个值
1) "1"
2) "4"
```

> 1. spop --随机移除元素
> 2. smove -- 移动指定的元素
> 3. sdiff --取两个集合的差集
> 4. sinter -- 取两个集合的交集
> 5. sunion -- 去两两个集合的并集

```bash
127.0.0.1:6379> spop myset 1  #随机移除某个值
1) "3"
127.0.0.1:6379> smove myset myset3 4 #将某个值移动到指定的位置
(integer) 1
127.0.0.1:6379> sadd myset 1 2 3 4 5 
(integer) 5
127.0.0.1:6379> sdiff myset myset3 #取两个集合的差集
1) "1"
2) "2"
3) "3"
4) "5"
127.0.0.1:6379> sinter myset myset3 #取两个集合的交集
1) "4"
127.0.0.1:6379> sunion myset myset3 #取两个集合的并集
1) "1"
2) "2"
3) "3"
4) "4"
5) "5"
```

`微博的共同好友，可以将关注的人放在set集合，`

## 4、Redis的类型（hash(哈希)）

> Map集合，key-map!这个时候这个值是一个map集合
>
> set myhash field  

> 1. hset --设置一个值
> 2. hget --获取一个值
> 3. hmset --设置多个值
> 4. hmget --获取多个值
> 5. hgetall --获取全部的值
> 6. hlen --获取全部的长度
> 7. hexists --判断该指定的字段是否存在
> 8. hkeys --获取所有的键
> 9. hvals --获取所有的值

```bash
127.0.0.1:6379> hset mhash name 12  #设置单个值
(integer) 1
127.0.0.1:6379> hget mhash name  #获取单个值
"12"
127.0.0.1:6379> hmset user name chenchunmei age 22 sex 2 id 1 #设置多个值
OK
127.0.0.1:6379> hmget user name age sex id #获取多个值
1) "chenchunmei"
2) "22"
3) "2"
4) "1"
127.0.0.1:6379> hgetall user #获取所有的键值
1) "name"
2) "chenchunmei"
3) "age"
4) "22"
5) "sex"
6) "2"
7) "id"
8) "1"
127.0.0.1:6379> hlen user #获取该对象的长度
(integer) 4
127.0.0.1:6379> hexists user name #判断该hash中的某个字段是否存在 存在
(integer) 1
127.0.0.1:6379> hexists user sis #不存在
(integer) 0
127.0.0.1:6379> hkeys user #获取所有的键
1) "name"
2) "age"
3) "sex"
4) "id"
127.0.0.1:6379> hvals user #获取所有的值
1) "chenchunmei"
2) "22"
3) "2"
4) "1"
127.0.0.1:6379> hsetnx user class 1602 #给hash中添加一个值，判断是否存在，不存在添加，存在则不添加。
(integer) 1
127.0.0.1:6379> hsetnx user name lisi #存在
(integer) 0
```



`hash的做变更的数据user name age,尤其是用户信息的之类，hash更适合对象的存储，String更适合字符串存储 `

## 5、Redis的类型（Zset（有序集合））

> zadd -- 添加元素
>
> zrem -- 移除元素
>
> zrange -- 获取set的值范围
>
> zrangebysroce  key min max --根据分数进行排序
>
> zrangebyscore key mix max withscores --从小到大排序显示对应的值

```bash
127.0.0.1:6379> zadd salary 100000 zhangsan #给有序集合添加值
(integer) 1
127.0.0.1:6379> zadd salary 5000 lisi
(integer) 1
127.0.0.1:6379> zadd salary 100 wangwu
(integer) 1
127.0.0.1:6379> zrangebyscore salary -inf +inf #获取有序集合中的值，从小到大
1) "wangwu"
2) "lisi"
3) "zhangsan"
127.0.0.1:6379> ZRANGEBYSCORE salary -inf +inf withscores #根据分数获取有序集合中的值，并显示对应的分数
1) "wangwu"
2) "100"
3) "lisi"
4) "5000"
5) "zhangsan"
6) "100000"
127.0.0.1:6379> ZRANGEBYSCORE salary -inf 5000 #根据自定义的分数范围获取有序集合中的值
1) "wangwu"
2) "lisi"
127.0.0.1:6379> ZRANGE salary 0 -1 #根据范围获取值
1) "wangwu"
2) "lisi"
3) "zhangsan"127.0.0.1:6379> zrem salary zhangsan #移除指定的值
(integer) 1
127.0.0.1:6379> ZREVRANGE salary 0 -1  #从大到小排序
1) "lisi" 
2) "wangwu"
```

> zcount -- 获取指定区间的成员数量
>
> zcard --获取有序集合中的个数

```bash
127.0.0.1:6379> zcard salary  #查询有序集合的个数
(integer) 3
127.0.0.1:6379> zcount salary 100 5000 #查询指定范围的有序集合的个数
(integer) 2

```

`1、案例思路：set排序，存储班级成绩表，工资表排序`

`2、普通消息，重要消息，带权重进行判断`

`3、排行榜应用实现`

# 二、3种特殊数据类型

## 1、geospatial 地理位置

`朋友定位，附近的人，打车距离计算`

`Redis的Geo在Redis3.2版本就推出`

> 查询经纬度网站：https://map.yanue.net/     https://jingweidu.51240.com/

> 相关命令：
>
> 1. [GEOADD](http://www.redis.cn/commands/geoadd.html)   添加元素
> 2. [GEODIST](http://www.redis.cn/commands/geodist.html)  两个元素的直线距离
> 3. [GEOHASH](http://www.redis.cn/commands/geohash.html)
> 4. [GEOPOS](http://www.redis.cn/commands/geopos.html)
> 5. [GEORADIUS](http://www.redis.cn/commands/georadius.html)
> 6. [GEORADIUSBYMEMBER](http://www.redis.cn/commands/georadiusbymember.html)
>    - **m** 表示单位为米。
>    - **km** 表示单位为千米。
>    - **mi** 表示单位为英里。
>    - **ft** 表示单位为英尺。

```bash
127.0.0.1:6379> geoadd china 106.88 39.44 hainan  #添加单个
(integer) 1
127.0.0.1:6379> geoadd china 116.40 39.90 beijing 112.98 28.19 hunan  #添加多个
(integer) 2
127.0.0.1:6379> geodist china beijing haikou  #两个城市的直线距离 默认是m
"2284628.9907"
127.0.0.1:6379> geodist china beijing haikou km #可以使用km
"2284.6290"
127.0.0.1:6379> clear
127.0.0.1:6379> geopos china beijing  #获取指定城市的经度纬度
1) 1) "116.39999896287918091"
   2) "39.90000009167092543"
127.0.0.1:6379> geopos china changde
1) 1) "111.69000238180160522"
   2) "29.03999995808897694"
127.0.0.1:6379> 

```

> 查看附近的人？（获取所有附近的人的地址 ，定位）以半径来查询!

>

- `WITHDIST`: 在返回位置元素的同时， 将位置元素与中心之间的距离也一并返回。 距离的单位和用户给定的范围单位保持一致。
- `WITHCOORD`: 将位置元素的经度和维度也一并返回。
- `WITHHASH`: 以 52 位有符号整数的形式， 返回位置元素经过原始 geohash 编码的有序集合分值。 这个选项主要用于底层应用或者调试， 实际中的作用并不大。

命令默认返回未排序的位置元素。 通过以下两个参数， 用户可以指定被返回位置元素的排序方式：

- `ASC`: 根据中心的位置， 按照从近到远的方式返回位置元素。
- `DESC`: 根据中心的位置， 按照从远到近的方式返回位置元素。

```bash
127.0.0.1:6379> georadius china 110 30 1000 km  #当前位置查看半径为1000km的城市
 1) "changde"
 2) "wulumuqi"
 3) "shenzhen"
 4) "foshang"
 5) "guangzhou"
 6) "dongguang"
 7) "huizhou"
 8) "changsha"
 9) "hunan"
10) "wuhan"
127.0.0.1:6379> georadius china 110 30 1000 km  withdist #显示直线距离
 1) 1) "changde"
    2) "195.3333"
 2) 1) "wulumuqi"
    2) "195.3333"
 3) 1) "shenzhen"
    2) "923.9364"
 4) 1) "foshang"
    2) "836.0355"
 5) 1) "guangzhou"
    2) "831.7713"
 6) 1) "dongguang"
    2) "858.7908"
 7) 1) "huizhou"
    2) "886.7241"
 8) 1) "changsha"
    2) "352.6997"
 9) 1) "hunan"
    2) "352.6997"
10) 1) "wuhan"
    2) "417.0128"
127.0.0.1:6379> georadius china 110 30 1000 km withcoord #显示经纬度
 1) 1) "changde"
    2) 1) "111.69000238180160522"
       2) "29.03999995808897694"
 2) 1) "wulumuqi"
    2) 1) "111.69000238180160522"
       2) "29.03999995808897694"
 3) 1) "shenzhen"
    2) 1) "114.08000081777572632"
       2) "22.53999903789756587"
 4) 1) "foshang"
    2) 1) "113.12000066041946411"
       2) "23.01999918384158406"
 5) 1) "guangzhou"
    2) 1) "113.27999979257583618"
       2) "23.1199990030198208"
 6) 1) "dongguang"
    2) 1) "113.73999863862991333"
       2) "23.04000066850992567"
 7) 1) "huizhou"
    2) 1) "114.40999835729598999"
       2) "23.06999909343070243"
 8) 1) "changsha"
    2) 1) "112.9800000786781311"
       2) "28.1899989603527743"
 9) 1) "hunan"
    2) 1) "112.9800000786781311"
       2) "28.1899989603527743"
10) 1) "wuhan"
    2) 1) "114.29000169038772583"
       2) "30.58000021509926825"
127.0.0.1:6379> georadius china 110 30 1000 km withhash #显示hash
 1) 1) "changde"
    2) (integer) 4027471817678243
 2) 1) "wulumuqi"
    2) (integer) 4027471817678243
 3) 1) "shenzhen"
    2) (integer) 4046432296800546
 4) 1) "foshang"
    2) (integer) 4046507214514884
 5) 1) "guangzhou"
    2) (integer) 4046533745880732
 6) 1) "dongguang"
    2) (integer) 4046541105724241
 7) 1) "huizhou"
    2) (integer) 4046642968372034
 8) 1) "changsha"
    2) (integer) 4050890338582572
 9) 1) "hunan"
    2) (integer) 4050890338582572
10) 1) "wuhan"
    2) (integer) 4052121309572933
127.0.0.1:6379> georadius china 110 30 1000 km asc #按照距离升序排序
 1) "changde"
 2) "wulumuqi"
 3) "changsha"
 4) "hunan"
 5) "wuhan"
 6) "guangzhou"
 7) "foshang"
 8) "dongguang"
 9) "huizhou"
10) "shenzhen"
127.0.0.1:6379> georadius china 110 30 1000 km asc count 1 #根据1000km为半径升序排序只取1个城市
1) "changde"
127.0.0.1:6379> georadiusbymember china beijing 1000 km #位于指定元素周围的其他元素
1) "beijing"
2) "hainan"

```

>zrange --查看元素
>
>zrem --移除元素

```bash
127.0.0.1:6379> zrange china 0 -1 #查看所有元素
 1) "mulumuqishi"
 2) "xinjiang"
 3) "sanya"
 4) "dongfang"
 5) "ledong"
 6) "haikou"
 7) "changde"
 8) "wulumuqi"
 9) "hainan"
10) "shenzhen"
11) "foshang"
12) "guangzhou"
13) "dongguang"
14) "huizhou"
15) "changsha"
16) "hunan"
17) "wuhan"
18) "shanghai"
19) "beijing"
127.0.0.1:6379> zrem china sanya #移除指定元素
(integer) 1
```

## 2、Hyperloglog

> 什么是基数？ 不重复的元素，可以接受误差

A{1,3,5,7,9} 

B{1,3,4,7,8}

A和B的基数：5，8，9 

> 简介：
>
> ​	Redis2.8.9版本就更新了Hyperloglog数据结构
>
> ​	Redis Hyperloglog基数统计的算法
>
> ​	优点：占用的内存固定，2^64不同元素的基数，只需亚奥耗费12KB内存，从内存角度来考虑HyperLoglog是最佳的选择。
>
> 有0.81错误率，统计UV可以忽略不计。

> pfadd --添加元素
>
> pfcount --统计元素
>
> pfmegre --合并两个元素

```bash
127.0.0.1:6379> pfadd key1 a b c d e #添加元素
(integer) 1
127.0.0.1:6379> pfcount key1 #统计元素个数
(integer) 5
127.0.0.1:6379> pfadd key2 a b c t g 
(integer) 1
127.0.0.1:6379> pfmerge key3 key1 key2 #合并两个元素
OK
127.0.0.1:6379> pfcount key3
(integer) 6
```

`如果允许容错，就使用Hyperloglog,不允许就用set`

## 3、Bitmaps（位存储）

1. 统计用户信息：活跃，不活跃,登录、不登录，打卡、不打卡

> Bitmaps位图，数据结构，都是二进制位进行记录，就只有0和1两个状态。

```bash
127.0.0.1:6379> setbit sign 1 0 #设置每一天的值
(integer) 0
127.0.0.1:6379> setbit sign 2 1
(integer) 0
127.0.0.1:6379> setbit sign 3 1
(integer) 0
127.0.0.1:6379> setbit sign 4 1
(integer) 0
127.0.0.1:6379> setbit sign 5 1
(integer) 0
127.0.0.1:6379> setbit sign 6 0
(integer) 0
127.0.0.1:6379> getbit sign 1 #获取某一天是否打卡
(integer) 0
127.0.0.1:6379> getbit sign 3
(integer) 1
127.0.0.1:6379> bitcount sign #统计总共的情况
(integer) 4
```

# 三、事物

`Redis单条命令是保证原子性的，但是事物不保证原子性。`

`Redis事物没有隔离级别的概念，所有命令在事物中，并没有被执行，只有发起下执行命令的时候才会执行！Exec`

> Redis的事物本质：一组命令的集合!一个事物的所有命令都会被序列化，在事物执行的过程中，会按照顺序执行。一次性，顺序性，排他性，执行一系列命令！
>
> ----------队列 set set set --------

**Redis的事物**：

- 开启事物（multi）
- 命令入队（）
- 执行事物（exce）

> 正常执行事物！

  ```bash
127.0.0.1:6379> multi #开启事物
OK
127.0.0.1:6379> set key1 1 #命令入队
QUEUED
127.0.0.1:6379> set key2 2
QUEUED
127.0.0.1:6379> get key2
QUEUED
127.0.0.1:6379> exec #开启事物
1) OK
2) OK
3) "2"
  ```

> 放弃事物

```bash
127.0.0.1:6379> set key12 2222
QUEUED
127.0.0.1:6379> set key33 2
QUEUED
127.0.0.1:6379> discard  #放弃事物
```

> 编译型异常（代码有问题！命令有错），事物中所有的命令都不会被执行！

```bash
127.0.0.1:6379> multi #开启事物
OK
127.0.0.1:6379> set key1 1
QUEUED
127.0.0.1:6379> set key2 2
QUEUED
127.0.0.1:6379> getset key3 3
QUEUED
127.0.0.1:6379> setget key2 1 #错误命令
(error) ERR unknown command `setget`, with args beginning with: `key2`, `1`, 
127.0.0.1:6379> set key5 3
QUEUED
127.0.0.1:6379> exec #开启事物，事物也会报错
(error) EXECABORT Transaction discarded because of previous errors.
127.0.0.1:6379> get key5 #全部命令都没有执行
(nil)
```

> 运行时异常（1/0），如果事物队列中存在语法性，那么执行命令的时候，其他命令是可以正常执行，错误抛异常。

```bash
127.0.0.1:6379> set key "sdj" #设置字符串
OK
127.0.0.1:6379> multi #开启事物
OK
127.0.0.1:6379> 
127.0.0.1:6379> set key1 1
QUEUED
127.0.0.1:6379> incr key #字符串命令是不能自增，错误命令
QUEUED
127.0.0.1:6379> incr key1
QUEUED
127.0.0.1:6379> get key1
QUEUED
127.0.0.1:6379> exec #执行事物
1) OK
2) (error) ERR value is not an integer or out of range #错误命令报错 运行时异常，其他命令正常执行，错误命令抛异常。
3) (integer) 2
4) "2"

```

> 监控（watch）：
>
> ​	悲观锁： 
>
> ​	乐观锁：获取version,更新时候比较version。

> Redis的监视性能测试  ！

```bash
127.0.0.1:6379> set money 100 #设置100元
OK
127.0.0.1:6379> watch money #监控money
OK
127.0.0.1:6379> multi #开启事务
OK
127.0.0.1:6379> decrby money 20 #减少20
QUEUED
127.0.0.1:6379> set out 2o
QUEUED
127.0.0.1:6379> set out 20
QUEUED
127.0.0.1:6379> exec #执行事物 输出表示正常执行事物
1) (integer) 80
2) OK
3) OK
```

> 多线程执行事物：

```bash
127.0.0.1:6379> watch money  #新线程监控money这个元素
OK
127.0.0.1:6379> multi #开启事物
OK
127.0.0.1:6379> decrby money 10 #减少10块
QUEUED
127.0.0.1:6379> set out 10
QUEUED
127.0.0.1:6379> get out
QUEUED
127.0.0.1:6379> exec #另外一个线程先将money设置为100,然后再执行exec这个事物
(nil) #事物执行失败
```

`要想正常执行，首先放弃该锁，再重新监控该元素`

```bash
127.0.0.1:6379> unwatch #放弃该锁（解锁）
OK
127.0.0.1:6379> watch money #重新监控
OK
127.0.0.1:6379> multi #开启事物
OK
127.0.0.1:6379> decrby money 10 #减少10
QUEUED
127.0.0.1:6379> exec #执行
1) (integer) 90 #成功执行
```

**如果修改失败获取最新的锁就可以**

# 四、Jedis

> 使用Java操作Redis
>
> 简介：什么是Jedis是Redis官方推荐的java连接Redis的开发工具，使用java操作Redis的中间件！如果你要使用Java连接Redis,那么一定要使用Jedis.

maven仓库：https://mvnrepository.com/

> 测试连接

```java
public class TestJedis {

    public static void main(String[] args) {
        //创建Jedis对象
        Jedis jedis = new Jedis("127.0.0.1",6379);
        //测试连接
        System.out.println(jedis.ping());
    }
}
```

![image-20200824164116313](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200824164116313.png)

> 基础命令

```java
public class TestBase {

    public static void main(String[] args) {
        //创建Jedis对象
        Jedis jedis = new Jedis("127.0.0.1",6379);
        System.out.println(jedis.flushDB());
        System.out.println(jedis.get("username"));
        System.out.println(jedis.set("username","chenchunmei"));
        System.out.println(jedis.get("username"));
        System.out.println(jedis.keys("*"));
    }
}
```

> 输出

![image-20200824171604115](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200824171604115.png)



# 五、SpringBoot整合

## 1、快速入门

SpringtBoot 操作数据和：Spring-data jpa  jdbc mongodb redis!

SpringData也是和SpringBoot齐名的项目！

说明：在SpringBoot2.x之后，原来使用的jedis被替换为lettuce

- `jedis:直连，多个线程操作不安全的，如果想避免不安全，使用jedis pool连接池！BIO模式`

- `lettuce:采用netty，实例可以再多线程中进行共享，不存在线程不安全的情况，可以减少线程数量，像NIO模式 `

> 源码分析

```java
@Configuration(proxyBeanMethods = false)
@ConditionalOnClass(RedisOperations.class)
@EnableConfigurationProperties(RedisProperties.class)//两个连接redis的对象，新版本使用的都是lettuce
@Import({ LettuceConnectionConfiguration.class, JedisConnectionConfiguration.class })
public class RedisAutoConfiguration {

	@Bean//项目不存在这个对象的时候才创建该对象，可以自定义创建该对象替换掉。
	@ConditionalOnMissingBean(name = "redisTemplate")
    //RedisTemplate<Object, Object>这两个泛型都是Object类型，不符合常用的泛型，可自定义成我们常用的<String,Object>泛型
	public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory)
			throws UnknownHostException {
		RedisTemplate<Object, Object> template = new RedisTemplate<>();
		template.setConnectionFactory(redisConnectionFactory);
		return template;
	}

	@Bean
	@ConditionalOnMissingBean//字符串使用的模板，字符串常使用，所以单独提出成为一个bean对象
	public StringRedisTemplate stringRedisTemplate(RedisConnectionFactory redisConnectionFactory)
			throws UnknownHostException {
		StringRedisTemplate template = new StringRedisTemplate();
		template.setConnectionFactory(redisConnectionFactory);
		return template;
	}

}
```

> 整合测试

1.入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
    <optional>true</optional>
</dependency>
```

​	2.配置连接

```properties
#常用配置
spring.redis.url=127.0.0.1
spring.redis.port=6379
```

1. 测试

```java
//注入RedisTemplate对象
@Autowired
private RedisTemplate redisTemplate;

@Test
void contextLoads() {
    //String类型
    redisTemplate.opsForValue().set("name","chenchunmei");
    //list类型
    redisTemplate.opsForList().leftPop("name");
    //hash类型
    redisTemplate.opsForHash().get("name","hsh");
    //Set类型
    redisTemplate.opsForSet().add("name","chenchu");
    //Zset类型
    redisTemplate.opsForZSet().add("name","sgd",1);
    System.out.println(redisTemplate.opsForValue().get("name"));
}

```

`对象错误用法`

```java
 @Test
public void test() throws JsonProcessingException {
	//创建一个对象
    User u = new User("陈出出",16);
    //通过序列化
    String objectJson = new ObjectMapper().writeValueAsString(u);
    //放到redis的还是对象，并没有放序列化后的String
    redisTemplate.opsForValue().set("user",u);
    System.out.println(redisTemplate.opsForValue().get("user"));
}
```

`报错：没有序列化对象就将对象放到redis则会报错`

> 解决方案：
>
> - 在对象中实现Serializable这个j接口。
> - 直接使用new ObjectMapper().writeValueAsString(对象)来实现序列化。

![image-20200825145537191](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200825145537191.png)

`且redis中的key是转义的码`

![image-20200825150014642](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200825150014642.png)

**出现原因是因为使用的是SpringBoot自带的RedisTemplate这个对象**`接下来使用自定义的redisTemplate对象就解决了以上的问题`

## 2、自定义template

```java
/**
 * @Author chenchunmei
 * @Date 2020/8/25 15:05
 * @Version 1.0
 * 自定义的RedisTemplate对象,固定模板，企业中常用
 */
@Configuration
public class RedisConfig {
    @Bean
    @SuppressWarnings("all")//错误什么都警告
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<String, Object>();
        template.setConnectionFactory(factory);
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(om);
        StringRedisSerializer stringRedisSerializer = new StringRedisSerializer();

        // key采用String的序列化方式
        template.setKeySerializer(stringRedisSerializer);
        // hash的key也采用String的序列化方式
        template.setHashKeySerializer(stringRedisSerializer);
        // value序列化方式采用jackson
        template.setValueSerializer(jackson2JsonRedisSerializer);
        // hash的value序列化方式采用jackson
        template.setHashValueSerializer(jackson2JsonRedisSerializer);
        template.afterPropertiesSet();
		//返回template对象
        return template;
    }
}

```

`执行后不会在有转义码`

![image-20200825155001858](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200825155001858.png)

## 3、Redis工具类

```java
package com.logpass.toolkit.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;

/**
 * @Author chenchunmei
 * @Date 2020/8/25 15:56
 * @Version 1.0
 * Redis封装工具类
 */
@Component
public final class RedisUtil {

    @Autowired
    private RedisTemplate<String,Object> redisTemplate;

    //============================common============================

    /**
     * 指定缓存的失效时间
     * @param key 键
     * @param time 失效时间
     * @return
     */
    public boolean expire(String key, long time){
        try{
            //判断当前传入的时间是否大于0
            if(time > 0){
                //使用原生的方法，TimeUnit.SECONDS时间单位是以秒为单位
                redisTemplate.expire(key,time, TimeUnit.SECONDS);
            }
            return true;
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 根据key获取过期时间
     * @param key 键不能为null
     * @return 返回时间（秒）返回0代表为永久有效
     */
    public long getExpire(String key){
        return redisTemplate.getExpire(key,TimeUnit.SECONDS);
    }

    /**
     * 根据指定的key判断是否存在该key
     * @param key 判断的key
     * @return true：存在 false:不存在
     */
    public boolean hasKey(String key){
        try{
            return redisTemplate.hasKey(key);
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 测试连接是否连接上redis
     * @return 返回pong表示连接成功
     */
    public String ping(){
        try{
            return redisTemplate.getConnectionFactory().getConnection().ping();
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @SuppressWarnings("unchecked")
    public void del(String... key){
        if(key != null && key.length > 0){
            if(key.length == 1){//如果只有一个就删除第一个
                redisTemplate.delete(key[0]);
            } else {//如果是一个数组就转成List进行清空
                redisTemplate.delete(CollectionUtils.arrayToList(key));
            }
        }
    }

    //============================String==============================

    /**
     * 根据指定的key获取String类型的值。
     * @param key 键
     * @return 返回对应key的缓存值
     */
    public Object get(String key){
        return key == null ? null : redisTemplate.opsForValue().get(key);
    }

    /**
     * 普通缓存存入
     * @param key 键
     * @param value 值
     * @return 返回是否存储成功 true:成功 false :失败
     */
    public boolean set(String key, Object value){
        try{
            redisTemplate.opsForValue().set(key,value);
            return true;
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }
    }


    /**
     * 普通缓存放入并设置过期时间
     * @param key 键
     * @param value 值
     * @param time 过期时间
     * @return 返回是否成功 true:成功 false:失败
     */
    public boolean set(String key, Object value, long time){
        try{
            //时间大于0才设置过期时间
            if(time > 0){
                redisTemplate.opsForValue().set(key,value,time,TimeUnit.SECONDS);
            } else {
                redisTemplate.opsForValue().set(key,value);
            }
            return true;
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 递增
     * @param key 键
     * @param delta 要增加的数量（必须大于0）
     * @return 返回最后的值
     */
    public long incr(String key, long delta){
        if (delta < 0) {
            throw new RuntimeException("递增因子必须大于0");
        }
        return redisTemplate.opsForValue().increment(key,delta);
    }
    //递减
//    public long decr(String key, long delta){
//        if(delta < 0){
//            throw new RuntimeException("递减因子必须大于0");
//        }
//        return redisTemplate.opsForValue().decrement(key, -delta);
//    }

    //==============================Map===================================

    /**
     * 获取hashGet
     * @param key 键 不能为null
     * @param item 项 不能为null
     * @return 返回对应的值
     */
    public Object hget(String key, String item){
        return redisTemplate.opsForHash().get(key,item);
    }

    /**
     * 获取hashkey对应的键值
     * @param key 键
     * @return 对应的多个键值
     */
    public Map<Object,Object> hmget(String key){
        return redisTemplate.opsForHash().entries(key);
    }

    /**
     * hashset多个键值
     * @param key 键
     * @param map 对应的键值
     * @return
     */
    public boolean hmset(String key, Map<String,Object> map){
        try{
            redisTemplate.opsForHash().putAll(key,map);
            return true;
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }
    }

    /**
     * hashset并设置时间
     * @param key 键
     * @param map 对应多个键值
     * @param time 过期时间
     * @return true:成功 false:失败
     */
    public boolean hmset(String key, Map<String,Object> map, long time){
        try{
            redisTemplate.opsForHash().putAll(key,map);
            if(time > 0){
                expire(key,time);
            }
            return true;
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 向一张hash表中放入数据，如果不存在将创建
     * @param key 键
     * @param item 项
     * @param value 值
     * @return true 成功 false:失败
     */
    public boolean hset(String key, String item, Object value){
        try{
            System.out.println(key);
            System.out.println(item);
            System.out.println(value);
            Object u = "3773";
            redisTemplate.opsForHash().put("key","item",u);
            redisTemplate.opsForHash().put(key,item,value);
            return true;
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 向一张表中放入数据，如果不存在将创建
     * @param key 键
     * @param item 项
     * @param value 值
     * @param time 时间（秒）注意：如果已存在的hash表有时间，这里的时间就会替换原有的时间
     * @return true 成功 false 失败
     */
    public boolean hset(String key, String item, Object value, long time){
        try{
            redisTemplate.opsForHash().put(key,item,value);
            if(time > 0){
                expire(key,time);
            }
            return true;
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 删除hash表中的值
     * @param key 键 不能为null
     * @param item 项 可以是多个不能为空
     */
    public void hdel(String key, Object... item){
        redisTemplate.opsForHash().delete(key,item);
    }

    /**
     * 判断hash表中是否有该项的值
     * @param key 键
     * @param item 项
     * @return true 存在 false 不存在
     */
    public boolean hHasKey(String key, String item){
        return redisTemplate.opsForHash().hasKey(key,item);
    }

    /**
     * hash递增 如果不存在，就会创建一个，并将新增后的值返回
     * @param key 键
     * @param item 项
     * @param by 自增的数量
     * @return 返回自增后的值
     */
    public double hinrc(String key, String item, double by){
        if(by < 0){
            throw new RuntimeException("自增的因子要大于0");
        }
        return redisTemplate.opsForHash().increment(key,item,by);
    }

    /**
     * 递减 如果不存在就会创建一个，并返回递减后的值
     * @param key 键
     * @param item 项
     * @param by 递减数量
     * @return 返回递减后的值
     */
    public double hdecr(String key, String item, double by){
        if(by < 0){
            throw new RuntimeException("递减因子要小于0");
        }
        return redisTemplate.opsForHash().increment(key,item, -by);
    }

    //-======================set======================================
    /**
     * 根据key获取所有的Set中的值
     * @param key 键
     * @return 返回所有键中的值
     */
    public Set<Object> sGet(String key){
        try{
            return redisTemplate.opsForSet().members(key);
        }catch(Exception e){
            e.printStackTrace();;
            return null;
        }
    }

    /**
     * 根据value从一个set中查询，是否存在
     * @param key 键
     * @param value 值
     * @return true 存在 false 不存在
     */
    public boolean sHasKey(String key, Object value){
        try{
            return redisTemplate.opsForSet().isMember(key,value);
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 将数据放入缓存 可以多个值一起放
     * @param key 键
     * @param values 值 可以是多个
     * @return 返回该key存储的总个数
     */
    public long sSet(String key, Object... values){
        try{
            return redisTemplate.opsForSet().add(key,values);
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 将set数据放入缓存
     * @param key 键
     * @param time 时间 （秒）
     * @param values 值，可以多个
     * @return 返回成功的个数
     */
    public long sSetAndTime(String key, long time, Object... values){
        try{
            long count = redisTemplate.opsForSet().add(key,values);
            if(time > 0)
                expire(key,time);
            return count;
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 获取set缓存的长度
     * @param key 键
     * @return 返回长度
     */
    public long sGetSetSize(String key){
        try{
            return redisTemplate.opsForSet().size(key);
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 移除值为value的
     * @param key 键
     * @param values 值可以多个
     * @return 移除的个数
     */
    public long setRemove(String key,Object... values){
        try{
            long count = redisTemplate.opsForSet().remove(key,values);
            return count;
        }catch(Exception e){
            e.printStackTrace();;
            return 0;
        }
    }
 //===============================list=========================

    /**
     * 获取list缓存的内容
     * @param key 键
     * @param start 开始
     * @param end 结束 0 -1表示获取所有值
     * @return 返回获取值的范围
     */
    public List<Object> lGet(String key, long start, long end){
        try{
            return redisTemplate.opsForList().range(key,start,end);
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 获取list缓存的长度
     * @param key 键
     * @return 返回长度
     */
    public long lGetListSize(String key){
        try{
            return redisTemplate.opsForList().size(key);
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 通过索引获取list中的值
     * @param key 键
     * @param index 索引 index >= 0时， 0表头 1第二个元素
     * @return
     */
    public Object lGetIndex(String key, long index){
        try{
            return redisTemplate.opsForList().index(key,index);
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 将list放入缓存
     * @param key 键
     * @param value 值
     * @return
     */
    public boolean lSet(String key, Object value){
        try{
            redisTemplate.opsForList().rightPush(key,value);
            return true;
        }catch(Exception e){
            e.printStackTrace();;
            return false;
        }
    }

    /**
     * 将list放入缓存中，设置过期时间
     * @param key 键
     * @param value 值
     * @param time 过期时间
     * @return
     */
    public boolean lSet(String key, Object value, long time){
        try{
            redisTemplate.opsForList().rightPush(key,value);
            if(time > 0){
                expire(key,time);
            }
            return true;
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 根据索引修改list集合中的某条数据
     * @param key 键
     * @param index 索引
     * @param value 值
     * @return true 成功  false失败
     */
    public boolean lUpdateIndex(String key, long index, Object value){
        try{
            redisTemplate.opsForList().set(key,index,value);
            return true;
        }catch(Exception e){
            e.printStackTrace();
            return  false;
        }
    }

    /**
     * 移除N个值为value
     * @param key 键
     * @param count 移除多少个
     * @param value 值
     * @return 返回移除的个数
     */
    public long lRemove(String key, long count, Object value){
        try{
            return redisTemplate.opsForList().remove(key,count,value);
        }catch (Exception e){
            e.printStackTrace();
            return 0;
        }
    }

}

```



# 六、Redis.conf详解

启动时，就使用到配置文件。

![image-20200826232137597](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200826232137597.png)

- 配置文件unit单位对大小写不敏感

> 包含：可以导入多个配置文件，类似java的import

![image-20200826232410831](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200826232410831.png)

> 网络：

```bash
bind 127.0.0.1  #绑定ip
protected-mode yes #受保护模式
port 6379 #端口设置
```

> 通用（GENERAL）

```bash
daemonize yes  #以守护进程的方式运行，默认是no,我们需要自己配置为yes
supervised no #管理守护进程，默认是no,一般不用动
pidfile /var/run/redis_6379.pid #如果以后台的方式运行，我们就需要指定一个pid的进程文件
#日志
# Specify the server verbosity level.
# This can be one of:
# debug (a lot of information, useful for development/testing)
# verbose (many rarely useful info, but not a mess like the debug level)
# notice (moderately verbose, what you want in production probably) ---生产环境
# warning (only very important / critical messages are logged) 
loglevel notice
logfile "" #默认生成日志一个文件位置
databases 16 #数据库的数量，默认16个数据库
always-show-logo yes #是否开启logo，就是开启redis服务器的那个图案
```

> 快照(SNAPSHOTTING)：持久化，在规定的时间内，执行了多少次操作，则会持久化到文件.rdb.aof
>
> redis是内存数据，如果没有持久化，断电数据即失。

```bash
save 900 1  # 900秒内，如果至少有一个key进行了修改，那么我们就进行持久化操作。
save 300 10  #在300秒内，如果有10个key进行了修改，那么就进行持久化操作
save 60 10000  # 在60秒内，至少有10000key进行了修改，进行持久化操作
stop-writes-on-bgsave-error yes #如果持久化失败，是否需要继续工作，默认是开启
rdbcompression yes  #是否压缩rdb文件，要消耗cpu资源
rdbchecksum yes	#保存rdb文件时，进行错误的检查校验
dir ./ #rdb文件保存的目录

```

> REPLICATIO复制，





> SECURITY（安全）
>
> 密码：默认没有密码

```bash
config get requirepass #获取redis密码
config set requirepass "123456" #设置redis密码
auth 123456  #授权
```

> CLIENTS客户端限制

```bash
maxclients 10000   #设置能连接上redis的最大客户端的数量
maxclients 10000   #redis配置最大的内存容量
maxmemory-policy noeviction #内存到达上限之后的处理策略
1、volatile-lru：只对设置了过期时间的key进行LRU（默认值） 
2、allkeys-lru ： 删除lru算法的key   
3、volatile-random：随机删除即将过期key   
4、allkeys-random：随机删除   
5、volatile-ttl ： 删除即将过期的   
6、noeviction ： 永不过期，返回错误

```

> APPEND ONLY MODE 模式 aof配置

```bash
appendonly no  #默认是不开启的aof模式，默认是使用rdb方式持久化的，在大部分所有情况下，rdb是够用的。
appendfilename "appendonly.aof" #持久化文件名

# appendfsync always  #每次修改都会sync消耗性能
appendfsync everysec #每秒执行一次sync 可能会丢失1s的数据
# appendfsync no #不执行 sync 这个时候操作系统自己同步数据，速度最快

```





# 七、Redis持久化

`Redis是内存数据库，如果不将内存中的数据保存到磁盘中一旦数据库宕机，或进程退出，服务器中的数据库就会消失，所以Redis支持持久化功能。`

## 1、RDB（redis DataBase）

> 什么是RDB?

![image-20200827113544075](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200827113544075.png)

在指定的时间间隔内将内存中的数据集快照写到磁盘，也就是Snapshot快照，它恢复时是直接将快照文件读取到内存里。Redis会单独创建fork一个子进程来进行持久化，会将数据先写入到一个临时文件中，待持久化过程结束，再将这个临时文件替换上次持久化好的文件，在整个过程中主进程是不参与任何IO的 操作，确保了极高的性能。如果要进行大规模数据的回复，且对数据回复的完整性不是非常敏感，那RDB方式要比AOF方式更加高效，RDB的缺点是最后一次持久化后的数据可能丢失。我们能默认的就是RDB，一般情况下不需要修改配置。

有时候在生产环境我们会将这个文件进行备份！

`rdb保存的持久化文件是dump.rdb`在我们的配置文件中快照进行配置。

![image-20200827143614955](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200827143614955.png)

> 触发机制
>
> - save的规则满足情况下，就会自动触发rdb规则，产生持久化
>
> - 执行flushall命令，就会触发rdb持久化
>
> - 退出redis,也会产生rdb文件
>
>   `备份就会生成一个dump.rdb文件`

- 将配置文件中rdb的持久化配置改为save 60 5（一分钟内修改五次就进行持久化操作）
- 在redis中执行save命令。
- 删除原有的dump.rdb文件
- 重启redis服务器
- 修改五次key

![image-20200827150602668](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200827150602668.png)

- 查看redis安装的bin目录。

![image-20200827150407899](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200827150407899.png)

- 恢复原来的配置

> 如何恢复rdb文件

- 只需要将rdb文件放在redis启动的目录，redis启动就会自动检查dump.rdb恢复其中的数据。
- 查看需要存放的位置

```bash
127.0.0.1:6379> config get dir #获取存放的路径
1) "dir"
2) "/usr/local/redis/bin"
```

**优点**：

1. 适合大规模的数据恢复！
2. 对数据的完整性不高！

**缺点**：

1. 需要一定的时间间隔操作！如果redis宕机，最后一次修改的数据就没有了！！
2. fork进行时，需要占用一定的内存空间！！

## 2、AOF(APPEND ONLY MODE)

将我们的所有命令都记录下来，history,恢复的时候把这个文件全部都执行一遍！

在主从复制中，rdb就是用来备份的！！！

![image-20200827163625649](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200827163625649.png)

以日志的形式来记录每一个写操作，将Redis执行过的所有命令记录下来（读操作不记录），只许追加文件，不可修改文件，redis启动之初会读取该文件重构数据，总

而言之，就是redis重启根据日志文件的内容从头到尾将所有命令执行一遍，已完成数据的恢复。

AOF保存的是appendonly.aof文件。配置文件中AOF模式==默认不开启的==

> 开启aof

![image-20200827182804113](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200827182804113.png)

```bash
127.0.0.1:6379> save #保存配置
OK
127.0.0.1:6379> SHUTDOWN #重启服务器
not connected> exit
```

查看bin目录是否存在==appendonly.aof==文件。==注意：测试完恢复配置文件原样==

> appendonly.aof文件中存放的都是执行过的指令。

![image-20200827183129458](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200827183129458.png)

> 测试appendonly.aof文件中有错误的命令。

- appendonly.aof文件被破坏
- 执行该命令恢复==redis-check-aof  --fix appendonly.aof==

> 优点和缺点

```bash
appendonly no  #默认是不开启的aof模式，默认是使用rdb方式持久化的，在大部分所有情况下，rdb是够用的。
appendfilename "appendonly.aof" #持久化文件名

# appendfsync always  #每次修改都会sync消耗性能
appendfsync everysec #每秒执行一次sync 可能会丢失1s的数据
# appendfsync no #不执行 sync 这个时候操作系统自己同步数据，速度最快
```

**优点**：

1. 每一次修改都会同步，文件的完整性会更好。
2. 每秒都同步一次，可能会丢失一秒的数据。
3. 从不同步，效率更高！

**缺点**：

1. 相对与数据文件来说，aof远远大于rdb，修复的速度比rdb慢！
2. aof运行效率也要比rdb慢，所以我们的redis默认的配置就是rdb持久化。

> 重写规则说明！
>
> ​	aof默认就是文件的无限追加！文件就会越来越大！！！

![image-20200827191140304](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200827191140304.png)

如果文件的大小大于64m，就会fork一个新的进程来将我们的文件进行重写！！！

**扩展：**

1. RDB持久化方式能够在指定时间间隔内对你的数据进行快照存储！
2. AOF持久化方式记录每一次对服务器的写操作，当服务器重启的时候就会重新执行这些命令恢复原始的数据，AOF命令以Redis协议追加保存每次写的操作到文件末尾，Redis还能对AOF文件进行后台重写，使得AOF文件的体积不至于过大。
3. 只做缓存，如果你只希望你的数据在服务器运行的时候存在，你也可以不使用任何持久化。
4. 同时开启两种持久化方式
   - 在这种情况下，当Redis重启的时候会优先使用AOF文件来恢复原始的数据，因为在通常情况下AOF文件保存的数据集要比RDB文件保存的数据集更加完整。
   - RDB的数据不实时，同时使用两者时服务器重启也只会找AOF文件，那要不要只使用AOF呢？建议不要！！！因为RDB更合适用于备份数据库（AOF在不间断变化不好备份），快速重启，而且不会有AOF可能潜在的Bug,留着作为一个万一的手段。
5. 性能建议
   - 因为RDB文件只用作备份用途，建议只在Slave上持久化RDB文件，而且只要15分钟备份一次就够了，只保留save 900 1这一条规则。
   - 如果Enable AOF,好处是在最恶劣情况下也只会丢失不超过两秒数据，启动脚本较简单只load自己的AOF文件就可以，代价一是带来了持续的IO，二是AOFrewrite的最后将rewrite过程中产生的新数据写到新文件造成阻塞几乎是不可能避免的。只要硬盘允许，应该尽量减少AOFrewrite的频率，AOF重写的基础大小默认值为64太小，可以设置到5G以上。默认超过原大小100%大小重写可以改到适当的数值。
   - 如果不Enable AOF 仅靠Master-Slave Repllcation实现高可用性也可以，能省掉一大笔IO,也减少了rewrite时带来的系统波动。代价是如果Master/Slave同时倒掉，会丢失十几分钟的数据，启动脚本也要比较两个Master（主）/Slave（从）中的RDB文件，载入较新的那个，微博就是这种架构。





# 八、Redis发布订阅

Redis发布订阅（pus/sub）是一种==消息通信模式==：发送者（pub）发送消息，订阅者（sub）接收消息。微信、微博、关注系统！

Redis客户端可以订阅任意数量的频道。

订阅/发布消息图：

第一个：消息发送者，第二个：消息订阅者

![image-20200827195103328](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200827195103328.png)

下图展示了频道channel1,可以订阅这个频道的三个客户端----client2、clinet5和client1之间的关系：

![image-20200827195242058](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200827195242058.png)

当有新消息通过PUSHLISH命令发送命令给频道channel1时，这个消息就会被发送给订阅它的三个客户端。

![image-20200827195640040](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200827195640040.png)

> 命令

这些命令被广泛用于构建即时通信应用，比如网络聊天室（chatroom）和实时广播、实时提醒等。

![image-20200827195922411](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200827195922411.png)

> 测试

- 第一步订阅频道(订阅端)

```bash
127.0.0.1:6379> SUBSCRIBE xuexijava #订阅频道
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "xuexijava"
3) (integer) 1
##等待读取发送者的信息
1) "message"
2) "xuexijava"
3) "hello xuexijava"
1) "message"
2) "xuexijava"
3) "hello xuexijava1"
```

- 第二步发送消息（发送端）

```bash
127.0.0.1:6379> PUBLISH xuexijava "hello xuexijava"
(integer) 1
127.0.0.1:6379> PUBLISH xuexijava "hello xuexijava1"
(integer) 1
```

> 原理

Redis是使用C实现的，通过分析Redis源码里pubsub.c文件，了解发布和订阅机的底层实现，即此加深对Redis的理解。

Redis通过PUBLISH、SUBSCRIBE和PSUBSCRIBE等命令实现发布和订阅功能。

微信：

通过==SUBSCRIBE==命令订阅某频道后，redis-server里维护一个字典，字典的键就是一个个频道！而字典的值则是一个链表，链表中保存了所有订阅这个channel的客户端。SUBSCRIBE命令的关键，就是将客户端给定channel的订阅链表中。

![image-20200827203630354](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200827203630354.png)

通过PUBLISH命令向订阅者发送消息，redis-server会使用给定的频道作为键，在它维护的channel字典查找记录了订阅这个频道的所有客户端的链表，遍历这个链表，将消息发送给订阅者。

pub/sub从字面上理解就是发布（publish）与订阅（subscribe）在Redis中，你可以设定对某一个key值进行消息发布及消息订阅，当一个key值上进行了消息发布后，所有订阅它的客户端都会收到相应的消息。这一功能最明显的用法就是用实时消息系统，比如普通即时聊天，群聊等功能。

**使用场景：**

1. 实时消息系统！
2. 实时聊天
3. 订阅、关注系统
4. 稍微复杂的场景我们就会使用消息中间件（MQ、KAFKA）

# 九、Redis主从复制

## 概念

​	主从复制，是指将一台Redis服务器的数据，复制到其他的Redis服务器，前者称为主节点（master/leader），后者称为从节点（slave/follower）;==数据的复制是单向的，只能从主节点到从节点。Master以写为主，Slave以读为主==。

==默认情况下，每台Redis服务器都是主节点==；且一个主节点可以有多个从节点（或没有从节点），但一个从节点种子能有一个主节点。

### 主从复制的作用主要包括：

1. 数据冗余：主从复制实现了数据的热备份，是持久化之外的一种数据冗余方式。
2. 故障恢复：当主节点出现问题时，可以由从节点提供服务，实现快速的故障恢复；实际上是一种服务的冗余。
3. 负载均衡：在主从复制的基础上，配合读写分离，可以由主节点提供写服务，由从节点提供读服务。（即写Redis数据时应用连接主节点，读redis数据时应用连接从节点），分担服务器负载；尤其是在写少读多的场景下，通过多个从节点分担读负载，可以大大提高Redis服务器的并发量。
4. 高可用（集群）基石：除了上述作用以外，主从复制还是哨兵和集群能够实施的基础，因此说主从复制是Redis高可用的基础。

一般来说，要将Redis运用于工程项目中，只使用一台Redis是万万不能宕机，原因如下：

1. 从结构上，单个Redis服务器会发生单点故障，并且一台服务器需要处理所有的请求负载，压力较大；

2. 从容量上 ，单个Redis服务器的内存容量有限，就算一台服务器内存容量为256G，也不能将所有内存用作Redis存储内存，一般来说，==单台Redis最大使用内存不应该超过20G。==

   电商网站上的商品，一般都是一次上传，无数次浏览的，说专业点也就是“多读少写”。

   对于这种场景，我们可以使用如下这种架构

   ![image-20200827214312369](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200827214312369.png)

主从复制，读写分离！80%的情况下都是在进行读操作！减缓服务器的压力！构架经常使用！一主二从！只要在公司中，主从复制就是必须使用的，因为真实的项目中不可能单机使用Redis。

## 环境配置

### 1、一主二从模式

`只配置从库，不用配置主库`

```bash
127.0.0.1:6379> info replication #查看当前库信息
# Replication
role:master #角色 master
connected_slaves:0 #没有从机
master_replid:302403c1a9194d1b1c5f6a2cca5db4b510213a34
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:0
second_repl_offset:-1
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:0
repl_backlog_histlen:0
```

1. 复制三个配置文件

```bash
[root@localhost etc]# cp redis.conf redis79.conf 
[root@localhost etc]# cp redis.conf redis80.conf 
[root@localhost etc]# cp redis.conf redis81.conf 
```

2. 修改配置文件
   1. 修改端口号
   2. 修改pid
   3. 修改log文件
   4. 修改dump.rdb文件名

3. 启动三台服务器

![image-20200827223301568](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200827223301568.png)

4. 查看服务器的信息`在没配置主从配置时，每一个都是主机`

```bash
127.0.0.1:6379> info replication  #查看某服务器的信息
# Replication
role:master #主机
connected_slaves:0 #没有从机
master_replid:20de506410dd13f2c41f7d5f68c4a159b6d637e3
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:0
second_repl_offset:-1
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:0
repl_backlog_histlen:0

```

5. 配置从机信息

```bash
127.0.0.1:6379> SLAVEOF 127.0.0.1 6379 #跟从主服务器端口为6379的服务器
OK
127.0.0.1:6380> info replication #查看该服务器信息
# Replication
role:slave #角色从机
master_host:127.0.0.1 #跟随主机的地址
master_port:6379 #主机的端口号
master_link_status:up #主机的状态
master_last_io_seconds_ago:8
master_sync_in_progress:0
slave_repl_offset:14
slave_priority:100
slave_read_only:1
connected_slaves:0
master_replid:b15160aa125255fae03cf8397ddfd52ef701dd0b
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:14
second_repl_offset:-1
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:1
repl_backlog_histlen:14

```

6. 查看主机的信息

```bash
127.0.0.1:6379> info replication
# Replication
role:master #角色：主机
connected_slaves:2 #跟随从机2台
slave0:ip=127.0.0.1,port=6380,state=online,offset=70,lag=1 #从机1
slave1:ip=127.0.0.1,port=6381,state=online,offset=70,lag=1 #从机2
master_replid:b15160aa125255fae03cf8397ddfd52ef701dd0b
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:70
second_repl_offset:-1
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:1
repl_backlog_histlen:70

```

==只有主机从能进行写操作，从机不能写，只能读。==

`从机进行写操作会提示错误：`

```bash
127.0.0.1:6380> set key2 2
(error) READONLY You can't write against a read only replica.
```

<!--如果配置从机用的是命令配置，只要一宕机后重启该服务器就是一台主机，在没配置跟从哪台主机的情况下获取主机写入的值都是Nil-->==所以要想宕机开启后还是从机，得再配置文件中配置。==

`注意：主机宕机后，从机还是可以获取到主机宕机之前写入的数据，但宕机后就失去了主机，等待主机重启，不然一直都是无主机状态。`==当主机重启后，如果没有进行持久化，则重启后之前的数据都会被清空。==

![image-20200828104739444](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200828104739444.png)

> 复制原理

Slave启动成功连接到master后发送一个sync同步命令

master接到命令，启动后台的存盘进程，同时收集所有接收到的用于修改数据集命令，在后台进程执行完毕之后，==master将传送整个数据文件到Slave服务，并完成一次同步==。

全量复制：Slave服务在接收到数据库文件数据后，将其存盘并加载到内存中。

增量复制：Master继续将新的所有收集到的修改命令一次传给Slave服务器，完成同步，但是只要是重新连接到master，一次完全同步将自动执行。

### 2、层层链路模式

![image-20200828151138866](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200828151138866.png)

> 如果79的主节点宕机了，80会自动为主节点吗？

==不会，要自己手动的去执行命令，80才会变为主节点。==

如果主机断链了连接，我们可以使用`SLAVEOF no one`让自己变成主机！其他的节点就是可以手动连接到最新的这个主节点（手动）。

### 3、 哨兵模式

> 概述

主从切换技术的方法是：当主机宕机后，需要手动的把一台服务器变成主服务器，这需要人工干预，不合适。哨兵模式在Redis2.8开始正式提供Sentinel(哨兵)架构来解决这个问题。

它能够自动监控后台主机是否故障，如果故障了就会根据投票自动将从库转为主库。

哨兵模式是一种特殊的模式，首先Redis提供了哨兵的命令，哨兵是一个独立的进程，作为进程，它会独立运行，其原理是**哨兵通过发送命令，等待Redis服务器响应，从而监控运行的多个Redis实例。**

![image-20200828154208187](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200828154208187.png)

> 哨兵的有两个作用

- 通过发送命令，让Redis服务器返回监控其运行状态，包括主服务器和从服务器。
- 当哨兵进程对Redis服务器进行监控，可能会出现问题，为此，我们可以使用多个哨兵进行监控，各个哨兵之间还会进行监控，这样就会形成多个哨兵模式。

![image-20200828160127740](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200828160127740.png)

假设主服务器宕机，哨兵1先检测到这个结果，系统并不会马上进行failover过程，仅仅是哨兵1主观的认为主服务器不可用，这个现象成为**主观下线**，当后面的哨兵也检测到主服务器不可用，并数量达到一定值时，那么哨兵之间就会进行一次投票，投票的结果由哨兵发起，进行faiover【故障转移】操作。切换成功后，就会通过发布订阅模式，让各个哨兵把自己监控的服务器实现切换主机，这个过程称为**客观下线。**

> 启动哨兵模式：

- 配置哨兵模式的配置文件

```bash
vim sentinel.conf ##新建一个文件
###配置文件编写的内容    sentinel monitor 主机名称（自定义） 主机地址 主机端口 1
sentinel monitor myredis 127.0.0.1 6379 1
```

`后面的数字1代表主机挂了，slave投票看谁替换成为主机，票数多的就是主机。`

- 启动哨兵模式

```bash
##有两种启动方式
redis-server /usr/local/redis/etc/sentinel.conf --sentinel
redis-sentinel /usr/local/redis/etc/sentinel.conf

###启动成功后显示这样的图案
[root@localhost etc]# redis-server /usr/local/redis/etc/sentinel.conf --sentinel  ##启动命令
4209:X 28 Aug 2020 16:39:12.847 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
4209:X 28 Aug 2020 16:39:12.847 # Redis version=6.0.6, bits=64, commit=00000000, modified=0, pid=4209, just started
4209:X 28 Aug 2020 16:39:12.847 # Configuration loaded
4209:X 28 Aug 2020 16:39:12.848 * Increased maximum number of open files to 10032 (it was originally set to 1024).
                _._                                                  
           _.-``__ ''-._                                             
      _.-``    `.  `_.  ''-._           Redis 6.0.6 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._                                   
 (    '      ,       .-`  | `,    )     Running in sentinel mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 26379
 |    `-._   `._    /     _.-'    |     PID: 4209
  `-._    `-._  `-./  _.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |           http://redis.io        
  `-._    `-._`-.__.-'_.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |                                  
  `-._    `-._`-.__.-'_.-'    _.-'                                   
      `-._    `-.__.-'    _.-'                                       
          `-._        _.-'                                           
              `-.__.-'                                               

4209:X 28 Aug 2020 16:39:12.849 # WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.
4209:X 28 Aug 2020 16:39:12.851 # Sentinel ID is c647acd19ba235647803664a042ed58c44edf834
4209:X 28 Aug 2020 16:39:12.851 # +monitor master myredis 127.0.0.1 6379 quorum 1
4209:X 28 Aug 2020 16:39:12.852 * +slave slave 127.0.0.1:6381 127.0.0.1 6381 @ myredis 127.0.0.1 6379 #从机
4209:X 28 Aug 2020 16:39:12.853 * +slave slave 127.0.0.1:6380 127.0.0.1 6380 @ myredis 127.0.0.1 6379 #从机

```

==重点：在哨兵模式下，如果主机宕机，则过一会哨兵就会重新选举新的主机接替旧的主机的工作==

> 哨兵模式

**优点：**

1. 哨兵集群基于主从复制的模式，所有主从复制的有点它都有。
2. 主从可以切换，故障可以转移，系统的而可用性更好。
3. 哨兵模式就是主从模式的升级，手动到自动，更加健壮。

**缺点：**

1. Redis不好在线扩容，集群容量一旦达到上限，在线扩容很麻烦。
2. 实现哨兵模式的配置其实很麻烦，里面的选择很多。

> 哨兵模式的全部配置

```bash
#Example sentinel.conf

#哨兵sentinel实例运行的端口 默认26379
port 26379

#哨兵sentinel的工作目录
dir /tmp

#哨兵sentinel监控的redis主节点的 ip port
#master-name 可以自己命令的主节点名字 只要由字母A-z、数字0-9以及这三个字符【.-_】
#quorum配置多少个sentinel哨兵统一为master主节点失联，那么客观上认为主节点失联
#sentinel monitor <master-name> <ip> <redis-port> <quorum>
sentinel monitor mymaster 127.0.0.1 6379 2

#当在Redis实例中开启了requirepass foobared授权密码，这样所有的redis连接的客户端都要提供密码
#设置哨兵sentinel连接主从的密码 注意必须为主从设置一样的验证密码
#sentinel auth-pass <master-name> <password>
sentinel auth-pass mymaster MySUO--serd-0123

#在下指定多少毫秒之后，主节点没有应答哨兵sentinel此时，哨兵主观的认为主节点下线，默认30秒
#sentinel down-after-milliseconds <master-name> <milliseconds>
sentinel down-after-milliseconds mymaster 30000

#这个配置项指定了在发生failover主备切换最多可以有多少个slave同时对新的master进行同步，
这个数字越小，完成failover所需的时间就越长
但是如果这个数字越大，就意味这越多的slave因为replication而不可用
可以通过将这个值设为1来保证每一次只有一个slave处于不能处理命令请求的状态。
#sentinel parallel-syncs <master-name> <numslaves>
sentinel parallel-syncs mymaster 1

#故障转移的超时时间。 failover-timeout 可以用在以下这些方面：
#1、同一个sentinel对于同一个master两次failouver之后的时间间隔
#2、当一个slave从一个错误的master那里同步数据开始计算时间。直到slave被纠正为向正确的master那里同步数据时。
#3、当想要取消一个正在进行的failover所 需要的时间。
#当进行failover时，配置所有slaveS指向新的master所需的最大时间。不过，即使过了这个时间，slaves依旧会被正确配置为指向master，但是就不按parallel-syncs所配置的规则来
#默认配置三分钟
#sentinel failover-timeout <master-name> <milliseconds>
#sentinel failover-timeout mymaster 180000



#SCRIPTS EXECUTION

#配置当某一事件发生时所需要执行的脚本，剋通过脚本来通知管理员，例如当系统运行不正常时可以通过邮箱来通知相关的人员。
#对于脚本的运行结果有以下规则：
#若脚本执行后返回1，那么该脚本稍后会被再执行一次，重复次数目默认为10
#若脚本返回值为2或者比2更高的值，那么脚本将不会重复执行。
#如果脚本在执行过程中由于收到系统中断信号被终止了，则同时返回值为1的行为相同。
#一个脚本的最大执行时间为60s，如果超过这个时间，脚本将会被一个SIGKILL信号终止，之后重新执行。

#通知型脚本：当sentinel有任何警告级别的事件发生时（比如说redis实例的主观失效和客观失效等等）将会去调用这个脚本，这个脚本应该通过邮件，SMS等方式去通知系统管理员关于系统不正常运行的信息。调用该脚本时，将传给脚本两个参数，一个是事件的类型，一个是事件的描述。如果sentinel.conf配置文件中配置了这个脚本路径，那么必须保证这个脚本路径，那么必须保证这个脚本存在于这个路径，并且是否可执行的，否则sentinel无法正常启动成功。
#通知脚本
#shell编程
#sentinel notification-script <master-name> <script-path>
sentinel notificattion-script mymaster /var/redis/notify.sh


#客户端重新配置主节点参数脚本
#当一个master由于failover而发生改变时，这个脚本将会被调用，通过相关的客户端关于 master地址已经发生改变信息。
#以下参数将会在调用脚本时传给脚本：
#<master-name> <role> <state> <from-ip> <from-port> <to-ip> <to-path>
#目前<state>总是“failover”
#<role>是“leader”或者“observer”中的一个
#参数from-ip,from-port,to-ip,to-port是用来和旧的master(即旧的slave通信的)
#这个脚本应该是被通用的，能被多次调用，不是针对性的。
#sentinel client-reconfig-script <master-name> <script-path>
sentinel client-reconfig-script mymaster /var/redis/reconfig.sh #以上的配置都是运维来配置
```

# 十、Redis缓存穿透和雪崩

Redis缓存的使用，极大的提升了应用程序的性能和效率，特别是数据查询方面，但同时，他也带来一些问题。其中，最要害的问题，就是数据的一致性问题，从严格意义上讲，这个问题无解，如果对数据的一致性要求高，那么就不能使用缓存。

另外的典型问题就是，缓存穿透、缓存雪崩和缓存穿击。目前，业界也都有比较流行的解决方案。



## 缓存穿透

> 概念

缓存穿透的概念很简单，用户想要查询一个数据，发现redis内存数据库没有，也就是缓存没有命中，于是向持久层数据库查询。发现也没有，本次查询失败。当用户很多的时候，焕春都没有命中，于是就请求持久层数据库。这会给持久层数据库造成了很大的压力。

这个时候就相当于出现了缓存穿透。

![image-20200829095235447](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200829095235447.png)

> 解决方案

**布隆过滤器**

布隆过滤器是一种数据结构，对所有可能查询的参数以hash形式存储，在控制层进行校验，不符合则丢弃，从而避免对底层存储系统的查询压力；

![image-20200829095738412](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200829095738412.png)

**缓存空对象**

当存储层不命中之后，即使返回空对象也将其缓存起来，同时设置一个过期时间，之后访问这个数据直接从缓存拿，保护了后端数据源。

![image-20200829100124654](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200829100124654.png)

这个种方式会存在两个问题：

1. 如果空值被缓存起来，则需要更多的缓存空间缓存这些空值，就会存在很多空值键。
2. 即使对空值设置了过期时间，还是会存在缓存层和存储层的数据会有一段时间窗口的不一致，对于需要保持一致性的业务会有影响。

## 缓存击穿（微博热搜）

> 概念

缓存击穿是指一个key非常热点，在不停的扛着大并发，大并发集中对这个点进行访问，当这个key失效的瞬间，持续的大并发穿破缓存，直接请求数据库。

当某key在过期瞬间，有大量的并发请求，这类数据一般是热点数据，由于缓存过期，会同时访问数据库来查询最新数据，并且回写缓存，会导致数据库瞬间压力过大。

> 解决方案

**设置热点数据永不过期**

缓存层面来看，没有过期时间，所有不会出现热点key过期后产生的问题。

**加互斥锁**

分布式锁：使用分布式锁，保证对于每一个key同时只有一个线程去查询后端服务，其他线程没有获得分布式锁的权限，因此只需要等待即可，这种方式将高并发的压力转移到分布式锁，因此对分布式锁的考验非常大。

![image-20200829102449194](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200829102449194.png)



## 缓存雪崩

> 概念

缓存雪崩，是指在某一个时间端，缓存集中过期失效。Redis集体宕机！！！

产生雪崩的原因之一，例如双十一零点时，一大波抢购，这波商品时间比较集中的放入了缓存，假设缓存一个小时，那么到凌晨一点时，这批商品就会过期，而对这批商品的访问查询还在继续，都落到了数据库上，对数据库而言，就会产生周期性的压力波峰，于是所有请求都请求到了存储层，存储层的调用量会暴增，造成存储层也会挂掉的情况。

![image-20200829103352720](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200829103352720.png)

其实集体过期，倒不是非常致命的，比较致命的树缓存雪崩，是缓存服务器某一个节点宕机或断电，因为自然形成的缓存雪崩，一定是在某一个时间段集中创建缓存，这个时候，数据库也是可以顶住压力的，无非就是对数据库产生周期性的压力而已。而缓存

服务器节点的宕机对数据库服务器造成的压力是不可预知的，很可能瞬间就把数据库压垮。

双十一：停掉一些服务，保证主要的服务可用。

>解决方案

**Redis高可用**

这个思想含义就Redis有可能挂掉，那我多增设几台redis，这样一台挂掉之后其他的还可以继续工作，其实就是搭建的集群。（异地多活！）

**限流降级**

这个解决方案的思想是：在缓存失效后，通过加锁或者队列来控制读数据库写缓存的线程数量，比如对某个key只允许一个线程查询数据和写缓存，其他线程等待。

**数据预热**

数据加热的含义就是在正式部署之前，先把有可能的数据先预访问一遍，这样部分可能大量访问先加载到缓存中，即在将发生大并发访问前手动触发加载缓存不同的key,设置不同的过期时间，让缓存失效的时间点尽量均匀。