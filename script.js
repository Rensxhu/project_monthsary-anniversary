const letterText = {
  openingTitle: "Before you look around",
  openingBody:
    "I made this little monthsary page for you. Move this letter when you are ready, then tap the memories slowly .",
  finalTitle: "For when you reach the end",
  finalBody:
    "Dear yeobo Happy monthsary, na malayo na ang narating natin  maraming pag subok na ating nilampasan. Unang una Pasensya na kung wala akong naibigay sayo na regalo kundi itong ginawa ko at itong mesahe  naway na nagustuhan mo ito. Alam mo na sa Bawat natin pag sasama lahat ay naeenjoy ko na kasama kita, Bawat oras, minuto segundo, at araw. Alam ko yun pagod at hirap mo sa kolehiyo nakikita ko yun. Bawat puyat sugat at pag titiis para makatipid  at luha na nararamdaman  mo nakikita ko. Pero nakikita ko yun sayo at tagumpay mo  at proud na proud ako na sayo na achieve mo yun gusto mo  na sulit ang mga pinag hirapan mo  at ngayon na mag aapat na taon kan sa kolehiyo  Gusto ko  na wag ikaw na sumuko at lumaban, mag pokus ka sa iyong  pangarap at andito ako para suportahan ka  kahit malayo man tayo sa isat isa  andito ako sa tabi mo nag paparamdam sayo. I miss you So much yeob  and I Love you so Much  you made me proud  I hope you find this message  be a motivational for you to pursue higher of you dream. Love rence "
};

const photos = [
  { id: "photo-1", src: "assets/photos/photo-1.jpg", caption: "ito yun time na nag manila tayo para sa birthday ni lanlan😊.", x: 18, y: 172, xRatio: 0.02, yRatio: 0.34, r: "-8deg", z: 11 },
  { id: "photo-2", src: "assets/photos/photo-2.jpg", caption: "Our manila date with you relatives😊", x: 214, y: 154, xRatio: 0.66, yRatio: 0.18, r: "7deg", z: 5 },
  { id: "photo-3", src: "assets/photos/photo-3.jpg", caption: "A small piece of my favorite story.", x: 32, y: 446, xRatio: 0.08, yRatio: 0.66, r: "6deg", z: 5 },
  { id: "photo-4", src: "assets/photos/photo-4.jpg", caption: "I hope this makes you pause and smile.", x: 218, y: 430, xRatio: 0.62, yRatio: 0.58, r: "-6deg", z: 11 },
  { id: "photo-5", src: "assets/photos/photo-5.jpg", caption: "dal farm pampanga outing with you and my family", x: 50, y: 246, r: "3deg" },
  { id: "photo-6", src: "assets/photos/photo-6.jpg", caption: "wannabe gengen yarn", x: 202, y: 286, r: "-4deg" },
  { id: "photo-16", src: "assets/photos/photo-16.jpg", caption: "our manaoag date❤️", x: 180, y: 260, r: "2deg" }
];

const finalPhotos = [
  { id: "final-photo-1", src: "assets/photos/photo-9.jpg", caption: "A final little picture I wanted here.", x: "clamp(-108px, -27vw, -82px)", y: "clamp(-136px, -22dvh, -102px)", r: "-9deg", z: 1 },
  { id: "final-photo-2", src: "assets/photos/photo-8.jpg", caption: "This one belongs near the ending.", x: "clamp(112px, 34vw, 156px)", y: "clamp(-146px, -24dvh, -108px)", r: "8deg", z: 2 },
  { id: "final-photo-4", src: "assets/photos/photo-10.jpg", caption: "Another reason this page feels warm.", x: "clamp(140px, 29vw, 122px)", y: "clamp(-42px, -6dvh, -24px)", r: "-7deg", z: 4 },
  { id: "final-photo-5", src: "assets/photos/photo-11.jpg", caption: "A tiny piece of the story saved here.", x: "clamp(-250px, -27vw, -82px)", y: "clamp(92px, 17dvh, 126px)", r: "-4deg", z: 5 },
  { id: "final-photo-6", src: "assets/photos/photo-12.jpg", caption: "One more photo for the letter.", x: "clamp(140px, 34vw, 154px)", y: "clamp(96px, 18dvh, 132px)", r: "5deg", z: 6 },
  { id: "final-photo-7", src: "assets/photos/photo-13.jpg", caption: "A last memory peeking from the paper.", x: "clamp(-32px, -8vw, -18px)", y: "clamp(-174px, -28dvh, -126px)", r: "3deg", z: 1 },
  { id: "final-photo-8", src: "assets/photos/photo-14.jpg", caption: "This one closes the envelope softly.", x: "clamp(0px, 4vw, 24px)", y: "clamp(134px, 24dvh, 168px)", r: "-3deg", z: 2 }
];

