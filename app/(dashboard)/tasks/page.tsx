"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

// Mock data
const tasks = [
  {
    id: "TASK-1234",
    title: "Fix login issue",
    status: "In Progress",
    priority: "High",
    createdAt: "2023-10-25",
  },
  {
    id: "TASK-1235",
    title: "Update dashboard",
    status: "Completed",
    priority: "Medium",
    createdAt: "2023-10-26",
  },
  {
    id: "TASK-1236",
    title: "Database migration",
    status: "Pending",
    priority: "Critical",
    createdAt: "2023-10-27",
  },
];

export default function TasksPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("tasks.title")}</h1>
        <Link href="/tasks/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> {t("tasks.addTask")}
          </Button>
        </Link>
      </div>

      <div className="rounded-md border bg-white dark:bg-black/40 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] whitespace-nowrap">
                  {t("tasks.id")}
                </TableHead>
                <TableHead className="min-w-[150px]">
                  {t("tasks.taskTitle")}
                </TableHead>
                <TableHead>{t("tasks.status")}</TableHead>
                <TableHead>{t("tasks.priority")}</TableHead>
                <TableHead className="whitespace-nowrap">
                  {t("tasks.createdAt")}
                </TableHead>
                <TableHead className="text-right">
                  {t("tasks.actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium whitespace-nowrap">
                    {task.id}
                  </TableCell>
                  <TableCell className="font-medium min-w-[150px]">
                    {task.title}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        task.status === "Completed"
                          ? "default"
                          : task.status === "In Progress"
                            ? "secondary"
                            : "outline"
                      }
                      className={
                        task.status === "Completed"
                          ? "bg-green-600 hover:bg-green-700 whitespace-nowrap"
                          : task.status === "In Progress"
                            ? "bg-blue-600 text-white hover:bg-blue-700 whitespace-nowrap"
                            : "bg-yellow-500 text-white hover:bg-yellow-600 whitespace-nowrap"
                      }
                    >
                      {task.status === "Completed"
                        ? t("status.completed")
                        : task.status === "In Progress"
                          ? t("status.inProgress")
                          : t("status.pending")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        task.priority === "Critical"
                          ? "border-red-500 text-red-500 whitespace-nowrap"
                          : task.priority === "High"
                            ? "border-orange-500 text-orange-500 whitespace-nowrap"
                            : "border-gray-500 whitespace-nowrap"
                      }
                    >
                      {task.priority === "Critical"
                        ? t("priority.critical")
                        : task.priority === "High"
                          ? t("priority.high")
                          : t("priority.medium")}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {task.createdAt}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/tasks/${task.id}`}>
                        <Button variant="ghost" size="icon">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
