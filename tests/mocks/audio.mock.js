/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */

// audio files mocking
const audioBase64 = 'data:audio/wave;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA==';
jest.mock('@/assets/sounds/buttonSound.ogg', () => audioBase64);
jest.mock('@/assets/sounds/selectSound.ogg', () => audioBase64);
jest.mock('@/assets/sounds/switchSound.ogg', () => audioBase64);
jest.mock('@/assets/sounds/backSound.ogg', () => audioBase64);
jest.mock('@/assets/sounds/popupOpenSound.ogg', () => audioBase64);
jest.mock('@/assets/sounds/popupCloseSound.ogg', () => audioBase64);
jest.mock('@/assets/sounds/finishSound.ogg', () => audioBase64);

// Mock for HTMLMediaElement
global.window.HTMLMediaElement.prototype.mock = {
  paused: true,
  duration: NaN,
  loaded: false,
  // Emulates the audio file loading
  load: function audioInit(audio) {
    // Note: we could actually load the file from this.src and get real duration
    // and other metadata.
    // See for example: https://github.com/59naga/mock-audio-element/blob/master/src/index.js
    // For now, the 'duration' and other metadata has to be set manually in test code.
    audio.dispatchEvent(new Event('loadedmetadata'));
    audio.dispatchEvent(new Event('canplaythrough'));
  },
  // Reset audio object mock data to the initial state
  resetMock: function resetMock(audio) {
    audio.mock = {

      ...global.window.HTMLMediaElement.prototype.mock,
    };
  },
};

// Get "paused" value, it is automatically set to true / false when we play / pause the audio.
Object.defineProperty(global.window.HTMLMediaElement.prototype, 'paused', {
  get() {
    return this.mock.paused;
  },
});

// Get and set audio duration
Object.defineProperty(global.window.HTMLMediaElement.prototype, 'duration', {
  get() {
    return this.mock.duration;
  },
  set(value) {
    // Reset the mock state to initial (paused) when we set the duration.
    this.mock.resetMock(this);
    this.mock.duration = value;
  },
});

// Start the playback.
global.window.HTMLMediaElement.prototype.play = function playMock() {
  if (!this.mock.loaded) {
    // emulate the audio file load and metadata initialization
    this.mock.load(this);
  }
  this.mock.paused = false;
  this.dispatchEvent(new Event('play'));
  // Note: we could
};

// Pause the playback
global.window.HTMLMediaElement.prototype.pause = function pauseMock() {
  this.mock.paused = true;
  this.dispatchEvent(new Event('pause'));
};
