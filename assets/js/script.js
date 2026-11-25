// ========================================
// CLOUDNOVA HOSTING
// JAVASCRIPT INTERACTION
// ========================================

document.addEventListener("DOMContentLoaded", function() {

    // NAVBAR SCROLL EFFECT
    const navbar = document.querySelector(".custom-navbar");

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleNavbarScroll);
    handleNavbarScroll();


    // CLOSE MOBILE NAVBAR AFTER CLICK
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    const navbarCollapse = document.querySelector("#navbarContent");

    navLinks.forEach(function(link) {
        link.addEventListener("click", function() {
            if (window.innerWidth < 992) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });


    // ==============================
    // SCROLL REVEAL
    // ==============================
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.12
            }
        );

        revealElements.forEach(function(element) {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(function(element) {
            element.classList.add("active");
        });
    }


    // ==============================
    // ACTIVE NAVIGATION
    // ==============================
    const pageSections = document.querySelectorAll(
        "#home, #features, #pricing, #testimonials, #infrastructure, #comparison, #faq, #contact"
    );
    const navigationLinks = document.querySelectorAll(".navbar-nav .nav-link");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        navigationLinks.forEach(function(link) {
                            link.classList.remove("active");
                            if (link.getAttribute("href") === "#" + entry.target.id) {
                                link.classList.add("active");
                            }
                        });
                    }
                });
            }, {
                rootMargin: "-35% 0px -55% 0px"
            }
        );

        pageSections.forEach(function(section) {
            sectionObserver.observe(section);
        });
    }


    // CURRENT YEAR (FOOTER)
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector("#currentYear");
    if (yearElement) {
        yearElement.textContent = currentYear;
    }


    // ========================================
    // WHATSAPP NUMBER
    // ========================================
    const whatsappNumber = "628996217895";


    // ========================================
    // BILLING PERIOD TOGGLE (MONTHLY / YEARLY)
    // ========================================
    const billingToggle = document.querySelector("#billingToggle");
    const monthlyLabel = document.querySelector("#monthlyLabel");
    const yearlyLabel = document.querySelector("#yearlyLabel");
    let isYearly = false;

    function updateBillingDisplay(yearly) {
        isYearly = yearly;
        if (billingToggle) {
            billingToggle.classList.toggle("active", isYearly);
        }
        if (monthlyLabel && yearlyLabel) {
            monthlyLabel.classList.toggle("active", !isYearly);
            yearlyLabel.classList.toggle("active", isYearly);
        }

        const priceAmounts = document.querySelectorAll(".price-amount");
        priceAmounts.forEach(function(el) {
            const val = isYearly ? el.dataset.yearly : el.dataset.monthly;
            if (val) el.textContent = val;
        });

        const pricePeriods = document.querySelectorAll(".price-period");
        pricePeriods.forEach(function(el) {
            const period = isYearly ? el.dataset.yearly : el.dataset.monthly;
            if (period) el.textContent = period;
        });
    }

    if (billingToggle) {
        billingToggle.addEventListener("click", function() {
            updateBillingDisplay(!isYearly);
        });
    }
    if (monthlyLabel) {
        monthlyLabel.addEventListener("click", function() {
            updateBillingDisplay(false);
        });
    }
    if (yearlyLabel) {
        yearlyLabel.addEventListener("click", function() {
            updateBillingDisplay(true);
        });
    }


    // ========================================
    // ORDER NAVIGATION (DIRECT TO CART PAGE)
    // ========================================
    const pricingButtons = document.querySelectorAll(".btn-pricing");

    pricingButtons.forEach(function(button) {
        button.addEventListener("click", function(event) {
            const href = button.getAttribute("href");
            if (href && href.startsWith("cart.html")) {
                // Biarkan navigasi normal ke halaman cart.html
                return;
            }

            event.preventDefault();

            const plan = (button.dataset.plan || "business").toLowerCase();
            window.location.href = `cart.html?plan=${plan}`;
        });
    });


    // ========================================
    // DOMAIN CHECKER SIMULATION & EXTENSIONS
    // ========================================
    const domainInput = document.querySelector("#domainInput");
    const domainCheckBtn = document.querySelector("#domainCheckBtn");
    const domainResult = document.querySelector("#domainResult");
    const domainExtSpans = document.querySelectorAll(".domain-extensions span");

    domainExtSpans.forEach(function(span) {
        span.addEventListener("click", function() {
            if (domainInput) {
                let currentVal = domainInput.value.trim();
                const ext = span.textContent.trim();
                if (!currentVal) {
                    domainInput.value = "mywebsite" + ext;
                } else {
                    currentVal = currentVal.replace(/\.[a-z.]+$/i, "");
                    domainInput.value = currentVal + ext;
                }
                domainInput.focus();
            }
        });
    });

    if (domainCheckBtn && domainInput) {
        function checkDomain() {
            let domain = domainInput.value.trim().toLowerCase();
            if (!domain) {
                alert("Silakan masukkan nama domain yang ingin Anda cek.");
                domainInput.focus();
                return;
            }

            if (!domain.includes(".")) {
                domain += ".com";
                domainInput.value = domain;
            }

            if (domainResult) {
                domainResult.className = "domain-result available";
                domainResult.innerHTML = `<strong>Selamat!</strong> Domain <u>${domain}</u> tersedia. <a href="cart.html?plan=business&domain=${encodeURIComponent(domain)}" style="color: #6EE7B7; text-decoration: underline; font-weight: bold; margin-left: 8px;">Pilih Paket &amp; Checkout</a>`;
                domainResult.style.display = "block";
            }
        }

        domainCheckBtn.addEventListener("click", checkDomain);
        domainInput.addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                checkDomain();
            }
        });
    }

    // ========================================
    // HOSTING ADVISOR CALCULATOR LOGIC
    // ========================================
    const calcVisitors = document.querySelector("#calcVisitors");
    const calcType = document.querySelector("#calcType");
    const calcResultPlan = document.querySelector("#calcResultPlan");
    const calcResultReason = document.querySelector("#calcResultReason");
    const calcCtaBtn = document.querySelector("#calcCtaBtn");

    if (calcVisitors && calcType && calcResultPlan) {
        function updateAdvisor() {
            const visitors = calcVisitors.value;
            const type = calcType.value;

            // Prioritaskan yang lebih tinggi
            let recommended = "business";

            if (visitors === "professional" || type === "professional") {
                recommended = "professional";
            } else if (visitors === "starter" && type === "starter") {
                recommended = "starter";
            } else {
                recommended = "business";
            }

            if (recommended === "starter") {
                calcResultPlan.textContent = "Paket Starter Hosting (Rp25.000/bln)";
                calcResultReason.textContent = "Sangat hemat dan cukup untuk blog pribadi atau website profil awal.";
                calcCtaBtn.setAttribute("href", "cart.html?plan=starter");
            } else if (recommended === "business") {
                calcResultPlan.textContent = "Paket Business Hosting (Rp49.000/bln)";
                calcResultReason.textContent = "Kapasitas 30 GB SSD, backup berkala, dan email bisnis ideal untuk toko online & UMKM.";
                calcCtaBtn.setAttribute("href", "cart.html?plan=business");
            } else {
                calcResultPlan.textContent = "Paket Professional Hosting (Rp89.000/bln)";
                calcResultReason.textContent = "Sumber daya tinggi 50 GB SSD & database tanpa batas untuk traffic tinggi & multi-web.";
                calcCtaBtn.setAttribute("href", "cart.html?plan=professional");
            }
        }

        calcVisitors.addEventListener("change", updateAdvisor);
        calcType.addEventListener("change", updateAdvisor);
    }

});
