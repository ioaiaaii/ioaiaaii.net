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
| api.affinity | object | `{}` |  |
| api.args | list | `[]` |  |
| api.automountServiceAccountToken | bool | `false` |  |
| api.autoscaling.hpa.enabled | bool | `true` |  |
| api.autoscaling.hpa.maxReplicas | int | `4` |  |
| api.autoscaling.hpa.minReplicas | int | `1` |  |
| api.autoscaling.hpa.targetCPU | int | `70` |  |
| api.autoscaling.hpa.targetMemory | int | `70` |  |
| api.command | list | `[]` |  |
| api.containerPorts.http | int | `8080` |  |
| api.containerSecurityContext.allowPrivilegeEscalation | bool | `false` |  |
| api.containerSecurityContext.capabilities | string | `nil` |  |
| api.containerSecurityContext.enabled | bool | `true` |  |
| api.containerSecurityContext.privileged | bool | `false` |  |
| api.containerSecurityContext.readOnlyRootFilesystem | bool | `true` |  |
| api.containerSecurityContext.runAsGroup | int | `1001` |  |
| api.containerSecurityContext.runAsNonRoot | bool | `true` |  |
| api.containerSecurityContext.runAsUser | int | `1001` |  |
| api.containerSecurityContext.seLinuxOptions | object | `{}` |  |
| api.containerSecurityContext.seccompProfile.type | string | `"RuntimeDefault"` |  |
| api.customLivenessProbe | object | `{}` |  |
| api.customReadinessProbe | object | `{}` |  |
| api.customStartupProbe | object | `{}` |  |
| api.deploymentAnnotations | object | `{}` |  |
| api.existingConfigmap | string | `nil` |  |
| api.extraEnvVars | list | `[]` |  |
| api.hostAliases | list | `[]` |  |
| api.image.debug | bool | `false` |  |
| api.image.pullPolicy | string | `"IfNotPresent"` |  |
| api.image.repository | string | `"micro-repo/api"` |  |
| api.image.tag | string | `nil` |  |
| api.lifecycleHooks | object | `{}` |  |
| api.livenessProbe.enabled | bool | `true` |  |
| api.livenessProbe.failureThreshold | string | `"bar"` |  |
| api.livenessProbe.initialDelaySeconds | string | `"foo"` |  |
| api.livenessProbe.periodSeconds | string | `"bar"` |  |
| api.livenessProbe.successThreshold | string | `"foo"` |  |
| api.livenessProbe.timeoutSeconds | string | `"foo"` |  |
| api.metrics.enabled | bool | `false` |  |
| api.metrics.serviceMonitor.annotations | object | `{}` |  |
| api.metrics.serviceMonitor.enabled | bool | `false` |  |
| api.metrics.serviceMonitor.honorLabels | bool | `false` |  |
| api.metrics.serviceMonitor.interval | string | `""` |  |
| api.metrics.serviceMonitor.jobLabel | string | `""` |  |
| api.metrics.serviceMonitor.labels | object | `{}` |  |
| api.metrics.serviceMonitor.metricRelabelings | list | `[]` |  |
| api.metrics.serviceMonitor.namespace | string | `""` |  |
| api.metrics.serviceMonitor.relabelings | list | `[]` |  |
| api.metrics.serviceMonitor.scrapeTimeout | string | `""` |  |
| api.metrics.serviceMonitor.selector | object | `{}` |  |
| api.nodeAffinityPreset.key | string | `""` |  |
| api.nodeAffinityPreset.type | string | `"hard"` |  |
| api.nodeAffinityPreset.values | list | `[]` |  |
| api.nodeSelector | object | `{}` |  |
| api.pdb.create | bool | `true` |  |
| api.pdb.maxUnavailable | int | `1` |  |
| api.pdb.minAvailable | int | `2` |  |
| api.podAffinityPreset | string | `""` |  |
| api.podAnnotations | object | `{}` |  |
| api.podAntiAffinityPreset | string | `"soft"` |  |
| api.podLabels | object | `{}` |  |
| api.podManagementPolicy | string | `"OrderedReady"` |  |
| api.podSecurityContext.enabled | bool | `true` |  |
| api.podSecurityContext.fsGroup | int | `1001` |  |
| api.podSecurityContext.fsGroupChangePolicy | string | `"Always"` |  |
| api.podSecurityContext.supplementalGroups | list | `[]` |  |
| api.podSecurityContext.sysctls | list | `[]` |  |
| api.priorityClassName | string | `""` |  |
| api.readinessProbe.enabled | bool | `true` |  |
| api.readinessProbe.failureThreshold | string | `"bar"` |  |
| api.readinessProbe.initialDelaySeconds | string | `"foo"` |  |
| api.readinessProbe.periodSeconds | string | `"bar"` |  |
| api.readinessProbe.successThreshold | string | `"foo"` |  |
| api.readinessProbe.timeoutSeconds | string | `"foo"` |  |
| api.replicaCount | int | `1` |  |
| api.resources | object | `{}` |  |
| api.resourcesPreset | string | `"nano"` |  |
| api.service.annotations | object | `{}` |  |
| api.service.clusterIP | string | `""` |  |
| api.service.externalTrafficPolicy | string | `"Cluster"` |  |
| api.service.extraPorts | list | `[]` |  |
| api.service.loadBalancerIP | string | `""` |  |
| api.service.loadBalancerSourceRanges | list | `[]` |  |
| api.service.nodePorts.http | string | `""` |  |
| api.service.nodePorts.https | string | `""` |  |
| api.service.ports.http | int | `80` |  |
| api.service.ports.https | int | `443` |  |
| api.service.sessionAffinity | string | `"None"` |  |
| api.service.sessionAffinityConfig | object | `{}` |  |
| api.service.type | string | `"LoadBalancer"` |  |
| api.startupProbe.enabled | bool | `false` |  |
| api.startupProbe.failureThreshold | string | `"bar"` |  |
| api.startupProbe.initialDelaySeconds | string | `"foo"` |  |
| api.startupProbe.periodSeconds | string | `"bar"` |  |
| api.startupProbe.successThreshold | string | `"foo"` |  |
| api.startupProbe.timeoutSeconds | string | `"foo"` |  |
| api.terminationGracePeriodSeconds | string | `""` |  |
| api.tolerations | list | `[]` |  |
| api.topologySpreadConstraints | list | `[]` |  |
| api.updateStrategy.type | string | `"RollingUpdate"` |  |
| clusterDomain | string | `"cluster.local"` |  |
| commonAnnotations | object | `{}` |  |
| commonLabels | object | `{}` |  |
| diagnosticMode.args[0] | string | `"infinity"` |  |
| diagnosticMode.command[0] | string | `"sleep"` |  |
| diagnosticMode.enabled | bool | `false` |  |
| extraDeploy | list | `[]` |  |
| frontend.affinity | object | `{}` |  |
| frontend.args | list | `[]` |  |
| frontend.automountServiceAccountToken | bool | `false` |  |
| frontend.autoscaling.hpa.enabled | bool | `true` |  |
| frontend.autoscaling.hpa.maxReplicas | int | `4` |  |
| frontend.autoscaling.hpa.minReplicas | int | `1` |  |
| frontend.autoscaling.hpa.targetCPU | int | `70` |  |
| frontend.autoscaling.hpa.targetMemory | int | `70` |  |
| frontend.command | list | `[]` |  |
| frontend.containerPorts.http | int | `8080` |  |
| frontend.containerSecurityContext.allowPrivilegeEscalation | bool | `false` |  |
| frontend.containerSecurityContext.capabilities | string | `nil` |  |
| frontend.containerSecurityContext.enabled | bool | `true` |  |
| frontend.containerSecurityContext.privileged | bool | `false` |  |
| frontend.containerSecurityContext.readOnlyRootFilesystem | bool | `true` |  |
| frontend.containerSecurityContext.runAsGroup | int | `1001` |  |
| frontend.containerSecurityContext.runAsNonRoot | bool | `true` |  |
| frontend.containerSecurityContext.runAsUser | int | `1001` |  |
| frontend.containerSecurityContext.seLinuxOptions | object | `{}` |  |
| frontend.containerSecurityContext.seccompProfile.type | string | `"RuntimeDefault"` |  |
| frontend.customLivenessProbe | object | `{}` |  |
| frontend.customReadinessProbe | object | `{}` |  |
| frontend.customStartupProbe | object | `{}` |  |
| frontend.deploymentAnnotations | object | `{}` |  |
| frontend.existingConfigmap | string | `nil` |  |
| frontend.extraEnvVars | list | `[]` |  |
| frontend.hostAliases | list | `[]` |  |
| frontend.image.debug | bool | `false` |  |
| frontend.image.pullPolicy | string | `"IfNotPresent"` |  |
| frontend.image.repository | string | `"micro-repo/frontend"` |  |
| frontend.image.tag | string | `nil` |  |
| frontend.lifecycleHooks | object | `{}` |  |
| frontend.livenessProbe.enabled | bool | `true` |  |
| frontend.livenessProbe.failureThreshold | string | `"bar"` |  |
| frontend.livenessProbe.initialDelaySeconds | string | `"foo"` |  |
| frontend.livenessProbe.periodSeconds | string | `"bar"` |  |
| frontend.livenessProbe.successThreshold | string | `"foo"` |  |
| frontend.livenessProbe.timeoutSeconds | string | `"foo"` |  |
| frontend.metrics.enabled | bool | `false` |  |
| frontend.metrics.serviceMonitor.annotations | object | `{}` |  |
| frontend.metrics.serviceMonitor.enabled | bool | `false` |  |
| frontend.metrics.serviceMonitor.honorLabels | bool | `false` |  |
| frontend.metrics.serviceMonitor.interval | string | `""` |  |
| frontend.metrics.serviceMonitor.jobLabel | string | `""` |  |
| frontend.metrics.serviceMonitor.labels | object | `{}` |  |
| frontend.metrics.serviceMonitor.metricRelabelings | list | `[]` |  |
| frontend.metrics.serviceMonitor.namespace | string | `""` |  |
| frontend.metrics.serviceMonitor.relabelings | list | `[]` |  |
| frontend.metrics.serviceMonitor.scrapeTimeout | string | `""` |  |
| frontend.metrics.serviceMonitor.selector | object | `{}` |  |
| frontend.nodeAffinityPreset.key | string | `""` |  |
| frontend.nodeAffinityPreset.type | string | `"hard"` |  |
| frontend.nodeAffinityPreset.values | list | `[]` |  |
| frontend.nodeSelector | object | `{}` |  |
| frontend.pdb.create | bool | `true` |  |
| frontend.pdb.maxUnavailable | int | `1` |  |
| frontend.pdb.minAvailable | int | `2` |  |
| frontend.podAffinityPreset | string | `""` |  |
| frontend.podAnnotations | object | `{}` |  |
| frontend.podAntiAffinityPreset | string | `"soft"` |  |
| frontend.podLabels | object | `{}` |  |
| frontend.podManagementPolicy | string | `"OrderedReady"` |  |
| frontend.podSecurityContext.enabled | bool | `true` |  |
| frontend.podSecurityContext.fsGroup | int | `1001` |  |
| frontend.podSecurityContext.fsGroupChangePolicy | string | `"Always"` |  |
| frontend.podSecurityContext.supplementalGroups | list | `[]` |  |
| frontend.podSecurityContext.sysctls | list | `[]` |  |
| frontend.priorityClassName | string | `""` |  |
| frontend.readinessProbe.enabled | bool | `true` |  |
| frontend.readinessProbe.failureThreshold | string | `"bar"` |  |
| frontend.readinessProbe.initialDelaySeconds | string | `"foo"` |  |
| frontend.readinessProbe.periodSeconds | string | `"bar"` |  |
| frontend.readinessProbe.successThreshold | string | `"foo"` |  |
| frontend.readinessProbe.timeoutSeconds | string | `"foo"` |  |
| frontend.replicaCount | int | `1` |  |
| frontend.resources | object | `{}` |  |
| frontend.resourcesPreset | string | `"nano"` |  |
| frontend.service.annotations | object | `{}` |  |
| frontend.service.clusterIP | string | `""` |  |
| frontend.service.externalTrafficPolicy | string | `"Cluster"` |  |
| frontend.service.extraPorts | list | `[]` |  |
| frontend.service.loadBalancerIP | string | `""` |  |
| frontend.service.loadBalancerSourceRanges | list | `[]` |  |
| frontend.service.nodePorts.http | string | `""` |  |
| frontend.service.nodePorts.https | string | `""` |  |
| frontend.service.ports.http | int | `80` |  |
| frontend.service.ports.https | int | `443` |  |
| frontend.service.sessionAffinity | string | `"None"` |  |
| frontend.service.sessionAffinityConfig | object | `{}` |  |
| frontend.service.type | string | `"LoadBalancer"` |  |
| frontend.startupProbe.enabled | bool | `false` |  |
| frontend.startupProbe.failureThreshold | string | `"bar"` |  |
| frontend.startupProbe.initialDelaySeconds | string | `"foo"` |  |
| frontend.startupProbe.periodSeconds | string | `"bar"` |  |
| frontend.startupProbe.successThreshold | string | `"foo"` |  |
| frontend.startupProbe.timeoutSeconds | string | `"foo"` |  |
| frontend.terminationGracePeriodSeconds | string | `""` |  |
| frontend.tolerations | list | `[]` |  |
| frontend.topologySpreadConstraints | list | `[]` |  |
| frontend.updateStrategy.type | string | `"RollingUpdate"` |  |
| fullnameOverride | string | `""` |  |
| global.compatibility.omitEmptySeLinuxOptions | bool | `false` |  |
| global.compatibility.openshift.adaptSecurityContext | string | `"auto"` |  |
| global.defaultStorageClass | string | `""` |  |
| global.imagePullSecrets | list | `[]` |  |
| global.imageRegistry | string | `"europe-west3-docker.pkg.dev/micro-infra"` |  |
| ingress.annotations | object | `{}` |  |
| ingress.apiVersion | string | `""` |  |
| ingress.enabled | bool | `false` |  |
| ingress.extraHosts | list | `[]` |  |
| ingress.extraPaths | list | `[]` |  |
| ingress.extraRules | list | `[]` |  |
| ingress.extraTls | list | `[]` |  |
| ingress.hostname | string | `"ioaiaaii.net"` |  |
| ingress.ingressClassName | string | `""` |  |
| ingress.path | string | `"/"` |  |
| ingress.pathType | string | `"ImplementationSpecific"` |  |
| ingress.secrets | list | `[]` |  |
| ingress.selfSigned | bool | `false` |  |
| ingress.tls | bool | `false` |  |
| kubeVersion | string | `""` |  |
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
