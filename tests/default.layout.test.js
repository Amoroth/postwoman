import { shallowMount } from '@vue/test-utils'
import * as intializePwa from '../assets/js/pwa'
import Default from '@/layouts/default.vue'
import Logo from '@/components/logo.vue'

let wrapper
const showInstallPromptMock = jest.fn()
const intializePwaMock = jest.fn(() => showInstallPromptMock)
intializePwa.default = intializePwaMock

beforeEach(() => {
  wrapper = shallowMount(Default, {
    stubs: {
      'nuxt': true,
      'nuxt-link': true
    },
    mocks: {
      $store: {
        state: {
          postwoman: {
            settings: {
              THEME_CLASS: null,
              THEME_COLOR: null,
              THEME_COLOR_VIBRANT: null
            }
          }
        }
      }
    }
  })
})

describe('Default Layout', () => {
  it('exists', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('header contains .slide-in and nav', () => {
    const header = wrapper.find('header')
    expect(header.contains('.slide-in')).toBeTruthy()
    expect(header.contains('nav')).toBeTruthy()
  })
  it('renders div.slide-in', () => {
    expect(wrapper.find('.slide-in').exists()).toBeTruthy()
  })
  it('div.slide-in link points to /', () => {
    const div = wrapper.find('.slide-in')
    expect(div.find('nuxt-link-stub').attributes('to')).toBe('/')
  })
  it('div.slide-in contains logo', () => {
    const div = wrapper.find('.slide-in')
    expect(div.find('h1').classes('logo')).toBeTruthy()
    expect(div.find('logo-stub').is(Logo)).toBeTruthy()
  })
  it('renders nav', () => {
    expect(wrapper.find('nav').exists()).toBeTruthy()
  })
  it('nav contains link to /', () => {
    const nav = wrapper.find('nav')
    expect(nav.contains('nuxt-link-stub[to="/"]')).toBeTruthy()
  })
  it('nav contains link to /websocket', () => {
    const nav = wrapper.find('nav')
    expect(nav.contains('nuxt-link-stub[to="/websocket"]')).toBeTruthy()
  })
  it('nav contains link to /settings', () => {
    const nav = wrapper.find('nav')
    expect(nav.contains('nuxt-link-stub[to="/settings"]')).toBeTruthy()
  })
  it('nav contains settings cog', () => {
    const nav = wrapper.find('nav')
    expect(nav.find('svg').exists()).toBeTruthy()
  })
  it('contains nuxt placeholder', () => {
    expect(wrapper.find('nuxt-stub').exists()).toBeTruthy()
    expect(wrapper.find('nuxt-stub').attributes('id')).toBe('main')
  })
  it('renders footer', () => {
    expect(wrapper.find('footer').exists()).toBeTruthy()
  })
  it('footer contains link to github', () => {
    const footer = wrapper.find('footer')
    expect(footer.contains('a')).toBeTruthy()
    expect(footer.find('a').text()).toBe('GitHub')
    expect(footer.find('a').attributes('href')).toBe('https://github.com/liyasthomas/postwoman')
  })
  it('link to github contains img', () => {
    const link = wrapper.find('footer a')
    expect(link.contains('img')).toBeTruthy()
    expect(link.find('img').attributes('src')).toBe('~static/icons/github.svg')
  })
  it('footer contains button to install pwa', () => {
    const footer = wrapper.find('footer')
    expect(footer.contains('button#installPWA')).toBeTruthy()
  })
  it('initializes pwa on mounted', () => {
    expect(intializePwaMock).toBeCalled()
    expect(wrapper.vm.$data.showInstallPrompt).not.toBeNull()
  })
  it('shows install prompt on button click', () => {
    const footer = wrapper.find('footer')
    footer.find('button#installPWA').trigger('click')
    expect(showInstallPromptMock).toBeCalled()
  })
  it('loades theme settings', () => {
    const setPropertyMock = jest.fn()
    document.documentElement.style.setProperty = setPropertyMock
    wrapper.vm.$mount()

    expect(document.documentElement.className).toBe('')
    expect(setPropertyMock).toBeCalledWith('--ac-color', '#51FF0D')
    expect(setPropertyMock).lastCalledWith('--act-color', '#121212')
  })
  it('loades theme settings from vuex', () => {
    wrapper.vm.$store.state.postwoman.settings.THEME_CLASS = 'test-class'
    wrapper.vm.$store.state.postwoman.settings.THEME_COLOR = '#F3F3F3'
    wrapper.vm.$store.state.postwoman.settings.THEME_COLOR_VIBRANT = false

    const setPropertyMock = jest.fn()
    document.documentElement.style.setProperty = setPropertyMock
    wrapper.vm.$mount()

    expect(document.documentElement.className).toBe('test-class')
    expect(setPropertyMock).toBeCalledWith('--ac-color', '#F3F3F3')
    expect(setPropertyMock).lastCalledWith('--act-color', '#fff')
  })
})

afterEach(() => {
  wrapper.destroy()
})
