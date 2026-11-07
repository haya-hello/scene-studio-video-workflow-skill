# Scene Studio Video Workflow Skill

这是一个可复用的 Codex Skill，把本地视频生成工作台的完整流程整理为可审阅、可恢复的生产管线：素材取证、商品简报、剧本、自审、提示词、模型预检、一次性提交、任务查询、本地缓存、成片验收和交付。

## 安装

将本仓库中的目录复制到 Codex skills 目录，或直接把仓库目录作为 Skill 路径使用：

```text
scene-studio-video-workflow/
├── SKILL.md
├── agents/openai.yaml
├── references/
└── scripts/check-public-package.mjs
```

验证：

```powershell
python <path-to-skill-creator>/scripts/quick_validate.py .
node scripts/check-public-package.mjs .
```

## 设计来源

- [OpenAI Codex skill-creator](https://github.com/openai/codex/blob/main/codex-rs/skills/src/assets/samples/skill-creator/SKILL.md)：采用按需加载、`SKILL.md` 加 references、初始化器和验证器的结构。
- [ByteDance Deer Flow video-generation skill](https://github.com/bytedance/deer-flow/blob/main/skills/public/video-generation/SKILL.md)：参考视频生成任务的提示词与执行分离方式。
- [Square-Zero-Labs video-prompting-skill](https://github.com/Square-Zero-Labs/video-prompting-skill)：参考视频提示词 Skill 的边界和提示词工作流表达。

本包只保留流程与接口约定，不包含任何 API 密钥、用户素材、任务记录、签名地址或生成成片。

## 许可证

MIT，见 [LICENSE](LICENSE)。
