import { GoogleGenAI } from "@google/genai";

// Safely get API key to avoid "process is not defined" error in browser environments
const getApiKey = (): string => {
  try {
    // Check if process is defined (Node.js/Polyfilled) and has env
    if (typeof process !== 'undefined' && process.env) {
      return process.env.API_KEY || '';
    }
    return '';
  } catch (e) {
    return '';
  }
};

// Initialize Gemini Client
// We use a fallback empty string to prevent the constructor from crashing immediately on load.
// Actual API calls will simply fail gracefully if the key is missing.
const ai = new GoogleGenAI({ apiKey: getApiKey() });

interface GeneratedContent {
  content: string;
  excerpt: string;
  tags: string[];
  seoKeywords: string[];
  imagePrompt: string;
}

export const generateBlogContent = async (topic: string, tone: string = 'professional'): Promise<GeneratedContent> => {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      throw new Error("API Key is missing. Cannot generate content.");
    }

    const prompt = `
      Act as an expert SEO Content Writer and Journalist.
      Topic: "${topic}"
      Tone: ${tone}

      Tasks:
      1. Perform keyword research (simulate Google Trends/Analytics data) for this topic.
      2. Write a comprehensive, high-quality, engaging blog post formatted in HTML (use <h2>, <h3>, <p>, <ul>, <li>, <strong>).
      3. Create a short excerpt (meta description).
      4. Suggest 5-7 relevant tags.
      5. Generate a detailed English text prompt to create a high-quality, photorealistic AI image representing this article.

      Return the response in JSON format with the following schema:
      {
        "content": "HTML string of the blog body",
        "excerpt": "Short summary",
        "tags": ["tag1", "tag2"],
        "seoKeywords": ["keyword1", "keyword2"],
        "imagePrompt": "Detailed description of the image"
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as GeneratedContent;
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Return a graceful fallback so the editor doesn't crash
    return {
      content: "<p><strong>AI Generation Unavailable:</strong> Could not generate content at this time. Please check your API configuration or try again later.</p>",
      excerpt: "Content generation failed.",
      tags: ["Error"],
      seoKeywords: [],
      imagePrompt: "An abstract representation of a temporary system error, minimalist style"
    };
  }
};

export const suggestTags = async (content: string): Promise<string[]> => {
  try {
    const apiKey = getApiKey();
    if (!apiKey) return ['General'];

    const prompt = `Read the following text and suggest 5 relevant tags for a blog post. Return only the tags as a comma-separated list. Text: ${content.substring(0, 500)}...`;
     const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    const text = response.text || "";
    return text.split(',').map(tag => tag.trim());
  } catch (error) {
    return ['General', 'News'];
  }
}