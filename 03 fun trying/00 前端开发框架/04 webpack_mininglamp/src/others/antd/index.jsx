/**
 * 功能： antd测试
 * 作者：安超
 * 日期： 2018/3/19
 */
import { React } from 'framework/Util'
import ReactComponentBase from 'base/ReactComponentBase'
import { Table } from 'antd'
import './scss/index.scss'

class AntdView extends ReactComponentBase {
    state = {
        selectedRowKeys: []
    }
    
    render() {
        const dataSource = [{
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
        }, {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
        }]

        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        }]

        const { selectedRowKeys } = this.state;

        return (
            <div className="antd-main-others">
                <Table
                    onRow={record => ({
                        onClick: () => {
                            const { key } = record

                            if (selectedRowKeys.includes(key)) {
                                this.setState(prevState => ({
                                    selectedRowKeys: prevState.selectedRowKeys.filter(item => item !== key)
                                }))
                            } else {
                                this.setState(prevState => ({
                                    selectedRowKeys: prevState.selectedRowKeys.concat([key])
                                }))
                            }
                        }
                    })}
                    rowClassName={(record) => {
                        if (selectedRowKeys.includes(record.key)) {
                            return 'bg-primary'
                        }

                        return 'others'
                    }}
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        )
    }
}

export default AntdView
