module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation only changes
        'style',    // Code style changes (formatting, missing semi colons, etc)
        'refactor', // Code refactoring
        'perf',     // Performance improvements
        'test',     // Adding or updating tests
        'build',    // Changes to build system or dependencies
        'ci',       // CI/CD changes
        'chore',    // Other changes that don't modify src or test files
        'revert'    // Revert a previous commit
      ]
    ],
    'subject-case': [2, 'never', ['upper-case']], // Don't allow uppercase first letter
    'subject-empty': [2, 'never'],                // Subject cannot be empty
    'type-empty': [2, 'never'],                   // Type cannot be empty
    'scope-case': [2, 'always', 'lower-case']     // Scope must be lowercase
  }
};
