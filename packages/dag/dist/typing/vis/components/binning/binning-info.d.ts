import type { TableColumnType } from 'antd';
import React from 'react';
import type { ResultData } from '../typing';
import './index.less';
export declare const getColumnSearchProps: <T>(dataIndex: keyof T) => Pick<TableColumnType<T>, "filterDropdown" | "filterIcon" | "onFilter">;
export declare const BinningInfo: React.FunctionComponent<BinningInfoProps>;
export interface BinningInfoProps {
    data: ResultData;
}
//# sourceMappingURL=binning-info.d.ts.map