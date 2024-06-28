document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineLine = document.querySelector('.timeline::after');
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
});

$(document).ready(function() {
    var animating = false;
    var cardsCounter = 0;
    var numOfCards = $(".demo__card").length;
    var decisionVal = 80;
    var pullDeltaX = 0;
    var deg = 0;
    var $card, $cardReject, $cardLike;

    function pullChange() {
        animating = true;
        deg = pullDeltaX / 10;
        $card.css("transform", "translateX("+ pullDeltaX +"px) rotate("+ deg +"deg)");

        var opacity = pullDeltaX / 100;
        var rejectOpacity = (opacity >= 0) ? 0 : Math.abs(opacity);
        var likeOpacity = (opacity <= 0) ? 0 : opacity;
        $cardReject.css("opacity", rejectOpacity);
        $cardLike.css("opacity", likeOpacity);
    }

    function release() {
        if (pullDeltaX >= decisionVal) {
            $card.addClass("to-right");
        } else if (pullDeltaX <= -decisionVal) {
            $card.addClass("to-left");
        }

        if (Math.abs(pullDeltaX) >= decisionVal) {
            $card.addClass("inactive");

            setTimeout(function() {
                $card.addClass("below").removeClass("inactive to-left to-right");
                cardsCounter++;
                if (cardsCounter === numOfCards) {
                    cardsCounter = 0;
                    $(".demo__card").removeClass("below");
                }
            }, 300);
        }

        if (Math.abs(pullDeltaX) < decisionVal) {
            $card.addClass("reset");
        }

        setTimeout(function() {
            $card.attr("style", "").removeClass("reset")
                .find(".demo__card__choice").attr("style", "");

            pullDeltaX = 0;
            animating = false;
        }, 300);
    }

    $(document).on("mousedown touchstart", ".demo__card:not(.inactive)", function(e) {
        if (animating) return;

        $card = $(this);
        $cardReject = $(".demo__card__choice.m--reject", $card);
        $cardLike = $(".demo__card__choice.m--like", $card);
        var startX = e.pageX || e.originalEvent.touches[0].pageX;

        $(document).on("mousemove touchmove", function(e) {
            var x = e.pageX || e.originalEvent.touches[0].pageX;
            pullDeltaX = (x - startX);
            if (!pullDeltaX) return;
            pullChange();
        });

        $(document).on("mouseup touchend", function() {
            $(document).off("mousemove touchmove mouseup touchend");
            if (!pullDeltaX) return; // prevents from rapid click events
            release();
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const roles = [
        "Construction Estimator", "Graphic Designer", "Real Estate Admin", "Administrative Assistant", 
        "Data Analyst", "Customer Service Rep", "Marketing Specialist", "Software Developer", 
        "Project Manager", "Content Writer", "SEO Specialist", "Social Media Manager", 
        "Virtual Assistant", "Bookkeeper", "Sales Manager", "HR Specialist", 
        "Technical Support", "Network Administrator", "IT Support", "Paralegal", 
        "Medical Transcriptionist", "Financial Analyst", "Quality Assurance", "Operations Manager", 
        "Supply Chain Coordinator", "Research Assistant", "Product Manager", "UX/UI Designer", 
        "E-commerce Manager", "Email Marketer", "Video Editor", "Audio Engineer", 
        "Web Developer", "Mobile App Developer", "System Administrator", "Security Analyst", 
        "Copywriter", "Data Scientist", "Database Administrator", "Cybersecurity Specialist"
    ];

    const icons = [
        "🏗️", "🎨", "🏡", "🗂️", 
        "📊", "☎️", "📈", "💻", 
        "📋", "✍️", "🌐", "📱", 
        "🖥️", "📒", "💼", "🧑‍💼", 
        "🛠️", "🌐", "🖱️", "⚖️", 
        "🩺", "💹", "✅", "🏢", 
        "🚚", "🔬", "📦", "🖍️", 
        "🛒", "✉️", "🎥", "🎧", 
        "🕸️", "📱", "🖥️", "🛡️", 
        "✏️", "📊", "🗄️", "🔒"
    ];

    const rows = [document.getElementById('roles-row-1'), document.getElementById('roles-row-2'), document.getElementById('roles-row-3')];

    roles.forEach((role, index) => {
        const roleItem = document.createElement('div');
        roleItem.className = 'role-item';
        roleItem.innerHTML = `
            <div>${icons[index % icons.length]}</div>
            <h3>${role}</h3>
        `;
        rows[index % 3].appendChild(roleItem);
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
