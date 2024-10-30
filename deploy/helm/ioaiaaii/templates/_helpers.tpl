{{/*
Return the proper Docker Image Registry Secret Names
*/}}
{{- define "ioaiaaii.imagePullSecrets" -}}
{{- include "common.images.renderPullSecrets" (dict "images" (list .Values.web.image) "context" $) -}}
{{- end -}}
