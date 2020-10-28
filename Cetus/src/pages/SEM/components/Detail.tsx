import React from 'react';
import { Modal, Descriptions } from 'antd';

interface DetailItem {
    template: string;
    url: string;
    subChannl:string;
    use: string
}

interface DetailProps {
    isShow: boolean;
    onCancel: () => void;
    data:DetailItem
}

const Detail: React.FC<DetailProps> = (props) => {
    const { isShow, onCancel ,data} = props;

    return (
        <Modal
            destroyOnClose
            title="详情"
            visible={isShow}
            onCancel={onCancel.bind(this)}
            footer={null}
        >
            <Descriptions column={2}>
                <Descriptions.Item label="使用模板">{data.template}</Descriptions.Item>
                <Descriptions.Item label="推广域名">{data.url}</Descriptions.Item>
                <Descriptions.Item label="子渠道">{data.subChannl}</Descriptions.Item>
                <Descriptions.Item label="使用记录">{data.use}</Descriptions.Item>
            </Descriptions>
        </Modal>
    );
};

export default Detail;
