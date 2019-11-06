
## fx-form

处理表单状态,校验,简单自由的组合方式


## 简介

非受控表单,单项数据流

form对象,可以操作单个Item状态
```
<FXForm>
    <FormItem name="xx" label="userName">
        <input/>
    </FormItem>
</FXForm>

```

### Installing

```
yarn add free-from
```

## Running the tests
```
yarn run test
```
## Api
### FXForm
|   name    |   type    |   desc    |   default |
|   -----   |   ------  |   ------  |   ------  |
|   init    |   function|   用于传递内部form操作对象的初始化方法 ``` (form) => any ``` |  undefind |
|   initValues  |   objeact  | 初始化item值对象    |   {}    |
|   className   |   string   |  classname      |    "" |
|   formItemClassName | string  |   itemclassname | "" |

### FormItem

|   name    |   type    |   desc    |   default |   require |
|   -----   |   ------  |   ------  |   ------  |   ------  |
|  name | string  | 提交参数  | undefind    |   yes |
| label  | string / React.ReactElement |  默认显示字段 | undefind  | no |
| labelWidth  | number  | label宽度  |  150 | no |
| error  | any  | 错误处理  | "" | no |
|  className | string  | itemclassname  | "" | no |

### from 操作对象

|   name    |   type    |   desc    |
|   -----   |   ------  |   ------  |
| onSubmit  | () => [ error, values ] | 提交表单，返回校验信息和value值 |
| setItems  | (name: string, value: any) => void | 设置item value |
| onRest    | () => void | 置空表单 |
| values    | objeact | 当前表单值
 |
## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.



## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* girl friend give strong backing
