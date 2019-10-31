import * as React from 'react';
import FreeForm, { FormItem } from 'react-free-form'
import { Input, Button } from 'antd';
import { IFreeForm } from '../lib/useForm';

export default () => {
    let form: IFreeForm | null = null
    const initValues = {}
    return <FreeForm initValues = {initValues} init = {f => form = f}>
                <FormItem name = "entryName" label = "风控主体名称" rules = "required">
                    <Input />
                </FormItem>
                <Button onClick = {() => form && console.log(form.onSubmit())}>提交</Button>
            </FreeForm>
}

