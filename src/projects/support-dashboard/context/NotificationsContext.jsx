import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { MOCK_NOTIFICATIONS_SEED } from "../data/mockNotifications.js";

const READ_IDS_KEY = "nw_notification_read_ids";

function loadReadIds() {
  try {
    const raw = localStorage.getItem(READ_IDS_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function saveReadIds(set) {
  localStorage.setItem(READ_IDS_KEY, JSON.stringify([...set]));
}

const NotificationsContext = createContext(null);

export function NotificationsProvider({ children }) {
  const [readIds, setReadIds] = useState(() => loadReadIds());

  useEffect(() => {
    saveReadIds(readIds);
  }, [readIds]);

  const notifications = useMemo(
    () =>
      MOCK_NOTIFICATIONS_SEED.map((n) => ({
        ...n,
        read: n.read || readIds.has(n.id),
      })),
    [readIds]
  );

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);

  const markAsRead = useCallback((id) => {
    setReadIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const markAllRead = useCallback(() => {
    setReadIds(new Set(MOCK_NOTIFICATIONS_SEED.map((n) => n.id)));
  }, []);

  const value = useMemo(
    () => ({
      notifications,
      unreadCount,
      markAsRead,
      markAllRead,
    }),
    [notifications, unreadCount, markAsRead, markAllRead]
  );

  return (
    <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationsProvider");
  return ctx;
}