const videos = [
  { id: "video-1", src: "assets/videos/video-1.mp4", caption: "A moving little memory.", x: 116, y: 326, xRatio: 0.47, yRatio: 0.72, r: "-10deg", z: 12 },
  { id: "video-2", src: "assets/videos/video-2.mp4", caption: "Press play when you want to see it again.", x: 136, y: 88, xRatio: 0.34, yRatio: 0.05, r: "9deg", z: 4 },
  { id: "video-3", src: "assets/videos/video-3.mp4", caption: "street ihaw date natin walang budget.", r: "-2deg" },
  { id: "video-4", src: "assets/videos/video-4.mp4", caption: " first time ko mag biyahe pa baymabang para samahan ka hehehehe.", r: "2deg" }
];

const storyCards = [
  { type: "photo", ref: "photo-5" },
  { type: "message", text: "Some memories are quiet, but they stay." },
  { type: "video", ref: "video-3" },
  { type: "photo", ref: "photo-16" },
  { type: "message", text: "This page is to show my love and care for you wether you're down and happy" },
  { type: "video", ref: "video-4" }
];

const state = {
  currentScreen: 1,
  viewerItems: [],
  viewerIndex: 0,
  viewerSource: null,
  activeAudio: null,
  activeVideo: null,
  activeVideoKeepsBackgroundMusic: false,
  lastFocusedElement: null,
  viewerTransitionDirection: null,
  finalTextAutoScrollFrame: null,
  backgroundMusicStarted: false,
  backgroundMusicPausedForVideo: false,
  backgroundMusicFadeFrame: null,
  letterPinned: localStorage.getItem("gf-letter-position") === "moved"
};

const els = {
  screens: [...document.querySelectorAll(".screen")],
  memoryBoard: document.querySelector("#memory-board"),
  openingLetter: document.querySelector("#opening-letter"),
  openingTitle: document.querySelector("#opening-letter-title"),
  openingBody: document.querySelector("#opening-letter-body"),
  storyCarousel: document.querySelector("#story-carousel"),
  mediaViewer: document.querySelector("#media-viewer"),
  viewerCard: document.querySelector(".viewer-card"),
  viewerMedia: document.querySelector("#viewer-media"),
  viewerCaption: document.querySelector("#viewer-caption"),
  viewerPrev: document.querySelector("#viewer-prev"),
  viewerNext: document.querySelector("#viewer-next"),
  viewerToggle: document.querySelector("#viewer-toggle"),
  viewerReplay: document.querySelector("#viewer-replay"),
  finalEnvelope: document.querySelector("#final-envelope"),
  finalPhotoStack: document.querySelector("#final-photo-stack"),
  finalLetter: document.querySelector("#final-letter"),
  finalTitle: document.querySelector("#final-letter-title"),
  finalBody: document.querySelector("#final-letter-body"),
  finalAudioToggle: document.querySelector("#final-audio-toggle"),
  finalAudioReplay: document.querySelector("#final-audio-replay")
};

const finalAudio = new Audio("assets/audio/final-letter.mp3");
finalAudio.preload = "metadata";

const backgroundMusic = new Audio("assets/audio/background.mp3");
backgroundMusic.loop = true;
backgroundMusic.preload = "metadata";
backgroundMusic.volume = 0.35;

