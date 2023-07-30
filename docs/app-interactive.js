const THRESH = 60000;

const sections = [
  "all my.html",
  "all the.html",
  "best of.html",
  "best wishes.html",
  "can't wait.html",
  "continued prayers.html",
  "get better.html",
  "get well.html",
  "glad to.html",
  "god bless.html",
  "god is.html",
  "good luck.html",
  "hang in.html",
  "happy to.html",
  "he has.html",
  "he is.html",
  "he was.html",
  "he will.html",
  "hope this.html",
  "hope you.html",
  "hoping for.html",
  "i am.html",
  "i believe.html",
  "i can't.html",
  "i can.html",
  "i don't.html",
  "i donated.html",
  "i have.html",
  "i hope.html",
  "i just.html",
  "i know.html",
  "i love.html",
  "i pray.html",
  "i really.html",
  "i think.html",
  "i want.html",
  "i was.html",
  "i will.html",
  "i wish.html",
  "i would.html",
  "i'm praying.html",
  "i'm so.html",
  "if you.html",
  "it is.html",
  "it was.html",
  "i’m so.html",
  "keep fighting.html",
  "keep up.html",
  "keep your.html",
  "keeping you.html",
  "lots of.html",
  "love and.html",
  "love to.html",
  "love you.html",
  "many prayers.html",
  "may you.html",
  "may your.html",
  "much love.html",
  "my heart.html",
  "my prayers.html",
  "my thoughts.html",
  "our family.html",
  "our hearts.html",
  "our prayers.html",
  "our thoughts.html",
  "please know.html",
  "please let.html",
  "prayers and.html",
  "prayers are.html",
  "prayers for.html",
  "prayers to.html",
  "praying for.html",
  "praying that.html",
  "sending all.html",
  "sending healing.html",
  "sending lots.html",
  "sending love.html",
  "sending my.html",
  "sending our.html",
  "sending positive.html",
  "sending prayers.html",
  "sending you.html",
  "she has.html",
  "she is.html",
  "she was.html",
  "so glad.html",
  "so happy.html",
  "so sorry.html",
  "stay strong,.html",
  "stay strong.html",
  "such a.html",
  "take care.html",
  "thank you.html",
  "thanks for.html",
  "they are.html",
  "thinking about.html",
  "thinking of.html",
  "this is.html",
  "thoughts and.html",
  "we all.html",
  "we are.html",
  "we have.html",
  "we hope.html",
  "we know.html",
  "we love.html",
  "we pray.html",
  "we will.html",
  "we wish.html",
  "what a.html",
  "wish you.html",
  "wishing you.html",
  "you and.html",
  "you are.html",
  "you can.html",
  "you got.html",
  "you guys.html",
  "you have.html",
  "you will.html",
  "your family.html",
];

const container = document.querySelector(".container");

let timeout;

function sectionsInView() {
  const allSections = document.querySelectorAll("section");
  const inScreen = [];
  const w = window.innerWidth;

  for (let s of allSections) {
    const b = s.getBoundingClientRect();
    if (b.right >= 0 && b.left < w) {
      inScreen.push(s);
    }
  }
  return inScreen;
}

async function smoothScroll(el, speed = 10, down = true) {
  // speed = pixels/second

  el.scrollTo({ top: down ? 0 : el.scrollHeight, behavior: "smooth" });
  await sleep(1000);

  el.classList.add("autoscroll");
  el.style.height = "fit-content";

  const duration = 1000 * (el.clientHeight / speed);

  let startY = 0;
  let finalY = -el.clientHeight + window.innerHeight;

  if (!down) {
    startY = finalY;
    finalY = 0;
  }

  el.animate([{ transform: `translateY(${startY}px)` }, { transform: `translateY(${finalY}px)` }], {
    duration: duration,
    iterations: Infinity,
    direction: "alternate",
    easing: "linear",
  });
}

function cancelAutoScroll(el) {
  el.classList.remove("autoscroll");
  const { top } = el.getBoundingClientRect();
  for (let a of el.getAnimations()) {
    a.cancel();
  }
  el.scrollTop = 0;
  const scrollY = top * -1;
  el.style.transition = "none";
  el.style.transform = "none";
  el.style.height = "100%";
  el.scrollTop = scrollY + 7;
}

function stopAuto(e) {
  e.stopPropagation();
  clearTimeout(timeout);
  const els = document.querySelectorAll(".autoscroll");
  for (let el of els) {
    cancelAutoScroll(el);
  }
  timeout = setTimeout(startAuto, THRESH);
}

function startAuto() {
  const els = document.querySelectorAll(".autoscroll");
  for (let el of els) {
    cancelAutoScroll(el);
  }
  clearTimeout(timeout);

  let items = Array.from(document.querySelectorAll("section"));
  items = items.filter((i) => i.innerHTML != "");
  const item = items[Math.floor(Math.random() * items.length)];
  item.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });

  timeout = setTimeout(() => {
    const els = sectionsInView();
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      smoothScroll(el, 10, i % 2 == 0);
    }
    timeout = setTimeout(startAuto, THRESH);
  }, 2000);

  // {
  //    const els = sectionsInView();
  //    for (let i = 0; i < els.length; i++) {
  //      const el = els[i];
  //      smoothScroll(el, 10, i % 2 == 0);
  //    }
  // }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function makeSection(url, i) {
  const el = document.createElement("section");
  container.appendChild(el);

  try {
    await sleep(i * 400);
    let response = await fetch("sorts/" + url);
    let html = await response.text();
    el.innerHTML = html;
  } catch (err) {
    console.log("currentscroll", currentScroll);
    console.warn("Something went wrong.", err);
  }
}

for (let i = 0; i < sections.length; i++) {
  makeSection(sections[i], i);
}

["mousemove", "wheel", "keydown", "click", "touchend", "touchstart"].forEach((e) =>
  window.addEventListener(e, stopAuto, true)
);

timeout = setTimeout(startAuto, 5000);
