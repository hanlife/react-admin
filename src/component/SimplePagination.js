import React from 'react';
import {Table} from 'antd';

let refresh = null;

export default class SimplePagination extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            item: [],
            pagination: {
                total: 0,
                pageSize: 100,
                current: 1,
                showQuickJumper: true,
                onChange: (page) => {
                    this._fetch({page: page});
                },
                showTotal: (total, range) => `总记录数: ${total}条 当前页面: 第${range[0]}条-第${range[1]}条`
            }
        }

        this.params = null;
    }
    componentWillMount() {
        this._fetch({page: 1});

        refresh = () => {
            this._fetch({page: this.state.pagination.current});
        };

    }

    render() {
        return (
            <div className="pagination" style={this.props.style || {}}>
                <Table
                    {...this.props}
                    dataSource={this.state.items}
                    pagination={this.props.pagination === false ? false : this.state.pagination}
                    columns={this.props.columns}/>
            </div>
        );
    }

    /**
     * 获取分页数据
     * @param page 当前页码
     * @private
     */
    _fetch({page}) {
        (async () => {
            // 分页接口入参
            let params = this.props.params || {};
            // 获取每页行数
            let size = params.size || 100;
            let result = await this.props.fetch({
                page: page,
                size: size,
                ...params
            });
            if (!!result) {
                // 数据列表
                let list = result.data.list || [];
                for (let i = 0; i < list.length; i++) {
                    list[i]['key'] = list[i]['id'] || i;
                }
                // 修改分页组件数据
                this.setState({
                    items: list,
                    pagination: {
                        ...this.state.pagination,
                        total: result.data.total,
                        pageSize: size,
                        current: page
                    }
                });
            }
        })();
    }

}
