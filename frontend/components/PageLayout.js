export default function PageLayout({ title, children }) {
  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-8 py-6">
      {/* Set heading with dark text color */}
      <h1 className="text-3xl font-bold mb-6 text-gray-900">{title}</h1>
      <div className="max-w-4xl mx-auto">{children}</div>
    </div>
  );
}
