// src/components/bookSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface Book {
  id: number;
  name: string;
  borrower: string;
  borrowDate: string;
  returnDate: string;
  returned: boolean;
}

interface BookState {
  books: Book[];
  filter: 'all' | 'returned' | 'notReturned';
}

const initialState: BookState = {
  books: [],
  filter: 'all',
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Omit<Book, 'id'>>) => {
      const newBook = {
        id: state.books.length + 1,
        ...action.payload,
      };
      state.books.push(newBook);
    },
    updateBook: (state, action: PayloadAction<Book>) => {
      const index = state.books.findIndex(book => book.id === action.payload.id);
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
    deleteBook: (state, action: PayloadAction<number>) => {
      state.books = state.books.filter(book => book.id !== action.payload);
    },
    toggleBookStatus: (state, action: PayloadAction<number>) => {
      const book = state.books.find(book => book.id === action.payload);
      if (book) {
        book.returned = !book.returned;
      }
    },
    filterBooksByStatus: (state, action: PayloadAction<'all' | 'returned' | 'notReturned'>) => {
      state.filter = action.payload;
    },
  },
});

export const { addBook, updateBook, deleteBook, toggleBookStatus, filterBooksByStatus } = bookSlice.actions;
export default bookSlice.reducer;

export const selectFilteredBooks = (state: RootState) => {
  if (state.books.filter === 'all') {
    return state.books.books;
  }
  return state.books.books.filter(book => {
    return state.books.filter === 'returned' ? book.returned : !book.returned;
  });
};
