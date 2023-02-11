import { mount } from '@vue/test-utils';
import TestingComponent from '@/components/common/SoundSwitcher.vue';

const factory = (props = {}) => mount(TestingComponent, props);

describe('SoundSwitcher', () => {
  it('render', () => {
    const wrapper = factory();
    expect(!!wrapper.html()).toBe(true);
  });

  it('gives props (muted true)', () => {
    const wrapper = factory({
      props: {
        muted: true,
      },
    });
    expect(wrapper.getCurrentComponent().props.muted).toBe(true);
  });

  it('gives props (muted false)', () => {
    const wrapper = factory({
      props: {
        muted: false,
      },
    });
    expect(wrapper.getCurrentComponent().props.muted).toBe(false);
  });

  it('render button when muted prop true', () => {
    const wrapper = factory({
      props: {
        muted: true,
      },
    });
    expect(wrapper.html()).toContain('pi-volume-off');
  });

  it('render button when muted prop false', () => {
    const wrapper = factory({
      props: {
        muted: false,
      },
    });
    expect(wrapper.html()).toContain('pi-volume-up');
  });
});
