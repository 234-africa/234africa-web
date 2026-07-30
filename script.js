/* ============================================================
   234AFRICA v14 — WIREFRAME SPHERE & CONFETTI (SCREENSHOT REVERT)
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════════════
   1. THREE.JS: WIREFRAME SPHERE & CONFETTI
   ══════════════════════════════════════════════════════════ */
const canvas = document.getElementById('webgl-canvas');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 250;

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// -- A. The Wireframe Sphere --
// The screenshot shows a complex wireframe sphere (looks like an Icosahedron)
const sphereGeometry = new THREE.IcosahedronGeometry(80, 2);

// We will use multiple wireframe layers in different colors to match the chaotic look
const colors = [0xE84128, 0x108C5A, 0xF4A218]; // Red, Green, Yellow
const sphereGroup = new THREE.Group();

colors.forEach((color, index) => {
  const material = new THREE.MeshBasicMaterial({ 
    color: color, 
    wireframe: true, 
    transparent: true, 
    opacity: 0.4
  });
  const mesh = new THREE.Mesh(sphereGeometry, material);
  // Slightly offset rotation so they look like a messy web
  mesh.rotation.x = index * Math.PI / 4;
  mesh.rotation.y = index * Math.PI / 6;
  // Slightly scale them differently
  mesh.scale.setScalar(1 + (index * 0.02));
  sphereGroup.add(mesh);
});
scene.add(sphereGroup);

// -- B. The Colorful Square Confetti --
// The screenshot shows small squares floating around
const confettiGroup = new THREE.Group();
const particleGeometry = new THREE.PlaneGeometry(2, 2);

const numParticles = 300;
for (let i = 0; i < numParticles; i++) {
  const color = colors[Math.floor(Math.random() * colors.length)];
  const material = new THREE.MeshBasicMaterial({ 
    color: color, 
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.7
  });
  const mesh = new THREE.Mesh(particleGeometry, material);
  
  // Random positions spread across a wide area
  mesh.position.x = (Math.random() - 0.5) * 600;
  mesh.position.y = (Math.random() - 0.5) * 600;
  mesh.position.z = (Math.random() - 0.5) * 400;

  // Random rotations
  mesh.rotation.x = Math.random() * Math.PI;
  mesh.rotation.y = Math.random() * Math.PI;
  mesh.rotation.z = Math.random() * Math.PI;

  // Store rotation speeds for animation
  mesh.userData = {
    rx: (Math.random() - 0.5) * 0.02,
    ry: (Math.random() - 0.5) * 0.02,
    rz: (Math.random() - 0.5) * 0.02,
    vy: (Math.random() - 0.5) * 0.2 // Drift speed
  };

  confettiGroup.add(mesh);
}
scene.add(confettiGroup);


// -- Animation Loop --
const clock = new THREE.Clock();
function tick() {
  const elapsedTime = clock.getElapsedTime();
  
  // Rotate the central sphere slowly
  sphereGroup.rotation.x = elapsedTime * 0.1;
  sphereGroup.rotation.y = elapsedTime * 0.15;

  // Animate confetti
  confettiGroup.children.forEach(mesh => {
    mesh.rotation.x += mesh.userData.rx;
    mesh.rotation.y += mesh.userData.ry;
    mesh.rotation.z += mesh.userData.rz;
    mesh.position.y += mesh.userData.vy;

    // Wrap around vertically if they drift too far
    if (mesh.position.y > 300) mesh.position.y = -300;
    if (mesh.position.y < -300) mesh.position.y = 300;
  });

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}
tick();

// Handle Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


/* ══════════════════════════════════════════════════════════
   2. GSAP SCROLLTRIGGER (PARALLAX EFFECTS)
   ══════════════════════════════════════════════════════════ */
// Parallax the 3D scene when scrolling
ScrollTrigger.create({
  trigger: "#smooth-wrapper",
  start: "top top",
  end: "bottom bottom",
  scrub: 1, 
  animation: gsap.to(scene.position, {
    y: 100, // Move the scene up slightly as we scroll down
    ease: "none"
  })
});

// Fade in content sections
const sections = gsap.utils.toArray('.section-content');
sections.forEach((sec) => {
  gsap.from(sec, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: sec,
      start: "top 80%",
    }
  });
});


/* ══════════════════════════════════════════════════════════
   3. SANITY.IO LIVE CMS INTEGRATION (Event Grid Integration)
   ══════════════════════════════════════════════════════════ */
const SANITY_PROJECT_ID = "ozHD0vlJ2";
const SANITY_DATASET = "production";

