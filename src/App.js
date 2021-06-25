import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';

import { getUsers } from './api';
import SearchBlock from './components/search';
import Results from './components/results';

const { Content } = Layout;

const columns = [
  {
    title: 'avatar_url',
    dataIndex: 'avatar_url',
    key: 'avatar_url',
    sorter: (a, b) => a.avatar_url.length - b.avatar_url.length,
  },
  {
    title: 'login',
    dataIndex: 'login',
    key: 'login',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.login.length - b.login.length,
  },
  {
    title: 'type',
    dataIndex: 'type',
    key: 'type',
  },
];

const App = () => {
  const [search, setSearch] = useState('')
  const [searchLoading, setSearchLoading] = useState(false);
  const [result, setResult] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(9);

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onSearch = async () => {
    try {
      if(!search) return;
      setSearchLoading(true);
      const res = await getUsers(search, page, pageSize);
      setResult(res.data.items?.map(item => ({
        avatar_url: item.avatar_url,
        login: item.login,
        type: item.type,
        key: item.avatar_url,
        defaultSortOrder: 'descend',
      })))
      setTotal(res.data.total_count);
      setSearchLoading(false);
    }
    catch (error) {
      setSearchLoading(false);
    }
  };

  const onPaginationChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  useEffect(() => {
    onSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  return (
    <Layout>
        <Content>
          <div className="wrapper">
            <SearchBlock
              {...{
                search,
                searchLoading,
                onChange,
                onSearch,
              }}
            />
            <Results
              {...{
                total,
                page,
                pageSize,
                result,
                columns,
                onPaginationChange,
                searchLoading
              }}
            />
          </div>
        </Content>
    </Layout>
  );
}

export default App;
