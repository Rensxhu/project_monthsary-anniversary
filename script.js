const letterText = {
  openingTitle: "Before you look around",
  openingBody:
    "I made this little night page for you. Move this letter when you are ready, then tap the memories slowly.",
  finalTitle: "For when you reach the end",
  finalBody:
    "This final letter is a placeholder for the words I want you to hear. Add the real message here when you are ready."
};

const photos = [
  { id: "photo-1", src: "assets/photos/photo-1.jpg", voice: "assets/voices/photo-1.mp3", caption: "A tiny memory I kept close.", x: 18, y: 172, xRatio: 0.02, yRatio: 0.34, r: "-8deg", z: 11 },
  { id: "photo-2", src: "assets/photos/photo-2.jpg", voice: "assets/voices/photo-2.mp3", caption: "This one feels like a quiet smile.", x: 214, y: 154, xRatio: 0.66, yRatio: 0.18, r: "7deg", z: 5 },
  { id: "photo-3", src: "assets/photos/photo-3.jpg", voice: "assets/voices/photo-3.mp3", caption: "A small piece of my favorite story.", x: 32, y: 446, xRatio: 0.08, yRatio: 0.66, r: "6deg", z: 5 },
  { id: "photo-4", src: "assets/photos/photo-4.jpg", voice: "assets/voices/photo-4.mp3", caption: "I hope this makes you pause and smile.", x: 218, y: 430, xRatio: 0.62, yRatio: 0.58, r: "-6deg", z: 11 },
  { id: "photo-5", src: "assets/photos/photo-5.jpg", voice: "assets/voices/photo-5.mp3", caption: "Another reason I wanted to make this.", x: 50, y: 246, r: "3deg" },
  { id: "photo-6", src: "assets/photos/photo-6.jpg", voice: "assets/voices/photo-6.mp3", caption: "One more memory for the night.", x: 202, y: 286, r: "-4deg" }
];

const videos = [
  { id: "video-1", src: "assets/videos/video-1.mp4", poster: "assets/videos/video-1-poster.jpg", caption: "A moving little memory.", x: 116, y: 326, xRatio: 0.47, yRatio: 0.72, r: "-10deg", z: 12 },
  { id: "video-2", src: "assets/videos/video-2.mp4", poster: "assets/videos/video-2-poster.jpg", caption: "Press play when you want to see it again.", x: 136, y: 88, xRatio: 0.34, yRatio: 0.05, r: "9deg", z: 4 }
];

const storyCards = [
  { type: "photo", ref: "photo-1" },
  { type: "message", text: "Some memories are quiet, but they stay." },
  { type: "video", ref: "video-1" },
  { type: "photo", ref: "photo-3" },
  { type: "message", text: "This page is just a small way to say I care." },
  { type: "video", ref: "video-2" }
];

const state = {
  currentScreen: 1,
  viewerItems: [],
  viewerIndex: 0,
  viewerSource: null,
  activeAudio: null,
  activeVideo: null,
  lastFocusedElement: null,
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
  viewerMedia: document.querySelector("#viewer-media"),
  viewerCaption: document.querySelector("#viewer-caption"),
  viewerPrev: document.querySelector("#viewer-prev"),
  viewerNext: document.querySelector("#viewer-next"),
  viewerToggle: document.querySelector("#viewer-toggle"),
  viewerReplay: document.querySelector("#viewer-replay"),
  finalEnvelope: document.querySelector("#final-envelope"),
  finalLetter: document.querySelector("#final-letter"),
  finalTitle: document.querySelector("#final-letter-title"),
  finalBody: document.querySelector("#final-letter-body"),
  finalAudioToggle: document.querySelector("#final-audio-toggle"),
  finalAudioReplay: document.querySelector("#final-audio-replay")
};

const finalAudio = new Audio("assets/audio/final-letter.mp3");
finalAudio.preload = "metadata";

function init() {
  els.openingTitle.textContent = letterText.openingTitle;
  els.openingBody.textContent = letterText.openingBody;
  els.finalTitle.textContent = letterText.finalTitle;
  els.finalBody.textContent = letterText.finalBody;
  renderMemoryBoard();
  renderStoryCarousel();
  bindNavigation();
  bindOpeningLetter();
  bindViewer();
  bindFinalLetter();
  applyLetterState(false);
}

function renderMemoryBoard() {
  const boardItems = [
    ...photos.slice(0, 4).map((item) => ({ ...item, type: "photo" })),
    ...videos.map((item) => ({ ...item, type: "video" }))
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

function appendCardMedia(card, item, type, index) {
  const src = type === "video" ? item.poster : item.src;
  const label = type === "video" ? "Video memory" : `Photo ${index + 1}`;

  const image = document.createElement("img");
  image.src = src;
  image.alt = label;
  image.draggable = false;
  image.addEventListener("error", () => {
    image.replaceWith(createPlaceholder(label));
  });
  card.appendChild(image);

  if (type === "video") {
    const playBadge = document.createElement("span");
    playBadge.className = "play-badge";
    playBadge.textContent = "Play";
    card.appendChild(playBadge);
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
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && els.mediaViewer.classList.contains("is-open")) {
      closeViewer();
    }
  });
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
  els.mediaViewer.classList.remove("is-open");
  els.mediaViewer.setAttribute("aria-hidden", "true");
  els.viewerMedia.innerHTML = "";
  state.viewerSource = null;
  state.viewerItems = [];
  state.viewerIndex = 0;
  stopAllMedia();
  if (wasOpen && state.lastFocusedElement && typeof state.lastFocusedElement.focus === "function") {
    state.lastFocusedElement.focus();
  }
  state.lastFocusedElement = null;
}

