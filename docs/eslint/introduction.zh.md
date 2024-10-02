# 🔥 ESLint 速配指南

## 🚀 核心问题概览

- 什么是 ESLint，有什么用？
- 结合 react、prettier, typescript, ESLint 如何配置？
- 如何在 vscode 中实现自动保存？

## 什么是 ESLint，有什么用？

ESLint 是一种静态代码分析工具，可帮助识别和修复代码中的问题。

如下，如果尝试在定义某个变量之前访问这些变量，则会抛出 ReferenceError。

```javascript
console.log(a);
let a = 2;
```

在 ESLint 中可以定义各种规则，在我们编写代码的时候提示相应的错误。

## 结合 react、prettier, ESLint 如何配置？

在项目对应的根目录下创建 .eslintrc.js 文件，配置内容如下：

```javascript
/**
  * @zh plugins 字段和 extends 字段的区别,恶心、、
  * @en The difference between plugins and extends, If you have rules that aren't in eslint, you need the plugin to extend them
*/
module.exports = {
   /**
    * @zh node 或者浏览器中的全局变量很多，如果我们一个个进行声明显得繁琐,因此就需要用到env，这是对环境定义的一组全局变量的预设
    * @en There are many global variables in node or browser, it would be cumbersome if we declare them one by one, So we need to a preset for a set of global variables defined
   */
  "env": {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  /**
   * @zh extends 可以看做是去集成一个个配置方案的最佳实践
   * eslint 开头的 ESLint 官方扩展有两个：eslint:recommended（推荐规范）和eslint:all（所有规范）。
   * plugin 开头的扩展是插件类型扩展
   * eslint-config 的 npm 包，使用时可以省略 eslint-config-
   * @ 开头的扩展,是在npm包上面加了一层作用域 scope
   * 需要注意的是：多个扩展中有相同的规则，以后面引入的扩展中规则为准。
   * @en extends can be seen as the best practice about configuration
   * There are two official ESLint extensions starting with eslint word: eslint:recommended (recommended specification) and eslint:all (all specifications).
   * Extensions starting with plugin are plugin extensions
   * Npm package starting with eslint-config- that can be omitted when using
   * The extension at the beginning of @ is to add a scope to the npm package
   * It should be noted that if multiple extensions have the same rules,the rules in the extends introduced early will be overwritten.
   */
  "extends": [
    "airbnb",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:import/recommended"
  ],
  /**
  * @zh 此部分指定用于解析代码的解析器。在本例中，指定为 TypeScript 解析器
  * @en This section specifies the parser to use for parsing the code. In this case, it specifies the TypeScript parser
  */
  "parser": "@typescript-eslint/parser",
  /**
   * @zh 指定解析器选项
   * @en this section specifies the parser options
   */
  "parserOptions": {
    "ecmaFeatures": {
    /**
      * @zh 启用 JSX，支持 JSX 语法并不等同于支持 React。React 对 JSX 语法应用了特定的语义，而 ESLint 并不能识别。如果你使用 React 并且使用 React 语法，我们建议使用 eslint-plugin-react。
      * @en By default, the sourceType is "module" for .js and .mjs files, and "commonjs" for .cjs files
     */
      "jsx": true
    },
    /**
      * @zh support ECMAScript version
      * @en By default, the sourceType is "module" for .js and .mjs files, and "commonjs" for .cjs files
     */
    "ecmaVersion": 12,
    /**
      * @zh 你sourceType：默认情况下，.js 和 .mjs 文件的 sourceType 是 "module"，而 .cjs 文件则是 "commonjs"
      * @en By default, the sourceType is "module" for .js and .mjs files, and "commonjs" for .cjs files
     */
    "sourceType": "module"
  },
  /**
   * @zh 插件是一个 npm 包，通常输出规则。要确保这个包安装在 ESLint 能请求到的目录下。plugins属性值可以省略包名的前缀 eslint-plugin-。
   * 插件一个主要的作用就是补充规则，比如eslint:recommended中没有有关react的规则，则需要另外导入规则插件eslint-plugin-react
   * @en A plugin is an npm package that typically exports rules. Make sure the package is installed in a directory
   * where ESLint can request it.The plugins attribute value can omit the prefix eslint-plugin- of the package name.
   * One of the main functions of the plugin is to supplement rules,for example, if there are no rules about react
   * in eslint:recommended, you need to import the rule plugin eslint-plugin-react
   */
  plugins: ["react"],
  /**
   * 0 or 'off'：close rule(关闭规则)。
   * 1 or 'warn'：enable the rule，treat it as a warning(does not cause the program to fail) 并将其视为一个警告（不会导致程序失败)
   * 2 or 'error'：enable the rule, treat it as a bug (which will cause the program to fail if not fixed) 打开规则，并将其视为一个错误（如果不修复，将导致程序失败）
   */
  rules: {
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": [ "error" ],
    "react/jsx-filename-extension": [ "warn", { "extensions": [ ".tsx" ] } ],
    "import/extensions": [ "error", "ignorePackages", { "ts": "never", "tsx": "never" } ],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": [ "error" ],
    "@typescript-eslint/explicit-function-return-type": [ "error", { "allowExpressions": true } ],
    "max-len": [ "warn", { "code": 100, "ignoreComments": true, "ignoreUrls": true } ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "import/prefer-default-export": "off",
    "react/prop-types": "off",
    "prettier/prettier": [ "error", { "endOfLine": "auto" } ]
  },
  "settings": {
    "import/resolver": {
      "typescript": {}
    }
  }
}
```

