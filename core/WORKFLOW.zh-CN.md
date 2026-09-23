# 工作流参考

## 任务决策树

```text
新需求
   │
   ├─ 现有功能坏了？ ─────────────────→ BUG
   │
   ├─ 完全局部且低风险？ ─────────────→ SMALL CHANGE
   │
   └─ 新增/改变有意义的行为 ─────────→ FEATURE
```

## Feature Gates

中高风险 Feature 依次经过：

1. **Understanding Gate** — 已检查现有系统。
2. **Specification Gate** — 行为与验收标准清晰。
3. **Design Gate** — 实现方案和影响范围明确。
4. **Task Gate** — 已拆成可验证的小任务。
5. **Implementation Gate** — 代码与相关自动化检查完成。
6. **Review Gate** — 没有未解决的 Blocker / High 问题。
7. **Verification Gate** — 实际行为符合 Spec。
8. **Convergence Gate** — 文档、Tasks、代码、测试、实际行为一致。

## 风险对应流程

| 风险 | 推荐流程 |
|---|---|
| Low | 理解 → 修改 → 验证 |
| Medium | Mini Spec → Tasks → Tests → Review |
| High | Full Spec → Impact/Design → Recovery Point → Tests → Independent Review → QA |

## 常见高风险触发项

支付、登录/权限、用户余额/积分、破坏性写操作、数据库迁移、敏感数据、生产配置、Webhook/幂等、安全边界，以及大范围架构修改。
