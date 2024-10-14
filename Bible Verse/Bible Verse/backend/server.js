const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// API route to fetch random verse
app.get("/api/random-verse", async (req, res) => {
  try {
    const response = await fetch(
      "https://labs.bible.org/api/?passage=random&type=json&formatting=plain",
      {
        headers: {
            "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      // const errorDetails = await response.text();
      // console.error(
      //   "Failed to fetch data from external API:",
      //   response.status,
      //   errorDetails
      // );
      throw new Error("Failed to fetch data from external API");
    }

    const data = await response.json();
    console.log(data);
    res.json({
      bookname: data[0].bookname,
      chapter: data[0].chapter,
      verse: data[0].verse,
      text: data[0].text,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API route to fetch specific verse
app.get("/api/specific-verse", async (req, res) => {
  const { passage } = req.query;
  if (!passage) {
    return res
      .status(400)
      .json({ error: "Passage query parameter is required" });
  }

  try {
    const response = await fetch(
      `https://labs.bible.org/api/?passage=${encodeURIComponent(
        passage
      )}&type=json&formatting=plain`,
      {
        headers: {
            "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data from external API");
    }
    const data = await response.json();
    res.json({
      bookname: data[0].bookname,
      chapter: data[0].chapter,
      verse: data[0].verse,
      text: data[0].text,
    });
  } catch (error) {
    console.error("Error fetching specific verse:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
