import {configureStore} from '@reduxjs/toolkit';
import todoItemSlice from '../slice/todoItemSlice';

export const store = configureStore({
  reducer: {
    todoItems: todoItemSlice
  },
});
