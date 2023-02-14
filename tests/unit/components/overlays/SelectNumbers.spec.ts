import { mount } from '@vue/test-utils';
import TestingComponent from '@/components/overlays/SelectNumbers.vue';

const data = {
  props: {
    matrix: [
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
    ],
    showClear: true,
  },
};

describe('SelectNumbers', () => {
  it('render', () => {
    const wrapper = mount(TestingComponent, data);
    expect(!!wrapper.html()).toBe(true);
  });

  it('render 4 buttons', () => {
    const wrapper = mount(TestingComponent, data);
    expect(wrapper.findAll('button').length).toBe(4);
  });

  it('render clear button', () => {
    const wrapper = mount(TestingComponent, data);
    expect(wrapper.html()).toContain('clear');
  });
});
