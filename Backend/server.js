import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config({ path: "./Backend/.env" });



const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Study Buddy Backend Running");
});

app.post("/api/ask", async (req, res) => {
  try {
    const { question } = req.body;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemma-3-27b-it",
        messages: [
          {
            role: "user",
            content: question
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({
      success: true,
      answer:
        response.data.choices[0].message.content
    });

  } catch (error) {

    console.error(error.response?.data || error.message);

    res.json({
      success: false,
      error:
        error.response?.data || error.message
    });

  }
});

app.listen(5000, () => {
  console.log("Server running on 5000");
});