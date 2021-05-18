# try-it-cli

作为一个前端，有时想要试试一些工具或者写些玩具代码，如果不想使用在线的代码工具（如 codesandbox、
codepen 等），就需要手动创建项目，并新建 html、js 文件。这个工具就是能省下这几步，来快速新建一个项目。项目中仅包含几个最简单的文件。如下是创建的项目文件结构：

```
demo
├── index.html
├── index.js
└── package.json
```

## How to use

```shell
npm install try-it-cli -g
try-it init <your_folder_name>
```

OR

```shell
npx try-it-cli init <your_folder_name>
```
