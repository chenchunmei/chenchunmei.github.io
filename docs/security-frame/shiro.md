---
title: Shiro
date: 2021-07-31
tags:
 - shiro
---

# Shiro

### 简介

- Apache Shiro是一个java的安全（权限）框架
- Shiro可以非常容易的开发出足够好的应用，其不仅可以用在JavaSE环境，也可使用在JavaEE环境。
- Shiro可以完成认证、授权、加密、会话管理，Web集成，缓存等。
- 下载地址：http://shiro.apache.org/
- Shiro博客：https://www.cnblogs.com/progor/p/10970971.html
- 转载博客：https://www.w3cschool.cn/shiro/co4m1if2.html

![image-20200901211130190](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200901211130190.png)

### 功能

![image-20200901212444277](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200901212444277.png)

**Authorization**：授权，即权限验证，验证某个已认证的用户是否拥有某个权限；即判断用户是否能做事情，常见的如：验证某个用户是否拥有某个角色。或者细粒度的验证某个用户对某个资源是否具有某个权限；

**Session** **Management**：会话管理，即用户登录后就是一次会话，在没有退出之前，它的所有信息都在会话中；会话可以是普通 JavaSE 环境的，也可以是如 Web 环境的；

**Cryptography**：加密，保护数据的安全性，如密码加密存储到数据库，而不是明文存储；

**Web Support**：Web 支持，可以非常容易的集成到 Web 环境；

**Caching**：缓存，比如用户登录后，其用户信息、拥有的角色 / 权限不必每次去查，这样可以提高效率；

**Concurrency**：shiro 支持多线程应用的并发验证，即如在一个线程中开启另一个线程，能把权限自动传播过去；

**Testing**：提供测试支持；

**Run As**：允许一个用户假装为另一个用户（如果他们允许）的身份进行访问；

**Remember Me**：记住我，这个是非常常见的功能，即一次登录后，下次再来的话不用登录了。

**记住一点，Shiro 不会去维护用户、维护权限；这些需要我们自己去设计 / 提供；然后通过相应的接口注入给 Shiro 即可。**

接下来我们分别从外部和内部来看看 Shiro 的架构，对于一个好的框架，从外部来看应该具有非常简单易于使用的 API，且 API 契约明确；从内部来看的话，其应该有一个可扩展的架构，即非常容易插入用户自定义实现，因为任何框架都不能满足所有需求。

首先，我们从外部来看 Shiro 吧，即从应用程序角度的来观察如何使用 Shiro 完成工作。如下图：

![image-20200901212814350](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200901212814350.png)

可以看到：应用代码直接交互的对象是 Subject，也就是说 Shiro 的对外 API 核心就是 Subject；其每个 API 的含义：

**Subject**：主体，代表了当前 “用户”，这个用户不一定是一个具体的人，与当前应用交互的任何东西都是 Subject，如网络爬虫，机器人等；即一个抽象概念；所有 Subject 都绑定到 SecurityManager，与 Subject 的所有交互都会委托给 SecurityManager；可以把 Subject 认为是一个门面；SecurityManager 才是实际的执行者；

**SecurityManager**：安全管理器；即所有与安全有关的操作都会与 SecurityManager 交互；且它管理着所有 Subject；可以看出它是 Shiro 的核心，它负责与后边介绍的其他组件进行交互，如果学习过 SpringMVC，你可以把它看成 DispatcherServlet 前端控制器；

**Realm**：域，Shiro 从从 Realm 获取安全数据（如用户、角色、权限），就是说 SecurityManager 要验证用户身份，那么它需要从 Realm 获取相应的用户进行比较以确定用户身份是否合法；也需要从 Realm 得到用户相应的角色 / 权限进行验证用户是否能进行操作；可以把 Realm 看成 DataSource，即安全数据源。

也就是说对于我们而言，最简单的一个 Shiro 应用：

