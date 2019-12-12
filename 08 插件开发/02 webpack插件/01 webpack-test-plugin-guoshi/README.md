# 果实o的webpack测试插件

*description: 通过特殊标记，检测发布前未处理代码*

## loader传入参数
```
options: {
    label: 'xxx', // 未处理代码标识（在代码注释//后）
    line: x, // 提示打印之后几行代码
}
label默认为test;
line默认为5(即提示打印之后的5行代码);
```