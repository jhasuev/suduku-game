import { mount } from '@vue/test-utils';
import TestingComponent from '@/components/common/TimerBox.vue';

const factory = (props = {}) => mount(TestingComponent, props);

describe('TimerBox', () => {
  it('render', () => {
    const wrapper = factory();
    expect(!!wrapper.html()).toBe(true);

    console.log(wrapper.html());
  });
});
