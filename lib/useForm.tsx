import * as React from 'react'
import ruleMap, { IRule } from './ruleMap';

const { useState, useEffect } = React

type ItemValueType = any

type ErrorType = IError | boolean

type IUseRuleRes = [ ErrorType, (value: ItemValueType) => boolean ]

export type ruleParams = string | string[] | IRule | IRule[]

interface IUseFormProps {
    change?: (name: string, sValue: ItemValueType) => void
    onSubmit?: (ruleMap: any, values: IValues) => void
    onRest?: (restValue: ItemValueType) => void
    
}
interface IValues {
    [key: string]: ItemValueType
}
interface IChecks {
    [key: string]: (value: ItemValueType) => boolean
}

interface IError {
    css: string
    msg: string
}


export type useInput = (name: string, initValue: any, rule?: ruleParams) => [ ItemValueType, (sValue: ItemValueType) => void, any ]


export interface IFreeForm {
    useInput: useInput
    onSubmit: () => void
    setItems: (name: string, value: any) => void
    onRest: () => void
    values: any
}
/**
 * rule 可以传数组，对象，字符串 最终都会转换成 数组对象 【{css："xx", reg: //g\"}}】
 * 公共hooks
 */
const useRule = (rule: ruleParams): IUseRuleRes => {
    const [ error, setError ] = useState<ErrorType>(false)
    let rules: IRule[] = []
    if(Array.isArray(rule)){
        for(const r of rule){
            if(typeof r === "string"){
                rules.push(ruleMap[r])
            }else{
                rules.push(r)
            }
        }
    }else{
        if(typeof rule === "string"){
            rules = [ruleMap[rule]]
        }else{
            rules = [rule]
        }
    }
    const check = (value: ItemValueType) => {
        for(let i=0; i<rules.length; i++){
            const currentRule = rules[i]
            const re = new RegExp(currentRule.reg);
            const isError = !re.test(value || "")
            if(isError){
                setError({
                    css: currentRule.errorCss,
                    msg: currentRule.errorMsg
                })
                return true
            }
        }
        setError(false)
        return false
    }
    return [error, check]
}

// 需要连续调用 同步复制
const useForm = (option: IUseFormProps): IFreeForm => {
    // 不知为毛 用useState可以保存
    // 记录value
    const [values, setValues] = useState<IValues>({})
    // 记录 rules
    const [checks, setChecks] = useState<IChecks>({})
    
    return {
        useInput: (name, initValue, rule) => {  
            const [error, check] = useRule(rule || [])
            useEffect(function(){
                setValues(vals => Object.assign({}, vals, {[name]: initValue}))
                setChecks(vals => Object.assign({}, vals, {[name]: check}))
            },[])            
            return [values[name], 
                    sValue => {
                        setValues(vals => Object.assign({}, vals, {[name]: sValue}))
                        option.change && option.change(name, sValue)
                        return sValue
                    },
                    error]
        },
        onSubmit:() => {
            // 校验
            let ruleMap: any = {}
            const keys = Object.keys(checks)
            for(let i = 0; i < keys.length; i++ ){
                const key = keys[i]
                if(checks[key](values[key])){
                    ruleMap[key] = checks[key](values[key])
                }
            }
            ruleMap = Object.keys(ruleMap).length === 0 ? null : ruleMap
            option.onSubmit && option.onSubmit(ruleMap, values)
            return [ruleMap, values]
        },
        setItems: function(name, value){
            setValues(vals => Object.assign({}, vals, {[name]: value}))
        },
        onRest: function(){
            const temp: any = {}
            for(let key in values){
                temp[key] = undefined
            }
            setValues(temp)
            return option.onRest && option.onRest(temp)
        },
        values: values
    }
}
export default useForm