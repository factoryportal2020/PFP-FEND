import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    task_worker_id: "",
    task_category_id: "",
    item_category_id: "",
}

const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
        workerTaskWorkerId: (state, { payload }) => {
            // console.log("payload")
            // console.log(payload)
            state.task_worker_id = payload
        },
        categoryTaskCategoryId: (state, { payload }) => {
            state.task_category_id = payload
        },
        categoryItemCategoryId: (state, { payload }) => {
            state.item_category_id = payload
        }
    }
})

export const { workerTaskWorkerId, categoryTaskCategoryId, categoryItemCategoryId } = viewSlice.actions

export default viewSlice.reducer
