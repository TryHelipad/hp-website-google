document.addEventListener('DOMContentLoaded', function() {
    // Existing code for video testimonials
    const videoDisplay = document.querySelector('.video-thumbnail');
    const videoItems = document.querySelectorAll('.video-item');
    const playBtn = document.querySelector('.play-btn');
    const modal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const closeBtn = document.querySelector('.close');
    const successSnippet = document.querySelector('#success-snippet');
    const carousel = document.querySelector('.video-carousel');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const problems = document.querySelectorAll('.problem');
    const problemImages = document.querySelectorAll('.problem-image img');
    const faqItems = document.querySelectorAll('.faq-item');
    let currentIndex = 0;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    function isMobileView() {
        return window.innerWidth <= 768;
    }

    function updateCarouselVisibility() {
        if (isMobileView()) {
            prevButton.style.display = 'block';
            nextButton.style.display = 'block';
        } else {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        }
    }

    updateCarouselVisibility();
    window.addEventListener('resize', updateCarouselVisibility);

    prevButton.addEventListener('click', () => {
        carousel.scrollBy({ left: -220, behavior: 'smooth' });
    });

    nextButton.addEventListener('click', () => {
        carousel.scrollBy({ left: 220, behavior: 'smooth' });
    });

    videoItems.forEach(item => {
        item.addEventListener('click', function() {
            const thumbnail = this.dataset.thumbnail;
            const snippet = this.dataset.snippet;
            const video = this.dataset.video;
            const author = this.dataset.author;

            videoDisplay.querySelector('img').src = thumbnail;
            successSnippet.textContent = snippet;

            let authorElement = document.getElementById('video-author-main');
            if (!authorElement) {
                authorElement = document.createElement('p');
                authorElement.id = 'video-author-main';
                successSnippet.parentNode.insertBefore(authorElement, successSnippet.nextSibling);
            }
            authorElement.textContent = author;

            playBtn.dataset.video = video;

            videoDisplay.scrollIntoView({ behavior: 'smooth' });
        });
    });

    playBtn.addEventListener('click', function() {
      const videoSrc = this.dataset.video;
      videoPlayer.src = videoSrc;
      modal.style.display = "block";
      videoPlayer.style.width = '100%';
      videoPlayer.style.height = '100%';
      videoPlayer.play();
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            videoPlayer.pause();
            videoPlayer.currentTime = 0;
        }
    });

    if (videoItems.length > 0) {
        const firstVideo = videoItems[0];
        videoDisplay.querySelector('img').src = firstVideo.dataset.thumbnail;
        successSnippet.textContent = firstVideo.dataset.snippet;

        let authorElement = document.createElement('p');
        authorElement.id = 'video-author-main';
        authorElement.textContent = firstVideo.dataset.author;
        successSnippet.parentNode.insertBefore(authorElement, successSnippet.nextSibling);

        playBtn.dataset.video = firstVideo.dataset.video;
    }

    function activateProblem(index) {
        problems.forEach((problem, i) => {
            if (i === index) {
                problem.classList.add('active');
                problemImages[i].classList.add('active');
            } else {
                problem.classList.remove('active');
                problemImages[i].classList.remove('active');
            }
        });
    }

    activateProblem(currentIndex);

    problems.forEach((problem, index) => {
        problem.addEventListener('click', () => {
            activateProblem(index);
            currentIndex = index;
        });
    });

    setInterval(() => {
        currentIndex = (currentIndex + 1) % problems.length;
        activateProblem(currentIndex);
    }, 15000);

    // New code for multi-step form
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

// New code for multi-step form
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
    if (!validateStep(steps[steps.length - 1])) {
        e.preventDefault();
    }
});
