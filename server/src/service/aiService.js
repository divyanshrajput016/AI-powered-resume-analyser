const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
});

const geminiResponseSchema = {
  type: "object",
  properties: {
    role: { type: "string", description: "The target job role extracted from the job description, e.g., 'Full Stack Developer'" },
    matchScore: { type: "number" },

    technicalQuestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          intention: { type: "string" },
          expectedAnswer: { type: "string" }
        },
        required: ["question", "intention", "expectedAnswer"]
      }
    },

    behavioralQuestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          intention: { type: "string" },
          expectedAnswer: { type: "string" }
        },
        required: ["question", "intention", "expectedAnswer"]
      }
    },

    skillGaps: {
      type: "array",
      items: {
        type: "object",
        properties: {
          skill: { type: "string" },
          severity: {
            type: "string",
            enum: ["low", "medium", "high"]
          }
        },
        required: ["skill", "severity"]
      }
    },

    preparationPlan: {
      type: "array",
      items: {
        type: "object",
        properties: {
          day: { type: "number" },
          focusArea: { type: "string" },
          tasks: {
            type: "array",
            items: { type: "string" }
          }
        },
        required: ["day", "focusArea", "tasks"]
      }
    }
  },
  required: [
    "role",
    "matchScore",
    "technicalQuestions",
    "behavioralQuestions",
    "skillGaps",
    "preparationPlan"
  ]
};

async function generateResumeReport({resumeDescriptionData , selfDescriptionData , jobDescriptionData}) {

    const prompt = `You are an expert technical interviewer.

Generate an interview report with the following details :
make sure the response is in json format and follow the schema strictly.
    Resume: ${resumeDescriptionData}
    selfDescription: ${selfDescriptionData}
    jobDescription: ${jobDescriptionData}
    `

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: geminiResponseSchema

        }
    })

    console.log(JSON.stringify(JSON.parse(response.text), null, 2));

    const parsed = JSON.parse(response.text);

    return parsed; 

}

module.exports = generateResumeReport