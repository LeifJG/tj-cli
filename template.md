# 增加自定义项目模板说明文档

> 支持通过终端问答的形式收集用户选项，灵活自定义初始化模板，简单说明以下几种增加模板的方法。

## 一、首先准备用户选项的相关配置

1.在模板根目录创建tj.json文件

2.在tj.json文件内，参照已下json自定义收集用户所答选项，tj-cli会在下载模板完成后读取该文件，并根据文件内的配置收集用户选项

```javascript
[
  {
    "name": "yunjiComponents", // 用户选项对应的key
    "message": "是否使用yunji-components？", // 提示
    "type": "list", // 单选
    "choices": [ // 单选选项
      {
        "name": "是",
        "value": 1
      },
      {
        "name": "否",
        "value": 0
      }
    ]
  },
  {
    "name": "input", // 用户输入字符串
    "message": "你所在的业务线名称",
    "type": "input"
  },
  {
    "name": "confirm", // 用户选择yes或者no
    "message": "你是否愿意开发项目模板？",
    "type": "confirm"
  },
  {
    "name": "checkbox",
    "message": "选择你所在业务线",
    "type": "checkbox", // 多选
    "choices": [ // 多选选项
      {
        "name" : "red"
      },
      {
        "name" : "pink",
        "checked" : true // 默认选中
      },
      {
        "name" : "orange"
      }
    ]
  }
]
```

3.收集到用户选项后，tj-cli会获得以下用户选项返回

```javascript
{
  yunjiComponents: 1,
  yunjiReport: 1,
  input: 'yunjife',
  confirm: true,
  checkbox: [ 'red', 'pink' ],
  projectName: 'testcli'
}
```

4.得到用户选项后，tj-cli会根据选项，初始化模板项目的package.json，和项目内所有*.*.tpl文件，.tpl文件初始化后会删除掉.tpl，例如：main.js.tpl 初始化后会变成 main.js
> 这一步说来话长，具体可以查看 [模板示例项目](https://github.com/LeifJG/vue-multiple) 中的[package.json](https://github.com/LeifJG/vue-multiple/blob/master/package.json) 和 [示例文件 app.js.tpl](https://github.com/LeifJG/vue-multiple/blob/master/src/pages/index/app.js.tpl)

5.下一步就是把模板项目git仓库提供给lijg。

## 其他

> 如果觉得开发模板项目麻烦，也可以直接拿着项目找lijg提需求改为项目模板。
