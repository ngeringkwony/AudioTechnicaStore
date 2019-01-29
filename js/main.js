let playerName = document.querySelector('div.item-name h2');
let specList = Array.from(document.querySelectorAll('.right ul li'));
let price = document.querySelector('h2.price');
let image = document.querySelector('div.item-image img');
let addToCart = document.querySelector('div.add-to-cart');
let count = 0;
let playersArray = null;
let next = document.querySelector('div.next');
let previous = document.querySelector('div.previous');
let endOfList = false;

fetch('../api/recordplayers.json')
    .then(
        function (response) {
            if (response.status != 200) {
                console.error("Error Fetching Date, Status Code " + response.status);
            }

            response.json().then(function (recordPlayers) {
                    // console.info(recordPlayers);
                    // set up item 0 for display on page load
                    playerName.textContent = recordPlayers[count].model;
                    specList[0].textContent = recordPlayers[count].color;
                    specList[1].textContent = "Automatic";
                    specList[2].textContent = recordPlayers[count].speed;
                    specList[3].textContent = recordPlayers[count].operation;
                    specList[4].textContent = recordPlayers[count].cartridge;
                    price.textContent = `$ ${recordPlayers[count].price}`;
                    image.src = recordPlayers[count].image.url;
                    playersArray = recordPlayers.slice();

                    return recordPlayers;
                })
                .then(function (recordPlayers) {

                    next.addEventListener('click', () => {
                        // count == recordPlayers.length - 1 ? endOfList = true : count++;
                        if (count < recordPlayers.length - 1) {
                            count++;
                            updateView(recordPlayers, count);
                            animateCSS();
                        }

                    });

                    previous.addEventListener('click', () => {
                        // count > 0 ? count-- : endOfList = true;
                        if (count > 0) {
                            count--;
                            updateView(recordPlayers, count);
                            animateCSS();
                        }
                    });
                })
        }
    )


function updateView(recordPlayers, count) {
    playerName.textContent = recordPlayers[count].model;
    specList[0].textContent = recordPlayers[count].color;
    specList[1].textContent = "Automatic";
    specList[2].textContent = recordPlayers[count].speed;
    specList[3].textContent = recordPlayers[count].operation;
    specList[4].textContent = recordPlayers[count].cartridge;
    price.textContent = `$ ${recordPlayers[count].price}`;
    image.src = recordPlayers[count].image.url;
}


//handle repeat animations after loading
function animateCSS() {
    console.log(endOfList);
    specList.forEach(el => el.classList.add('animated', 'fadeInUp', 'fast'));
    playerName.classList.add('animated', 'fadeInUp', 'fast');
    price.classList.add('animated', 'fadeInUp', 'fast');
    image.classList.add('animated', 'fadeInRight', '3s');
    addToCart.classList.add('animated', 'fadeInUp', 'fast');

    console.log("PLAYER NAME" + playerName)

    function handleAnimationEnd() {
        specList.forEach(el => el.classList.remove('animated', 'fadeInUp', 'fast'));
        playerName.classList.remove('animated', 'fadeInUp', 'fast');
        price.classList.remove('animated', 'fadeInUp', 'fast');
        image.classList.remove('animated', 'fadeInRight', '3s');
        addToCart.classList.remove('animated', 'fadeInUp', 'fast');

        specList.forEach(el => el.removeEventListener('animationend'.handleAnimationEnd));
        playerName.removeEventListener('animationend'.handleAnimationEnd);
        price.removeEventListener('animationend'.handleAnimationEnd);
        image.removeEventListener('animationend'.handleAnimationEnd);
        addToCart.removeEventListener('animationend'.handleAnimationEnd);

        if (typeof callback === 'function') callback();

    }

    specList.forEach(el => el.addEventListener('animationend', handleAnimationEnd));
    playerName.addEventListener('animationend'.handleAnimationEnd);
    price.addEventListener('animationend'.handleAnimationEnd);
    image.addEventListener('animationend'.handleAnimationEnd);
    addToCart.addEventListener('animationend'.handleAnimationEnd);

}