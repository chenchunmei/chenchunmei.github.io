---
title: Eureka
date: 2020-11-23
tags: 
 - eureka
---

# Eureka

#### 什么是Eureka

​	Eureka是 Netflix 公司开源的产品，它是一种基于REST(Representaional State Transfer)的服务，主要用于AWS云。Eureka提供了完整的Service Registry 和 Service Discovey实现，也是Spring Cloud体系中最重要核心的组件之一。

简单来说，Eureka就是Netflix开源的一款提供服务注册和发现的产品，并且提供了java客户端。当然在Spring Cloud大力优化后的Eureka,已经不仅仅只是用于AWS云，而是可以应用在任何需要使用注册中心的场景。

Eureka 由两个组件组成：Eureka 服务端和 Eureka 客户端。Eureka 服务端就是注册中心。Eureka 客户端是一个 java 客户端，用来简化与服务端的交互、作为轮询负载均衡器，并提供服务的故障切换支持。

下面是Eureka的使用场景

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190703132657945.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3F3ZTg2MzE0,size_16,color_FFFFFF,t_70)

从上面看Eureka Server担任注册中心的角色，提供了服务的发现和注册功能
Service Provider 服务提供者,将自身的服务注册到Eureka Server,同时通过心跳检查服务的运行状态
Service Consumer 服务调用者,从Eureka Server 得到注册的服务列表,找到对应的服务地址在调用并使用

# SpringBoot2.x整合SpringCloud

```java
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.1.6.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    
       <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka- server</artifactId>
      </dependency>

  <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
123456789101112131415161718192021222324
```

3.在properties中自定义Springcloud的版本如下配置

```java
  <properties>
        <java.version>1.8</java.version>
        <spring-cloud.version>Greenwich.SR1</spring-cloud.version>
    </properties>
1234
```

4.在SpringBoot启动类上加上如下注解

```java
@EnableEurekaServer
1
```

5.在application.yml中配置

```yml
spring:
  application:
    name: eureka server
server:
  port: 9000
eureka:
  client:
    register-with-eureka: false
    fetch-registry: false
123456789
```

# 测试

在浏览器中输入localhost:9000即可访问注册中心
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190630102605190.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3F3ZTg2MzE0,size_16,color_FFFFFF,t_70)
可以发现后台页面被分为了五大部分
System Status 代表的系统状态
DS Replicas 该服务从哪里同步数据
Instances currently registered with Eureka 注册在Eureka的实例列表
General Info 系统运行环境 如cpu、内存等信息
Instance Info 本服务的基础信息 如ip地址 状态等

完整的pom依赖如下

```java
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.1.6.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>cn.com.scitc</groupId>
    <artifactId>springcloud_01</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>springcloud_01</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>1.8</java.version>
        <spring-cloud.version>Greenwich.SR1</spring-cloud.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
        </dependency>

    </dependencies>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051
```

# 总结

搭建Eureka是非常简单的,并且Eureka是可用高可用的,比如可用集群,下一节将会将Eureka的集群。

# 注册中心高可用

理论上来讲，服务消费者本地缓存了服务提供者的地址。即使 Eureka Server 宕机，也不会影响服务之间的调用，但是一旦涉及到服务的上下线，本地的缓存信息将会出现偏差，从而影响到了整个微服务架构的稳定性，因此搭建 Eureka Server 集群来提高整个架构的高可用性，是非常有必要的。这样就可以使注册中心高可用。

# 搭建Eureka集群

开启 Eureka 集群配置后，服务启动时 Eureka Server 会将注册信息向其它 Eureka Server 进行同步，因此搭建高可用架构只需要将 Eureke Server 配置指向其它可用的 serviceUrl 即可。

我们在上面 Eureka 单个示例的基础上，复制出三份来分别命名为：eureka-a、eureka-b、eureka-c 三个示例项目，使用这三个示例项目搭建 Eureka Server 的集群。

接下来需要分别修改 eureka-a、eureka-b、eureka-c 的配置信息。

eureka-a的配置信息如下

```java
@SpringBootApplication
@EnableEurekaServer
public class EurekaAApplication {

    public static void main(String[] args) {
        SpringApplication.run(EurekaAApplication.class, args);
    }

}
123456789
spring:
  application:
    name: eureka server
server:
  port: 8001

eureka:
  instance:
    hostname: eurekaA
  client:
    serviceUrl.defaultZone: http://eurekaB:8002/eureka/,http://eurekaC:8003/eureka/
    register-with-eureka: true
    fetch-registry: true
12345678910111213
```

完整的pom.xml如下

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.1.6.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>cn.com.scitc</groupId>
    <artifactId>eureka-a</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>eureka-a</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>1.8</java.version>
        <spring-cloud-version>Greenwich.SR1</spring-cloud-version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <dependencyManagement>

        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud-version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
1234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950515253545556575859606162
```

eureka-b的配置信息如下:

```java
@SpringBootApplication
@EnableEurekaServer
public class EurekaBApplication {

    public static void main(String[] args) {
        SpringApplication.run(EurekaBApplication.class, args);
    }

}

12345678910
spring:
  application:
    name: eureka server
server:
  port: 8002

eureka:
  instance:
    hostname: eurekaB
  client:
    serviceUrl.defaultZone: http://eurekaA:8001/eureka/,http://eurekaC:8003/eureka/
    register-with-eureka: true
    fetch-registry: true
12345678910111213
```

完整的pom.xml如下

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.1.6.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>cn.com.scitc</groupId>
    <artifactId>eureka-b</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>eureka-b</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>1.8</java.version>
        <spring.cloud.version>Greenwich.SR1</spring.cloud.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
        </dependency>
    </dependencies>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring.cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

1234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950515253545556575859606162
```

eureka-c的配置信息如下:

```java
@SpringBootApplication
@EnableEurekaServer
public class EurekaCApplication {

    public static void main(String[] args) {
        SpringApplication.run(EurekaCApplication.class, args);
    }

}

12345678910
spring:
  application:
    name: eureka server
server:
  port: 8003

eureka:
  instance:
    hostname: eurekaC
  client:
    serviceUrl.defaultZone: http://eurekaA:8001/eureka/,http://eurekaB:8002/eureka/
    register-with-eureka: true
    fetch-registry: true
12345678910111213
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.1.6.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>cn.com.scitc</groupId>
    <artifactId>eureka-c</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>eureka-c</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>1.8</java.version>
        <spring.cloud.version>Greenwich.SR1</spring.cloud.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
        </dependency>
    </dependencies>

    <dependencyManagement>

        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring.cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
1234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950515253545556575859606162
```

eureka.client.register-with-eureka和eureka.client.fetch-registry配置为 true ，表示将自己注册到注册中心，并且从注册中心获取注册信息

eureka.client.serviceUrl.defaultZone，指向其它两个注册中心，重点配置内容

# 测试

依次启动 eureka-a、eureka-b、eureka-c 项目，等待全部启动完成之后，浏览器访问地址：localhost:8001
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190630114950428.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3F3ZTg2MzE0,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190630115100405.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3F3ZTg2MzE0,size_16,color_FFFFFF,t_70)

# 总结

我们学习了为什么需要使用注册中心，以及 Eureka 作为注册中心最关键的组件，都有哪些特点和优势。