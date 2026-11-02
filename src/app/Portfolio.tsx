"use client";

import dynamic from "next/dynamic";
import { useState, type CSSProperties } from "react";
import type { SceneTheme } from "@/components/WorkspaceScene";

// The scene renders a live clock and reads prefers-reduced-motion, so it is
// rendered client-only to avoid hydration mismatches.
const WorkspaceScene = dynamic(
  () => import("@/components/WorkspaceScene").then((m) => m.WorkspaceScene),
  {
    ssr: false,
    loading: () => <div className="h-full w-full bg-scene-sky-light" />,
  },
);

/*
 * The artwork is a fixed 16:9 (320×180) composition. To fill any screen it is
 * scaled to cover the viewport, but never so far that less than MIN_VISIBLE of
 * its width stays on screen (keeps the laptop and lamp visible on phones).
 * Leftover space on tall screens is filled with the sky (and window mullions)
 * above and the desk edge below, so the room simply extends.
 */
const MIN_VISIBLE = 0.6;
const SCENE_VARS = {
  "--scene-w": `min(max(100vw, 100dvh * 16 / 9), 100vw / ${MIN_VISIBLE})`,
  "--scene-h": "calc(var(--scene-w) * 9 / 16)",
  // Spare height goes 65% above / 35% below; overflow is cropped mostly from the sky (85% top).
  "--scene-top":
    "calc(max(0px, 100dvh - var(--scene-h)) * 0.65 + min(0px, 100dvh - var(--scene-h)) * 0.85)",
} as CSSProperties;

// Colours sampled from the artwork (night values have the scene's night tint applied).
const FILL = {
  light: { sky: "#3d98e8", desk: "#7a4a2a", frame: "#3b3f4a", hi: "#5c616d", lo: "#2a2d35" },
  dark: { sky: "#1b1433", desk: "#4a2933", frame: "#2a2446", hi: "#3b335b", lo: "#221c39" },
};
// Window mullions (x, width) on the 320-wide grid, matching SceneWindowFrame.
const MULLIONS = [
  [18, 10],
  [72, 8],
  [263, 10],
];
const FADE = "fill 600ms ease-in-out, background-color 600ms ease-in-out";

export function Portfolio() {
  const [theme, setTheme] = useState<SceneTheme>("light");
  const c = FILL[theme];
  const box: CSSProperties = {
    position: "absolute",
    left: "50%",
    width: "var(--scene-w)",
    marginLeft: "calc(var(--scene-w) / -2)",
  };

  return (
    <main
      className="fixed inset-0 overflow-hidden"
      style={{ ...SCENE_VARS, backgroundColor: c.desk, transition: FADE }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 320 1"
        preserveAspectRatio="none"
        shapeRendering="crispEdges"
        style={{ ...box, top: 0, height: "max(0px, var(--scene-top) + 1px)" }}
      >
        <rect width={320} height={1} style={{ fill: c.sky, transition: FADE }} />
        {MULLIONS.map(([x, w]) => (
          <g key={x}>
            <rect x={x} width={w} height={1} style={{ fill: c.frame, transition: FADE }} />
            <rect x={x} width={1} height={1} style={{ fill: c.hi, transition: FADE }} />
            <rect x={x + w - 1} width={1} height={1} style={{ fill: c.lo, transition: FADE }} />
          </g>
        ))}
      </svg>

      <div style={{ ...box, top: "var(--scene-top)", height: "var(--scene-h)" }}>
        <WorkspaceScene theme={theme} onThemeChange={setTheme} fixedOverlays />
      </div>
    </main>
  );
}
