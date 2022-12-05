/* tracing.js */
const {
  KafkaJsInstrumentation,
} = require("opentelemetry-instrumentation-kafkajs");

const {
  DatadogSpanProcessor,
  DatadogExporter,
  DatadogProbabilitySampler,
  DatadogPropagator,
} = require("opentelemetry-exporter-datadog");

const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
// Require dependencies
const opentelemetry = require("@opentelemetry/sdk-node");

const tracerProvider = new NodeTracerProvider({
  // be sure to disable old plugin
  plugins: {
    kafkajs: { enabled: false, path: "opentelemetry-plugin-kafkajs" },
  },
});

const sdk = new opentelemetry.NodeSDK({
  tracerProvider,
  traceExporter: new opentelemetry.tracing.ConsoleSpanExporter(),
  instrumentations: [
    new KafkaJsInstrumentation({
      // see kafkajs instrumentation docs for available configuration
    }),
  ],
});

/**
 * dataDogTracing - Datadog tracing configuration
 * @param {string} serviceName - The name of the service
 * @param {string} agentUrl - The url of the agent
 * @param {string} tags - The tags to be added to the spans
 * @param {string} env - The environment of the service
 * @param {string} version - The version of the service
 * @returns {object} - The datadog exporter
 */

const exporterOptions = {
  serviceName: "user-v1", // optional
  agentUrl: "http://localhost:8126", // optional
  tags: "example_key:example_value,example_key_two:value_two", // optional
  env: "develop", // optional
  version: "1.0", // optional
};

const exporter = new DatadogExporter(exporterOptions);
const processor = new DatadogSpanProcessor(exporter);
tracerProvider.addSpanProcessor(processor);
tracerProvider.register({
  propagator: new DatadogPropagator(),
  sampler: new DatadogProbabilitySampler(1),
});

sdk.start();
