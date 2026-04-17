import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  
  try {
    const { image } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // This is the "Architect" logic we built
    const prompt = "Analyze this face for male aesthetics. Be brutal and clinical. Give a rating 1-10 and 3 grooming tasks.";
    
    const result = await model.generateContent([
      prompt,
      { inlineData: { data: image, mimeType: "image/jpeg" } }
    ]);

    const response = await result.response;
    res.status(200).json(JSON.parse(response.text()));
  } catch (error) {
    res.status(500).json({ error: "Architect failed to connect." });
  }
}
