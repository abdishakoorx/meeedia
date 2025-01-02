"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Header from "../../_components/HeaderNameProvider";
import { generateAIPrompt } from "./_component/prompt";
import { chatSession } from "@/Config/CreatePrompt";

const AIVideoEditor = () => {
  const [formData, setFormData] = useState({
    title: "",
    purpose: "",
    tone: "",
    targetAudience: "",
    duration: 30,
    style: "",
    colorPreference: "",
    additionalNotes: "",
    aspectRatio: "16:9",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsGenerating(true);
    setGenerationError(null);
    setGeneratedVideo(null);

    try {
      // Generate the prompt using the form data
      const prompt = generateAIPrompt(formData);
      
      // Send the prompt to Gemini
      const result = await chatSession.sendMessage(prompt);
      const response = await result.response.text();
      
      // Extract JSON from the response
      // The response might include ```json and ``` markers, so we need to clean it
      const jsonStr = response.replace(/```json\n?/, '').replace(/```\n?/, '');
      const videoData = JSON.parse(jsonStr);
      
      // Store the generated video data
      setGeneratedVideo(JSON.stringify(videoData, null, 2));
      console.log("Generated video data:", videoData);
      
    } catch (error) {
      console.error("Generation error:", error);
      setGenerationError(
        "An error occurred while generating the video. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      <Header headerName="AI Video Generator" />
      <div className="container mx-auto p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Create Your AI Video</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Video Title</Label>
                <Input
                  id="title"
                  placeholder="Enter your video title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">What&apos;s the purpose of your video?</Label>
                <Select
                  value={formData.purpose}
                  onValueChange={(value) => handleChange("purpose", value)}
                >
                  <SelectTrigger id="purpose">
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="promotional">Promotional/Marketing</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="announcement">Announcement</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Desired Tone</Label>
                <Select
                  value={formData.tone}
                  onValueChange={(value) => handleChange("tone", value)}
                >
                  <SelectTrigger id="tone">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="funny">Funny</SelectItem>
                    <SelectItem value="serious">Serious</SelectItem>
                    <SelectItem value="inspirational">Inspirational</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input
                  id="targetAudience"
                  placeholder="Who is this video for?"
                  value={formData.targetAudience}
                  onChange={(e) => handleChange("targetAudience", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Preferred Duration (seconds)</Label>
                <Slider
                  id="duration"
                  min={15}
                  max={60}
                  step={1}
                  value={[formData.duration]}
                  onValueChange={(value) => handleChange("duration", value[0])}
                  className="w-full"
                />
                <div className="text-sm text-gray-500 text-right">{formData.duration} seconds</div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="style">Visual Style Preference</Label>
                <Select
                  value={formData.style}
                  onValueChange={(value) => handleChange("style", value)}
                >
                  <SelectTrigger id="style">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                    <SelectItem value="bold">Bold and Dynamic</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                    <SelectItem value="playful">Playful</SelectItem>
                    <SelectItem value="elegant">Elegant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="colorPreference">Color Preference</Label>
                <Input
                  id="colorPreference"
                  placeholder="Any specific colors or color scheme?"
                  value={formData.colorPreference}
                  onChange={(e) => handleChange("colorPreference", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea
                  id="additionalNotes"
                  placeholder="Any specific requirements or preferences?"
                  value={formData.additionalNotes}
                  onChange={(e) => handleChange("additionalNotes", e.target.value)}
                  className="h-24"
                />
              </div>

              {generationError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{generationError}</AlertDescription>
                </Alert>
              )}

              {generatedVideo && (
                <div className="space-y-2">
                  <Label>Generated Video Data</Label>
                  <Textarea
                    value={generatedVideo}
                    readOnly
                    className="h-24"
                  />
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Video...
                  </>
                ) : (
                  "Generate Video"
                )}
              </Button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default AIVideoEditor;

