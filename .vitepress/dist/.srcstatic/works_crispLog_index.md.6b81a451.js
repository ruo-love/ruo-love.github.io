import{_ as s,o as a,c as n,Q as e}from"./chunks/framework.a944d67c.js";const g=JSON.parse('{"title":"crisp-log","description":"","frontmatter":{},"headers":[],"relativePath":"works/crispLog/index.md","filePath":"works/crispLog/index.md","lastUpdated":1709005023000}'),l={name:"works/crispLog/index.md"},p=e(`<h1 id="crisp-log" tabindex="-1">crisp-log <a class="header-anchor" href="#crisp-log" aria-label="Permalink to &quot;crisp-log&quot;">​</a></h1><h3 id="%E5%BF%AB%E9%80%9F%E7%94%9F%E6%88%90%E6%B8%85%E6%99%B0%E3%80%81%E7%AE%80%E6%B4%81%E7%9A%84%E6%8F%90%E4%BA%A4%E4%BF%A1%E6%81%AF" tabindex="-1">快速生成清晰、简洁的提交信息 <a class="header-anchor" href="#快速生成清晰、简洁的提交信息" aria-label="Permalink to &quot;快速生成清晰、简洁的提交信息&quot;">​</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki vitesse-light"><code><span class="line"><span style="color:#393a34;">npm i crisp-log -g</span></span>
<span class="line"><span style="color:#393a34;"></span></span>
<span class="line"><span style="color:#393a34;">or</span></span>
<span class="line"><span style="color:#393a34;"></span></span>
<span class="line"><span style="color:#393a34;">npm i crisp-log -D</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="feature" tabindex="-1">feature <a class="header-anchor" href="#feature" aria-label="Permalink to &quot;feature&quot;">​</a></h3><ol><li>一句命令生成规范 commit</li><li>可视化生成 commit</li><li>自动识别分支生成 commit type</li></ol><h3 id="%E5%91%BD%E4%BB%A4" tabindex="-1">命令 <a class="header-anchor" href="#命令" aria-label="Permalink to &quot;命令&quot;">​</a></h3><h4 id="crisp%20log%20%5Btype%5D%20%5Bmessage%5D" tabindex="-1">crisp log [type] [message] <a class="header-anchor" href="#crisp log [type] [message]" aria-label="Permalink to &quot;crisp log [type] [message]&quot;">​</a></h4><p>例如：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki vitesse-light"><code><span class="line"><span style="color:#B07D48;">crisp</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">log</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">feat</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">开发购物车功能</span></span>
<span class="line"></span>
<span class="line"><span style="color:#393A34;">↓👇</span><span style="color:#B07D48;">等价于</span><span style="color:#393A34;">↓</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B07D48;">git</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">add</span><span style="color:#393A34;"> </span><span style="color:#999999;">.</span></span>
<span class="line"><span style="color:#B07D48;">git</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">commit</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">-</span><span style="color:#B07D48;">m</span><span style="color:#393A34;"> </span><span style="color:#B5695999;">&#39;</span><span style="color:#B56959;">feat: 开发购物车功能</span><span style="color:#B5695999;">&#39;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h4 id="crisp%20log" tabindex="-1">crisp log <a class="header-anchor" href="#crisp log" aria-label="Permalink to &quot;crisp log&quot;">​</a></h4><p>可视化生成 commit</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki vitesse-light"><code><span class="line"><span style="color:#393a34;">可视化手动选择type 生成message</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="crisp%20log%20%5Bmessage%5D" tabindex="-1">crisp log [message] <a class="header-anchor" href="#crisp log [message]" aria-label="Permalink to &quot;crisp log [message]&quot;">​</a></h4><p>如果 type 没有设定，会自动识别当前分支关键词，例如当前分支为 fix/cart-zero</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki vitesse-light"><code><span class="line"><span style="color:#393a34;">crisp log 修复购物车删除异常</span></span>
<span class="line"><span style="color:#393a34;"></span></span>
<span class="line"><span style="color:#393a34;">↓👇等价于↓</span></span>
<span class="line"><span style="color:#393a34;"></span></span>
<span class="line"><span style="color:#393a34;">git add .</span></span>
<span class="line"><span style="color:#393a34;">git commit -m &#39;fix: 修复购物车删除异常&#39;  //此处的fix 是通过识别分支名获取的</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="%E5%85%B6%E4%BB%96%E5%8F%82%E6%95%B0" tabindex="-1">其他参数 <a class="header-anchor" href="#其他参数" aria-label="Permalink to &quot;其他参数&quot;">​</a></h3><p>crisp log [type] [message] -n // 加上-n 参数表示 只进行 git commit，不执行 git add .</p><p>crisp log [type] [message] -p // 加上-p 参数表示 commit 之后自动 git push</p><p>crisp log [type] [message] -u // 加上-u 参数表示 commit 之后自动 git push -u origin branch:branch</p>`,19),o=[p];function r(i,c,t,d,m,u){return a(),n("div",null,o)}const h=s(l,[["render",r]]);export{g as __pageData,h as default};