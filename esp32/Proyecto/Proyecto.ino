#include <SPI.h>
#include <Adafruit_GFX.h>
#include <Adafruit_PCD8544.h>
#include <driver/i2s.h>
#include <FreeRTOS.h>
#include <task.h> 
// Conexiones al INMP441
#define I2S_WS 2
#define I2S_SD 5
#define I2S_SCK 4
// Uso del procesador 0 I2S
#define I2S_PORT I2S_NUM_0

#define bufferLen 64
#define MaxWords  84
int16_t sBuffer[bufferLen];

/* Declare LCD object for SPI
 Adafruit_PCD8544(CLK, DIN, D/C, CE, RST); */
Adafruit_PCD8544 display = Adafruit_PCD8544(13, 12, 14, 27, 26);

int contrastValue = 57; // Default Contrast Value
const int adcPin = 26;
int adcValue = 0;

// Declaration and initialization of the input pin
int Analog_Eingang = 15; // X-axis-signal
//int Digital_Eingang = 3; // Button

float Analog;

void i2s_install() {
  // Configuración del I2S
  const i2s_config_t i2s_config = {
    .mode = i2s_mode_t(I2S_MODE_MASTER | I2S_MODE_RX),
    .sample_rate = 44100,
    .bits_per_sample = i2s_bits_per_sample_t(16),
    .channel_format = I2S_CHANNEL_FMT_ONLY_LEFT,
    .communication_format = i2s_comm_format_t(I2S_COMM_FORMAT_I2S | I2S_COMM_FORMAT_I2S_MSB),
    .intr_alloc_flags = 0,
    .dma_buf_count = 8,
    .dma_buf_len = bufferLen,
    .use_apll = false
  };

  i2s_driver_install(I2S_PORT, &i2s_config, 0, NULL);
}

void i2s_setpin() {
  // Configuración de los pines I2S
  const i2s_pin_config_t pin_config = {
    .bck_io_num = I2S_SCK,
    .ws_io_num = I2S_WS,
    .data_out_num = -1,
    .data_in_num = I2S_SD
  };

  i2s_set_pin(I2S_PORT, &pin_config);
}

void setup()
{
  /* Initialize the Display*/
  display.begin();

  /* Change the contrast using the following API*/
  display.setContrast(contrastValue);
  
  displayText();

  /* Microphone */
  pinMode (Analog_Eingang, INPUT);
  Serial.begin (115200);
  delay(1000);    
}

void loop()
{
  //adcValue = analogRead(adcPin);
  //contrastValue = map(adcValue, 0, 4095, 0, 100);
  //setContrast();
  displayText();
  
}

void setContrast()
{
  display.setContrast(contrastValue);
  display.display();
}

void displayText(char * Buffer)
{
  display.clearDisplay();
  display.setTextColor(BLACK, WHITE);
  display.setCursor(0,1);
  display.setTextSize(1);
  display.print("Hola Lupita como te ha ido este dia, a sido muy bueno pero necesitamos que ver que pasa con el buffer");
  display.display();
}