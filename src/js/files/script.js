// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";
gsap.registerPlugin(ScrollTrigger);

import LocomotiveScroll from 'locomotive-scroll';

Pace.on('progress', function(progress) {
	var counterElement = document.querySelector('.loader__counter');
	if (counterElement) {
	 counterElement.textContent = Math.round(progress) + '%';
	 if(window.innerWidth < 767.98){
		if(Math.round(progress) == 100){
			loaded();
		}
	 }
	}
 });

if(window.innerWidth>=767.98){
	Pace.on('done', function() {
		loaded();
	});
}

function loaded() {
	if(window.innerWidth>=1280 && !document.documentElement.classList.contains('touch')){
		setTimeout(() => {
			initScroll();
			homeOptionsAnimationInit();
			
		}, 300);
	}
	setTimeout(() => {
		document.documentElement.classList.add('loaded');
	}, 300);
}


function initScroll() {

	ScrollTrigger.clearScrollMemory("manual");

	window.history.scrollRestoration = "manual";

	const scroller = document.querySelector("[data-scroll-container]");

	const locoScroll = new LocomotiveScroll({
	el: scroller,
	smooth: true,
	});
	locoScroll.on("scroll", ScrollTrigger.update);
	ScrollTrigger.scrollerProxy(scroller, {
	scrollTop(value) {
		return arguments.length
			? locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
			: locoScroll.scroll.instance.scroll.y;
	}, // we don't have to define a scrollLeft because we're only scrolling vertically.
	getBoundingClientRect() {
		return {
			top: 0,
			left: 0,
			width: window.innerWidth,
			height: window.innerHeight
		};
	},
	pinType: scroller.style.transform ? "transform" : "fixed"
	});

	ScrollTrigger.defaults({
	scroller: scroller
	});
	ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
	ScrollTrigger.refresh();
}
 

function homeOptionsAnimationInit() {

	const tl = gsap.timeline({
		paused: true,
		scrollTrigger: {
		trigger: ".options-home__body",
			start: "0% 40%", // when the top of the trigger hits the top of the viewport
		end:'80% 100%',
		scrub: 1.6,
		// markers: true,
		//   pin: true,
		}
	});
 
	tl.from("._item-01", { 
		x: '100vw',
			y: '40vh',
	});
	
	tl.from("._item-02", {
		x: '100vw',
		y: '40vh',
		});
	tl.from("._item-03", {
		x: '100vw',
		y: '40vh',
		});
	tl.from("._item-04", {
		x: '100vw',
		y: '40vh',
		});
	tl.from("._item-05", {
		x: '100vw',
		y: '40vh',
		});	
}

document.addEventListener("DOMContentLoaded", () => {
	const videoWrapper = document.querySelector('#videoWrapper');
		if(videoWrapper){
			const homeVideo = videoWrapper.querySelector('#homeVideo');

				if(window.innerWidth>=767.98){
					const playBtn = videoWrapper.querySelector('.controls__play')
					const stopBtn = videoWrapper.querySelector('.controls__stop')
					const fullscreenBtn = videoWrapper.querySelector('.controls__fs'); // Новая кнопка для полноэкранного режима
			
					playBtn.addEventListener("click", function (e) {
						if(videoWrapper.classList.contains('_stop-video')){
							videoWrapper.classList.remove('_stop-video')
							videoWrapper.classList.add('_play-video');
							document.querySelector('.home-page__video').classList.add('_bg-none')
							homeVideo.play();
						}else if(!videoWrapper.classList.contains('_stop-video')){
							videoWrapper.classList.add('_play-video');
							homeVideo.play();
							document.querySelector('.home-page__video').classList.add('_bg-none')
			
						}
					});
					stopBtn.addEventListener("click", function (e) {
						if(videoWrapper.classList.contains('_play-video')){
							videoWrapper.classList.remove('_play-video')
							videoWrapper.classList.add('_stop-video');
							homeVideo.pause();
							document.querySelector('.home-page__video').classList.remove('_bg-none')
			
						}
					});
					fullscreenBtn.addEventListener("click", function (e) {
						if (homeVideo.requestFullscreen) {
							homeVideo.requestFullscreen();
						} else if (homeVideo.webkitRequestFullscreen) { /* Safari */
							homeVideo.webkitRequestFullscreen();
						} else if (homeVideo.msRequestFullscreen) { /* IE11 */
							homeVideo.msRequestFullscreen();
						}
				});
	
				}else{
					homeVideo.setAttribute('controls', 'controls');

				}
	}
	

	
});