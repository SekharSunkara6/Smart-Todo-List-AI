export default function TaskCard({ task }) {
  return (
    <div className="bg-white shadow rounded p-4 border hover:shadow-lg hover:-translate-y-1 transition transform">
      <h2 className="font-bold text-lg text-gray-800">{task.title}</h2>
      <p className="text-gray-600 mt-1">{task.description || "No description"}</p>

      <div className="flex justify-between mt-3 text-sm text-gray-500">
        <span>📌 Priority: {task.priority_score}</span>
        <span>🗓 {task.deadline || 'No deadline'}</span>
      </div>

      <div className="mt-2 text-xs text-gray-400">
        Status: {task.status}
      </div>
    </div>
  );
}
