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

function sectionsInView() {
	const allSections = document.querySelectorAll('section')
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

function randomScroller(el) {
	const { height } = el.getBoundingClientRect();
	let timeout;
	const min = 0;
	const max = 20;

	el.addEventListener('scrollend', () => {
		goto();
	});

	function goto() {
		// const pos = Math.floor(Math.random() * (max - min + 1) + min);
		const pos = 10;
		timout = setTimeout(() => {
			// el.scrollTo({top: Math.random()*height, left: 0, behavior: "smooth"});
			el.scrollBy({ top: pos, left: 0, behavior: "smooth" });
		}, 600);
	}

	goto();

}

function smoothScrollDown(scroller, duration = 10000) {
	const start = performance.now();
	const end = start + duration;
	const startPosition = scroller.scrollTop;

	function scrollStep(timestamp) {
		const currentTime = timestamp || performance.now();
		const progress = Math.min((currentTime - start) / duration, 1);
		const easedProgress = 0.5 - Math.cos(progress * Math.PI) / 2; // Easing function (Cosine)

		scroller.scrollTop = startPosition + easedProgress * (scroller.scrollHeight - scroller.clientHeight);

		if (currentTime < end) {
			requestAnimationFrame(scrollStep);
		}
	}

	requestAnimationFrame(scrollStep);
}

function smoothScroll(el, duration = 10, direction = "down") {
	el.classList.add('autoscroll');
	const currentScroll = el.scrollTop;
	el.style.height = 'fit-content';
	const finalY = direction == 'up' ? 0 : -el.clientHeight + window.innerHeight;
	el.animate([
		{ transform: `translateY(0px)` },
		{ transform: `translateY(${finalY}px)` },
		// { transform: `translateY(${-currentScroll}px)` },
		// { transform: `translateY(${finalY}px)` },
		// { transform: `translateY(0px)` }
	], {
		duration: duration * 1000,
		iterations: Infinity,
		direction: 'alternate',
		easing: 'linear',
	});
	// el.style.transform = `translateY(${-currentScroll}px)`;
	//
	// setTimeout(() => {
	// 	const finalY = direction == 'up' ? 0 : -el.clientHeight + window.innerHeight;
	// 	el.style.transition = `transform ${duration}s linear`;
	// 	el.style.transform = `translateY(${finalY}px)`;
	// }, 10)
}

function cancelAutoScroll(el) {
	el.classList.remove('autoscroll');
	const { top } = el.getBoundingClientRect();
	for (let a of el.getAnimations()) {
		a.cancel();
	}
	el.scrollTop = 0;
	const scrollY = top * -1;
	el.style.transition = 'none';
	el.style.transform = 'none';
	el.style.height = '100%';
	el.scrollTop = scrollY+7;
}

function stopAuto(e) {
	e.stopPropagation();
	// e.preventDefault();
	clearTimeout(timeout);
	const els = document.querySelectorAll('.autoscroll');
	for (let el of els) {
		cancelAutoScroll(el);
	}
	timeout = setTimeout(startAuto, THRESH);
}

function startAuto() {
	let items = Array.from(document.querySelectorAll('section'));
	items = items.filter((i) => {
		return i.innerHTML != ''
	});
	const item = items[Math.floor(Math.random() * items.length)];
	item.scrollIntoView({behavior: 'smooth'});

	timeout = setTimeout(() => {
		const els = sectionsInView();
		for (let el of els) {
			el.scrollTo({top: 0, behavior: 'smooth'});
			smoothScroll(el, Math.random() * 300 + 100, 'down');
			// smoothScroll(el, Math.random() * 4 + 1, 'down');
		}
	}, 1000);
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
	console.log('currentscroll', currentScroll);
		console.warn("Something went wrong.", err);
	}
}

for (let i = 0; i < sections.length; i++) {
	makeSection(sections[i], i);
}

window.addEventListener('mousemove', stopAuto, true);
window.addEventListener('wheel', stopAuto, true);
window.addEventListener('keydown', stopAuto, true);
window.addEventListener('click', stopAuto, true);
window.addEventListener('touchstart', stopAuto, true);
window.addEventListener('touchend', stopAuto, true);

timeout = setTimeout(startAuto, THRESH);

// smoothScrollDown(els[0], 30000)
// smoothScrollDown(els[1], 40000)
// smoothScrollDown(els[2], 50000)
// for (let s of els) {
// 	randomScroller(s);
// }

