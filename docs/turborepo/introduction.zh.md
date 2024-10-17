yarn 和 npm 


## 什么是 Turborepo？

Turborepo 是一个高性能的 JavaScript 和 TypeScript 项目构建系统，采用 Go 语言实现，所以在语言层面上就具有一定的性能优势，可以大大提高 monorepo 项目的构建速度。

优势
增量构建： Turborepo 会记住你之前构建的结果并跳过已经计算过的内容。
感知内容hash: Turborepo 通过文件的内容，而不是时间戳来确定需要构建的内容。
并行处理: 不浪费任何闲置 cpu 性能，以每个核心最大的并行度来执行构建。
远程缓存 : 与团队成员、CI/CD 共享远程构建缓存，以实现更快的构建。
零运行时开销: Turborepo 不会影响您的运行时代码或 sourcemap。
任务管道: 定义任务之间的关系，然后让 Turborepo 优化构建内容和时间。
渐进式设计：可以在几分钟内快速集成到项目中
如何创建一个Turborepo项目
运行以下命令，然后根据提示进行选择创建即可

pnpm dlx create-turbo@latest
or 
npx create-turbo@latest
如何集成到现有项目中
这里我们以npm create vite@latest创建的项目为例子。

在项目根目录下，安装turbo依赖
pnpm i turbo --save-dev
在根目录下添加turbo.json配置文件，向pipeline字段中配置npm scripts中的命令，比如build命令
{
  "pipeline": {
    "build": {
      "outputs": ["dist/**"]
    }
  }
}
配置完成后，我们就可以使用turbo来执行我们项目的build命令。

pnpm turbo build
第一次构建时：


第二次构建时：


可以看到，在第二次构建时，turbo直接使用了之前构建过的缓存，构建时间由之前的3.765秒缩减到了284毫秒

turbo.json配置项说明
示例文件

{
  "$schema": "https://turborepo.org/schema.json",
  // 管道配置 
  "pipeline": {
    "dev": {
      "persistent": true
    },
    "build": {
      "dependsOn": ["^build"],
      "env": ["SOMETHING_ELSE"], // value will impact the hashes of all build tasks
      "outputs": ["dist/**", ".next/**"]
    },
    "test": {
      "outputs": ["coverage/**"],
      "dependsOn": ["build"],
      "inputs": ["src/**/*.tsx", "src/**/*.ts", "test/**/*.ts"],
      "outputMode": "full"
    },
  },
  "globalEnv": [
    "GITHUB_TOKEN" // value will impact the hashes of all tasks
  ],
  "globalDependencies":[
    ".env", // contents will impact hashes of all tasks
    "tsconfig.json" // contents will impact hashes of all tasks
  ]
}
$schema
指定配置文件的JSON Schema，它可以帮助你在编辑器中自动补全和校验配置项，为固定值https://turborepo.org/schema.json

pipeline
pipeline 字段是一个对象，用来表示你的项目的任务依赖图。

Turbo 会根据这些约定来合理地调度、执行和缓存任务的输出。pipeline 对象中的每个键都是一个可以被 Turbo run 执行的任务的名称

如果Turbo 发现一个工作空间有一个 package.json scripts 对象中有一个匹配的键，它会在执行时将 pipeline 任务配置应用到那个 npm 脚本上。这样你就可以使用 pipeline 来设置你整个 Turborepo 的约定。

dependsOn
该字段是一个字符串数组，表示当前任务所依赖的其它任务。

分为两种依赖，前缀带有^为拓扑依赖，不带则为普通依赖，具体差别如下：

拓扑依赖: 当前任务执行之前必须要等待它所依赖的包中对应的命令运行完成后才能开始运行。
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"]
    }
  }
}
假如有一个名为packageA的包，它的package.json文件中devDependencies或者dependencies字段含有名为packageB的包，那么执行通过pnpm turbo run build运行packageA的build命令之前，会先等待packageB包的build命令运行完成后才会继续运行

普通依赖： 需要等待自身包工作空间的命令运行完成后才开始运行
{
  "pipeline": {
    "build": {
      "dependsOn": ["test"]
    }
  }
}
按以上配置，假如通过pnpm turbo run build运行packageA的build命令之前，会先去执行packageA的test命令，test命令执行完毕后，才会去执行build命令。

env
任务所依赖的环境变量，与globalEnv作用类似

outputs
构建产物输出的目录，当开启缓存时，Turbo会将对应目录的产物进行缓存

cache
布尔类型，是否开启缓存，默认为true

inputs
默认为[]，用于指定哪些文件的变化会触发任务的重新执行。

outputMode
设置输出日志记录的类型

full：默认设置，显示所有输出
hash-only: 只显示任务的hash值
new-only: 只显示没有命中缓存的任务输出
errors-only: 只显示失败的任务输出
none: 隐藏所有任务输出
persistent
如果当前任务是一个长时间运行的进程，比如dev命令，则可以设为true

globalEnv
globalEnv 是一个字符串数组，用来指定一些环境变量作为全局的哈希依赖。这些环境变量的内容会被包含在全局的哈希算法中，影响所有任务的哈希值。例如，你可以在 globalEnv 中指定 GITHUB_TOKEN，这样当 GITHUB_TOKEN 的值发生变化时，所有任务的缓存都会失效。

globalEnv 的值是从运行 turbo 命令的环境中获取的，你可以在终端中设置或者使用 .env 文件来管理。

globalDependencies
globalDependencies 是一个字符串数组，用来指定一些文件作为全局的哈希依赖。这些文件的内容会被包含在全局的哈希算法中，影响所有任务的哈希值，例如配置tsconfig.json、jest.config.js，当这些文件内容有变化时，所有构建缓存将会失效