function init() {
  els.openingTitle.textContent = letterText.openingTitle;
  els.openingBody.textContent = letterText.openingBody;
  els.finalTitle.textContent = letterText.finalTitle;
  els.finalBody.textContent = letterText.finalBody;
  renderMemoryBoard();
  renderStoryCarousel();
  renderFinalPhotoStack();
  bindNavigation();
  bindOpeningLetter();
  bindViewer();
  bindFinalLetter();
  bindBackgroundMusicStart();
  applyLetterState(false);
}

function renderMemoryBoard() {
  const boardItems = [
    ...photos.slice(0, 4).map((item) => ({ ...item, type: "photo" })),
    ...videos.slice(0, 2).map((item) => ({ ...item, type: "video" }))
  ];

  els.memoryBoard.innerHTML = "";
  boardItems.forEach((item, index) => {
    const saved = getSavedPosition(item.id);
    const card = document.createElement("button");
    card.type = "button";
    card.className = "memory-card";
    card.dataset.id = item.id;
    card.dataset.type = item.type;
    card.style.setProperty("--r", item.r);
    card.style.setProperty("--z", item.z ?? 3);
    appendCardMedia(card, item, item.type, index);
    els.memoryBoard.appendChild(card);
    const fallback = getDefaultCardPosition(item, card);
    const initial = constrainToBoard(saved?.x ?? fallback.x, saved?.y ?? fallback.y, card);
    card.style.setProperty("--x", `${initial.x}px`);
    card.style.setProperty("--y", `${initial.y}px`);
    makeDraggable(card, item);
  });
}

function renderStoryCarousel() {
  els.storyCarousel.innerHTML = "";
  storyCards.forEach((card, index) => {
    const node = document.createElement("button");
    node.type = "button";
    node.className = `story-card ${card.type === "message" ? "message-card" : ""}`;
    node.style.setProperty("--r", index % 2 ? "1.8deg" : "-1.8deg");
    node.dataset.type = card.type;
    node.dataset.storyIndex = index;

    if (card.type === "message") {
      const text = document.createElement("p");
      text.textContent = card.text;
      node.appendChild(text);
      node.addEventListener("click", () => openViewer(getStoryMediaItems(), getStoryMediaIndexByStoryIndex(index), "screen-2-carousel"));
    } else {
      const item = getMediaById(card.ref);
      node.dataset.id = item.id;
      appendCardMedia(node, item, card.type, index);
      node.addEventListener("click", () => openViewer(getStoryMediaItems(), getStoryMediaIndexByStoryIndex(index), "screen-2-carousel"));
    }

    els.storyCarousel.appendChild(node);
  });
}

function renderFinalPhotoStack() {
  els.finalPhotoStack.innerHTML = "";
  finalPhotos.forEach((item, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "final-photo-card";
    card.dataset.id = item.id;
    card.style.setProperty("--fr", item.r);

    const image = document.createElement("img");
    image.src = item.src;
    image.alt = item.caption;
    image.draggable = false;
    image.addEventListener("error", () => {
      image.replaceWith(createPlaceholder(`Photo ${index + 7}`));
    });
    card.appendChild(image);

    card.addEventListener("click", () => {
      openViewer(getFinalPhotoItems(), index, "screen-3-envelope");
    });
    els.finalPhotoStack.appendChild(card);
  });
}

function appendCardMedia(card, item, type, index) {
  const label = type === "video" ? "Video memory" : `Photo ${index + 1}`;

  if (type === "video") {
    const preview = document.createElement("video");
    preview.src = item.src;
    preview.muted = true;
    preview.playsInline = true;
    preview.preload = "metadata";
    preview.setAttribute("aria-label", label);
    preview.addEventListener("loadedmetadata", () => {
      preview.currentTime = Math.min(0.1, preview.duration || 0);
    });
    preview.addEventListener("error", () => {
      preview.replaceWith(createPlaceholder(label));
    });
    card.appendChild(preview);

    const playBadge = document.createElement("span");
    playBadge.className = "play-badge";
    playBadge.textContent = "Play";
    card.appendChild(playBadge);
  } else {
    const image = document.createElement("img");
    image.src = item.src;
    image.alt = label;
    image.draggable = false;
    image.addEventListener("error", () => {
      image.replaceWith(createPlaceholder(label));
    });
    card.appendChild(image);
  }

  const labelNode = document.createElement("span");
  labelNode.className = "card-label";
  labelNode.textContent = label;
  card.appendChild(labelNode);
}

