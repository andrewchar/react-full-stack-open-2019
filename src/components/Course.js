import React from "react";
import Header from "./Header";
import Part from "./Part";

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map(course => {
        const sumOfExercises = course.parts.reduce(
          (a, b) => a + b.exercises,
          0
        );
        return (
          <div key={course.id}>
            <Header title={course.name} />
            <ul>
              {course.parts.map(part => (
                <Part key={part.id} part={part} />
              ))}
            </ul>
            <p>
              <strong>total of {sumOfExercises} exercises</strong>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Course;
