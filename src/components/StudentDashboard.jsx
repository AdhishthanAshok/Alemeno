import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { completeCourse } from "../redux/courseSlice";
const StudentDashboard = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);

  const getRandomProgress = () => Math.floor(Math.random() * 101);
  const handleCompleteCourse = (courseId) => {
    dispatch(completeCourse({ courseId }));
  };

  const getProgressBarColor = (progress) => {
    if (progress < 30) return "bg-red-500"; // Red for low progress
    if (progress < 70) return "bg-yellow-500"; // Yellow for medium progress
    return "bg-green-500"; // Green for high progress
  };
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">
            My Courses
          </h1>
          <div className="space-y-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="border p-4 rounded-lg shadow-sm bg-gray-100"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={course.thumbnail}
                    alt={course.name}
                    className="w-32 h-32 object-cover rounded mr-4"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {course.name}
                    </h2>
                    <p className="text-md text-gray-600 mb-1">
                      Instructor: {course.instructor}
                    </p>
                    <p className="text-md text-gray-600 mb-1">
                      Due Date: {course.dueDate}
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="relative pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-blue-800 bg-blue-200 px-2 py-1 rounded-full">
                        Progress
                      </span>
                      <span className="text-xs font-semibold text-blue-800 bg-blue-200 px-2 py-1 rounded-full">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="relative pt-1">
                      <div className="flex h-2 mb-2 overflow-hidden text-xs flex-col rounded bg-blue-200">
                        <div
                          style={{ width: `${course.progress}%` }}
                          className={`flex flex-col text-center whitespace-nowrap text-white justify-center ${getProgressBarColor(
                            getRandomProgress
                          )}`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleCompleteCourse(course.id)}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  Mark as Completed
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
