import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("API key is not defined");
}
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1.15,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: '{\n  "frames": [\n    {\n      "text": "Bye bye 2024👋 ",\n      "image": "/film.png",\n      "isBold": true,\n      "pattern": "stripes",\n      "duration": 1.5,\n      "fontSize": "94",\n      "gradient": "",\n      "isItalic": false,\n      "animation": "slideDown",\n      "textAlign": "center",\n      "textColor": "#55bb00",\n      "fontFamily": "Abril Fatface",\n      "textCasing": "uppercase",\n      "isUnderline": false,\n      "animationDelay": 1.2,\n      "backgroundType": "pattern",\n      "backgroundColor": "#dc0000"\n    },\n    {\n      "text": "Welcome 2025 🎉🧉",\n      "image": "/film.png",\n      "isBold": false,\n      "pattern": "",\n      "duration": 1.5,\n      "fontSize": "120",\n      "gradient": "lavenderDream",\n      "isItalic": false,\n      "animation": "popIn",\n      "textAlign": "left",\n      "textColor": "#dcd005",\n      "fontFamily": "Oswald",\n      "textCasing": "uppercase",\n      "isUnderline": false,\n      "animationDelay": 0,\n      "backgroundType": "gradient",\n      "backgroundColor": "gray"\n    }\n  ],\n  "audioTrack": "impact",\n  "aspectRatio": "16:9",\n  "totalDuration": 3\n}\nCreate a video with the following specifications:\n1. Create frames that tell a coherent story\n2. Each frame should have:\n   - Impactful text that progresses the message\n   - Appropriate animations that enhance viewer engagement\n   - Color combinations that reflect the brand/message\n   - Font choices that match the tone (${formData.tone})\n   - Background styling that complements the overall theme\n   - Appropriate timing for text display and transitions\n\nSpecific Requirements:\n1. Text:\n   - Keep text concise and impactful\n   - Vary font sizes based on importance (range: 40-120px)\n   - Use appropriate text casing for emphasis\n   - Ensure readability with contrasting colors\n\n2. Visual Elements:\n   - Select appropriate patterns or gradients that match ${formData.style} style\n   - Maintain visual hierarchy\n   - Use animations that enhance rather than distract\n   - Consider the flow between frames\n\n3. Timing:\n   - Total duration: ${formData.duration} seconds\n   - Distribute time appropriately between frames\n   - Account for reading time and visual impact\n   - Set appropriate animation delays\n\nOutput Format:\nProvide a complete JSON structure following this schema:\n{\n  "frames": [\n    {\n      "text": string,\n      "image": string,\n      "isBold": boolean,\n      "pattern": string,\n      "duration": number,\n      "fontSize": string,\n      "gradient": string,\n      "isItalic": boolean,\n      "animation": string,\n      "textAlign": string,\n      "textColor": string,\n      "fontFamily": string,\n      "textCasing": string,\n      "isUnderline": boolean,\n      "animationDelay": number,\n      "backgroundType": string,\n      "backgroundColor": string\n    }\n  ],\n  "audioTrack": string,\n  "aspectRatio": string,\n  "totalDuration": number\n}\n',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "frames": [\n    {\n      "text": "2024 Fades...",\n      "image": null,\n      "isBold": true,\n      "pattern": "dots",\n      "duration": 1,\n      "fontSize": "80",\n      "gradient": "",\n      "isItalic": false,\n      "animation": "fadeOut",\n      "textAlign": "center",\n      "textColor": "#ffffff",\n      "fontFamily": "Oswald",\n      "textCasing": "uppercase",\n      "isUnderline": false,\n      "animationDelay": 0,\n      "backgroundType": "pattern",\n      "backgroundColor": "#333333"\n    },\n    {\n      "text": "Hello",\n      "image": null,\n      "isBold": false,\n       "pattern": "",\n      "duration": 0.8,\n      "fontSize": "100",\n      "gradient": "sunsetOrange",\n      "isItalic": false,\n      "animation": "slideLeft",\n      "textAlign": "right",\n      "textColor": "#222222",\n      "fontFamily": "Abril Fatface",\n       "textCasing": "normalcase",\n      "isUnderline": false,\n       "animationDelay": 0.2,\n      "backgroundType": "gradient",\n      "backgroundColor": "lightblue"\n\n    },\n    {\n      "text": "2025!",\n      "image": null,\n      "isBold": true,\n      "pattern": "",\n      "duration": 1.2,\n      "fontSize": "120",\n      "gradient": "lavenderDream",\n      "isItalic": false,\n      "animation": "popIn",\n      "textAlign": "center",\n      "textColor": "#dcd005",\n      "fontFamily": "Oswald",\n      "textCasing": "uppercase",\n      "isUnderline": false,\n      "animationDelay": 0,\n      "backgroundType": "gradient",\n      "backgroundColor": "#222222"\n    }\n   ],\n  "audioTrack": "upbeat",\n  "aspectRatio": "16:9",\n  "totalDuration": 3\n}\n```\n',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
