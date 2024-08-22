

### install

```
npm i zrlazyform

```

### github

github:https://github.com/ruo-love/ZrlazyForm

### doc

数字类型 类型校验


#### formKey

form 表单的唯一标识，您可以理解为 v-for 中的 key,当您在同一页面使用多个 LazForm 表单或者表单内部通过插槽嵌套表单的时候，您可以通过 formKey 来进行区分，获取对应表单的数据。

```js
formKey?: string
```

#### formData

表单数据对象，为 LazyForm 传入一个响应式的数据对象 formData,进行表单数据编辑、更新、获取。

#### config

LazyForm 表单全局配置属性

```js
const config=ref({
    ...
})
<LazyForm :formField="formField" :formData="formData" :config="config"> </LazyForm>
```

#### config.gutter

```
   gutter?: number;
```

设置每个表单项间隔距离

#### config.labelPosition

设置表单 label 位置，默认 left。

```js
enum Iposition {
    left = 'left',
    right = 'right',
    top = 'top',
}
```

#### config.labelWidth

用于设置 label 宽度

```
labelWidth?: number;
```

#### config.formRules

设置表单全局校验规则，遵循 Element-ui form 组件检验规则

```js
formRules:{
         name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
    ...
}
```

#### config.themeColors

```js
themeColors?: Array<ColorOption>
type ColorOption = {
    varName: ColorVar,//颜色变量名
    value: string//颜色值
}
```

设置表单全局主题颜色

**主题变量**

- --lazy-form-primary 主题颜色
- --lazy-form-text-color-regular 通用颜色
- --lazy-form-placeholder 提示文本颜色
- --lazy-from-text-color-primary 主题文字颜色
- --lazy-from-table-header-text-color 表格 head label 颜色
- --lazy-from-color-danger 错误提示文本颜色

```js
 themeColors: [
        {
      varName: ColorVar["--lazy-form-primary"],
      value: "#292d3e"
    },
    {
      varName: ColorVar["--lazy-form-placeholder"],
      value: "#ffd661"
    },
    {
      varName: ColorVar["--lazy-form-text-color-regular"],
      value: "#24acf2"
    },
    {
      varName: ColorVar["--lazy-from-table-header-text-color"],
      value: "#1fa163"
    },
    {
      varName: ColorVar["--lazy-from-text-color-primary"],
      value: "#49d79b"
    },
    {
      varName: ColorVar["--lazy-from-color-danger"],
      value: "red"
    }
  ],
```

#### config.formChange

```js
interface EventParams {
  prop: string;
  value: any;
  field: FormField;
  formKey: string;
}
```

表单项改变事件回调

```js
formChange: (params: EventParams) => {};
```

#### config.formClear

表单项清空事件回调

```js
formClear: (params: EventParams) => {};
```

#### config.formBlur

表单项失去焦点事件回调

```js
formBlur: (params: EventParams) => {};
```

#### config.formFoucs

表单项聚焦事件回调

```js
formFoucs: (params: EventParams) => {};
```

#### config.formFieldClick

表单项点击事件回调

```js
formFieldClick: (params: EventParams) => {};
```

### formField 配置

formField 是一个 lazyForm 的表单项集合，是 lazyForm 的核心配置区域

#### label

配置表单项 label

#### placeholder

配置表单项输入框的默认提示内容

#### dialogPlaceholder

searchTable 上方输入框提示文本

#### prop

表单项属性名

#### type

表单项类型，支持如下类型

```js
enum InputTypes {
    input = 'input',
    select = 'select',
    radio = 'radio',
    checkbox = 'checkbox',
    textarea = 'textarea',
    searchtable = "searchtable"
}
```

#### rules

为当前表单项校验规则，详情参考 Eelement-UI Form

#### required

设置当前表单项为必选参数，为 true 时会在 label 前方展示\*号

#### slot

自定义预留插槽名，开发者可以对表单项进行自由设计

#### span

表单项在 1 行的占比，一行总比例为 24，如果当前行无法满足所设置的 span,则会进行换行展示

#### copies

copies 用来标识当前表单项在该行所占比例，span=24/copies

#### options

options 用于配置 select、radio、checkbox

##### 用例

```js
[
  {
    label: "地址",
    prop: "address",
    type: InputTypes.radio,
    options: [
      {
        label: "A",
        value: 1,
      },
      {
        label: "B",
        value: 2,
      },
    ],
  },

  {
    prop: "city",
    label: "城市",
    type: InputTypes.select,
    options: [
      {
        value: "Beijing",
        label: "Beijing",
      },
      {
        value: "Shanghai",
        label: "Shanghai",
        disabled: true,
      },
      {
        value: "Nanjing",
        label: "Nanjing",
      },
      {
        value: "Chengdu",
        label: "Chengdu",
      },
      {
        value: "Shenzhen",
        label: "Shenzhen",
      },
      {
        value: "Guangzhou",
        label: "Guangzhou",
      },
    ],
  },
];
```

#### disabled

禁用当前表单项

#### readonly

当前表单项只读

#### checkboxMin、checkboxMax

多选按钮至少或者至多选择多少个

#### size

表单项的大小

#### buttonStyle

单选框、多选框样式为按钮类型

#### border

单选框、多选框添加边框

#### clearable

表单项可清空

#### multiple

select 类型的表单项支持多选

#### filterable

select 类型的表单项支持过滤

#### remote

select 类型的表单项支持远程搜索，和 filterable、remoteMethod 一起开启使用

#### remoteMethod

远程搜索方法，接收输入的参数，和 filterable、remote 一起开启使用

#### loading

select 类型表单项 loading 状态，可以和远程搜索搭配使用

#### allowCreate

select 类型表单项如没有输入的选项，则直接创建当前输入项

#### defaultFirstOption

在该属性打开的情况下，按下回车就可以选中当前选项列表中的第一个选项，无需使用鼠标或键盘方向键进行定位。

#### formatter

当前表单项值 自定义格式化

#### autosize、rows、maxlength、minlength

表单域自动适应大小、行、最大最小长度

#### resize

控制是否能被用户缩放

#### gridData

表格数据源

#### tableField

表格列表项配置

```js
type TableField = {
  prop: string,
  label: string,
  width?: number,
  align?: "center" | "right" | "left",
};
```

#### rowKey

单行的唯一标识，需为当前行数据对象的某个属性名

#### fieldClick

表单项被点击时触发

#### change

表单项值被改变时触发

#### blur

表单项失去焦点时触发

#### foucs

表单项获取焦点时触发

#### clear

表单项值被清除时触发

#### getTableData

```
表单数据源获取函数，需 return {data,total}
```

#### needProps

['行数据属性：表单属性']=》将 table 选中的数据中的部分属性映射到表单属性中，作为其值

#### confirmSelect

searchtable 类型的表格确认选择回调

#### clickCell

点击表格单元格触发的回调