window.createPlaceholder = function createPlaceholder(label) {
  const placeholder = document.createElement("div");
  placeholder.className = "placeholder-media";
  placeholder.textContent = label;
  return placeholder;
};

function makeDraggable(card, item) {
  let pointerId = null;
  let startX = 0;
  let startY = 0;
  let baseX = 0;
  let baseY = 0;
  let moved = false;

  card.addEventListener("pointerdown", (event) => {
    if (!state.letterPinned) return;
    pointerId = event.pointerId;
    card.setPointerCapture(pointerId);
    const current = getCardTranslate(card);
    startX = event.clientX;
    startY = event.clientY;
    baseX = current.x;
    baseY = current.y;
    moved = false;
    card.classList.add("is-dragging");
  });

  card.addEventListener("pointermove", (event) => {
    if (pointerId !== event.pointerId) return;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) moved = true;
    const next = constrainToBoard(baseX + dx, baseY + dy, card);
    card.style.setProperty("--x", `${next.x}px`);
    card.style.setProperty("--y", `${next.y}px`);
  });

  card.addEventListener("pointerup", (event) => {
    if (pointerId !== event.pointerId) return;
    card.releasePointerCapture(pointerId);
    card.classList.remove("is-dragging");
    pointerId = null;
    const current = getCardTranslate(card);
    savePosition(item.id, current);
    if (!moved) {
      const items = getBoardMediaItems();
      openViewer(items, items.findIndex((media) => media.id === item.id), "screen-1-board");
    }
  });

  card.addEventListener("pointercancel", () => {
    pointerId = null;
    card.classList.remove("is-dragging");
  });
}

function bindOpeningLetter() {
  let pointerId = null;
  let startX = 0;
  let startY = 0;
  let lastX = 0;
  let lastY = 0;
  let moved = false;

  els.openingLetter.addEventListener("pointerdown", (event) => {
    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    lastX = 0;
    lastY = 0;
    moved = false;
    els.openingLetter.setPointerCapture(pointerId);
  });

  els.openingLetter.addEventListener("pointermove", (event) => {
    if (pointerId !== event.pointerId || state.letterPinned) return;
    lastX = event.clientX - startX;
    lastY = event.clientY - startY;
    if (Math.abs(lastX) > 5 || Math.abs(lastY) > 5) moved = true;
    els.openingLetter.style.transform = `translate(calc(-50% + ${lastX}px), calc(-50% + ${lastY}px)) rotate(${lastX / 28 - 2}deg)`;
  });

  els.openingLetter.addEventListener("pointerup", (event) => {
    if (pointerId !== event.pointerId) return;
    els.openingLetter.releasePointerCapture(pointerId);
    pointerId = null;

    if (state.letterPinned) {
      if (!moved) reopenLetter();
      return;
    }

    const distance = Math.hypot(lastX, lastY);
    if (distance > 60 || Math.abs(lastX) > 48) {
      pinLetter();
    } else {
      els.openingLetter.style.transform = "";
    }
  });

  els.openingLetter.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      state.letterPinned ? reopenLetter() : pinLetter();
    }
  });
}

function reopenLetter() {
  state.letterPinned = false;
  localStorage.setItem("gf-letter-position", "center");
  applyLetterState(true);
}

function pinLetter() {
  state.letterPinned = true;
  localStorage.setItem("gf-letter-position", "moved");
  applyLetterState(true);
}

function applyLetterState(animate) {
  els.openingLetter.classList.toggle("is-pinned", state.letterPinned);
  els.memoryBoard.classList.toggle("is-locked", !state.letterPinned);
  if (!animate) els.openingLetter.style.transitionDuration = "0ms";
  els.openingLetter.style.transform = "";
  requestAnimationFrame(() => {
    els.openingLetter.style.transitionDuration = "";
  });
}

