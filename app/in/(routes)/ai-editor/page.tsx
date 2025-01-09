"use client";

import React, { useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Header from "../../_components/HeaderNameProvider";
import { generateAIPrompt } from "./_component/prompt";
import { chatSession } from "@/Config/CreatePrompt";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UserDetails } from "@/app/_context/UserDetails";
import { z } from "zod";
import { CustomRadioButton } from "./_component/CustomRadioButton";

// Zod schema for form validation
const videoFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  purpose: z.enum(
    ["promotional", "educational", "entertainment", "announcement", "social"],
    {
      required_error: "Please select a purpose",
    }
  ),
  tone: z.enum(
    ["professional", "casual", "funny", "serious", "inspirational"],
    {
      required_error: "Please select a tone",
    }
  ),
  targetAudience: z.string().min(1, "Target audience is required"),
  duration: z.number().min(15).max(60),
  style: z.enum(["minimalist", "bold", "corporate", "playful", "elegant"], {
    required_error: "Please select a style",
  }),
  aspectRatio: z.string().default("16:9"),
});

type PurposeOption = {
  id: string;
  label: string;
  description: string;
  color: {
    bg: string;
    border: string;
    selectedBorder: string;
    selectedBg: string;
    text: string;
  };
};

const purposeOptions: PurposeOption[] = [
  {
    id: "promotional",
    label: "Marketing",
    description: "Craft content for promotions.",
    color: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      selectedBorder: "border-blue-500",
      selectedBg: "bg-blue-100",
      text: "text-blue-700",
    },
  },
  {
    id: "educational",
    label: "Educational",
    description: "Create content for learning.",
    color: {
      bg: "bg-green-50",
      border: "border-green-200",
      selectedBorder: "border-green-500",
      selectedBg: "bg-green-100",
      text: "text-green-700",
    },
  },
  {
    id: "entertainment",
    label: "Entertainment",
    description: "Make fun and engaging media.",
    color: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      selectedBorder: "border-purple-500",
      selectedBg: "bg-purple-100",
      text: "text-purple-700",
    },
  },
  {
    id: "announcement",
    label: "Announcement",
    description: "Share updates or news posts.",
    color: {
      bg: "bg-orange-50",
      border: "border-orange-200",
      selectedBorder: "border-orange-500",
      selectedBg: "bg-orange-100",
      text: "text-orange-700",
    },
  },
  {
    id: "social",
    label: "Social Media",
    description: "Design posts for social apps.",
    color: {
      bg: "bg-pink-50",
      border: "border-pink-200",
      selectedBorder: "border-pink-500",
      selectedBg: "bg-pink-100",
      text: "text-pink-700",
    },
  },
];

const toneOptions = [
  {
    id: "professional",
    label: "Professional",
    description: "Polished and business-like tone.",
    color: {
      bg: "bg-slate-50",
      border: "border-slate-200",
      selectedBorder: "border-slate-500",
      selectedBg: "bg-slate-100",
      text: "text-slate-700",
    },
  },
  {
    id: "casual",
    label: "Casual",
    description: "Friendly and informal messaging.",
    color: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      selectedBorder: "border-emerald-500",
      selectedBg: "bg-emerald-100",
      text: "text-emerald-700",
    },
  },
  {
    id: "funny",
    label: "Funny",
    description: "Humorous and lighthearted tone.",
    color: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      selectedBorder: "border-yellow-500",
      selectedBg: "bg-yellow-100",
      text: "text-yellow-700",
    },
  },
  {
    id: "serious",
    label: "Serious",
    description: "Focused and no-nonsense tone.",
    color: {
      bg: "bg-red-50",
      border: "border-red-200",
      selectedBorder: "border-red-500",
      selectedBg: "bg-red-100",
      text: "text-red-700",
    },
  },
  {
    id: "inspirational",
    label: "Inspirational",
    description: "Uplifting and highly motivating tone.",
    color: {
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      selectedBorder: "border-indigo-500",
      selectedBg: "bg-indigo-100",
      text: "text-indigo-700",
    },
  },
];


const styleOptions = [
  {
    id: "minimalist",
    label: "Minimalist",
    description: "Clean and simple design",
    color: {
      bg: "bg-zinc-50",
      border: "border-zinc-200",
      selectedBorder: "border-zinc-500",
      selectedBg: "bg-zinc-100",
      text: "text-zinc-700",
    },
  },
  {
    id: "bold",
    label: "Bold and Dynamic",
    description: "Strong and impactful visuals",
    color: {
      bg: "bg-rose-50",
      border: "border-rose-200",
      selectedBorder: "border-rose-500",
      selectedBg: "bg-rose-100",
      text: "text-rose-700",
    },
  },
  {
    id: "corporate",
    label: "Corporate",
    description: "Professional business style",
    color: {
      bg: "bg-sky-50",
      border: "border-sky-200",
      selectedBorder: "border-sky-500",
      selectedBg: "bg-sky-100",
      text: "text-sky-700",
    },
  },
  {
    id: "playful",
    label: "Playful",
    description: "Fun and engaging design",
    color: {
      bg: "bg-violet-50",
      border: "border-violet-200",
      selectedBorder: "border-violet-500",
      selectedBg: "bg-violet-100",
      text: "text-violet-700",
    },
  },
  {
    id: "elegant",
    label: "Elegant",
    description: "Sophisticated and refined",
    color: {
      bg: "bg-teal-50",
      border: "border-teal-200",
      selectedBorder: "border-teal-500",
      selectedBg: "bg-teal-100",
      text: "text-teal-700",
    },
  },
];

