$(document).ready(function() {
    // Toggle mobile navigation
    $('#hamburger').click(function() {
        $('#mobile-nav').toggleClass('active');
    });

    // Close mobile navigation when a link is clicked
    $('#mobile-nav ul li a').click(function() {
        $('#mobile-nav').removeClass('active');
    });

    // Add scrolled class to header on scroll
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 100) {
            $(".header").addClass("scrolled");
        } else {
            $(".header").removeClass("scrolled");
        }
    });

    // Timeline functionality
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timeline = document.querySelector('.timeline');

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function checkTimelineItems() {
        let anyItemInView = false;
        let totalHeight = 0;
        for (let i = 0; i < timelineItems.length; i++) {
            const item = timelineItems[i];
            if (isElementInViewport(item)) {
                item.classList.add('active');
                anyItemInView = true;
                const itemRect = item.getBoundingClientRect();
                totalHeight = Math.max(totalHeight, itemRect.bottom - timeline.getBoundingClientRect().top);
            } else {
                item.classList.remove('active');
            }
        }
        if (anyItemInView) {
            timeline.style.setProperty('--timeline-height', `${totalHeight}px`);
            timeline.classList.add('active');
        } else {
            timeline.classList.remove('active');
        }
    }

    window.addEventListener('scroll', checkTimelineItems);
    window.addEventListener('resize', checkTimelineItems);

    // Initial check
    checkTimelineItems();

    // Smooth scrolling for anchor links
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) {
                        return false;
                    } else {
                        $target.attr('tabindex', '-1');
                        $target.focus();
                    };
                });
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
});