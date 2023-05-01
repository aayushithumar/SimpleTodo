const { createSlice } = require("@reduxjs/toolkit");

const todoItemSlice = createSlice({
 name: 'todoItems',
 initialState: {
    todoArray: []
 },
 reducers: {
   
    addToDoList(state,action){
      const {dataArray} = action.payload
      state.todoArray.concat(dataArray)

    }
 }
})

export const {addToDoList} = todoItemSlice.actions;

export default todoItemSlice.reducer;