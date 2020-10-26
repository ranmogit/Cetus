import { connect } from 'umi';
import React, { useState, useRef } from 'react'
import { Modal, Button } from 'antd'
import ProTable, { ActionType } from '@ant-design/pro-table';
import { MaterialColums } from '../config'
import { MaterialListParams, responseParams } from '../../../models/sem'
import '../less/material.less'

interface MaerialProps {
    isShow: boolean;
    onCancel: () => void
}

const Material: React.FC<MaerialProps> = props => {
    const { isShow, onCancel } = props;
    const actionRef = useRef<ActionType>();
    const [selectedRowsState, setSelectedRows] = useState<MaterialListParams[]>([]);


    // 拉取数据
    const getList = async (params: any) => {
        const { dispatch } = props;

        return dispatch({
            type: 'sem/fetchMaterial',
            payload: params,
        }).then((res: responseParams) => res);
    }
    return (
        <Modal destroyOnClose footer={null} visible={isShow} onCancel={() => onCancel()} className="iModal" width={800}>
            <ProTable<MaterialListParams>
                actionRef={actionRef}
                tableAlertRender={false}
                options={false}
                columns={MaterialColums}
                rowKey="id"
                request={(params) => getList(params)}
                rowSelection={{
                    onChange: (_, selectedRows) => setSelectedRows(selectedRows),
                }}
                search={{
                    labelWidth: 50,
                    collapsed: false,
                    optionRender: ({ searchText, resetText }, { form }) => {
                        return [
                            <Button key="searchText" onClick={() => {
                                form?.submit();
                            }}>
                                {searchText}
                            </Button>,
                            <Button key="searchText" onClick={() => {
                                form?.submit();
                            }}>
                                确定
                            </Button>
                        ];
                    },
                }}
            />
        </Modal>
    )
}


export default connect()(Material)