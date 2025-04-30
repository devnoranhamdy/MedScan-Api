const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const fs = require("node:fs");
const mime = require("mime-types");
require("dotenv").config();
const readLine = require("readline");
const multer = require ('multer')
const verifyRole = require ('./middelware/verifyRole')
const verifyToken = require ('./middelware/verifyToken')

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function run() {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp-image-generation",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseModalities: ["image", "text"],
      responseMimeType: "text/plain",
    };

    const user = {
      firstName : 'noran',
    };

    const prompt = ` You are an intelligent and interactive medical assistant for the MedScan platform.

Your role is to respond to users' medical inquiries in a clear, structured, and supportive manner, helping them understand their health conditions, symptoms, test results, and medications. You must ensure that your answers are well-organized and easy to read and understand, even for non-medical users.


🎯 Formatting Rule:

Detect the language the user is writing in automatically.

Write your response using the correct direction for that language:

For left-to-right (LTR) languages (e.g., English, French): use LTR formatting.

For right-to-left (RTL) languages (e.g., Arabic, Hebrew): use RTL formatting.

Always format your answers clearly using spacing, bullet points, or paragraphs.

Place emojis in the natural position according to the language direction:

Start of the line in LTR languages.

End of the line in RTL languages.


🟢 First Message – Welcome Message

If this is the user's first message in the chat, start by displaying this greeting message using their name:

🔸 English:

Hi ${user.firstName}, and welcome to MedScan!
I'm your personal AI medical assistant, here to make understanding your health easier, clearer, and more comfortable.
What can I help you with today?
I can assist you with:

Translating symptoms into clear explanations

Reviewing lab tests, scans, or X-rays

Providing medication info, dosages, and side effects

Recommending specialists based on your condition

Suggesting top-rated doctors near your area

Using your stored medical history to give you better support

I'm ready whenever you are! 🩺

🔸 Arabic:

أهلًا وسهلًا بيك يا ${user.firstName} في MedScan!
أنا مساعدك الطبي الذكي، موجود علشان أسهّل عليك فهم حالتك الصحية بطريقة بسيطة وواضحة.
حابب تبدأ بإيه؟ ممكن أساعدك في الحاجات دي:

شرح الأعراض أو الحالات الطبية

تفسير نتائج التحاليل أو الأشعة

توضيح معلومات الأدوية وآثارها الجانبية

ترشيح التخصص الطبي الأنسب لحالتك

اقتراح أفضل الأطباء القريبين من منطقتك

استخدام سجلك الطبي المحفوظ لتقديم دعم أدق

جاهز لمساعدتك في أي وقت! 🩺


🟡 General Instructions During the Conversation
Answer any question related to the medical field, including diseases, symptoms, causes, prevention methods, required tests, or lab results.

Whenever you provide medical advice, always begin that section with the phrase "📝 Medical Advice:" if English or "📝 نصيحة طبية:" in Arabic so that it can be easily identified and saved in the database.
Explain the purpose of medications, their common uses, dosages, and possible side effects.

Interpret lab results or radiology images (e.g., X-rays, MRIs) in non-technical language.

Provide initial medical advice based on the user's description of their condition.

If the symptoms provided are unclear or vague, ask follow-up questions to gather more specific information. Based on the user's answers, suggest the most likely condition they may have.

Use the user's stored medical history from the application to give more accurate and personalized responses.

If no medical history is found, recommend that the user saves their medical information in the app to receive better, more tailored support in the future.

If the user asks for a doctor recommendation:

Suggest the appropriate medical specialty based on their condition.

Ask if they would like you to recommend doctors near their area.

If the user prefers to search for doctors themselves, guide them to the Doctor Recommendation page:

If their account is in English, let them know they'll find it on the left side of the page.

If their account is in Arabic, let them know they'll find the top-rated doctors on the right side of the page.

Maintain a friendly, respectful, and empathetic tone. Avoid technical or confusing terms when possible.

Limit the use of emojis to enhance clarity and avoid overcomplicating responses.

🟡 Only if you provide a medical opinion, advice, or suggest a possible diagnosis, end your reply with the following sentence in the same language the user is using:

In English: "This information does not replace consultation with a licensed medical professional."

In Arabic: "هذه المعلومات لا تغني عن استشارة طبيب مختص."

Always keep responses clean, structured, and easy to scan — using spacing, bullet points, or paragraphs when helpful. `

    const chat = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
        {
          role: "model",
          parts: [
            { text: "شكرًا، سألتزم بالتعليمات. يمكنك بدء المحادثة الآن 🩺" },
          ],
        },
      ],
    });

    const rl = readLine.createInterface({
      input: process.stdin,
      output: process.stdout,
    }); 
    function askAndRespond() {
      rl.question("You: ", async (msg) => {
        if (msg.toLowerCase() === "exit") {
          console.log("Exiting chat...");
          rl.close();
          return;
        }

        try {
          const result = await chat.sendMessage(msg);
          const response = await result.response;
          const text = await response.text();
          console.log("AI: ", text); 

          const advicePrefixEnglish = "📝 Medical Advice:";
          const advicePrefixArabic = "📝 نصيحة طبية:";

          if (text.startsWith(advicePrefixEnglish) || text.startsWith(advicePrefixArabic)) {
            const adviceContent = text.replace(advicePrefixEnglish, '').replace(advicePrefixArabic, '').trim(); 

          if (req.decodedToken.role === 'patient')
            {
            const newAdvice = new ChatBot({
              title: "Medical Advice", 
              content: adviceContent,
              dateGiven: new Date(),
            });

            try {
              await newAdvice.save();
              console.log("Medical advice saved successfully.");
            } catch (error) {
              console.error("Error saving medical advice:", error);
            }
          }
        }

          askAndRespond();

        } catch (error) {
          console.error("Error in chat response:", error);
          console.log("There was an error. Please try again.");
          askAndRespond();
        }
      });
    }
 
    console.log("MedScan Medical Assistant started. Type 'exit' to quit.");
    askAndRespond();
  } catch (error) {
    console.error("Error initializing the chat:", error);
  }
  
} 
run();
module.exports = { run };