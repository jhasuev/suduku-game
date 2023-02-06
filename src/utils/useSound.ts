import store from '@/store/';

import buttonSound from '@/assets/sounds/buttonSound.ogg';
import selectSound from '@/assets/sounds/selectSound.ogg';
import switchSound from '@/assets/sounds/switchSound.ogg';
import backSound from '@/assets/sounds/backSound.ogg';
import popupOpenSound from '@/assets/sounds/popupOpenSound.ogg';
import popupCloseSound from '@/assets/sounds/popupCloseSound.ogg';

type TSoundTypes =
  'buttonSound'
  |'selectSound'
  |'switchSound'
  |'backSound'
  |'popupOpenSound'
  |'popupCloseSound'
;

export default (type: TSoundTypes): void => {
  if (!store.state.soundMuted) {
    const soundsByType = {
      buttonSound,
      selectSound,
      switchSound,
      backSound,
      popupOpenSound,
      popupCloseSound,
    }[type];

    new Audio(soundsByType).play();
  }
};
