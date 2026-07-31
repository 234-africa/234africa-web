/* ============================================================
   234AFRICA — CYBER-PORTAL WARP PAGE TRANSITION ENGINE v1.0
   Cinematic holographic page-to-page navigation curtain
   ============================================================ */

(function () {
  'use strict';

  // Create Cyber-Portal Curtain HTML element
  function createPortalCurtain() {
    let curtain = document.getElementById('cyber-portal-curtain');
    if (curtain) return curtain;

    curtain = document.createElement('div');
    curtain.id = 'cyber-portal-curtain';
    curtain.innerHTML = `
      <div class="cp-grid-overlay"></div>
      <div class="cp-laser-line"></div>
      <div class="cp-hud-box">
        <div class="cp-status-tag">[ CYBER-PORTAL // 234.HQ ]</div>
        <div class="cp-status-title">INITIATING WARP LINK...</div>
        <div class="cp-progress-track">
          <div class="cp-progress-bar"></div>
        </div>
        <div class="cp-coordinates">WAT // 06.5244° N, 03.3792° E // LAGOS PORTAL</div>
      </div>
    `;

    // Append styles dynamically
    const style = document.createElement('style');
    style.id = 'cp-curtain-styles';
    style.innerHTML = `
      #cyber-portal-curtain {
        position: fixed;
        inset: 0;
        background: #030206;
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        pointer-events: none;
        opacity: 0;
        transform: translateY(100%);
        transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease;
        font-family: 'Space Mono', monospace, sans-serif;
        color: #fff;
        overflow: hidden;
      }
      #cyber-portal-curtain.cp-active {
        pointer-events: all;
        opacity: 1;
        transform: translateY(0);
      }
      #cyber-portal-curtain.cp-fade-out {
        transform: translateY(-100%);
        opacity: 0;
      }
      .cp-grid-overlay {
        position: absolute;
        inset: 0;
        background-image: 
          linear-gradient(rgba(16, 140, 90, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(16, 140, 90, 0.1) 1px, transparent 1px);
        background-size: 40px 40px;
        pointer-events: none;
      }
      .cp-laser-line {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, transparent, #E84128, #F4A218, #108C5A, transparent);
        box-shadow: 0 0 20px rgba(16, 140, 90, 0.8), 0 0 40px rgba(232, 65, 40, 0.5);
      }
      .cp-hud-box {
        position: relative;
        z-index: 2;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 16px;
        padding: 32px 40px;
        text-align: center;
        box-shadow: 0 0 50px rgba(0, 0, 0, 0.8), inset 0 0 25px rgba(16, 140, 90, 0.15);
        backdrop-filter: blur(20px);
        min-width: 310px;
      }
      .cp-status-tag {
        font-size: 0.72rem;
        color: #F4A218;
        letter-spacing: 0.25em;
        font-weight: 700;
        margin-bottom: 12px;
      }
      .cp-status-title {
        font-family: 'Bricolage Grotesque', 'Outfit', sans-serif;
        font-size: 1.4rem;
        font-weight: 900;
        color: #fff;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        margin-bottom: 20px;
        text-shadow: 0 0 15px rgba(16, 140, 90, 0.5);
      }
      .cp-progress-track {
        width: 100%;
        height: 4px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 100px;
        overflow: hidden;
        margin-bottom: 16px;
      }
      .cp-progress-bar {
        width: 0%;
        height: 100%;
        background: linear-gradient(90deg, #E84128, #F4A218, #108C5A);
        box-shadow: 0 0 10px #108C5A;
        transition: width 0.35s ease;
      }
      .cp-coordinates {
        font-size: 0.65rem;
        color: rgba(255, 255, 255, 0.4);
        letter-spacing: 0.1em;
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(curtain);
    return curtain;
  }

  // Handle page load reveal
  window.addEventListener('DOMContentLoaded', () => {
    const curtain = createPortalCurtain();
    // Briefly show curtain if navigating from another page, then dismiss
    setTimeout(() => {
      curtain.classList.add('cp-fade-out');
      setTimeout(() => {
        curtain.classList.remove('cp-active', 'cp-fade-out');
      }, 450);
    }, 100);

    // Attach click listeners to navigation links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      const target = link.getAttribute('target');

      // Check if internal HTML page link
      if (
        href &&
        !href.startsWith('#') &&
        !href.startsWith('mailto:') &&
        !href.startsWith('tel:') &&
        !href.startsWith('javascript:') &&
        target !== '_blank' &&
        (href.endsWith('.html') || href.indexOf('.html?') > -1 || href === '/')
      ) {
        // Prevent default jump and run warp curtain
        e.preventDefault();

        const curtain = createPortalCurtain();
        curtain.classList.remove('cp-fade-out');
        curtain.classList.add('cp-active');

        // Animate HUD progress bar
        const progressBar = curtain.querySelector('.cp-progress-bar');
        if (progressBar) {
          setTimeout(() => {
            progressBar.style.width = '100%';
          }, 50);
        }

        // Navigate after warp animation completes
        setTimeout(() => {
          window.location.href = href;
        }, 400);
      }
    });
  });
})();
