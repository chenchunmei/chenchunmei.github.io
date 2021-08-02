---
title: redis使用教程
date: 2021-07-30
tags:
 - mongodb
categories:
 - 数据库相关
sidebar: auto
---

![vuepress](https://img.shields.io/badge/vuepress-0.14.8-brightgreen.svg)
![leancloud-storage](https://img.shields.io/badge/leancloud--storage-3.10.1-orange.svg)
![valine](https://img.shields.io/badge/valine-1.3.4-blue.svg)



# 1 MongoDB
#### 1.1 什么是MongoDb
      MongoDB是一个基于分布式文件存储的数据库.由C++语言编写.旨在为WEB应用提供可扩展的高性能数据存储解决方案.
      MongoDB是一个介于关系型数据库和非关系型数据库之间的产品.是非关系型数据库当中最为丰富,最像关系型数据库的.它支持的数据结构非常松散,是类似json的bson格式.因此可以存储比较复杂的数据类型.

#### 1.2 MongoDB特点
```
  Mongo最大的特点是它支持的查询语言非常强大,其语法有点类似于面向对象的查询语言,几乎可以实现类似非关系数据库单表查询的绝大部分功能,而且还支持对数据建立索引.
  它的特点是高性能,已部署,易使用,存储数据非常方便.主要功能特征有:
  1、模式自由
  2、支持动态查询
  3、支持完全索引，包含内部对象
  4、支持查询
  5、支持复制和故障恢复
  6、使用高效的二进制数据存储，包括大型对象（如视频）
  7、自动处理碎片，以支持云计算层次的扩展性。
  8、支持RUBY、PATHON、JAVA、C++、PHP、C#等多种语言。
  9、文件存储格式为BSON(一种JSON的扩展)。
```

#### 1.3 MongoDB体系结构

```
MongoDB的逻辑结构是一种层次结构。主要由：文档（document）、集合（collection）、数据库（database）这三部分组成。逻辑结构是面向用户的、用户使用MongoDB开发应用程序使用的就是逻辑结构
```

> - MongoDB的文档（document）,相当于关系型数据库中的一行记录。
> - 多个文档组成一个集合（collection）,相当于关系型数据库的表
> - 多个集合（collection），逻辑上组成在一起，就是一个数据库（database）
> - 一个MongoDB实例支持多个数据库（database）

| 数据库（databases） | 数据库（databases） |
| ------------------- | ------------------- |
| 集合（collections） | 表（table）         |
| 文档（document）    | 行（row）           |

#### 1.4MongoDB数据类型

| 数据类型           | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| String             | 字符串。存储数据常用的数据类型。在MongoDB，UTF-8编码的字符串才是合法的。 |
| Integer            | 整型数值。用于存储数值，可分为32位或64位                     |
| Boolean            | 布尔值。用于存储布尔值（真/假）                              |
| Double             | 双精度浮点值。用于存储浮点值                                 |
| Array              | 用于数组或列表或多值存储为一个键。                           |
| Timestamp          | 时间戳。记录文档修改或添加具体时间                           |
| Object             | 用于内嵌文档                                                 |
| Null               | 用于创建空值                                                 |
| Date               | 日期时间。用UNIX时间格式来存储当前日期或时间。你可以指定自己的日期时间：创建Date对象，传入年月日信息 |
| Object ID          | 对象ID。用于存储文档的ID                                     |
| BinaryData         | 二进制数据，用于存储二进制数据                               |
| Code               | 代码类型。用于在文档中存储javascript代码                     |
| Regular expression | 正则表达式类型，用于存储正则表达式                           |
|                    |                                                              |

**特殊说明**

- ObjectId
  - ObjectId类似唯一主键，可以很快的去生成和排序，包含12bytes
- MongoDB中存储的文档必须有一个_id键，这个键的值可以是任何类型的，默认是个Object对象
- 时间戳
  - BSON有一个特殊的时间戳类型，与普通的日期类型不相关。时间戳值是一个64位的值：其中
    - 前32位是一个time_t值（与Unix新纪元（1970年1月1日）相差的秒数）
    - 后32位是在某秒中，时间戳值通常的唯一的。
  - 日期
    - 表示当前距离 Unix新纪元（1970年1月1日）的毫秒数。日期类型是有符号的,负数标识1970年之前的日期。

#### 1.4 MongoDB基本使用

##### 1.4.1 window系统MongoDB安装

- 安装

  下载mongoDB的客户端安装

  一直点击下一步安装，安装成功后会存在：==C:\\Program Files\\MongoDB\\==在该目录下一直找到bin目录下的mongod.exe,为了方便我们每次启动，我们可以配置环境变量。

- 启动

  创建一个文件夹d:\data，用于存放数据的目录data

  创建命令行窗口，执行一下命令

  ```bash
  mongod --dbpath=D:\data
  ```

  我们启动信息中可以看到，mongoDB默认端口号是27017,如果我们想改变默认启动端口号，可以通过--port来指定端口：例如

  ```bash
  mongod --dbpath=D:\data -port 8989
  ```

- 登录

  再打开一个新的命令行窗口，执行一下命令

  ```bash
  mongo 127.0.0.1:27017
  ```

  以上命令中，如果ip是本地服务，端口是27017,则后面的127.0.0.1:27017即可省略

- 退出

  ```bash
  exit
  ```

##### 1.4.2 Docker环境下MongoDB安装

- 在Linux虚拟机中创建Mongo容器，如命令如下：

  ```bash
  docker run -id --name mongo -p 27017:27017 mongo
  ```

- 在window命令行窗口出入登录命令：

  ```bash
  mongo 192.168.200.128
  ```

#### 1.5 常用命令

#####  1.5.1选择和创建数据库

**选择和创建数据库的语法格式：**

```bash
use 数据库名称
```

**如果数据库存在则选择该数据库，如果数据库不存在则自动创建。以下语句创建commentdb数据库：**

```bash
use commentdb
```

**查看数据库**

```bash
show dbs
```

**查看集合，需要先选择数据库之后，才能查看该数据库的集合**

```bash
show collections
```

