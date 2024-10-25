
{{- define "ioaiaaii.api.image" -}}
{{- include "common.images.image" ( dict "imageRoot" .Values.api.image "global" .Values.global "chart" .Chart ) -}}
{{- end -}}

{{/* Name suffixed with api */}}
{{- define "ioaiaaii.api.name" -}}
{{- printf "%s-api" (include "common.names.fullname" .) -}}
{{- end -}}
