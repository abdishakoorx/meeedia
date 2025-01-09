interface FormData {
  title: string;
  purpose: string;
  tone: string;
  targetAudience: string;
  duration: number;
  style: string;
  // colorPreference: string;
  // additionalNotes: string;
  aspectRatio: string;
}

// Constants
const PATTERN_OPTIONS = [
  'none', 'dots', 'lines', 'grid', 'diagonalLines', 'waves', 'zigzag', 
  'stripes', 'checkerboard', 'triangles', 'crosshatch', 'plaid', 
  'diagonalStripesWide', 'concentricCircles', 'spiral', 'starburst', 
  'brushedMetal', 'lattice'
];

const GRADIENT_OPTIONS = [
  'sunset', 'ocean', 'forest', 'purpleHaze', 'desert', 'northernLights',
  'fire', 'coolBlues', 'lavenderDream', 'peachMelba', 'aquaSplash',
  'citrusBurst', 'berrySmoothie', 'mistyRose', 'emeraldGlow', 'goldenHour',
  'royalFlush', 'candyShop', 'galaxy', 'deepSpace', 'iceberg', 'midnightCity',
  'pinkLemonade', 'blueLagoon', 'velvet', 'sunriseGlow', 'arcticDawn',
  'seaBreeze', 'tropicalSunset', 'mocha', 'neonDreams', 'frostedGlass',
  'auroraBorealis', 'goldenSand', 'peacock', 'cobaltDreams', 'citrusGrove',
  'berryDelight', 'rainforest', 'etherealGlow', 'roseGold'
];

const ANIMATION_OPTIONS = [
  'none', 'fadeIn', 'slideUp', 'slideDown', 'slideLeft', 'slideRight',
  'scaleUp', 'scaleDown', 'rotateIn', 'bounceIn', 'flipIn', 'popIn'
];

const AUDIO_OPTIONS = [
  'none', 'siren', 'choir', 'swoosh', 'impact', 'laugh', 'horses',
  'pulse', 'wind', 'applause', 'stadium', 'guitar'
];

export function generateAIPrompt(formData: FormData): string {
  return `Create a video with the following specifications:
   
    Purpose: Create a ${formData.duration}-second ${formData.purpose} video that captures attention and delivers impact.
   
    Core Elements:
    - Title: "${formData.title}"
    - Target Audience: ${formData.targetAudience}
    - Tone: ${formData.tone}
    - Visual Style: ${formData.style}
    
   
    Available Options:
    1. Patterns (use only these values for pattern property):
    ${PATTERN_OPTIONS.map(pattern => `   - ${pattern}`).join('\n')}
    
    2. Gradients (use only these values for gradient property):
    ${GRADIENT_OPTIONS.map(gradient => `   - ${gradient}`).join('\n')}
    
    3. Animations (use only these values for animation property):
    ${ANIMATION_OPTIONS.map(animation => `   - ${animation}`).join('\n')}
    
    4. Audio Tracks (use only these values for audioTrack property):
    ${AUDIO_OPTIONS.map(audio => `   - /videos/${audio}.mp3`).join('\n')}
   
    Required Output:
    Generate a JSON structure for a video with the following characteristics:
    1. Create frames that tell a coherent story
    2. Each frame should have:
         - Impactful text that progresses the message
         - Appropriate animations (choose from the animation options provided)
         - Color combinations that reflect the brand/message
         - Font choices that match the tone (${formData.tone})
         - Background styling using only the provided patterns and gradients
         - Appropriate timing for text display and transitions
         - Use "/film.png" as the image for all frames
   
    Specific Requirements:
    1. Text:
         - Keep text concise and impactful
         - Vary font sizes based on importance (range: 40-120px)
         - Use appropriate text casing for emphasis
         - Ensure readability with contrasting colors
   
    2. Visual Elements:
         - Select pattern/gradient from the provided options only
         - Maintain visual hierarchy
         - Use animations from the provided list only
         - Consider the flow between frames
         - All frames must use "/film.png" as the image
   
    3. Timing:
         - Total duration: ${formData.duration} seconds
         - Distribute time appropriately between frames
         - Account for reading time and visual impact
         - Set appropriate animation delays
   
       
    Output Format:
    Provide a complete JSON structure following this schema, ensuring that:
    1. Every frame's "image" property is set to "/film.png"
    2. The "pattern" property uses only values from the provided pattern options
    3. The "gradient" property uses only values from the provided gradient options
    4. The "animation" property uses only values from the provided animation options
    5. The "audioTrack" property uses only values from the provided audio options
    
    {
        "frames": [
            {
                "text": string,
                "image": "/film.png",
                "isBold": boolean,
                "pattern": string,  // Use only from provided pattern options
                "duration": number,
                "fontSize": string,
                "gradient": string,  // Use only from provided gradient options
                "isItalic": boolean,
                "animation": string,  // Use only from provided animation options
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
        "audioTrack": string,  // Use only from provided audio options
        "aspectRatio": string,
        "totalDuration": number
    }
   
    Ensure each property is optimized for maximum impact and viewer engagement while maintaining professional quality and coherence with the specified purpose and tone. Remember to use only the provided options for patterns, gradients, animations, and audio tracks.`;
}