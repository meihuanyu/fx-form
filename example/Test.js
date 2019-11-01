import * as React from 'react';
// import FreeForm, { FormItem } from '../index';
import FreeForm, { FormItem } from '../lib';
import { Input, Button, Select, Row, Col } from 'antd';
const { Option } = Select;

export default () => {
    let form = null
    const initValues = {}
    return <div>
        <FreeForm initValues = {initValues} init = {f => form = f}>
                <Row>
                    <Col span= {12}>
                        <FormItem name = "entryName" label = "风控主体名称" rules = "required" >
                            <Input />
                        </FormItem>
                    </Col>
                    <Col span= {12}>
                        <FormItem name = "idType" label = "证件类型" rules = "required">
                            <Select style={{width: "100%"}}>
                                <Option value="身份证">身份证</Option>
                                <Option value="统一社会信用代码">统一社会信用代码</Option>
                                <Option value="注册号">注册号</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem name = "idno" label = "证件号码" rules = "required">
                    <Input />
                </FormItem>
                <FormItem name = "reason" label = "黑转灰原因" rules = "required">
                    <Input />                                               
                </FormItem>
                <button type="submit"> 提交 </button>
            </FreeForm>
            
            <Button onClick={() => form.onSubmit()}>xx</Button>
    </div>
}

