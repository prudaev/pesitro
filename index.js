

window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.classList.add("hide");
  }, 1000); // 2.5 секунды — немного дольше
});

// ===========

window.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.container-header');
  if (!header) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
});

// ========================

let lastScrollY = window.scrollY;
const waButton = document.querySelector('.whatsapp-button');
const homeButton = document.querySelector('.home-button');

let scrollTimeout;

window.addEventListener('scroll', function () {
  if (!waButton) return;

  // Прячем при скролле вниз
  if (homeButton) {
  if (window.scrollY > lastScrollY) {
    homeButton.classList.add('hide');
  } else {
    homeButton.classList.remove('hide');
  }

  homeButton.classList.add('transparent');

  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    homeButton.classList.remove('transparent');
  }, 300);

}


  // Становится прозрачной при любом скролле
  waButton.classList.add('transparent');

  // Если скролл прекращён — убрать прозрачность через 300мс
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    waButton.classList.remove('transparent');
  }, 300);

  lastScrollY = window.scrollY;
});



// ========================

const blocks = document.querySelectorAll('.stat-block');

const duration = 3000;
const easeOutQuint = t => 1 - Math.pow(1 - t, 5);

const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      const el = entry.target;

      // Плавная задержка на основе позиции (чем ниже, тем позже)
      const delay = index * 200; // 0мс, 200мс, 400мс и т.д.

      setTimeout(() => {
        el.classList.add('visible');

        const target = +el.dataset.target;
        const span = el.querySelector('span');
        el.innerHTML = '0+';
        el.appendChild(span);

        let start = null;

        const animate = timestamp => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const easedProgress = easeOutQuint(progress);
          const current = Math.floor(easedProgress * target);
          el.firstChild.textContent = current + '+';

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            el.firstChild.textContent = target + '+';
          }
        };

        requestAnimationFrame(animate);
        observer.unobserve(el);
      }, delay);
    }
  });
}, { threshold: 0.5 });

blocks.forEach(block => observer.observe(block));

// ==================

function handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('block-visible');
      }
    });
  }
  
  let observerOptions = {
    threshold: [0.5]
  };
  
  let visibilityWatcher = new IntersectionObserver(handleIntersection, observerOptions);
  let animatedBlocks = document.querySelectorAll('.block-to-animate');
  
  for (let block of animatedBlocks) {
    visibilityWatcher.observe(block);
  }

  // ==================

  const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.card');
const prevBtn = document.querySelector('.carousel-button.prev');
const nextBtn = document.querySelector('.carousel-button.next');

let currentIndex = 0;
let autoScrollInterval;
visibleCards = getVisibleCards();

function getVisibleCards() {
  const width = window.innerWidth;

  if (width <= 430) {
    return 1;
  } else if (width <= 1024) {
    return 2;
  } else {
    return 3;
  }
}

function getCardWidth() {
  const trackWrapper = document.querySelector('.carousel-track-wrapper');
  return trackWrapper.offsetWidth / visibleCards;
}

function updateCarousel() {
  visibleCards = getVisibleCards(); // обновляем на ресайз
  const cardWidth = getCardWidth();
  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  cards.forEach(card => {
    card.style.flex = `0 0 ${cardWidth}px`;
  });
}

function goToNext() {
  const totalCards = cards.length;
  if (currentIndex < totalCards - visibleCards) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateCarousel();
}

function goToPrev() {
  const totalCards = cards.length;
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = totalCards - visibleCards;
  }
  updateCarousel();
}

nextBtn.addEventListener('click', () => {
  goToNext();
  startAutoScroll();
});

prevBtn.addEventListener('click', () => {
  goToPrev();
  startAutoScroll();
});

function startAutoScroll() {
  autoScrollInterval = setInterval(goToNext, 20000);
}


window.addEventListener('resize', () => {
  updateCarousel();
});

startAutoScroll();
updateCarousel(); // ← обязательно при загрузке


//   ================================
  

document.addEventListener('DOMContentLoaded', function () {
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');

  burger.addEventListener('click', function () {
    menu.classList.toggle('active');
  });
});


// =========================

if (screen.orientation && screen.orientation.lock) {
  screen.orientation.lock('portrait').catch(function (err) {
    console.warn('Orientation lock failed:', err);
  });
}

// =========================
 