import libphonenumber from 'google-libphonenumber'

import getCountryFlagByCode from '@/Data/flags/index.js'
import getCountryNameByCode from '@/Functions/getCountryNameByCode/index.js'

export default ({ locale = 'en' } = {}) => {
  const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance()
  const supportedRegions = phoneUtil.getSupportedRegions()

  const countryList = Array.from(supportedRegions).map(countryKey => {
    const dialCode = phoneUtil.getCountryCodeForRegion(countryKey)

    return {
      id: countryKey.toLowerCase(),
      label: getCountryNameByCode({ locale, code: countryKey }),
      metadata: {
        flag: getCountryFlagByCode({ country: countryKey }),
        name: getCountryNameByCode({ locale, code: countryKey }),
        dialCode: dialCode.toString(),
      },
    }
  })

  return countryList.sort((countryA, countryB) => countryA.id - countryB.id)
}
