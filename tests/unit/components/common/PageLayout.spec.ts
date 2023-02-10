import { mount } from '@vue/test-utils';
import TestingComponent from '@/components/common/PageLayout.vue';

describe('PageLayout', () => {
  it('render', () => {
    const wrapper = mount(TestingComponent);
    expect(!!wrapper.html()).toBe(true);
  });

  it('render props', () => {
    const title = 'just some title...';
    const subtitle = 'just some subtitle...';

    const wrapper = mount(TestingComponent, {
      props: {
        title,
        subtitle,
      },
    });

    expect(wrapper.html()).toContain(title);
    expect(wrapper.html()).toContain(subtitle);
  });

  it('render backpath prop (back button)', () => {
    const backpath = '/';

    const wrapper = mount(TestingComponent, {
      props: {
        backpath,
      },
    });

    expect(wrapper.html()).toContain('<button');
  });

  it('render slot', () => {
    const content = 'just some content...';

    const wrapper = mount(TestingComponent, {
      slots: {
        default: content,
      },
    });

    expect(wrapper.html()).toContain(content);
  });
});
