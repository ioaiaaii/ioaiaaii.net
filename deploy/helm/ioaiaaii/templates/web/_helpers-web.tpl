
{{- define "ioaiaaii.web.image" -}}
{{- include "common.images.image" ( dict "imageRoot" .Values.web.image "global" .Values.global "chart" .Chart ) -}}
{{- end -}}

{{/* Name suffixed with api */}}
{{- define "ioaiaaii.web.name" -}}
{{- printf "%s-api" (include "common.names.fullname" .) -}}
{{- end -}}
