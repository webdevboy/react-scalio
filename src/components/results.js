import React from 'react';
import { Table } from 'antd';

const Results = ({
  total,
  page,
  pageSize,
  result,
  columns,
  onPaginationChange,
  searchLoading
}) => (
  <Table
    pagination={{
      total,
      pageSize,
      onChange: onPaginationChange,
      current: page,
    }}
    dataSource={result}
    columns={columns}
    loading={searchLoading}
    defaultFilteredValue={['login']}
  />
);

export default Results;