async function initSanityCMS() {
  if (!SANITY_PROJECT_ID) return;
  
  let events = [];
  let brands = [];

  try {
    const groqQuery = encodeURIComponent(`{ "events": *[_type == "event"] | order(date desc), "brands": *[_type == "brand"] }`);
    const url = `https://${SANITY_PROJECT_ID.toLowerCase()}.api.sanity.io/v2022-03-07/data/query/${SANITY_DATASET}?query=${groqQuery}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.result) {
      events = data.result.events || [];
      brands = data.result.brands || [];
    }
  } catch (error) {
    console.warn("Sanity fetch failed, falling back to dummy layout preview.");
  }

  // 1. Process Events
  // Pad to exactly 5 events for design preview
  const displayEvents = [...events];
  while (displayEvents.length < 5) {
    displayEvents.push({});
  }

  const carousel = document.getElementById('events-carousel');
  if (carousel) {
    carousel.innerHTML = displayEvents.map((ev, i) => {
      // 5 distinct high-quality festival/concert images for the main flyers
      const defaultFlyers = [
        "https://images.unsplash.com/photo-1540039155732-6771dcb6f5e7?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80"
      ];
      
      // A pool of unique images for the right-side galleries
      const galleryPool = [
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1533174000220-e1c964408a61?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1510511459019-5d01a91e5d9c?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1520095972714-909e91b05382?auto=format&fit=crop&w=400&q=80"
      ];
      
      // Try to resolve Sanity image if it exists
      let imgUrl = defaultFlyers[i % defaultFlyers.length];
      if (ev.image && ev.image.asset && ev.image.asset._ref) {
        const ref = ev.image.asset._ref;
        const parts = ref.split('-');
        if (parts.length === 4) {
          imgUrl = `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${parts[1]}-${parts[2]}.${parts[3]}`;
        }
      } else if (ev.poster && ev.poster.asset && ev.poster.asset._ref) {
          const ref = ev.poster.asset._ref;
          const parts = ref.split('-');
          if (parts.length === 4) {
            imgUrl = `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${parts[1]}-${parts[2]}.${parts[3]}`;
          }
      }

      const eventDate = ev.date ? new Date(ev.date) : new Date(Date.now() + 86400000 * (i+1));
      const dateString = eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      
      // If the event date is before today, it's a past event
      const isPast = eventDate < new Date();
      
      const btnHtml = isPast 
        ? `<button class="btn-primary-pill btn-event-row past" disabled>PAST EVENT</button>`
        : `<a href="${ev.ticketLink || '#'}" target="_blank" class="btn-primary-pill btn-event-row shadow-red">GET TICKETS</a>`;

      const summaryText = ev.summary || "Join us for an unforgettable experience celebrating culture, music, and the best of African entertainment. Get your tickets now before they sell out!";

      // Generate 5 unique gallery images for this specific row using an offset
      const galleryHtml = Array.from({length: 5}).map((_, j) => {
        const poolIndex = (i * 2 + j) % galleryPool.length;
        return `<img src="${galleryPool[poolIndex]}" alt="Gallery">`;
      }).join('');

      return `
        <div class="event-row">
          <div class="event-flyer-left">
            <img src="${imgUrl}" alt="Event Flyer">
          </div>
          <div class="event-info-middle">
            <h3 class="event-title-bold">${ev.title || '234AFRICA EXPERIENCE ' + (i+1)}</h3>
            <div class="event-date-bold">${dateString}</div>
            <div class="event-summary">${summaryText}</div>
            ${btnHtml}
          </div>
          <div class="event-gallery-right">
            ${galleryHtml}
          </div>
        </div>
      `;
    }).join('');
  }
  setTimeout(() => ScrollTrigger.refresh(), 500);

  // 2. Process Brands (Commented out to preserve static HTML brands)
  /*
  const marquee = document.getElementById('marquee-track');
  if (marquee) {
    const defaultBrands = [
      { name: 'Nike', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
      { name: 'Apple', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
      { name: 'Spotify', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg' },
      { name: 'Coca-Cola', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg' },
      { name: 'Netflix', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
      { name: 'BMW', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg' }
    ];
    const displayBrands = (brands && brands.length > 0) ? brands : defaultBrands;

    const brandHtml = displayBrands.map(b => {
      let imgUrl = b.logoUrl || "https://placehold.co/200x60/E0DDD4/1A1A1A?text=BRAND&font=montserrat";
      if (b.logo && b.logo.asset && b.logo.asset._ref) {
        const ref = b.logo.asset._ref;
        const parts = ref.split('-');
        if (parts.length === 4) {
          imgUrl = `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${parts[1]}-${parts[2]}.${parts[3]}`;
        }
      }
      return `<img src="${imgUrl}" alt="${b.name || 'Brand'}" class="brand-logo-placeholder" style="filter:none; opacity:1;">`;
    }).join('');
    
    marquee.innerHTML = brandHtml + brandHtml + brandHtml;
  }
  */
}

document.addEventListener('DOMContentLoaded', initSanityCMS);
