from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

app = Flask(__name__)

# Dummy Data (Properties)
data = [
    {"id": 1, "title": "Luxury Villa", "location": "New York", "price": 1000000, "tags": "luxury villa"},
    {"id": 2, "title": "Studio Apartment", "location": "San Francisco", "price": 500000, "tags": "apartment studio"},
    {"id": 3, "title": "Family Home", "location": "Chicago", "price": 750000, "tags": "home family"},
    {"id": 4, "title": "Beach House", "location": "Miami", "price": 1200000, "tags": "beach house luxury"},
    {"id": 5, "title": "Penthouse", "location": "Los Angeles", "price": 2000000, "tags": "penthouse luxury"},
]

df = pd.DataFrame(data)

tfidf = TfidfVectorizer()
tfidf_matrix = tfidf.fit_transform(df["tags"])

@app.route("/recommend", methods=["POST"])
def recommend():
    user_input = request.json.get("tags")  
    user_vector = tfidf.transform([user_input])  

    cosine_similarities = cosine_similarity(user_vector, tfidf_matrix).flatten()

    similar_indices = cosine_similarities.argsort()[-3:][::-1]
    recommendations = df.iloc[similar_indices].to_dict("records")

    return jsonify(recommendations)

if __name__ == "__main__":
    app.run(port=5001)
