import { history, connect } from 'umi';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { Card, Button, Row, Col, Form, Input, Checkbox, Select, message } from 'antd';
import Editor from '../../components/Wangeditor';
import Material from './components/Material';
import { queryArticleContent, queryDominList, getAllTemplate, addSEMitem } from "@/services/sem"
import './less/add.less';
import Preview from './components/preview'
interface channlItemProps {
    channel_id: number | undefined;
    domain_id: number | undefined;
    keyWord: string | undefined;
    official_account_id: number | undefined;
    sub_channel: string | undefined,
    dominList?: [] | undefined
}
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

const SEMADD: React.FC<{}> = ({ sem }, props) => {
    let [editorHtml, setEditorHtml] = useState<string>('');
    let [isMaterialShow, setIsMaterialShow] = useState<boolean>(false);
    const [ispreviewShow, setispreviewShow] = useState<boolean>(false);
    let [channelDomainList, setChannelDomainList] = useState<channlItemProps[]>([
        {
            channel_id: undefined,
            domain_id: undefined,
            keyWord: undefined,
            official_account_id: undefined,
            sub_channel: undefined,
            dominList: []
        },
    ]);
    let [dominList, setDominList] = useState([])
    const [templateList, setTempalteList] = useState([])
    const [selectedArticleId, setSeletedArticleId] = useState(null)
    const [txtForm] = Form.useForm()
    useEffect(() => {
        if (selectedArticleId) {
            getContent(selectedArticleId)
        }
        getAllTemplateReq()
    }, [selectedArticleId])
    const add = () => {
        setChannelDomainList([
            ...channelDomainList,
            {
                channel_id: undefined,
                domain_id: undefined,
                keyWord: undefined,
                official_account_id: undefined,
                sub_channel: undefined
            },
        ]);
    };
    const getContent = (id: number | null) => {
        queryArticleContent(id).then(res => {
            console.log(res.data.context)
            if (res.isSuccess) {
                setEditorHtml(res.data.context)
                txtForm.setFieldsValue({
                    article_id: id,
                    title: res.data.title
                })
            }

        })
    }
    const getDominList = (id: number | null, index) => {
        console.log(id, index)
        queryDominList(id).then(res => {
            if (res.isSuccess) {
                console.log(res)
                setDominList(res.data)
            }
        })
    }
    const onFinishForm = values => {
        console.log(values)
        setispreviewShow(true)
    };
    const onFinishFailedForm = values => {
        message.error('请完成表单后提交')
    }
    const submitForm = (values) => {
        // console.log(txtForm, txtForm.getFieldsValue())
        let params = {
            ...txtForm.getFieldsValue(),
            context: editorHtml
        }
        console.log(params)
        addSEMitem(params).then(res => {
            if (res.isSuccss) {
                message.success('新增成功')
                setispreviewShow(false)
            }
        })

    }
    //获取全部模板
    const getAllTemplateReq = () => {
        getAllTemplate({}).then(res => {
            console.log(res)
            if (res.isSuccess) {
                setTempalteList(res.data)
            }
        })
    }
    return (
        <PageContainer title="推广新增">
            <Card>
                <Form
                    onFinish={onFinishForm}
                    onFinishFailed={onFinishFailedForm}
                    {...layout}
                    form={txtForm}
                    initialValues={
                        {
                            channelDomainList: [
                                {
                                    channel_id: undefined,
                                    domain_id: undefined,
                                    keyWord: undefined,
                                    official_account_id: undefined,
                                    sub_channel: undefined,
                                    dominList: []
                                },
                            ]
                        }
                    }
                >
                    <Row>
                        <Col span="7">
                            <Form.Item name="title" label="推广名称" rules={[{ required: true, message: '必填' }]}>
                                <Input placeholder="" />
                            </Form.Item>
                        </Col>
                        {/* <Col span="7">
                            <Form.Item name="extend_type" label="推广类型"  >
                                <Select>

                                </Select>
                            </Form.Item>
                        </Col> */}
                    </Row>
                    <Row>
                        <Col span="7">
                            <Form.Item name="template_id" label="推广模板" rules={[{ required: true, message: '必填' }]}>
                                <Select>
                                    {
                                        templateList.map((item, index) => {
                                            return (
                                                <Select.Option value={item['id']} key={index}>{item['name']}</Select.Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span="7">
                            <Form.Item name="article_id" label="推广素材">
                                <Button type="primary" onClick={() => { setIsMaterialShow(true) }}>点击选择</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col span='24'>
                            <Form.Item label="截断设置" labelCol={{ span: 2 }} name="context">
                                <Editor value={editorHtml} onChange={(params) => setEditorHtml(params)} ></Editor>
                                <Input type="hidden" value={editorHtml} />
                            </Form.Item>
                        </Col>

                    </Row>
                    <Row>
                        <Col span="7">
                            <Form.Item name="category" label="统计事件名称" rules={[{ required: true, message: '必填' }]}>
                                <Input></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.List name="channelDomainList">
                        {(channelDomainList, { add, remove }) => (
                            // console.log(channelDomainList)
                            <>
                                {channelDomainList.map((item, index) => (
                                    <div key={index}>
                                        <Row>
                                            <Col span="7">
                                                <Form.Item
                                                    {...item}
                                                    label='推广渠道'
                                                    name={[item.name, 'channel_id']}
                                                    key={index}
                                                    fieldKey={index}
                                                    rules={[{ required: true, message: '必填' }]}
                                                >
                                                    <Select
                                                        onChange={(item, index) => { getDominList(item, index) }}
                                                    >
                                                        {
                                                            sem.channels.map((item, index) => {
                                                                return (
                                                                    <Select.Option value={item.value} key={index}>{item.label}</Select.Option>
                                                                )
                                                            })
                                                        }
                                                    </Select>

                                                </Form.Item>

                                            </Col>
                                            <Col span="7">
                                                <Form.Item
                                                    label='子渠道'
                                                    name={[item.name, 'sub_channel']}
                                                    key={index}
                                                    fieldKey={index}
                                                    rules={[{ required: true, message: '必填' }]}
                                                >
                                                    <Input></Input>

                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col span="7">
                                                <Form.Item
                                                    label='推广域名'
                                                    name={[item.name, 'domain_id']}
                                                    key={index}
                                                    fieldKey={index}
                                                    rules={[{ required: true, message: '必填' }]}
                                                >
                                                    <Select>
                                                        {
                                                            dominList.map((item, index) => {
                                                                return (
                                                                    <Select.Option value={item['id']} key={index}>{item['domain_url']}</Select.Option>
                                                                )
                                                            })
                                                        }
                                                    </Select>

                                                </Form.Item>

                                            </Col>
                                            <Col span="7">
                                                <Form.Item
                                                    label='对接公众号'
                                                    name={[item.name, 'official_account_id']}
                                                    key={index}
                                                    fieldKey={index}
                                                    rules={[{ required: true, message: '必填' }]}
                                                >
                                                    <Select>
                                                        {
                                                            sem.OfficialAccounts.map((item, index) => {
                                                                return (
                                                                    <Select.Option value={item.value} key={index}>{item.label}</Select.Option>
                                                                )
                                                            })
                                                        }
                                                    </Select>

                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>

                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        新增推广渠道
                                </Button>
                                </Form.Item>
                            </>

                        )}

                    </Form.List>
                    <Button type="primary" htmlType="submit" >
                        预览
					</Button>
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
            <Preview
                isShow={ispreviewShow}
                content={editorHtml}
                onCancel={() => {
                    setispreviewShow(false);
                }}
                onSubmit={() => submitForm()}
            >

            </Preview>
        </PageContainer>
    );
};
const mapStateToProps = ({ sem }) => {
    return { sem };
};
export default connect(mapStateToProps)(SEMADD);
