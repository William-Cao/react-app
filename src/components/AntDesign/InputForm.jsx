import React from 'react';
import { Form, Input, Button, Select, Radio, DatePicker, Switch, InputNumber, ConfigProvider } from 'antd';

import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
moment.locale();

const { Option } = Select
const { RangePicker } = DatePicker

class InputForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultValue: this.props.defaultValue || {},
      getTime: [moment().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss')],
      defaultProps: this.props.defaultProps || {}
    }
  }
  componentDidMount () {
    if (this.props.defaultValue && this.props.defaultValue.hasOwnProperty('getTime')) {
      let getTime = this.props.defaultValue.getTime
      this.setState({
        getTime: getTime ? [getTime[0].format('YYYY-MM-DD HH:mm:ss'), getTime[1].format('YYYY-MM-DD HH:mm:ss')] : null
      })
    }
  }
  getTime = (a, b) => {
    this.setState({ getTime: b })
  }
  disabledDate = a => a ? a.format('YYYY-MM-DD HH:mm:ss') >= moment().format('YYYY-MM-DD HH:mm:ss') : null

  callBack = (e) => {
    e.preventDefault();
    this.props.form.validateFields((e, v) => {
      if (e) { return }
      let form = this.props.form.getFieldsValue()
      if (form.getTime) { form.getTime = this.state.getTime }
      this.props.callBack(form)
      // console.log(form)
    })
  }

  typeSelect = i => {
    const type = {
      Input: () => {
        let disabled = (JSON.stringify(this.state.defaultValue) !== '{}') && Boolean(i.disabled)
        return (<Input style={{ width: '200px' }} disabled={disabled} placeholder={`请输入${i.name}`} {...i.api || ''}></Input>)
      },
      Password: () => {
        return (<Input.Password style={{ width: '200px' }} autoComplete="off" placeholder={`请输入${i.name}`}></Input.Password>)
      },
      InputNumber: () => {
        return (<InputNumber style={{ width: '200px' }} placeholder={`请输入${i.name}`} {...i.api || ''}></InputNumber>)
      },
      Select: () => {
        return (
          <Select style={{ width: '200px' }} placeholder={`请选择${i.name}`} {...this.state.defaultProps}>
            {i.children.map(n => {
              return (<Option key={n.key} value={n.key}>{n.name}</Option>)
            })}
          </Select>
        )
      },
      Radio: () => {
        return (
          <Radio.Group>
            {i.children.map(n => {
              return (<Radio key={n.key} value={n.key}>{n.name}</Radio>)
            })}
          </Radio.Group>
        )
      },
      DatePicker: () => {
        let defaultValue = new Date()
        return (
          <ConfigProvider locale={zhCN}>
            <DatePicker showTime defaultValue={[moment(defaultValue, 'YYYY-MM-DD')]}></DatePicker>
          </ConfigProvider>
        )
      },
      RangePicker: () => {
        let defaultValue = null
        if (this.props.defaultValue && this.props.defaultValue.hasOwnProperty('getTime')) {
          defaultValue = this.props.defaultValue.getTime
        } else {
          defaultValue = [moment().subtract(1, 'hour'), moment()]
        }

        return (
          <ConfigProvider locale={zhCN}>
            <RangePicker
              style={{ width: '368px' }}
              placeholder={['开始时间', '结束时间']}
              showTime allowClear={false}
              onChange={this.getTime}
              disabledDate={this.disabledDate}
              defaultValue={defaultValue}
              format={'YYYY-MM-DD HH:mm:ss'}
            >
            </RangePicker>
          </ConfigProvider>
        )
      },
      Switch: () => {
        return (
          <Switch checkedChildren={i.children[0].name} unCheckedChildren={i.children[1].name}></Switch>
        )
      },
      SelectMode: () => {
        return (
          <Select style={{ width: '200px' }} placeholder={`请选择${i.name}`} mode='multiple' maxTagCount={1} maxTagTextLength={5}>
            {
              i.children.map(n => {
                return (<Option key={n.key} value={n.key}>{n.name}</Option>)
              })
            }
          </Select>
        )
      }
    }
    return type[i.type]()
  }
  valueType = (i) => {
    switch (i.type) {
      case 'Input':
        let disabled = (JSON.stringify(this.state.defaultValue) !== '{}') && Boolean(i.disabled) ? false : true
        return {
          initialValue: this.state.defaultValue[i.id] || '',
          // valuePropName: 'value',
          rules: disabled ? [{ required: i.required, message: '内容不能为空', whitespace: true }] : [{ required: i.required, message: '内容不能为空' }]
        }
      case 'Radio':
        return {
          initialValue: this.state.defaultValue[i.id] || 1,
          rules: [{ required: i.required, message: '请选择状态' }]
        }
      case 'Switch':
        return {
          initialValue: this.state.defaultValue[i.id] || false,
          valuePropName: 'checked',
          rules: [{ required: i.required, message: '请选择状态' }]
        }
      case 'RangePicker':
        return {
          initialValue: this.state.defaultValue[i.id] || ['', ''],
          rules: [{ type: 'array', required: i.required, message: '请选择状态' }]
        }
      default:
        return {
          initialValue: this.state.defaultValue[i.id] || undefined,
          rules: [{ required: i.required, message: '请输入内容' }]
        }
    }
  }
  render () {
    const form = this.props.formData;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline" labelAlign="right">
        {form.map(i => {
          return (() => {
            if (i.id !== 'submit') {
              return (
                <Form.Item key={i.id} label={i.name} >
                  {
                    getFieldDecorator(i.id, this.valueType(i))(
                      this.typeSelect(i)
                    )
                  }
                </Form.Item>
              )
            } else if (i.type === 'Query') {
              return (
                <Form.Item key="submit" >
                  <Button onClick={this.callBack} style={{ width: '64px' }} type="primary">查询</Button>
                </Form.Item>
              )
            } else if (i.type === 'Submit') {
              this.props.childEvent(this)
            }
          })()
        })}
      </Form>
    )
  }
}

InputForm = Form.create()(InputForm)

export default InputForm