const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");
const hamburgerIcon = document.getElementById("hamburgerIcon");
const navLinksItems = document.querySelectorAll(".nav-links a");
window.addEventListener("load", function () {
  const loader = document.getElementById("page-loader");

  setTimeout(() => {
    if (loader) loader.classList.add("fade-out");
    document.body.classList.remove("loading");
  }, 1000);
});
navLinksItems.forEach((link) => {
  link.addEventListener("click", function () {
    // إزالة الكلاس active من كل الروابط وإضافته للرابط الحالي فقط
    navLinksItems.forEach((item) => item.classList.remove("active"));
    this.classList.add("active");
  });
});
hamburgerBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  if (navLinks.classList.contains("active")) {
    hamburgerIcon.classList.remove("fa-bars");
    hamburgerIcon.classList.add("fa-xmark");
  } else {
    hamburgerIcon.classList.remove("fa-xmark");
    hamburgerIcon.classList.add("fa-bars");
  }
});

const howItWorksBtn = document.querySelector(".btn-secondary-large");
const videoModal = document.getElementById("videoModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalMediaWrapper = document.getElementById("modalMediaWrapper");

// رابط صورة الغلاف ورابط الفيديو
const videoThumbnail =
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800";
const youtubeVideoUrl =
  "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0";

// 1. عند الضغط على زر How It Works: يفتح المودال وفيه الصورة وزر التشغيل
if (howItWorksBtn) {
  howItWorksBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // وضع صورة الغلاف وزر التشغيل داخل المودال
    modalMediaWrapper.innerHTML = `
      <img src="${videoThumbnail}" alt="Video Thumbnail">
      <button class="modal-play-btn" id="modalPlayBtn" aria-label="Play Video">
        <i class="fa-solid fa-play"></i>
      </button>
    `;

    // إظهار النافذة المنبثقة
    videoModal.style.display = "flex";

    // 2. عند الضغط على زر التشغيل داخل المودال: يتم تحميل الفيديو وتشغيله فوراً
    document.getElementById("modalPlayBtn").addEventListener("click", () => {
      modalMediaWrapper.innerHTML = `
        <iframe 
          src="${youtubeVideoUrl}" 
          title="How It Works Video" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      `;
    });
  });
}

// 3. وظيفة إغلاق المودال وتفريغ المحتوى
function closeModal() {
  videoModal.style.display = "none";
  modalMediaWrapper.innerHTML = ""; // تفريغ المحتوى لإيقاف الفيديو تماماً
}

closeModalBtn.addEventListener("click", closeModal);

