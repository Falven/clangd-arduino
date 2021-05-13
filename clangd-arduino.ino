#include <type_traits>

using CD = typename std::conditional<true, int, double>::type;

void setup() {}

void loop() {}
