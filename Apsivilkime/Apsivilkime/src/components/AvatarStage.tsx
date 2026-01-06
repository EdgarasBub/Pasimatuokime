import type { Outfit } from "../state/outfitReducer";
import { clothesById, layerSort, CLOTHES } from "../data/clothes";

type Props = {
  outfit: Outfit;
};

export function AvatarStage({ outfit }: Props) {
  const selected = Object.values(outfit)
    .map(id => clothesById[id])
    .filter(Boolean)
    .slice()
    .sort(layerSort);

  return (
    <div style={{ width: 420, maxWidth: "100%" }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 12,
          overflow: "hidden",
          background: "rgba(255,255,255,0.04)",
        }}
      >
        {/* Base avatar */}
        <img
          src={"/src/assets/base/avatar.png"}
          alt="avatar"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
          draggable={false}
        />

        {/* Clothing layers */}
        {selected.map(item => (
          <img
            key={item.id}
            src={item.src}
            alt={item.name}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
            draggable={false}
          />
        ))}
      </div>

      <div style={{ marginTop: 8, fontSize: 12, opacity: 0.8 }}>
        Layers: {selected.map(s => s.id).join(", ") || "—"}
      </div>
    </div>
  );
}
