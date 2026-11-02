"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { SceneTheme } from "@/components/WorkspaceScene";

// The scene renders a live clock and reads prefers-reduced-motion, so it is
// rendered client-only to avoid hydration mismatches.
const WorkspaceScene = dynamic(
  () => import("@/components/WorkspaceScene").then((m) => m.WorkspaceScene),
  {
    ssr: false,
    loading: () => <div className="aspect-video w-full bg-scene-sky-light" />,
  },
);

export function Portfolio() {
  const [theme, setTheme] = useState<SceneTheme>("light");
  const dark = theme === "dark";

  return (
    <main
      className={`flex min-h-dvh items-center justify-center transition-colors duration-500 ${
        dark ? "bg-background-dark" : "bg-background"
      }`}
    >
      <div className="w-full max-w-[calc(100dvh*16/9)]">
        <WorkspaceScene theme={theme} onThemeChange={setTheme} />
      </div>
    </main>
  );
}
