import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

function EditingField() {
    const filters = [
      "None",
      "Grayscale",
      "Sepia",
      "Vintage",
      "High Contrast",
      "Warm",
      "Cool",
      "Vignette",
    ];
    const transitions = ["None", "Fade", "Dissolve", "Wipe", "Slide", "Zoom"];
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 overflow-y-auto max-h-96 md:max-h-full">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Editing Tools
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="trim"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Trim
                </label>
                <input
                  type="range"
                  id="trim"
                  min="0"
                  max="100"
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label
                  htmlFor="filters"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Filters
                </label>
                <Select defaultValue={filters[0].toLowerCase()}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select filter" />
                  </SelectTrigger>
                  <SelectContent>
                    {filters.map((filter) => (
                      <SelectItem key={filter} value={filter.toLowerCase()}>
                        {filter}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="transitions"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Transitions
                </label>
                <Select defaultValue={transitions[0].toLowerCase()}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transition" />
                  </SelectTrigger>
                  <SelectContent>
                    {transitions.map((transition) => (
                      <SelectItem
                        key={transition}
                        value={transition.toLowerCase()}
                      >
                        {transition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="text"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Add Text
                </label>
                <input
                  type="text"
                  id="text"
                  placeholder="Enter text overlay"
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-800 dark:text-gray-100"
                />
              </div>
              <div>
                <label
                  htmlFor="speed"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Playback Speed
                </label>
                <input
                  type="range"
                  id="speed"
                  min="0.5"
                  max="2"
                  step="0.1"
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label
                  htmlFor="volume"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Volume
                </label>
                <input
                  type="range"
                  id="volume"
                  min="0"
                  max="100"
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
  )
}

export default EditingField