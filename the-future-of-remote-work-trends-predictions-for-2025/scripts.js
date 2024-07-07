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
    }

    // Check if the modal has already been shown
    if (!localStorage.getItem('modalShown')) {
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
    $('form').submit(function(event) {
        event.preventDefault(); // Prevent default form submission

        // Perform AJAX request to submit form data to Netlify
        var formData = $(this).serialize();
        var form = $(this);

        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: formData,
            success: function() {
                form.find('.thank-you-message').show(); // Show thank you message
                form.trigger('reset'); // Reset form fields
            },
            error: function() {
                alert('There was an error submitting the form. Please try again.');
            }
        });
    });
});
