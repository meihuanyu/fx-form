import * as React from 'react'
import useForm, { useInput, IFreeForm, ruleParams } from './useForm'
import { Row, Col } from 'antd'

type values = any
interface IFreeFormProps {
    init?: (form: IFreeForm) => any
    initValues?: values
    children: React.ReactElement[]
}
interface IFromItemProps {
    name: string
    label?: string
    rules?: ruleParams
    useinput?: useInput
    initvalues?: values
    children: React.ReactElement
}
const FreeForm = (props: IFreeFormProps) => {
    const form = useForm({ })
    props.init && props.init(form) 
    const useInput = form.useInput
    const { initValues } = props
    const childrens: Array<React.ReactElement> = Array.isArray(props.children) ? props.children: [ props.children ] 
    const Items = childrens.map((o, index) => {
        if(o.props.name){
            return React.cloneElement(o, {
                key: index,
                useinput: useInput,
                initvalues: initValues || {}
            })
        }
        return o
    })
    return <div className = "e-from">
        {Items}
    </div>
}

export const FormItem = (props: IFromItemProps) => {
    const { name, label, rules, useinput, initvalues } = props
    if(!useinput){
        return null
    }
    const initValue = initvalues[name]
    const [ value, setValue, error ] = useinput(name, initValue, rules)
    const onChange = (val: any) => {
        if(val && val.preventDefault){
            setValue(val.target.value)
        }else{
            setValue(val)
        }
    }
    const Com = React.cloneElement(props.children, { 
        key: 1,
        value,
        onChange
    })
    const isRequired = (rules || "").toString().indexOf("required") !== -1
    return  <Row className = {`form-item-row ${error ? (error.css || "has-error") : ""}`}>
                <Col span={6} className = "form-item-label">
                    {label}
                    <span className={`easyform-item-label ${isRequired ? "must-fill-red" : "" }`}>
                    </span>
                </Col>
                <Col span={18}>{Com}</Col>
                <span style={{color: "red"}}>{error.msg}</span>
            </Row>
}
export { default as useForm } from './useForm'

export default FreeForm