import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { FilterState } from "@/types";

interface AdvancedFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  explanationStyle: string;
  onExplanationStyleChange: (style: string) => void;
  includeExamples: boolean;
  onIncludeExamplesChange: (include: boolean) => void;
}

export function AdvancedFilters({
  filters,
  onFiltersChange,
  explanationStyle,
  onExplanationStyleChange,
  includeExamples,
  onIncludeExamplesChange,
}: AdvancedFiltersProps) {
  return (
    <div className="space-y-4 p-4 border rounded-lg bg-background">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="programming-language">Programming Language</Label>
          <Select
            value={filters.programmingLanguage}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, programmingLanguage: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Auto-detect</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="node">Node.js</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="explanation-depth">Explanation Depth</Label>
          <Select
            value={filters.explanationDepth}
            onValueChange={(value: "basic" | "intermediate" | "advanced") =>
              onFiltersChange({ ...filters, explanationDepth: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select depth" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="target-audience">Target Audience</Label>
          <Select
            value={filters.targetAudience}
            onValueChange={(value: "student" | "developer" | "senior") =>
              onFiltersChange({ ...filters, targetAudience: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select audience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="developer">Developer</SelectItem>
              <SelectItem value="senior">Senior Developer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="explanation-style">Explanation Style</Label>
          <Select
            value={explanationStyle}
            onValueChange={onExplanationStyleChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="detailed">Detailed</SelectItem>
              <SelectItem value="concise">Concise</SelectItem>
              <SelectItem value="beginner">Beginner Friendly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2 pt-8">
          <Switch
            id="include-examples"
            checked={includeExamples}
            onCheckedChange={onIncludeExamplesChange}
          />
          <Label htmlFor="include-examples" className="cursor-pointer">
            Include Practical Examples
          </Label>
        </div>
      </div>
    </div>
  );
}
