import { mount } from '@vue/test-utils';
import TestingComponent from '@/components/common/TopMenu.vue';
// TODO замокать сторе
// FIXME createLocalVue не импортируется никак...

const factory = (props = {}) => mount(TestingComponent, props);
const props = {};

describe('TopMenu', () => {
  it('render', () => {
    // const wrapper = factory({ props });
    // expect(!!wrapper.html()).toBe(true);
  });
});
