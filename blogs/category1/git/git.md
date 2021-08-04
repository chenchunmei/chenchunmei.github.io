---
title: git使用教程
date: 2021-07-15
tags:
 - git
categories:
 - 版本控制工具
sidebar: auto
---

![vuepress](https://img.shields.io/badge/vuepress-0.14.8-brightgreen.svg)
![leancloud-storage](https://img.shields.io/badge/leancloud--storage-3.10.1-orange.svg)
![valine](https://img.shields.io/badge/valine-1.3.4-blue.svg)

## 基本操作
**是的**
::: tip 常用命令
1. git clone 仓库地址
2. 查看git提交记录日志：`git log` ；<br>
3. 版本回退命令：`git reset --hard commit号`；<br>
4. 查看当前git状态： `git status`；<br>
5. 设置全局密码：`git config --global credential.helper store` 解决每次提示输入用户名密码；<br>
5. 查看暂存区的记录`git stash list`；<br>
7. 从暂存区拉出文件`git stash pop`或者`git stash apply stash@{第几个暂存记录}`；<br>
8. 删除暂存记录`git stash drop stash@{第几个记录}`；<br>
9. 暂存区弹出并删除`git stash pop stash@{记录}`
:::

## 工作常用命令
**提交后并未push，想删除记录**

```bash
git add . #提交全部更改文件
git add /src/index.js #提交指定某个文件
git commit -m '提交描述信息' #本次提交的描述信息

```
**已经commit后，发现提交错了一些文件，或者漏修改了部分代码，想撤回commit记录** 

```bash
git commit --amend #进入到编辑器，可以修改提交的描述信息
点击a/i/o #进入编辑模式
点击esc #退出编辑模式
输入Z大写按键 #强制退出保存
```
**撤销提交的commit记录**
```bash
git reset --soft commit号 #撤销到上次的提交记录并保存修改的信息,只删除commit记录
git reset --mixed #撤销git add的操作并删除commit记录
git reset --hard 删除工作间改动的代码，撤销commit，撤销git add，完成这个操作后，就恢复到上一次的commit状态
