import React from 'react';
export interface BarChartProps {
    data: DataType[];
}
interface DataType {
    key: string;
    feature_name: string;
    feature_importance: number;
}
export declare const BarChart: React.FC<BarChartProps>;
export {};
//# sourceMappingURL=BarChart.d.ts.map