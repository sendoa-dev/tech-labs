/** @type { import('@storybook/vue3').Preview } */

// import '@tech-labs/config-components/styles/button.css'

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
