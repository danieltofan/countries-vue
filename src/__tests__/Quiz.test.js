import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Quiz from '../views/Quiz.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/quiz', component: Quiz }
  ]
})

describe('Quiz.vue', () => {
  it('renders the main heading', async () => {
    const wrapper = mount(Quiz, {
      global: { plugins: [router] }
    })
    await router.isReady()
    expect(wrapper.text()).toContain('Geography Quiz')
  })

  it('shows quiz type selection initially', async () => {
    const wrapper = mount(Quiz, {
      global: { plugins: [router] }
    })
    await router.isReady()
    expect(wrapper.text()).toContain('Choose a Quiz Type')
    expect(wrapper.text()).toContain('Guess the Flag')
    expect(wrapper.text()).toContain('Guess the Capital')
    expect(wrapper.text()).toContain('Higher or Lower')
  })

  it('has start quiz button', async () => {
    const wrapper = mount(Quiz, {
      global: { plugins: [router] }
    })
    await router.isReady()
    const startButton = wrapper.findAll('button').find(b => b.text().includes('Start Quiz'))
    expect(startButton).toBeDefined()
  })

  it('allows selecting quiz type', async () => {
    const wrapper = mount(Quiz, {
      global: { plugins: [router] }
    })
    await router.isReady()

    const capitalButton = wrapper.findAll('button').find(b => b.text().includes('Guess the Capital'))
    await capitalButton.trigger('click')

    expect(capitalButton.classes()).toContain('border-primary-500')
  })

  it('starts game when start button clicked', async () => {
    const wrapper = mount(Quiz, {
      global: { plugins: [router] }
    })
    await router.isReady()

    const startButton = wrapper.findAll('button').find(b => b.text().includes('Start Quiz'))
    await startButton.trigger('click')

    expect(wrapper.text()).toContain('Question')
    expect(wrapper.text()).toContain('Score')
  })

  it('shows question during game', async () => {
    const wrapper = mount(Quiz, {
      global: { plugins: [router] }
    })
    await router.isReady()

    const startButton = wrapper.findAll('button').find(b => b.text().includes('Start Quiz'))
    await startButton.trigger('click')

    expect(wrapper.text()).toContain('Which country does this flag belong to?')
  })

  it('shows answer options', async () => {
    const wrapper = mount(Quiz, {
      global: { plugins: [router] }
    })
    await router.isReady()

    const startButton = wrapper.findAll('button').find(b => b.text().includes('Start Quiz'))
    await startButton.trigger('click')

    const optionButtons = wrapper.findAll('button').filter(b =>
      !b.text().includes('Question') &&
      !b.text().includes('Score') &&
      !b.text().includes('Next')
    )
    expect(optionButtons.length).toBeGreaterThanOrEqual(4)
  })

  it('shows next button after answering', async () => {
    const wrapper = mount(Quiz, {
      global: { plugins: [router] }
    })
    await router.isReady()

    const startButton = wrapper.findAll('button').find(b => b.text().includes('Start Quiz'))
    await startButton.trigger('click')

    // Find and click an answer option
    const optionButtons = wrapper.findAll('button').filter(b => {
      const text = b.text()
      return !text.includes('Question') && !text.includes('Score') && text.length > 0 && text.length < 50
    })

    if (optionButtons.length > 0) {
      await optionButtons[0].trigger('click')
      expect(wrapper.text()).toContain('Next Question')
    }
  })

  it('tracks score correctly', async () => {
    const wrapper = mount(Quiz, {
      global: { plugins: [router] }
    })
    await router.isReady()

    const startButton = wrapper.findAll('button').find(b => b.text().includes('Start Quiz'))
    await startButton.trigger('click')

    expect(wrapper.text()).toContain('Score: 0')
  })

  it('shows question counter', async () => {
    const wrapper = mount(Quiz, {
      global: { plugins: [router] }
    })
    await router.isReady()

    const startButton = wrapper.findAll('button').find(b => b.text().includes('Start Quiz'))
    await startButton.trigger('click')

    expect(wrapper.text()).toContain('Question 1 of 10')
  })

  it('shows final score after completing quiz', async () => {
    const wrapper = mount(Quiz, {
      global: { plugins: [router] }
    })
    await router.isReady()

    // Start the game
    const startButton = wrapper.findAll('button').find(b => b.text().includes('Start Quiz'))
    await startButton.trigger('click')

    // Answer all 10 questions
    for (let i = 0; i < 10; i++) {
      // Find answer buttons (excluding UI buttons)
      const answerButtons = wrapper.findAll('button').filter(b => {
        const text = b.text()
        return !text.includes('Question') &&
          !text.includes('Score') &&
          !text.includes('Next') &&
          !text.includes('See Results') &&
          text.length > 0
      })

      if (answerButtons.length > 0) {
        await answerButtons[0].trigger('click')
      }

      // Click next button
      const nextButton = wrapper.findAll('button').find(b =>
        b.text().includes('Next Question') || b.text().includes('See Results')
      )
      if (nextButton) {
        await nextButton.trigger('click')
      }
    }

    expect(wrapper.text()).toContain('Quiz Complete')
    expect(wrapper.text()).toContain('/10')
  })

  it('has play again button after completing', async () => {
    const wrapper = mount(Quiz, {
      global: { plugins: [router] }
    })
    await router.isReady()

    // Start and complete quiz quickly
    const startButton = wrapper.findAll('button').find(b => b.text().includes('Start Quiz'))
    await startButton.trigger('click')

    for (let i = 0; i < 10; i++) {
      const answerButtons = wrapper.findAll('button').filter(b => {
        const text = b.text()
        return !text.includes('Question') && !text.includes('Score') && !text.includes('Next') && text.length > 0 && text.length < 50
      })
      if (answerButtons.length > 0) await answerButtons[0].trigger('click')

      const nextButton = wrapper.findAll('button').find(b => b.text().includes('Next Question') || b.text().includes('See Results'))
      if (nextButton) await nextButton.trigger('click')
    }

    expect(wrapper.text()).toContain('Play Again')
  })
})