1. 应用代码通过 Subject 来进行认证和授权，而 Subject 又委托给 SecurityManager；
2. 我们需要给 Shiro 的 SecurityManager 注入 Realm，从而让 SecurityManager 能得到合法的用户及其权限进行判断。

**从以上也可以看出，Shiro 不提供维护用户 / 权限，而是通过 Realm 让开发人员自己注入。**

==接下来我们来从 Shiro 内部来看下 Shiro 的架构，如下图所示：===

![img](https://atts.w3cschool.cn/attachments/image/wk/shiro/3.png)

**Subject**：主体，可以看到主体可以是任何可以与应用交互的 “用户”；

**SecurityManager**：相当于 SpringMVC 中的 DispatcherServlet 或者 Struts2 中的 FilterDispatcher；是 Shiro 的心脏；所有具体的交互都通过 SecurityManager 进行控制；它管理着所有 Subject、且负责进行认证和授权、及会话、缓存的管理。

**Authenticator**：认证器，负责主体认证的，这是一个扩展点，如果用户觉得 Shiro 默认的不好，可以自定义实现；其需要认证策略（Authentication Strategy），即什么情况下算用户认证通过了；

**Authrizer**：授权器，或者访问控制器，用来决定主体是否有权限进行相应的操作；即控制着用户能访问应用中的哪些功能；

**Realm**：可以有 1 个或多个 Realm，可以认为是安全实体数据源，即用于获取安全实体的；可以是 JDBC 实现，也可以是 LDAP 实现，或者内存实现等等；由用户提供；注意：Shiro 不知道你的用户 / 权限存储在哪及以何种格式存储；所以我们一般在应用中都需要实现自己的 Realm；

**SessionManager**：如果写过 Servlet 就应该知道 Session 的概念，Session 呢需要有人去管理它的生命周期，这个组件就是 SessionManager；而 Shiro 并不仅仅可以用在 Web 环境，也可以用在如普通的 JavaSE 环境、EJB 等环境；所以呢，Shiro 就抽象了一个自己的 Session 来管理主体与应用之间交互的数据；这样的话，比如我们在 Web 环境用，刚开始是一台 Web 服务器；接着又上了台 EJB 服务器；这时想把两台服务器的会话数据放到一个地方，这个时候就可以实现自己的分布式会话（如把数据放到 Memcached 服务器）；

**SessionDAO**：DAO 大家都用过，数据访问对象，用于会话的 CRUD，比如我们想把 Session 保存到数据库，那么可以实现自己的 SessionDAO，通过如 JDBC 写到数据库；比如想把 Session 放到 Memcached 中，可以实现自己的 Memcached SessionDAO；另外 SessionDAO 中可以使用 Cache 进行缓存，以提高性能；

**CacheManager**：缓存控制器，来管理如用户、角色、权限等的缓存的；因为这些数据基本上很少去改变，放到缓存中后可以提高访问的性能

**Cryptography**：密码模块，Shiro 提高了一些常见的加密组件用于如密码加密 / 解密的。

到此 Shiro 架构及其组件就认识完了，接下来挨着学习 Shiro 的组件吧。

### 快速开始

- 搭建一个spring boot项目
- 导入依赖
- 配置文件

#### 依赖文件

```xml
 <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <version>2.3.3.RELEASE</version>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>2.3.3.RELEASE</version>
            <optional>true</optional>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.apache.shiro/shiro-core -->
        <dependency>
            <groupId>org.apache.shiro</groupId>
            <artifactId>shiro-core</artifactId>
            <version>1.6.0</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.mybatis.spring.boot/mybatis-spring-boot-starter -->
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.1.3</version>
        </dependency>

        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>2.3.3.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.apache.shiro</groupId>
            <artifactId>shiro-spring</artifactId>
            <version>1.6.0</version>
        </dependency>

        <!-- https://mvnrepository.com/artifact/org.slf4j/jcl-over-slf4j -->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>jcl-over-slf4j</artifactId>
            <version>2.0.0-alpha1</version>
        </dependency>

        <!-- https://mvnrepository.com/artifact/org.slf4j/slf4j-log4j12 -->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-log4j12</artifactId>
            <version>2.0.0-alpha1</version>
            <scope>test</scope>
        </dependency>

        <!-- https://mvnrepository.com/artifact/log4j/log4j -->
        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>1.2.17</version>
        </dependency>
     <!-- shiro和thymeleaf的整合包 -->
        <dependency>
            <groupId>com.github.theborakompanioni</groupId>
            <artifactId>thymeleaf-extras-shiro</artifactId>
            <version>2.0.0</version>
        </dependency>
 </dependencies>
```

#### 配置文件

- shiro.ini

```ini
# -----------------------------------------------------------------------------
# Users and their assigned roles
#
# Each line conforms to the format defined in the
# org.apache.shiro.realm.text.TextConfigurationRealm#setUserDefinitions JavaDoc
# -----------------------------------------------------------------------------
[users]
# user 'root' with password 'secret' and the 'admin' role
root = secret, admin
# user 'guest' with the password 'guest' and the 'guest' role
guest = guest, guest
# user 'presidentskroob' with password '12345' ("That's the same combination on
# my luggage!!!" ;)), and role 'president'
presidentskroob = 12345, president
# user 'darkhelmet' with password 'ludicrousspeed' and roles 'darklord' and 'schwartz'
darkhelmet = ludicrousspeed, darklord, schwartz
# user 'lonestarr' with password 'vespa' and roles 'goodguy' and 'schwartz'
lonestarr = vespa, goodguy, schwartz

# -----------------------------------------------------------------------------
# Roles with assigned permissions
#
# Each line conforms to the format defined in the
# org.apache.shiro.realm.text.TextConfigurationRealm#setRoleDefinitions JavaDoc
# -----------------------------------------------------------------------------
[roles]
# 'admin' role has all permissions, indicated by the wildcard '*'
admin = *
# The 'schwartz' role can do anything (*) with any lightsaber:
schwartz = lightsaber:*
# The 'goodguy' role is allowed to 'drive' (action) the winnebago (type) with
# license plate 'eagle5' (instance specific id)
goodguy = winnebago:drive:eagle5
```

- log4j.properties

```properties
log4j.rootLogger=INFO, stdout

log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%d %p [%c] - %m %n

# General Apache libraries
log4j.logger.org.apache=WARN

# Spring
log4j.logger.org.springframework=WARN

# Default Shiro logging
log4j.logger.org.apache.shiro=INFO

# Disable verbose logging
log4j.logger.org.apache.shiro.util.ThreadContext=WARN
log4j.logger.org.apache.shiro.cache.ehcache.EhCache=WARN
```

- application.yml

```yml
spring:
  datasource:
    username: root
    password: root
    url: jdbc:mysql://localhost:3306/dm_svr?useUnicode=true&characterEncoding=UTF-8&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC
    driver-class-name: com.mysql.jdbc.Driver
```

#### 自定义realm类

==该类要继承AuthorizingRealm类并实现它的两个方法：doGetAuthorizationInfo（授权），doGetAuthenticationInfo（认证）==

```java
import com.shiro.springshiro.pojo.User;
import com.shiro.springshiro.service.UserService;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @Author chenchunmei
 * @Date 2020/9/2 14:58
 * @Version 1.0
 * 自定义的UserRealm
 */
public class UserRealm extends AuthorizingRealm {

    @Autowired
    private UserService userService;

    //授权
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        System.out.println("执行了授权");
        //创建一个授权对象
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        //所有登陆的用户都授权user:add这个权限,这样没有做到资源权限的控制
        //info.addStringPermission("user:add");
        //通过认证的方法获取传来的当前用户
        User currentUser = (User) principalCollection.getPrimaryPrincipal();
        //从数据库中获取该用户的资源权限
        info.addStringPermission(currentUser.getPerms());
        //返回给做授权的校验
        return info;
    }

    //认证
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        System.out.println("执行了认证");
        //用户对象
        UsernamePasswordToken userToken = (UsernamePasswordToken) authenticationToken;
        //从数据库中取用户
        User user = userService.login(userToken.getUsername());
        //判断该用户是否存在
        if(user == null){//不存在返回Null,认证那边获取到null就会报没有该用户的异常
            return null;
        }
        //密码认证，是shiro进行校验
        return new SimpleAuthenticationInfo("",user.getPassword(),"");
    }
}

```

#### 编写Shiro配置类

**要向Spring Boot注入三大对象**

- ShiroFilterFactoryBean
- DefaultWebSecurityManager
  - 该类如何获取自定义的Realm类呢？？
    - Spring Boot提供了一个注解@Qualifier("注入的方法名或别名")
- 自定义的Realm对象

![image-20200902205450364](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200902205450364.png)

**简单例子：**

```java
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @Author chenchunmei
 * @Date 2020/9/2 14:52
 * @Version 1.0
 */
@Configuration//注入到Spring Boot中作为配置类
public class ShiroConfig {
    
    //Shiro的过滤工厂
    @Bean
    public ShiroFilterFactoryBean getShiroFilterFactoryBean(@Qualifier("manager") DefaultWebSecurityManager defaultWebSecurityManager){
        ShiroFilterFactoryBean bean = new ShiroFilterFactoryBean();
        bean.setSecurityManager(defaultWebSecurityManager);
        return bean;
    }
    
    //默认Web安全管理器
    @Bean("manager")//别名
    public DefaultWebSecurityManager getDefaultWebSecurityManager(@Qualifier("userRealm") UserRealm userRealm){
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        securityManager.setRealm(userRealm);
        return securityManager;
    }
    
    //自定义的Realm类
    @Bean
    public UserRealm userRealm(){
        UserRealm userRealm = new UserRealm();
        return userRealm;
    }
    
}
```

**强化例子**

```java
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @Author chenchunmei
 * @Date 2020/9/2 14:52
 * @Version 1.0
 */
@Configuration
public class ShiroConfig {

    //ShiroFillterFactoryBean
    @Bean
    public ShiroFilterFactoryBean getShiroFilterFactoryBean(@Qualifier("securityManager") DefaultWebSecurityManager defaultWebSecurityManager){
        ShiroFilterFactoryBean bean = new ShiroFilterFactoryBean();

        //设置安全管理器
        bean.setSecurityManager(defaultWebSecurityManager);
        //anon:无需认证就可以访问
        //authc:必须认证才能访问
        //user：必须拥有记住我功能才能使用
        //perms:拥有对某个资源的权限才能访问
        //role:拥有某个角色权限才能访问
        //map.put("view/add","authc");
        //map.put("view/update","authc");
        Map<String, String> map = new LinkedHashMap<>();
		//某个用户拥有的资源权限才能访问
        map.put("/view/add","perms[user:add]");
        map.put("/view/update","perms[user:update]");
        //登陆认证才能访问
        map.put("/view/*","authc");
        //过滤器链
        bean.setFilterChainDefinitionMap(map);
        //如果没有权限就跳转到这个路径请求
        bean.setUnauthorizedUrl("/unauthor");
        //没有认证就跳到登陆请求
        bean.setLoginUrl("/toLogin");
        return bean;
    }
    //DefaultWebSecurityManager
    @Bean(name = "securityManager")
    public DefaultWebSecurityManager getDefaultWebSecurityManager(@Qualifier("userRealm") UserRealm userRealm){
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        //将自定的Realm添加到安全管理器
        securityManager.setRealm(userRealm);
        return securityManager;
    }

    //创建Releam对象
    @Bean
    public UserRealm userRealm(){
        return new UserRealm();
    }
}

```

**图解**

![image-20200902213010163](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200902213010163.png)

#### Shiro整合Thymeleaf

> Thymeleaf命名空间

```xml
xmlns:th="http://www.thymeleaf.org" 
xmlns:shiro="http://www.thymeleaf.org/thymeleaf-extras-shiro"
```

> 登陆接口

```java
@RequestMapping("/login")
public String login(String username, String password, Model model){
    //获取当前用户
    Subject subject = SecurityUtils.getSubject();
    //封装用户的登陆数据
    UsernamePasswordToken token = new UsernamePasswordToken(username, password);
    try{
        subject.login(token);
        //登陆认证后才将该用户的token放到session中返回给前端
        Session session = subject.getSession();
        session.setAttribute("loginUser",token);
        return "index";
    }catch (UnknownAccountException e){
        model.addAttribute("msg","用户名不存在");
        log.info("用户名不存在 ====="+e.getMessage());
        return "login";
    }catch(IncorrectCredentialsException e){
        model.addAttribute("msg","密码错误");
        log.info("密码错误 ====="+e.getMessage());
        return "login";
    }

}
```

> 配置整合Shiro和Thymeleaf的ShiroDialect到Spring Boot中

```java
 //整合ShiroDialect：用来整合thymeleaf和shiro
@Bean
public ShiroDialect getShiroDialect(){
    return new ShiroDialect();
}
```

#### 整个Demo的代码

![image-20200902220754862](C:\Users\ccm\AppData\Roaming\Typora\typora-user-images\image-20200902220754862.png)

> config包下的配置类

- ShiroConfig

```java
package com.shiro.springshiro.config;

import at.pollux.thymeleaf.shiro.dialect.ShiroDialect;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @Author chenchunmei
 * @Date 2020/9/2 14:52
 * @Version 1.0
 */
@Configuration
public class ShiroConfig {

    //ShiroFillterFactoryBean
    @Bean
    public ShiroFilterFactoryBean getShiroFilterFactoryBean(@Qualifier("securityManager") DefaultWebSecurityManager defaultWebSecurityManager){
        ShiroFilterFactoryBean bean = new ShiroFilterFactoryBean();

        //设置安全管理器
        bean.setSecurityManager(defaultWebSecurityManager);
        //anon:无需认证就可以访问
        //authc:必须认证才能访问
        //user：必须拥有记住我功能才能使用
        //perms:拥有对某个资源的权限才能访问
        //role:拥有某个角色权限才能访问
        //map.put("view/add","authc");
        // map.put("view/update","authc");
        Map<String, String> map = new LinkedHashMap<>();

        map.put("/view/add","perms[user:add]");
        map.put("/view/update","perms[user:update]");
        map.put("/view/*","authc");
        bean.setFilterChainDefinitionMap(map);
        bean.setUnauthorizedUrl("/unauthor");
        bean.setLoginUrl("/toLogin");
        return bean;
    }
    //DefaultWebSecurityManager
    @Bean(name = "securityManager")
    public DefaultWebSecurityManager getDefaultWebSecurityManager(@Qualifier("userRealm") UserRealm userRealm){
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        securityManager.setRealm(userRealm);
        return securityManager;
    }

    //创建Releam对象
    @Bean
    public UserRealm userRealm(){
        return new UserRealm();
    }

    //整合ShiroDialect：用来整合thymeleaf和shiro
    @Bean
    public ShiroDialect getShiroDialect(){
        return new ShiroDialect();
    }
}
```

- UserRealm

```java
package com.shiro.springshiro.config;

import com.shiro.springshiro.pojo.User;
import com.shiro.springshiro.service.UserService;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @Author chenchunmei
 * @Date 2020/9/2 14:58
 * @Version 1.0
 * 自定义的UserRealm
 */
public class UserRealm extends AuthorizingRealm {

    @Autowired
    private UserService userService;

    //授权
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        System.out.println("执行了授权");
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        //通过认证的方法获取传来的当前用户
        User currentUser = (User) principalCollection.getPrimaryPrincipal();
        //从数据库中获取该用户的资源权限
        info.addStringPermission(currentUser.getPerms());
        return info;
    }

    //认证
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        System.out.println("执行了认证");

        //用户名验证
        UsernamePasswordToken userToken = (UsernamePasswordToken) authenticationToken;
        User user = userService.login(userToken.getUsername());
        if(user == null){
            return null;
        }

        //密码验证
        return new SimpleAuthenticationInfo(user,user.getPassword(),"");
    }
}
```

> controller包

- MyController

```java
package com.shiro.springshiro.controller;

import com.shiro.springshiro.pojo.User;
import com.shiro.springshiro.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @Author chenchunmei
 * @Date 2020/9/2 11:24
 * @Version 1.0
 */
@Controller
public class MyController {

    //日志门面，
    private static final transient Logger log = LoggerFactory.getLogger(MyController.class);

    @GetMapping({"/","/index"})
    public String toIndex(){

        return "index";
    }

    @GetMapping("/view/add")
    public String add(){
        return "view/add";
    }

    @GetMapping("/view/update")
    public String update(){
        return "view/update";
    }

    @GetMapping("/toLogin")
    public String toLogin(){
        return "login";
    }

    @RequestMapping("/login")
    public String login(String username, String password, Model model){
        //获取当前用户
        Subject subject = SecurityUtils.getSubject();
        //封装用户的登陆数据
        UsernamePasswordToken token = new UsernamePasswordToken(username, password);
        try{
            subject.login(token);
            //登陆认证后才将该用户的token放到session中返回给前端
            Session session = subject.getSession();
            session.setAttribute("loginUser",token);
            return "index";
        }catch (UnknownAccountException e){
            model.addAttribute("msg","用户名不存在");
            log.info("用户名不存在 ====="+e.getMessage());
            return "login";
        }catch(IncorrectCredentialsException e){
            model.addAttribute("msg","密码错误");
            log.info("密码错误 ====="+e.getMessage());
            return "login";
        }

    }

    @RequestMapping("/unauthor")
    @ResponseBody
    public String unauthor(){
        return "该用户未授权";
    }
}
```

> mapper包

- UserMapper

```java
package com.shiro.springshiro.mapper;

import com.shiro.springshiro.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

/**
 * @Date 2020/9/2 17:22
 * @Version 1.0
 */
@Mapper
@Repository
public interface UserMapper {

    @Select("select * from user where username = #{username}")
    public User login(String usernmae);
}
```

>service包

```java
package com.shiro.springshiro.service;

import com.shiro.springshiro.pojo.User;

/**
 * @Date 2020/9/2 17:25
 * @Version 1.0
 */
public interface UserService {

    public User login(String usernmae);
}
```

```java
package com.shiro.springshiro.service.impl;

import com.shiro.springshiro.mapper.UserMapper;
import com.shiro.springshiro.pojo.User;
import com.shiro.springshiro.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @Date 2020/9/2 17:26
 * @Version 1.0
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public User login(String usernmae) {
        return userMapper.login(usernmae);
    }
}
```

> pojo包

```java
package com.shiro.springshiro.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @Date 2020/9/2 17:20
 * @Version 1.0
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    private int id;
    private String username;
    private String password;
    private String perms;
}
```

> 前端文件

- index

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org"
      xmlns:shiro="http://www.thymeleaf.org/thymeleaf-extras-shiro">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<h1>首页</h1>
<div th:if="${session.loginUser == null}">
    <h3><a href="/toLogin">登录</a></h3>
</div>

<div shiro:hasPermission="user:add">
    <a href="/view/add">add</a>
</div>
<div shiro:hasPermission="user:update">
    <a href="/view/update">update</a>
</div>
<div>
    <a href="/view/delete">delete</a>
</div>

</body>
</html>
```

- login

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<p th:text="${msg}" style="color: red"></p>
<form action="/login">
    用户名：<input type="text" name="username"/><br>
    密码：<input type="password" name="password"/><br>
    <input type="submit"/>

</form>

</body>
</html>
```

- add,update,delete一样

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>add</h1>

</body>
</html>
```

