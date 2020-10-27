import { history, connect } from 'umi';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';

import { Card, Button, Row, Col, Form, Input, Checkbox, Select } from 'antd';
import Editor from '../../components/Wangeditor';
import Material from './components/Material';
import {queryArticleContent} from "@/services/sem"
import './less/add.less';

interface channlItemProps {
    use: number;
    use1: string;
    url: string;
    path: number;
}
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

const SEMADD: React.FC<{}> = (props) => {
    let [editorHtml, setEditorHtml] = useState<string>('');
    let [isMaterialShow, setIsMaterialShow] = useState<boolean>(false);
    let [channl, setChannl] = useState<channlItemProps[]>([
        {
            use: 123,
            use1: '',
            url: '',
            path: 123,
        },
    ]);
    const [selectedArticleId, setSeletedArticleId] = useState(null)
    useEffect(()=>{
        getContent(selectedArticleId)
    },[selectedArticleId])
    const add = () => {
        setChannl([
            ...channl,
            {
                use: 123,
                use1: '',
                url: '',
                path: 123,
            },
        ]);
    };
    const getContent =(id:number|null)=>{
        queryArticleContent(id).then(res=>{
            console.log(res)
        })
    }
    const onFinishForm = () => { };
    return (
        <PageContainer title="推广新增">
            <Card>
                <Form
                    onFinish={onFinishForm}
                    {...layout}
                >
                    <Row>
                        <Col span="7">
                            <Form.Item name="name" label="推广名称">
                                <Input placeholder="请输入推广名称" />
                            </Form.Item>
                        </Col>
                        <Col span="7">
                            <Form.Item name="someType" label="推广类型">
                                <Select></Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="7">
                            <Form.Item name="template_id" label="推广模板">
                                <Select></Select>
                            </Form.Item>
                        </Col>
                        <Col span="7">
                            <Form.Item name="someId" label="推广素材">
                                <Button type="primary" onClick={() => { setIsMaterialShow(true) }}>点击选择</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col span='24'>
                            <Form.Item label="截断设置" labelCol={{span: 2}}>
                                <Editor value={editorHtml}  ></Editor>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
            <Material
                isShow={isMaterialShow}
                onCancel={() => {
                    setIsMaterialShow(false);
                }}
                onSelceted={(id) => {
                    setSeletedArticleId(id[0])
                }}
            ></Material>
        </PageContainer>
    );
};

export default connect()(SEMADD);
