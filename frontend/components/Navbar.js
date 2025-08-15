import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white px-6 py-3 shadow-md">
      <div className="flex flex-wrap gap-4 text-sm sm:text-base">
        <Link className="hover:underline" href="/">🏠 Dashboard</Link>
        <Link className="hover:underline" href="/ai">🤖 AI Suggestions</Link>
        <Link className="hover:underline" href="/add-task">➕ Add Task</Link>
        <Link className="hover:underline" href="/categories">📂 Categories</Link>
        <Link className="hover:underline" href="/context">📝 Context</Link>
      </div>
    </nav>
  );
}
