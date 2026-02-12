"use client";

import { Bell, Check, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MobileSidebar } from "@/components/MobileSidebar";

export function Header() {
  const [unreadCount, setUnreadCount] = useState(2);
  const { language, setLanguage, t } = useLanguage();

  const notifications = [
    {
      id: 1,
      title: "New Task Assigned",
      description: "You have been assigned to 'Fix login issue'",
      time: "5 min ago",
      read: false,
    },
    {
      id: 2,
      title: "New Comment",
      description: "Sarah commented on 'Update dashboard'",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "Task Completed",
      description: "'Database migration' has been marked as completed",
      time: "2 hours ago",
      read: true,
    },
  ];

  const markAllRead = () => {
    setUnreadCount(0);
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white dark:bg-black/40 px-4 md:px-6 shrink-0 gap-4">
      <div className="flex items-center gap-4 w-full max-w-xs md:max-w-md">
        <MobileSidebar />
        <div className="relative w-full hidden sm:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder={t("common.search")}
            className="w-full bg-gray-50 dark:bg-gray-900 pl-9 rounded-full border-0 focus-visible:ring-1 focus-visible:ring-offset-0"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Language Switcher */}
        {/* Language Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full h-10 gap-2 px-3 border-gray-200 dark:border-gray-700"
            >
              <span className="text-lg leading-none">
                {language === "th" ? "🇹🇭" : "🇺🇸"}
              </span>
              <span className="font-medium hidden sm:inline-block">
                {language === "th" ? "TH" : "EN"}
              </span>
              <span className="sr-only">Switch Language</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuItem
              onClick={() => setLanguage("th")}
              className={`gap-3 p-3 cursor-pointer ${language === "th" ? "bg-blue-50 text-blue-600 font-medium" : ""}`}
            >
              <span className="text-xl">🇹🇭</span> Thai
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setLanguage("en")}
              className={`gap-3 p-3 cursor-pointer ${language === "en" ? "bg-blue-50 text-blue-600 font-medium" : ""}`}
            >
              <span className="text-xl">🇺🇸</span> English
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Prominent Create Button */}
        <Link href="/tasks/new">
          <Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all rounded-full px-6">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">{t("common.newTask")}</span>
          </Button>
        </Link>

        {/* Notification Bell */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-gray-100 rounded-full h-10 w-10"
            >
              <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-black animate-pulse" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-80 p-0 shadow-xl border-gray-100 dark:border-gray-800"
            align="end"
          >
            <div className="flex items-center justify-between border-b px-4 py-3 bg-gray-50/50">
              <h4 className="font-semibold text-sm">
                {t("common.notifications")}
              </h4>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 font-medium flex items-center gap-1 hover:underline"
                >
                  <Check className="h-3 w-3" /> {t("common.markAllRead")}
                </button>
              )}
            </div>
            <ScrollArea className="h-[320px]">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer group ${
                      !notification.read && unreadCount > 0
                        ? "bg-blue-50/40 dark:bg-blue-900/10"
                        : ""
                    }`}
                  >
                    <div className="mt-0.5">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          notification.title.includes("Task")
                            ? "bg-blue-100 text-blue-600"
                            : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        {notification.title.charAt(0)}
                      </div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between">
                        <p
                          className={`text-sm font-medium leading-none ${
                            !notification.read && unreadCount > 0
                              ? "text-gray-900 dark:text-gray-100"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {notification.title}
                        </p>
                        <span className="text-[10px] text-gray-400">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                        {notification.description}
                      </p>
                    </div>
                    {!notification.read && unreadCount > 0 && (
                      <div className="h-2 w-2 rounded-full bg-blue-600 mt-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-2 border-t text-center bg-gray-50/50">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs text-gray-500 hover:text-gray-900 h-8"
              >
                {t("common.viewAllNotifications")}
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* User Profile */}
        <div className="hidden md:flex items-center gap-2 border-l pl-4 ml-2">
          <div className="text-right hidden lg:block">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs text-muted-foreground">
              {t("common.welcome")}
            </p>
          </div>
          <Avatar className="h-9 w-9 border-2 border-white shadow-sm cursor-pointer hover:opacity-80 transition-opacity">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
