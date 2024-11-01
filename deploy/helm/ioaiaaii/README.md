# ioaiaaii

![Version: 0.1.0](https://img.shields.io/badge/Version-0.1.0-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 1.0.0](https://img.shields.io/badge/AppVersion-1.0.0-informational?style=flat-square)

Chart for BFF of IOAIAAII.NET

**Homepage:** <https://ioaiaaii.net>

## Maintainers

| Name | Email | Url |
| ---- | ------ | --- |
| ioaiaaii |  | <https://github.com/ioaiaaii/ioaiaaii.net> |

## Source Code

* <https://github.com/ioaiaaii/ioaiaaii.net/tree/master/deploy>
* <https://github.com/ioaiaaii/ioaiaaii.net/tree/master/build/package>

## Requirements

| Repository | Name | Version |
|------------|------|---------|
| oci://registry-1.docker.io/bitnamicharts | common | 2.x.x |

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| commonAnnotations | object | `{}` |  |
| commonLabels | object | `{}` |  |
| diagnosticMode.args[0] | string | `"infinity"` |  |
| diagnosticMode.command[0] | string | `"sleep"` |  |
| diagnosticMode.enabled | bool | `false` |  |
| extraDeploy | list | `[]` |  |
| fullnameOverride | string | `""` |  |
| global.imageRegistry | string | `"europe-west3-docker.pkg.dev/micro-infra"` |  |
| ingress.annotations."cert-manager.io/cluster-issuer" | string | `"letsencrypt-cluster-issuer"` |  |
| ingress.enabled | bool | `true` |  |
| ingress.extraHosts | list | `[]` |  |
| ingress.extraPaths | list | `[]` |  |
| ingress.extraRules | list | `[]` |  |
| ingress.extraTls | list | `[]` |  |
| ingress.hostname | string | `"ioaiaaii.net"` |  |
| ingress.ingressClassName | string | `"nginx"` |  |
| ingress.path | string | `"/"` |  |
| ingress.pathType | string | `"ImplementationSpecific"` |  |
| ingress.secrets | list | `[]` |  |
| ingress.selfSigned | bool | `false` |  |
| ingress.tls[0].hosts[0] | string | `"ioaiaaii.net"` |  |
| ingress.tls[0].secretName | string | `"letsencrypt-cluster-cert-ioaiaaii"` |  |
| nameOverride | string | `""` |  |
| namespaceOverride | string | `""` |  |
| networkPolicy.addExternalClientAccess | bool | `true` |  |
| networkPolicy.allowExternal | bool | `true` |  |
| networkPolicy.allowExternalEgress | bool | `true` |  |
| networkPolicy.enabled | bool | `false` |  |
| networkPolicy.extraEgress | list | `[]` |  |
| networkPolicy.extraIngress | list | `[]` |  |
| networkPolicy.ingressNSMatchLabels | object | `{}` |  |
| networkPolicy.ingressNSPodMatchLabels | object | `{}` |  |
| networkPolicy.ingressPodMatchLabels | object | `{}` |  |
| web.affinity | object | `{}` |  |
| web.args | list | `[]` |  |
| web.automountServiceAccountToken | bool | `false` |  |
| web.autoscaling.hpa.enabled | bool | `true` |  |
| web.autoscaling.hpa.maxReplicas | int | `4` |  |
| web.autoscaling.hpa.minReplicas | int | `1` |  |
| web.autoscaling.hpa.targetCPU | int | `70` |  |
| web.autoscaling.hpa.targetMemory | int | `70` |  |
| web.command | list | `[]` |  |
| web.containerPorts.http | int | `8080` |  |
| web.containerSecurityContext.allowPrivilegeEscalation | bool | `false` |  |
| web.containerSecurityContext.capabilities | string | `nil` |  |
| web.containerSecurityContext.enabled | bool | `true` |  |
| web.containerSecurityContext.privileged | bool | `false` |  |
| web.containerSecurityContext.readOnlyRootFilesystem | bool | `true` |  |
| web.containerSecurityContext.runAsGroup | int | `1001` |  |
| web.containerSecurityContext.runAsNonRoot | bool | `true` |  |
| web.containerSecurityContext.runAsUser | int | `1001` |  |
| web.containerSecurityContext.seLinuxOptions | object | `{}` |  |
| web.containerSecurityContext.seccompProfile.type | string | `"RuntimeDefault"` |  |
| web.deploymentAnnotations | object | `{}` |  |
| web.existingConfigmap | string | `nil` |  |
| web.hostAliases | list | `[]` |  |
| web.image.debug | bool | `false` |  |
| web.image.pullPolicy | string | `"IfNotPresent"` |  |
| web.image.repository | string | `"micro-repo/ioaiaaii"` |  |
| web.image.tag | string | `nil` |  |
| web.livenessProbe.enabled | bool | `true` |  |
| web.livenessProbe.failureThreshold | int | `6` |  |
| web.livenessProbe.httpGet.path | string | `"/healthz/liveness"` |  |
| web.livenessProbe.httpGet.port | string | `"http"` |  |
| web.livenessProbe.initialDelaySeconds | int | `180` |  |
| web.livenessProbe.periodSeconds | int | `20` |  |
| web.livenessProbe.successThreshold | int | `1` |  |
| web.livenessProbe.timeoutSeconds | int | `5` |  |
| web.metrics.enabled | bool | `false` | Enable the export of Prometheus metrics |
| web.metrics.serviceMonitor.annotations | object | `{}` | Additional custom annotations for the ServiceMonitor |
| web.metrics.serviceMonitor.enabled | bool | `false` | if `true`, creates a Prometheus Operator ServiceMonitor (also requires `metrics.enabled` to be `true`) |
| web.metrics.serviceMonitor.honorLabels | bool | `false` | honorLabels chooses the metric's labels on collisions with target labels |
| web.metrics.serviceMonitor.interval | string | `""` | Interval at which metrics should be scraped. # ref: https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md#endpoint |
| web.metrics.serviceMonitor.jobLabel | string | `""` | The name of the label on the target service to use as the job name in Prometheus |
| web.metrics.serviceMonitor.labels | object | `{}` | Extra labels for the ServiceMonitor |
| web.metrics.serviceMonitor.metricRelabelings | list | `[]` | Specify additional relabeling of metrics |
| web.metrics.serviceMonitor.namespace | string | `""` | Namespace in which Prometheus is running |
| web.metrics.serviceMonitor.relabelings | list | `[]` | Specify general relabeling |
| web.metrics.serviceMonitor.scrapeTimeout | string | `""` | Timeout after which the scrape is ended # ref: https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md#endpoint |
| web.metrics.serviceMonitor.selector | object | `{}` | Prometheus instance selector labels # ref: https://github.com/bitnami/charts/tree/main/bitnami/prometheus-operator#prometheus-configuration |
| web.nodeAffinityPreset | object | `{}` |  |
| web.nodeSelector | object | `{}` |  |
| web.pdb.create | bool | `false` |  |
| web.pdb.maxUnavailable | int | `1` |  |
| web.pdb.minAvailable | int | `2` |  |
| web.podAffinityPreset | string | `""` |  |
| web.podAnnotations | object | `{}` |  |
| web.podAntiAffinityPreset | string | `"soft"` |  |
| web.podLabels | object | `{}` |  |
| web.podManagementPolicy | string | `"OrderedReady"` |  |
| web.podSecurityContext.enabled | bool | `true` |  |
| web.podSecurityContext.fsGroup | int | `1001` |  |
| web.podSecurityContext.fsGroupChangePolicy | string | `"Always"` |  |
| web.podSecurityContext.supplementalGroups | list | `[]` |  |
| web.podSecurityContext.sysctls | list | `[]` |  |
| web.priorityClassName | string | `""` |  |
| web.readinessProbe.enabled | bool | `true` |  |
| web.readinessProbe.failureThreshold | int | `6` |  |
| web.readinessProbe.httpGet.path | string | `"/healthz/readiness"` |  |
| web.readinessProbe.httpGet.port | string | `"http"` |  |
| web.readinessProbe.initialDelaySeconds | int | `30` |  |
| web.readinessProbe.periodSeconds | int | `10` |  |
| web.readinessProbe.successThreshold | int | `1` |  |
| web.readinessProbe.timeoutSeconds | int | `5` |  |
| web.replicaCount | int | `1` |  |
| web.resources | object | `{}` |  |
| web.resourcesPreset | string | `"nano"` |  |
| web.service.ports.http | int | `80` |  |
| web.service.ports.https | int | `443` |  |
| web.service.type | string | `"ClusterIP"` |  |
| web.startupProbe.enabled | bool | `false` |  |
| web.tolerations | list | `[]` |  |
| web.topologySpreadConstraints | list | `[]` |  |
| web.updateStrategy.type | string | `"RollingUpdate"` |  |

----------------------------------------------
Autogenerated from chart metadata using [helm-docs v1.14.2](https://github.com/norwoodj/helm-docs/releases/v1.14.2)
