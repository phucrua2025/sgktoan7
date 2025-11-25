import { GoogleGenAI } from "@google/genai";
import { Lesson, ChatMessage } from "../types";

// Initialize the API client
// Use GEMINI_API_KEY from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const sendMessageToGemini = async (
  messages: ChatMessage[],
  currentLesson: Lesson | null
): Promise<string> => {
  try {
    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not set");
      return "Xin lỗi, API key chưa được cấu hình. Vui lòng liên hệ quản trị viên.";
    }

    // Construct lesson context
    let contextStr = "Bạn là gia sư toán học lớp 7, hỗ trợ học sinh học bộ sách Chân Trời Sáng Tạo.";
    
    contextStr += "\n\nQUY ĐỊNH ĐỊNH DẠNG (QUAN TRỌNG):";
    contextStr += "\n- Mọi công thức toán học, số học, phân số, biến số (x, y, z...) BẮT BUỘC phải viết dưới dạng LaTeX và đặt trong cặp dấu $";
    contextStr += "\n- Ví dụ đúng: $x^2 + 2x + 1 = 0$, $\\frac{1}{2}$, $x \\in \\mathbb{Z}$.";
    contextStr += "\n- Ví dụ sai: x^2, 1/2, x thuộc Z.";
    contextStr += "\n- Trình bày lời giải rõ ràng, từng bước.";

    if (currentLesson) {
      contextStr += `\n\nThông tin bài học hiện tại đang xem:\n`;
      contextStr += `Tên bài: ${currentLesson.title}\n`;
      contextStr += `Kiến thức trọng tâm:\n- ${currentLesson.summary.join("\n- ")}\n`;
      
      if (currentLesson.examples && currentLesson.examples.length > 0) {
        contextStr += `\nVí dụ mẫu đã học:\n${currentLesson.examples.map(e => `- ${e.title}: ${e.content} (Giải: ${e.explanation})`).join("\n")}\n`;
      }

      contextStr += `\nBài tập luyện tập (kèm lời giải):\n${currentLesson.exercises.map(e => `Hỏi: ${e.question} -> Đáp: ${e.solution}`).join("\n")}\n`;
    }
    contextStr += "\n\nHãy trả lời câu hỏi của học sinh dựa trên ngữ cảnh này. Giải thích dễ hiểu, từng bước. Nếu học sinh hỏi đáp án bài tập, hãy gợi ý cách làm trước khi đưa ra kết quả.";

    // Configure the chat
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: contextStr,
      },
      history: messages.slice(0, -1).map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const lastMessage = messages[messages.length - 1];
    
    const response = await chat.sendMessage({
      message: lastMessage.text
    });

    return response.text;

  } catch (error) {
    console.error("Gemini API Error:", error);
    
    // More specific error messages
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return "Xin lỗi, API key không hợp lệ. Vui lòng kiểm tra cấu hình.";
      }
      if (error.message.includes('quota')) {
        return "Xin lỗi, đã vượt quá giới hạn sử dụng API. Vui lòng thử lại sau.";
      }
    }
    
    return "Xin lỗi, hiện tại tôi không thể trả lời. Vui lòng kiểm tra kết nối hoặc thử lại sau.";
  }
};
