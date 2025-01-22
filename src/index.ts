import bunyan from "bunyan";

var log = bunyan.createLogger({
  name: "poc-logger",
  streams: [
    {
      level: "debug",
      stream: process.stdout
    },
    {
      level: "info",
      path: "./poc-logger.log"
    }
  ]
});

const severities = [
  { severity: "DEFAULT", message: "Default" },
  { severity: "DEBUG", message: "Debug" },
  { severity: "INFO", message: "Info" },
  { severity: "NOTICE", message: "Notice" },
  { severity: "WARNING", message: "Warning" },
  { severity: "ERROR", message: "ERROR" },
  { severity: "CRITICAL", message: "CRITICAL" },
  { severity: "ALERT", message: "ALERT" },
  { severity: "EMERGENCY", message: "EMERGENCY" }
];

function logMessage() {
  const randomSeverity = Math.random();
  let selectedSeverity;

  if (randomSeverity < 0.5) {
    selectedSeverity = severities[0]; // Debug
  } else if (randomSeverity < 0.7) {
    selectedSeverity = severities[1]; // Info
  } else if (randomSeverity < 0.8) {
    selectedSeverity = severities[2]; // Notice
  } else if (randomSeverity < 0.9) {
    selectedSeverity = severities[3]; // Warning
  } else if (randomSeverity < 0.95) {
    selectedSeverity = severities[4]; // ERROR
  } else if (randomSeverity < 0.98) {
    selectedSeverity = severities[5]; // CRITICAL
  } else if (randomSeverity < 0.995) {
    selectedSeverity = severities[6]; // ALERT
  } else {
    selectedSeverity = severities[7]; // EMERGENCY
  }

  log[selectedSeverity.severity >= 400 ? 'error' : 'info']({ severity: selectedSeverity.severity }, selectedSeverity.message);

  // Call logMessage again after a random interval between 2 and 5 seconds
  const randomInterval = Math.random() * (1000 - 500) + 2000;
  setTimeout(logMessage, randomInterval);
}

// Start the logging process
logMessage();

