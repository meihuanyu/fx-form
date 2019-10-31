import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
function HookWrapper(props) {
    const hook = props.hook ? props.hook() : undefined;
    return <div hook={hook} />;
}
describe("FreeForm", () => {

})
describe("FormItem", () => {

})

describe("useForm", () => {

})
describe("useRule", () => {

})