import { shallowMount } from '@vue/test-utils'
import ErrorLayout from '@/layouts/error.vue'

let wrapper
const testError = new Error('test error')
testError.statusCode = 'ECODE'

beforeEach(() => {
  wrapper = shallowMount(ErrorLayout, {
    stubs: {
      'nuxt-link': true
    },
    mocks: {
      $router: {
        push: jest.fn()
      }
    },
    propsData: {
      error: testError
    }
  })
})

describe('Error Layout', () => {
  it('exists', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('renders page-error class', () => {
    const classes = wrapper.find('div').classes()
    expect(classes).toContain('page')
    expect(classes).toContain('page-error')
  })
  it('renders status code and message', () => {
    expect(wrapper.find('h1').text()).toBe(testError.statusCode)
    expect(wrapper.find('h2').text()).toBe(testError.message)
  })
  it('renders link to /', () => {
    const link = wrapper.find('nuxt-link-stub')
    expect(link.exists()).toBeTruthy()
    expect(link.attributes('to')).toBe('/')
  })
  it('reloads page through link', () => {
    const link = wrapper.find('a')
    expect(link.exists()).toBeTruthy()
    expect(link.text()).toBe('Reload')
    link.trigger('click')
    expect(wrapper.vm.$router.push).toBeCalledWith('/', expect.any(Function))
  })
  it('sets sticky-footer class', () => {
    expect(wrapper.vm.$options.head()).toEqual({ bodyAttrs: { class: 'sticky-footer' } })
  })
})

afterEach(() => {
  wrapper.destroy()
})
