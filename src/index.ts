import bunyan from "bunyan";

var log = bunyan.createLogger({
  name: "poc-logger",
  streams: [
    {
      level: "debug",
      stream: {
        writable: true,
        write: (log: any) => {
          const logObject = JSON.parse(log);
          logObject.message = logObject.msg;
          logObject.msg = undefined;
          return process.stdout.write(JSON.stringify(logObject) + '\n');
        }
      },
    },
    {
      level: "info",
      path: "./poc-logger.log",
      stream: {
        writable: true,
        write: (log: any) => {
          const logObject = JSON.parse(log);
          logObject.message = logObject.msg;
          logObject.msg = undefined;
          return process.stdout.write(JSON.stringify(logObject) + '\n');
        }
      },
    }
  ]
});

const severities = [
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

  if (randomSeverity < 0.2) {
    selectedSeverity = severities[0]; // Debug
  } else if (randomSeverity < 0.3) {
    selectedSeverity = severities[1]; // Info
  } else if (randomSeverity < 0.4) {
    selectedSeverity = severities[2]; // Notice
  } else if (randomSeverity < 0.5) {
    selectedSeverity = severities[3]; // Warning
  } else if (randomSeverity < 0.6) {
    selectedSeverity = severities[4]; // ERROR
  } else if (randomSeverity < 0.7) {
    selectedSeverity = severities[5]; // CRITICAL
  } else if (randomSeverity < 0.8) {
    selectedSeverity = severities[6]; // ALERT
  } else {
    selectedSeverity = severities[7]; // EMERGENCY
  }

  log['info']({ severity: selectedSeverity.severity }, selectedSeverity.message);

  // Call logMessage again after a random interval between 2 and 5 seconds
  const randomInterval = Math.random() * (1000 - 500) + 2000;
  setTimeout(logMessage, randomInterval);

  log.warn({ severity: "Any", customKey: "asdfasdf" }, "Message");
}

function bunyanWrapper() {
  function warn() {

  }
  function info() {

  }
  function error() {

  }
  return {
    warn,
    error,
    info
  }
}

bunyanWrapper().warn();

// Start the logging process
logMessage();

