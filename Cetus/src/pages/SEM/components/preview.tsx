import React from 'react'
import { Table, Form, Row, Col, Input, Button, Card, Alert, Modal } from 'antd';

import styles from './preview.less'
const Preview = (props) => {
    const { isShow, onCancel, content, onSubmit } = props

    return (
        <div>
            <Modal
                destroyOnClose
                visible={isShow}
                onCancel={() => onCancel()}
                width={375}
                onOk={onSubmit}
                title="文章预览">
                <div 
                className={styles.container}
                dangerouslySetInnerHTML={{ __html: content }} style={{ maxWidth: '100%' }}>
                </div>
            </Modal>
        </div>
    )
}
export default Preview