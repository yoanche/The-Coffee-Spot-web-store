document.addEventListener("DOMContentLoaded", function () {
    setupOrderForms();
    setupReviewForms();
});


function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}


function setupOrderForms() {
    const orderForms = document.querySelectorAll(".order-form");

    orderForms.forEach(form => {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const nameInput = form.querySelector('input[name="name"]');
            const name = nameInput ? nameInput.value.trim() : "";

            if (name) {
                alert(`${name}, благодарим за поръчката!`);
                form.reset();
            } else {
                alert("Моля, въведете вашето име и адрес.");
            }
        });
    });
}


function setupReviewForms() {
    const reviewForm = document.getElementById('reviewForm');
    const reviewList = document.getElementById('reviewList');

    
    const savedReviews = JSON.parse(localStorage.getItem('global-reviews') || '[]');
    savedReviews.forEach(text => addReviewToPage(text));

    reviewForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const textarea = reviewForm.querySelector('textarea[name="review"]');
        const text = textarea.value.trim();
        if (text) {
            addReviewToPage(text);
            saveReviewToDB(text);
            textarea.value = '';
        }
    });

    function addReviewToPage(text) {
        const p = document.createElement("p");
        p.textContent = text;
        reviewList.prepend(p);
    }
}


function saveReviewToDB(review) {
    let reviews = JSON.parse(localStorage.getItem('global-reviews')) || [];
    reviews.unshift(review);
    localStorage.setItem('global-reviews', JSON.stringify(reviews));
}

