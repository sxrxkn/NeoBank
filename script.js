
const slider = document.querySelector('.news__slider')
const currenciesExchangeList = document.querySelector('.exchange-rate__left-block__dl')
const sliderNext = document.querySelector('.news__buttons__right-button')
const sliderBack = document.querySelector('.news__buttons__left-button')

const defaultCurrenciesArray = 
[
    {'from': 'USD', 'to': 'RUB'},
    {'from': 'EUR', 'to': 'RUB'},
    {'from': 'SGD', 'to': 'RUB'},
    {'from': 'MYR', 'to': 'RUB'},
    {'from': 'AUD', 'to': 'RUB'},
    {'from': 'JPY', 'to': 'RUB'},
]
const promises = []
let startX = 0
let sliderElementCount = 0

sliderBack.disabled = true

const getCurrencyExchangeData = (currenciesArray = defaultCurrenciesArray) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a749e2e215msh156b9c24f55d9e9p1ef9c6jsn8c00b0b8ec88',
            'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com',
        }
    };

    for (let i = 0; i < currenciesArray.length; i += 1) {
        try {
            const promise = new Promise((resolve, reject) => {
                const data = currenciesArray[i]
                const from = data['from']
                const to = data['to']
                fetch(`https://currency-exchange.p.rapidapi.com/exchange?from=${from}&to=${to}&q=1`, options)
                    .then(response => response.json())
                    .then(response => {
                        const roundValue = Math.round(response  * 100) / 100
                        resolve({from, roundValue})
                    })
                
            })
            promises.push(promise)
        } catch(err) {
            console.log('Something went wrong. Error: ', err.message)
        }
    }
}

const addCurrencyValuesToDOM = data => {
    currenciesExchangeList.textContent = ''
    data.forEach(values => {
        const dt = document.createElement('dt')
        const dd = document.createElement('dd')
        dt.innerHTML = values['from'] + ':'
        dd.innerHTML= values['roundValue']
        currenciesExchangeList.appendChild(dt)
        currenciesExchangeList.appendChild(dd)
   })
}

const getNewsData = async (url) => {
    const newsData = await fetch(url)
    .then(response => response.json())
    return newsData
}

const addNewsToDOM = (newsCount = 36) => {
    const newsApiURL = `https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=${newsCount}&apiKey=ed7793fe31c54696898542bd8ab3e8f9`
    try {
        getNewsData(newsApiURL).then(data => {
            sliderElementCount = data['articles'].length
            data['articles'].forEach(news => {
                if (news['description'] && !news['description'].includes('<a')) {
                    const image = new Image();
                    image.src = news['urlToImage'];
                    image.onload = () => { 
                        const description = news['description']
                        const url = news['url']
                        const urlToImage = news['urlToImage']
                        const title = news['title']
    
                        const div = document.createElement('div')
                        const img = document.createElement('img')
                        const p = document.createElement('p')
                        const h = document.createElement('h4')
                        const a = document.createElement('a')
            
                        div.classList.add("news__slider__slide")
                        p.classList.add("news__slider__slide__description")
                        h.classList.add("news__slider__slide__header")
                        img.classList.add("news__slider__slide__img")
                        a.classList.add("news__slider__slide__link")
                        a.setAttribute('target', "_blank")
            
                        p.textContent = description
                        h.textContent = title
                        img.src = urlToImage
                        a.href = url
                        a.title = "Open the news article"
                        a.textContent = "Open the news article"
            
                        div.append(h, img, p, a)
                        slider.appendChild(div)
                    }
                    image.onerror = () => { console.log('image is not exist') }
                }
            })
        })
    } catch (err) {
        console.log(console.log('Something went wrong. Error: ', err.message))
    }

}

const rollSlider = (isScrollNext) => {
    if (isScrollNext) {
        if (((startX - 500) - slider.offsetWidth) * -1 >= slider.scrollWidth) {
            sliderNext.disabled = true
            startX = (slider.scrollWidth - slider.offsetWidth + 2) * -1
        } else {
            sliderBack.disabled = false
            startX -= 500
        }
    } else if ((startX + 500) >= 0) {
        sliderBack.disabled = true
        startX = 2
    } else {
        sliderNext.disabled = false
        startX += 500
    }
    slider.style.transform = `translateX(${startX}px)`
}

sliderNext.addEventListener('click', () => {
    rollSlider(true)
})

sliderBack.addEventListener('click', () => {
    rollSlider(false)
})

const updateCurrencyExchange = () => {
    getCurrencyExchangeData()
    Promise.all(promises).then(values => addCurrencyValuesToDOM(values))
    promises.splice(0, promises.length)
}

updateCurrencyExchange()
addNewsToDOM()
setInterval(updateCurrencyExchange, 900000)

