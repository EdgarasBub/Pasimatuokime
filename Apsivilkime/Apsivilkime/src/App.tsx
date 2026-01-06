import { useEffect, useMemo, useReducer, useState } from "react";
import { AvatarStage } from "./components/AvatarStage";
import { WardrobePanel } from "./components/WardrobePanel";
import { CompareToggle } from "./components/CompareToggle";
import { HistoryControls } from "./components/HistoryControls";
import { initialState, outfitReducer } from "./state/outfitReducer";
import { loadState, saveState, saveToBackend } from "./storage/outfitStorage";

export default function App() {
  const [state, dispatch] = useReducer(outfitReducer, initialState);
  const [mode, setMode] = useState<"before" | "after">("after");

  useEffect(() => {
    const loaded = loadState();
    if (loaded) dispatch({ type: "load", state: loaded });
  }, []);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const activeOutfit = mode === "before" ? state.before : state.after;

  return (
    <div style={{ padding: 18, color: "white", fontFamily: "system-ui, sans-serif" }}>
      <h2 style={{ marginTop: 0 }}>Pasimatuokime (paper-doll)</h2>

      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 12 }}>
        <CompareToggle mode={mode} setMode={setMode} />

        <button onClick={() => dispatch({ type: "setBeforeFromAfter" })}>
          Set BEFORE = current AFTER
        </button>

        <button onClick={() => dispatch({ type: "resetAfterToBefore" })}>
          Reset AFTER to BEFORE
        </button>

        <HistoryControls
          canUndo={state.past.length > 0}
          canRedo={state.future.length > 0}
          onUndo={() => dispatch({ type: "undo" })}
          onRedo={() => dispatch({ type: "redo" })}
        />

        <button
          onClick={async () => {
            const res = await saveToBackend(state);
            alert(res.ok ? "Saved (stub)" : "Save failed");
          }}
        >
          Save to backend (stub)
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 16, alignItems: "start" }}>
        <WardrobePanel
          outfit={state.after}
          onPick={(category, itemId) => dispatch({ type: "setItem", category, itemId })}
          onClear={(category) => dispatch({ type: "clearCategory", category })}
        />

        <div>
          <AvatarStage outfit={activeOutfit} />
          <div style={{ marginTop: 10, opacity: 0.85, fontSize: 13 }}>
            Editinimas visada keičia <b>AFTER</b>. Compare režime tik perjungi ką matai.
          </div>
        </div>
      </div>
    </div>
  );
}
