// src/redux/courseSlice.js
import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [], // Initialize with an empty array
  },
  reducers: {
    setCourses(state, action) {
      state.courses = action.payload;
    },
    setCourseLikes(state, action) {
      const { courseId, likes } = action.payload;
      const course = state.courses.find((course) => course.id === courseId);
      if (course) {
        course.likes = likes; // Update the likes count
        // Save the updated likes to local storage
        localStorage.setItem("courses", JSON.stringify(state.courses));
      }
    },
    completeCourse(state, action) {
      const { courseId } = action.payload;
      const course = state.courses.find((course) => course.id === courseId);
      if (course) {
        course.completed = true;
        course.progress = 100;
      }
    },
    initializeCourses(state, action) {
      state.courses = action.payload;
    },
  },
});

export const { setCourses, setCourseLikes, completeCourse, initializeCourses } =
  courseSlice.actions;
export default courseSlice.reducer;
