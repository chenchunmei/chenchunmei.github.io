---
title: mysql小技巧
date: 2021-07-30
tags:
 - mysql
categories:
 - 数据库相关
sidebar: auto
---

# Sql小技巧

> 快速的对比出两个表不同的数据

```mysql
select * from B where (select count(1) from A where A.ID = B.ID) = 0
```
> 清空数据并将自增id重置为0

```sql

TRUNCATE TABLE questions RESTART IDENTITY CASCADE;
```

```sql
---添加字段
mysql
ALTER TABLE stats_report_permission ADD edit INT NOT NULL DEFAULT 0 COMMENT '验收编辑限制 0-无；1-采集时间结束后才能在平台编辑'; 

pgsql
ALTER  table public.stats_report_permission ADD COLUMN edit int2 DEFAULT null;
COMMENT ON COLUMN public.stats_report_permission.edit IS '验收编辑限制 0-无；1-采集时间结束后才能在平台编辑';


ALTER  table public.stats_respondent_manage ADD COLUMN object_status int2 DEFAULT 0;
COMMENT ON COLUMN public.stats_respondent_manage.object_status IS '调查对象状态 0-关闭；1-开启';




--修改字段的类型
ALTER TABLE public.stats_report_permission
   ALTER COLUMN valid_day TYPE character varying(16) USING (valid_day::character varying(16));


```

::: theorem
 如果更改的数据只有两种类型时，比如想将男性别全部改成女性别，可以使用这样的sql来实现
:::
```sql
update teacher SET sex = if(sex = 1,2,1);
```