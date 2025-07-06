import ISO31661 from 'iso-3166-1'

import getCountryFlagByCode from '@/Data/flags/index.js'
import getCountryNameByCode from '@/Functions/getCountryNameByCode/index.js'

export default ({ locale = 'en' } = {}) => {
  const countriesMetadata = ISO31661.all()

  return countriesMetadata.reduce((countryCarry, country) => {
    return [
      ...countryCarry, {
        id: country.alpha2.toLowerCase(),
        label: getCountryNameByCode({ locale, code: country.alpha2 }),
        metadata: {
          flag: getCountryFlagByCode({ country: country.alpha2 }),
          name: getCountryNameByCode({ locale, code: country.alpha2 }),
        },
      },
    ]
  }, [])
    .sort((countryA, countryB) => countryA.id - countryB.id)
}
