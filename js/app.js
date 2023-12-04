const getElement = {
  one: selector => document.querySelector(selector),
  all: selector => document.querySelectorAll(selector),
}

new Swiper('#preview-slider', {
  pagination: { el: '#preview-pagination', clickable: true },
  navigation: {
    nextEl: '#preview-button-next',
    prevEl: '#preview-button-prev',
  },
})

new Swiper('#reviewed-slider', {
  slidesPerView: 4,
  spaceBetween: 30,
})

const toggleNavbar = () => {
  const navbar = getElement.one('.navbar')
  const activeCls = 'navbar--small'

  const scroll = () => {
    if (window.scrollY >= 225) {
      navbar.classList.add(activeCls)
    } else {
      navbar.classList.remove(activeCls)
    }
  }

  scroll()

  window.addEventListener('scroll', scroll)
}

const showElements = () => {
  const btnsOpen = getElement.all('[data-open]')
  const bntsClose = getElement.all('[data-close]')
  const hide = { clsMethod: 'remove', dataAttr: 'data-close' }
  const show = { clsMethod: 'add', dataAttr: 'data-open' }

  const toggle = ({ btn, clsMethod, dataAttr }) => {
    const data = JSON.parse(btn.getAttribute(dataAttr))
    const el = getElement.one(`[data-el=${data.el}]`)

    btn.addEventListener('click', () => {
      if (!data.class) {
        return (el.className = data.el)
      }

      el.classList[clsMethod](data.class)
    })
  }

  btnsOpen.forEach(btn => toggle({ ...show, btn }))
  bntsClose.forEach(btn => toggle({ ...hide, btn }))
}

toggleNavbar()
showElements()