type VideoFormData = z.infer<typeof videoFormSchema>;

const AIVideoEditor = () => {
  const [formData, setFormData] = useState<VideoFormData>({
    title: "",
    purpose: "promotional",
    tone: "professional",
    targetAudience: "",
    duration: 30,
    style: "minimalist",
    aspectRatio: "16:9",
  });
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const { userDetails, setUserDetails } = useContext(UserDetails);

  const { user } = useUser();
  const router = useRouter();

  const validateForm = () => {
    try {
      videoFormSchema.parse(formData);
      setValidationErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            errors[err.path[0]] = err.message;
          }
        });
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setTokenError(null);

    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);

    try {
      if (!user?.primaryEmailAddress?.emailAddress) {
        throw new Error("Please sign in to generate and save your video");
      }

      if (!userDetails?.credits || userDetails.credits < 3) {
        setTokenError(
          "You need at least 3 tokens to generate a video. Please upgrade your plan."
        );
        return;
      }

      const prompt = generateAIPrompt(formData);
      const result = await chatSession.sendMessage(prompt);
      const response = await result.response.text();

      const jsonStr = response.replace(/```json\n?/, "").replace(/```\n?/, "");
      const videoData = JSON.parse(jsonStr);

      const saveData = {
        video_id: uuidv4(),
        user_email: user.primaryEmailAddress.emailAddress,
        video_type: "AI Generated",
        title: formData.title || "Untitled",
        description: {
          ...videoData,
          aspectRatio: formData.aspectRatio,
        },
      };

      const saveResponse = await fetch("/api/video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saveData),
      });

      const responseData = await saveResponse.json();

      if (!saveResponse.ok) {
        if (saveResponse.status === 403) {
          setTokenError(responseData.message);
          return;
        }
        throw new Error(responseData.message || "Failed to save video");
      }

      if (userDetails && setUserDetails) {
        setUserDetails({
          ...userDetails,
          credits: responseData.tokenBalance,
        });
      }

      toast.success("Video generated and saved successfully");
      router.push(`/in/ai-editor/${responseData.result.videoID}`);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while processing your request"
      );
      toast.error(
        error instanceof Error ? error.message : "Failed to process video"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleChange = (field: keyof VideoFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear validation error for the field being changed
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  return (
    <div className="min-h-screen">
      <Header headerName="AI Generator" />
      <div className="container mx-auto p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold font-heading text-center mb-6">
            Create Your AI Video
          </h1>
          <form onSubmit={handleSubmit} className="space-y-16">
            <div className="space-y-2">
              <Label htmlFor="title" className="font-sans text-base">
                Video Title
              </Label>
              <Input
                id="title"
                placeholder="Enter your video title"
                className="font-sans"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
              {validationErrors.title && (
                <p className="text-sm text-red-500">{validationErrors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose" className="font-sans text-base">
                What&apos;s the purpose of your video?
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {purposeOptions.map((option: PurposeOption) => (
                  <CustomRadioButton
                    key={option.id}
                    name="purpose"
                    option={option}
                    selected={formData.purpose}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("purpose", e.target.value)
                    }
                  />
                ))}
              </div>
              {validationErrors.purpose && (
                <p className="text-sm text-red-500">
                  {validationErrors.purpose}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone" className="font-sans text-base">
                Desired Tone
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {toneOptions.map((option) => (
                  <CustomRadioButton
                    key={option.id}
                    name="tone"
                    option={option}
                    selected={formData.tone}
                    onChange={(e) => handleChange("tone", e.target.value)}
                  />
                ))}
              </div>
              {validationErrors.tone && (
                <p className="text-sm text-red-500">{validationErrors.tone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetAudience" className="font-sans text-base">
                Target Audience
              </Label>
              <Input
                id="targetAudience"
                placeholder="Who is this video for?"
                className="font-sans"
                value={formData.targetAudience}
                onChange={(e) => handleChange("targetAudience", e.target.value)}
              />
              {validationErrors.targetAudience && (
                <p className="text-sm text-red-500">
                  {validationErrors.targetAudience}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration" className="font-sans text-base">
                Preferred Duration (seconds)
              </Label>
              <Slider
                id="duration"
                min={15}
                max={60}
                step={1}
                value={[formData.duration]}
                onValueChange={(value) => handleChange("duration", value[0])}
                className="w-full"
              />
              <div className="text-sm text-gray-500 text-right">
                {formData.duration} seconds
              </div>
              {validationErrors.duration && (
                <p className="text-sm text-red-500">
                  {validationErrors.duration}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="style" className="font-sans text-base">
                Visual Style Preference
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {styleOptions.map((option) => (
                  <CustomRadioButton
                    key={option.id}
                    name="style"
                    option={option}
                    selected={formData.style}
                    onChange={(e) => handleChange("style", e.target.value)}
                  />
                ))}
              </div>
              {validationErrors.style && (
                <p className="text-sm text-red-500">{validationErrors.style}</p>
              )}
            </div>

            {tokenError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Insufficient Tokens</AlertTitle>
                <AlertDescription>{tokenError}</AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full text-white font-mono"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Generate & Save Video"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIVideoEditor;
