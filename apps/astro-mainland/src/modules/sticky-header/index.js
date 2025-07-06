document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.sticky-header')
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.remove('-translate-y-full')
      header?.classList.add('translate-y-0')
    } else {
      header?.classList.add('-translate-y-full')
      header?.classList.remove('translate-y-0')
    }
  })
})
