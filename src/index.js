document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/ramens')
        .then(res => res.json())
        .then(ramens => {
            displayRamen(ramens);
            initialRamen(ramens);
        })
    
    function initialRamen(ramens) {
        let ramenDetail = document.querySelector('#ramen-detail');
        let ramenRating = document.querySelector('#rating-display');
        let ramenComment = document.querySelector('#comment-display');
        ramenDetail.innerHTML = 
            `<img class="detail-image" src=${ramens[0].image} alt="Insert Name Here" />
            <h2 class="name">${ramens[0].name}</h2>
            <h3 class="restaurant">${ramens[0].restaurant}</h3>`;
        ramenRating.textContent = `${ramens[0].rating}`;
        ramenComment.textContent = `${ramens[0].comment}`;
    }

    function displayRamen(ramens) {
        let ramenMenu = document.querySelector('#ramen-menu');
        ramens.forEach(ramen => {
            let ramenImage = document.createElement('img');
            ramenImage.src = ramen.image;
            ramenMenu.appendChild(ramenImage);
            ramenImage.addEventListener('click', () => {
                let ramenDetail = document.querySelector('#ramen-detail');
                let ramenRating = document.querySelector('#rating-display');
                let ramenComment = document.querySelector('#comment-display');
                ramenDetail.innerHTML = `
                    <img class="detail-image" src=${ramen.image} alt="Insert Name Here" />
                    <h2 class="name">${ramen.name}</h2>
                    <h3 class="restaurant">${ramen.restaurant}</h3>       
                `;
                ramenRating.textContent = `${ramen.rating}`;
                ramenComment.textContent = `${ramen.comment}`;
                document.querySelector('#edit-ramen').addEventListener('submit', (e) => {
                    e.preventDefault();
                    ramen.rating = e.target.rating.value;
                    ramen.comment = e.target['new-comment'].value;
                    handleEdit(ramen);
                });
            });
        })
    }
    
    function handleEdit(ramen) {
        fetch(`http://localhost:3000/ramens/${ramen.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ramen)
        })
            .then(res => res.json())
            .then(updatedRamen => {
                let ramenRating = document.querySelector('#rating-display');
                let ramenComment = document.querySelector('#comment-display');
                ramenRating.textContent = `${updatedRamen.rating}`;
                ramenComment.textContent = `${updatedRamen.comment}`;
            });
    }

    document.querySelector('#new-ramen').addEventListener('submit', (e) => {
        e.preventDefault();
        let ramenObj = {
            name: e.target.name.value,
            restaurant: e.target.restaurant.value,
            image: e.target.image.value,
            rating: e.target.rating.value,
            comment: e.target['new-comment'].value,
        }
        handleCreate(ramenObj);
    })

    function handleCreate(ramenObj) {
        fetch('http://localhost:3000/ramens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ramenObj)
        })
    }
})