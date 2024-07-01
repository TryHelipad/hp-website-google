$(document).ready(function() {
    const steps = $('.form-step');
    let currentStep = 0;

    steps.eq(currentStep).addClass('active');

    $('.next-step').on('click', function() {
        if (currentStep < steps.length - 1) {
            steps.eq(currentStep).removeClass('active');
            currentStep++;
            steps.eq(currentStep).addClass('active');
        }
    });

    $('#get-started-back-btn').on('click', function() {
        if (currentStep > 0) {
            steps.eq(currentStep).removeClass('active');
            currentStep--;
            steps.eq(currentStep).addClass('active');
        } else {
            window.history.back();
        }
    });

    // Initialize Select2 for role dropdown
    $('.role-select').select2({
        placeholder: 'Select Role',
        width: '100%',
        dropdownCssClass: 'custom-dropdown',
        selectionCssClass: 'custom-selection',
        minimumResultsForSearch: Infinity
    });

    // Add another role
    $('#add-role-btn').on('click', function() {
        const roleGroup = `
            <div class="form__group role-group">
                <label for="role">Role to Fill:</label>
                <select name="role[]" class="form__input role-select" required>
                    <option value="" disabled selected>Select Role</option>
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
                <input type="number" name="positions[]" placeholder="Number of Positions" class="form__input" required>
            </div>
        `;
        $('#roles-container').append(roleGroup);
        $('.role-select').last().select2({
            placeholder: 'Select Role',
            width: '100%',
            dropdownCssClass: 'custom-dropdown',
            selectionCssClass: 'custom-selection',
            minimumResultsForSearch: Infinity
        });
    });

    const stripe = Stripe('pk_live_51PLd8T2LIKsfGjNtTLRNJb1W4hEqkMooAqwwmyZe9fe8IwgIYp1OMoZaSCIrel33RPWm226N9wPM4v10vX1wEZay00Zn82ZDXh'); // Replace with your actual publishable key

    document.addEventListener('DOMContentLoaded', async () => {
        try {
            const response = await fetch('https://hp-stripe-backend-new-d5589f9679e0.herokuapp.com/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const { clientSecret } = await response.json();

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

            const paymentForm = document.getElementById('payment-form');
            paymentForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const { error } = await stripe.confirmPayment({
                    elements,
                    confirmParams: {
                        return_url: 'https://your-website.com/checkout-success',
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
    });
});
