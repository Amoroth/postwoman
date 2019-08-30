import { shallowMount } from '@vue/test-utils'
import Section from '@/components/section.vue'

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Section, {
    propsData: { collapsed: false },
    slots: {
      default: '<div id="test">inserted element</div>'
    },
    mocks: {
      $store: {
        state: {
          postwoman: {
            settings: {
              DISABLE_FRAME_COLORS: false
            }
          }
        }
      }
    }
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('Section Component', () => {
  it('exists', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('fieldset has correct class and id', () => {
    const fieldset = wrapper.find('fieldset')
    expect(fieldset.attributes('id')).toBe('section')
    expect(fieldset.classes('no-colored-frames')).toBe(false)
  })
  it('legend has correct text', () => {
    const legend = wrapper.find('legend')
    expect(legend.text()).toBe('Section ↕')
  })
  it('content is inserted in slot', () => {
    const slot = wrapper.find('#test')
    expect(slot.exists()).toBeTruthy()
    expect(slot.text()).toBe('inserted element')
  })
  it('renders div collapsed', () => {
    const collapsible = wrapper.find('.collapsible')
    expect(collapsible.classes('hidden')).toBeFalsy()
    wrapper.setProps({ collapsed: true })
    expect(collapsible.classes('hidden')).toBeTruthy()
  })
  it('collapses on clicking legend', () => {
    const collapsible = wrapper.find('.collapsible')
    const legend = wrapper.find('legend')
    expect(collapsible.classes('hidden')).toBeFalsy()
    legend.trigger('click')
    expect(collapsible.classes('hidden')).toBeTruthy()
  })
})