function bindNavigation() {
  document.querySelector("#to-story").addEventListener("click", (event) => {
    event.stopPropagation();
    showScreen(2);
  });

  document.querySelector("#to-final")?.addEventListener("click", (event) => {
    event.stopPropagation();
    showScreen(3);
  });

  document.querySelectorAll("[data-go]").forEach((button) => {
    if (button.id === "to-final") return;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      showScreen(Number(button.dataset.go));
    });
  });
}

function showScreen(screenNumber) {
  if (screenNumber === 3) closeViewer();
  if (state.currentScreen === 3 && screenNumber !== 3) resetFinalLetter();
  stopAllMedia();
  resumeBackgroundMusic();
  state.currentScreen = screenNumber;
  els.screens.forEach((screen) => {
    screen.classList.toggle("is-active", Number(screen.dataset.screen) === screenNumber);
  });

  if (screenNumber === 3) {
    document.querySelector("#screen-three").scrollTop = 0;
  }
}

function bindViewer() {
  document.querySelectorAll("[data-close-viewer]").forEach((node) => {
    node.addEventListener("click", closeViewer);
  });
  els.viewerPrev.addEventListener("click", () => stepViewer(-1));
  els.viewerNext.addEventListener("click", () => stepViewer(1));
  els.viewerToggle.addEventListener("click", toggleCurrentMedia);
  els.viewerReplay.addEventListener("click", replayCurrentMedia);
  els.viewerCard.addEventListener("animationend", () => {
    els.viewerCard.classList.remove("is-flipping-next", "is-flipping-prev");
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && els.mediaViewer.classList.contains("is-open")) {
      closeViewer();
    }
  });
}

function bindBackgroundMusicStart() {
  document.addEventListener("pointerdown", startBackgroundMusic, { once: true });
}

function startBackgroundMusic() {
  if (state.backgroundMusicStarted) return;
  state.backgroundMusicStarted = true;
  backgroundMusic.volume = 0.35;
  playSafely(backgroundMusic, "");
}

function fadeBackgroundMusic(targetVolume, duration = 450) {
  if (!state.backgroundMusicStarted || backgroundMusic.error) return;
  window.cancelAnimationFrame(state.backgroundMusicFadeFrame);

  const startVolume = backgroundMusic.volume;
  const startTime = performance.now();

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    backgroundMusic.volume = startVolume + ((targetVolume - startVolume) * progress);

    if (progress < 1) {
      state.backgroundMusicFadeFrame = window.requestAnimationFrame(step);
    } else {
      state.backgroundMusicFadeFrame = null;
    }
  }

  state.backgroundMusicFadeFrame = window.requestAnimationFrame(step);
}

function duckBackgroundMusic() {
  if (state.backgroundMusicPausedForVideo) return;
  if (state.backgroundMusicStarted && backgroundMusic.paused) {
    playSafely(backgroundMusic, "");
  }
  fadeBackgroundMusic(0.08);
}

function pauseBackgroundMusicForVideo() {
  if (!state.backgroundMusicStarted) return;
  window.cancelAnimationFrame(state.backgroundMusicFadeFrame);
  state.backgroundMusicFadeFrame = null;
  state.backgroundMusicPausedForVideo = true;
  backgroundMusic.pause();
}

function resumeBackgroundMusic() {
  if (!state.backgroundMusicStarted) return;
  state.backgroundMusicPausedForVideo = false;
  if (backgroundMusic.paused) {
    playSafely(backgroundMusic, "");
  }
  fadeBackgroundMusic(0.35);
}

function openViewer(items, index, source = null) {
  state.lastFocusedElement = document.activeElement;
  state.viewerItems = items;
  state.viewerIndex = Math.max(0, index);
  state.viewerSource = source;
  els.mediaViewer.classList.add("is-open");
  els.mediaViewer.setAttribute("aria-hidden", "false");
  renderViewer(true);
  syncStoryCarouselToViewer();
  document.querySelector(".close-button")?.focus();
}

