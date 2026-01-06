import type { OutfitState } from "../state/outfitReducer";

const KEY = "pasimatuokime.paperdoll.v1";

export function loadState(): OutfitState | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as OutfitState;
  } catch {
    return null;
  }
}

export function saveState(state: OutfitState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

/**
 * Backend stub: vėliau pakeisi į realų fetch.
 * Pvz. POST /api/outfits { before, after }
 */
export async function saveToBackend(_state: OutfitState) {
  // TODO: implement later
  return { ok: true };
}
