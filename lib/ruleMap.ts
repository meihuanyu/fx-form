export interface IRule {
    reg: RegExp
    errorCss: string
    errorMsg: string
}
interface IruleMap {
    [key: string] : IRule
}

const ruleMap: IruleMap = {
    required:{
        errorMsg: "不可为空",
        errorCss: "",
        reg: /\S/
    }
}
export default ruleMap