import { mount } from '@vue/test-utils';
import TestingComponent from '@/components/common/TimerBox.vue';

const factory = (props = {}) => mount(TestingComponent, props);
const props = {
  startTime: 1 * 1000,
  finishTime: 90 * 1000 + 1000,
};

describe('TimerBox', () => {
  it('render', () => {
    const wrapper = factory({ props });
    expect(!!wrapper.html()).toBe(true);
  });

  it('props working', () => {
    const wrapper = factory({ props });

    expect(wrapper.getCurrentComponent().props.startTime).toBe(props.startTime);
    expect(wrapper.getCurrentComponent().props.finishTime).toBe(props.finishTime);
  });

  it('minutes and seconds renders currectly', () => {
    const wrapper = factory({ props });

    expect(wrapper.text()).toContain('1');
    expect(wrapper.text()).toContain('30');
  });

  it('if finish time is not given', () => {
    const wrapper = factory({ props: { ...props, finishTime: undefined } });

    expect(wrapper.text()).toMatch(/[0-9]{5,}/);
  });
});
