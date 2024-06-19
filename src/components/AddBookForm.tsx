// src/components/AddBookForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from './bookSlice';

interface AddBookFormProps {
  onClose: () => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [borrower, setBorrower] = useState('');
  const [borrowDate, setBorrowDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'borrower') setBorrower(value);
    if (name === 'borrowDate') setBorrowDate(value);
    if (name === 'returnDate') setReturnDate(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !borrower || !borrowDate || !returnDate) {
      alert('Tất cả các trường không được để trống');
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];
    if (borrowDate < currentDate || returnDate < currentDate) {
      alert('Ngày mượn và ngày trả không được bé hơn ngày hiện tại');
      return;
    }

    dispatch(addBook({ name, borrower, borrowDate, returnDate, returned: false }));

    onClose();
  };

  return (
    <div className="overlay">
      <form className="form" onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between align-items-center">
          <h4>Thêm thông tin mượn trả sách</h4>
          <i className="fa-solid fa-xmark" onClick={onClose} />
        </div>
        <div>
          <label className="form-label" htmlFor="name">Tên sách</label>
          <input id="name" name="name" type="text" className="form-control" value={name} onChange={handleChange} />
        </div>
        <div>
          <label className="form-label" htmlFor="borrower">Sinh viên mượn</label>
          <input id="borrower" name="borrower" type="text" className="form-control" value={borrower} onChange={handleChange} />
        </div>
        <div>
          <label className="form-label" htmlFor="borrowDate">Ngày mượn</label>
          <input id="borrowDate" name="borrowDate" type="date" className="form-control" value={borrowDate} onChange={handleChange} />
        </div>
        <div>
          <label className="form-label" htmlFor="returnDate">Ngày trả</label>
          <input id="returnDate" name="returnDate" type="date" className="form-control" value={returnDate} onChange={handleChange} />
        </div>
        <div>
          <button className="w-100 btn btn-primary">Thêm mới</button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
