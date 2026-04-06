document.addEventListener("DOMContentLoaded", () => {
    const introSequence = document.getElementById("intro-sequence");

    // Lock scroll during intro
    document.body.style.overflow = "hidden";

    // Set initial state of the portfolio to be completely hidden for crossfade
    gsap.set("#home", { opacity: 0 });

    // --- HIGH-END TYPOGRAPHY SPLIT UTILITY ---
    // Splits text into individual character spans for advanced staggering
    function splitTextToSpans(selector) {
        const el = document.querySelector(selector);
        if (!el) return [];
        const text = el.innerText;
        el.innerHTML = "";
        
        const chars = [];
        text.split("").forEach(char => {
            const span = document.createElement("span");
            span.innerHTML = char === " " ? "&nbsp;" : char;
            span.style.display = "inline-block";
            // Optimize for high speed transforms and blurs
            span.style.willChange = "transform, opacity, filter";
            el.appendChild(span);
            chars.push(span);
        });
        return chars;
    }

    const chars1 = splitTextToSpans("#apple-text-1");
    const chars2 = splitTextToSpans("#apple-text-2");

    // Ensure parent containers are visible so child spans can animate opacity
    gsap.set(".apple-intro-text", { opacity: 1, width: "100%", textAlign: "center" });

    // Initialize second slide as hidden
    gsap.set(chars2, { opacity: 0, y: 50, filter: "blur(10px)", scale: 0.8 });

    const tl = gsap.timeline({
        onComplete: () => {
            document.body.style.overflow = "auto";
            if (window.initPortfolioAnimations) {
                window.initPortfolioAnimations();
            }
            introSequence.style.display = 'none';
        }
    });

    // 1. SLIDE 1: "Anubhav Tewari" elegantly materializes
    // Each letter fades in, drops into place, and unblurs with a cascading wave effect
    tl.fromTo(chars1, 
        { opacity: 0, y: 30, filter: "blur(12px)", scale: 1.1 },
        { 
            opacity: 1, y: 0, filter: "blur(0px)", scale: 1.0, 
            duration: 1.3, stagger: 0.04, ease: "power3.out" 
        },
        0.5
    );

    // 2. THE TRANSITION: "Awesome" Apple / Framer Cross-Wipe
    // Slide 1 shatters/sweeps UP into a motion blur
    tl.to(chars1, {
        opacity: 0,
        y: -50,
        filter: "blur(12px)",
        scale: 0.9,
        duration: 0.6,
        stagger: 0.02,
        ease: "power2.in"
    }, 3.0);

    // Slide 2 IMMEDIATELY sweeps UP from below into sharp focus, mirroring it perfectly
    tl.to(chars2, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        scale: 1.0,
        duration: 0.9,
        stagger: 0.03, // Slightly slower stagger for emphasis
        ease: "back.out(1.4)" // Adds that premium snappy lock-in feel
    }, 3.3); // Tightly overlaps the exit of text 1 for continuity

    // 3. EXIT SEQUENCES
    // Slide 2 gracefully fades into the dark void
    tl.to(chars2, {
        opacity: 0,
        y: -40,
        filter: "blur(12px)",
        scale: 0.9,
        duration: 0.8,
        stagger: 0.02,
        ease: "power2.in"
    }, 6.0);

    // 4. PORTFOLIO REVEAL
    // The pitch black overlay dissolves over the portfolio
    tl.to(introSequence, {
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut"
    }, 7.0);

    // Main typography and images of the site fade in 
    tl.to("#home", {
        opacity: 1,
        duration: 1.8,
        ease: "power2.inOut"
    }, 6.8);

});
