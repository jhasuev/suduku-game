import { TAppState } from './modules/app/types';
import { TGameState } from './modules/game/types';

export type TGlobalState = {
  app: TAppState
  game: TGameState
}
