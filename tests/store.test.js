import { mutations, state } from '@/store/postwoman'

describe('postwoman store', () => {
  it('applies setting', () => {
    const newState = state()
    mutations.applySetting(newState, ['THEME_CLASS', 'new-class'])
    expect(newState.settings.THEME_CLASS).toBe('new-class')
  })
  it('throws error on wrong setting', () => {
    const newState = state()
    expect(() => mutations.applySetting(newState, null)).toThrow()
    expect(() => mutations.applySetting(newState, { 'THEME_CLASS': 'new-class' })).toThrow()
    expect(() => mutations.applySetting(newState, ['THEME_CLASS', 'new-class', 'other-class'])).toThrow()
    expect(() => mutations.applySetting(newState, ['THEME_COLOR_VIBRANT'])).toThrow()
    expect(() => mutations.applySetting(newState, ['WRONG_SETTING', true]))
  })
})
