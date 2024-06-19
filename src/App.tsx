// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import BookTable from './components/BookTable';
import Filter from './components/Filter';
import AddBookForm from './components/AddBookForm';
import { useState } from 'react';

const App: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <Provider store={store}>
      <div className="app-container">
        <h1 style={{display:"flex",justifyContent:"center"}}>Quản lý mượn trả sách</h1>
        <div style={{marginLeft:"1000px"}}>
        <button  onClick={() => setShowAddForm(true)}>Thêm thông tin mượn sách</button>
        </div>
        {showAddForm && <AddBookForm onClose={() => setShowAddForm(false)} />}
        <Filter />
        <BookTable />
      </div>
    </Provider>
  );
};

export default App;
