export const cartesian = (...args) => {
  return args.reduce((acc, arr) => acc.flatMap(x => arr.map(y => [x, y].flat())), [[]])
}

export const generateComponentPlayground = ({ component, args = {}, template }) => {
  const Template = (args) => ({
    components: { CoreComponent: component },
    setup () { return { args } },
    template: template || `
      <div style="margin: 10px">
        <CoreComponent v-bind="args">Placeholder</CoreComponent>
      </div>
    `,
  })

  const Story = Template.bind({})
  Story.args = { ...args }

  return Story
}

export const generateComponentCombinations = ({ component, args = {}, template }) => {
  const Template = () => ({
    components: { CoreComponent: component },
    setup () {
      const keys = Object.keys(args)
      const values = keys.map(key => args[key])

      const allArgs = cartesian(...values).map(combination => {
        const obj = {}
        keys.forEach((key, index) => {
          obj[key] = combination[index]
        })

        return obj
      })

      return { allArgs }
    },
    template: template || `
      <div style="margin: 10px" v-for="args in allArgs" :key="args.key">
        <CoreComponent v-bind="args">Placeholder</CoreComponent>
      </div>
    `,
  })

  const Story = Template.bind({})
  Story.args = { ...args }

  return Story
}

export const generateUtilPlayground = ({ fn, args = {}, template }) => {
  const Template = (args) => ({
    setup () { return { args, fn } },
    template: template || `
      <div style="margin: 10px">
        <div>Input: {{ args }}</div>
        <div>Output: {{ fn(args) }}</div>
      </div>
    `,
  })

  const Story = Template.bind({})
  Story.args = { ...args }

  return Story
}

export const generateUtilCombinations = ({ fn, args = {}, template }) => {
  const Template = () => ({
    setup () {
      const keys = Object.keys(args)
      const values = keys.map(key => args[key])

      const allArgs = cartesian(...values).map(combination => {
        const obj = {}
        keys.forEach((key, index) => {
          obj[key] = combination[index]
        })

        return obj
      })

      return { allArgs, fn }
    },
    template: template || `
      <div style="margin: 10px" v-for="args in allArgs" :key="args.key">
        <div>Input: {{ args }}</div>
        <div>Output: {{ fn(args) }}</div>
      </div>
    `,
  })

  const Story = Template.bind({})
  Story.args = { ...args }

  return Story
}
