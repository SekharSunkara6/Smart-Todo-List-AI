import { useEffect, useState } from "react";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/categories/")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Error loading categories:", err));
  }, []);

const getAISuggestions = () => {
  setLoadingAI(true);
  fetch("http://localhost:8000/api/ai/suggestion/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.ai_suggestion) {
        console.log("AI suggestion received:", data.ai_suggestion);
        setPriority(data.ai_suggestion.priority_score.toString());
        setDeadline(data.ai_suggestion.suggested_deadline);
      } else {
        console.log("No AI suggestion returned");
      }
    })
    .catch(error => {
      console.error("Error fetching AI suggestion:", error);
    })
    .finally(() => setLoadingAI(false));
};

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      title,
      description,
      category: category || null,
      priority_score: parseInt(priority) || 0,
      deadline: deadline || null,
      status: "pending",
    };

    fetch("http://localhost:8000/api/tasks/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to create task");
        alert("✅ Task created successfully!");
        setTitle("");
        setDescription("");
        setCategory("");
        setPriority("");
        setDeadline("");
      })
      .catch(err => {
        console.error(err);
        alert("❌ Error creating task");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-5">➕ Add New Task</h1>

      <form onSubmit={handleSubmit} className="bg-white text-gray-900 shadow rounded p-6 max-w-lg">
        <label className="block mb-3">
          <span className="font-medium">Title</span>
          <input
            type="text"
            className="border p-2 w-full rounded mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label className="block mb-3">
          <span className="font-medium">Description</span>
          <textarea
            className="border p-2 w-full rounded mt-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label className="block mb-3">
          <span className="font-medium">Category</span>
          <select
            className="border p-2 w-full rounded mt-1 bg-white text-gray-900"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">-- None --</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>

        <div className="flex gap-4">
          <label className="block flex-1">
            <span className="font-medium">Priority Score</span>
            <input
              type="number"
              className="border p-2 w-full rounded mt-1"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            />
          </label>

          <label className="block flex-1">
            <span className="font-medium">Deadline</span>
            <input
              type="date"
              className="border p-2 w-full rounded mt-1"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </label>
        </div>

        <button
          type="button"
          onClick={getAISuggestions}
          disabled={loadingAI}
          className="mt-3 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          {loadingAI ? "Getting AI suggestion..." : "💡 Get AI Suggestion"}
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          {submitting ? "Adding Task..." : "Add Task"}
        </button>
      </form>
    </div>
  );
}
