const { createSlice } = require("@reduxjs/toolkit");

const todoItemSlice = createSlice({
 name: 'todoItems',
 initialState: {
    todoArray: []
 },
 reducers: {
   
    addTodoItem(state,action){
        const {id, title, isCompleted, userId} = action.payload
        console.log("action dta" + title)
        state.todoArray.push({id, title, isCompleted: false, userId})
        console.log("state dta" + JSON.stringify(state))

    },
 }
})

export const {addTodoItem} = todoItemSlice.actions;

export default todoItemSlice.reducer;