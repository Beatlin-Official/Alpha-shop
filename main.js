const stepControl = document.querySelector('.stepper__wrapper')
const steps = document.querySelectorAll('.step')

const formControl = document.querySelector('.form')
const forms = document.querySelectorAll('.form__wrapper')

const btnControl = document.querySelector('.button__wrapper')
const nextBtn = document.querySelector('.right')
const prevBtn = document.querySelector('.left')

const fareBtns = document.querySelectorAll('input[name="fare"]')

const decBtns = document.querySelectorAll('.decrease')
const incBtns = document.querySelectorAll('.increase')
const quantitys = document.querySelectorAll('.quantity')
const cartFare = document.querySelector('.fare')
const total = document.querySelector('.total')

let step = 0

// Control step,button panel
function btnControlClicked(e) {
    e.preventDefault()
    const nowStep = steps[step]
    if (e.target.matches('.right') && e.target.innerText === '下一步') {
        const nextStep = steps[step + 1]
        nowStep.classList.remove('active')
        nowStep.classList.add('checked')
        nextStep.classList.add('active')
        forms[step].classList.toggle('d-none')
        forms[step + 1].classList.toggle('d-none')
        step += 1
    } else if (e.target.matches('.left')) {
        const prevStep = steps[step - 1]
        nowStep.classList.remove('active')
        prevStep.classList.remove('checked')
        prevStep.classList.add('active')
        forms[step].classList.toggle('d-none')
        forms[step - 1].classList.toggle('d-none')
        step -= 1
    }
    setBtnControlPannel()
}

function setBtnControlPannel() {
    if (step === 0) {
        prevBtn.classList.add('d-none')
    } else if (step > 0) {
        prevBtn.classList.remove('d-none')
    }

    if (step === 2) {
        nextBtn.innerHTML = '確認下單'
    } else {
        nextBtn.innerHTML = '下一步<img src="img/right@2x.png" alt="">'
    }
}


function getFarePrice(e) {
    for (const fareBtn of fareBtns) {
        if (fareBtn.checked) {
            const farePrice = fareBtn.value
            cartFare.innerText = farePrice
            updateTotal()
            break
        }
    }
}


// Control cart panel
for (let i = 0; i < decBtns.length; i++) {
    const decBtn = decBtns[i]
    decBtn.addEventListener('click', function(e) {
        const btnClicked = e.target
        let decQuantity = Number(quantitys[i].innerText) - 1
        if (decQuantity < 1) {
            decQuantity = 1
        }
        btnClicked.nextElementSibling.innerText = decQuantity
        updateTotal()
    })
}
for (let i = 0; i < incBtns.length; i++) {
    const incBtn = incBtns[i]
    incBtn.addEventListener('click', function(e) {
        const btnClicked = e.target
        let incQuantity = Number(quantitys[i].innerText) + 1
        btnClicked.previousElementSibling.innerText = incQuantity
        updateTotal()
    })
}

function updateTotal() {
    totalPrice = ((quantitys[0].innerText) * 3299) + ((quantitys[1].innerText) * 1299)

    if (cartFare.innerText === '免費') {
        const farePrice = 0
        totalPrice += farePrice
    } else if (cartFare.innerText === '$500') {
        const farePrice = 500
        totalPrice += farePrice
    }
    total.innerText = '$' + totalPrice
}


btnControl.addEventListener('click', btnControlClicked)
forms[1].addEventListener('click', getFarePrice)