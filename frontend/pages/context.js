import { useEffect, useState } from "react";

export default function ContextPage() {
  const [entries, setEntries] = useState([]);
  const [content, setContent] = useState("");
  const [sourceType, setSourceType] = useState("note");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/context/")
      .then(res => res.json())
      .then(data => {
        setEntries(data);
        setLoading(false);
      })
      .catch(err => console.error("Error fetching context:", err));
  }, []);

  const addContext = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/api/context/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, source_type: sourceType }),
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to add context");
        return res.json();
      })
      .then(newEntry => {
        setEntries([newEntry, ...entries]);
        setContent("");
      })
      .catch(err => alert(err));
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-4">📝 Context Entries</h1>

      <form onSubmit={addContext} className="mb-6">
        <textarea
          placeholder="Enter context (message, note, email)"
          className="border p-2 w-full rounded mb-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <select
          value={sourceType}
          onChange={(e) => setSourceType(e.target.value)}
          className="border p-2 rounded mr-2 bg-white text-gray-900"
        >
          <option value="note">Note</option>
          <option value="email">Email</option>
          <option value="whatsapp">WhatsApp</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          Add Context
        </button>
      </form>

      {loading ? (
        <p>Loading context...</p>
      ) : (
        <ul className="bg-white text-gray-900 shadow rounded p-4">
          {entries.map(entry => (
            <li key={entry.id} className="mb-3">
              <p className="font-semibold">{entry.source_type}</p>
              <p className="text-gray-600">{entry.content}</p>
              <span className="text-xs text-gray-400">
                {new Date(entry.timestamp).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
