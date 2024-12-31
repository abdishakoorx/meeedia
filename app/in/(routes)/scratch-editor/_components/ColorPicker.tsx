import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexColorInput, HexColorPicker } from "react-colorful";

export const ColorPickerPreview = ({
  color,
  label,
  onChange,
}: {
  color: string;
  label: string;
  onChange: (color: string) => void;
}) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="rounded-lg">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full h-10 p-0 relative overflow-hidden"
            >
              <div
                className="absolute inset-0"
                style={{ backgroundColor: color }}
              />
              <div className="relative w-full text-xs text-right pr-2 text-white">
                {color.toUpperCase()}
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3">
            <div className="space-y-3">
              <HexColorPicker color={color} onChange={onChange} />
              <div className="flex items-center space-x-2">
                <Label>Hex:</Label>
                <HexColorInput
                  color={color}
                  onChange={onChange}
                  prefixed
                  className="w-full px-2 py-1 text-sm border rounded"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
