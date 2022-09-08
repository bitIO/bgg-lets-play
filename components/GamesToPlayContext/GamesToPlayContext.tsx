import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from 'react';

import { Game, Play, ShouldPlay } from '../../types';

type GamesToPlayState = {
  selectedGameId?: string;
  selectedGameInfo?: Game;
  selectedGamePlays?: Play[];
  shouldPlayItems: ShouldPlay[];
};
type GamesToPlayAction =
  | { payload: { id: string }; type: 'setSelectedGameId' }
  | { type: 'unsetSelectedGameId' }
  | { payload: { items: ShouldPlay[] }; type: 'initialize' };
type GamesToPlayDispatch = (action: GamesToPlayAction) => void;

const GamesToPlayContext = createContext<
  | {
      gamesToPlayDispatch: GamesToPlayDispatch;
      gamesToPlayState: GamesToPlayState;
    }
  | undefined
>(undefined);

function gamesToPlayReducer(
  state: GamesToPlayState,
  action: GamesToPlayAction,
): GamesToPlayState {
  switch (action.type) {
    case 'initialize':
      return {
        ...state,
        selectedGameId: undefined,
        selectedGameInfo: undefined,
        selectedGamePlays: undefined,
        shouldPlayItems: action.payload.items,
      };
    case 'setSelectedGameId': {
      const selected = state.shouldPlayItems.find((entry) => {
        return entry.game.id === +action.payload.id;
      });
      return {
        ...state,
        selectedGameId: action.payload.id,
        selectedGameInfo: selected ? selected.game : undefined,
        selectedGamePlays: selected ? selected.plays : undefined,
      };
    }
    case 'unsetSelectedGameId':
      return {
        ...state,
        selectedGameId: undefined,
        selectedGameInfo: undefined,
        selectedGamePlays: undefined,
      };

    default:
      throw new Error(`Unhandled action: ${JSON.stringify(action)}`);
  }
}

function GamesToPlayProvider({
  initialState,
  children,
}: {
  children: ReactNode;
  initialState: GamesToPlayState;
}) {
  const [gamesToPlayState, gamesToPlayDispatch] = useReducer(
    gamesToPlayReducer,
    initialState,
  );
  const value = useMemo(() => {
    return {
      gamesToPlayDispatch,
      gamesToPlayState,
    };
  }, [gamesToPlayState]);

  return (
    <GamesToPlayContext.Provider value={value}>
      {children}
    </GamesToPlayContext.Provider>
  );
}

function useGamesToPlay() {
  const context = useContext(GamesToPlayContext);
  if (context === undefined) {
    throw new Error(
      'userGamesToPlay must be used within a GamesToPlayProvider',
    );
  }
  return context;
}

export { GamesToPlayContext, GamesToPlayProvider, useGamesToPlay };
