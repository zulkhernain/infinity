from flask import Flask, request, jsonify
import sqlite3
import google.generativeai as genai

app = Flask(__name__)

# Connect Gemini
genai.configure(api_key="YOUR_GEMINI_API_KEY")

model = genai.GenerativeModel("gemini-pro")


@app.route("/ask", methods=["POST"])
def ask():

    data = request.json
    question = data["question"]

    # Prompt for Gemini
    prompt = f"""
    Convert this question into SQL query.

    Table name: sales_data
    Columns: month, region, product, revenue

    Question: {question}
    """

    response = model.generate_content(prompt)

    sql_query = response.text.strip()

    try:
        conn = sqlite3.connect("sales.db")
        cursor = conn.cursor()

        cursor.execute(sql_query)

        result = cursor.fetchall()

        conn.close()

        return jsonify({
            "query": sql_query,
            "answer": result
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        })


if __name__ == "__main__":
    app.run(debug=True)
