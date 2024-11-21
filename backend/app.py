from flask import Flask, request, jsonify
from models.recommendation_model import recommend_products

app = Flask(__name__)

# Default route
@app.route("/")
def home():
    return jsonify({"message": "Welcome to the E-commerce Recommendation System API!"})

# Endpoint for recommendations
@app.route("/recommend", methods=["POST"])
def recommend():
    try:
        # Parse input data (e.g., product_id)
        data = request.json
        product_id = data.get("product_id", None)  # Correct key to match the request

        if product_id:
            # Recommend products based on product_id
            recommendations = recommend_products(ID=product_id)  # Correct argument to the function
        else:
            return jsonify({"error": "Invalid input. Provide product_id."}), 400

        return jsonify({"recommendations": recommendations})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
