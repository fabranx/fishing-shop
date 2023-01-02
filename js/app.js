const fishes = [
    {
        name: "clown-loach",
        size: 20,
        priceByKg: 8,
    },
    {
        name: "seahorse",
        size: 2,
        priceByKg: 3.5,
    },
    {
        name: "puffer-fish",
        size: 8,
        priceByKg: 6,
    },
    {
        name: "shrimp",
        size: 6,
        priceByKg: 14,
    },
    {
        name: "neon-tetra",
        size: 10,
        priceByKg: 5.5,
    },
    {
        name: "rockfish",
        size: 12,
        priceByKg: 10,
    },
    {
        name: "shell",
        size: 3,
        priceByKg: 4,
    },
    {
        name: "squid",
        size: 5,
        priceByKg: 2.5,
    }
];


let fishesOnScale = []

let draggedFish = null

main()

function main(){
    const scaleBox = document.querySelector('.scale-plate')
    scaleBox.addEventListener('drop', handleDrop)
    scaleBox.addEventListener('dragover', e => e.preventDefault()) 

    loadFishOnTrays()
}


function loadFishOnTrays(){
    fishes.forEach(fish => {
        let bench = document.querySelector('.bench')
        let fish_tray = `
            <div class="tray-ext">
                <div class="tray" id=${fish.name}>
                    <img draggable="true" class="fish-img" src="assets/fish/${fish.name}.png" title="${fish.name}" alt="${fish.name}">
                </div>
                <p>${fish.name}</p>
            </div>
            `
        bench.insertAdjacentHTML("afterbegin", fish_tray)
    })

    const query_fishes = document.querySelectorAll('.fish-img')
    query_fishes.forEach(fishImg => {
        fishImg.addEventListener('dragstart', handleDragStart)
        fishImg.addEventListener('dragend', handleDragEnd)
    })

    function handleDragStart() {
        this.style.opacity = '0.4';
        draggedFish = this
    }
    
    function handleDragEnd() {
        this.style.opacity = '1';
    }
}


function handleDrop(e){
    e.preventDefault()

    draggedFish.parentNode.removeChild(draggedFish);  // rimuove il pesce dalla vaschetta('tray')
    draggedFish.draggable = false

    let scaleFish = document.createElement('div')
    scaleFish.className='scale-fish'
    let scaleFishElement = this.insertAdjacentElement('afterbegin',scaleFish)
    scaleFishElement.appendChild(draggedFish)

    let trashDiv = `
        <span class="show-delete-button">
        <button class="trash-icon" onclick="removeFishFromScale(this)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"/>
            </svg>    
            </button>
        </span>                    
    `
    scaleFishElement.insertAdjacentHTML('beforeend', trashDiv)

    fishesOnScale.push(draggedFish.title)

    updatePrice()
    updateTotalKg()
}


function updatePrice(){
    let totalPrice = fishesOnScale.reduce((prev, curr) => {
        for(fish of fishes){
            if(fish.name == curr){
                return prev + (fish.priceByKg * fish.size)
            }
        }
        return prev
    }, 0)

    totalPriceElement = document.getElementById('total-price')
    totalPriceElement.innerText = "+" + totalPrice.toString()
}

function updateTotalKg(){
    let totalKg = fishesOnScale.reduce((prev, curr) => {
        for(fish of fishes){
            if(fish.name == curr){
                return prev + (fish.size)
            }
        }
        return prev
    }, 0)

    totalKgElement = document.getElementById('total-size')
    totalKgElement.innerText = totalKg.toString() + " Kg"
}

function removeFishFromScale(e){
    let scalefish = e.parentNode.parentNode
    let scaleplate = scalefish.parentNode

    scaleplate.removeChild(scalefish)  // rimuove il div esterno al tag img

    let fishimg = scalefish.querySelector('.fish-img')
    fishesOnScale.pop(fishimg.title)

    insertFishOnTray(fishimg)

    updatePrice()
    updateTotalKg()
}


function insertFishOnTray(fishimg){
    fishimg.draggable='true'
    fishimg.removeEventListener('click', removeFishFromScale)

    fishTray = document.getElementById(fishimg.title)
    fishTray.insertAdjacentElement('afterbegin', fishimg)
}