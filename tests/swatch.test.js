import { shallowMount } from '@vue/test-utils'
import Swatch from '@/components/settings/swatch.vue'

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Swatch, { propsData: { color: 'green' } })
})

describe('Swatch Component', () => {
  it('exists', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('renders correctly', () => {
    wrapper.setProps({ name: 'example', active: true })
    expect(wrapper.element).toMatchSnapshot()
  })
  it('hides svg if not active', () => {
    expect(wrapper.find('svg').exists()).toBeFalsy()
  })
  it('shows svg if active', () => {
    wrapper.setProps({ active: true })
    expect(wrapper.find('svg').exists()).toBeTruthy()
  })
  it('displays color if no name provided', () => {
    const div = wrapper.find('.color')
    expect(div.text()).toBe('green')
  })
  it('displays name if prop is provided', () => {
    wrapper.setProps({ name: 'hi' })
    const div = wrapper.find('.color')
    expect(div.text()).toBe('hi')
  })
})

afterEach(() => {
  wrapper.destroy()
})
