import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  step: 1,
  course: null,
  editCourse: false
}

const courseSlice = createSlice({
  name: "course",
  initialState: initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setCourse: (state, action) => {
      state.editCourse = action.payload
    }
  }
})

export const {setStep} = courseSlice.actions;
export default courseSlice.reducer