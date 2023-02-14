import { mount } from '@vue/test-utils';
import TestingComponent from '@/components/overlays/LanguageSwitcher.vue';

const props = {};

describe('LanguageSwitcher', () => {
  it('render', () => {
    const wrapper = mount(TestingComponent, props);
    expect(!!wrapper.html()).toBe(true);
  });

  it('render 2+ button tags', () => {
    const wrapper = mount(TestingComponent, props);
    expect(wrapper.findAll('button').length).toBeGreaterThanOrEqual(2);
  });
});
