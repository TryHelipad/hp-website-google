$(document).ready(function() {
    $('#roles').select2({
        placeholder: 'Select...',
        width: '100%',
        dropdownCssClass: 'custom-dropdown',
        selectionCssClass: 'custom-selection',
        minimumResultsForSearch: Infinity
    });

    $('.option__btn').on('click', function() {
        $('.intro').hide();
        $('#help-section').show();
    });

    $('#back-btn').on('click', function() {
        $('#help-section').hide();
        $('.intro').show();
    });

    $('#help-form').on('submit', function(e) {
        e.preventDefault();
        $('#help-section').hide();
        $('#hire-section').show();
    });

    $('#hire-back-btn').on('click', function() {
        $('#hire-section').hide();
        $('#help-section').show();
    });

    $('#hire-form').on('submit', function(e) {
        e.preventDefault();
        $('#hire-section').hide();
        $('#roles-section').show();
    });

    $('#roles-back-btn').on('click', function() {
        $('#roles-section').hide();
        $('#hire-section').show();
    });

    $('#roles-form').on('submit', function(e) {
        e.preventDefault();
        $('#roles-section').hide();
        $('#contact-section').show();
    });

    $('#contact-back-btn').on('click', function() {
        $('#contact-section').hide();
        $('#roles-section').show();
    });

    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        let quoteDetails = calculateQuote();
        $('#contact-section').hide();
        $('#result-section').show();
        $('#quote-details').html(quoteDetails);
    });

    $('#get-started-btn').on('click', function() {
        window.location.href = 'get-started.html';
    });

    $('#book-call-link').on('click', function(e) {
        e.preventDefault();
        Calendly.initPopupWidget({ url: 'https://calendly.com/hello-tryhelipad/30min' });
        return false;
    });
});

function calculateQuote() {
    let roles = $('#roles').val();
    let quoteDetails = '<div class="card-container">';

    roles.forEach(role => {
        let prices = getPrices(role);
        let responsibilities = getResponsibilities(role);

        quoteDetails += `
            <div class="card">
                <div class="card-header">
                    <div class="card-title">${role}</div>
                    <div class="card-prices">
                        <p><strong>Entry Level (0-2 years):</strong> ${prices.entry}</p>
                        <p><strong>Mid Level (2-5 years):</strong> ${prices.mid}</p>
                        <p><strong>Senior Level (5+ years):</strong> ${prices.senior}</p>
                        <p><strong>Expert Level (10+ years):</strong> ${prices.expert}</p>
                    </div>
                </div>
                <div class="card-responsibilities">
                    <strong>Responsibilities:</strong>
                    <ul>${responsibilities}</ul>
                </div>
            </div>
        `;
    });

    quoteDetails += '</div>';
    return quoteDetails;
}

function getPrices(role) {
    const basePrices = {
        'entry': 8,
        'mid': 15,
        'senior': 25,
        'expert': 32
    };

    const roleAdjustments = {
        'AI Consultant': 10,
        'AI Developer': 10,
        'AI Business Analyst': 5,
        'Real Estate Contracts Administration': 2,
        'Real Estate Administration Support': 1,
        'Real Estate Lead Generation Specialist': 3,
        'Digital Marketer': 4,
        'Social Media Specialist': 3,
        'Social Media Manager': 4,
        'Video Editor': 4,
        'Copywriter': 3,
        'Product Catalog Specialist': 2,
        'Operations Manager': 6,
        'Teleconsultant (Medical)': 8,
        'Loan Processor': 4,
        'Collections Officer': 3,
        'Bid Manager': 5,
        '.Net Developer': 10,
        'Software Engineer': 10,
        'Applications Developer': 8,
        'Backend Developer': 8,
        'Front End Developer': 7,
        'Full Stack Developer': 10,
        'Medical Transcription': 2,
        'Medical Receptionist': 1,
        'Medical Billing': 3,
        'Property Management Assistant': 2,
        'Engineer': 7,
        'Architect': 10,
        'CAD Designer': 6,
        'Draftsperson': 5,
        'HR Compensation and Benefits Specialist': 3,
        'HR Manager': 6,
        'HR Associate': 2,
        'Recruiter': 4,
        'Marketing Assistant': 2,
        'SEO Specialist': 4,
        'Google Ads (PPC)': 6,
        'Graphic Designer': 5,
        'Web Developer': 7,
        'Business Analyst': 6,
        'Data Analyst': 5,
        'Accountant': 5,
        'Bookkeeper': 3,
        'Sales Lead Generation': 3,
        'Sales Support Admin': 2,
        'Sales Specialist (B2B)': 5,
        'IT Support (Level 2)': 6,
        'IT Support (Level 1)': 4,
        'Customer Support – Non- Voice': 2,
        'Data Entry Specialist': 1,
        'E-Commerce Assistant': 2,
        'Executive Assistant': 4,
        'Customer Support – Voice': 3,
        'Virtual Assistant – Non Voice': 2
    };

    let prices = {
        entry: `$${(basePrices['entry'] + (roleAdjustments[role] || 0)).toFixed(2)}/hr`,
        mid: `$${(basePrices['mid'] + (roleAdjustments[role] || 0)).toFixed(2)}/hr`,
        senior: `$${(basePrices['senior'] + (roleAdjustments[role] || 0)).toFixed(2)}/hr`,
        expert: `$${(basePrices['expert'] + (roleAdjustments[role] || 0)).toFixed(2)}/hr`
    };

    return prices;
}

