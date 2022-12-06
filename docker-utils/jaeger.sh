# docker pull jaegertracing/all-in-one:1.39

docker run --rm -p5775:5775/udp -p6831:6831/udp -p6832:6832/udp -p5778:5778/tcp jaegertracing/jaeger-agent:1.30 --reporter.grpc.host-port=collector.aspecto.io:14250 --reporter.grpc.tls.enabled=true --agent.tags=aspecto.token=b14a1453-ba63-4703-a55f-99c265fd5042
