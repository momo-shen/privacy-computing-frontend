import React, {useState} from 'react';
import {Button, Input, Spin} from 'antd';
import './index.less';
import {useModel} from "@/util/valtio-helper";
import {SqlQueryService} from "@/modules/prisql/sql-query/sql-query.service";

export const SqlQuery = () => {

  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const sqlQueryService = useModel(SqlQueryService);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const query = () => {
    setLoading(true);
    sqlQueryService.runSQL(inputValue).then((res) => {
      const formattedData = res.replace("\"data\": \"[", "\"data\": \"\n[").replace(/\\n/g, "<br />").replace(/\\"/g, '"');
      setResult(formattedData);
      setLoading(false);
    });
  };

  return (
      <Spin spinning={loading}>
        <div className="body">
          <div className="query">
            <Input type="text" value={inputValue} placeholder="请输入查询SQL"
                   onChange={handleInputChange}/>
            <Button onClick={query} style={{marginLeft: "10px"}}>查询</Button>
          </div>
          <div className="result">
            结果：
            <div style={{whiteSpace: 'pre-wrap'}}
                 dangerouslySetInnerHTML={{__html: result}}
            />
          </div>
        </div>
      </Spin>
  );
};
