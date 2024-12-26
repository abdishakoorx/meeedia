"use client";
import { Download, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "../../_components/HeaderNameProvider";
import FrameList from "./_components/FrameList";
import RemotePlayer from "./_components/RemotionPlayer";
import EditingField from "./_components/EditingField";
import { useCallback, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";

export default function ScratchEditor() {
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useUser();

  const handleSave = useCallback(async () => {
    try {
      if (!user?.primaryEmailAddress?.emailAddress) {
        toast.error('Email not Found')
        return;
      }

      setIsSaving(true);
      const videoData = {
        video_id: uuidv4(),
        user_email: user.emailAddresses[0].emailAddress
      };

      const response = await fetch('/api/video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(videoData),
      });

      if (!response.ok) {
        throw new Error('Failed to save video');
      }
      
      toast.success('Video saved Successfully')
      
    } catch (error) {
      console.error('Error saving video:', error);
      toast.error('Failed to save video')
    } finally {
      setIsSaving(false);
    }
  }, [user]);

  return (
    <div className="space-y-2">
      <Header headerName="Scratch Editor" />
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-4">
        <div className="mb-6 flex justify-end">
          <div className="w-full md:w-1/4 flex gap-2">
            <Button className="w-1/2 text-white bg-blue-500 hover:bg-blue-700">
              <Download className="w-5 h-5 mr-2" />
              Export
            </Button>
            <Button
              variant={"outline"}
              className="w-1/2 bg-white text-black border border-gray-300 hover:bg-gray-100"
              onClick={handleSave}
              disabled={isSaving || !user}
            >
              <Save className="w-5 h-5 mr-2" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 h-auto md:h-[calc(100vh-12rem)]">
          <FrameList />
          <div className="md:col-span-7 space-y-4">
            <RemotePlayer />
          </div>
          <div className="md:col-span-3">
            <EditingField />
          </div>
        </div>
      </div>
    </div>
  );
}