function closeViewer() {
  const wasOpen = els.mediaViewer.classList.contains("is-open");
  const keepFinalAudio = state.viewerSource === "screen-3-envelope";
  els.mediaViewer.classList.remove("is-open");
  els.mediaViewer.setAttribute("aria-hidden", "true");
  els.viewerMedia.innerHTML = "";
  els.viewerCard.classList.remove("is-flipping-next", "is-flipping-prev");
  state.viewerSource = null;
  state.viewerItems = [];
  state.viewerIndex = 0;
  state.viewerTransitionDirection = null;
  stopAllMedia(keepFinalAudio ? finalAudio : null);
  if (keepFinalAudio && !finalAudio.paused) {
    duckBackgroundMusic();
  } else {
    resumeBackgroundMusic();
  }
  if (wasOpen && state.lastFocusedElement && typeof state.lastFocusedElement.focus === "function") {
    state.lastFocusedElement.focus();
  }
  state.lastFocusedElement = null;
}

function renderViewer(autoplay) {
  const item = state.viewerItems[state.viewerIndex];
  if (!item) return;
  const keepFinalAudio = state.viewerSource === "screen-3-envelope";
  stopAllMedia(keepFinalAudio ? finalAudio : null);
  els.viewerCard.classList.remove("is-flipping-next", "is-flipping-prev");
  els.viewerMedia.innerHTML = "";
  els.viewerCaption.textContent = item.caption || "";
  els.viewerPrev.hidden = state.viewerItems.length < 2;
  els.viewerNext.hidden = state.viewerItems.length < 2;

  if (item.type === "message") {
    resumeBackgroundMusic();
    const message = document.createElement("div");
    message.className = "viewer-message";
    message.textContent = item.text;
    els.viewerMedia.appendChild(message);
    els.viewerCaption.textContent = "A note between the memories.";
    els.viewerToggle.textContent = "Text";
    els.viewerToggle.disabled = true;
    els.viewerReplay.disabled = true;
  } else if (item.type === "video") {
    const keepBackgroundMusic = state.viewerSource === "screen-2-carousel" && item.id === "video-3";
    if (keepBackgroundMusic) {
      resumeBackgroundMusic();
    } else {
      pauseBackgroundMusicForVideo();
    }
    const video = document.createElement("video");
    video.src = item.src;
    video.muted = keepBackgroundMusic;
    video.playsInline = true;
    video.preload = "metadata";
    video.addEventListener("error", () => {
      els.viewerMedia.innerHTML = "";
      els.viewerMedia.appendChild(createPlaceholder("Video placeholder"));
      resumeBackgroundMusic();
    });
    els.viewerMedia.appendChild(video);
    state.activeVideo = video;
    state.activeVideoKeepsBackgroundMusic = keepBackgroundMusic;
    els.viewerToggle.disabled = false;
    els.viewerReplay.disabled = false;
    els.viewerToggle.textContent = "Pause";
    video.addEventListener("ended", resumeBackgroundMusic);
    if (autoplay) playSafely(video, "Play");
  } else {
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.caption;
    img.onerror = () => img.replaceWith(createPlaceholder("Photo placeholder"));
    els.viewerMedia.appendChild(img);
    if (keepFinalAudio && !finalAudio.paused) {
      duckBackgroundMusic();
    } else {
      resumeBackgroundMusic();
    }
    els.viewerToggle.textContent = "Photo";
    els.viewerToggle.disabled = true;
    els.viewerReplay.disabled = true;
  }
}

function stepViewer(direction) {
  if (!state.viewerItems.length) return;
  const shouldFlip = state.viewerSource === "screen-3-envelope";
  state.viewerTransitionDirection = shouldFlip ? direction : null;
  state.viewerIndex = (state.viewerIndex + direction + state.viewerItems.length) % state.viewerItems.length;
  renderViewer(true);
  if (shouldFlip) {
    els.viewerCard.classList.add(direction > 0 ? "is-flipping-next" : "is-flipping-prev");
  }
  syncStoryCarouselToViewer();
}

