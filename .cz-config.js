module.exports = {
  types: [
    { value: 'feat', name: 'feat: A new feature' },
    { value: 'fix', name: 'fix: A bug fix' },
    { value: 'docs', name: 'docs: Documentation changes' },
    {
      value: 'style',
      name: 'style: Code style changes (no functional changes)',
    },
    {
      value: 'refactor',
      name: 'refactor: Code refactoring (neither a feature nor a bug fix)',
    },
    { value: 'test', name: 'test: Adding tests' },
    {
      value: 'chore',
      name: 'chore: Changes to build process or auxiliary tools',
    },
  ],
  scopes: [
    { name: 'component' },
    { name: 'API' },
    { name: 'performance optimization' },
  ],
  messages: {
    type: 'Select the type of change you are committing:',
    scope: 'Select the scope affected (optional):',
    customScope: 'Enter a custom scope:',
    subject: 'Write a short description (required):',
    body: 'Provide a detailed description (optional):',
    breaking: 'List any breaking changes (optional):',
    footer: 'List any issues closed (e.g., "fix #123", optional):',
    confirmCommit: 'Are you sure you want to proceed with the above commit?',
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['body', 'footer'],
};
