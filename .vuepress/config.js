module.exports = {
  "title": "betty-chen",
  "description": "一个记录知识的博客",
  "dest": "public",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    "nav": [
      {
        "text": "主页",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "时间轴",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "文档",
        "icon": "reco-document",
        "items": [
          {
            "text": "框架架构",
            "link": "/docs/frame-framework/"
          },{
            "text": "中间件",
            "link": "/docs/middl-eware/"
          },{
            "text": "服务注册中心",
            "link": "/docs/server-register/"
          },
          {
            "text":"安全框架",
            "link":"/docs/security-frame/"
          }
        ]
      },
      {
        "text": "联系",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/recoluan",
            "icon": "reco-github"
          }
        ]
      }
    ],
    "sidebar": {
      "/docs/frame-framework/": [
        "",
        "theme",
        "distributed",
        "betty-chen"
      ],
      "/docs/middl-eware/": [
        ""
      ],
      "/docs/server-register/": [
        "",
        "Eureka",
        "Eureka-server",
        "Zookeeper"
      ],
      "/docs/security-frame/":[
        "",
        "shiro"
      ]
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "分类"
      },
      "tag": {
        "location": 3,
        "text": "标签"
      }
    },
    "friendLink": [
      {
        "title": "betty-chen",
        "desc": "Enjoy when you can, and endure when you must.",
        "email": "761458279@qq.com",
        "link": "https://www.recoluan.com"
      },
      {
        "title": "知识-耐心-拼搏",
        "desc": "这是一个遨游在知识的领域 & betty-chen.",
        "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        "link": "https://vuepress-theme-reco.recoluan.com"
      }
    ],
    "logo": "/betty.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "betty-chen",
    "authorAvatar": "/title.png",
    "record": "xxxx",
    "startYear": "2017"
  },
  "markdown": {
    "lineNumbers": true
  }
}