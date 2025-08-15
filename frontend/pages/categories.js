import { useEffect, useState } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://smart-todo-list-ai.onrender.com/api/categories/")
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  const addCategory = (e) => {
    e.preventDefault();
    fetch("https://smart-todo-list-ai.onrender.com/api/categories/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, usage_frequency: 0 }),
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to add category");
        return res.json();
      })
      .then(newCat => {
        setCategories([...categories, newCat]);
        setName("");
      })
      .catch(err => alert(err));
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-4">📂 Categories</h1>

      <form onSubmit={addCategory} className="mb-6">
        <input
          type="text"
          placeholder="Category name"
          className="border p-2 rounded mr-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          Add Category
        </button>
      </form>

      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <ul className="bg-white text-gray-900 shadow rounded p-4">
          {categories.map(cat => (
            <li key={cat.id} className="p-2 border-b last:border-0 flex justify-between items-center">
              <span>
                {cat.name} <span className="text-gray-500">({cat.usage_frequency} uses)</span>
              </span>
              <button
                onClick={() => {
                  if (confirm(`Delete category "${cat.name}"?`)) {
                    fetch(`https://smart-todo-list-ai.onrender.com/api/categories/${cat.id}/`, {
                      method: "DELETE"
                    })
                      .then(res => {
                        if (res.ok) {
                          setCategories(categories.filter(c => c.id !== cat.id));
                        } else {
                          alert("Failed to delete category");
                        }
                      })
                      .catch(err => console.error(err));
                  }
                }}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
