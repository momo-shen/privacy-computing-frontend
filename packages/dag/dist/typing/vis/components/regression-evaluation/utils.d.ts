import type { ResultData } from '../typing';
export declare const IndicatorMap: {
    sample_count: string;
    y_true_mean: string;
    y_pred_mean: string;
    r2_score: string;
    mean_absolute_error: string;
    mean_absolute_percentage_error: string;
    sum_squared_error: string;
    mean_squared_error: string;
    root_mean_squared_error: string;
};
export declare const handleResultData: (data: ResultData) => {
    indicatorInfo: {
        indicator: string;
        value: number;
    }[];
    distributionInfo: {
        bins: import("./interface").Bin[];
    };
};
export declare const renderIndicatorText: (key: keyof typeof IndicatorMap) => string;
//# sourceMappingURL=utils.d.ts.map