document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector(".menu-toggle")
    const navMenu = document.querySelector(".nav-menu")
  
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active")
      navMenu.classList.toggle("active")
    })
  
    // Destination Text Animation
    const destinations = ["DELHI", "MUMBAI", "KOLKATA", "CHENNAI", "BANGALORE", "JAIPUR"]
  
    const changeContent = document.querySelector(".change-content")
    changeContent.classList.add("destination-text")
    let currentIndex = 0
  
    function updateDestination() {
      changeContent.style.opacity = 0
  
      setTimeout(() => {
        changeContent.textContent = destinations[currentIndex]
        changeContent.style.opacity = 1
        currentIndex = (currentIndex + 1) % destinations.length
      }, 500)
    }
  
    // Initial text
    updateDestination()
  
    // Update every 3 seconds
    setInterval(updateDestination, 3000)
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        })
      })
    })
  
    // Form submission handling
    const signupForm = document.getElementById("signup-form")
    const contactForm = document.getElementById("contact-form")
  
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault()
      alert("Thank you for signing up! We'll keep you updated.")
      signupForm.reset()
    })
  
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
      alert("Thank you for your message. We'll get back to you soon!")
      contactForm.reset()
    })
  
    // Lazy loading images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]')
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target
          lazyImage.src = lazyImage.dataset.src
          lazyImage.removeAttribute("loading")
          lazyImageObserver.unobserve(lazyImage)
        }
      })
    })
  
    lazyImages.forEach((image) => lazyImageObserver.observe(image))
  
    // Simple image lightbox
    const lightboxImages = document.querySelectorAll(".gallery-item img, .cuisine-item img, .festival-item img")
    const lightbox = document.createElement("div")
    lightbox.id = "lightbox"
    document.body.appendChild(lightbox)
  
    lightboxImages.forEach((image) => {
      image.addEventListener("click", (e) => {
        lightbox.classList.add("active")
        const img = document.createElement("img")
        img.src = image.src
        while (lightbox.firstChild) {
          lightbox.removeChild(lightbox.firstChild)
        }
        lightbox.appendChild(img)
      })
    })
  
    lightbox.addEventListener("click", (e) => {
      if (e.target !== e.currentTarget) return
      lightbox.classList.remove("active")
    })
  
    // Back to top button
    const backToTopButton = document.createElement("button")
    backToTopButton.innerHTML = "&uarr;"
    backToTopButton.setAttribute("aria-label", "Back to top")
    backToTopButton.classList.add("back-to-top")
    document.body.appendChild(backToTopButton)
  
    const toggleBackToTopButton = () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add("show")
      } else {
        backToTopButton.classList.remove("show")
      }
    }
  
    window.addEventListener("scroll", toggleBackToTopButton)
  
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  
    // Weather Widget
    const weatherWidget = document.getElementById("weather-content")
    const cities = ["Mumbai", "Delhi", "Bangalore", "Kolkata", "Chennai"]
    const apiKey = "1234567890abcdef1234567890abcdef" // Replace with your actual OpenWeatherMap API key
  
    async function fetchWeather(city) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},in&units=metric&appid=${apiKey}`,
        )
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return `
                  <div class="weather-item">
                      <h4>${city}</h4>
                      <p>${data.main.temp.toFixed(1)}°C</p>
                      <p>${data.weather[0].description}</p>
                      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
                  </div>
              `
      } catch (error) {
        console.error("Error fetching weather for", city, ":", error)
        return `<div class="weather-item"><h4>${city}</h4><p>Weather data unavailable</p></div>`
      }
    }
  
    async function updateWeather() {
      weatherWidget.innerHTML = "<p>Loading weather data...</p>"
      try {
        const weatherPromises = cities.map(fetchWeather)
        const weatherData = await Promise.all(weatherPromises)
        weatherWidget.innerHTML = weatherData.join("")
  
        // Add a refresh button
        const refreshBtn = document.createElement("button")
        refreshBtn.textContent = "Refresh Weather"
        refreshBtn.classList.add("btn", "btn-secondary")
        refreshBtn.addEventListener("click", updateWeather)
        weatherWidget.appendChild(refreshBtn)
      } catch (error) {
        console.error("Error updating weather:", error)
        weatherWidget.innerHTML = "<p>Unable to fetch weather data. Please try again later.</p>"
      }
    }
  
    updateWeather()
    setInterval(updateWeather, 600000) // Update every 10 minutes
  
    // Currency Converter
    const amountInput = document.getElementById("amount")
    const fromCurrency = document.getElementById("from-currency")
    const toCurrency = document.getElementById("to-currency")
    const convertBtn = document.getElementById("convert-btn")
    const resultInput = document.getElementById("result")
  
    const fromCurrencyOptions = `
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          <option value="AUD">AUD</option>
          <option value="CAD">CAD</option>
          <option value="CHF">CHF</option>
          <option value="CNY">CNY</option>
          <option value="SEK">SEK</option>
          <option value="NZD">NZD</option>
          <option value="INR">INR</option>
          <option value="SGD">SGD</option>
          <option value="HKD">HKD</option>
          <option value="KRW">KRW</option>
          <option value="BRL">BRL</option>
          <option value="MXN">MXN</option>
          <option value="ZAR">ZAR</option>
          <option value="RUB">RUB</option>
          <option value="TRY">TRY</option>
          <option value="SAR">SAR</option>
          <option value="AED">AED</option>
          <option value="THB">THB</option>
          <option value="MYR">MYR</option>
          <option value="PHP">PHP</option>
          <option value="IDR">IDR</option>
          <option value="PLN">PLN</option>
          <option value="NOK">NOK</option>
          <option value="DKK">DKK</option>
          <option value="HUF">HUF</option>
          <option value="CZK">CZK</option>
          <option value="ILS">ILS</option>
          <option value="ARS">ARS</option>
          <option value="CLP">CLP</option>
          <option value="COP">COP</option>
          <option value="PEN">PEN</option>
          <option value="VND">VND</option>
          <option value="PKR">PKR</option>
          <option value="EGP">EGP</option>
          <option value="NGN">NGN</option>
          <option value="BDT">BDT</option>
          <option value="LKR">LKR</option>
          <option value="KES">KES</option>
          <option value="UGX">UGX</option>
          <option value="GHS">GHS</option>
          <option value="TZS">TZS</option>
          <option value="ZMW">ZMW</option>
          <option value="MAD">MAD</option>
          <option value="DZD">DZD</option>
          <option value="TND">TND</option>
          <option value="QAR">QAR</option>
          <option value="OMR">OMR</option>
          <option value="KWD">KWD</option>
          <option value="BHD">BHD</option>
          <option value="JOD">JOD</option>
          <option value="LBP">LBP</option>
          <option value="SYP">SYP</option>
          <option value="YER">YER</option>
          <option value="IQD">IQD</option>
          <option value="IRR">IRR</option>
          <option value="AFN">AFN</option>
          <option value="NPR">NPR</option>
          <option value="BTN">BTN</option>
          <option value="MVR">MVR</option>
          <option value="SCR">SCR</option>
          <option value="MUR">MUR</option>
          <option value="MGA">MGA</option>
          <option value="MZN">MZN</option>
          <option value="SZL">SZL</option>
          <option value="LSL">LSL</option>
          <option value="MWK">MWK</option>
          <option value="AOA">AOA</option>
          <option value="XAF">XAF</option>
          <option value="XOF">XOF</option>
          <option value="RWF">RWF</option>
          <option value="LYD">LYD</option>
          <option value="SDG">SDG</option>
          <option value="SSP">SSP</option>
          <option value="ERN">ERN</option>
          <option value="DJF">DJF</option>
      `
  
    fromCurrency.innerHTML = fromCurrencyOptions
  
    convertBtn.addEventListener("click", async () => {
      const amount = amountInput.value
      const from = fromCurrency.value
      const to = toCurrency.value
  
      try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
        if (!response.ok) {
          throw new Error("Failed to fetch exchange rates")
        }
        const data = await response.json()
        const rate = data.rates[to]
        if (rate === undefined) {
          throw new Error("Invalid currency pair")
        }
        const result = (amount * rate).toFixed(2)
        resultInput.value = `${result} ${to}`
  
        // Add historical data
        const historicalData = await fetchHistoricalRates(from, to)
        displayHistoricalRates(historicalData)
      } catch (error) {
        console.error("Error converting currency:", error)
        resultInput.value = "Error: " + error.message
      }
    })
  
    async function fetchHistoricalRates(from, to) {
      try {
        const today = new Date()
        const oneMonthAgo = new Date(today.setMonth(today.getMonth() - 1))
        const response = await fetch(
          `https://api.exchangerate.host/timeseries?start_date=${oneMonthAgo.toISOString().split("T")[0]}&end_date=${new Date().toISOString().split("T")[0]}&base=${from}&symbols=${to}`,
        )
        if (!response.ok) {
          throw new Error("Failed to fetch historical rates")
        }
        const data = await response.json()
        return Object.entries(data.rates).map(([date, rate]) => ({ date, rate: rate[to] }))
      } catch (error) {
        console.error("Error fetching historical rates:", error)
        throw error
      }
    }
  
    function displayHistoricalRates(data) {
      const canvas = document.getElementById("historical-rates-chart")
      const ctx = canvas.getContext("2d")
  
      // Clear previous chart
      ctx.clearRect(0, 0, canvas.width, canvas.height)
  
      if (data.length === 0) {
        ctx.font = "14px Arial"
        ctx.fillText("No historical data available", 10, 50)
        return
      }
  
      // Draw new chart
      const maxRate = Math.max(...data.map((d) => d.rate))
      const minRate = Math.min(...data.map((d) => d.rate))
  
      ctx.beginPath()
      ctx.moveTo(0, canvas.height - ((data[0].rate - minRate) / (maxRate - minRate)) * canvas.height)
  
      data.forEach((d, i) => {
        const x = (i / (data.length - 1)) * canvas.width
        const y = canvas.height - ((d.rate - minRate) / (maxRate - minRate)) * canvas.height
        ctx.lineTo(x, y)
      })
  
      ctx.strokeStyle = "#4ECDC4"
      ctx.lineWidth = 2
      ctx.stroke()
  
      // Add labels
      ctx.font = "12px Arial"
      ctx.fillStyle = "#333"
      ctx.fillText(`${minRate.toFixed(4)}`, 5, canvas.height - 5)
      ctx.fillText(`${maxRate.toFixed(4)}`, 5, 15)
      ctx.fillText(data[0].date, 5, canvas.height - 20)
      ctx.fillText(data[data.length - 1].date, canvas.width - 70, canvas.height - 20)
    }
  
    // Interactive Map
    const map = L.map("map").setView([20.5937, 78.9629], 4)
  
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)
  
    const locations = [
      { name: "Taj Mahal, Agra", coords: [27.1751, 78.0421], image: "/images/taj-mahal.jpeg" },
      { name: "Kerala Backwaters", coords: [9.4981, 76.3388], image: "/images/kerala.jpeg" },
      { name: "Varanasi", coords: [25.3176, 82.9739], image: "/images/varanasi-ghats.jpeg" },
      { name: "Jaipur, Rajasthan", coords: [26.9124, 75.7873], image: "/images/hawa-mahal.jpeg" },
      { name: "Golden Temple, Amritsar", coords: [31.62, 74.8765], image: "/images/golden-temple.jpeg" },
      { name: "Hampi, Karnataka", coords: [15.335, 76.46], image: "/images/hampi-ruins.jpeg" },
      { name: "Andaman Islands", coords: [11.7401, 92.6586], image: "/images/andaman-islands.jpeg" },
      { name: "Darjeeling, West Bengal", coords: [27.041, 88.2663], image: "/images/darjeeling-tea-gardens.jpeg" },
      { name: "Goa Beaches", coords: [15.2993, 74.124], image: "/images/goa-beaches.jpeg" },
      { name: "Ladakh", coords: [34.2268, 77.5619], image: "/images/pangong-lake.jpeg" },
    ]
  
    locations.forEach((location) => {
      const popupContent = `
              <div class="map-popup">
                  <h3>${location.name}</h3>
                  <img src="${location.image}" alt="${location.name}" style="width:100%;max-width:200px;">
              </div>
          `
      L.marker(location.coords).addTo(map).bindPopup(popupContent)
    })
  
    // Scroll Reveal
    const revealElements = document.querySelectorAll(".reveal")
  
    const revealElementOnScroll = () => {
      for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight
        const elementTop = revealElements[i].getBoundingClientRect().top
        const elementVisible = 150
  
        if (elementTop < windowHeight - elementVisible) {
          revealElements[i].classList.add("active")
        } else {
          revealElements[i].classList.remove("active")
        }
      }
    }
  
    window.addEventListener("scroll", revealElementOnScroll)
  
    // Navbar color change on scroll
    const navbar = document.querySelector(".navbar")
    const changeNavbarColor = () => {
      if (window.scrollY >= 80) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    }
  
    window.addEventListener("scroll", changeNavbarColor)
  
    // Language Translator
    const translateBtn = document.getElementById("translate-btn")
    const inputLanguage = document.getElementById("input-language")
    const outputLanguage = document.getElementById("output-language")
    const textToTranslate = document.getElementById("text-to-translate")
    const translationResult = document.getElementById("translation-result")
  
    const addLoadingIndicator = () => {
      const loadingIndicator = document.createElement("div")
      loadingIndicator.id = "loading-indicator"
      loadingIndicator.textContent = "Translating..."
      document.body.appendChild(loadingIndicator)
    }
  
    const removeLoadingIndicator = () => {
      const loadingIndicator = document.getElementById("loading-indicator")
      if (loadingIndicator) {
        loadingIndicator.remove()
      }
    }
  
    translateBtn.addEventListener("click", async () => {
      addLoadingIndicator()
      const sourceLang = inputLanguage.value
      const targetLang = outputLanguage.value
      const text = textToTranslate.value
  
      if (sourceLang === targetLang) {
        translationResult.textContent = text
      } else {
        try {
          const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`,
          )
          const data = await response.json()
          if (data.responseStatus === 200) {
            translationResult.textContent = data.responseData.translatedText
          } else {
            console.error("Translation error:", data.responseStatus)
            translationResult.textContent = "Error: Unable to translate text"
          }
        } catch (error) {
          console.error("Translation error:", error)
          translationResult.textContent = "Error: Unable to translate text"
        }
      }
      removeLoadingIndicator()
    })
  
    // New feature: Virtual Tour
    const virtualTourBtn = document.getElementById("virtual-tour-btn")
    const virtualTourModal = document.getElementById("virtual-tour-modal")
    const closeVirtualTourBtn = document.getElementById("close-virtual-tour")
  
    virtualTourBtn.addEventListener("click", () => {
      virtualTourModal.style.display = "block"
    })
  
    closeVirtualTourBtn.addEventListener("click", () => {
      virtualTourModal.style.display = "none"
    })
  
    // New feature: Travel Planner
    const plannerForm = document.getElementById("planner-form")
    const itineraryResult = document.getElementById("itinerary-result")
  
    plannerForm.addEventListener("submit", async (e) => {
      e.preventDefault()
      const destination = document.getElementById("planner-destination").value
      const duration = document.getElementById("planner-duration").value
      const interests = Array.from(document.querySelectorAll('input[name="interests"]:checked')).map((el) => el.value)
  
      const itinerary = await generateAIItinerary(destination, duration, interests)
      itineraryResult.innerHTML = itinerary
    })
  
    async function generateAIItinerary(destination, duration, interests) {
      const prompt = `Create a ${duration}-day itinerary for a trip to ${destination}, India. The traveler is interested in ${interests.join(", ")}. Provide a day-by-day plan with specific activities, attractions, and local experiences. Include some lesser-known spots and authentic local experiences.`
  
      try {
        const response = await fetch("https://api.openai.com/v1/engines/text-davinci-002/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_OPENAI_API_KEY", // Replace with your actual OpenAI API key
          },
          body: JSON.stringify({
            prompt: prompt,
            max_tokens: 500,
            n: 1,
            stop: null,
            temperature: 0.7,
          }),
        })
  
        if (!response.ok) {
          throw new Error("Failed to generate itinerary")
        }
  
        const data = await response.json()
        const generatedItinerary = data.choices[0].text.trim()
  
        return `<h3>Your ${duration}-day trip to ${destination}</h3>
                      <div class="ai-generated-itinerary">${generatedItinerary}</div>`
      } catch (error) {
        console.error("Error generating itinerary:", error)
        return `<p>Sorry, we couldn't generate an itinerary at this time. Please try again later.</p>`
      }
    }
  
    // Initialize all functions
    revealElementOnScroll()
    changeNavbarColor()
  
    // Dark mode toggle
    const darkModeToggle = document.getElementById("dark-mode-toggle")
    const body = document.body
  
    darkModeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode")
      localStorage.setItem("darkMode", body.classList.contains("dark-mode"))
    })
  
    // Check for saved dark mode preference
    if (localStorage.getItem("darkMode") === "true") {
      body.classList.add("dark-mode")
    }
  
    // Floating Action Button
    const fabToggle = document.getElementById("fab-toggle")
    const fabMenu = document.querySelector(".fab-menu")
  
    fabToggle.addEventListener("click", (e) => {
      e.stopPropagation()
      fabMenu.classList.toggle("active")
    })
  
    // Close FAB menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!fabToggle.contains(e.target) && !fabMenu.contains(e.target)) {
        fabMenu.classList.remove("active")
      }
    })
  
    // Prevent closing when clicking on menu items
    fabMenu.addEventListener("click", (e) => {
      e.stopPropagation()
    })
  
    // Parallax effect
    const parallaxElements = document.querySelectorAll("[data-parallax-speed]")
  
    function updateParallax() {
      parallaxElements.forEach((element) => {
        const speed = Number.parseFloat(element.getAttribute("data-parallax-speed"))
        const yOffset = window.pageYOffset
        element.style.transform = `translateY(${yOffset * speed}px)`
      })
    }
  
    window.addEventListener("scroll", updateParallax)
    updateParallax() // Initial call to set positions
  
    // World Clock
    const worldClockGrid = document.querySelector(".world-clock-grid")
    const worldClockCities = [
      { name: "New York", timezone: "America/New_York" },
      { name: "London", timezone: "Europe/London" },
      { name: "Paris", timezone: "Europe/Paris" },
      { name: "Tokyo", timezone: "Asia/Tokyo" },
      { name: "Sydney", timezone: "Australia/Sydney" },
      { name: "Dubai", timezone: "Asia/Dubai" },
      { name: "Moscow", timezone: "Europe/Moscow" },
      { name: "Singapore", timezone: "Asia/Singapore" },
    ]
  
    function createClockItem(city) {
      const clockItem = document.createElement("div")
      clockItem.classList.add("clock-item")
      clockItem.innerHTML = `
            <h3>${city.name}</h3>
            <div class="time"></div>
            <div class="date"></div>
        `
      return clockItem
    }
  
    function updateClocks() {
      worldClockCities.forEach((city, index) => {
        const clockItem = worldClockGrid.children[index]
        const timeElement = clockItem.querySelector(".time")
        const dateElement = clockItem.querySelector(".date")
  
        const now = new Date()
        const options = {
          timeZone: city.timezone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }
        const timeString = now.toLocaleTimeString("en-US", options)
  
        const dateOptions = {
          timeZone: city.timezone,
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        }
        const dateString = now.toLocaleDateString("en-US", dateOptions)
  
        timeElement.textContent = timeString
        dateElement.textContent = dateString
      })
    }
  
    // Create clock items
    worldClockCities.forEach((city) => {
      const clockItem = createClockItem(city)
      worldClockGrid.appendChild(clockItem)
    })
  
    // Update clocks immediately and then every second
    updateClocks()
    setInterval(updateClocks, 1000)
  })
  
  