/*
  ESP-32 Basic Monitor

  Sends:

  * DHT11 temperature and humidity data (connected to #PIN_5);
  * Potenciometer data (connected to #PIN_A0);
  * Button state (connected to #PIN_4) to Web Server.

  -> OBS: Data is sent using JSON format.
*/

#include <DHT.h>
#include <ESP8266WebServer.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>

#define DHT_PIN 5
#define DHT_TYPE DHT11

const char *ssid = "";     // your local network name
const char *password = ""; // your network password

char buffer[200];

const byte BUTTON = 4, POTENCIOMETER = A0;

ESP8266WebServer server(80); // creates a web server in port 80
DHT dht(DHT_PIN, DHT_TYPE);

// Function prototypes

void handleFastDataReadings(void);
void handleSlowDataReadings(void);
void addCustomHeaders(void);

void setup(void) {

  Serial.begin(115200);

  pinMode(BUTTON, INPUT_PULLUP);

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

void loop(void) { server.handleClient(); }

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
