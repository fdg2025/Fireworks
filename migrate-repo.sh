#!/bin/bash

# Firework Simulator - Repository Migration Script
# 将 fork 仓库迁移到新的独立仓库

echo "================================================"
echo "🎆 Firework Simulator - 仓库迁移工具"
echo "================================================"
echo ""
echo "⚠️  警告：执行前请确保："
echo "   1. 已在 GitHub 上创建新的空仓库（不要初始化 README）"
echo "   2. 新仓库名称（建议使用相同名称）"
echo "   3. 新仓库 URL"
echo ""
read -p "是否继续？(y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 已取消"
    exit 1
fi

echo ""
echo "📝 请输入新仓库的 GitHub URL"
echo "   格式示例: git@github.com:your-username/Firework_Simulator.git"
echo "   或: https://github.com/your-username/Firework_Simulator.git"
read -p "新仓库 URL: " NEW_REPO_URL

if [ -z "$NEW_REPO_URL" ]; then
    echo "❌ 错误：仓库 URL 不能为空"
    exit 1
fi

echo ""
echo "🔄 开始迁移..."
echo ""

# 备份当前远程配置
echo "1️⃣  备份当前配置..."
CURRENT_REMOTE=$(git remote get-url origin)
echo "   当前远程: $CURRENT_REMOTE"

# 添加新的远程仓库
echo ""
echo "2️⃣  添加新远程仓库..."
git remote add new-origin "$NEW_REPO_URL"
echo "   ✓ 已添加新远程: $NEW_REPO_URL"

# 推送所有分支和标签
echo ""
echo "3️⃣  推送所有分支和标签到新仓库..."
git push new-origin --all
git push new-origin --tags
echo "   ✓ 推送完成"

# 更新远程配置
echo ""
echo "4️⃣  更新远程配置..."
git remote remove origin
git remote rename new-origin origin
echo "   ✓ 已将新仓库设置为 origin"

# 设置上游分支
echo ""
echo "5️⃣  设置上游分支..."
git branch --set-upstream-to=origin/main main
echo "   ✓ 已设置上游分支"

echo ""
echo "================================================"
echo "✅ 迁移完成！"
echo "================================================"
echo ""
echo "📊 仓库状态："
echo "   新远程: $(git remote get-url origin)"
echo "   当前分支: $(git branch --show-current)"
echo ""
echo "📝 后续步骤："
echo "   1. 访问新仓库确认所有内容正常"
echo "   2. 更新 Vercel 部署配置指向新仓库"
echo "   3. 如需要，删除旧的 fork 仓库"
echo ""
echo "💡 提示："
echo "   - 旧仓库地址: $CURRENT_REMOTE"
echo "   - 新仓库地址: $NEW_REPO_URL"
echo ""
