{{- define "ioaiaaii.frontend.image" -}}
{{- include "common.images.image" ( dict "imageRoot" .Values.frontend.image "global" .Values.global "chart" .Chart ) -}}
{{- end -}}

{{/* Name suffixed with frontend */}}
{{- define "ioaiaaii.frontend.name" -}}
{{- printf "%s-frontend" (include "common.names.fullname" .) -}}
{{- end -}}
