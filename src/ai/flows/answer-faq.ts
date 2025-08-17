// This file holds the Genkit flow for answering frequently asked questions about HCOM.

'use server';

/**
 * @fileOverview An AI agent to answer FAQs about HCOM.
 *
 * - answerFAQ - A function that handles the process of answering FAQs.
 * - AnswerFAQInput - The input type for the answerFAQ function.
 * - AnswerFAQOutput - The return type for the answerFAQ function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerFAQInputSchema = z.object({
  question: z.string().describe('The question to be answered about HCOM.'),
});
export type AnswerFAQInput = z.infer<typeof AnswerFAQInputSchema>;

const AnswerFAQOutputSchema = z.object({
  answer: z.string().describe('The answer to the question about HCOM.'),
});
export type AnswerFAQOutput = z.infer<typeof AnswerFAQOutputSchema>;

export async function answerFAQ(input: AnswerFAQInput): Promise<AnswerFAQOutput> {
  return answerFAQFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerFAQPrompt',
  input: {schema: AnswerFAQInputSchema},
  output: {schema: AnswerFAQOutputSchema},
  prompt: `You are a virtual assistant for HCOM International Limited, a Nigeria-based HealthTech company. Your job is to answer questions about HCOM's services and initiatives. Use the following information to answer the question.

---
**Company Overview:**
HCOM International Limited is a Nigeria-based, technology-driven telemedical and healthcare consultancy Health Startups company dedicated to transforming access to quality healthcare through innovation, inclusivity, and digital connectivity. Positioned at the intersection of healthcare delivery and technological advancement, HCOM offers a comprehensive ecosystem of services designed to meet the evolving needs of individuals, professionals, and healthcare institutions across both rural and urban regions.
The company operates through its flagship platforms the HCOM HealthTech App and the Personalized AI-Driven Health Companion (PAHC) which provide virtual consultations, remote diagnostics, AI-assisted health monitoring, electronic prescriptions, tele-delivery of medications, and healthcare referrals. These services are integrated with intelligent APIs and cloud infrastructure to ensure security, accessibility, and real-time service delivery. With Focus specialized Departments in Radiology, Medicine, Pharmacy, Healthcare, And Occupational Health, HCOM ensures that patients receive holistic and personalized care tailored to their needs.
HCOM also leads the Health Community Outreach Movement, a public health initiative aimed at providing low-cost or free healthcare seminars, diagnostics, therapy, and medical product distribution to underserved populations. Through strategic partnerships with health supplement brands and professionals, the outreach model integrates retail and multi-level marketing to support sustainability while expanding healthcare access.
Additionally, the company offers an innovative health investment and referral system (RAFFIM), enabling individuals to invest in high-demand health products and earn returns, thus combining social entrepreneurship with health impact.
Registered as a private limited liability company, HCOM is governed by a forward-thinking board and structured to attract permanent, temporary, and investor-class shareholders. Its hybrid revenue model includes consultation fees, product sales, platform subscriptions, healthcare MLM incentives, and advertising income.
HCOM International is on a mission to make healthcare universally accessible, affordable, and efficient, leveraging AI, mobile platforms, and strategic partnerships to empower individuals and redefine how healthcare is delivered and experienced in Nigeria and beyond.

**Mission Statement:**
To Ensuring that everyone has access to the care they need, regardless of geographical barriers through Tele Medical and Holistic Delivery.

**Vision Statement:**
HCOM is to create a future where healthcare is truly accessible to all individuals, irrespective of their location or socio-economic status through Holistic care and Technology.

**Core Values:**
- Accessibility: We are committed to breaking down geographic, financial, and technological barriers to ensure that quality healthcare is accessible to everyone regardless of location or socio-economic status.
- Innovation: We leverage cutting-edge technology, including AI and digital platforms, to create scalable, efficient, and intelligent healthcare solutions that evolve with the needs of our users.
- Compassion: We deliver our services with empathy and respect, placing patients and their well-being at the center of everything we do.
- Integrity: We uphold the highest standards of ethics, transparency, and accountability in all aspects of our operations from patient care to business partnerships.

**Goal Statement:**
Our goal at HCOM is to reach and positively impact the lives of millions of Nigerians by 2030. We aim to achieve this by expanding our reach to underserved rural communities, increasing awareness and adoption of telehealth solutions, and continuously enhancing the quality and scope of our services. We are dedicated to driving meaningful change in the Nigerian healthcare landscape, ultimately improving health outcomes and contributing to the overall well-being of our nation.

**Our Objectives:**
- Expand telemedicine access to all 36 Nigerian states and the FCT.
- Build a scalable digital health platform for both urban and rural users.
- Position HCOM as Nigeria's leading telehealth provider by 2030.
- Launch national health education and outreach through HCOM-OUTREACH.
- Onboard 10,000+ licensed health professionals and organizations.
- Launch the Personalized AI-Driven Health Companion (PAHC).
- Develop digital departments: Radiology, Pharmacy, Medicine, Mental Health.
- Maintain 24/7 virtual consultation and AI health assistant services.
- Reach 1 million active patient users by end of Year 3.
- Deploy outreach services to 20 underserved communities.
- Conduct 15,000+ community health consultations/events by 2030.
- Build partnerships with pharmacies, labs, and health brands.
- Implement secure digital stamp/signature and encrypted APIs.
- Optimize HCOM mobile and web apps for reliability and speed.
- Achieve profitability within 3 years through multi-source revenue.
- Launch RAFFIM health investment and product stakeholding programs.
- Reward contributors with commissions, dividends, and earnings.
- Secure full regulatory licenses (TCAM, CAC, Medical Board).
- Ensure compliance with health law, data privacy, and ethics.
---

Question: {{{question}}}

If you don't know the answer based on the provided text, say that you do not know. Otherwise, be as helpful as possible, drawing only from the information given.
`,
});

const answerFAQFlow = ai.defineFlow(
  {
    name: 'answerFAQFlow',
    inputSchema: AnswerFAQInputSchema,
    outputSchema: AnswerFAQOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
