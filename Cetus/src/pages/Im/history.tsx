import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import XcbTable from "@/components/XcbTable";
export default (): React.ReactNode => (
  <PageContainer>
	  <div>
      <div>search</div>
      <div>
        <XcbTable></XcbTable>
      </div>
    </div>
  </PageContainer>
);
