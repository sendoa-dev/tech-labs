import IMask from 'imask'

export default (input) => IMask(input, {
  mask: [
    {
      mask: /^\+?\d{0,4}$/,
      lazy: false,
    },
    {
      mask: /^[A-Za-zñÑáéíóúÁÉÍÓÚüÜôÔãÃâÂêÊîÎõÕöÖäÄåÅæÆøØ&\s.,\-()'’]*$/,
      lazy: false,
    },
  ],
})
