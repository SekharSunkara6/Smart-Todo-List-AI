import datetime
from textblob import TextBlob
import re
import nltk
from collections import Counter

# Download stopwords if not already present
nltk.download('stopwords')
from nltk.corpus import stopwords
STOPWORDS = set(stopwords.words('english'))

def extract_keywords(text, top_n=5):
    """Simple keyword extraction by frequency, excluding stopwords."""
    words = re.findall(r'\b\w+\b', text.lower())
    filtered = [w for w in words if w not in STOPWORDS and len(w) > 2]
    most_common = Counter(filtered).most_common(top_n)
    return [word for word, _ in most_common]

def analyze_tasks_with_context(tasks, context_entries):
    urgent_keywords = ["urgent", "today", "asap", "immediately", "deadline", "important"]
    suggestions = []

    for task in tasks:
        priority_score = 5  # default
        matched_contexts = []
        aggregated_sentiment = 0
        aggregated_keywords = set()

        title_lower = task.title.lower()
        desc_lower = (task.description or "").lower()

        for context in context_entries:
            ctx_lower = context.content.lower()

            # Sentiment analysis
            blob = TextBlob(context.content)
            polarity = round(blob.sentiment.polarity, 2)  # -1.0 (neg) to 1.0 (pos)
            aggregated_sentiment += polarity

            # Keywords
            kws = extract_keywords(context.content)
            aggregated_keywords.update(kws)

            # Priority scoring
            if any(word in ctx_lower for word in urgent_keywords) and (
                title_lower in ctx_lower or desc_lower in ctx_lower
            ):
                priority_score += 3
                matched_contexts.append(f"{context.content[:60]} (urgent match)")
            elif title_lower in ctx_lower or desc_lower in ctx_lower:
                priority_score += 1
                matched_contexts.append(context.content[:60])

        # Clamp between 1–10
        priority_score = max(1, min(priority_score, 10))

        # Suggested deadline
        days_to_deadline = max(1, 11 - priority_score)
        suggested_deadline = datetime.date.today() + datetime.timedelta(days=days_to_deadline)

        suggestions.append({
            "task_id": task.id,
            "task_title": task.title,
            "priority_score": priority_score,
            "suggested_deadline": suggested_deadline,
            "recommended_category": task.category.name if task.category else "General",
            "matched_contexts": matched_contexts,
            "avg_sentiment": round(aggregated_sentiment / len(context_entries), 2) if context_entries else 0,
            "extracted_keywords": list(aggregated_keywords)
        })

    return suggestions
