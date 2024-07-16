document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.carousel-track');
  const cards = Array.from(track.children);
  const nextButton = document.querySelector('.carousel-next');
  const prevButton = document.querySelector('.carousel-prev');
  var modal = document.getElementById("modal");
  var btns = document.querySelectorAll('.open-modal');  // Changed to querySelectorAll
  var span = document.querySelector('.close');
  var step1 = document.getElementById("step1");
  var step2 = document.getElementById("step2");
  var step3 = document.getElementById("step3");
  var form1 = document.getElementById("form1");
  var form2 = document.getElementById("form2");

  let cardWidth = cards[0].getBoundingClientRect().width;
  let cardMarginRight = parseInt(window.getComputedStyle(cards[0]).marginRight);
  let moveAmount = cardWidth + cardMarginRight;

  // Set the width of the track
  track.style.width = `${(cardWidth + cardMarginRight) * cards.length}px`;

  let currentIndex = 0;

  // Function to move to a specific card
  function moveToCard(index) {
      if (index < 0 || index >= cards.length) return;
      track.style.transform = `translateX(-${moveAmount * index}px)`;
      currentIndex = index;
      updateButtonStates();
  }

  // Update button states
  function updateButtonStates() {
      prevButton.disabled = currentIndex === 0;
      nextButton.disabled = currentIndex === cards.length - 1;
  }

  // Event listeners for next and previous buttons
  nextButton.addEventListener('click', () => {
      moveToCard(currentIndex + 1);
  });

  prevButton.addEventListener('click', () => {
      moveToCard(currentIndex - 1);
  });

  // Initial button state
  updateButtonStates();

  // Optional: Add touch swiping functionality
  let startX, moveX;
  track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX;
  });

  track.addEventListener('touchmove', (e) => {
      moveX = e.touches[0].pageX;
  });

  track.addEventListener('touchend', () => {
      if (startX - moveX > 50) {
          moveToCard(currentIndex + 1);
      } else if (moveX - startX > 50) {
          moveToCard(currentIndex - 1);
      }
  });

  // Optional: Auto-play functionality
  function autoPlay() {
      if (currentIndex < cards.length - 1) {
          moveToCard(currentIndex + 1);
      } else {
          moveToCard(0);
      }
  }

  // Uncomment the next line to enable auto-play
  // setInterval(autoPlay, 5000); // Change slide every 5 seconds

  // Add click event listener to each button
  btns.forEach(function(btn) {
      btn.addEventListener('click', function() {
          modal.style.display = "block";
      });
  });

  span.onclick = function() {
      modal.style.display = "none";
  }

  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }

  form1.onsubmit = function(e) {
      e.preventDefault();
      step1.classList.add('hidden');
      step2.classList.remove('hidden');
  }

  form2.onsubmit = function(e) {
      e.preventDefault();
      step2.classList.add('hidden');
      step3.classList.remove('hidden');
      
      // Load Calendly widget
      if (typeof Calendly !== 'undefined') {
          Calendly.initInlineWidget({
              url: 'https://calendly.com/hello-tryhelipad/30min?hide_event_type_details=1&hide_gdpr_banner=1',
              parentElement: document.querySelector('.calendly-inline-widget'),
              prefill: {
                  name: document.getElementById('name').value,
                  email: document.getElementById('email').value,
                  customAnswers: {
                      a1: document.getElementById('companySize').value,
                      a2: document.getElementById('hireTimeline').value
                  }
              }
          });
      }
  }

  function adjustCalendlyWidth() {
      const calendlyWidget = document.querySelector('.calendly-inline-widget');
      if (calendlyWidget) {
          const modalContent = document.querySelector('.modal-content');
          const modalWidth = modalContent.offsetWidth;
          calendlyWidget.style.width = `${modalWidth - 40}px`; // 40px accounts for padding
      }
  }
  
  // Call this function when opening the modal, switching to step 3, and on window resize
  window.addEventListener('resize', adjustCalendlyWidth);

  // Call adjustCalendlyWidth when switching to step 3
  form2.addEventListener('submit', function() {
      setTimeout(adjustCalendlyWidth, 0);
  });
});