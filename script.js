const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },

    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
  })

const deposit_type_select = document.getElementById("deposit-type"),
    deposit_term_select = document.getElementById("deposit-term"),
    caclulator_form = document.getElementById("caclulator-form"),
    initial_params = document.getElementById("initial-params"),
    result_sum = document.getElementById("result-sum"),
    input_sum = document.getElementById("input-sum");

const deposit_type_mapping = {
    "Пополняемый": [{"6 месяцев": "20"}, {"1 год": "22"}, {"1,5 года": "15"}, {"2 года": "10"}],
    "Срочный": [{"3 месяца": "20"}, {"6 месяцев": "22"}, {"9 месяцев": "23"}, {"1 год": "24"}, {"1,5 года": "18"}]
}

function change_deposit_term_select_options(options) {
    deposit_term_select.innerHTML = "<option value='' disabled selected hidden>Срок вклада</option>"
    options.forEach(option => {
        const opt = document.createElement("option")
        opt.value = Object.values(option)[0]
        opt.innerHTML = Object.keys(option)[0]
        deposit_term_select.appendChild(opt)
    })
}

function calculate_income() {
    const term = deposit_term_select.options[deposit_term_select.selectedIndex].text
    initial_params.innerHTML = `Вклад "${deposit_type_select.value}" на срок "${term}" на сумму ${input_sum.value} руб.`

    const income = input_sum.value * (1 + (deposit_term_select.value / 100))
    result_sum.innerHTML = `В конце срока вы получите ${income.toFixed(2)} руб.`
}

deposit_type_select.addEventListener("change", () => {
    change_deposit_term_select_options(deposit_type_mapping[deposit_type_select.value])
})

caclulator_form.addEventListener("submit", e => {
    e.preventDefault()
    calculate_income()
})