// الإغلاق عند النقر خارج صندوق الفيديو
window.addEventListener("click", (e) => {
  if (e.target === videoModal) {
    closeModal();
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const statNumbers = document.querySelectorAll(".stat-number");

  const startCounting = (element) => {
    const target = parseInt(element.getAttribute("data-target"), 10);
    const suffix = element.getAttribute("data-suffix") || "";
    const duration = 4000; // مدة حركة العد (2 ثانية)
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // دالة التباطؤ التدريجي لتنتهي بسلاسة
      const currentCount = Math.round(target * (1 - Math.pow(1 - progress, 3)));

      element.textContent = currentCount + suffix;

      if (frame === totalFrames) {
        clearInterval(counter);
        element.textContent = target + suffix;
      }
    }, frameDuration);
  };

  const observerOptions = { threshold: 0.2 };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // تأخير بَدء العَدّام 650ms حتى تكتمل حركة ظهور الكارت بـ CSS أولاً
        setTimeout(() => {
          startCounting(entry.target);
        }, 650);

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  statNumbers.forEach((stat) => observer.observe(stat));
});
document.addEventListener("DOMContentLoaded", () => {
  const specialtyItems = document.querySelectorAll(".specialty-item");

  specialtyItems.forEach((item) => {
    item.addEventListener("click", () => {
      // إزالة التفعيل من باقي التخصصات وتفعيل المختار
      specialtyItems.forEach((el) => el.classList.remove("active"));
      item.classList.add("active");

      const selected = item.getAttribute("data-specialty");
      console.log("Selected Specialty:", selected);
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  // مراقبة الكرت أو السيكشن كامل
  const sectionCard = document.querySelector(".mission-full-card");

  if (!sectionCard) return;

  const observerOptions = {
    root: null,
    threshold: 0.25 /* تفعيل الأنيميشن بمجرد دخول 25% من القسم في الشاشة */,
  };

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // تحديد جميع العناصر المراد إظهارها داخل القسم
        const animatedElements = entry.target.querySelectorAll(
          ".mission-title, .mission-desc, .btn-learn-more, .satisfaction-badge",
        );

        // إضافة كلاس التفعيل لجميع العناصر (التتابع يتكفل به الـ CSS delay)
        animatedElements.forEach((el) => el.classList.add("reveal-active"));

        // إيقاف المراقبة ليعمل الأنيميشن مرة واحدة فقط
        observerInstance.unobserve(entry.target);
      }
    });
  }, observerOptions);

  observer.observe(sectionCard);
});
document.addEventListener("DOMContentLoaded", () => {
  const sectionCard = document.querySelector(".mission-full-card");

  if (!sectionCard) return;

  const observerOptions = {
    root: null,
    threshold: 0.25,
  };

  // دالة تشغيل العداد التصاعدي
  const startCounter = (counterEl) => {
    const target = +counterEl.getAttribute("data-target") || 98;
    const duration = 1800; // مدة العد بالملي ثانية (1.8 ثانية)
    const frameDuration = 1000 / 60; // 60 إطار في الثانية
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      // استخدام Ease Out Quad لجعل السرعة بتبسيط ناعم في النهاية
      const progress = frame / totalFrames;
      const currentCount = Math.round(target * (1 - Math.pow(1 - progress, 2)));

      counterEl.textContent = `${currentCount}%`;

      if (frame === totalFrames) {
        clearInterval(counter);
        counterEl.textContent = `${target}%`; // التأكيد على الرقم النهائي
      }
    }, frameDuration);
  };

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const animatedElements = entry.target.querySelectorAll(
          ".mission-title, .mission-desc, .btn-learn-more, .satisfaction-badge",
        );

        // تفعيل أنيميشن ظهور العناصر التتابعي
        animatedElements.forEach((el) => el.classList.add("reveal-active"));

        // تشغيل العداد بعد تأخير بسيط ليناسب ظهور البادج الناعم
        const percentEl = entry.target.querySelector(".stat-percent");
        if (percentEl) {
          setTimeout(() => {
            startCounter(percentEl);
          }, 2100); // نفس زمن transition-delay للبادج
        }

        observerInstance.unobserve(entry.target);
      }
    });
  }, observerOptions);

  observer.observe(sectionCard);
});
document.addEventListener("DOMContentLoaded", () => {
  const specialtiesSection = document.querySelector(".specialties-section");

  if (!specialtiesSection) return;

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll(
            ".specialties-header, .specialty-card",
          );
          elements.forEach((el) => el.classList.add("reveal-active"));
          observerInstance.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  observer.observe(specialtiesSection);
});
document.addEventListener("DOMContentLoaded", () => {
  const featuresSection = document.querySelector(".features-section");

  if (!featuresSection) return;

  const observerOptions = {
    root: null,
    threshold: 0.2, // يبدأ الأنيميشن عند ظهور 20% من القسم على الشاشة
  };

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // تحديد الهيدر وجميع كروت الميزات داخل القسم
        const animatedElements = entry.target.querySelectorAll(
          ".section-header, .feature-card",
        );

        // إضافة كلاس التفعيل لتبدأ سلسلة التتابع بناءً على تأخير الـ CSS
        animatedElements.forEach((el) => el.classList.add("reveal-active"));

        // إيقاف المراقبة ليعمل الأنيميشن مرة واحدة بمرونة
        observerInstance.unobserve(entry.target);
      }
    });
  }, observerOptions);

  observer.observe(featuresSection);
});
document.addEventListener("DOMContentLoaded", () => {
  const servicesSection = document.querySelector(".services-section");

  if (!servicesSection) return;

  const observerOptions = {
    root: null,
    threshold: 0.35, // يبدأ الأنيميشن عندما يدخل 35% من القسم بالشاشة
  };

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const animatedElements = entry.target.querySelectorAll(
          ".services-hero-card, .service-card",
        );
        animatedElements.forEach((el) => el.classList.add("reveal-active"));
        observerInstance.unobserve(entry.target);
      }
    });
  }, observerOptions);

  observer.observe(servicesSection);
});
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".expanding-card");
  const section = document.querySelector(".expanding-services-section");

  // تبديل الكلاس active عند مرور الماوس على أي كارت
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      cards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
    });
  });

  // تفعيل أنيميشن السكرول عند الوصول للقسم
  if (section) {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(
              ".services-header, .expanding-card, .services-footer",
            );
            elements.forEach((el) => el.classList.add("reveal-active"));
            observerInstance.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(section);
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("servicesCardsWrapper");
  const cards = wrapper.querySelectorAll(".expanding-card");

  // Hover event for desktop
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      cards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
    });
  });

  // Reset to default (Ophthalmology) when mouse leaves the entire wrapper
  wrapper.addEventListener("mouseleave", () => {
    cards.forEach((c) => c.classList.remove("active"));
    // Default active card (first card: Ophthalmology)
    if (cards.length > 0) {
      cards[0].classList.add("active");
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const doctorsSection = document.getElementById("doctors-section");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          doctorsSection.classList.add("visible");
          observer.unobserve(entry.target); // لتشغيل التأثير مرة واحدة فقط عند الوصول إليه
        }
      });
    },
    {
      threshold: 0.15, // يبدأ الظهور عندما يظهر 15% من القسم على الشاشة
    },
  );

  observer.observe(doctorsSection);
});
document.addEventListener("DOMContentLoaded", function () {
  const blogSection = document.getElementById("blog-section");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          blogSection.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  observer.observe(blogSection);
});
document.addEventListener("DOMContentLoaded", function () {
  const contactSection = document.getElementById("contact-section");

  if (!contactSection) return;

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const animatedItems = entry.target.querySelectorAll(
            ".contact-header, .contact-card, .contact-info-box, .map-box",
          );

          animatedItems.forEach((item) => item.classList.add("reveal-active"));
          observerInstance.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
    },
  );

  observer.observe(contactSection);
});

