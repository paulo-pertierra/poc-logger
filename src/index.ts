import bunyan from "bunyan";

export const log = bunyan.createLogger({
  name: "poc-logger",
  streams: [
    {
      level: "trace",
      stream: {
        writable: true,
        write: (log: any) => {
          const logObject = JSON.parse(log);
          // logObject.message = logObject.msg;
          // logObject.msg = undefined;

          const severities: Record<number, string> = {
            10: "trace",
            20: "debug",
            30: "info",
            40: "warn",
            50: "error",
            60: "fatal",
          };
          
          if (logObject.level >= 50) {
            logObject.level = severities[logObject.level] || logObject.level;
            process.stderr.write(JSON.stringify(logObject) + '\n');
          }
          else {
            logObject.level = severities[logObject.level] || logObject.level;
            process.stdout.write(JSON.stringify(logObject) + '\n');
          }
        }
      },
    }
  ]
});

const severities = [
  { severity: "TRACE", message: "Trace" },
  { severity: "DEBUG", message: "Debug" },
  { severity: "INFO", message: "Info" },
  { severity: "WARNING", message: "Warning" },
  { severity: "ERROR", message: "Error" },
  { severity: "FATAL", message: "Fatal" }
];

function logMessage() {
  const randomSeverity = Math.random();
  let selectedSeverity;

  if (randomSeverity < 0.2) {
    selectedSeverity = severities[0]; // Trace
    log.trace("Database processed 14 records.")
  } else if (randomSeverity < 0.4) {
    selectedSeverity = severities[1]; // Debug
    log.debug("14 records processed valid, 0 records processed invalid.")
  } else if (randomSeverity < 0.6) {
    selectedSeverity = severities[2]; // Info
    log.info("Initiating scheduled job: clean up cache")
  } else if (randomSeverity < 0.8) {
    selectedSeverity = severities[3]; // Warning
    log.warn("17 records were not processed in 15 minutes.")
  } else if (randomSeverity < 0.9) {
    selectedSeverity = severities[4]; // Error
    log.error("1 record not processed due to errors on request payload.")
  } else {
    selectedSeverity = severities[5]; // Fatal
    log.fatal("Database connection dropped.")
    // Call logMessage again after a random interval between 2 and 5 seconds
  }

  const randomInterval = Math.random() * (1000 - 500) + 2000;
  setTimeout(logMessage, randomInterval);
}
// Start the logging process
logMessage();

