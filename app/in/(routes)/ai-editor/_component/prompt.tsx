interface FormData {
  title: string;
  purpose: string;
  tone: string;
  targetAudience: string;
  duration: number;
  style: string;
  colorPreference: string;
  additionalNotes: string;
  aspectRatio: string;
}

export function generateAIPrompt(formData: FormData): string {
  return `Create a video with the following specifications:
    
    Purpose: Create a ${formData.duration}-second ${
    formData.purpose
  } video that captures attention and delivers impact.
    
    Core Elements:
    - Title: "${formData.title}"
    - Target Audience: ${formData.targetAudience}
    - Tone: ${formData.tone}
    - Visual Style: ${formData.style}
    - Color Scheme: ${
      formData.colorPreference ||
      "Use appropriate colors that match the tone and purpose"
    }
    
    Required Output:
    Generate a JSON structure for a video with the following characteristics:
    1. Create frames that tell a coherent story
    2. Each frame should have:
         - Impactful text that progresses the message
         - Appropriate animations that enhance viewer engagement
         - Color combinations that reflect the brand/message
         - Font choices that match the tone (${formData.tone})
         - Background styling that complements the overall theme
         - Appropriate timing for text display and transitions
    
    Specific Requirements:
    1. Text:
         - Keep text concise and impactful
         - Vary font sizes based on importance (range: 40-120px)
         - Use appropriate text casing for emphasis
         - Ensure readability with contrasting colors
    
    2. Visual Elements:
         - Select appropriate patterns or gradients that match ${
           formData.style
         } style
         - Maintain visual hierarchy
         - Use animations that enhance rather than distract
         - Consider the flow between frames
    
    3. Timing:
         - Total duration: ${formData.duration} seconds
         - Distribute time appropriately between frames
         - Account for reading time and visual impact
         - Set appropriate animation delays
    
    Additional Context:
    ${formData.additionalNotes}
    
    Output Format:
    Provide a complete JSON structure following this schema:
    {
        "frames": [
            {
                "text": string,
                "image": string,
                "isBold": boolean,
                "pattern": string,
                "duration": number,
                "fontSize": string,
                "gradient": string,
                "isItalic": boolean,
                "animation": string,
                "textAlign": string,
                "textColor": string,
                "fontFamily": string,
                "textCasing": string,
                "isUnderline": boolean,
                "animationDelay": number,
                "backgroundType": string,
                "backgroundColor": string
            }
        ],
        "audioTrack": string,
        "aspectRatio": string,
        "totalDuration": number
    }
    
    Ensure each property is optimized for maximum impact and viewer engagement while maintaining professional quality and coherence with the specified purpose and tone.`;
}
