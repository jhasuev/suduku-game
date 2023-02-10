import { mount } from '@vue/test-utils';
import MatrixTable from '@/components/common/MatrixTable.vue';

describe('MatrixTable', () => {
  const values = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  it('render necessary tr count', () => {
    const wrapper = mount(MatrixTable, {
      props: { values },
    });
    expect(wrapper.findAll('tr').length).toBe(values.length);
  });

  it('render necessary td count', () => {
    const wrapper = mount(MatrixTable, {
      props: { values },
    });
    expect(wrapper.findAll('td').length).toBe(values.flat().length);
  });

  it('render slot', () => {
    const content = '123456789';

    const wrapper = mount(MatrixTable, {
      props: { values },
      slots: {
        column: content,
      },
    });
    expect(wrapper.html()).toContain(content);
  });

  it('has disabled class when put disabled prop', () => {
    const disabledClass = 'table--disabled';
    const wrapper = mount(MatrixTable, {
      props: {
        values,
        disabled: true,
      },
    });
    expect(wrapper.classes()).toContain(disabledClass);
  });
});
