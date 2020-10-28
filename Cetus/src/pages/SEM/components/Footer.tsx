import React from 'react';
import { FooterToolbar } from '@ant-design/pro-layout';
import { Button } from 'antd';
import { TableListItem } from '../../../models/sem';

interface FooterProps {
    selectedRowsState: TableListItem[];
    editor: () => void;
    copy: () => void;
    exportFile: () => void
}

const Footer: React.FC<FooterProps> = (props) => {
    const { selectedRowsState, editor, copy, exportFile } = props;

    return (
        <FooterToolbar 
            extra={
                <div>
                    已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
                </div>
            }
        >
            <Button onClick={editor.bind(this)}> 批量编辑 </Button>
            <Button type="primary" onClick={copy.bind(this)}>批量复制</Button>
            <Button type="primary" onClick={exportFile.bind(this)}>导出</Button>
        </FooterToolbar>
    );
};

export default Footer;
