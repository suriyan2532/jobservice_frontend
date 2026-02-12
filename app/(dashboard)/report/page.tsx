"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Printer } from "lucide-react";

// Mock data (same as tasks for now)
const tasks = [
  {
    id: "TASK-1234",
    title: "Fix login issue",
    status: "In Progress",
    priority: "High",
    assignee: "John Doe",
    createdAt: "2023-10-25",
  },
  {
    id: "TASK-1235",
    title: "Update dashboard",
    status: "Completed",
    priority: "Medium",
    assignee: "Jane Smith",
    createdAt: "2023-10-26",
  },
  {
    id: "TASK-1236",
    title: "Database migration",
    status: "Pending",
    priority: "Critical",
    assignee: "Mike Johnson",
    createdAt: "2023-10-27",
  },
];

export default function ReportPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 container mx-auto">
      <div className="flex items-center justify-between print:hidden">
        <h1 className="text-3xl font-bold">Task Report</h1>
        <Button onClick={handlePrint} className="gap-2">
          <Printer className="h-4 w-4" /> Print Report
        </Button>
      </div>

      <div className="hidden print:block mb-6">
        <h1 className="text-2xl font-bold text-center mb-2">
          Job Service Task Report
        </h1>
        <p className="text-center text-gray-500">
          Generated on: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="rounded-md border bg-white print:border-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.id}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.assignee}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="hidden print:block mt-12">
        <div className="flex justify-between px-10">
          <div className="text-center">
            <div className="border-b border-black w-40 mb-2"></div>
            <p>Prepared By</p>
          </div>
          <div className="text-center">
            <div className="border-b border-black w-40 mb-2"></div>
            <p>Approved By</p>
          </div>
        </div>
      </div>
    </div>
  );
}
