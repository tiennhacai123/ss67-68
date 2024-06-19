// src/components/Filter.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { filterBooksByStatus } from './bookSlice';

const Filter: React.FC = () => {
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    dispatch(filterBooksByStatus(status));
  };

  return (
    <div style={{marginLeft:"1000px"}}>
      <label>Trạng thái:</label>
      <select onChange={handleChange}>
        <option value="all">Tất cả</option>
        <option value="returned">Đã trả</option>
        <option value="notReturned">Chưa trả</option>
      </select>
    </div>
  );
};

export default Filter;
