(function bootBmoreNights() {
  if (window.__bmoreNights) return;
  window.__bmoreNights = true;

  function wait() {
    if (!window.gsap || !window.ScrollTrigger || !window.Lenis) {
      requestAnimationFrame(wait);
      return;
    }
    start();
  }

  function mix(a, b, t) {
    return window.gsap.utils.interpolate(a, b, t);
  }

  function applyCycle(progress) {
    var gsap = window.gsap;
    var t = gsap.utils.clamp(0, 1, progress);
    var night = gsap.utils.clamp(0, 1, (t - 0.36) / 0.34);

    var a = t < 0.4 ? mix("#7eb7d4", "#e0b36a", t / 0.4) : mix("#e0b36a", "#141c32", (t - 0.4) / 0.6);
    var b = t < 0.4 ? mix("#e0b36a", "#c46a3a", t / 0.4) : mix("#c46a3a", "#1b1630", (t - 0.4) / 0.6);
    var c = t < 0.45 ? mix("#c46a3a", "#6a2e38", t / 0.45) : mix("#6a2e38", "#121018", (t - 0.45) / 0.55);
    var d = mix("#3e7f96", "#071018", t);

    gsap.set(".band-a", { backgroundColor: a });
    gsap.set(".band-b", { backgroundColor: b });
    gsap.set(".band-c", { backgroundColor: c });
    gsap.set(".band-d", { backgroundColor: d });
    gsap.set(".water-day", { opacity: 1 - night });
    gsap.set(".water-night", { opacity: night });
    gsap.set(".city-lights", { opacity: mix(0.18, 1, night) });
    gsap.set(".reflections", { opacity: night });
    gsap.set(".domino-sign", { fill: mix("#7a5348", "#fff6d4", night) });

    document.documentElement.style.setProperty("--sky", a);
    document.documentElement.style.setProperty("--copy", mix("#16120c", "#f3ead7", night));
    document.documentElement.style.background = a;
    document.querySelector(".bmore") &&
      document.querySelector(".bmore").style.setProperty("color", mix("#16120c", "#f3ead7", Math.min(1, night + 0.15)));

    var x = mix(72, 18, t);
    var y = 14 + Math.sin(t * Math.PI) * -4 + t * 10;
    gsap.set(".disc", {
      left: x + "vw",
      top: y + "vh",
      backgroundColor: mix("#f2d15a", "#efe6c8", t),
      boxShadow: "0 0 " + mix(0, 36, night) + "px rgb(239 230 200 / " + mix(0, 0.35, night) + ")",
    });
    gsap.set(".disc-cut", {
      opacity: night,
      backgroundColor: a,
    });
  }

  function start() {
    var gsap = window.gsap;
    var ScrollTrigger = window.ScrollTrigger;
    var Lenis = window.Lenis;
    gsap.registerPlugin(ScrollTrigger);
    applyCycle(0);

    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var phrases = gsap.utils.toArray(".phrase");
    var tracks = gsap.utils.toArray(".track");

    if (reduce) {
      applyCycle(1);
      gsap.set(phrases, { autoAlpha: 0 });
      gsap.set(phrases[phrases.length - 1], { autoAlpha: 1 });
      return;
    }

    var lenis = new Lenis({ lerp: 0.075, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (time) {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.create({
      trigger: ".bmore",
      start: "top top",
      endTrigger: ".tracks",
      end: "top 20%",
      scrub: 1,
      onUpdate: function (self) {
        applyCycle(self.progress);
      },
    });

    var tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: ".story",
        start: "top top",
        end: "+=260%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    phrases.forEach(function (phrase, index) {
      var startAt = index * 0.23;
      tl.fromTo(
        phrase,
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.12 },
        startAt
      );
      if (index < phrases.length - 1) {
        tl.to(phrase, { autoAlpha: 0, y: -18, duration: 0.1 }, startAt + 0.16);
      }
    });

    gsap.from(tracks, {
      y: 16,
      opacity: 0,
      duration: 0.55,
      stagger: 0.07,
      ease: "power2.out",
      scrollTrigger: { trigger: ".tracks", start: "top 75%" },
    });

    requestAnimationFrame(function () {
      ScrollTrigger.refresh();
      applyCycle(0);
    });
  }

  wait();
})();
