"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, ListTodo, AlertCircle } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function DashboardPage() {
  const { t } = useLanguage();

  const stats = [
    {
      label: t("dashboard.totalTasks"),
      value: 12,
      icon: ListTodo,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/10",
      borderColor: "border-blue-200 dark:border-blue-900",
    },
    {
      label: t("dashboard.inProgress"),
      value: 5,
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-50 dark:bg-amber-900/10",
      borderColor: "border-amber-200 dark:border-amber-900",
    },
    {
      label: t("dashboard.completed"),
      value: 7,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/10",
      borderColor: "border-emerald-200 dark:border-emerald-900",
    },
    {
      label: t("dashboard.urgent"),
      value: 2,
      icon: AlertCircle,
      color: "text-rose-600",
      bgColor: "bg-rose-50 dark:bg-rose-900/10",
      borderColor: "border-rose-200 dark:border-rose-900",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-400">
        {t("dashboard.title")}
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className={`transition-all duration-300 hover:shadow-lg border-2 ${stat.bgColor} ${stat.borderColor}`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                {stat.label}
              </CardTitle>
              <div
                className={`p-2 rounded-full bg-white/50 dark:bg-black/20 ${stat.color}`}
              >
                <stat.icon className="h-6 w-6" />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-4xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-2">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>{t("dashboard.recentTasks")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {t("dashboard.noRecentTasks")}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
