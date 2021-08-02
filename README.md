# ESP32 Basic Monitor (v.0.1.8.2@alpha)

## A very first approach to help people control their MCU remotely.

With this project, you can perform:

- Digital Read / Write -> Light up an LED or read the state of a button;
- Analog Read / PWM Output -> Read a potenciometer/trimpot value or mudule an LED pulse width;
- Sensor Read (DHT11, BMP280, LDR and much more).

### To run the API / ESP-32 code, open a new PlatformIO CLI in the project root folder and type:

```bash
> cd backend && pio run --target upload
```

### To run the Webpage and monitor your ESP-32, install the "Live Server" extension for VSCode, go to (frontend > src > index.html) and click the "Go Live" button in the bottom right corner (A webpage should be opened in few seconds and it will acess the ESP-32 Webserver).

### Routes

ESP32 server output has two main routes - one for fast (up to 1s) requests and other for slow (between 1s and 5s) requests.

1. {esp32_ip}/slow_data_readings (For slow readings)
2. {esp32_ip}/fast_data_readings (For fast readings)

- MCU: DOIT ESP32 DEVKIT V1
