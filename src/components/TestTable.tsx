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
import { ArrowUpDown, Loader2 } from "lucide-react";
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
import Filters, { FiltersI } from "./Filters";
import Link from "next/link";
import { TestI } from "@/models/test.model";
import { getTests } from "@/services/tests";

export const columns: ColumnDef<TestI>[] = [
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
          Name
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
    cell: ({ row }) => {
      const language = row.getValue("language") as string;
      return (
        <div className="capitalize">
          {language === "cpp" ? "C++" : language}
        </div>
      );
    },
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
    accessorKey: "mcqCount",
    header: "MCQs",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("mcqCount")}</div>
    ),
  },
  {
    accessorKey: "codingCount",
    header: "Coding",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("codingCount")}</div>
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
    accessorKey: "_id",
    header: "",
    cell: ({ row }) => {
      return (
        <Button size="sm" asChild>
          <Link href={`/test/${row.getValue("_id")}`}>View</Link>
        </Button>
      );
    },
  },
];

export function TestTable() {
  const [data, setData] = React.useState<TestI[]>([]);
  const [loading, setLoading] = React.useState(true);

  const initialFilters: FiltersI = {
    mcq: [0, 50],
    coding: [0, 5],
    difficulty: "all",
    language: "all",
    date: undefined,
  };

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [errorMessage, setErrorMessage] = React.useState("");
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
        const creationDate = new Date(`${item.createdAt}`);
        const fromDate = filters.date?.from
          ? new Date(filters.date.from)
          : null;
        const toDate = filters.date?.to ? new Date(filters.date.to) : null;

        const mcqInRange =
          item.mcqCount >= filters.mcq[0] && item.mcqCount <= filters.mcq[1];
        const codingInRange =
          item.codingCount >= filters.coding[0] &&
          item.codingCount <= filters.coding[1];

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

  React.useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const tests = await getTests();
      if (tests.success) {
        setData(tests.data);
      } else {
        setErrorMessage(tests.message || "");
      }
      setLoading(false);
    };
    if (data.length > 0) return;
    getData();
  }, []);

  return (
    <div className="w-full">
      <div className="flex max-sm:flex-col sm:items-center gap-4 pb-4">
        <Input
          placeholder="Search tests..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          name="test-search"
          className="sm:max-w-sm max-sm:w-full"
        />
        <div className="grid grid-cols-2 gap-2">
          <Filters
            filters={filters}
            setFilters={setFilters}
            initialFilters={initialFilters}
            setIsFiltered={setIsFiltered}
          />
          {isFiltered && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                setFilters(initialFilters);
                setIsFiltered(false);
              }}
            >
              Clear all
            </Button>
          )}
        </div>
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
                  className="h-30 text-center"
                >
                  {loading ? (
                    <Loader2 className="animate-spin mx-auto" />
                  ) : (
                    errorMessage || "No results."
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
