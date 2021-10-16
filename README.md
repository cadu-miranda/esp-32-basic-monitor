# ESP32 Basic Monitor (v.0.2.10.16)

- PlatformIO VSCode extension is needed for this project to run.

## A very first approach to control ESP-32 remotely

With this project, you can perform:

- Digital Read / Write -> Light up an LED or read the state of a button;
- Analog Read / PWM Output -> Read a potenciometer/trimpot value or mudule n LED pulse width;
- Sensor Read (DHT11, BMP280, LDR and much more).

### To run the ESP-32 code, open a new PlatformIO CLI in the microcontroller folder and type:

```bash
> pio run --target upload
```

### To run the server, open a new terminal in the server folder and type:

```bash
> yarn && yarn start
```

### To run the Webpage and monitor/control your ESP-32, install the "Live Server" extension for VSCode, go to (frontend > src > index.html) and click the "Go Live" button in the bottom right corner (A webpage should be opened in few seconds and it will access the ESP-32 Basic Monitor page).

### Routes

ESP32 server output has two main routes - one for fast (up to 1s) requests and other for slow (more than 1s) requests.

1. {esp32_ip}/slow_data_readings (For slow data readings)
2. {esp32_ip}/fast_data_readings (For fast data readings)

- MCU: ESP32 Dev Module
