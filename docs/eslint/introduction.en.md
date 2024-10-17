# 🔥 Prettier Quick Guide

## 🚀 Overview of Key Problem

- What is Prettier and what is it used for?
- Prettier and ESLint both format code, so how do you resolve conflicts to the same style?
- What are the common fields of an Prettier configuration file?
- How to directly download Prettier configuration files

## What is Prettier and what is it used for?

It is very common that multiple front-end developers maintain one project. So, a consistent coding style is necessary.

> Problems with coding style are, for example: single-line code length, tab or space for indentation, etc. Code quality issues refer to, for example: using undeclared variables.

Following this idea, we write the rules that override the conflict in the ESLint configuration file. The following is the configuration of the .eslintrc.js file about Prettier:

First, we need some prettier plug-ins to help us,

```javascript
# Install prettier
ni -D prettier

# Install prettier to integrate eslint library
ni -D eslint-plugin-prettier eslint-config-prettier
```
·
Then, in the root directory of the project, add the configuration of prettier to the .eslintrc.js file:

```Javascript
{
"extends": [
"prettier"
],
"plugins": ["prettier"],
"rules": {
"prettier/prettier": "error",
'arrow-body-style': 'off'
'prefer-arrow-callback': 'off',
}
}
```

Parameter interpretation:

- extends: ['prettier']: Use eslint-config-prettier to turn off conflicting rules between eslint and prettier.
- arrow-body-style and prefer-arrow-callback: These two rules have unsolvable conflicts in eslint and prettier, so turn them off.

First, create a new .prettierrc.js file and write the following content:

```javascript
module.exports = {
  /**
   * @zh A semicolon is required at the end of the line
   */
  semi: true,
  /**
   * @zh Use single quotes
   * @en use single quotes
   */
  singleQuote: true,
  /**
   * @zh Instead of using single quotes, use double quotes in Jsx
   */
  jsxSingleQuote: false,
  /**
   * @zh Instead of using Tab indent, use spaces
   * @en Instead of using Tab indent, use spaces
   */
  useTabs: false,
  /**
   * @zh Indent with 2 spaces
   */
  tabWidth: 2,
  /**
   * @zh Maximum 140 characters per line Characters
   * @en Maximum 140 characters per line
   */
  printWidth: 140,
};
```

## Note

In vscode, if you modify the configuration options of .prettierrc.js and find that eslint and prettier conflict, you need to restart vscode to avoid using cache and not updating the configuration in time.

## How to download the Prettier configuration file directly

In order to facilitate the management of various configuration items, such as prettier, eslint, gitignore, etc., you can use the following method to download the basic version of the configuration file. Let's take prettier as an example:

```

```
