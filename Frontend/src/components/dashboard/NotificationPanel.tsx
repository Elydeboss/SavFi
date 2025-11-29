import { useState } from "react";
import {
  X,
  Settings,
  FileCheck,
  Coins,
  AlertCircle,
  ShieldCheck,
  MoveUpRight,
  MoveDownLeft,
} from "lucide-react";

// NEW: Notification type definition
export interface Notification {
  id: string;
  type: "transaction" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon: "kyc" | "deposit" | "withdrawal" | "plan" | "error";
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAllAsRead: () => void;
  onMarkAsRead: (id: string) => void;
}

export function NotificationPanel({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onMarkAsRead,
}: NotificationPanelProps) {
  // NEW: Active tab state for filtering notifications
  const [activeTab, setActiveTab] = useState<"all" | "transaction" | "system">(
    "all"
  );

  // NEW: Filter notifications based on active tab
  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "all") return true;
    return notif.type === activeTab;
  });

  // NEW: Calculate unread counts for each tab
  const allUnreadCount = notifications.filter((n) => !n.read).length;
  const transactionUnreadCount = notifications.filter(
    (n) => !n.read && n.type === "transaction"
  ).length;
  const systemUnreadCount = notifications.filter(
    (n) => !n.read && n.type === "system"
  ).length;

  // NEW: Get icon component based on notification type
  const getNotificationIcon = (iconType: string) => {
    const iconClass = "w-5 h-5";
    switch (iconType) {
      case "kyc":
        return <ShieldCheck className={iconClass} />;
      case "deposit":
        return <MoveDownLeft className={iconClass} />;
      case "withdrawal":
        return <MoveUpRight className={iconClass} />;
      case "plan":
        return <Coins className={iconClass} />;
      case "error":
        return <AlertCircle className={iconClass} />;
      default:
        return <FileCheck className={iconClass} />;
    }
  };

  // NEW: Get background color for notification icon based on type
  const getIconBgColor = (iconType: string) => {
    switch (iconType) {
      case "kyc":
        return "bg-blue-100 text-blue-600";
      case "deposit":
        return "bg-green-100 text-green-600";
      case "withdrawal":
        return "bg-blue-100 text-blue-600";
      case "plan":
        return "bg-green-100 text-green-600";
      case "error":
        return "bg-red-100 text-red-600";
      default:
        return "bg-blue-100 text-blue-600";
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* NEW: Backdrop overlay */}
      <div className="fixed inset-0 z-35" onClick={onClose} />

      {/* NEW: Notification panel */}
      <div className="fixed top-20 right-4 w-[500px] max-w-[calc(100vw-2rem)] bg-neutral-50 rounded-2xl shadow-2xl z-40 h-[calc(100vh-90px)] flex flex-col">
        {/* NEW: Panel header */}
        <div className="p-6 pb-2 border-b border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              Your notifications
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-secondary rounded-lg cursor-pointer transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* NEW: Tab filters */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setActiveTab("all")}
                className={`pb-2 border-b-3 cursor-pointer transition-colors font-medium text-sm ${
                  activeTab === "all"
                    ? "border-blue text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                All ({allUnreadCount})
              </button>
              <button
                onClick={() => setActiveTab("transaction")}
                className={`pb-2 border-b-3 cursor-pointer transition-colors font-medium text-sm ${
                  activeTab === "transaction"
                    ? "border-blue text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Transactions ({transactionUnreadCount})
              </button>
              <button
                onClick={() => setActiveTab("system")}
                className={`pb-2 border-b-3 cursor-pointer transition-colors font-medium text-sm ${
                  activeTab === "system"
                    ? "border-blue text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                System ({systemUnreadCount})
              </button>
            </div>
            <button className=" hover:bg-secondary rounded-lg transition-colors">
              <Settings className="w-6 h-6 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="px-6">
          {/*  Action buttons */}
          <div className="flex items-center justify-end pt-1 ">
            <button
              onClick={onMarkAllAsRead}
              className="text-sm font-semibold cursor-pointer text-blue hover:underline"
            >
              Mark all as read
            </button>
          </div>
        </div>

        {/* NEW: Notifications list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-2">
          {filteredNotifications.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No notifications
            </p>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => onMarkAsRead(notification.id)}
                className={`flex gap-4 p-4 rounded-lg cursor-pointer transition-colors ${
                  notification.read
                    ? "bg-transparent"
                    : "bg-neutral-200 dark:bg-gray-600 hover:bg-neutral-200/70"
                }`}
              >
                {/* NEW: Notification icon */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${getIconBgColor(
                    notification.icon
                  )}`}
                >
                  {getNotificationIcon(notification.icon)}
                </div>

                {/* NEW: Notification content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-foreground mb-1">
                    {notification.title}
                  </h4>
                  <div className="flex gap-4 items-start">
                    <p className="text-xs text-muted-foreground w-full md:flex-1 mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {notification.timestamp}
                      </span>
                      {!notification.read && (
                        <span className="w-2 h-2 rounded-full bg-blue" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
