"use client";

import { useEffect } from "react";

export interface ToastProps {
  message: string;
  onDismiss(): void;
  duration?: number;
}

export function Toast({ message, onDismiss, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = window.setTimeout(onDismiss, duration);
    return () => window.clearTimeout(timer);
  }, [duration, onDismiss]);

  return (
    <div
      className="toast"
      role="status"
      aria-live="polite"
      aria-atomic="true"
      style={{ animationDuration: `${duration}ms` }}
    >
      <span aria-hidden="true">✓</span>
      <span>{message}</span>
    </div>
  );
}
