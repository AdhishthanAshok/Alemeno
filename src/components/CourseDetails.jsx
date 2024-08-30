import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CourseDetails = () => {
  const { id } = useParams(); // Get course ID from URL
  const courses = useSelector((state) => state.courses.courses); // Access Redux state
  const course = courses.find((course) => course.id === parseInt(id)); // Find the specific course

  const [isSyllabusExpanded, setIsSyllabusExpanded] = useState(false); // State to toggle syllabus visibility

  if (!course) {
    return (
      <div className="text-center text-lg text-red-500">Course not found</div>
    );
  }

  const handleToggleSyllabus = () => {
    setIsSyllabusExpanded(!isSyllabusExpanded); // syllabus expansion controller
  };

  // Sort the syllabus items by week number
  const sortedSyllabus = course.syllabus
    .slice()
    .sort((a, b) => a.week - b.week);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.name}
          className="w-full h-60 object-cover rounded-t-lg"
        />
        <div className="p-6">
          <div className="flex items-center justify-between gap-10 mb-4">
            <h1 className="text-4xl font-semibold text-gray-900">
              {course.name}
            </h1>
            <div className="bg-white border border-muted rounded-md px-4 py-3 flex items-center gap-3">
              <div className=" text-white rounded-full w-6 h-6 flex items-center justify-center">
                ❤
              </div>
              <span className="font-bold">{course.likes || 0}</span>
            </div>
          </div>
          <p className="text-lg text-gray-700 mb-6">{course.description}</p>
          <div className="mb-4">
            <p className="text-md text-blue-400 font-medium mb-1">
              <span className="font-semibold text-black">Instructor:</span>{" "}
              {course.instructor}
            </p>
            <p className="text-md text-blue-400 font-medium mb-1">
              <span className="font-semibold text-black">
                Enrollment Status:
              </span>{" "}
              {course.enrollmentStatus}
            </p>
            <p className="text-md text-blue-400 font-medium mb-1">
              <span className="font-semibold text-black">Duration:</span>{" "}
              {course.duration}
            </p>
            <p className="text-md text-blue-400 font-medium mb-1">
              <span className="font-semibold text-black">Schedule:</span>{" "}
              {course.schedule}
            </p>
            <p className="text-md text-blue-400 font-medium mb-1">
              <span className="font-semibold text-black">Location:</span>{" "}
              {course.location}
            </p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Prerequisites
            </h2>
            <ul className="list-disc pl-5 text-gray-700">
              {course.prerequisites.map((prerequisite, index) => (
                <li key={index} className="mb-1">
                  {prerequisite}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Syllabus
              <button
                onClick={handleToggleSyllabus}
                className="ml-4 text-blue-500 underline hover:text-blue-400"
              >
                {isSyllabusExpanded ? "Hide Syllabus" : "Show Syllabus"}
              </button>
            </h2>
            {isSyllabusExpanded && (
              <div className="space-y-4">
                {sortedSyllabus.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg shadow-sm bg-gray-100"
                  >
                    <h3 className="text-lg font-medium text-blue-400 mb-1">{`Week ${item.week}: ${item.topic}`}</h3>
                    <p className="text-gray-700">{item.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
