"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Filters, { Difficulty, FiltersI, Language } from "./Filters";
import Link from "next/link";

const data: Test[] = [
  {
    id: "1",
    name: "Frontend Developer",
    difficulty: "easy",
    language: "javascript",
    createdAt: "2025-12-03T05:56:59.519Z",
    attempts: 1,
    mcq: 10,
    coding: 2,
  },
  {
    id: "2",
    name: "Backend Developer",
    difficulty: "easy",
    language: "python",
    createdAt: "2025-12-04T05:15:59.519Z",
    attempts: 2,
    mcq: 10,
    coding: 1,
  },
  {
    id: "3",
    name: "FullStack Developer",
    difficulty: "intermediate",
    language: "java",
    createdAt: "2025-11-01T02:05:29.519Z",
    attempts: 4,
    mcq: 10,
    coding: 1,
  },
  {
    id: "4",
    name: "Data Analyst",
    difficulty: "hard",
    language: "python",
    createdAt: "2025-01-02T01:23:25.519Z",
    attempts: 3,
    mcq: 10,
    coding: 2,
  },
];

export type Test = {
  id: string;
  name: string;
  difficulty: Difficulty;
  language: Language;
  createdAt: string;
  attempts: number;
  mcq: number;
  coding: number;
  jobDesc?: string;
  extra?: string;
};

export const columns: ColumnDef<Test>[] = [
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "sr",
    header: "Sr. No.",
    cell: ({ row }) => <div className="capitalize">{row.index + 1}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Test Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "difficulty",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Difficulty
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("difficulty")}</div>
    ),
  },
  {
    accessorKey: "language",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Language
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("language")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Creation Time
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="uppercase" suppressHydrationWarning>
        {new Date(row.getValue("createdAt")).toLocaleDateString("en-IN")}&nbsp;
        {new Date(row.getValue("createdAt")).toLocaleTimeString("en-IN")}
      </div>
    ),
  },
  {
    accessorKey: "mcq",
    header: "MCQs",
    cell: ({ row }) => <div className="capitalize">{row.getValue("mcq")}</div>,
  },
  {
    accessorKey: "coding",
    header: "Coding",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("coding")}</div>
    ),
  },
  {
    accessorKey: "attempts",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Attempts
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("attempts")}</div>
    ),
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => {
      return (
        <Button size="sm" asChild>
          <Link href={`/test/${row.getValue("id")}`}>View</Link>
        </Button>
      );
    },
  },
];

export function TestTable() {
  const initialFilters: FiltersI = {
    mcq: [0, 50],
    coding: [0, 5],
    difficulty: "all",
    language: "all",
    date: undefined,
  };

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [filters, setFilters] = React.useState(initialFilters);
  const [isFiltered, setIsFiltered] = React.useState(false);

  const filteredData = React.useMemo(
    () =>
      data.filter((item) => {
        const creationDate = new Date(item.createdAt);
        const fromDate = filters.date?.from
          ? new Date(filters.date.from)
          : null;
        const toDate = filters.date?.to ? new Date(filters.date.to) : null;

        const mcqInRange =
          item.mcq >= filters.mcq[0] && item.mcq <= filters.mcq[1];
        const codingInRange =
          item.coding >= filters.coding[0] && item.coding <= filters.coding[1];

        const difficultyMatches =
          filters.difficulty === "all" ||
          item.difficulty === filters.difficulty;

        const languageMatches =
          filters.language === "all" || item.language === filters.language;

        const dateMatches =
          !filters.date ||
          ((!fromDate || creationDate >= fromDate) &&
            (!toDate || creationDate <= toDate));

        return (
          mcqInRange &&
          codingInRange &&
          difficultyMatches &&
          languageMatches &&
          dateMatches
        );
      }),
    [data, filters]
  );

  const table = useReactTable({
    data: isFiltered ? filteredData : data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 pb-4">
        <Input
          placeholder="Search tests..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          name="test-search"
          className="max-w-sm"
        />
        <Filters
          filters={filters}
          setFilters={setFilters}
          initialFilters={initialFilters}
          setIsFiltered={setIsFiltered}
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="whitespace-nowrap">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-center whitespace-nowrap">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
