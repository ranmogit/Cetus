import React from 'react'
const AritcleList = ({ props, dispatch }) => {
    const [PageList, setPageList] = useState([]);
    const [pageTotal, setPageTotal] = useState(null);
    const [pageParams, setPageParams] = useState({
        pageNum: 1,
        pageSize: 10,
        managerUserUCode: window.localStorage.getItem('userCode')
    })
    const columns = [
        {
            title: '文章ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '文章名称',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '标签',
            dataIndex: 'tags',
            key: 'tags',
            render: (text, record) => {
                let tags = JSON.parse(text).tags
                return tags.map((item, index) => {
                    return (<div key={index + item.name}>
                        {item.name}</div>)
                })
            }
        },
        {
            title: '操作',
            dataIndex: 'ac',
            key: 'ac',
        },
    ]

    return (
        <Table
            columns={columns}
            dataSource={PageList}
            rowSelection={rowSelection}
            pagination={pagination}
        ></Table>
    )
}
export default AritcleList