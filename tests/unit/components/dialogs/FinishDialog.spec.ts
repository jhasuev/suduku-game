import { shallowMount } from '@vue/test-utils';
import TestingComponent from '@/components/dialogs/FinishDialog.vue';

// const factory = (props = {}) => mount(TestingComponent, props);
const props = {
  global: {
    provide: {
      dialogRef: 'dialogRef',
    },
  },
};

describe('FinishDialog', () => {
  it('render', () => {
    const wrapper = shallowMount(TestingComponent, props);
    expect(!!wrapper.html()).toBe(true);
  });

  it('render title', () => {
    const wrapper = shallowMount(TestingComponent, props);
    expect(wrapper.html()).toContain('.title');
  });

  it('render subtitle', () => {
    const wrapper = shallowMount(TestingComponent, props);
    expect(wrapper.html()).toContain('.subtitle');
  });

  it('render button level', () => {
    const wrapper = shallowMount(TestingComponent, props);
    expect(wrapper.html()).toContain('.buttons.level');
  });

  it('render button home', () => {
    const wrapper = shallowMount(TestingComponent, props);
    expect(wrapper.html()).toContain('.buttons.home');
  });
});
