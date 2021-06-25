import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const SearchBlock = ({ search, onChange, onSearch, searchLoading }) => (
  <div className="search">
    <Search
      className="search-input"
      value={search}
      placeholder="input search text"
      onChange={onChange}
      onSearch={onSearch}
      loading={searchLoading}
      enterButton="Submit"
    />
  </div>
);

export default SearchBlock;
