function displayFileName() {
  let e = document.getElementById('fileInput'),
     t = document.getElementById('fileName'),
     l = e.files[0] ? e.files[0].name : 'No file chosen';
  t.textContent = l
}! function () {
  'use strict';
  let e = (e, t = !1) => (e = e.trim(), t) ? [...document.querySelectorAll(e)] : document.querySelector(e),
     t = (t, l, i, o = !1) => {
        let a = e(l, o);
        a && (o ? a.forEach(e => e.addEventListener(t, i)) : a.addEventListener(t, i))
     },
     l = (e, t) => {
        e.addEventListener('scroll', t)
     },
     i = e('#navbar .scrollto', !0),
     o = () => {
        let t = window.scrollY + 200;
        i.forEach(l => {
           if (!l.hash) return;
           let i = e(l.hash);
           i && (t >= i.offsetTop && t <= i.offsetTop + i.offsetHeight ? l.classList.add('active') : l.classList.remove('active'))
        })
     };
  window.addEventListener('load', o), l(document, o);
  let a = t => {
        let l = e('#header').offsetHeight,
           i = e(t).offsetTop;
        window.scrollTo({
           top: i - l,
           behavior: 'smooth'
        })
     },
     s = e('#header');
  if (s) {
     let n = () => {
        window.scrollY > 100 ? s.classList.add('header-scrolled') : s.classList.remove('header-scrolled')
     };
     window.addEventListener('load', n), l(document, n)
  }
  let r = e('.back-to-top');
  if (r) {
     let c = () => {
        window.scrollY > 100 ? r.classList.add('active') : r.classList.remove('active')
     };
     window.addEventListener('load', c), l(document, c)
  }
  t('click', '.mobile-nav-toggle', function (t) {
     e('#navbar').classList.toggle('navbar-mobile'), this.classList.toggle('bi-list'), this.classList.toggle('bi-x')
  }), t('click', '.navbar .dropdown > a', function (t) {
     e('#navbar').classList.contains('navbar-mobile') && (t.preventDefault(), this.nextElementSibling.classList.toggle('dropdown-active'))
  }, !0), t('click', '.scrollto', function (t) {
     if (e(this.hash)) {
        t.preventDefault();
        let l = e('#navbar');
        if (l.classList.contains('navbar-mobile')) {
           l.classList.remove('navbar-mobile');
           let i = e('.mobile-nav-toggle');
           i.classList.toggle('bi-list'), i.classList.toggle('bi-x')
        }
        a(this.hash)
     }
  }, !0), window.addEventListener('load', () => {
     window.location.hash && e(window.location.hash) && a(window.location.hash)
  });
  let d = e('#preloader');
  d && window.addEventListener('load', () => {
     d.remove()
  }), GLightbox({
     selector: '.glightbox'
  });
  let f = e('.skills-content');
  f && new Waypoint({
     element: f,
     offset: '80%',
     handler: function (t) {
        e('.progress .progress-bar', !0).forEach(e => {
           e.style.width = e.getAttribute('aria-valuenow') + '%'
        })
     }
  }), window.addEventListener('load', () => {
     let l = e('.portfolio-container');
     if (l) {
        let i = new Isotope(l, {
              itemSelector: '.portfolio-item'
           }),
           o = e('#portfolio-flters li', !0);
        t('click', '#portfolio-flters li', function (e) {
           e.preventDefault(), o.forEach(function (e) {
              e.classList.remove('filter-active')
           }), this.classList.add('filter-active'), i.arrange({
              filter: this.getAttribute('data-filter')
           }), i.on('arrangeComplete', function () {
              AOS.refresh()
           })
        }, !0)
     }
  }), GLightbox({
     selector: '.portfolio-lightbox'
  }), new Swiper('.portfolio-details-slider', {
     speed: 400,
     loop: !0,
     autoplay: {
        delay: 5e3,
        disableOnInteraction: !1
     },
     pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: !0
     }
  }), window.addEventListener('load', () => {
     AOS.init({
        duration: 1e3,
        easing: 'ease-in-out',
        once: !0,
        mirror: !1
     })
  })
}();