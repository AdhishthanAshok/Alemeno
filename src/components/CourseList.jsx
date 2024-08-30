import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourses,
  setCourseLikes,
  initializeCourses,
} from "../redux/courseSlice";
import { Link } from "react-router-dom";

function CourseList() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedCourses = localStorage.getItem("courses");
    if (savedCourses) {
      dispatch(initializeCourses(JSON.parse(savedCourses)));
    } else {
      fetch("https://mocki.io/v1/90a657ad-9192-4b5c-b9ad-dfc0df22bbd8")
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            dispatch(setCourses(data));
            // Save fetched courses to local storage
            localStorage.setItem("courses", JSON.stringify(data));
          } else {
            dispatch(setCourses([data]));
            localStorage.setItem("courses", JSON.stringify([data]));
          }
        })
        .catch((error) => console.error("Error fetching courses:", error));
    }
  }, [dispatch]);

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLikeClick = (courseId) => {
    // course and increment likes
    const course = courses.find((course) => course.id === courseId);
    if (course) {
      const updatedLikes = (course.likes || 0) + 1;
      dispatch(setCourseLikes({ courseId, likes: updatedLikes }));
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        className="p-2 border border-gray-300 rounded mb-4 w-full"
        placeholder="Search by course name or instructor"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="border p-4 rounded shadow hover:shadow-lg cursor-pointer"
          >
            <Link to={`/courses/${course.id}`}>
              <img
                src={course.thumbnail}
                alt={course.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="font-bold text-xl mb-2">{course.name}</h3>
              <p className="text-gray-600 mb-1">
                Instructor: {course.instructor}
              </p>
              <p className="text-gray-600">Duration: {course.duration}</p>
            </Link>
            <button
              onClick={() => handleLikeClick(course.id)}
              className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              ❤ {course.likes || 0}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseList;