## 简化配置

其实可以简化上面的 prettier 配置，如下：

```javascript
{
  "extends": ["plugin:prettier/recommended"]
}
```

官方文档提示，这跟上面提到的的 prettier 配置是等价的，所以，一般情况，使用这个配置覆盖 Eslint。

## Prettier 配置字段详解

除了覆盖 ESLint 冲突的功能，我们还需要自己配置一下，如何格式化我们的代码。

首先，新建 .prettierrc.js 文件，并写入以下内容：

```javascript
module.exports = {
  /**
   * @zh 行尾需要有分号
   * @en A semicolon is required at the end of the line
   */
  semi: true,
  /**
   * @zh 使用单引号
   * @en use single quotes
   */
  singleQuote: true,
  /**
   * @zh Jsx 不使用单引号，而使用双引号
   * @en Instead of using single quotes, use double quotes in Jsx
   */
  jsxSingleQuote: false,
  /**
   * @zh 不使用 Tab 缩进，而使用空格
   * @en Instead of using Tab indent, use spaces
   */
  useTabs: false,
  /**
   * @zh 使用 2 个空格缩进
   * @en Indent with 2 spaces
   */
  tabWidth: 2,
  /**
   * @zh 一行最多 140 字符
   * @en Maximum 140 characters per line
   */
  printWidth: 140,
};
```

## 注意

在 vscode 中，如果修改了 .prettierrc.js 的配置选项后，发现 eslint 和 prettier 冲突了，需要重启 vscode，以免使用缓存，不能及时更新配置。

## vscode 配置保存时格式化（

- 首先，在 vscode 商店输入 prettier，然后下载 prettier 插件, 接着，你可以通过按 `Ctrl + Shift + P`（或 macOS 上的 `Cmd + Shift + P`）打开命令面板通过输入 prettier 字符，来验证是否 prettier 命令可用。
  ![alt text](./images/vscode-prettier.png)

- 接着启动，选择 文件 > 首选项 > 设置（或在 macOS 上使用 Cmd + ），在搜索栏输入 `Format on Save` , 然后勾选 Editor：`Format on Save`
  ![alt text](./images/format-on-save.png)

## 如何直接下载 Prettier 配置文件

为了方便管理各种配置项，例如 prettier，eslint，gitignore 等等配置，可以使用一下方法，来下载基础版本的配置文件，我们就拿 prettier 来说：

```

```
