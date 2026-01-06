import type { Category } from "../data/clothes";

export type Outfit = Partial<Record<Category, string>>; // category -> itemId

export type OutfitState = {
  before: Outfit;
  after: Outfit;
  past: Outfit[];   // undo stack (after snapshots)
  future: Outfit[]; // redo stack
};

export type Action =
  | { type: "setItem"; category: Category; itemId: string }
  | { type: "clearCategory"; category: Category }
  | { type: "setBeforeFromAfter" }
  | { type: "resetAfterToBefore" }
  | { type: "undo" }
  | { type: "redo" }
  | { type: "load"; state: OutfitState };

export const initialState: OutfitState = {
  before: {},
  after: {},
  past: [],
  future: [],
};

function pushHistory(state: OutfitState, nextAfter: Outfit): OutfitState {
  return {
    ...state,
    after: nextAfter,
    past: [...state.past, state.after],
    future: [],
  };
}

export function outfitReducer(state: OutfitState, action: Action): OutfitState {
  switch (action.type) {
    case "setItem": {
      const nextAfter: Outfit = { ...state.after, [action.category]: action.itemId };
      return pushHistory(state, nextAfter);
    }
    case "clearCategory": {
      const nextAfter: Outfit = { ...state.after };
      delete nextAfter[action.category];
      return pushHistory(state, nextAfter);
    }
    case "setBeforeFromAfter":
      return { ...state, before: { ...state.after }, past: [], future: [] };

    case "resetAfterToBefore":
      return { ...state, after: { ...state.before }, past: [], future: [] };

    case "undo": {
      if (state.past.length === 0) return state;
      const prev = state.past[state.past.length - 1];
      return {
        ...state,
        after: prev,
        past: state.past.slice(0, -1),
        future: [state.after, ...state.future],
      };
    }
    case "redo": {
      if (state.future.length === 0) return state;
      const next = state.future[0];
      return {
        ...state,
        after: next,
        past: [...state.past, state.after],
        future: state.future.slice(1),
      };
    }
    case "load":
      return action.state;

    default:
      return state;
  }
}
