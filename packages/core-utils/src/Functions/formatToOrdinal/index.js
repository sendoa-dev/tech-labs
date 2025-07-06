export default ({ number, suffixesMap = null }) => {
  const pluralRules = new Intl.PluralRules('en-US', { type: 'ordinal' })

  const suffixes = suffixesMap || new Map([
    ['one', 'er'],
    ['two', 'º'],
    ['few', 'er'],
    ['many', 'º'],
    ['zero', ''],
    ['other', 'º'],
  ])

  const rule = pluralRules.select(number)

  return suffixes.get(rule)
}
