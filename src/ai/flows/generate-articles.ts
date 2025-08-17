'use server';

/**
 * @fileOverview An AI agent to generate news articles about HCOM's initiatives.
 *
 * - generateArticles - A function that handles the process of generating articles.
 * - GenerateArticlesOutput - The return type for the generateArticles function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ArticleSchema = z.object({
  image: z.string().describe("A URL for a relevant image for the article. Use placehold.co for placeholders, e.g., https://placehold.co/800x450.png."),
  hint: z.string().describe("A one or two word hint for the image, for AI image generation services."),
  category: z.string().describe("The category of the article (e.g., Community Health, Technology)."),
  date: z.string().describe("The publication date of the article (e.g., October 26, 2023)."),
  title: z.string().describe("The title of the news article."),
  excerpt: z.string().describe("A short summary or excerpt of the article."),
  likes: z.number().describe("An estimated number of likes for the article."),
  dislikes: z.number().describe("An estimated number of dislikes for the article."),
  comments: z.number().describe("An estimated number of comments for the article."),
});

const GenerateArticlesOutputSchema = z.object({
  articles: z.array(ArticleSchema),
});
export type GenerateArticlesOutput = z.infer<typeof GenerateArticlesOutputSchema>;

export async function generateArticles(): Promise<GenerateArticlesOutput> {
  return generateArticlesFlow();
}

const prompt = ai.definePrompt({
  name: 'generateArticlesPrompt',
  output: {schema: GenerateArticlesOutputSchema},
  prompt: `You are a content creator for HCOM International Limited, a Nigeria-based HealthTech company. Your job is to generate two engaging news articles about HCOM's services and initiatives. Use the following company information for context.

---
**Company Overview:**
HCOM International Limited is a Nigeria-based, technology-driven telemedical and healthcare consultancy Health Startups company dedicated to transforming access to quality healthcare through innovation, inclusivity, and digital connectivity. Positioned at the intersection of healthcare delivery and technological advancement, HCOM offers a comprehensive ecosystem of services designed to meet the evolving needs of individuals, professionals, and healthcare institutions across both rural and urban regions.
The company operates through its flagship platforms the HCOM HealthTech App and the Personalized AI-Driven Health Companion (PAHC) which provide virtual consultations, remote diagnostics, AI-assisted health monitoring, electronic prescriptions, tele-delivery of medications, and healthcare referrals. These services are integrated with intelligent APIs and cloud infrastructure to ensure security, accessibility, and real-time service delivery. With Focus specialized Departments in Radiology, Medicine, Pharmacy, Healthcare, And Occupational Health, HCOM ensures that patients receive holistic and personalized care tailored to their needs.
HCOM also leads the Health Community Outreach Movement, a public health initiative aimed at providing low-cost or free healthcare seminars, diagnostics, therapy, and medical product distribution to underserved populations. Through strategic partnerships with health supplement brands and professionals, the outreach model integrates retail and multi-level marketing to support sustainability while expanding healthcare access.
Additionally, the company offers an innovative health investment and referral system (RAFFIM), enabling individuals to invest in high-demand health products and earn returns, thus combining social entrepreneurship with health impact.
---

Generate two distinct articles. One should focus on a community health initiative, and the other on a technology innovation. Make the titles and excerpts compelling. Provide reasonable estimates for likes, dislikes, and comments.`,
});

const generateArticlesFlow = ai.defineFlow(
  {
    name: 'generateArticlesFlow',
    outputSchema: GenerateArticlesOutputSchema,
  },
  async () => {
    const {output} = await prompt();
    return output!;
  }
);
