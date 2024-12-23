"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "../../_components/HeaderNameProvider";
import FrameList from "./_components/FrameList";
import RemotePlayer from "./_components/RemotionPlayer";
import EditingField from "./_components/EditingField";

export default function Editor() {

  return (
    <div className="space-y-2">
      <Header headerName="Editor" />
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        <div className="mb-6 flex items-end">
          <Button className="ml-auto w-full sm:w-auto text-white">
            <Download className="w-5 h-5 mr-2" />
            Export
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 h-auto md:h-[calc(100vh-12rem)]">
          {/* Frames */}
          <FrameList />

          {/* Video Player */}
          <div className="md:col-span-7 space-y-4">
            <RemotePlayer />
          </div>

          {/* Video Editing Fields */}
          <div className="md:col-span-3">
            <EditingField />
          </div>
        </div>
      </div>
    </div>
  );
}
