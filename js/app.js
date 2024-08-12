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
  autoplay: { delay: 2500 },
  breakpoints: { 900: { autoplay: true } },
})

new Swiper('#reviewed-slider', {
  slidesPerView: 4,
  spaceBetween: 30,
  grabCursor: true,
  autoplay: {
    delay: 2500,
  },
  breakpoints: {
    320: { slidesPerView: 1 },
    550: { slidesPerView: 2 },
    700: { slidesPerView: 2, spaceBetween: 20 },
    900: { slidesPerView: 3 },
    1250: { slidesPerView: 4 },
  },
})

const toggleNavbar = () => {
  const navbar = getElement.one('.navbar')
  const activeCls = 'navbar--small'

  const toggle = clsMethod => navbar.classList[clsMethod](activeCls)

  const scroll = () => {
    if (window.innerWidth <= 980) return toggle('add')
    if (window.scrollY >= 225) return toggle('add')

    toggle('remove')
  }

  scroll()

  window.addEventListener('scroll', scroll)
  window.addEventListener('resize', scroll)
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
        return (el.className = data.mainClass)
      }

      el.classList[clsMethod](data.class)
    })
  }

  btnsOpen.forEach(btn => toggle({ ...show, btn }))
  bntsClose.forEach(btn => toggle({ ...hide, btn }))
}

const toggleScrollUp = () => {
  const fixed = getElement.one('[data-fixed]')
  const scrollUp = getElement.one('[data-scrollup]')
  const activeCls = 'fixed--scroll'

  window.addEventListener('scroll', () => {
    if (window.scrollY >= 225) {
      fixed.classList.add(activeCls)
    } else {
      fixed.classList.remove(activeCls)
    }
  })

  scrollUp.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

toggleNavbar()
toggleScrollUp()
showElements()
