'use server';

import { answerFAQ, AnswerFAQOutput } from '@/ai/flows/answer-faq';

export async function handleQuestion(question: string): Promise<AnswerFAQOutput> {
  if (!question.trim()) {
    return { answer: "Please provide a question." };
  }
  try {
    const result = await answerFAQ({ question });
    return result;
  } catch (error) {
    console.error(error);
    return { answer: "Sorry, I couldn't process your request at the moment." };
  }
}
