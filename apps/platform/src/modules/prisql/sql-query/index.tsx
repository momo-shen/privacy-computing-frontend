import React, {useState} from 'react';
import {Button, Input} from 'antd';
import './index.less';

export const SqlQuery = () => {

  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState([]);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const query = () => {

  };

  return (
      <div className="body">
        <div className="query">
          <Input type="text" value={inputValue} placeholder="请输入查询SQL" onChange={handleInputChange}/>
          <Button onClick={query} style={{marginLeft: "10px"}}>查询</Button>
        </div>
        <div className="result">
          结果：{result}
        </div>
      </div>
  );
};
