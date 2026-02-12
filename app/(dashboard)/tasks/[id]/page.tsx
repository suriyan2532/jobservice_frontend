"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { CommentSection } from "@/components/CommentSection";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function TaskFormPage() {
  const router = useRouter();
  const params = useParams();
  const isEdit = params.id && params.id !== "new";
  const { t } = useLanguage();

  const [priority, setPriority] = useState("medium");

  const priorities = [
    {
      value: "low",
      label: t("priority.low"),
      color: "bg-green-100 text-green-700 border-green-200 hover:bg-green-200",
    },
    {
      value: "medium",
      label: t("priority.medium"),
      color: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200",
    },
    {
      value: "high",
      label: t("priority.high"),
      color:
        "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200",
    },
    {
      value: "critical",
      label: t("priority.critical"),
      color: "bg-red-100 text-red-700 border-red-200 hover:bg-red-200",
    },
  ];

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/tasks">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">
            {isEdit ? t("tasks.details") : t("tasks.createNew")}
          </h1>
        </div>
        <div className="flex gap-2">
          {isEdit && (
            <>
              <Button variant="outline" onClick={() => router.back()}>
                {t("tasks.cancel")}
              </Button>
              <Button onClick={() => router.push("/tasks")} className="gap-2">
                <Save className="h-4 w-4" />
                {t("tasks.saveChanges")}
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full overflow-hidden">
        {/* Left Column: Task Details */}
        <div
          className={`space-y-6 overflow-y-auto pr-2 pb-20 ${isEdit ? "lg:col-span-2" : "lg:col-span-3 max-w-2xl mx-auto w-full"}`}
        >
          <Card>
            <CardHeader>
              <CardTitle>{t("tasks.generalInfo")}</CardTitle>
              <CardDescription>{t("tasks.basicDetails")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="title" className="text-base">
                  {t("tasks.taskTitle")}
                </Label>
                <Input
                  id="title"
                  placeholder={t("tasks.taskTitle")}
                  defaultValue={isEdit ? "Fix login issue" : ""}
                  className="h-12 text-lg"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="description" className="text-base">
                  {t("tasks.details")}
                </Label>
                <Textarea
                  id="description"
                  placeholder={t("tasks.descPlaceholder")}
                  className="min-h-[150px] resize-none text-base p-4"
                />
              </div>

              {!isEdit && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-base">{t("tasks.priority")}</Label>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {priorities.map((p) => (
                        <button
                          key={p.value}
                          type="button"
                          onClick={() => setPriority(p.value)}
                          className={cn(
                            "flex items-center justify-center py-3 px-4 rounded-lg border-2 text-sm font-semibold transition-all",
                            priority === p.value
                              ? `ring-2 ring-offset-2 ring-black dark:ring-white ${p.color} border-current`
                              : "bg-white dark:bg-black/40 border-gray-200 text-gray-500 hover:border-gray-300",
                          )}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      onClick={() => router.push("/tasks")}
                      className="w-full h-12 text-lg gap-2 shadow-lg"
                    >
                      <Save className="h-5 w-5" />
                      {t("tasks.create")}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => router.back()}
                      className="w-full mt-2"
                    >
                      {t("tasks.cancel")}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {isEdit && (
            <Card>
              <CardHeader>
                <CardTitle>{t("tasks.status")} & Assignment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">{t("tasks.status")}</Label>
                    <Select defaultValue={isEdit ? "in-progress" : "pending"}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder={t("tasks.status")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">
                          {t("status.pending")}
                        </SelectItem>
                        <SelectItem value="in-progress">
                          {t("status.inProgress")}
                        </SelectItem>
                        <SelectItem value="completed">
                          {t("status.completed")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">{t("tasks.priority")}</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="priority">
                        <SelectValue placeholder={t("tasks.priority")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">{t("priority.low")}</SelectItem>
                        <SelectItem value="medium">
                          {t("priority.medium")}
                        </SelectItem>
                        <SelectItem value="high">
                          {t("priority.high")}
                        </SelectItem>
                        <SelectItem value="critical">
                          {t("priority.critical")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assignee">{t("tasks.assignee")}</Label>
                  <Input id="assignee" placeholder={t("tasks.assignTo")} />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column: Social / Comments (Only visible in Edit mode) */}
        {isEdit && (
          <div className="lg:col-span-1 h-full overflow-hidden flex flex-col">
            <div className="bg-gray-50/50 dark:bg-black/20 rounded-xl border p-4 h-full flex flex-col">
              <CommentSection />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