function toggleCurrentMedia() {
  const media = state.activeVideo || state.activeAudio;
  if (!media) return;
  if (media.paused) {
    if (media === state.activeVideo) {
      if (state.activeVideoKeepsBackgroundMusic) {
        resumeBackgroundMusic();
      } else {
        pauseBackgroundMusicForVideo();
      }
    } else {
      duckBackgroundMusic();
    }
    playSafely(media, "Play");
    els.viewerToggle.textContent = "Pause";
  } else {
    media.pause();
    resumeBackgroundMusic();
    els.viewerToggle.textContent = "Play";
  }
}

function replayCurrentMedia() {
  const media = state.activeVideo || state.activeAudio;
  if (!media) return;
  media.currentTime = 0;
  if (media === state.activeVideo) {
    if (state.activeVideoKeepsBackgroundMusic) {
      resumeBackgroundMusic();
    } else {
      pauseBackgroundMusicForVideo();
    }
  } else {
    duckBackgroundMusic();
  }
  playSafely(media, "Play");
  els.viewerToggle.textContent = "Pause";
}

function bindFinalLetter() {
  els.finalEnvelope.addEventListener("click", () => {
    document.querySelector("#screen-three").classList.add("is-open");
    els.finalLetter.classList.add("is-open");
    els.finalLetter.setAttribute("aria-hidden", "false");
    els.finalEnvelope.setAttribute("aria-expanded", "true");
    stopAllMedia(finalAudio);
    state.activeAudio = finalAudio;
    duckBackgroundMusic();
    playSafely(finalAudio, "Play");
    els.finalAudioToggle.textContent = "Pause";
    startFinalTextAutoScroll();
  });

  els.finalAudioToggle.addEventListener("click", () => {
    stopAllMedia(finalAudio);
    state.activeAudio = finalAudio;
    if (finalAudio.paused) {
      duckBackgroundMusic();
      playSafely(finalAudio, "Play");
      els.finalAudioToggle.textContent = "Pause";
    } else {
      finalAudio.pause();
      resumeBackgroundMusic();
      els.finalAudioToggle.textContent = "Play";
    }
  });

  els.finalAudioReplay.addEventListener("click", () => {
    stopAllMedia(finalAudio);
    state.activeAudio = finalAudio;
    finalAudio.currentTime = 0;
    duckBackgroundMusic();
    playSafely(finalAudio, "Play");
    els.finalAudioToggle.textContent = "Pause";
  });

  finalAudio.addEventListener("ended", resumeBackgroundMusic);

  finalAudio.addEventListener("error", () => {
    els.finalAudioToggle.textContent = "Voice not added";
    els.finalAudioToggle.disabled = true;
    els.finalAudioReplay.disabled = true;
    resumeBackgroundMusic();
  });
}

function playSafely(media, fallbackText) {
  const result = media.play();
  if (result && typeof result.catch === "function") {
    result.catch(() => {
      if (media === finalAudio) {
        els.finalAudioToggle.textContent = fallbackText;
        resumeBackgroundMusic();
      } else if (media !== backgroundMusic) {
        els.viewerToggle.textContent = fallbackText;
        resumeBackgroundMusic();
      }
    });
  }
}

function stopAllMedia(except = null) {
  [state.activeAudio, state.activeVideo, finalAudio].forEach((media) => {
    if (media && media !== except) {
      media.pause();
      media.currentTime = 0;
    }
  });
  if (state.activeAudio !== except) state.activeAudio = null;
  if (state.activeVideo !== except) {
    state.activeVideo = null;
    state.activeVideoKeepsBackgroundMusic = false;
  }
  els.viewerToggle.textContent = "Play";
  els.finalAudioToggle.textContent = finalAudio.paused ? "Play" : "Pause";
}

function getBoardMediaItems() {
  return [
    ...photos.slice(0, 4).map((item) => ({ ...item, type: "photo" })),
    ...videos.slice(0, 2).map((item) => ({ ...item, type: "video" }))
  ];
}

