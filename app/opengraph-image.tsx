import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Link önizlemesi (LinkedIn, WhatsApp, X, Slack).
 * Sitenin koyu teması + teknik grid diliyle aynı görünsün diye elle kuruldu;
 * ImageResponse yalnızca flexbox desteklediği için her kapsayıcıda display:flex var.
 */
export default function OpengraphImage() {
  const bg = "#031b17";
  const accent = "#dc8b32";
  const ink = "#e7e3d8";
  const muted = "#9aa99f";
  const line = "rgba(90,140,120,0.22)";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: bg,
          backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 6,
              color: accent,
              fontFamily: "monospace",
            }}
          >
            {profile.tag}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 5,
              color: muted,
              fontFamily: "monospace",
            }}
          >
            {profile.brand}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              fontWeight: 700,
              letterSpacing: -3,
              color: ink,
              lineHeight: 1,
            }}
          >
            {profile.name}
          </div>
          <div style={{ display: "flex", width: 120, height: 4, background: accent, margin: "34px 0" }} />
          <div style={{ display: "flex", fontSize: 40, color: "#c9c9bd" }}>{profile.title}</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${line}`,
            paddingTop: 28,
            fontSize: 21,
            letterSpacing: 3,
            color: muted,
            fontFamily: "monospace",
          }}
        >
          <div style={{ display: "flex" }}>EMBEDDED · PCB · AVIONICS</div>
          <div style={{ display: "flex" }}>kaansezer.com</div>
        </div>
      </div>
    ),
    size,
  );
}
