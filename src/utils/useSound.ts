import store from '@/store/';

import buttonSound from '@/assets/sounds/buttonSound.ogg';
import selectSound from '@/assets/sounds/selectSound.ogg';
import switchSound from '@/assets/sounds/switchSound.ogg';
import backSound from '@/assets/sounds/backSound.ogg';
import popupOpenSound from '@/assets/sounds/popupOpenSound.ogg';
import popupCloseSound from '@/assets/sounds/popupCloseSound.ogg';
import finishSound from '@/assets/sounds/finishSound.ogg';

type TSoundTypes =
  'buttonSound'
  |'selectSound'
  |'switchSound'
  |'backSound'
  |'popupOpenSound'
  |'popupCloseSound'
  |'finishSound'
;

export default (type: TSoundTypes, volume?:number): void => {
  const soundsByType = {
    buttonSound,
    selectSound,
    switchSound,
    backSound,
    popupOpenSound,
    popupCloseSound,
    finishSound,
  }[type];

  const audio = new Audio(soundsByType);
  audio.volume = volume ?? +!store.state.soundMuted;
  audio.play();
};
