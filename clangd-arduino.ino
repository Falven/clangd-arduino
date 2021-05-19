#include <Arduino.h>

#include <string>

const static auto kBaudRate = 9600U;

void setup() {
  Serial.begin(kBaudRate);
  while (!Serial) {
  }
  
  std::string testing("Testing... ");
}

void loop() {}
