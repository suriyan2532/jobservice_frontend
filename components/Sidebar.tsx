"use client";

import { LayoutDashboard, ListTodo, FileText, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const sidebarItems = [
    { href: "/dashboard", label: t("common.dashboard"), icon: LayoutDashboard },
    { href: "/tasks", label: t("common.tasks"), icon: ListTodo },
    { href: "/report", label: t("common.report"), icon: FileText },
  ];

  return (
    <div className="hidden lg:flex h-screen w-64 flex-col border-r bg-white dark:bg-black/40">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Job Service
        </h1>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                isActive
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <LogOut className="h-4 w-4" />
          {t("common.logout")}
        </Button>
      </div>
    </div>
  );
}
