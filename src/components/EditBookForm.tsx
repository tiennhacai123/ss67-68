// src/components/EditBookForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { updateBook } from './bookSlice';

interface Book {
  id: number;
  name: string;
  borrower: string;
  borrowDate: string;
  returnDate: string;
  returned: boolean;
}

interface EditBookFormProps {
  book: Book;
  onClose: () => void;
}

const EditBookForm: React.FC<EditBookFormProps> = ({ book, onClose }) => {
  const [formData, setFormData] = useState(book);
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.borrower || !formData.borrowDate || !formData.returnDate) {
      alert('Tất cả các trường không được để trống');
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];
    if (formData.borrowDate < currentDate || formData.returnDate < currentDate) {
      alert('Ngày mượn và ngày trả không được bé hơn ngày hiện tại');
      return;
    }

    dispatch(updateBook(formData));
    onClose();
  };

  return (
    <div className="overlay">
      <form className="form" onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between align-items-center">
          <h4>Chỉnh sửa thông tin mượn trả sách</h4>
          <i className="fa-solid fa-xmark" onClick={onClose} />
        </div>
        <div>
          <label className="form-label" htmlFor="name">Tên sách</label>
          <input id="name" name="name" type="text" className="form-control" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label className="form-label" htmlFor="borrower">Sinh viên mượn</label>
          <input id="borrower" name="borrower" type="text" className="form-control" value={formData.borrower} onChange={handleChange} />
        </div>
        <div>
          <label className="form-label" htmlFor="borrowDate">Ngày mượn</label>
          <input id="borrowDate" name="borrowDate" type="date" className="form-control" value={formData.borrowDate} onChange={handleChange} />
        </div>
        <div>
          <label className="form-label" htmlFor="returnDate">Ngày trả</label>
          <input id="returnDate" name="returnDate" type="date" className="form-control" value={formData.returnDate} onChange={handleChange} />
        </div>
        <div>
          <button className="w-100 btn btn-primary">Cập nhật</button>
        </div>
      </form>
    </div>
  );
};

export default EditBookForm;
