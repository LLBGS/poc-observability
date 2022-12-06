const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { Resource } = require("@opentelemetry/resources");
const {
  SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions");
const { SimpleSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const { CollectorTraceExporter } = require("@opentelemetry/exporter-collector");
const {
  KafkaJsInstrumentation,
} = require("opentelemetry-instrumentation-kafkajs");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const provider = new NodeTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "api-gateway-service", // service name is required
  }),
});

provider.register();
provider.addSpanProcessor(
  new SimpleSpanProcessor(
    new CollectorTraceExporter({
      url: "https://otelcol.aspecto.io/v1/trace",
      headers: {
        // Aspecto API-Key is required
        Authorization: "b14a1453-ba63-4703-a55f-99c265fd5042",
      },
    })
  )
);
registerInstrumentations({
  instrumentations: [
    getNodeAutoInstrumentations(),
    new KafkaJsInstrumentation({}),
  ],
});
