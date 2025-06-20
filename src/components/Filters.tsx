import { Button } from "./ui/button";
import { Filter } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DualRangeSlider } from "./ui/dual-range-slider";
import { Label } from "./ui/label";
import { DateRangePicker } from "./DateRangePicker";
import { DateRange } from "react-day-picker";

export type Difficulty = "easy" | "intermediate" | "hard" | "all";
export type Language = "javascript" | "java" | "cpp" | "python" | "all";

export interface FiltersI {
  mcq: number[];
  coding: number[];
  difficulty: Difficulty;
  language: Language;
  date: DateRange | undefined;
}

interface Props {
  filters: FiltersI;
  initialFilters: FiltersI;
  setFilters: (value: FiltersI) => void;
  setIsFiltered: (value: boolean) => void;
}

function Filters({
  filters,
  setFilters,
  initialFilters,
  setIsFiltered,
}: Props) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Filter /> Filters
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Filters</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <div className="grid grid-cols-4 items-center gap-2 w-full pt-4">
            <Label htmlFor="mcq">MCQs</Label>
            <div className="py-2 px-0.5 w-full col-span-3">
              <DualRangeSlider
                id="mcq"
                min={0}
                max={10}
                step={1}
                value={filters.mcq}
                label={(value) => value}
                onValueChange={(value) =>
                  setFilters({ ...filters, mcq: value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-2 w-full pt-4">
            <Label htmlFor="coding">Coding</Label>
            <div className="py-2 px-0.5 w-full col-span-3">
              <DualRangeSlider
                id="coding"
                min={0}
                max={5}
                step={1}
                value={filters.coding}
                label={(value) => value}
                onValueChange={(value) =>
                  setFilters({ ...filters, coding: value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-2 w-full">
            <Label htmlFor="difficulty">Difficulty</Label>
            <Select
              value={filters.difficulty}
              onValueChange={(value) =>
                setFilters({ ...filters, difficulty: value as Difficulty })
              }
            >
              <SelectTrigger className="col-span-3 w-full" id="difficulty">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-2 w-full">
            <Label htmlFor="language">Language</Label>
            <Select
              value={filters.language}
              onValueChange={(value) =>
                setFilters({ ...filters, language: value as Language })
              }
            >
              <SelectTrigger className="col-span-3 w-full" id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="javascript">Javascript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-2 w-full">
            <Label htmlFor="createdAt">Creation Time</Label>
            <DateRangePicker
              date={filters.date}
              setDate={(value) => setFilters({ ...filters, date: value })}
              className="col-span-3"
              id="createdAt"
              modal
            />
          </div>
        </div>
        <DialogFooter className="sm:grid sm:grid-cols-2 max-sm:gap-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={() => {
                setFilters(initialFilters);
                setIsFiltered(false);
              }}
            >
              Reset
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={() => setIsFiltered(true)}>Apply</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Filters;
