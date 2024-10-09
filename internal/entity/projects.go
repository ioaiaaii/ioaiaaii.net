package entity

type WebsiteProjects struct {
	Items []WebsiteProjectEntry `json:"projects"`
}

type WebsiteProjectEntry struct {
	ProjectEntry
	Category string `json:"category"`
}
