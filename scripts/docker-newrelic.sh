docker run \
-d \
--name newrelic-infra \
--network=host \
--cap-add=SYS_PTRACE \
--privileged \
--pid=host \
-v "/:/host:ro" \
-v "/var/run/docker.sock:/var/run/docker.sock" \
-e NRIA_LICENSE_KEY=31f05f8742f2ab6c461d4290d9e2d086FFFFNRAL \
newrelic/infrastructure:latest