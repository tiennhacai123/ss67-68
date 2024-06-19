// src/components/BookTable.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { deleteBook, toggleBookStatus } from './bookSlice';
import EditBookForm from './EditBookForm';

const BookTable: React.FC = () => {
  const books = useSelector((state: RootState) => state.books.books);
  const dispatch = useDispatch();
  const [editingBook, setEditingBook] = useState(null);

  const handleDelete = (id: number) => {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa thông tin mượn trả sách này không?');
    if (confirmed) {
      dispatch(deleteBook(id));
    }
  };

  const handleToggleStatus = (id: number) => {
    dispatch(toggleBookStatus(id));
  };

  const handleEdit = (book: any) => {
    setEditingBook(book);
  };

  const handleCloseEditForm = () => {
    setEditingBook(null);
  };

  return (
    <div className="container mt-4">
      <table className="table table-bordered ">
        <thead>
          <tr>
            <th scope="col">Tên sách</th>
            <th scope="col">Sinh viên mượn</th>
            <th scope="col">Ngày mượn</th>
            <th scope="col">Ngày trả</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.name}</td>
              <td>{book.borrower}</td>
              <td>{book.borrowDate}</td>
              <td>{book.returnDate}</td>
              <td
                onClick={() => handleToggleStatus(book.id)}
                className={`status ${book.returned ? 'text-success' : 'text-warning'}`}
              >
                {book.returned ? 'Đã trả' : 'Chưa trả'}
              </td>
              <td>
                <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(book)}>Sửa</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(book.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingBook && <EditBookForm book={editingBook} onClose={handleCloseEditForm} />}
    </div>
  );
};

export default BookTable;
