# 导航中心

简洁美观的个人导航中心网站。

&gt; 本项目基于 [iori-nav](https://github.com/jy02739244/iori-nav) 为基础开发，部分功能受 [CloudNav-Oorz](https://github.com/oorzc/CloudNav) 启发，由 [KIMI](https://kimi.moonshot.cn)主导技术实现。

---

## 🌐 在线体验

https://navhub.niceone2.ccwu.cc/

---

## 🖼️ 效果预览
（本项目基于[iori-nav](https://github.com/jy02739244/iori-nav) 为基础开发，预览效果借用原项目，在此表示致谢！）

| 风格一 | 风格一 |
| :---: | :---: |
| ![风格一预览 1](./image/fengge1_1.png) | ![风格一预览 2](./image/fengge1_2.png) |

| 风格二 | 风格三 |
| :---: | :---: |
| ![风格二预览](./image/fengge2.png) | ![风格三预览](./image/fengge3.png) |

| 桌面设置界面 | 移动设置界面 |
| :---: | :---: |
| ![桌面设置界面预览](./image/setting.png) | ![移动设置界面预览](./image/phone_setting.png) |

后台设置页支持分别配置桌面端与手机端卡片，包括卡片列数、卡片风格、切换动画、是否隐藏描述/链接行/分类、毛玻璃效果、圆角以及标题和描述的字体样式。后台设置页面为 URL 后加 `/admin`。

| 手机端风格一 | 手机端风格二 | 手机端风格三 |
| :---: | :---: | :---: |
| ![手机端风格一预览](./image/phone_1.png) | ![手机端风格二预览](./image/phone_2.png) | ![手机端风格三预览](./image/phone_3.png) |

> 💡 手机端可独立设置 1/2/3 列布局，并根据卡片密度自动优化复制按钮显示；卡片的毛玻璃效果和程度也可以在后台设置里自定义。

---

## ✨ 新增功能

- **Favicon URL 自定义** — 支持自定义网站图标，支持本地图片上传，使标签页更具个性化
- **GitHub 链接自定义** — 导航页页脚 GitHub 图标链接可自定义配置
- **置顶/常用分类** — 支持将书签归档于各自分类并同时可以置顶显示，置顶书签可以后台排序
- **桌面端侧边栏抽屉式设计** — 桌面端启用侧边栏时，点击分类标签或刷新，侧边栏会自动收起，展现更优雅的桌面端交互体验
- **必应搜索** — 集成必应搜索引擎
- **天气组件** 🌤️ — 开发中......

---

## 🚀 快速部署

基于 Cloudflare 全家桶（Pages + Workers + D1 + KV），零服务器成本。

### 1. Fork 本仓库

点击右上角 ⭐ Star，再点击 **"Fork on GitHub"** 按钮，将仓库复制到你的 GitHub 账号下。

### 2. 连接 Cloudflare Pages

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 **Pages** → **创建项目** → **连接到 Git**
3. 选择你 Fork 的 `NavHub` 仓库
4. 项目名称可以自定义（如 `navhub`）
5. 生产分支选`main`
6. 构建设置：
   - 框架预设：选 `None`或 `无`
   - 构建命令：留空
   - 输出目录：填 `public`
7. 点击 **保存并部署**

### 3. 创建 D1 数据库

1. 进入 Cloudflare Dashboard → **Workers & Pages** → **D1**
2. 点击 **创建数据库**，名称可自定义（如 `navhub-d1`）

### 4. 创建 KV 命名空间

1. Cloudflare Dashboard → **存储和数据库** → **KV**
2. 点击 **创建命名空间**，名称可自定义：（如 `navhub-kv`）
3. 创建完成以后会自动来到“KV 对”页面，添加两个条目，用于设置管理后台的 用户名 和 密码：
   -第一条：密钥框输入`admin_username`  值：（可自定义）【这个就是后台管理员的用户名】
   -第二条：密钥框输入`admin_password`  值：（可自定义）【这个就是后台管理员密码】

### 5. 绑定 D1 数据库和 KV 命名空间
1. 进入 Cloudflare Dashboard → **Workers & Pages**
2. 点击刚刚创建的 Pages 项目（如 `navhub`） → **设置** → 找到下方**绑定** → 点击右侧**添加**：
   -选择 D1 数据库： 变量名称填`NAV_DB`，点击下方框内选择刚刚创建的D1数据库（如 `navhub-d1`），然后点击**保存**
   -继续**添加**选择 KV 命名空间：变量名称填`NAV_AUTH`，点击下方框内选择刚刚创建的KV 空间（如 `navhub-kv`），然后点击**保存**
   -（可选项，非必须）继续**添加**选择 Workers AI：变量名称填`AI`，然后点击**保存**

### 6. 重新部署

完成以上步骤以后，点击Pages 项目 → **部署** → 点击项目最后一次部署条目后面的三个点··· → **重试部署**，等待部署完成即可访问。


---

## 🔧 环境变量

| 变量名 | 说明 | 必填 |
|--------|------|------|
| `NAV_DB` | D1 数据库绑定 | 是 |
| `NAV_AUTH` | KV 存储绑定 | 是 |

---

## 🛠️ 技术栈

- **前端**：原生 HTML + CSS + JavaScript
- **后端**：Cloudflare Workers
- **数据库**：Cloudflare D1
- **缓存**：Cloudflare KV
- **部署**：Cloudflare Pages

---

## 📝 更新日志

### v1.0.0
- 独立仓库发布
- 新增置顶/常用分类功能
- 新增侧边栏抽屉式设计
- 新增必应搜索
- 新增自定义头像和 Favicon
- 运行时自动数据库迁移

---

## 📄 License

MIT

---

## 🙏 致谢

- [iori-nav](https://github.com/jy02739244/iori-nav) — 原始项目
- [CloudNav-Oorz](https://github.com/oorzc/CloudNav) — 参考项目
- [KIMI](https://kimi.moonshot.cn)— 主导技术实现与功能开发

## 📞 联系方式

- **项目作者**：[@Yu](https://github.com/Yu-Home01)
- **项目链接**：[https://github.com/Yu-Home01/NavHub)](https://github.com/Yu-Home01/NavHub)

<p align="center">如果你喜欢这个项目，请给它一个 ⭐️！</p>
