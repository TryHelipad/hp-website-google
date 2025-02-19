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
                    }
                });
            }
        }
    });

    // Modal functionality
    var modal = document.getElementById("leadMagnetModal");
    var span = document.getElementsByClassName("close")[0];
    var lastTouchY = 0;
    var lastTouchTime = 0;

    function showModal() {
        modal.style.display = "flex";
        localStorage.setItem('modalShown', 'true'); // Set a flag in localStorage
    }

    function hideModal() {
        modal.style.display = "none";
        localStorage.setItem('modalClosed', 'true'); // Set a flag indicating the modal was closed
    }

    // Check if the modal has already been shown or closed
    if (!localStorage.getItem('modalShown') && !localStorage.getItem('modalClosed')) {
        // Exit intent detection for desktop
        document.addEventListener('mouseleave', function(event) {
            if (event.clientY <= 0) {
                showModal();
            }
        });

        // Exit intent detection for mobile
        document.addEventListener('touchstart', function(event) {
            var touchY = event.touches[0].clientY;
            var touchTime = new Date().getTime();

            if (lastTouchY !== 0 && touchY > lastTouchY && touchTime - lastTouchTime < 500) {
                showModal();
            }

            lastTouchY = touchY;
            lastTouchTime = touchTime;
        });

        // Inactivity detection for mobile
        var inactivityTime = function() {
            var time;
            window.onload = resetTimer;
            document.onmousemove = resetTimer;
            document.onkeypress = resetTimer;
            document.addEventListener('touchstart', resetTimer);
            document.addEventListener('scroll', resetTimer);

            function showPopup() {
                showModal();
            }

            function resetTimer() {
                clearTimeout(time);
                time = setTimeout(showPopup, 30000); // 30 seconds of inactivity
            }
        };

        inactivityTime();
    }

    // Close the modal when the user clicks on <span> (x)
    span.onclick = function() {
        hideModal();
    }

    // Close the modal when the user clicks anywhere outside of the modal
    window.onclick = function(event) {
        if (event.target === modal) {
            hideModal();
        }
    }

    // Form submission handling
    $('form.lead-magnet-form').submit(function(event) {
        event.preventDefault(); // Prevent the default form submission

        var form = $(this);

        // Send form data using AJAX
        $.ajax({
            url: form.attr('action'),
            method: form.attr('method'),
            data: form.serialize(),
            success: function(response) {
                form.find('.thank-you-message').show(); // Show the thank you message
                form.find('input, button').hide(); // Hide the form inputs and submit button
            },
            error: function(error) {
                console.error('Error submitting form:', error);
                alert('There was an error submitting the form. Please try again.');
            }
        });
    });
});