function getResponsibilities(role) {
    const responsibilities = {
        'AI Consultant': '<li>Providing AI consultation</li><li>Implementing AI solutions</li><li>Optimizing AI algorithms</li>',
        'AI Developer': '<li>Developing AI models</li><li>Programming AI applications</li><li>Collaborating with data scientists</li>',
        'AI Business Analyst': '<li>Analyzing business processes</li><li>Identifying AI opportunities</li><li>Managing AI projects</li>',
        'Real Estate Contracts Administration': '<li>Managing real estate contracts</li><li>Ensuring compliance</li><li>Handling documentation</li>',
        'Real Estate Administration Support': '<li>Providing administrative support</li><li>Managing schedules</li><li>Coordinating with clients</li>',
        'Real Estate Lead Generation Specialist': '<li>Generating leads</li><li>Managing client interactions</li><li>Supporting sales efforts</li>',
        'Digital Marketer': '<li>Creating digital marketing campaigns</li><li>Managing social media</li><li>Analyzing marketing data</li>',
        'Social Media Specialist': '<li>Developing social media strategies</li><li>Creating content</li><li>Engaging with followers</li>',
        'Social Media Manager': '<li>Managing social media accounts</li><li>Creating content plans</li><li>Monitoring performance</li>',
        'Video Editor': '<li>Editing video content</li><li>Adding effects</li><li>Ensuring high-quality production</li>',
        'Copywriter': '<li>Writing compelling copy</li><li>Creating content for various platforms</li><li>Editing text</li>',
        'Product Catalog Specialist': '<li>Managing product catalogs</li><li>Updating product information</li><li>Ensuring data accuracy</li>',
        'Operations Manager': '<li>Overseeing operations</li><li>Managing teams</li><li>Improving efficiency</li>',
        'Teleconsultant (Medical)': '<li>Providing telehealth consultations</li><li>Advising patients</li><li>Coordinating care</li>',
        'Loan Processor': '<li>Processing loan applications</li><li>Verifying information</li><li>Coordinating with clients</li>',
        'Collections Officer': '<li>Managing collections</li><li>Contacting debtors</li><li>Negotiating payment plans</li>',
        'Bid Manager': '<li>Managing bids</li><li>Preparing proposals</li><li>Coordinating with stakeholders</li>',
        '.Net Developer': '<li>Developing .Net applications</li><li>Coding</li><li>Debugging software</li>',
        'Software Engineer': '<li>Designing software</li><li>Writing code</li><li>Collaborating with development teams</li>',
        'Applications Developer': '<li>Creating applications</li><li>Testing software</li><li>Implementing updates</li>',
        'Backend Developer': '<li>Developing backend systems</li><li>Managing databases</li><li>Ensuring server performance</li>',
        'Front End Developer': '<li>Creating user interfaces</li><li>Coding front-end elements</li><li>Optimizing performance</li>',
        'Full Stack Developer': '<li>Developing both front-end and backend systems</li><li>Managing databases</li><li>Ensuring functionality</li>',
        'Medical Transcription': '<li>Transcribing medical records</li><li>Ensuring accuracy</li><li>Maintaining confidentiality</li>',
        'Medical Receptionist': '<li>Managing patient appointments</li><li>Handling inquiries</li><li>Coordinating with medical staff</li>',
        'Medical Billing': '<li>Processing medical bills</li><li>Verifying insurance information</li><li>Handling billing inquiries</li>',
        'Property Management Assistant': '<li>Supporting property management</li><li>Handling tenant inquiries</li><li>Managing documentation</li>',
        'Engineer': '<li>Designing solutions</li><li>Developing projects</li><li>Collaborating with teams</li>',
        'Architect': '<li>Creating architectural designs</li><li>Developing plans</li><li>Coordinating with clients</li>',
        'CAD Designer': '<li>Creating CAD designs</li><li>Developing technical drawings</li><li>Collaborating with engineers</li>',
        'Draftsperson': '<li>Drafting technical drawings</li><li>Creating blueprints</li><li>Supporting design teams</li>',
        'HR Compensation and Benefits Specialist': '<li>Managing compensation plans</li><li>Administering benefits</li><li>Ensuring compliance</li>',
        'HR Manager': '<li>Overseeing HR operations</li><li>Managing HR policies</li><li>Supporting employee relations</li>',
        'HR Associate': '<li>Providing HR support</li><li>Managing records</li><li>Assisting with recruitment</li>',
        'Recruiter': '<li>Managing recruitment processes</li><li>Screening candidates</li><li>Conducting interviews</li>',
        'Marketing Assistant': '<li>Supporting marketing efforts</li><li>Creating content</li><li>Analyzing performance data</li>',
        'SEO Specialist': '<li>Optimizing websites</li><li>Conducting keyword research</li><li>Analyzing performance</li>',
        'Google Ads (PPC)': '<li>Managing PPC campaigns</li><li>Optimizing ads</li><li>Analyzing performance data</li>',
        'Graphic Designer': '<li>Creating visual content</li><li>Designing graphics</li><li>Collaborating with marketing teams</li>',
        'Web Developer': '<li>Developing websites</li><li>Coding front-end and backend elements</li><li>Ensuring functionality</li>',
        'Business Analyst': '<li>Analyzing business processes</li><li>Identifying improvements</li><li>Managing projects</li>',
        'Data Analyst': '<li>Analyzing data</li><li>Creating reports</li><li>Providing insights</li>',
        'Accountant': '<li>Managing financial records</li><li>Preparing reports</li><li>Ensuring compliance</li>',
        'Bookkeeper': '<li>Recording financial transactions</li><li>Managing accounts</li><li>Preparing financial statements</li>',
        'Sales Lead Generation': '<li>Generating sales leads</li><li>Managing client interactions</li><li>Supporting sales efforts</li>',
        'Sales Support Admin': '<li>Providing administrative support to sales teams</li><li>Managing schedules</li><li>Coordinating with clients</li>',
        'Sales Specialist (B2B)': '<li>Managing B2B sales</li><li>Negotiating contracts</li><li>Building client relationships</li>',
        'IT Support (Level 2)': '<li>Providing advanced IT support</li><li>Troubleshooting issues</li><li>Managing systems</li>',
        'IT Support (Level 1)': '<li>Providing basic IT support</li><li>Resolving technical issues</li><li>Assisting users</li>',
        'Customer Support – Non- Voice': '<li>Providing customer support</li><li>Resolving issues</li><li>Managing inquiries via email or chat</li>',
        'Data Entry Specialist': '<li>Entering data</li><li>Maintaining records</li><li>Ensuring data accuracy</li>',
        'E-Commerce Assistant': '<li>Managing e-commerce platforms</li><li>Updating product listings</li><li>Handling customer inquiries</li>',
        'Executive Assistant': '<li>Providing administrative support</li><li>Managing schedules</li><li>Coordinating meetings</li>',
        'Customer Support – Voice': '<li>Providing customer support via phone</li><li>Resolving issues</li><li>Managing inquiries</li>',
        'Virtual Assistant – Non Voice': '<li>Providing virtual support</li><li>Managing tasks</li><li>Assisting with administrative duties</li>'
    };

    return responsibilities[role] || '<li>Role-specific responsibilities and tasks.</li>';
}
