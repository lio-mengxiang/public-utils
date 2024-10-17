/**
 * The npm packages involved are
 *  eslint
 *  "eslint": "8.57.0", "eslint-plugin-import": "2.31.0",
 *  typescript
 *  "typescript": "5.6.2", "@typescript-eslint/eslint-plugin": "8.8.1", "@typescript-eslint/parser": "8.8.1", "eslint-import-resolver-typescript": "3.6.3",
 *  prettier
 *  "prettier": "3.3.3", "eslint-config-prettier": "9.1.0", "eslint-plugin-prettier": "5.2.1",
 *  react
 *  "eslint-config-react": "1.1.7", "eslint-config-react-hooks": "1.0.0", "eslint-plugin-react": "7.37.1", "eslint-plugin-react-hooks": "4.6.2",
 *
 */
module.exports = {
  root: true,
  /**
   * @zh node 或者浏览器中的全局变量很多，如果我们一个个进行声明显得繁琐,因此就需要用到env，这是对环境定义的一组全局变量的预设
   * @en There are many global variables in node or browser, it would be cumbersome if we declare them one by one, So we need to a preset for a set of global variables defined
   */
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
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
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
  ],
  /**
   * @zh 此部分指定用于解析代码的解析器。在本例中，指定为 TypeScript 解析器
   * @en This section specifies the parser to use for parsing the code. In this case, it specifies the TypeScript parser
   */
  parser: '@typescript-eslint/parser',
  /**
   * @zh 指定解析器选项
   * @en this section specifies the parser options
   */
  parserOptions: {
    ecmaFeatures: {
      /**
       * @zh 启用 JSX，支持 JSX 语法并不等同于支持 React。React 对 JSX 语法应用了特定的语义，而 ESLint 并不能识别。如果你使用 React 并且使用 React 语法，我们建议使用 eslint-plugin-react。
       * @en By default, the sourceType is "module" for .js and .mjs files, and "commonjs" for .cjs files
       */
      jsx: true,
    },
    /**
     * @zh support ECMAScript version
     * @en By default, the sourceType is "module" for .js and .mjs files, and "commonjs" for .cjs files
     */
    ecmaVersion: 12,
    /**
     * @zh 你sourceType：默认情况下，.js 和 .mjs 文件的 sourceType 是 "module"，而 .cjs 文件则是 "commonjs"
     * @en By default, the sourceType is "module" for .js and .mjs files, and "commonjs" for .cjs files
     */
    sourceType: 'module',
  },
  /**
   * @zh 插件是一个 npm 包，通常输出规则。要确保这个包安装在 ESLint 能请求到的目录下。plugins属性值可以省略包名的前缀 eslint-plugin-。
   * 插件一个主要的作用就是补充规则，比如eslint:recommended中没有有关react的规则，则需要另外导入规则插件eslint-plugin-react
   * @en A plugin is an npm package that typically exports rules. Make sure the package is installed in a directory
   * where ESLint can request it.The plugins attribute value can omit the prefix eslint-plugin- of the package name.
   * One of the main functions of the plugin is to supplement rules,for example, if there are no rules about react
   * in eslint:recommended, you need to import the rule plugin eslint-plugin-react
   */
  plugins: [],
  /**
   * 0 or 'off'：close rule(关闭规则)。
   * 1 or 'warn'：enable the rule，treat it as a warning(does not cause the program to fail) 并将其视为一个警告（不会导致程序失败)
   * 2 or 'error'：enable the rule, treat it as a bug (which will cause the program to fail if not fixed) 打开规则，并将其视为一个错误（如果不修复，将导致程序失败）
   */
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rule: {},
};
