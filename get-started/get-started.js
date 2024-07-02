$(document).ready(function() {
    const steps = $('.form-step');
    let currentStep = 0;

    // Prefill the form with data from localStorage
    $('input[name="full-name"]').val(localStorage.getItem('name'));
    $('input[name="email"]').val(localStorage.getItem('email'));
    $('input[name="phone"]').val(localStorage.getItem('phone'));
    $('input[name="company-name"]').val(localStorage.getItem('company'));

    steps.eq(currentStep).addClass('active');

    function updateProgressBar() {
        const progressPercentage = (currentStep / (steps.length - 1)) * 100;
        $('#progress-bar').css('width', `${progressPercentage}%`);
    }

    function validateStep(step) {
        let isValid = true;
        steps.eq(step).find('input, select, textarea').each(function() {
            if (!this.checkValidity()) {
                isValid = false;
                $(this).addClass('invalid');
            } else {
                $(this).removeClass('invalid');
            }
        });
        return isValid;
    }

    function toggleNextButton() {
        const isStepValid = validateStep(currentStep);
        const nextButton = steps.eq(currentStep).find('.next-step');
        nextButton.prop('disabled', !isStepValid);
    }

    $('.next-step').on('click', function() {
        if (validateStep(currentStep)) {
            if (currentStep < steps.length - 1) {
                steps.eq(currentStep).removeClass('active');
                currentStep++;
                steps.eq(currentStep).addClass('active');
                updateProgressBar();
                toggleNextButton();
            }
        }
    });

    $('#get-started-back-btn').on('click', function() {
        if (currentStep > 0) {
            steps.eq(currentStep).removeClass('active');
            currentStep--;
            steps.eq(currentStep).addClass('active');
            updateProgressBar();
            toggleNextButton();
        } else {
            window.history.back();
        }
    });

    // Validate fields on input and change events
    steps.find('input, select, textarea').on('input change', function() {
        $(this).removeClass('invalid');
        toggleNextButton();
    });

    // Initial validation check
    toggleNextButton();

    // Populate timezones dynamically with offsets
    const timezoneSelect = $('select[name="preferred-timezone"]');
    const timezones = moment.tz.names();
    timezones.forEach(tz => {
        const offset = moment.tz(tz).format('Z');
        timezoneSelect.append(`<option value="${tz}">(UTC${offset}) ${tz}</option>`);
    });

    // Initialize Select2 for role dropdown with placeholder "Select Role"
    $('.role-select').select2({
        placeholder: 'Select Role *',
        width: '100%',
        dropdownCssClass: 'custom-dropdown',
        selectionCssClass: 'custom-selection',
        minimumResultsForSearch: Infinity
    });

    // Initialize Select2 for country dropdown with placeholder "Preferred Country"
    $('.country-select').select2({
        placeholder: 'Preferred Country *',
        width: '100%',
        dropdownCssClass: 'custom-dropdown',
        selectionCssClass: 'custom-selection',
        templateResult: formatCountry,
        templateSelection: formatCountry,
        minimumResultsForSearch: Infinity
    });

    // Function to format country with flags in select2
    function formatCountry(state) {
        if (!state.id) {
            return state.text;
        }
        const baseUrl = "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/";
        const $state = $(
            `<span><img src="${baseUrl}${state.element.getAttribute('data-flag')}.svg" class="flag-icon" /> ${state.text}</span>`
        );
        return $state;
    }

    // Handle increment and decrement buttons
    $(document).on('click', '.increment', function() {
        const input = $(this).siblings('.positions__input');
        const currentValue = parseInt(input.val());
        if (currentValue < 5) {
            input.val(currentValue + 1);
        }
        toggleButtonState(input);
    });

    $(document).on('click', '.decrement', function() {
        const input = $(this).siblings('.positions__input');
        const currentValue = parseInt(input.val());
        if (currentValue > 1) {
            input.val(currentValue - 1);
        }
        toggleButtonState(input);
    });

    // Toggle the disabled state of increment and decrement buttons
    function toggleButtonState(input) {
        const currentValue = parseInt(input.val());
        const decrementButton = input.siblings('.decrement');
        const incrementButton = input.siblings('.increment');

        if (currentValue <= 1) {
            decrementButton.prop('disabled', true);
        } else {
            decrementButton.prop('disabled', false);
        }

        if (currentValue >= 5) {
            incrementButton.prop('disabled', true);
        } else {
            incrementButton.prop('disabled', false);
        }
    }

    // Initial toggle button state on load
    $('.positions__input').each(function() {
        toggleButtonState($(this));
    });

    // Add role
    $(document).on('click', '.add-role-btn', function() {
        const roleGroup = `
            <div class="form__group role-group">
                <select name="role[]" class="form__input role-select" required>
                    <option value="" disabled selected>Select Role *</option>
                    <!-- Add more roles as needed -->
                    <option value="AI Consultant">AI Consultant</option>
                    <option value="AI Developer">AI Developer</option>
                    <option value="AI Business Analyst">AI Business Analyst</option>
                    <option value="Real Estate Contracts Administration">Real Estate Contracts Administration</option>
                    <option value="Real Estate Administration Support">Real Estate Administration Support</option>
                    <option value="Real Estate Lead Generation Specialist">Real Estate Lead Generation Specialist</option>
                    <option value="Digital Marketer">Digital Marketer</option>
                    <option value="Social Media Specialist">Social Media Specialist</option>
                    <option value="Social Media Manager">Social Media Manager</option>
                    <option value="Video Editor">Video Editor</option>
                    <option value="Copywriter">Copywriter</option>
                    <option value="Product Catalog Specialist">Product Catalog Specialist</option>
                    <option value="Operations Manager">Operations Manager</option>
                    <option value="Teleconsultant (Medical)">Teleconsultant (Medical)</option>
                    <option value="Loan Processor">Loan Processor</option>
                    <option value="Collections Officer">Collections Officer</option>
                    <option value="Bid Manager">Bid Manager</option>
                    <option value=".Net Developer">.Net Developer</option>
                    <option value="Software engineer">Software engineer</option>
                    <option value="Applications Developer">Applications Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Front End Developer">Front End Developer</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="Medical Transcription">Medical Transcription</option>
                    <option value="Medical Receptionist">Medical Receptionist</option>
                    <option value="Medical Billing">Medical Billing</option>
                    <option value="Property Management Assistant">Property Management Assistant</option>
                    <option value="Engineer">Engineer</option>
                    <option value="Architect">Architect</option>
                    <option value="CAD Designer">CAD Designer</option>
                    <option value="Draftsperson">Draftsperson</option>
                    <option value="HR Compensation and Benefits Specialist">HR Compensation and Benefits Specialist</option>
                    <option value="HR Manager">HR Manager</option>
                    <option value="HR Associate">HR Associate</option>
                    <option value="Recruiter">Recruiter</option>
                    <option value="Marketing Assistant">Marketing Assistant</option>
                    <option value="SEO Specialist">SEO Specialist</option>
                    <option value="Google Ads (PPC)">Google Ads (PPC)</option>
                    <option value="Graphic Designer">Graphic Designer</option>
                    <option value="Web Developer">Web Developer</option>
                    <option value="Business Analyst">Business Analyst</option>
                    <option value="Data Analyst">Data Analyst</option>
                    <option value="Accountant">Accountant</option>
                    <option value="Bookkeeper">Bookkeeper</option>
                    <option value="Sales Lead Generation">Sales Lead Generation</option>
                    <option value="Sales Support Admin">Sales Support Admin</option>
                    <option value="Sales Specialist (B2B)">Sales Specialist (B2B)</option>
                    <option value="IT Support (Level 2)">IT Support (Level 2)</option>
                    <option value="IT Support (Level 1)">IT Support (Level 1)</option>
                    <option value="Customer Support – Non- Voice">Customer Support – Non- Voice</option>
                    <option value="Data Entry Specialist">Data Entry Specialist</option>
                    <option value="E-Commerce Assistant">E-Commerce Assistant</option>
                    <option value="Executive Assistant">Executive Assistant</option>
                    <option value="Customer Support – Voice">Customer Support – Voice</option>
                    <option value="Virtual Assistant – Non Voice">Virtual Assistant – Non Voice</option>
                </select>
                <div class="positions-container">
                    <label for="positions">Number of Positions:</label>
                    <select name="positions[]" class="positions__dropdown" required>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div class="role-actions">
                    <button type="button" class="add-role-btn">+</button>
                    <button type="button" class="remove-role-btn">-</button>
                </div>
            </div>
        `;
        $('#roles-container').append(roleGroup);
        $('.role-select').last().select2({
            placeholder: 'Select Role *',
            width: '100%',
            dropdownCssClass: 'custom-dropdown',
            selectionCssClass: 'custom-selection',
            minimumResultsForSearch: Infinity
        });
    });

    // Remove role
    $(document).on('click', '.remove-role-btn', function() {
        if ($('#roles-container .role-group').length > 1) {
            $(this).closest('.role-group').remove();
        }
    });

    $('#submit-form').on('click', function() {
        $('#get-started-form').submit();
    });

    $('#get-started-form').on('submit', function(e) {
        e.preventDefault();

        // Serialize the form data
        let formData = $(this).serialize();
        let userName = $('input[name="full-name"]').val();
        let userEmail = $('input[name="email"]').val();

        // Send the form data using AJAX
        $.ajax({
            type: 'POST',
            url: 'https://hp-stripe-backend-new-d5589f9679e0.herokuapp.com/create-payment-intent', // Replace with your actual endpoint
            data: JSON.stringify({
                formData,
                name: userName,
                email: userEmail
            }),
            contentType: 'application/json',
            success: function(response) {
                $('#get-started-section').hide();
                $('#payment-section').show();

                const stripe = Stripe('pk_live_51PLd8T2LIKsfGjNtTLRNJb1W4hEqkMooAqwwmyZe9fe8IwgIYp1OMoZaSCIrel33RPWm226N9wPM4v10vX1wEZay00Zn82ZDXh'); // Replace with your actual publishable key

                async function initializeStripe() {
                    try {
                        const clientSecret = response.clientSecret;

                        if (!clientSecret) {
                            throw new Error('Failed to retrieve client secret');
                        }

                        const elements = stripe.elements({ clientSecret });

                        const paymentElement = elements.create('payment', {
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#333333',
                                },
                            },
                        });
                        paymentElement.mount('#payment-element');

                        const form = document.getElementById('payment-form');
                        form.addEventListener('submit', async (event) => {
                            event.preventDefault();
                            const { error } = await stripe.confirmPayment({
                                elements,
                                confirmParams: {
                                    return_url: 'https://your-website.com/checkout-success',
                                    payment_method_data: {
                                        billing_details: {
                                            name: userName,
                                            email: userEmail
                                        }
                                    }
                                },
                            });

                            if (error) {
                                document.getElementById('error-message').textContent = error.message;
                            }
                        });

                        // Setup Payment Request Button
                        const paymentRequest = stripe.paymentRequest({
                            country: 'US',
                            currency: 'usd',
                            total: {
                                label: 'Total',
                                amount: 10000, // Amount in cents ($100)
                            },
                            requestPayerName: true,
                            requestPayerEmail: true,
                        });

                        const prButton = elements.create('paymentRequestButton', {
                            paymentRequest: paymentRequest,
                        });

                        // Check the availability of the Payment Request API first.
                        paymentRequest.canMakePayment().then((result) => {
                            if (result) {
                                prButton.mount('#payment-request-button');
                            } else {
                                document.getElementById('payment-request-button').style.display = 'none';
                            }
                        });
                    } catch (error) {
                        console.error('Error:', error);
                        document.getElementById('error-message').textContent = error.message;
                    }
                }

                initializeStripe();
            },
            error: function() {
                alert('There was an error submitting the form. Please try again.');
            }
        });
    });

    // Initialize the progress bar
    updateProgressBar();
});
