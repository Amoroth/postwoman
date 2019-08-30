import { shallowMount, mount } from '@vue/test-utils'
import Logo from '@/components/Logo.vue'

describe('Logo Component', () => {
  it('exists', () => {
    const wrapper = shallowMount(Logo)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('renders correctly', () => {
    const wrapper = mount(Logo)
    expect(wrapper.element).toMatchSnapshot()
  })
  it('changes color with prop', () => {
    const wrapper = shallowMount(Logo, { propsData: { color: 'red' } })
    const svgPath = wrapper.find('#path3816')
    expect(svgPath.attributes('fill')).toBe('red')
    wrapper.setProps({ color: 'green' })
    expect(svgPath.attributes('fill')).toBe('green')
  })
})
