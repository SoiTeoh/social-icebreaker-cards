# Social Icebreaker Cards — 项目状态

## 项目定位

多人聚会共用一台手机的轻量面对面破冰聊天卡 Web App，让屏幕退居二线，用简短问题与轻互动带动线下交流。

## 当前开发阶段

**MVP**（**MVP Development Complete — Pending Playtest**；已完成编码与 Phase C 自动化验收，待后续统一安排真人试玩与真机测试，暂不部署）

## 已完成编码与自动化验证的功能

- **4 个主题卡组，共 80 张双语卡片**：Casual（轻松聊）、Funny（逗个乐）、Deep（聊深一点）、Dating（约会聊），每组 20 张。
- **不重复洗牌与防连续重复重洗**：单轮周期内抽卡不重复；卡组抽空自动重洗时，避免下一轮第一张与上一轮最后一张相同（`src/lib/gameLogic.ts`）。
- **历史回看与进退导航**：支持 `Previous` / `Next card`（上限 60 条）、`Restart deck`、`Change deck` 与周期进度 `N / 20`，回退再前进不破坏剩余牌堆顺序。
- **Phase 3 对话增强**：28 张卡（每组 7 张）带 6 种口头互动提示；19 张卡带可按需展开的“接着聊 / Keep talking”追问，展开状态随历史记录保存。
- **Phase 4 双语支持与首屏防闪烁**：支持 `en` 与 `zh-CN` 切换，首次访问按 `localStorage` 与浏览器语言自动识别，缺失中文时回退英文；通过 `<head>` 同步初始化脚本 + `useLayoutEffect` 消除中文用户首屏英文闪烁且无 Hydration 报错，并在 `readSavedLanguage` / `saveLanguage` 中安全捕获 `window.localStorage` getter 异常。
- **移动端触控与无障碍支持**：支持左右滑动切卡（不阻断纵向滚动）、`44px+` 触控区、`aria-live`、`prefers-reduced-motion`。
- **可选静态导出与主页外链**：`next.config.mjs` 支持通过 `BLOG_STATIC_EXPORT=1` 导出到 `/apps/icebreaker`；`StartScreen.tsx` 保留返回个人项目页链接（`https://soiteoh.cc/projects/`）并已纳入 `localization.ts` 双语字典。

## 尚未完成与未验证内容

### 仍未验证的内容（暂缓）

- **尚未进行真人试玩**：对话提示是否改善线下交流、追问卡片实用性、中文文案母语自然度尚未经过真人聚会验证。
- **尚未进行真机测试**：Android Chrome / iOS Safari 实机单手滑动与浏览器差异尚未测试。
- **尚未部署**：按当前策略暂不发布到 GitHub Pages、Vercel 或个人站点。

### 未来扩展计划（Phase 5–8，未开发）

- 基于 `intensity`（1/2/3）的轻→深递进抽卡节奏。
- Phase 5 内容扩充与根据试玩反馈修订卡组。
- Phase 6 本地自定义卡组。
- Phase 7 单卡/卡组分享。
- Phase 8 辅助生成卡组。

## 最近验证结果（2026-11-13）

- **TypeScript 类型检查**（`npm.cmd run typecheck`）：通过，退出码 0。
- **Vitest 单元测试**（`npm.cmd test`）：3 个测试文件共 **12 项测试全部通过**，退出码 0。
- **生产构建与静态导出**：
  - 默认 Turbopack 构建仍存在环境相关的构建问题（`TurbopackInternalError: Failed to write app endpoint /page`），原因尚未最终确认。
  - 已将 `package.json` 的 `"build"` 脚本调整为 `"next build --webpack"`（不影响 `next dev` / `next start`）：常规 Webpack 生产构建与 `BLOG_STATIC_EXPORT=1` 静态导出（`out/` 含 `index.html`、`404.html`、`_next/static/`）均通过，退出码 0。
- **Playwright 端到端与首屏语言验证**：
  - 视口 `360×640`、`390×844`、`1280×800`：真实用户全流程（选卡组、抽卡、左右滑动、展开追问与历史保留、中英文切换、刷新持久化、切换卡组）全部通过，无横向溢出，0 控制台/页面报错；`360×640` 视口横向滑动时出现约 `19px` 纵向滚动余量，待真机验证。
  - 6 种首屏语言场景（中/英首次访问、`localStorage` 覆盖、`localStorage` getter 抛错、JS 延迟加载下 400ms 兜底显示、连续快速刷新）：均无英文闪屏、无空白卡死、无 Hydration 错误、`errs: []`。

## 当前 Git 状态

- **分支**：`main`
- **最近提交**：`69782ba Build bilingual social icebreaker prototype`（远程 `origin/main`: `https://github.com/SoiTeoh/social-icebreaker-cards.git`）
- **未提交修改**：包含 Phase B 与 Phase C 全部改动（含历史保留的 `next.config.mjs` 与 `StartScreen.tsx`），待用户确认后提交并推送。

## 下一阶段具体任务

1. 用户确认后，执行本地 Git 提交并推送至 `origin/main` 封存当前开发阶段。
2. 后续统一安排真机试玩时，在 Android Chrome 与 iOS Safari 实机验证单手滑动、中文文案自然度与对话效果，再决定是否进入 Phase 5。

## 暂缓事项

- 真人试玩
- 真机测试
- 正式部署
- 商业化

## 最近更新时间

2026-11-13
