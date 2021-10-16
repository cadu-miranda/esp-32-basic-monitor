# ESP32 Basic Monitor (v.0.1.10.15@alpha)

## A very first approach to control ESP-32 remotely

With this project, you can perform:

- Digital Read / Write -> Light up an LED or read the state of a button;
- Analog Read / PWM Output -> Read a potenciometer/trimpot value or mudule n LED pulse width;
- Sensor Read (DHT11, BMP280, LDR and much more).

### To run the API / ESP-32 code, open a new PlatformIO CLI in the project root folder and type:

```bash
> cd backend && pio run --target upload
```

### To run the Webpage and monitor your ESP-32, install the "Live Server" extension for VSCode, go to (frontend > src > index.html) and click the "Go Live" button in the bottom right corner (A webpage should be opened in few seconds and it will acess the ESP-32 Webserver).

### Routes

ESP32 server output has two main routes - one for fast (up to 1s) requests and other for slow (more than 1s) requests.

1. {esp32_ip}/slow_data_readings (For slow data readings)
2. {esp32_ip}/fast_data_readings (For fast data readings)

- MCU: ESP32 Dev Module