function getStoryMediaItems() {
  return storyCards
    .map((card, storyIndex) => ({ card, storyIndex }))
    .map(({ card, storyIndex }) => {
      if (card.type === "message") {
        return {
          id: `message-${storyIndex}`,
          type: "message",
          text: card.text,
          storyIndex
        };
      }

      return { ...getMediaById(card.ref), type: card.type, storyIndex };
    });
}

function getStoryMediaIndexByStoryIndex(storyIndex) {
  return getStoryMediaItems().findIndex((item) => item.storyIndex === storyIndex);
}

function getFinalPhotoItems() {
  return finalPhotos.map((item) => ({ ...item, type: "photo" }));
}

function getMediaById(id) {
  return photos.find((item) => item.id === id) || videos.find((item) => item.id === id);
}

function resetFinalLetter() {
  const screenThree = document.querySelector("#screen-three");
  stopFinalTextAutoScroll();
  screenThree.classList.remove("is-open");
  els.finalLetter.classList.remove("is-open");
  els.finalLetter.setAttribute("aria-hidden", "true");
  els.finalEnvelope.setAttribute("aria-expanded", "false");
  els.finalLetter.scrollTop = 0;
}

function startFinalTextAutoScroll() {
  stopFinalTextAutoScroll();
  els.finalLetter.scrollTop = 0;

  window.requestAnimationFrame(() => {
    const maxScroll = els.finalLetter.scrollHeight - els.finalLetter.clientHeight;
    if (maxScroll <= 0) return;

    const duration = 105000;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      els.finalLetter.scrollTop = maxScroll * eased;

      if (progress < 1) {
        state.finalTextAutoScrollFrame = window.requestAnimationFrame(step);
      } else {
        state.finalTextAutoScrollFrame = null;
      }
    }

    state.finalTextAutoScrollFrame = window.requestAnimationFrame(step);
  });
}

function stopFinalTextAutoScroll() {
  if (!state.finalTextAutoScrollFrame) return;
  window.cancelAnimationFrame(state.finalTextAutoScrollFrame);
  state.finalTextAutoScrollFrame = null;
}

function syncStoryCarouselToViewer() {
  if (state.viewerSource !== "screen-2-carousel") return;
  const item = state.viewerItems[state.viewerIndex];
  if (!item || item.storyIndex === undefined) return;

  const targetCard = els.storyCarousel.querySelectorAll(".story-card")[item.storyIndex];
  if (!targetCard) return;

  const left = targetCard.offsetLeft - (els.storyCarousel.clientWidth / 2) + (targetCard.clientWidth / 2);
  els.storyCarousel.scrollTo({
    left: Math.max(0, left),
    behavior: "smooth"
  });
}

function getCardTranslate(card) {
  return {
    x: Number.parseFloat(card.style.getPropertyValue("--x")) || 0,
    y: Number.parseFloat(card.style.getPropertyValue("--y")) || 0
  };
}

function getDefaultCardPosition(item, card) {
  const boardRect = els.memoryBoard.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  const usableX = Math.max(0, boardRect.width - cardRect.width);
  const usableY = Math.max(0, boardRect.height - cardRect.height);

  return {
    x: item.xRatio === undefined ? item.x : usableX * item.xRatio,
    y: item.yRatio === undefined ? item.y : usableY * item.yRatio
  };
}

function constrainToBoard(x, y, card) {
  const boardRect = els.memoryBoard.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  const maxX = Math.max(0, boardRect.width - cardRect.width);
  const maxY = Math.max(0, boardRect.height - cardRect.height);
  return {
    x: Math.min(Math.max(0, x), maxX),
    y: Math.min(Math.max(0, y), maxY)
  };
}

function savePosition(id, position) {
  const positions = JSON.parse(localStorage.getItem("gf-card-positions") || "{}");
  positions[id] = position;
  localStorage.setItem("gf-card-positions", JSON.stringify(positions));
}

function getSavedPosition(id) {
  const positions = JSON.parse(localStorage.getItem("gf-card-positions") || "{}");
  return positions[id];
}

init();