document.addEventListener("DOMContentLoaded", function () {
  const reviewSection = document.querySelector(".customer-review-section");
  const track = document.querySelector(".review-track");
  const trackWrapper = document.querySelector(".review-track-wrapper");
  const cards = document.querySelectorAll(".review-card");
  const prevBtn = document.querySelector(".review-arrow-left");
  const nextBtn = document.querySelector(".review-arrow-right");
  const dotsContainer = document.querySelector(".review-dots");

  if (!reviewSection || !track || !trackWrapper || cards.length === 0) return;

  const sequence = [0, 1, 2, 1, 0];
  let sequenceIndex = 0;
  let autoPlayTimer = null;

  function renderDots() {
    if (!dotsContainer) return;

    dotsContainer.innerHTML = "";

    cards.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className =
        "review-dot" + (index === sequence[sequenceIndex] ? " active" : "");
      dot.setAttribute("aria-label", `Go to review ${index + 1}`);
      dot.addEventListener("click", () => {
        const targetIndex = index;
        sequenceIndex = sequence.indexOf(targetIndex);
        if (sequenceIndex === -1) sequenceIndex = 0;
        updateSlider();
        restartAutoPlay();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateSlider() {
    const currentIndex = sequence[sequenceIndex];

    cards.forEach((card, index) => {
      card.classList.toggle("active", index === currentIndex);
    });

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll(".review-dot");
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    }
  }

  function showNext() {
    sequenceIndex = (sequenceIndex + 1) % sequence.length;
    updateSlider();
  }

  function showPrev() {
    sequenceIndex = (sequenceIndex - 1 + sequence.length) % sequence.length;
    updateSlider();
  }

  function restartAutoPlay() {
    clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(() => {
      showNext();
    }, 4000);
  }

  prevBtn?.addEventListener("click", () => {
    showPrev();
    restartAutoPlay();
  });

  nextBtn?.addEventListener("click", () => {
    showNext();
    restartAutoPlay();
  });

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reviewSection.classList.add("visible");
          updateSlider();
          observerInstance.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 },
  );

  observer.observe(reviewSection);
  renderDots();
  updateSlider();
  restartAutoPlay();

  window.addEventListener("resize", updateSlider);
});
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// 1. مراقبة حركة التمرير (Scroll) لإظهار أو إخفاء الزر
window.addEventListener("scroll", function () {
  // إذا نزلت الصفحة أكثر من 300 بكسل للأفل، يظهر الزر
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});

// 2. الرجوع للأعلى بسلاسة (Smooth Scroll) عند الضغط على الزر
scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // حركة صعود سلسة ومريحة للعين
  });
});
document.addEventListener("DOMContentLoaded", function () {
  // تحديث الرابط النشط حسب القسم الظاهر في الشاشة.
  const sections = document.querySelectorAll("section[id], footer[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  function updateActiveNavLink() {
    const currentScrollPos = window.scrollY + 160;
    let activeSectionId = "";

    sections.forEach((section) => {
      if (currentScrollPos >= section.offsetTop) {
        activeSectionId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${activeSectionId}`,
      );
    });
  }

  window.addEventListener("scroll", updateActiveNavLink, { passive: true });
  window.addEventListener("resize", updateActiveNavLink);
  updateActiveNavLink();
});
