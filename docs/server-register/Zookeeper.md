---
title: Zookeeper安装
date: 2021-07-31
tags: 
 - zookeeper
---
# Zookeeper安装

>安装步骤：
>
>安装文档连接：https://www.cnblogs.com/expiator/p/9853378.html
>
>1. 下载zookeeper安装包
>   1. 可在windows下载在用工具传到linux系统
>   2. 可直接在linux系统下下载。
>      1. 官网:http://mirror.bit.edu.cn/apache/zookeeper/
>      2. 进入/usr/local目录
>      3. 执行命令：wget http://mirror.bit.edu.cn/apache/zookeeper/zookeeper-3.4.13/zookeeper-3.4.13.tar.gz 

```bash
[root@localhost zookeeper-3.6.1]# cd conf ###进入conf文件目录
[root@localhost conf]# cp zoo_sample.cfg zoo.cfg  ####复制zoo_sample.cfg并将名字命名为zoo.cfg
[root@localhost conf]# vim zoo.cfg ###编辑zoo.cfg文件
dataDir=/tmp/zookeeper/data  ---修改内容
dataLogDir=/tmp/zookeeper/log

```

> 配置变量

```bash
[root@localhost zookeeper-3.6.1]# export ZOOKEEPER_INSTALL=/usr/local/zookeeper-3.6.1/
[root@localhost zookeeper-3.6.1]# export PATH=$PATH:$ZOOKEEPER_INSTALL/bin
```

> 关闭防火墙

```bash
systemctl stop firewalld
```

> 启动zookeeper服务端

```bash
[root@localhost local]# cd /usr/zookeeper-3.6.1/bin
[root@localhost bin]# ./zkServer.sh start
```

>启动成功效果：

```bash
ZooKeeper JMX enabled by default
Using config: /usr/zookeeper-3.6.1/bin/../conf/zoo.cfg
Starting zookeeper ... STARTED

> 启动zookeeper客户端

```bash
#命令1
./zkCli.sh

## 命令2
./zkCli.sh -timeout 5000 -r -server 192.168.230.130:12181
```
```

## 简介

### 

