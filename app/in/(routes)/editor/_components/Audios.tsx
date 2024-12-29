import { Music } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const audioFiles = {
  none: "",
  siren: "/videos/siren.mp3",
  choir: "/videos/choir.mp3",
  swoosh: "/videos/swoosh.mp3",
  impact: "/videos/impact.mp3",
  laugh: "/videos/laugh.mp3",
  horses: "/videos/horses.mp3",
  pulse: "/videos/pulse.mp3",
  wind: "/videos/wind.mp3",
  applause: "/videos/applause.mp3",
  stadium: "/videos/stadium.mp3",
  guitar: "/videos/guitar.mp3",
};

type AudioType = keyof typeof audioFiles;

interface AudioSelectorProps {
  value: AudioType;
  onValueChange: (value: AudioType) => void;
}

const AudioSelector = ({ value, onValueChange }: AudioSelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      <Music className="w-5 h-5" />
      <Select value={value} onValueChange={(value) => onValueChange(value as AudioType)}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Select Audio" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(audioFiles).map((audio) => (
            <SelectItem key={audio} value={audio}>
              {audio.charAt(0).toUpperCase() + audio.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AudioSelector;