function renderViewer(autoplay) {
  stopAllMedia();
  const item = state.viewerItems[state.viewerIndex];
  if (!item) return;
  els.viewerMedia.innerHTML = "";
  els.viewerCaption.textContent = item.caption || "";
  els.viewerPrev.hidden = state.viewerItems.length < 2;
  els.viewerNext.hidden = state.viewerItems.length < 2;

  if (item.type === "message") {
    const message = document.createElement("div");
    message.className = "viewer-message";
    message.textContent = item.text;
    els.viewerMedia.appendChild(message);
    els.viewerCaption.textContent = "A note between the memories.";
    els.viewerToggle.textContent = "Text";
    els.viewerToggle.disabled = true;
    els.viewerReplay.disabled = true;
  } else if (item.type === "video") {
    const video = document.createElement("video");
    video.src = item.src;
    video.poster = item.poster;
    video.playsInline = true;
    video.preload = "metadata";
    video.addEventListener("error", () => {
      els.viewerMedia.innerHTML = "";
      els.viewerMedia.appendChild(createPlaceholder("Video placeholder"));
    });
    els.viewerMedia.appendChild(video);
    state.activeVideo = video;
    els.viewerToggle.disabled = false;
    els.viewerReplay.disabled = false;
    els.viewerToggle.textContent = "Pause";
    if (autoplay) playSafely(video, "Play");
  } else {
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.caption;
    img.onerror = () => img.replaceWith(createPlaceholder("Photo placeholder"));
    els.viewerMedia.appendChild(img);
    const audio = new Audio(item.voice);
    audio.preload = "metadata";
    state.activeAudio = audio;
    els.viewerToggle.textContent = "Pause";
    audio.addEventListener("error", () => {
      els.viewerToggle.textContent = "Voice not added";
      els.viewerToggle.disabled = true;
      els.viewerReplay.disabled = true;
    });
    els.viewerToggle.disabled = false;
    els.viewerReplay.disabled = false;
    if (autoplay) playSafely(audio, "Play");
  }
}

function stepViewer(direction) {
  if (!state.viewerItems.length) return;
  state.viewerIndex = (state.viewerIndex + direction + state.viewerItems.length) % state.viewerItems.length;
  renderViewer(true);
  syncStoryCarouselToViewer();
}

function toggleCurrentMedia() {
  const media = state.activeVideo || state.activeAudio;
  if (!media) return;
  if (media.paused) {
    playSafely(media, "Play");
    els.viewerToggle.textContent = "Pause";
  } else {
    media.pause();
    els.viewerToggle.textContent = "Play";
  }
}

function replayCurrentMedia() {
  const media = state.activeVideo || state.activeAudio;
  if (!media) return;
  media.currentTime = 0;
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
    playSafely(finalAudio, "Play");
    els.finalAudioToggle.textContent = "Pause";
  });

  els.finalAudioToggle.addEventListener("click", () => {
    stopAllMedia(finalAudio);
    state.activeAudio = finalAudio;
    if (finalAudio.paused) {
      playSafely(finalAudio, "Play");
      els.finalAudioToggle.textContent = "Pause";
    } else {
      finalAudio.pause();
      els.finalAudioToggle.textContent = "Play";
    }
  });

  els.finalAudioReplay.addEventListener("click", () => {
    stopAllMedia(finalAudio);
    state.activeAudio = finalAudio;
    finalAudio.currentTime = 0;
    playSafely(finalAudio, "Play");
    els.finalAudioToggle.textContent = "Pause";
  });

  finalAudio.addEventListener("error", () => {
    els.finalAudioToggle.textContent = "Voice not added";
    els.finalAudioToggle.disabled = true;
    els.finalAudioReplay.disabled = true;
  });
}

function playSafely(media, fallbackText) {
  const result = media.play();
  if (result && typeof result.catch === "function") {
    result.catch(() => {
      if (media === finalAudio) {
        els.finalAudioToggle.textContent = fallbackText;
      } else {
        els.viewerToggle.textContent = fallbackText;
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
  if (state.activeVideo !== except) state.activeVideo = null;
  els.viewerToggle.textContent = "Play";
  els.finalAudioToggle.textContent = finalAudio.paused ? "Play" : "Pause";
}

function getBoardMediaItems() {
  return [
    ...photos.slice(0, 4).map((item) => ({ ...item, type: "photo" })),
    ...videos.map((item) => ({ ...item, type: "video" }))
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

function getMediaById(id) {
  return photos.find((item) => item.id === id) || videos.find((item) => item.id === id);
}

function resetFinalLetter() {
  const screenThree = document.querySelector("#screen-three");
  screenThree.classList.remove("is-open");
  els.finalLetter.classList.remove("is-open");
  els.finalLetter.setAttribute("aria-hidden", "true");
  els.finalEnvelope.setAttribute("aria-expanded", "false");
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
