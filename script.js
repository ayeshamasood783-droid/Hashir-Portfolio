(function() {
  'use strict';

  // ===== MOBILE MENU =====
  function toggleMenu() {
    var nav = document.getElementById('navLinks');
    if (nav) nav.classList.toggle('open');
  }
  window.toggleMenu = toggleMenu;

  document.querySelectorAll('.nav-links a').forEach(function(link) {
    link.addEventListener('click', function() {
      var nav = document.getElementById('navLinks');
      if (nav) nav.classList.remove('open');
    });
  });

  // ===== HEADER SCROLL EFFECT =====
  window.addEventListener('scroll', function() {
    var header = document.getElementById('navbar');
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // =====================================================
  // ===== SCREENPAL VIDEO DATA =========================
  // =====================================================
  var videos = [
    { title: 'Academic Gateway', category: 'Reel', id: 'cOirDKnU7Z3' },
    { title: 'Web 2 Reel', category: 'Reel', id: 'cOirDKnU7Zq' },
    { title: 'Thinkfort Reel', category: 'Reel', id: 'cOirDKnU7ZF' },
    { title: 'Copy of real estate', category: 'Reel', id: 'cOirD7nU7Zu' },
    { title: 'RENOVATION-3', category: 'Reel', id: 'cOirDKnU7ZT' },
    { title: 'SHOW REEL', category: 'Reel', id: 'cOirDKnU7ZD' },
    { title: 'SHOW REEL1', category: 'Reel', id: 'cOirDKnU7Zb' }
  ];

  // =====================================================
  // ===== SCREENPAL PLAYER URL ==========================
  // =====================================================
  function getScreenPalUrl(videoId) {
    return 'https://go.screenpal.com/player/' + videoId + '?ff=1&ahc=1&dcc=1&tl=1&bg=transparent&share=1&download=1&embed=1&cl=1';
  }

  // =====================================================
  // ===== RENDER WORK CARDS =============================
  // =====================================================
  var workScroll = document.getElementById('workScroll');

  if (workScroll) {
    videos.forEach(function(video, index) {
      var item = document.createElement('div');
      item.className = 'work-item';
      item.setAttribute('data-index', index);

      item.innerHTML = `
        <div class="thumb">
          <div class="screenpal-thumbnail">
            <iframe
              src="${getScreenPalUrl(video.id)}"
              frameborder="0"
              scrolling="no"
              allowfullscreen
              allow="autoplay; encrypted-media"
            ></iframe>
            <div class="video-click-layer"></div>
          </div>
          <div class="play-overlay">
            <i class="fas fa-play"></i>
          </div>
          <div class="overlay">
            <h4>${video.title}</h4>
            <p>${video.category}</p>
          </div>
        </div>
      `;

      // ===== OPEN VIDEO ON CLICK =====
      item.addEventListener('click', function(e) {
        e.preventDefault();
        openLightbox(this.getAttribute('data-index'));
      });

      workScroll.appendChild(item);
    });
  }

  // =====================================================
  // ===== SCROLL WORK ===================================
  // =====================================================
  window.scrollWork = function(direction) {
    var scroll = document.getElementById('workScroll');
    if (scroll) {
      var scrollAmount = 280;
      if (direction === 'left') {
        scroll.scrollLeft -= scrollAmount;
      } else {
        scroll.scrollLeft += scrollAmount;
      }
    }
  };

  // =====================================================
  // ===== LIGHTBOX - CLICK TO PLAY =====================
  // =====================================================
  var lightbox = document.getElementById('lightbox');
  var lightboxVideo = document.getElementById('lightboxVideo');
  var videoTitle = document.getElementById('videoTitle');
  var videoCategory = document.getElementById('videoCategory');
  var videoPoster = document.getElementById('videoPoster');

  // ===== OPEN LIGHTBOX =====
  window.openLightbox = function(index) {
    var video = videos[parseInt(index)];

    if (video && lightbox && lightboxVideo) {
      // Show poster
      if (videoPoster) {
        videoPoster.classList.remove('hidden');
      }
      
      // Set video source (but don't autoplay)
      lightboxVideo.src = getScreenPalUrl(video.id);
      
      // Update info
      if (videoTitle) videoTitle.textContent = video.title;
      if (videoCategory) videoCategory.textContent = video.category;

      // Open lightbox
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  // ===== PLAY VIDEO ON POSTER CLICK =====
  if (videoPoster) {
    videoPoster.addEventListener('click', function() {
      // Hide poster
      this.classList.add('hidden');
      
      // Try to play the iframe video
      try {
        // For ScreenPal, we need to reload with autoplay parameter
        var currentSrc = lightboxVideo.src;
        if (currentSrc) {
          // Add autoplay parameter
          var autoplaySrc = currentSrc + '&autoplay=1';
          lightboxVideo.src = autoplaySrc;
        }
      } catch(e) {
        console.log('Autoplay not supported on this device');
      }
    });
  }

  // ===== CLOSE LIGHTBOX =====
  window.closeLightbox = function(event) {
    if (event && event.target && event.target.id !== 'lightbox') {
      return;
    }

    if (lightbox) {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (lightboxVideo) {
      lightboxVideo.src = '';
    }
    
    // Show poster again
    if (videoPoster) {
      videoPoster.classList.remove('hidden');
    }
  };

  // ===== ESC KEY CLOSE =====
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });

  // =====================================================
  // ===== ANIMATED COUNTER ==============================
  // =====================================================
  var counterDisplay = document.getElementById('counterDisplay');

  if (counterDisplay) {
    var counterValue = 0;
    var targetValue = 5;
    var increment = targetValue / 50;
    var counterAnimated = false;

    function animateCounter() {
      if (counterValue < targetValue) {
        counterValue += increment;
        if (counterValue > targetValue) {
          counterValue = targetValue;
        }
        counterDisplay.textContent = Math.floor(counterValue) + '+';
        requestAnimationFrame(animateCounter);
      } else {
        counterDisplay.textContent = targetValue + '+';
      }
    }

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && !counterAnimated) {
          counterAnimated = true;
          animateCounter();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(counterDisplay);
  }

  // =====================================================
  // ===== SMOOTH SCROLL =================================
  // =====================================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // =====================================================
  // ===== ACTIVE NAV LINK ===============================
  // =====================================================
  window.addEventListener('scroll', function() {
    var sections = document.querySelectorAll('section[id]');
    var navs = document.querySelectorAll('.nav-links a:not(.btn-hire)');
    var current = '';

    sections.forEach(function(s) {
      var top = s.offsetTop - 120;
      if (window.scrollY >= top) {
        current = s.id;
      }
    });

    navs.forEach(function(n) {
      n.classList.remove('active');
      if (n.getAttribute('href') === '#' + current) {
        n.classList.add('active');
      }
    });
  });

  // =====================================================
  // ===== TOOLS & TECHNOLOGIES ==========================
  // =====================================================
  var toolsData = [
    { name: 'CapCut', icon: 'fa-scroll', level: 99 },
    { name: 'Adobe Premiere', icon: 'fa-film', level: 90 },
    { name: 'After Effects', icon: 'fa-magic', level: 75 },
    { name: 'Final Cut Pro', icon: 'fa-cut', level: 72 }
  ];

  var toolsGrid = document.getElementById('toolsGrid');

  if (toolsGrid) {
    toolsData.forEach(function(tool) {
      var card = document.createElement('div');
      card.className = 'tool-card';

      card.innerHTML = `
        <div class="tool-icon">
          <i class="fas ${tool.icon}"></i>
        </div>
        <h4>${tool.name}</h4>
        <div class="tool-sub">Video Editing</div>
        <div class="skill-bar-bg">
          <div class="skill-bar-fill" style="width: 0%;" data-level="${tool.level}"></div>
        </div>
        <div class="skill-label">
          <span>Proficiency</span>
          <span>${tool.level}%</span>
        </div>
      `;

      toolsGrid.appendChild(card);
    });

    var toolObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var fills = entry.target.querySelectorAll('.skill-bar-fill');
          fills.forEach(function(bar) {
            var level = bar.getAttribute('data-level');
            if (level) {
              setTimeout(function() {
                bar.style.width = level + '%';
              }, 200);
            }
          });
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.tool-card').forEach(function(card) {
      toolObserver.observe(card);
    });
  }

})();

document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('contactForm');
    var successDiv = document.getElementById('formSuccess');
    
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        if (successDiv) {
          successDiv.style.display = 'block';
        }
        
        // Hide form
        form.querySelectorAll('.form-group, .btn-submit').forEach(function(el) {
          el.style.display = 'none';
        });
        
        // Actually submit the form to Netlify
        setTimeout(function() {
          form.submit();
        }, 100);
      });
    }
  });
