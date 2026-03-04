/**
 * Preplok Shared Components
 * ─────────────────────────
 * Injects the site-wide header, footer, offcanvas menu, and coming-soon modal
 * into every page that contains the placeholder divs:
 *
 *   <div id="app-overlays"></div>   ← offcanvas + modal
 *   <div id="app-header"></div>     ← <header>
 *   <div id="app-footer"></div>     ← <section> footer
 *
 * Usage: load BEFORE main.js (which needs the injected DOM elements).
 */

(function () {
  'use strict';

  /* ─── helpers ─────────────────────────────────────────────── */
  function isHomePage() {
    var p = window.location.pathname;
    return p === '/' || p === '' || p.endsWith('/index.html') || p.endsWith('\\index.html');
  }

  function currentFile() {
    var p = window.location.pathname;
    return p.split('/').pop().split('\\').pop() || 'index.html';
  }

  function activeClass(files) {
    var cur = currentFile();
    return files.indexOf(cur) !== -1 ? ' class="active"' : '';
  }

  /* ─── Coming-soon modal + iOS handler ─────────────────────── */
  window.openComingSoonModal = function () {
    var m = document.getElementById('comingSoonModal');
    if (m) { m.style.display = 'block'; document.body.style.overflow = 'hidden'; }
  };
  window.closeComingSoonModal = function () {
    var m = document.getElementById('comingSoonModal');
    if (m) { m.style.display = 'none'; document.body.style.overflow = 'auto'; }
  };

  /* ─── OVERLAYS (offcanvas + modal) ────────────────────────── */
  function renderOverlays() {
    return `
      <!--====== OFFCANVAS MENU ======-->
      <div class="off_canvars_overlay"></div>
      <div class="offcanvas_menu">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="offcanvas_menu_wrapper">
                <div class="canvas_close">
                  <a href="javascript:void(0)"><i class="fa fa-times"></i></a>
                </div>
                <div class="offcanvas-brand text-center mb-40">
                  <img src="assets/images/Preplok-Logo.png" alt="Preplok">
                </div>
                <div id="menu" class="text-left">
                  <ul class="offcanvas_main_menu">
                    <li class="menu-item-has-children${activeClass(['index.html', ''])}">
                      <a href="index.html">Home</a>
                    </li>
                    <li class="menu-item-has-children${activeClass(['service-details.html'])}">
                      <a href="index.html#service">Features</a>
                    </li>
                    <li class="menu-item-has-children">
                      <a href="#">Exams</a>
                      <ul class="sub-menu">
                        <li><a href="#">WAEC</a></li>
                        <li><a href="#">JAMB</a></li>
                        <li><a href="#">NECO</a></li>
                        <li><a href="#">Post UTME</a></li>
                        <li><a href="#">GCE</a></li>
                      </ul>
                    </li>
                    <li class="menu-item-has-children${activeClass(['single-post.html', 'single-news.html', 'news.html'])}">
                      <a href="single-post.html">Blog</a>
                    </li>
                    <li class="menu-item-has-children${activeClass(['contact.html'])}">
                      <a href="contact.html">Contact</a>
                    </li>
                  </ul>
                </div>
                <div class="offcanvas-social">
                  <ul class="text-center">
                    <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                    <li><a href="#"><i class="fab fa-youtube"></i></a></li>
                    <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                    <li><a href="#"><i class="fab fa-tiktok"></i></a></li>
                  </ul>
                </div>
                <div class="footer-widget-info">
                  <ul>
                    <li><a href="mailto:hello@preplok.com"><i class="fal fa-envelope"></i> hello@preplok.com</a></li>
                    <li><a href="tel:+2349133303018"><i class="fal fa-phone"></i> +234 (0) 913 330 3018</a></li>
                    <li><a href="#"><i class="fal fa-map-marker-alt"></i> Abuja, Nigeria</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--====== OFFCANVAS MENU ENDS ======-->

      <!--====== COMING SOON MODAL ======-->
      <div id="comingSoonModal" class="coming-soon-modal">
        <div class="coming-soon-content">
          <button class="coming-soon-close" onclick="closeComingSoonModal()">&times;</button>
          <div class="coming-soon-icon"><i class="fab fa-apple"></i></div>
          <h2>Coming Soon!</h2>
          <p>Our iOS app is currently in development. We're working hard to bring Preplok to the App Store very soon. Stay tuned!</p>
          <a href="#" class="coming-soon-btn" onclick="closeComingSoonModal(); return false;">Got it!</a>
        </div>
      </div>
      <!--====== COMING SOON MODAL ENDS ======-->`;
  }

  /* ─── HEADER ──────────────────────────────────────────────── */
  function renderHeader() {
    var home = isHomePage();
    var headerClass = home
      ? 'appie-header-area appie-sticky'
      : 'appie-header-area appie-header-page-area appie-sticky';
    var navBoxClass = home
      ? 'header-nav-box header-nav-4-box'
      : 'header-nav-box header-nav-box-3 header-nav-box-inner-page';

    /* active nav items */
    var isBlog    = activeClass(['single-post.html', 'single-news.html', 'news.html']) !== '';
    var isContact = activeClass(['contact.html']) !== '';
    var isFeature = activeClass(['service-details.html']) !== '';
    var isHomeAct = activeClass(['index.html', '']) !== '';

    function liClass(flag) { return flag ? ' class="active"' : ''; }

    return `
      <header class="${headerClass}">
        <div class="container">
          <div class="${navBoxClass}">
            <div class="row align-items-center">

              <!-- Logo -->
              <div class="col-lg-2 col-md-4 col-sm-5 col-6 order-1 order-sm-1">
                <div class="appie-logo-box">
                  <a href="index.html">
                    <img src="assets/images/Preplok-Logo.png" alt="Preplok">
                  </a>
                </div>
              </div>

              <!-- Nav -->
              <div class="col-lg-6 col-md-1 col-sm-1 order-3 order-sm-2">
                <div class="appie-header-main-menu">
                  <ul>
                    <li${liClass(isHomeAct)}><a href="index.html">Home</a></li>
                    <li${liClass(isFeature)}><a href="index.html#service">Features</a></li>
                    <li>
                      <a href="#">Exams <i class="fal fa-angle-down"></i></a>
                      <ul class="sub-menu">
                        <li><a href="#">WAEC</a></li>
                        <li><a href="#">JAMB</a></li>
                        <li><a href="#">NECO</a></li>
                        <li><a href="#">Post UTME</a></li>
                        <li><a href="#">GCE</a></li>
                      </ul>
                    </li>
                    <li${liClass(isBlog)}>
                      <a href="single-post.html">Blog <i class="fal fa-angle-down"></i></a>
                      <ul class="sub-menu">
                        <li><a href="single-post.html">All Posts</a></li>
                        <li><a href="single-post.html?q=study tips">Study Tips</a></li>
                        <li><a href="single-post.html?q=success">Success Stories</a></li>
                      </ul>
                    </li>
                    <li${liClass(isContact)}><a href="contact.html">Contact</a></li>
                  </ul>
                </div>
              </div>

              <!-- CTA -->
              <div class="col-lg-4 col-md-7 col-sm-6 col-6 order-2 order-sm-3">
                <div class="appie-btn-box text-right">
                  <a class="main-btn ml-30" href="#" onclick="openComingSoonModal(); return false;">Download App</a>
                  <div class="toggle-btn ml-30 canvas_open d-lg-none d-block">
                    <i class="fa fa-bars"></i>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>`;
  }

  /* ─── FOOTER ──────────────────────────────────────────────── */
  function renderFooter() {
    var year = new Date().getFullYear();
    return `
      <!--====== FOOTER ======-->
      <section class="appie-footer-area">
        <div class="container">
          <div class="row">

            <!-- About -->
            <div class="col-lg-4 col-md-6">
              <div class="footer-about-widget footer-about-widget-5">
                <div class="logo">
                  <a href="index.html"><img src="assets/images/logo-5.png" alt="Preplok"></a>
                </div>
                <p>Preplok is Nigeria's AI-powered exam prep app helping students ace WAEC, JAMB, NECO, Post UTME, and GCE with smart practice and instant feedback.</p>
                <a href="index.html#features">Learn More <i class="fal fa-arrow-right"></i></a>
                <div class="social mt-30">
                  <ul>
                    <li><a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a></li>
                    <li><a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a></li>
                    <li><a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a></li>
                    <li><a href="#" aria-label="TikTok"><i class="fab fa-tiktok"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Product -->
            <div class="col-lg-2 col-md-6">
              <div class="footer-navigation footer-navigation-5">
                <h4 class="title">Product</h4>
                <ul>
                  <li><a href="index.html#service">Features</a></li>
                  <li><a href="index.html#features">About</a></li>
                  <li><a href="single-post.html">Blog</a></li>
                  <li><a href="single-post.html?q=study tips">Study Tips</a></li>
                  <li><a href="single-post.html?q=success">Success Stories</a></li>
                </ul>
              </div>
            </div>

            <!-- Exams -->
            <div class="col-lg-3 col-md-6">
              <div class="footer-navigation footer-navigation-5">
                <h4 class="title">Exams</h4>
                <ul>
                  <li><a href="single-post.html?q=WAEC">WAEC</a></li>
                  <li><a href="single-post.html?q=JAMB">JAMB</a></li>
                  <li><a href="single-post.html?q=NECO">NECO</a></li>
                  <li><a href="single-post.html?q=Post+UTME">Post UTME</a></li>
                  <li><a href="single-post.html?q=GCE">GCE</a></li>
                </ul>
              </div>
            </div>

            <!-- Contact -->
            <div class="col-lg-3 col-md-6">
              <div class="footer-widget-info">
                <h4 class="title">Contact Us</h4>
                <ul>
                  <li><a href="mailto:hello@preplok.com"><i class="fal fa-envelope"></i> hello@preplok.com</a></li>
                  <li><a href="tel:+2349133303018"><i class="fal fa-phone"></i> +234 (0) 913 330 3018</a></li>
                  <li><a href="contact.html"><i class="fal fa-map-marker-alt"></i> Abuja, Nigeria</a></li>
                </ul>
              </div>
            </div>

          </div>

          <!-- Copyright bar -->
          <div class="row">
            <div class="col-lg-12">
              <div class="footer-copyright d-flex align-items-center justify-content-between pt-35">
                <div class="apps-download-btn">
                  <ul>
                    <li>
                      <a href="#" onclick="openComingSoonModal(); return false;">
                        <i class="fab fa-apple"></i> Download for iOS
                      </a>
                    </li>
                    <li>
                      <a class="item-2" href="#">
                        <i class="fab fa-google-play"></i> Download for Android
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="copyright-text">
                  <p>Copyright &copy; ${year} Preplok. All rights reserved.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
      <!--====== FOOTER ENDS ======-->

      <!--====== BACK TO TOP ======-->
      <div class="back-to-top">
        <a href="#"><i class="fal fa-arrow-up"></i></a>
      </div>`;
  }

  /* ─── INJECT on DOM ready ─────────────────────────────────── */
  function inject() {
    var overlaysEl = document.getElementById('app-overlays');
    var headerEl   = document.getElementById('app-header');
    var footerEl   = document.getElementById('app-footer');

    if (overlaysEl) overlaysEl.innerHTML = renderOverlays();
    if (headerEl)   headerEl.outerHTML   = renderHeader();   // swap placeholder with real <header>
    if (footerEl)   footerEl.outerHTML   = renderFooter();   // swap placeholder with real <section>

    /* after injecting, bind modal click-outside */
    window.onclick = function (event) {
      var modal = document.getElementById('comingSoonModal');
      if (modal && event.target === modal) closeComingSoonModal();
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject(); // already parsed (script deferred or at bottom)
  }

})();
