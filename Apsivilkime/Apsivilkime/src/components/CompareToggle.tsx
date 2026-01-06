type Props = {
  mode: "before" | "after";
  setMode: (m: "before" | "after") => void;
};

export function CompareToggle({ mode, setMode }: Props) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button onClick={() => setMode("before")} style={{ opacity: mode === "before" ? 1 : 0.6 }}>
        Before
      </button>
      <button onClick={() => setMode("after")} style={{ opacity: mode === "after" ? 1 : 0.6 }}>
        After
      </button>
    </div>
  );
}
