document.addEventListener('DOMContentLoaded', function() {
    // Video carousel initialization
    var $videoCarousel = $('.video-carousel');
    var isPlaying = true;

    $('.video-carousel').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: '<button type="button" class="slick-prev">Previous</button>',
        nextArrow: '<button type="button" class="slick-next">Next</button>',
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    arrows: false,
                    dots: true
                }
            }
        ]
    });

    // Custom carousel controls
    $('.prev-btn').click(function(){
        $videoCarousel.slick('slickPrev');
    });

    $('.next-btn').click(function(){
        $videoCarousel.slick('slickNext');
    });

    $('.play-pause-btn').click(function(){
        if (isPlaying) {
            $videoCarousel.slick('slickPause');
            $(this).find('i').removeClass('fa-pause').addClass('fa-play');
        } else {
            $videoCarousel.slick('slickPlay');
            $(this).find('i').removeClass('fa-play').addClass('fa-pause');
        }
        isPlaying = !isPlaying;
    });

    $videoCarousel.on('beforeChange', function(){
        if (isPlaying) {
            $('.play-pause-btn').find('i').removeClass('fa-play').addClass('fa-pause');
        }
    });

    // Multi-step form logic
    const form = document.getElementById('cv-request-form');
    if (form) {
        const steps = form.querySelectorAll('.form-step');
        const progressSteps = document.querySelectorAll('.progress-indicator .step');
        const nextButtons = form.querySelectorAll('.next-step');
        const prevButtons = form.querySelectorAll('.prev-step');

        nextButtons.forEach(button => {
            button.addEventListener('click', () => {
                const currentStep = button.closest('.form-step');
                const nextStep = currentStep.nextElementSibling;
                if (validateStep(currentStep)) {
                    currentStep.classList.remove('active');
                    nextStep.classList.add('active');
                    updateProgressIndicator(nextStep.dataset.step);
                }
            });
        });

        prevButtons.forEach(button => {
            button.addEventListener('click', () => {
                const currentStep = button.closest('.form-step');
                const prevStep = currentStep.previousElementSibling;
                currentStep.classList.remove('active');
                prevStep.classList.add('active');
                updateProgressIndicator(prevStep.dataset.step);
            });
        });

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submission attempted');

            if (validateStep(steps[steps.length - 1])) {
                console.log('Form validation passed, preparing to submit');

                const formData = new FormData(form);
                fetch("/", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams(formData).toString()
                })
                .then(response => {
                    console.log('Response received', response);
                    if (response.ok) {
                        console.log('Form submitted successfully');
                        window.location.href = '/virtual-bookkeeper/thank-you.html';
                    } else {
                        throw new Error('Form submission failed');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('There was a problem with the submission. Please try again.');
                });
            } else {
                console.log('Form validation failed');
            }
        });
    }

    // FAQ functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');
    
            // Close all other open FAQs
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('active');
                }
            });
    
            // Toggle the clicked FAQ
            question.classList.toggle('active', !isActive);
            answer.classList.toggle('active', !isActive);
        });
    });
});

function validateStep(step) {
    const inputs = step.querySelectorAll('input[required], select[required]');
    let isValid = true;
    inputs.forEach(input => {
        if (!input.value) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    return isValid;
}

function updateProgressIndicator(step) {
    const progressSteps = document.querySelectorAll('.progress-indicator .step');
    progressSteps.forEach(stepIndicator => {
        const stepItem = stepIndicator.closest('.step-item');
        if (stepIndicator.dataset.step <= step) {
            stepIndicator.classList.add('active');
            stepItem.querySelector('.step-label').style.color = '#004080';
        } else {
            stepIndicator.classList.remove('active');
            stepItem.querySelector('.step-label').style.color = '#666';
        }
    });
}