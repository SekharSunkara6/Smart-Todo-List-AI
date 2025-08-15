import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import PageLayout from "../components/PageLayout";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://smart-todo-list-ai.onrender.com/api/tasks/")
      .then(res => res.json())
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <PageLayout title="📋 Smart Todo Dashboard">
      {loading ? (
        <p className="text-gray-500">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {tasks.map(task => <TaskCard key={task.id} task={task} />)}
        </div>
      )}
    </PageLayout>
  );
}
