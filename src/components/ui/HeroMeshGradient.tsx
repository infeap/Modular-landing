"use client";

import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

interface Color {
  r: number;
  g: number;
  b: number;
}

const COLORS = {
  base: { r: 12, g: 20, b: 33 },
  glow1: { r: 30, g: 60, b: 110 },
  glow2: { r: 42, g: 80, b: 140 },
  glow3: { r: 55, g: 100, b: 165 },
  glow4: { r: 25, g: 50, b: 95 },
  accent: { r: 74, g: 126, b: 199 },
};

interface BlobConfig {
  x: number;
  y: number;
  radius: number;
  color: Color;
  opacity: number;
  freqX: number;
  freqY: number;
  ampX: number;
  ampY: number;
}

function createBlob(config: BlobConfig) {
  const phaseX = Math.random() * Math.PI * 2;
  const phaseY = Math.random() * Math.PI * 2;
  const radiusFreq = (0.00003 + Math.random() * 0.00003) * 1.5;
  const radiusAmp = config.radius * 0.15;
  const radiusPhase = Math.random() * Math.PI * 2;
  const opacityFreq = (0.00002 + Math.random() * 0.00001) * 1.5;
  const opacityAmp = config.opacity * 0.35;
  const opacityPhase = Math.random() * Math.PI * 2;

  return {
    ...config,
    baseX: config.x,
    baseY: config.y,
    baseRadius: config.radius,
    baseOpacity: config.opacity,
    phaseX,
    phaseY,
    radiusFreq,
    radiusAmp,
    radiusPhase,
    opacityFreq,
    opacityAmp,
    opacityPhase,
  };
}

type Blob = ReturnType<typeof createBlob>;

function updateBlob(blob: Blob, time: number) {
  blob.x = blob.baseX + Math.sin(time * blob.freqX + blob.phaseX) * blob.ampX;
  blob.y = blob.baseY + Math.cos(time * blob.freqY + blob.phaseY) * blob.ampY;
  blob.radius = blob.baseRadius + Math.sin(time * blob.radiusFreq + blob.radiusPhase) * blob.radiusAmp;
  blob.opacity = blob.baseOpacity + Math.sin(time * blob.opacityFreq + blob.opacityPhase) * blob.opacityAmp;
}

function drawBlob(ctx: CanvasRenderingContext2D, blob: Blob, w: number, h: number) {
  const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius);
  const { r, g, b } = blob.color;
  gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${blob.opacity})`);
  gradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${blob.opacity * 0.6})`);
  gradient.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, ${blob.opacity * 0.25})`);
  gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);
}

function createBlobs(w: number, h: number): Blob[] {
  const max = Math.max(w, h);
  return [
    createBlob({ x: w * 0.35, y: h * 0.55, radius: max * 0.55, color: COLORS.glow1, opacity: 0.28, freqX: 0.000075, freqY: 0.00006, ampX: w * 0.1, ampY: h * 0.08 }),
    createBlob({ x: w * 0.7, y: h * 0.4, radius: max * 0.45, color: COLORS.glow4, opacity: 0.2, freqX: 0.00009, freqY: 0.000075, ampX: w * 0.1, ampY: h * 0.07 }),
    createBlob({ x: w * 0.25, y: h * 0.65, radius: max * 0.35, color: COLORS.glow2, opacity: 0.22, freqX: 0.000105, freqY: 0.00009, ampX: w * 0.12, ampY: h * 0.1 }),
    createBlob({ x: w * 0.6, y: h * 0.6, radius: max * 0.3, color: COLORS.glow3, opacity: 0.16, freqX: 0.00012, freqY: 0.000105, ampX: w * 0.1, ampY: h * 0.08 }),
    createBlob({ x: w * 0.4, y: h * 0.5, radius: max * 0.22, color: COLORS.accent, opacity: 0.1, freqX: 0.000135, freqY: 0.000105, ampX: w * 0.12, ampY: h * 0.1 }),
    createBlob({ x: w * 0.55, y: h * 0.7, radius: max * 0.18, color: COLORS.glow3, opacity: 0.12, freqX: 0.00015, freqY: 0.00012, ampX: w * 0.08, ampY: h * 0.07 }),
  ];
}

export function HeroMeshGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const blobsRef = useRef<Blob[]>([]);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);

  const render = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const time = timestamp - startTimeRef.current;

    const w = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
    const h = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));

    const { r, g, b } = COLORS.base;
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = "screen";
    for (const blob of blobsRef.current) {
      updateBlob(blob, time);
      drawBlob(ctx, blob, w, h);
    }
    ctx.globalCompositeOperation = "source-over";

    // Subtle top-down darkness for text contrast
    const topGrad = ctx.createLinearGradient(0, 0, 0, h * 0.4);
    topGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.3)`);
    topGrad.addColorStop(1, "transparent");
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, w, h * 0.4);

    rafRef.current = requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
      blobsRef.current = createBlobs(w, h);
    }

    resize();
    window.addEventListener("resize", resize);

    if (!prefersReducedMotion) {
      rafRef.current = requestAnimationFrame(render);
    } else {
      // Draw a single static frame
      render(0);
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion, render]);

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[1]" />
      {/* Film grain */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />
      {/* Animated grain shimmer */}
      <div className="absolute inset-0 z-[3] pointer-events-none animate-[grainShimmer_5s_ease-in-out_infinite] bg-[radial-gradient(ellipse_at_40%_60%,rgba(106,159,224,0.03)_0%,transparent_70%)]" />
      {/* Vignette */}
      <div className="absolute inset-0 z-[4] pointer-events-none bg-[radial-gradient(ellipse_at_50%_50%,transparent_40%,rgba(12,20,33,0.5)_100%)]" />
    </>
  );
}
