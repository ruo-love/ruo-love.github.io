### 项目背景

- 利用 Scrapy 框架爬取贝壳二手房成交数据,存放指本地 excel 文件中。
- 解决链接反爬限制 3000 条数据的问题

### 流程

1. 进入二手房成交数据列表首页
2. 获取上海所有区域的链接
3. 进入各个区域的链接，获取该区域的板块链接
4. 进入各个板块的链接，获取该板块的各种户型结构
5. 以单独户型为最终条件，获取二手房成交数据，最大页码 100，超出 100 则继续增加过虑条件，以规避链接 3000 条数据的限制

### 地址

GitHub 项目地址：[https://github.com/ruo-love/beike-spider](https://github.com/ruo-love/beike-spider)
