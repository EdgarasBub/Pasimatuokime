type Props = {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
};

export function HistoryControls({ canUndo, canRedo, onUndo, onRedo }: Props) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button onClick={onUndo} disabled={!canUndo}>Undo</button>
      <button onClick={onRedo} disabled={!canRedo}>Redo</button>
    </div>
  );
}
