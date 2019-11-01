import * as React from 'react'
import useForm, { useInput, IFreeForm, ruleParams } from './useForm'

type values = any
interface IFreeFormProps {
    init?: (form: IFreeForm) => any
    initValues?: values
    children: React.ReactElement[]
}
interface IFromItemProps {
    name: string
    label?: string | React.ReactElement
    labelWidth?: number
    rules?: ruleParams
    error?: any
    useinput?: useInput
    initvalues?: values
    children: React.ReactElement
}
const findItem = (childrens: any, props: any): any => {
    const { useInput, initValues } = props
    const newChildrens = []
    for(let i = 0; i < childrens.length; i++){
        const children = childrens[i]
        console.log(children)
        if(children.type && children.type.name === "FormItem"){
            const FormItem = React.cloneElement(children, {
                key: children.props.name,
                useinput: useInput,
                initvalues: initValues || {}
            })
            newChildrens.push(FormItem)
        }else if(children.type === "button"){
            const FormItem = React.cloneElement(children, {
                key: children.props.name,
                onClick: () => props.form.onSubmit()
            })
            newChildrens.push(FormItem)
        }else{
            let cloneChildren
            if(children.props && children.props.children && typeof(children.props.children) !== "string"){            
                let cchildrens = children.props.children
                cchildrens = cchildrens.length >= 1 ? cchildrens : [ cchildrens ]
                const findChildrens =  findItem(cchildrens, props)
                cloneChildren = React.cloneElement(children, {
                    key: i
                }, findChildrens)
            }else{
                cloneChildren = children
            }
            newChildrens.push(cloneChildren)
        }
    }
    return newChildrens
}
const FreeForm = (props: IFreeFormProps) => {
    const form = useForm({ })
    props.init && props.init(form) 
    const useInput = form.useInput
    const { initValues } = props
    const childrens: Array<React.ReactElement> = Array.isArray(props.children) ? props.children: [ props.children ] 
    const Items = findItem(childrens, { useInput, initValues, form })
    return <div className = "e-from">
        {Items}
    </div>
}

export const FormItem = (props: IFromItemProps) => {
    const { name, label, labelWidth, rules, error, useinput, initvalues, children } = props
    if(!useinput){
        return null
    }
    const initValue = initvalues[name]
    const [ value, setValue, ruleError ] = useinput(name, initValue, rules)
    const onChange = (val: any) => {
        if(val && val.preventDefault){
            setValue(val.target.value)
        }else{
            setValue(val)
        }
    }
    const Com = React.cloneElement(children, { 
        key: 1,
        value,
        onChange
    })
    const isRequired = (rules || "").toString().indexOf("required") !== -1

    const requiredErrorDom = <span style= {{display: "inline-block",
                                marginRight: 4,
                                color: "#f5222d",
                                fontSize: 14,
                                fontFamily: "SimSun,sans-serif",
                                lineHeight: 1}}>*</span>

    let defaultLaber: any = <div style= {{width: labelWidth || 150}}>
        {label}
        {isRequired ? requiredErrorDom : null}
    </div>
    if(typeof(label) !== 'string'){
        defaultLaber = label 
    }   
    let defaultError = <span style={{color: "red"}}>{ruleError.msg}</span>
    if(ruleError && error){
        if(typeof(error) !== "string"){
            defaultError = error
        }else{
            defaultError = <span style={{color: "red"}}>{error}</span>
        }
    }
    return  <div style={{display: "flex"}} className = {`${ruleError ? (ruleError.css || "has-error") : ""}`}>
                {defaultLaber}
                <div style={{width: "100%"}}>
                    {Com}
                    {defaultError}
                </div>
            </div>
}
export { default as useForm } from './useForm'

export default FreeForm