document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const items = Array.from(carousel.querySelectorAll('.carousel-item'));
    const indicators = Array.from(carousel.querySelectorAll('.indicator'));
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');
    let currentIndex = 0;

    function showItem(index) {
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        currentIndex = index;
        pauseAllVideos();
    }

    function nextItem() {
        showItem((currentIndex + 1) % items.length);
    }

    function prevItem() {
        showItem((currentIndex - 1 + items.length) % items.length);
    }

    function pauseAllVideos() {
        items.forEach(item => {
            const video = item.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
            const playButton = item.querySelector('.play-button');
            if (playButton) {
                playButton.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
    }

    nextButton.addEventListener('click', nextItem);
    prevButton.addEventListener('click', prevItem);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showItem(index);
        });
    });

    // Play button functionality
    const playButtons = carousel.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const video = this.closest('.video-wrapper').querySelector('video');
            if (video.paused) {
                pauseAllVideos();
                video.play();
                this.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                this.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
    });

    // Initialize the carousel
    showItem(0);
});




    // Multi-step form logic
    const form = document.getElementById('cv-request-form');
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
    document.addEventListener('DOMContentLoaded', function() {
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