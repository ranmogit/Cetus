import { history, connect } from 'umi';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProForm, { ProFormText, ProFormDateRangePicker, ProFormSelect } from '@ant-design/pro-form';
import { Card, Button } from 'antd';
import Editor from '../../components/Wangeditor'
import Material from './components/Material'
import './less/add.less'

interface channlItemProps {
    use: number;
    use1: string;
    url: string;
    path: number
}

const SEMADD: React.FC<{}> = (props) => {
    let [editorHtml,setEditorHtml] = useState<string>('')
    let [isMaterialShow,setIsMaterialShow] = useState<boolean>(false)
    let [channl, setChannl] = useState<channlItemProps[]>([{
        use: 123,
        use1: '',
        url: '',
        path: 123
    }])
    const add = () => {
        setChannl([
            ...channl,
            {
                use: 123,
                use1: '',
                url: '',
                path: 123
            }
        ])
    }
    return (
        <PageContainer title="推广新增">
            <Card>
                <ProForm
                    onFinish={async (values) => { }}
                    submitter={{
                        render: (_, dom) => {
                            return <FooterToolbar>{dom}</FooterToolbar>
                        },
                    }}
                >
                    <ProForm.Group>
                        <ProFormText name="name" label="推广名称" placeholder="请输入推广名称" />
                        <ProFormSelect
                            options={[
                                {
                                    value: 'chapter',
                                    label: '盖章后生效',
                                },
                            ]}
                            name="useMode"
                            label="推广类型"
                        />
                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormSelect
                            options={[
                                {
                                    value: 'chapter',
                                    label: '盖章后生效',
                                },
                            ]}
                            name="useMode"
                            label="推广模板"
                        />
                        <ProFormText name="name" label="推广素材" placeholder="请输入推广名称" />
                    </ProForm.Group>
                    <ProForm.Group>
                        <div className="mgb24">
                            <Editor value={editorHtml} onChange={params=>setEditorHtml(params)} ></Editor>
                        </div>
                    </ProForm.Group>
                    
                    {
                        channl.map((item: channlItemProps, index: number) => {
                            return <div key={index}>
                                <ProForm.Group >
                                    <ProFormSelect
                                        options={[
                                            {
                                                value: 'chapter',
                                                label: '盖章后生效',
                                            },
                                        ]}
                                        name='item.use'
                                        label="推广渠道"
                                    />
                                    <ProFormText name='item.use1' label="子渠道" placeholder="请输入推广名称" />
                                    <DeleteOutlined className="deleteIcon"/>
                                </ProForm.Group>
                                <ProForm.Group>
                                    <ProFormText name='item.path' label="推广域名" placeholder="请输入推广名称" />
                                    <ProFormSelect
                                        options={[
                                            {
                                                value: 'chapter',
                                                label: '盖章后生效',
                                            },
                                        ]}
                                        name='item.url'
                                        label="对接公众号"
                                    />
                                </ProForm.Group>
                            </div>

                        })
                    }
                    <ProForm.Group>
                        <Button type="dashed" size='large' block icon={<PlusOutlined />} className="addBtn" onClick={add}> 继续添加推广渠道 </Button>
                    </ProForm.Group>
                    <ProFormText name="id" label="统计事件名称" />
                </ProForm>
            </Card>
            <Material isShow={isMaterialShow} onCancel={()=>{setIsMaterialShow(false)}}></Material>
        </PageContainer>
    );
};


export default connect()(SEMADD)