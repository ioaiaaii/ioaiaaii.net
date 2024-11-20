{{/*
Return the proper Docker Image Registry Secret Names
*/}}
{{- define "ioaiaaii.imagePullSecrets" -}}
{{- include "common.images.renderPullSecrets" (dict "images" (list .Values.web.image) "context" $) -}}
{{- end -}}


{{/*
Return a list of telemetry environment variables based on .Values.telemetry settings
*/}}
{{- define "ioaiaaii.telemetry.env" -}}
{{- if .Values.telemetry.enabled -}}
- name: OTEL_ENABLED
  value: "true"
{{- include "common.tplvalues.render" (dict "value" .Values.telemetry.otelEnvVars "context" $) | nindent 0 -}}
{{- end -}}
{{- end -}}
