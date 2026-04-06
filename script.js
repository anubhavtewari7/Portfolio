window.initPortfolioAnimations = () => {

    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Hero Section Parallax 
    gsap.to(".hero-content", {
        y: -100,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // Mission Card Scaling Reveal like Apple
    gsap.from(".mission-card", {
        scale: 0.8,
        opacity: 0,
        ease: "power2.out",
        duration: 1.5,
        scrollTrigger: {
            trigger: ".mission",
            start: "top 80%",
            end: "top 40%",
            scrub: 1
        }
    });

    // Project Gallery
    gsap.from(".project-gallery .anim-wrapper", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".projects",
            start: "top 75%",
            toggleActions: "play none none reverse"
        }
    });

    // Slide up sections
    const sections = gsap.utils.toArray('.section-title');
    sections.forEach(section => {
        gsap.from(section, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Timeline staggered entrance
    const timelineItems = gsap.utils.toArray('.timeline-item');
    timelineItems.forEach((item, i) => {
        gsap.from(item, {
            x: -50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Skills stagger - playful pop up
    gsap.from(".skills-grid .anim-wrapper", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: ".skills",
            start: "top 75%",
            toggleActions: "play none none reverse"
        }
    });

    // Education stagger
    gsap.from(".edu-grid .anim-wrapper", {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".education",
            start: "top 75%",
            toggleActions: "play none none reverse"
        }
    });

    // Smooth scrolling for anchor links 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project Modal Logic
    const modal = document.getElementById("project-modal");
    const modalBody = document.getElementById("modal-body");
    const closeBtn = document.querySelector(".close-modal");

    const projectData = {
        "cadillac": {
            title: "Cadillac Sirius Interior Concept",
            images: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map(n => `pdf_assets/page_${n}.png`)
        },
        "kuka": {
            title: "Kuka Robotics 6-DOF",
            images: [10, 11, 12, 13, 14, 15].map(n => `pdf_assets/page_${n}.png`)
        },
        "ti": {
            title: "TI 500X Calculator Concept",
            images: [3, 4, 5, 6, 7, 8, 9].map(n => `pdf_assets/page_${n}.png`)
        }
    };

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            const data = projectData[projectId];
            
            if (data) {
                let html = `<h2 style="margin-bottom: 2rem; font-size: 2rem; color: var(--accent-cyan); font-family: var(--font-heading);">${data.title}</h2><div class="modal-gallery">`;
                data.images.forEach(imgSrc => {
                    html += `<img src="${imgSrc}" alt="Project Details" />`;
                });
                html += `</div>`;
                modalBody.innerHTML = html;
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // stop background scrolling
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => modalBody.innerHTML = '', 400);
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.classList.remove('show');
            setTimeout(() => modalBody.innerHTML = '', 400);
            document.body.style.overflow = 'auto';
        }
    });

    // Flowing Menu Effect
    const navLinksContainer = document.querySelector('.nav-links');
    if (navLinksContainer) {
        const indicator = document.createElement('div');
        indicator.className = 'nav-indicator';
        navLinksContainer.appendChild(indicator);

        const navItems = document.querySelectorAll('.nav-links li a:not(.btn-download)');

        function setIndicator(element) {
            const rect = element.getBoundingClientRect();
            const containerRect = navLinksContainer.getBoundingClientRect();
            indicator.style.width = `${rect.width}px`;
            indicator.style.left = `${rect.left - containerRect.left}px`;
        }

        navItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                setIndicator(e.target);
            });
        });

        navLinksContainer.addEventListener('mouseleave', () => {
            indicator.style.width = '0px';
        });
    }

    // Premium Magnetic DOM Cursor Effect
    const cursorDot = document.getElementById("cursor-dot");
    const cursorRing = document.getElementById("cursor-ring");

    if (cursorDot && cursorRing) {
        // Hide default cursor across entire site
        document.body.style.cursor = "none";

        // Use GSAP's quickTo for high performance following (much better than rAF manual loops)
        const xToDot = gsap.quickTo(cursorDot, "x", { duration: 0.1, ease: "power3" });
        const yToDot = gsap.quickTo(cursorDot, "y", { duration: 0.1, ease: "power3" });
        
        const xToRing = gsap.quickTo(cursorRing, "x", { duration: 0.6, ease: "power3" });
        const yToRing = gsap.quickTo(cursorRing, "y", { duration: 0.6, ease: "power3" });

        window.addEventListener("mousemove", (e) => {
            xToDot(e.clientX);
            yToDot(e.clientY);
            xToRing(e.clientX);
            yToRing(e.clientY);
        });

        // Hover effect on all links and buttons
        const interactables = document.querySelectorAll("a, button, .project-card, .btn-download");
        interactables.forEach(el => {
            el.addEventListener("mouseenter", () => {
                cursorRing.classList.add("cursor-hover-active");
                el.style.cursor = "none";
            });
            el.addEventListener("mouseleave", () => {
                cursorRing.classList.remove("cursor-hover-active");
            });
        });
    }

    // ----------------------------------------------------
    // PREMIUM UX ADDITIONS
    // ----------------------------------------------------

    // 1. Data Decryption / Hacker Text Scramble on Nav Links
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
    const hackLinks = document.querySelectorAll(".nav-links a:not(.btn-download)");
    
    hackLinks.forEach(link => {
        // Store original text
        link.dataset.original = link.innerText;
        
        link.addEventListener("mouseenter", event => {
            let iterations = 0;
            clearInterval(link.scrambleInterval);
            
            link.scrambleInterval = setInterval(() => {
                event.target.innerText = event.target.innerText.split("")
                    .map((letter, index) => {
                        if(index < iterations) return link.dataset.original[index];
                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join("");
                
                if(iterations >= link.dataset.original.length) {
                    clearInterval(link.scrambleInterval);
                }
                iterations += 1/3;
            }, 30);
        });
    });

    // 2. 3D Magnetic Hover Tilt for Project Cards & Experience
    const tiltItems = document.querySelectorAll('.project-card, .experience .timeline-item');
    
    tiltItems.forEach(item => {
        item.addEventListener("mousemove", (e) => {
            const rect = item.getBoundingClientRect();
            // Calculate mouse position relative to the center of the elements
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Map the position to a rotation (-8 to 8 degrees)
            const rotateX = (y / (rect.height / 2)) * -8;
            const rotateY = (x / (rect.width / 2)) * 8;
            
            gsap.to(item, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        item.addEventListener("mouseleave", () => {
            gsap.to(item, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });

    // 3. Cinematic Progress HUD
    const hud = document.getElementById("scroll-hud");
    if (hud) {
        lenis.on('scroll', (e) => {
            // e.progress is cleanly calculated by lenis (0 to 1)
            hud.style.width = `${e.progress * 100}%`;
        });
    }

    // 4. Deep Space Grid Parallax
    const gridBg = document.getElementById("deep-grid-bg");
    if(gridBg) {
        window.addEventListener("mousemove", (e) => {
            const xOffset = (e.clientX / window.innerWidth - 0.5) * 50; 
            const yOffset = (e.clientY / window.innerHeight - 0.5) * 50;
            const rotateX = (e.clientY / window.innerHeight - 0.5) * -10;
            const rotateY = (e.clientX / window.innerWidth - 0.5) * 10;
            
            gsap.to(gridBg, {
                x: xOffset,
                y: yOffset,
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 2.0, // Slow, heavy deep-sea parallax feel
                ease: "power2.out"
            });
        });
    }

    // 5. Live GitHub Integration Terminal
    const githubContainer = document.getElementById("github-repo-container");
    if(githubContainer) {
        fetch("https://api.github.com/users/anubhavtewari7/repos?sort=updated")
        .then(res => res.json())
        .then(repos => {
            githubContainer.innerHTML = ""; 
            // Filter out fluffydoggohere and take top 3
            repos
              .filter(repo => repo.name !== 'fluffydoggohere')
              .slice(0, 3)
              .forEach(repo => {
                const isBuildScript = repo.name === 'build-script-ai';
                const displayName = isBuildScript ? 'BuildScript-AI App' : repo.name;
                const displayDesc = isBuildScript ? 'Your everyday AI mechanic in your pocket. The answer to all your car related problems right here in the palm of your hand.' : (repo.description || 'Open source engineering project.');
                
                const langColor = repo.language === 'TypeScript' ? '#3178c6' : 
                                  repo.language === 'JavaScript' ? '#f1e05a' : 
                                  repo.language === 'Python' ? '#3572A5' : '#8b949e';
                const html = `
                    <div class="repo-card ${isBuildScript ? 'featured-repo' : ''}">
                        <h3><a href="${repo.html_url}" target="_blank">${displayName}</a></h3>
                        <div class="${isBuildScript ? 'liquid-box' : 'repo-desc'}">${displayDesc}</div>
                        <div class="repo-meta">
                            ${repo.language ? `<span><div class="language-color" style="background: ${langColor}"></div> ${repo.language}</span>` : ''}
                            <span>⭐ ${repo.stargazers_count}</span>
                            <span>🔄 ${repo.forks_count}</span>
                        </div>
                    </div>
                `;
                githubContainer.innerHTML += html;
            });

            gsap.to(".repo-card", {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".github-terminal",
                    start: "top 85%"
                }
            });
        })
        .catch(err => {
            githubContainer.innerHTML = "<div class='loading-scanline' style='color: #ff5f56;'>Connection to secure server failed.</div>";
        });
    }

};
