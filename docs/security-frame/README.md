---
title: SpringSecurity安全框架
date: 2021-07-31
tags:
 - SpringSecurity
---
# SpringSecurity安全框架

> 做认证、授权

- 功能权限
- 访问权限
- 菜单权限
- 以前做的权限都是使用拦截器、过滤器：大量冗余的代码。

Aop（面向切面编程）

### 简介

Spring Security是针对Spring项目的安全框架，也是Spring Boot的底层安全模块默认的技术选型，他可以实现强大的Web安全控制，对于安全控制，我们仅需要引入spring-boot-starter-security模块，进行少量的配置，即可实现强大的安全管理。

==重要的几个类==

- WebSecurityConfigAdapter:自定义Security策略
- AuthenticationManagerBuilder:自定义认证策略
- @EnableWebSecurity:开启WebSecurity模式

Spring Security的主要目标是“认证”和授权（访问控制）。

“认证”(Authentication)

"授权"（Authorization）

这个概念是通用的，而不是只在Spring Security中存在

参看官网：https://spring.io/projects/spring-security

### 快速开始

- 先创建项目
- 导入对应的依赖

```xml
<dependencies>
        <dependency>
            <groupId>org.thymeleaf</groupId>
            <artifactId>thymeleaf-spring5</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <dependency>
            <groupId>org.thymeleaf.extras</groupId>
            <artifactId>thymeleaf-extras-java8time</artifactId>
        </dependency>
        <dependency>
            <groupId>org.thymeleaf.extras</groupId>
            <artifactId>thymeleaf-extras-springsecurity4</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
    </dependencies>
```

- 将thymeleaf缓存关闭

```properties
spring.thymeleaf.cache=false
```

- 自定义配置类继承WebSecurityConfigurerAdapter类   重写授权和认证的方法

```java
package com.study.springsecurity.config;

import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * @Author chenchunmei
 * @Date 2020/9/1 16:03
 * @Version 1.0
 */
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    //授权
    @Override
    protected void configure(HttpSecurity http) throws Exception {
         //首页所有人都可以访问
        //里面的功能页只有登陆的人才能访问。
        http.authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/level1/**").hasRole("vip1")
                .antMatchers("/level2/**").hasRole("vip2")
                .antMatchers("/level3/**").hasRole("vip3");

        //没有权限跳到登陆页面
        http.formLogin();

        //防止安全攻击 
        http.csrf().disable();
        //开启注销功能
        http.logout().logoutSuccessUrl("/");
    }

    //认证

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication().passwordEncoder(new BCryptPasswordEncoder())
                .withUser("chenchunmei").password(new BCryptPasswordEncoder().encode("123456")).roles("vip1","vip2")
                .and().withUser("root").password(new BCryptPasswordEncoder().encode("123456")).roles("vip1","vip2","vip3")
                .and().withUser("guest").password(new BCryptPasswordEncoder().encode("123456")).roles("vip1");
    }
}

```

==如果注销不能正确的跳出，存在问题可能是防止安全攻击的没有关闭，在授权的方法中添加这行代码即可。==

```java
//防止安全攻击 
http.csrf().disable();
```

>在认证时可以使用缓存中的用户进行认证，也可以使用数据库中的用户进行认证，本例子使用的是缓存中的用户进行认证。