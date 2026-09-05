import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';

import type { MatchResult, Reaction } from '@/lib/types';

type State = {
  reactions: Reaction[];
  matchResult: MatchResult | null;
  likedPersonIds: string[];
  savedMajorIds: string[];
};

type Action =
  | { type: 'setReaction'; reaction: Reaction }
  | { type: 'setMatchResult'; matchResult: MatchResult }
  | { type: 'toggleLiked'; personId: string }
  | { type: 'setPersonLiked'; personId: string; liked: boolean }
  | { type: 'saveMajor'; majorId: string }
  | { type: 'reset' };

const initialState: State = {
  reactions: [],
  matchResult: null,
  likedPersonIds: [],
  savedMajorIds: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setReaction': {
      const reactions = [
        ...state.reactions.filter((r) => r.scenarioId !== action.reaction.scenarioId),
        action.reaction,
      ];
      return { ...state, reactions };
    }
    case 'setMatchResult':
      return { ...state, matchResult: action.matchResult };
    case 'toggleLiked': {
      const liked = state.likedPersonIds.includes(action.personId)
        ? state.likedPersonIds.filter((id) => id !== action.personId)
        : [...state.likedPersonIds, action.personId];
      return { ...state, likedPersonIds: liked };
    }
    case 'setPersonLiked': {
      const already = state.likedPersonIds.includes(action.personId);
      if (action.liked) {
        if (already) return state;
        return { ...state, likedPersonIds: [...state.likedPersonIds, action.personId] };
      }
      if (!already) return state;
      return {
        ...state,
        likedPersonIds: state.likedPersonIds.filter((id) => id !== action.personId),
      };
    }
    case 'saveMajor': {
      if (state.savedMajorIds.includes(action.majorId)) return state;
      return { ...state, savedMajorIds: [...state.savedMajorIds, action.majorId] };
    }
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

type AppStateValue = State & {
  setReaction: (reaction: Reaction) => void;
  setMatchResult: (matchResult: MatchResult) => void;
  toggleLiked: (personId: string) => void;
  setPersonLiked: (personId: string, liked: boolean) => void;
  isLiked: (personId: string) => boolean;
  saveMajor: (majorId: string) => void;
  isMajorSaved: (majorId: string) => boolean;
  reset: () => void;
};

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo<AppStateValue>(
    () => ({
      ...state,
      setReaction: (reaction) => dispatch({ type: 'setReaction', reaction }),
      setMatchResult: (matchResult) => dispatch({ type: 'setMatchResult', matchResult }),
      toggleLiked: (personId) => dispatch({ type: 'toggleLiked', personId }),
      setPersonLiked: (personId, liked) =>
        dispatch({ type: 'setPersonLiked', personId, liked }),
      isLiked: (personId) => state.likedPersonIds.includes(personId),
      saveMajor: (majorId) => dispatch({ type: 'saveMajor', majorId }),
      isMajorSaved: (majorId) => state.savedMajorIds.includes(majorId),
      reset: () => dispatch({ type: 'reset' }),
    }),
    [state],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppStateValue {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}
