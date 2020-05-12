import React from 'react';
import { Table } from 'antd';


class TableTool extends React.Component {
  constructor(args) {
    super(args);
    const rowSelection = {
      onChange: (a) => {
        this.props.callBack(a)
        rowSelection.selectedRowKeys = a
      },
      selectedRowKeys: []
    }

    this.pagination = {
      total: 0,
      size: 'default',
      // current: 1,
      defaultCurrent: 1,
      defaultPageSize: 20,
      showSizeChanger: true,
      // hideOnSinglePage: true,
      showTotal: (total) => {
        return `共 ${total} 条`
      },
      onChange: (a, b) => {
        this.props.inputBack({ pagenum: a, limit: b })
        console.log(a, b)
      },
      onShowSizeChange: (a, b) => {
        this.props.inputBack({ pagenum: a, limit: b })
        console.log(a, b)
      }
    }
    this.state = {
      rowSelection: this.props.rowSelection === undefined ? rowSelection : this.props.rowSelection
    }
  }

  componentDidMount () {
    if (this.props.tableEvent) {
      this.props.tableEvent(this)
    }
  }

  render () {
    let pagination = Object.assign(this.pagination, this.props.pagination)
    return (
      <Table
        rowKey={i => i.id}
        {...this.props}
        tableLayout="fixed"
        rowSelection={this.state.rowSelection}
        pagination={pagination}
        size='small'
      />
    )
  }
}

export default TableTool