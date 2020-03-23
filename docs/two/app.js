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

// const container = document.querySelector("#right");
const container = document.querySelector(".container");

function startAnimating(el, speed = 1, fps = 30, startDelay = 100) {
  const restartTime = 2000;
  const goToTopDelay = 5000;
  let frameId;
  let startTimeout;
  let now, elapsed;

  let fpsInterval = 1000 / fps;
  let then = Date.now();
  let startTime = then;

  if (speed == -1) {
    el.scrollTop = el.scrollHeight - el.clientHeight;
  }

  function scrollWishes() {
    clearTimeout(startTimeout);
    frameId = requestAnimationFrame(scrollWishes);

    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);

      if (speed > 0) {
        if (el.scrollTop < el.scrollHeight - el.clientHeight) {
          el.scrollTop += speed;
        } else {
          el.scrollTop = 0;

          setTimeout(() => {
            cancelAnimationFrame(frameId);
            frameId = requestAnimationFrame(scrollWishes);
          }, goToTopDelay);
        }
      } else {
        if (el.scrollTop > 0) {
          el.scrollTop += speed;
        } else {
          el.scrollTop = el.scrollHeight - el.clientHeight;

          setTimeout(() => {
            cancelAnimationFrame(frameId);
            frameId = requestAnimationFrame(scrollWishes);
          }, goToTopDelay);
        }
      }
    }
  }

  scrollWishes();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function closeModal(el) {
  el.addEventListener("click", e => {
    el.parentNode.style.display = "none";
  });
}

function openModal(el) {
  el.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(el.getAttribute("href")).style.display = "block";
  });
}

async function makeSection(url, i) {
  try {


    const el = document.createElement("div");
    el.classList.add("wish");
    container.appendChild(el);

    await sleep(i*500);
    let response = await fetch("../sorts/" + url);
    let html = await response.text();
    el.innerHTML = html;
    // const speed = i % 2 == 0 ? -1 : 1;
    // const fps = 5;//20 + Math.random() * 10;
    // const startDelay = 100 + Math.random() * 500;
    // startAnimating(el, speed, fps, startDelay);

    // el.addEventListener("mouseover", () => {
    //   el.style.overflow = "scroll";
    // });
    //
    // el.addEventListener("mouseoout", () => {
    //   el.style.overflow = "hidden";
    // });
  } catch (err) {
    console.warn("Something went wrong.", err);
  }
}

// for (let section of sections) {
for (let i = 0; i < sections.length; i++) {
  makeSection(sections[i], i);
}

document.querySelectorAll(".open").forEach(openModal);
document.querySelectorAll(".close").forEach(closeModal);
document.querySelector("#toggle").addEventListener("click", (e) => {
  console.log(e);
  document.querySelector("#left").classList.toggle("hide");
});
