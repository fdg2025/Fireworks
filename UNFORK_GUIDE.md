# 去除 Fork 信息指南

## 问题说明

当仓库是从其他账号 fork 过来的，你的贡献（commits）不会显示在你的 GitHub Profile 的 contribution graph 中，即使你是原作者。

## 解决方案对比

| 方案 | 优点 | 缺点 | 所需时间 |
|------|------|------|----------|
| **GitHub Support** | 保留所有 stars/forks/issues | 需要等待审核 | 1-3 天 |
| **创建新仓库** | 立即生效，完全控制 | 丢失 stars/forks | 10 分钟 |

---

## 方案 1️⃣：通过 GitHub Support（推荐）

### 步骤 1：提交支持请求

访问：https://support.github.com/contact

选择：
- **Topic**: Account and profile
- **Subtopic**: Repositories

### 步骤 2：填写请求

**英文版：**

```
Subject: Request to detach fork relationship

Hi GitHub Support,

I would like to request that my repository be converted from a fork 
to a standalone repository.

Repository: https://github.com/fdg2025/Firework_Simulator

Reason: This project was accidentally forked from my alternate account, 
but I am the original author. The fork relationship is preventing my 
contributions from appearing on my profile's contribution graph.

Could you please detach this fork and convert it to a regular repository?

Thank you!
```

**中文版：**

```
主题：请求断开 Fork 关系

你好，

我想请求将我的仓库从 fork 转换为独立仓库。

仓库地址：https://github.com/fdg2025/Firework_Simulator

原因：这个项目是我不小心从小号 fork 的，但我才是原作者。Fork 关系
导致我的贡献无法显示在 profile 的贡献图中。

能否帮我断开这个 fork 关系，将其转换为普通仓库？

谢谢！
```

### 步骤 3：等待处理

- GitHub 通常在 1-3 个工作日内回复
- 处理完成后会收到邮件通知
- 你的 contribution 会立即开始计入

---

## 方案 2️⃣：创建新仓库迁移（立即生效）

### 准备工作

1. **在 GitHub 创建新仓库**
   - 访问：https://github.com/new
   - 仓库名：`Firework_Simulator`（或其他名称）
   - ⚠️ **不要**勾选 "Initialize with README"
   - 创建后复制仓库 URL

### 自动迁移（使用脚本）

```bash
# 1. 给脚本执行权限
chmod +x migrate-repo.sh

# 2. 运行迁移脚本
./migrate-repo.sh

# 3. 按提示输入新仓库 URL
# 例如: git@github.com:your-username/Firework_Simulator.git
```

### 手动迁移步骤

```bash
# 1. 添加新远程仓库
git remote add new-origin git@github.com:YOUR-USERNAME/Firework_Simulator.git

# 2. 推送所有分支和标签
git push new-origin --all
git push new-origin --tags

# 3. 删除旧远程，重命名新远程
git remote remove origin
git remote rename new-origin origin

# 4. 设置上游分支
git branch --set-upstream-to=origin/main main

# 5. 验证
git remote -v
```

### 迁移后的任务

- [ ] 更新 Vercel 部署配置指向新仓库
- [ ] 更新本地克隆指向新仓库
- [ ] 通知协作者（如果有）
- [ ] 考虑删除旧 fork 仓库或归档
- [ ] 更新项目文档中的仓库链接

---

## 方案 3️⃣：保留两个仓库（不推荐）

如果你想保留 fork 关系，可以：

1. **在新账号创建独立仓库**（你的贡献会计入）
2. **保留 fork 仓库**用于同步上游更新
3. **设置双向同步**

但这会增加维护复杂度，不推荐。

---

## 常见问题

### Q: 迁移后会丢失什么？

**方案 1（GitHub Support）：**
- ✅ 不会丢失任何东西
- ✅ 保留所有 stars、forks、issues、PR

**方案 2（新仓库）：**
- ❌ 丢失 stars 和 forks 数量
- ❌ 丢失 issues 和 pull requests
- ✅ 保留完整的 git 历史
- ✅ 保留所有代码和提交记录

### Q: Contribution graph 多久更新？

- 断开 fork 后，贡献会**立即**开始计入
- 已有的历史贡献需要最多 **24 小时**才会显示在 graph 上
- 可以通过 `git log --author="your-email"` 验证提交记录

### Q: 为什么 fork 的贡献不计入？

GitHub 的设计逻辑：
- Fork 的贡献属于原仓库作者
- 只有 **独立仓库** 或 **合并到上游的 PR** 才计入你的贡献
- 这防止通过 fork 刷贡献

### Q: Vercel 部署会受影响吗？

**方案 1：** 不会，仓库 URL 不变

**方案 2：** 需要重新配置：
1. 登录 Vercel Dashboard
2. 项目设置 → Git → Disconnect
3. 重新连接新仓库

---

## 推荐做法

1. **首选方案 1**（GitHub Support）
   - 保留所有数据和社交信号
   - 只需等待几天

2. **如果急需**，使用方案 2
   - 立即生效
   - 适合新项目或 stars 不多的情况

3. **迁移后检查清单**：
   ```bash
   # 验证远程仓库
   git remote -v
   
   # 验证提交记录
   git log --oneline -10
   
   # 推送测试
   git push origin main
   
   # 检查 GitHub Profile
   # 访问 https://github.com/YOUR-USERNAME
   # 检查贡献图
   ```

---

## 需要帮助？

如果遇到问题：
1. 检查 git 配置：`git config --list`
2. 检查远程仓库：`git remote -v`
3. 查看错误日志
4. 联系我或提交 issue

---

**最后更新：** 2026-02-17
