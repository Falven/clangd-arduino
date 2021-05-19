#include <Arduino.h>

#include <vector>

const static auto kBaudRate = 9600U;

void setup() {
  Serial.begin(kBaudRate);
  while (!Serial) {
  }
}

void loop() {}
