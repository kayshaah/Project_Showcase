'use server';

import {
  simulateJobInterview,
  SimulateJobInterviewInput,
} from '@/ai/flows/simulate-job-interview';
import { z } from 'zod';

const formSchema = z.object({
  projectDescriptions: z.string().min(50, 'Project descriptions are too short.'),
  userResume: z.string().min(50, 'Resume content is too short.'),
});

type FormState = {
  message: string;
  data?: {
    interviewQuestion: string;
    context?: string;
  };
  errors?: {
    projectDescriptions?: string[];
    userResume?: string[];
  };
};

export async function generateInterviewQuestionAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const rawFormData = {
        projectDescriptions: formData.get('projectDescriptions'),
        userResume: formData.get('userResume'),
    };
    
    const validatedFields = formSchema.safeParse(rawFormData);

    if (!validatedFields.success) {
      return {
        message: 'Invalid form data.',
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const result = await simulateJobInterview(
      validatedFields.data as SimulateJobInterviewInput
    );
    
    return {
      message: 'Success',
      data: result,
    };
  } catch (error) {
    console.error('Error in generateInterviewQuestionAction:', error);
    return {
      message: 'An unexpected error occurred while generating the question.',
    };
  }
}
