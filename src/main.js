const hamMenu = document.querySelector('#ham-menu')
const hamMenu1 = document.querySelector('#ham-menu1')
const hamMenu2 = document.querySelector('#ham-menu2')
const hamMenu3 = document.querySelector('#ham-menu3')
const navMenu = document.querySelector('#nav-menu')
const slider = document.getElementById('slider');
const slides = slider.querySelectorAll('img');
let current = 0;
let startX = 0;
let isDragging = false;
let autoSlideInterval;

function updateSliderImages() {
  if (window.innerWidth < 768) {
    // حالت موبایل
    slides[0].src = '/img/mobArtboard-1@4x.png';
    slides[1].src = '/img/mobslider-01.jpg';
  } else {
    // حالت دسکتاپ
    slides[0].src = '/img/Artboard-1@4x.png';
    slides[1].src = '/img/slider-01-1.jpg';
  }
}

// اجرا هنگام لود صفحه
updateSliderImages();

// اجرا هنگام تغییر سایز
window.addEventListener('resize', updateSliderImages);

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('opacity-100', i === index);
    slide.classList.toggle('opacity-0', i !== index);
  });
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 3000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// --- Touch Events ---
slider.addEventListener('touchstart', e => {
  stopAutoSlide();
  startX = e.touches[0].clientX;
  isDragging = true;
});

slider.addEventListener('touchend', e => {
  if (!isDragging) return;
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  if (diff > 50) {
    current = (current - 1 + slides.length) % slides.length;
  } else if (diff < -50) {
    current = (current + 1) % slides.length;
  }
  showSlide(current);
  startAutoSlide();
  isDragging = false;
});

// --- Mouse Events ---
slider.addEventListener('mousedown', e => {
  stopAutoSlide();
  startX = e.clientX;
  isDragging = true;
  slider.classList.add('cursor-grabbing');
});

slider.addEventListener('mouseup', e => {
  if (!isDragging) return;
  const endX = e.clientX;
  const diff = endX - startX;

  if (diff > 50) {
    current = (current - 1 + slides.length) % slides.length;
  } else if (diff < -50) {
    current = (current + 1) % slides.length;
  }
  showSlide(current);
  startAutoSlide();
  isDragging = false;
  slider.classList.remove('cursor-grabbing');
});

slider.addEventListener('mouseleave', e => {
  if (isDragging) {
    // وقتی موس از اسلایدر خارج میشه درگ رو تموم کن
    showSlide(current);
    startAutoSlide();
    isDragging = false;
    slider.classList.remove('cursor-grabbing');
  }
});

// جلوگیری از انتخاب متن موقع درگ
slider.addEventListener('dragstart', e => {
  e.preventDefault();
});

// شروع اولیه
showSlide(current);
startAutoSlide();


const closeHam = () => {
  hamMenu1.classList.remove("open-1")
  hamMenu2.classList.remove("open-2")
  hamMenu3.classList.remove("open-3")
  hamMenu1.classList.add("close1")
  hamMenu2.classList.add("close2")
  hamMenu3.classList.add("close3")
  navMenu.classList.remove("navOpen")
  navMenu.classList.add("navClose")
}
const opneHam = () => {
  hamMenu1.classList.remove("close1")
  hamMenu2.classList.remove("close2")
  hamMenu3.classList.remove("close3")
  hamMenu1.classList.add("open-1")
  hamMenu2.classList.add("open-2")
  hamMenu3.classList.add("open-3")
  navMenu.classList.remove("navClose")
  navMenu.classList.add("navOpen")
}
const hamHandler = () => {
  if (hamMenu1.classList.contains("close1")) {
    opneHam()
  } else {
    closeHam()
  }
}

hamMenu.addEventListener("click", hamHandler)
navMenu.addEventListener("click", closeHam)

// بستن منو وقتی بیرونش کلیک می‌کنیم
document.addEventListener("click", (e) => {
  if (
    !navMenu.contains(e.target) && // کلیک بیرون منو
    !hamMenu.contains(e.target) && // کلیک بیرون دکمه همبرگر
    navMenu.classList.contains("navOpen") // فقط وقتی منو بازه
  ) {
    closeHam();
  }
});

const form = document.getElementById('contact-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  try {
    const response = await fetch('contact-form.php', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('ایمیل با موفقیت ارسال شد.');
    } else {
      alert('خطایی در ارسال ایمیل رخ داده است.');
    }
  } catch (error) {
    console.error('خطا در ارسال فرم:', error);
    alert('خطایی در ارسال فرم رخ داده است.');
  }
});