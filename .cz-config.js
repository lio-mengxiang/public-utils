module.exports = {
  types: [
    {
      value: ':sparkles: feat',
      name: '✨ feat:     新功能',
    },
    {
      value: ':bug: fix',
      name: '🐛 fix:      修复bug',
    },
    {
      value: ':tada: init',
      name: '🎉 init:     初始化',
    },
    {
      value: ':pencil2: docs',
      name: '✏️  docs:     文档变更',
    },
    {
      value: ':lipstick: style',
      name: '💄 style:    代码的样式美化',
    },
    {
      value: ':recycle: refactor',
      name: '♻️  refactor: 重构',
    },
    {
      value: ':zap: perf',
      name: '⚡️ perf:     性能优化',
    },
    {
      value: ':white_check_mark: test',
      name: '✅ test:     测试',
    },
    {
      value: ':rewind: revert',
      name: '⏪️ revert:   回退',
    },
    {
      value: ':package: build',
      name: '📦️ build:    打包',
    },
    {
      value: ':rocket: chore',
      name: '🚀 chore:    构建/工程依赖/工具',
    },
    {
      value: ':construction_worker: ci',
      name: '👷 ci:       CI related changes',
    },
  ],
  messages: {
    type: '请选择提交的类型: ',
    customScope: '请输入修改的范围（可选）',
    subject: '请简要描述提交（必填）',
    body: '请输入详细描述（可选）',
    footer: '请选择要关闭的issue（可选）',
    confirmCommit: '确认要使用以上信息提交？（y/n）',
  },
  // skip
  skipQuestions: ['customScope', 'body', 'footer'],
  // limit subject length
  subjectLimit: 100,
};
