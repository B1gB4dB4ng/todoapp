import React, { useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import Button from "./Button";

const TaskDetails = () => {
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState({});
  const [error, setError] = useState(null);

  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:5000/tasks/${params.id}`);
      const data = await response.json();

      if (response.status === 404) {
        navigate("/");
      }

      setTask(data);
      setLoading(false);
    };
    fetchTask();
  });
  if (error) {
    return <Navigate to="/" />;
  }

  return loading ? (
    <h3>Loading ...</h3>
  ) : (
    <div>
      <h3>{task.text}</h3>
      <p>{task.day}</p>
      <Button
        onClick={() => {
          navigate(-1);
        }}
        text="Go Back"
      />
    </div>
  );
};

export default TaskDetails;
