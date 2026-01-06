import { CATEGORIES, CLOTHES, type Category } from "../data/clothes";
import type { Outfit } from "../state/outfitReducer";

type Props = {
  outfit: Outfit;
  onPick: (category: Category, itemId: string) => void;
  onClear: (category: Category) => void;
};

export function WardrobePanel({ outfit, onPick, onClear }: Props) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {CATEGORIES.map(cat => {
        const items = CLOTHES.filter(i => i.category === cat.key);
        const selectedId = outfit[cat.key];

        return (
          <div key={cat.key} style={{ padding: 12, borderRadius: 12, border: "1px solid rgba(255,255,255,0.12)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <strong>{cat.label}</strong>
              <button onClick={() => onClear(cat.key)} style={{ opacity: 0.9 }}>Clear</button>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {items.map(it => {
                const active = it.id === selectedId;
                return (
                  <button
                    key={it.id}
                    onClick={() => onPick(cat.key, it.id)}
                    style={{
                      padding: "8px 10px",
                      borderRadius: 10,
                      border: "1px solid rgba(255,255,255,0.18)",
                      background: active ? "rgba(255,255,255,0.16)" : "transparent",
                      cursor: "pointer",
                    }}
                    title={it.id}
                  >
                    {it.name}
                  </button>
                );
              })}
              {items.length === 0 && <div style={{ opacity: 0.7 }}>Nėra itemų šitai kategorijai.</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
