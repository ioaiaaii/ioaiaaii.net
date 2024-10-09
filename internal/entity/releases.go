package entity

type Release struct {
	Title          string   `json:"title"`
	Artist         string   `json:"artist"`
	ReleaseDate    string   `json:"releaseDate"`
	Label          string   `json:"label"`
	Image          []string `json:"image,omitempty"`
	DiscogsLink    string   `json:"discogs_link"`
	BandcampLink   string   `json:"bandcamp_link,omitempty"`
	SoundCloudLink string   `json:"soundcloud_link,omitempty"`
	Description    string   `json:"description"`
}

type Releases struct {
	Items []Release `json:"releases"`
}
