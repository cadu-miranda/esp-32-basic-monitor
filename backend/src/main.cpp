/*
  ESP-32 Basic Monitor

  Sends:

  * DHT11 temperature and humidity data (connected to #PIN_5);
  * Potenciometer data (connected to #PIN_A0);
  * Button state (connected to #PIN_4) to Web Server.

  -> OBS: Data is sent using JSON format.
*/

#include <Adafruit_Sensor.h>
#include <ArduinoJson.h>
#include <DHT.h>
#include <HTTPClient.h>
#include <WebServer.h>
#include <WiFi.h>

#define DHT_PIN 15
#define DHT_TYPE DHT11

const char *ssid = "";     // your local network name
const char *password = ""; // your network password

char buffer[512];

const byte BUTTON = 4, LED = 23, POTENCIOMETER = A0;
unsigned long previousMillis = 0;
const long interval = 1000;

WebServer server(80); // creates a web server in port 80
DHT dht(DHT_PIN, DHT_TYPE);

// Function prototypes

void handleReadCommandFromServer(void);
void handleFastDataReading(void);
void handleSlowDataReading(void);
void addCustomHeaders(void);

void setup(void) {

  Serial.begin(115200);

  pinMode(BUTTON, INPUT_PULLUP);
  pinMode(LED, OUTPUT);

  dht.begin();

  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {

    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  server.on(
      "/fast_data_readings", // URL: [http://{esp-32_adress}/fast_data_readings]
      handleFastDataReading); // Requests up to 1s

  server.on(
      "/slow_data_readings", // URL: [http://{esp-32_adress}/slow_data_readings]
      handleSlowDataReading); // Requests between 1s - 5s

  server.begin();
}

void loop(void) {

  handleReadCommandFromServer();
  server.handleClient();
}

void handleFastDataReading(void) {

  bool buttonPressed = !digitalRead(BUTTON);
  String buttonPressedCheck = buttonPressed ? "true" : "false";
  int potenciometerReading = analogRead(POTENCIOMETER);

  sprintf(
      buffer,
      "{ \"mcu_data\": {\"button_pressed\": %s, \"potenciometer_value\": %d}}",
      buttonPressedCheck, potenciometerReading);

  addCustomHeaders();
  server.send(200, "application/json; charset=utf-8", buffer);
}

void handleSlowDataReading(void) {

  float temperature = dht.readTemperature();
  int humidity = dht.readHumidity();

  sprintf(
      buffer,
      "{ \"mcu_data\": {\"dht11_temperature\": %.2f, \"dht11_humidity\": %d}}",
      temperature, humidity);

  addCustomHeaders();
  server.send(200, "application/json; charset=utf-8", buffer);
}

void addCustomHeaders(void) {

  server.sendHeader("Access-Control-Allow-Methods", "GET");
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.sendHeader("Connection", "close");
}

void handleReadCommandFromServer(void) {

  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {

    previousMillis = currentMillis;

    HTTPClient http;

    http.begin("");

    int httpCode = http.GET();

    if (httpCode > 0) {

      String payload = http.getString();

      Serial.println(httpCode);

      Serial.println(payload);

      char json[512];

      payload.replace(" ", "");
      payload.replace("\n", "");
      payload.trim();
      payload.remove(0, 1);
      payload.toCharArray(json, 512);

      StaticJsonDocument<200> doc;
      deserializeJson(doc, json);

      bool led_state = doc["led_state"];
      int pwm_value = doc["pwm_value"];

      Serial.println(String(led_state) + " - " + String(pwm_value) + "\n");

      led_state ? digitalWrite(LED, 1) : digitalWrite(LED, 0);
    }

    else

      Serial.println("Error on HTTP request.");

    http.end();
  }
}
