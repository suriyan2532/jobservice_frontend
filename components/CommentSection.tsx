import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Paperclip,
  Send,
  Share2,
} from "lucide-react";
import { useState } from "react";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
    initials: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  hasLiked?: boolean;
}

const initialComments: Comment[] = [
  {
    id: "c1",
    author: { name: "Sarah Connor", initials: "SC" },
    content:
      "I've started looking into the login issue. It seems related to the new auth provider update.",
    timestamp: "2 hours ago",
    likes: 3,
    hasLiked: true,
  },
  {
    id: "c2",
    author: { name: "John Smith", initials: "JS" },
    content: "Great catch! Let me know if you need help with the rollback.",
    timestamp: "1 hour ago",
    likes: 1,
    hasLiked: false,
  },
];

export function CommentSection() {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      author: { name: "You", initials: "YO" },
      content: newComment,
      timestamp: "Just now",
      likes: 0,
      hasLiked: false,
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  const toggleLike = (id: string) => {
    setComments(
      comments.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              likes: comment.hasLiked ? comment.likes - 1 : comment.likes + 1,
              hasLiked: !comment.hasLiked,
            }
          : comment,
      ),
    );
  };

  return (
    <Card className="h-full flex flex-col border-0 shadow-none bg-transparent">
      <CardHeader className="px-0 pt-0 pb-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <MessageCircle className="h-5 w-5" /> Activity
        </h3>
      </CardHeader>

      <ScrollArea className="flex-1 pr-4 -mr-4 h-[400px]">
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 group">
              <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800 shadow-sm">
                <AvatarImage src={comment.author.avatar} />
                <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-medium">
                  {comment.author.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="bg-white dark:bg-gray-900/50 p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 dark:border-gray-800 relative group-hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-gray-900 dark:text-gray-100">
                        {comment.author.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        • {comment.timestamp}
                      </span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {comment.content}
                  </p>
                </div>

                <div className="flex items-center gap-4 px-2 pt-1">
                  <button
                    onClick={() => toggleLike(comment.id)}
                    className={`text-xs font-semibold flex items-center gap-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded-full transition-colors ${
                      comment.hasLiked
                        ? "text-red-500"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <Heart
                      className={`h-3.5 w-3.5 ${comment.hasLiked ? "fill-current" : ""}`}
                    />
                    {comment.likes > 0 ? comment.likes : "Like"}
                  </button>
                  <button className="text-xs font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded-full transition-colors">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="mt-4 pt-4 border-t bg-gray-50/50 dark:bg-black/20 -mx-6 px-6 pb-2 rounded-b-xl">
        <div className="flex gap-3 items-start">
          <Avatar className="h-8 w-8 mt-1">
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs">
              YO
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Input
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
              className="bg-white dark:bg-gray-900 border-none shadow-sm focus-visible:ring-1 focus-visible:ring-blue-500/20"
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              <Button
                size="sm"
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white gap-2 rounded-full px-4 h-8 text-xs font-medium"
              >
                Comment <Send className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
