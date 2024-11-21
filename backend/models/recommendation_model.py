import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

# Load the dataset
product_data = pd.read_csv('./models/data/merged_amazon_flipkart_rowwise.csv')

def recommend_products(ID=None, Name=None, top_n=5):
    # Filter dataset for product recommendations based on product_id (ID)
    if ID:
        # Find the product in the dataset
        product = product_data[product_data['pid'] == ID]  # Correct column name is 'pid'
        if product.empty:
            return {"error": "Product not found"}

        # Compute similarity based on product descriptions
        vectorizer = TfidfVectorizer(stop_words='english')
        tfidf_matrix = vectorizer.fit_transform(product_data['Description'].fillna(''))
        cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

        # Get the index of the queried product
        product_idx = product.index[0]
        similarity_scores = list(enumerate(cosine_sim[product_idx]))
        similarity_scores = sorted(similarity_scores, key=lambda x: x[1], reverse=True)

        # Get top N similar products
        similar_products = [
            {
                "product_id": product_data.iloc[i[0]]['pid'],  # Correct column name is 'pid'
                "product_name": product_data.iloc[i[0]]['Name'],  # Correct column name is 'Name'
                "similarity_score": round(i[1], 2),
            }
            for i in similarity_scores[1:top_n + 1]
        ]
        return similar_products

    return {"error": "Provide a valid product_id"}
