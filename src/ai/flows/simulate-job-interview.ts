'use server';

/**
 * @fileOverview A job interview simulation AI agent.
 *
 * - simulateJobInterview - A function that handles the job interview simulation process.
 * - SimulateJobInterviewInput - The input type for the simulateJobInterview function.
 * - SimulateJobInterviewOutput - The return type for the simulateJobInterview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimulateJobInterviewInputSchema = z.object({
  projectDescriptions: z
    .string()
    .describe('Detailed descriptions of the projects the user has worked on.'),
  userResume: z.string().describe('The user resume in text format.'),
  industryTrends: z
    .string()
    .optional()
    .describe('Optional: Information about current industry trends.'),
});
export type SimulateJobInterviewInput = z.infer<typeof SimulateJobInterviewInputSchema>;

const SimulateJobInterviewOutputSchema = z.object({
  interviewQuestion: z.string().describe('The generated interview question.'),
  context: z
    .string()
    .optional()
    .describe('Optional: Context or reasoning behind the generated question.'),
});
export type SimulateJobInterviewOutput = z.infer<typeof SimulateJobInterviewOutputSchema>;

export async function simulateJobInterview(
  input: SimulateJobInterviewInput
): Promise<SimulateJobInterviewOutput> {
  return simulateJobInterviewFlow(input);
}

const generateInterviewQuestionPrompt = ai.definePrompt({
  name: 'generateInterviewQuestionPrompt',
  input: {schema: SimulateJobInterviewInputSchema},
  output: {schema: SimulateJobInterviewOutputSchema},
  prompt: `You are an AI-powered job interview simulator. Your goal is to generate realistic and challenging interview questions based on the candidate's provided project descriptions and resume.

  Here's the candidate's resume:
  {{userResume}}

  Here are the candidate's project descriptions:
  {{projectDescriptions}}

  {{#if industryTrends}}
  Consider these current industry trends when formulating your questions:
  {{industryTrends}}
  {{/if}}

  Formulate one interview question that assesses the candidate's experience, skills, and understanding of the technologies used in their projects. Explain the context of your question and the desired information that the interviewer wants to extract from the candidate's response.

  If the candidate's project involved usage of external tools or APIs, feel free to ask questions to see if the user has a deep understanding of those tools.
  Be conversational and natural sounding.

  Return your response in JSON format.
  Example:
  {
    "interviewQuestion": "Can you describe a time when you had to overcome a significant technical challenge while working on the Semantic Layer Creation project, and what steps did you take to resolve it?",
    "context": "This question assesses the candidate's problem-solving skills and their ability to handle technical difficulties under pressure."
  }`,
});

const simulateJobInterviewFlow = ai.defineFlow(
  {
    name: 'simulateJobInterviewFlow',
    inputSchema: SimulateJobInterviewInputSchema,
    outputSchema: SimulateJobInterviewOutputSchema,
  },
  async input => {
    const {output} = await generateInterviewQuestionPrompt(input);
    return output!;
  }
);
