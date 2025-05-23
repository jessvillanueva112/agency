export async function documentNote(input: string, context: any) {
  // Mock: Convert input to formatted record
  return {
    formatted: `Student: ${context.studentName}\nNote: ${input}\nDate: ${new Date().toISOString()}`,
  };
} 