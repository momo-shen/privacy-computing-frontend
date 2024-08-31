import type { RadioChangeEvent } from 'antd';
import { Select, Radio, Modal, Button, Tooltip } from 'antd';
import React from 'react';

export enum RadioGroupState {
  ALL = '',
  APPLY = 'APPLY',
  PROCESS = 'PROCESS',
}

export const RadioGroup = (props: {
  value: RadioGroupState;
  onChange: (e: RadioGroupState) => void;
}) => {
  const { value, onChange } = props;
  return (
    <Radio.Group
      defaultValue={RadioGroupState.ALL}
      onChange={(e: RadioChangeEvent) => {
        onChange(e.target.value);
      }}
      value={value}
    >
      <Radio.Button value={RadioGroupState.ALL}>全部</Radio.Button>
      <Radio.Button value={RadioGroupState.APPLY}>我发起</Radio.Button>
      <Radio.Button value={RadioGroupState.PROCESS}>我受邀</Radio.Button>
    </Radio.Group>
  );
};
