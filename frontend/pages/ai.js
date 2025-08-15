import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";

export default function AISuggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/ai/suggestions/")
      .then(res => res.json())
      .then(data => {
        setSuggestions(data.ai_suggestions || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching AI suggestions:", err);
        setLoading(false);
      });
  }, []);

  const getPriorityColor = (score) => {
    if (score >= 8) return "bg-red-50 border-red-300";
    if (score >= 5) return "bg-yellow-50 border-yellow-300";
    return "bg-green-50 border-green-300";
  };

  const getSentimentEmoji = (score) => {
    if (score > 0.2) return "😊";
    if (score < -0.2) return "⚠️";
    return "😐";
  };

  return (
    <PageLayout title="🤖 AI Task Suggestions">
      {loading ? (
        <p className="text-gray-500">Loading AI suggestions...</p>
      ) : suggestions.length === 0 ? (
        <p className="text-gray-500">No AI suggestions available.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {suggestions.map((s, index) => (
            <div
              key={index}
              className={`shadow rounded p-4 border hover:shadow-lg transition ${getPriorityColor(
                s.priority_score
              )} text-gray-900`}
            >
              {/* Added text-gray-900 here */}
              <h2 className="font-bold text-lg mb-2 text-gray-900">{s.task_title}</h2>

              <p>
                🔢 <strong>Priority Score:</strong> {s.priority_score}
              </p>
              <p>
                📅 <strong>Suggested Deadline:</strong> {s.suggested_deadline || "N/A"}
              </p>
              <p>
                📂 <strong>Recommended Category:</strong> {s.recommended_category || "General"}
              </p>

              {s.avg_sentiment !== undefined && (
                <p>
                  💬 <strong>Sentiment Score:</strong> {s.avg_sentiment} {getSentimentEmoji(s.avg_sentiment)}
                </p>
              )}

              {s.extracted_keywords && s.extracted_keywords.length > 0 && (
                <div className="mt-2">
                  <strong>🏷 Keywords:</strong>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {s.extracted_keywords.map((kw, i) => (
                      <span key={i} className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">{kw}</span>
                    ))}
                  </div>
                </div>
              )}

              {s.matched_contexts && s.matched_contexts.length > 0 && (
                <div className="mt-3 text-sm text-gray-700 bg-white bg-opacity-70 p-3 rounded">
                  <strong>📝 Matched Contexts:</strong>
                  <ul className="list-disc list-inside mt-1">
                    {s.matched_contexts.map((ctx, i) => (
                      <li key={i}>{ctx}...</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </PageLayout>
  );
}
