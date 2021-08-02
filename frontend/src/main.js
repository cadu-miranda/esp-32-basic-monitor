const sendDigitalOutput = (e) => {

    e.innerHTML = e.innerHTML == 'ON' ? 'OFF' : 'ON'

    e.style.backgroundColor = 'red'

    if (e.innerHTML === 'ON')

        e.style.backgroundColor = 'green'

    else

        e.style.backgroundColor = 'red'
}

const sendPWMOutput = () => {

    const slider = document.querySelector('.pwmOutput').value
    const sliderValue = document.querySelector('.pwmOutputValue')

    sliderValue.innerHTML = slider
}

const receiveFastDataReadings = async () => {

    try {

        const fastDataURL = ''

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

        const botaoPressionado = data.mcu_data.button_pressed
        const valPotenciometro = data.mcu_data.potenciometer_value

        const gaugePotenciometro = document.querySelector(".gauge_potenciometer");
        const botaoPressionadoCheck = document.querySelector('.button__pressed')

        if (botaoPressionado == 1) {

            botaoPressionadoCheck.innerHTML = 'ON'
            botaoPressionadoCheck.style.backgroundColor = 'green'
        }

        if (botaoPressionado == 0) {

            botaoPressionadoCheck.innerHTML = 'OFF'
            botaoPressionadoCheck.style.backgroundColor = 'red'
        }

        const setGaugePotenciometer = (gauge, value) => {

            if (value < 0 || value > 1)

                return;

            gauge.querySelector(".gauge_potenciometer__fill").style.transform = `rotate(${valPotenciometro / 2048}turn)`;
            gauge.querySelector(".gauge_potenciometer__cover").innerHTML = valPotenciometro;
        }

        setGaugePotenciometer(gaugePotenciometro, 1);

    } catch (error) {

        console.log(error)
    }
}

const recebeLeituraLenta = async () => {

    try {

        const urlDadosLentos = ''

        const respostaDadosLentos = await fetch(urlDadosLentos)
        const dadosLentos = await respostaDadosLentos.json()

        mostraDadosLentos(dadosLentos)

    } catch (error) {

        console.log(error)
    }

    finally {

        setTimeout(recebeLeituraLenta, 2000)
    }
}

recebeLeituraLenta()

const mostraDadosLentos = async (dados) => {

    try {

        const temperatura = dados.mcu_data.dht11_temperature
        const umidade = dados.mcu_data.dht11_humidity

        const gaugeTemperatura = document.querySelector(".gauge_temperature");
        const gaugeUmidade = document.querySelector(".gauge_humidity");

        const setGaugeTemperature = (gauge, value) => {

            if (value < 0 || value > 1)

                return;

            gauge.querySelector(".gauge_temperature__fill").style.transform = `rotate(${temperatura / 100}turn)`;

            if (temperatura === "nan")

                gauge.querySelector(".gauge_temperature__cover").innerHTML = '-';

            gauge.querySelector(".gauge_temperature__cover").innerHTML = `${temperatura} °C`;
        }

        setGaugeTemperature(gaugeTemperatura, 1)

        const setGaugeHumidity = (gauge, value) => {

            if (value < 0 || value > 1)

                return;

            gauge.querySelector(".gauge_humidity__fill").style.transform = `rotate(${umidade / 180}turn)`;

            if (umidade === 2147483647)

                gauge.querySelector(".gauge_humidity__cover").innerHTML = "-";

            gauge.querySelector(".gauge_humidity__cover").innerHTML = `${umidade} %`;
        }

        setGaugeHumidity(gaugeUmidade, 1)

    } catch (error) {

        console.log(error)
    }
}
