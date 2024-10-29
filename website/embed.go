package website

import (
	"embed"
)

//go:embed dist
var embedUI embed.FS

// EmbedAdmin is ...
func EmbedUI() embed.FS {
	return embedUI
}
