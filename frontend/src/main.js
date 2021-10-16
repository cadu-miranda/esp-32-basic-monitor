const sendPWMOutput = () => {

    const slider = document.querySelector('.pwmOutput').value
    const sliderValue = document.querySelector('.pwmOutputValue')

    sliderValue.innerHTML = slider
}

const receiveFastDataReadings = async () => {

    try {

        const fastDataURL = 'http://YOUR_ESP-32_IP_ADDRESS/fast_data_readings'

        const fastDataResponse = await fetch(fastDataURL)
        const fastDataOutput = await fastDataResponse.json()

        showFastData(fastDataOutput)

    } catch (error) {

        console.log(error)
    }

    finally {

        setTimeout(receiveFastDataReadings, 100)
    }
}

receiveFastDataReadings()

const showFastData = async (data) => {

    try {

        const buttonPressed = data.mcu_data.button_pressed
        const potenciometerValue = data.mcu_data.potenciometer_value

        const potenciometerGauge = document.querySelector(".gauge_potenciometer");
        const buttonPressedCheck = document.querySelector('.button__pressed')

        if (buttonPressed) {

            buttonPressedCheck.innerHTML = 'ON'
            buttonPressedCheck.style.backgroundColor = 'green'
        }

        else if (!buttonPressed) {

            buttonPressedCheck.innerHTML = 'OFF'
            buttonPressedCheck.style.backgroundColor = 'red'
        }

        const setGaugePotenciometer = (gauge, value) => {

            if (value < 0 || value > 1)

                return;

            gauge.querySelector(".gauge_potenciometer__fill").style.transform = `rotate(${potenciometerValue / 8190}turn)`;
            gauge.querySelector(".gauge_potenciometer__cover").innerHTML = potenciometerValue;
        }

        setGaugePotenciometer(potenciometerGauge, 1);

    } catch (error) {

        console.log(error)
    }
}

const receivesSlowReadings = async () => {

    try {

        const slowDataURL = 'http://YOUR_ESP-32_IP_ADDRESS/slow_data_readings'

        const slowDataResponse = await fetch(slowDataURL)
        const slowData = await slowDataResponse.json()

        showSlowData(slowData)

    } catch (error) {

        console.log(error)
    }

    finally {

        setTimeout(receivesSlowReadings, 2000)
    }
}

receivesSlowReadings()

const showSlowData = async (data) => {

    try {

        const temperature = data.mcu_data.dht11_temperature
        const humidity = data.mcu_data.dht11_humidity

        const temperatureGauge = document.querySelector(".gauge_temperature");
        const humidityGauge = document.querySelector(".gauge_humidity");

        const setTemperatureGauge = (gauge, value) => {

            if (value < 0 || value > 1)

                return;

            gauge.querySelector(".gauge_temperature__fill").style.transform = `rotate(${temperature / 100}turn)`;

            if (temperature === "nan")

                gauge.querySelector(".gauge_temperature__cover").innerHTML = '-';

            gauge.querySelector(".gauge_temperature__cover").innerHTML = `${temperature} °C`;
        }

        setTemperatureGauge(temperatureGauge, 1)

        const setHumidityGauge = (gauge, value) => {

            if (value < 0 || value > 1)

                return;

            gauge.querySelector(".gauge_humidity__fill").style.transform = `rotate(${humidity / 180}turn)`;

            if (humidity === 2147483647)

                gauge.querySelector(".gauge_humidity__cover").innerHTML = "-";

            gauge.querySelector(".gauge_humidity__cover").innerHTML = `${humidity} %`;
        }

        setHumidityGauge(humidityGauge, 1)

    } catch (error) {

        console.log(error)
    }
}
