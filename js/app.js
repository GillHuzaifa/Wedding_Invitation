(function () {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function bindConfig() {
    const heroVideo = $("#heroVideo");
    const poster = weddingConfig.media.heroPoster || "assets/hero-poster.jpg";
    if (heroVideo) {
      heroVideo.poster = poster;
      const sources = $$("source", heroVideo);
      const desktopSource = sources.find((source) => !source.media) || sources[sources.length - 1];
      if (desktopSource) desktopSource.src = weddingConfig.media.heroVideo;
      if (sources[0]?.media && weddingConfig.media.heroVideoMobile) sources[0].src = weddingConfig.media.heroVideoMobile;
      heroVideo.load();
      heroVideo.addEventListener("error", () => document.body.classList.add("video-failed"), { once: true });
      heroVideo.addEventListener("loadeddata", () => document.body.classList.add("video-ready"), { once: true });
    }

    const sameDayEvents = weddingConfig.events.length >= 2 && weddingConfig.events[0].date === weddingConfig.events[1].date;
    let eventMarkup = "";
    if (sameDayEvents) {
      const first = weddingConfig.events[0];
      const second = weddingConfig.events[1];
      eventMarkup += `
        <article class="event-card event-card-combined reveal" style="--delay:0ms">
          <div class="event-number">01</div>
          <p class="event-date">${first.date}</p>
          <h3>Nikkah &amp; Mehndi</h3>
          <div class="event-rule"></div>
          <div class="event-subevent"><strong>${first.name}</strong><p class="event-venue">${first.venue}</p><p class="event-time-card">${first.time}</p></div>
          <div class="event-subdivider"></div>
          <div class="event-subevent"><strong>${second.name}</strong><p class="event-venue">${second.venue}</p><p class="event-time-card">${second.time}</p><p class="event-hosts">With love and joy, Laiba &amp; Abdullah warmly welcome you to celebrate the Mehndi of Jaisha &amp; Zarrar.</p></div>
        </article>`;
      eventMarkup += weddingConfig.events.slice(2).map((event, offset) => `
        <article class="event-card reveal" style="--delay:${(offset + 1) * 100}ms">
          <div class="event-number">${String(offset + 2).padStart(2, "0")}</div>
          <p class="event-date">${event.date}</p>
          <h3>${event.name}</h3>
          <div class="event-rule"></div>
          <p class="event-venue">${event.venue}</p>
          <p class="event-time-card">${event.time}</p>
        </article>`).join("");
    } else {
      eventMarkup = weddingConfig.events.map((event, index) => `
        <article class="event-card reveal" style="--delay:${index * 100}ms">
          <div class="event-number">${String(index + 1).padStart(2, "0")}</div>
          <p class="event-date">${event.date}</p>
          <h3>${event.name}</h3>
          <div class="event-rule"></div>
          <p class="event-venue">${event.venue}</p>
          <p class="event-time-card">${event.time}</p>
        </article>
      `).join("");
    }
    $("#eventGrid").innerHTML = eventMarkup;

    const timelineEvents = weddingConfig.events;
    let timelineMarkup = "";
    const timelineSameDay = timelineEvents.length >= 2 && timelineEvents[0].date === timelineEvents[1].date;
    if (timelineSameDay) {
      const first = timelineEvents[0];
      const second = timelineEvents[1];
      timelineMarkup += `
        <article class="timeline-item reveal" style="--delay:0ms">
          <div class="timeline-dot"></div>
          <div class="timeline-date">${first.shortDate}</div>
          <div class="timeline-body timeline-combined">
            <h3>Nikkah &amp; Mehndi</h3>
            <p class="timeline-time">${first.date}</p>
            <div class="timeline-subitem">
              <strong>Nikkah Ceremony</strong>
              <p>${first.time} · ${first.timelineVenue || first.venue}</p>
            </div>
            <div class="timeline-subdivider"></div>
            <div class="timeline-subitem">
              <strong>Mehndi Ceremony</strong>
              <p>${second.time} · ${second.timelineVenue || second.venue}</p>
            </div>
          </div>
        </article>`;
      timelineMarkup += timelineEvents.slice(2).map((event, offset) => `
        <article class="timeline-item reveal" style="--delay:${(offset + 1) * 120}ms">
          <div class="timeline-dot"></div>
          <div class="timeline-date">${event.shortDate}</div>
          <div class="timeline-body">
            <h3>${event.name}</h3>
            <p class="timeline-time">${event.date}, ${event.time}</p>
            <p>${event.timelineVenue || event.venue}</p>
          </div>
        </article>`).join("");
    } else {
      timelineMarkup = timelineEvents.map((event, index) => `
        <article class="timeline-item reveal" style="--delay:${index * 120}ms">
          <div class="timeline-dot"></div>
          <div class="timeline-date">${event.shortDate}</div>
          <div class="timeline-body">
            <h3>${event.name}</h3>
            <p class="timeline-time">${event.date}, ${event.time}</p>
            <p>${event.timelineVenue || event.venue}</p>
          </div>
        </article>`).join("");
    }
    $("#timeline").innerHTML = timelineMarkup;

    const venueEvents = weddingConfig.events;
    const firstTwoSameDay = venueEvents.length >= 2 && venueEvents[0].date === venueEvents[1].date;
    const venueQrAssets = [
      "assets/qr/nikah.png",
      "assets/qr/mehndi.png",
      "assets/qr/baraat.png",
      "assets/qr/valima.png"
    ];
    const qrBlock = (eventIndex, event) => `
      <div class="venue-location-tools">
        <div class="qr-wrap">
          <a class="qr-link" href="${event.mapUrl}" target="_blank" rel="noopener noreferrer" aria-label="Open ${event.name} location in Google Maps">
            <img src="${venueQrAssets[eventIndex]}" alt="QR code for ${event.name} location" loading="lazy" decoding="async">
          </a>
          <span>Tap QR to open map</span>
        </div>
      </div>`;

    let venueMarkup = "";
    let venueIndex = 0;

    if (firstTwoSameDay) {
      venueMarkup += `
        <article class="venue-card venue-card-combined reveal" style="--delay:0ms">
          <div class="venue-header">
            <div class="venue-index">01</div>
            <p class="event-date">${venueEvents[0].date}</p>
          </div>
          <div class="venue-copy venue-copy-combined">
            <h3>Nikkah &amp; Mehndi</h3>
            <div class="venue-subevent">
              <strong>${venueEvents[0].name} — ${venueEvents[0].venue}</strong>
              <p class="venue-time">${venueEvents[0].time}</p>
              <p class="venue-address">${venueEvents[0].address}</p>
              ${qrBlock(0, venueEvents[0])}
            </div>
            <div class="venue-subdivider"></div>
            <div class="venue-subevent">
              <strong>${venueEvents[1].name} — ${venueEvents[1].venue}</strong>
              <p class="venue-time">${venueEvents[1].time}</p>
              <p class="venue-address">${venueEvents[1].address}</p>
              ${qrBlock(1, venueEvents[1])}
            </div>
          </div>
        </article>`;
      venueIndex = 1;
    }

    venueMarkup += venueEvents.slice(firstTwoSameDay ? 2 : 0).map((event, offset) => {
      const index = venueIndex + offset;
      return `
        <article class="venue-card reveal" style="--delay:${index * 100}ms">
          <div class="venue-header">
            <div class="venue-index">${String(index + 1).padStart(2, "0")}</div>
            <p class="event-date">${event.date}</p>
          </div>
          <div class="venue-copy">
            <h3>${event.name}</h3>
            <strong>${event.venue}</strong>
            <p class="venue-time">${event.time}</p>
            <p class="venue-address">${event.address}</p>
            ${qrBlock(index + 1, event)}
          </div>
        </article>`;
    }).join("");

    $("#venueList").innerHTML = venueMarkup;

    $(".countdown-note").textContent = `Until ${weddingConfig.events[0].date} · ${weddingConfig.events[0].name}`;

    if (weddingConfig.media.musicEnabled && weddingConfig.media.music) {
      $("#weddingMusic").src = weddingConfig.media.music;
      $("#musicControl").hidden = false;
    } else {
      $("#musicControl").hidden = true;
    }
  }

  function initEnvelope() {
    const opening = $("#opening");
    const envelope = $("#envelope");
    const seal = $("#openSeal");
    const heroVideo = $("#heroVideo");
    let opened = false;

    function openInvitation() {
      if (opened) return;
      opened = true;
      envelope.classList.add("is-opening");
      opening.classList.add("is-revealing");
      document.body.classList.add("invitation-open");
      heroVideo?.play().then(() => { document.body.classList.remove("video-autoplay-blocked"); }).catch(() => {});

      // The seal click is a trusted user gesture, so start the wedding music here.
      const audio = $("#weddingMusic");
      const musicButton = $("#musicControl");
      if (audio && weddingConfig.media.music) {
        audio.volume = 0.68;
        audio.play().then(() => {
          musicButton?.classList.add("playing");
          musicButton?.setAttribute("aria-label", "Turn wedding music off");
        }).catch(() => {
          musicButton?.classList.remove("playing");
        });
      }

      setTimeout(() => {
        opening.classList.add("is-hidden");
        $("#invitation").scrollIntoView({ behavior: "smooth", block: "start" });
      }, 1800);
    }

    seal.addEventListener("click", openInvitation);
    envelope.addEventListener("click", (event) => {
      if (event.target !== seal) openInvitation();
    });
  }

  function initHeroVideo() {
    const video = $("#heroVideo");
    if (!video) return;

    const tryPlay = () => {
      video.muted = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      video.play()
        .then(() => document.body.classList.remove("video-autoplay-blocked"))
        .catch(() => document.body.classList.add("video-autoplay-blocked"));
    };

    video.addEventListener("canplay", tryPlay, { once: true });
    window.addEventListener("pageshow", tryPlay, { once: true });
    setTimeout(tryPlay, 300);
  }

  function initScratchReveal() {
    const canvas = $("#scratchCanvas");
    const card = $("#scratchCard");
    const status = $("#scratchStatus");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    
    let drawing = false;
    let revealed = false;
    let last = null;
    let cardRect = card.getBoundingClientRect();
    let paths = []; // Store normalized paths for responsive resizing
    let isClick = false; // to distinguish tap from drag

    status.textContent = "Scratch gently or tap to reveal";

    function drawCover(targetCtx, w, h) {
      targetCtx.globalCompositeOperation = "source-over";
      const gradient = targetCtx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, "#6e1930");
      gradient.addColorStop(0.48, "#9c3850");
      gradient.addColorStop(1, "#5a1026");
      targetCtx.fillStyle = gradient;
      targetCtx.fillRect(0, 0, w, h);
      targetCtx.fillStyle = "rgba(255,220,170,.12)";
      for (let x = 0; x < w; x += 18) targetCtx.fillRect(x, 0, 1, h);
      targetCtx.strokeStyle = "rgba(231,194,118,.55)";
      targetCtx.lineWidth = 1;
      targetCtx.strokeRect(12, 12, w - 24, h - 24);
      targetCtx.fillStyle = "rgba(255,246,228,.9)";
      targetCtx.textAlign = "center";
      targetCtx.textBaseline = "middle";
      targetCtx.font = "600 12px DM Sans, sans-serif";
      targetCtx.fillText("SCRATCH TO REVEAL", w / 2, h / 2 - 4);
      targetCtx.font = "400 10px DM Sans, sans-serif";
      targetCtx.fillStyle = "rgba(255,246,228,.68)";
      targetCtx.fillText("A little something is waiting", w / 2, h / 2 + 21);
    }

    function resizeCanvas() {
      if (revealed) return;
      const rect = card.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      cardRect = rect;
      
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = Math.floor(rect.width * dpr);
      const ch = Math.floor(rect.height * dpr);
      
      canvas.width = cw;
      canvas.height = ch;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawCover(ctx, rect.width, rect.height);
      
      // Replay existing scratch paths
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      
      for (const line of paths) {
        ctx.lineWidth = line.size * rect.width;
        ctx.beginPath();
        ctx.moveTo(line.x1 * rect.width, line.y1 * rect.height);
        ctx.lineTo(line.x2 * rect.width, line.y2 * rect.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(line.x2 * rect.width, line.y2 * rect.height, ctx.lineWidth / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const observer = new ResizeObserver(() => requestAnimationFrame(resizeCanvas));
    observer.observe(card);

    function pointFromEvent(event) {
      // Calculate properly relative to the exact bounding client rect
      const rect = card.getBoundingClientRect();
      return { 
        x: event.clientX - rect.left, 
        y: event.clientY - rect.top 
      };
    }

    function doReveal() {
      if (revealed) return;
      revealed = true;
      observer.disconnect();
      canvas.classList.add("fully-revealed");
      card.classList.add("revealed");
      status.textContent = "21st December 2026 · Nikkah & Mehndi · 3:00 PM";
      status.style.opacity = "1";
      setTimeout(() => { canvas.style.opacity = "0"; canvas.style.pointerEvents = "none"; }, 500);
    }

    function scratch(event) {
      if (!drawing || revealed) return;
      const point = pointFromEvent(event);
      
      // If the user moved more than 3 pixels, it's a drag not a tap
      if (isClick && last && (Math.abs(point.x - last.x) > 3 || Math.abs(point.y - last.y) > 3)) {
        isClick = false;
      }
      
      const currentSize = Math.max(40, cardRect.width * 0.12);
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = currentSize;

      if (last) {
        ctx.beginPath();
        ctx.moveTo(last.x, last.y);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
        
        // Save normalized path
        paths.push({
          x1: last.x / cardRect.width,
          y1: last.y / cardRect.height,
          x2: point.x / cardRect.width,
          y2: point.y / cardRect.height,
          size: currentSize / cardRect.width
        });
      }
      ctx.beginPath();
      ctx.arc(point.x, point.y, ctx.lineWidth / 2, 0, Math.PI * 2);
      ctx.fill();
      last = point;
      checkReveal();
    }

    function checkReveal() {
      if (paths.length % 5 !== 0) return; // check less frequently to boost performance
      const sample = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparent = 0;
      const step = 16;
      for (let i = 3; i < sample.length; i += step * 4) if (sample[i] < 40) transparent++;
      const total = sample.length / (step * 4);
      if (transparent / total > 0.40) doReveal();
    }

    canvas.addEventListener("pointerdown", (e) => { 
      if (e.button && e.button !== 0) return; // only left click
      drawing = true; 
      isClick = true;
      last = pointFromEvent(e); 
      cardRect = card.getBoundingClientRect(); // update rect on down
      scratch(e); 
      e.target.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener("pointermove", (e) => {
      if (drawing) {
        e.preventDefault(); 
        scratch(e);
      }
    });
    canvas.addEventListener("pointerup", (e) => { 
      drawing = false; 
      last = null; 
      e.target.releasePointerCapture(e.pointerId);
      if (isClick && !revealed) doReveal(); // Fallback tap-to-reveal
    });
    canvas.addEventListener("pointercancel", (e) => { 
      drawing = false; 
      last = null; 
      isClick = false;
    });

    resizeCanvas();
  }

  function initCountdown() {
    const target = new Date(weddingConfig.countdownTarget).getTime();
    const nodes = {
      days: $("[data-unit='days']"),
      hours: $("[data-unit='hours']"),
      minutes: $("[data-unit='minutes']"),
      seconds: $("[data-unit='seconds']")
    };
    function update() {
      const remaining = Math.max(0, target - Date.now());
      nodes.days.textContent = String(Math.floor(remaining / 86400000)).padStart(2, "0");
      nodes.hours.textContent = String(Math.floor((remaining % 86400000) / 3600000)).padStart(2, "0");
      nodes.minutes.textContent = String(Math.floor((remaining % 3600000) / 60000)).padStart(2, "0");
      nodes.seconds.textContent = String(Math.floor((remaining % 60000) / 1000)).padStart(2, "0");
    }
    update();
    setInterval(update, 1000);
  }

  function initReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    $$(".reveal").forEach((el) => observer.observe(el));
  }

  function initPetals() {
    const layer = $(".petal-layer");
    for (let i = 0; i < 14; i++) {
      const petal = document.createElement("span");
      petal.className = "petal";
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.animationDelay = `${Math.random() * 12}s`;
      petal.style.animationDuration = `${10 + Math.random() * 10}s`;
      petal.style.setProperty("--drift", `${-60 + Math.random() * 120}px`);
      layer.appendChild(petal);
    }
  }

  function initMusic() {
    const button = $("#musicControl");
    const audio = $("#weddingMusic");
    if (!button || !audio || !weddingConfig.media.musicEnabled || !weddingConfig.media.music) return;

    audio.addEventListener("ended", () => {
      button.classList.remove("playing");
      button.setAttribute("aria-label", "Turn wedding music on");
    });

    button.addEventListener("click", async () => {
      if (audio.paused) {
        try {
          await audio.play();
          button.classList.add("playing");
          button.setAttribute("aria-label", "Turn wedding music off");
        } catch (error) {
          button.classList.remove("playing");
          button.setAttribute("aria-label", "Turn wedding music on");
        }
      } else {
        audio.pause();
        button.classList.remove("playing");
        button.setAttribute("aria-label", "Turn wedding music on");
      }
    });
  }

  bindConfig();
  initEnvelope();
  initHeroVideo();
  initScratchReveal();
  initCountdown();
  initReveal();
  initPetals();
  initMusic();
})();
