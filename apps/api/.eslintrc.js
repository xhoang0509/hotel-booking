module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: 'eslint:recommended',
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    plugins: ['spellcheck'],
    rules: {
        'spellcheck/spell-checker': 'off',
        'no-unused-vars': 'warn',
        'no-undef': 'warn',
        'no-dupe-keys': 'warn',
        'no-prototype-builtins': 'warn',
    },
};
