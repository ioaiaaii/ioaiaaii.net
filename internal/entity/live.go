package entity

type LivePerformance struct {
	Title      string  `json:"title"`
	Date       string  `json:"date"`
	EventLink  *string `json:"event_link,omitempty"`
	ListenLink *string `json:"listen_link,omitempty"`
}

type LivePerformances struct {
	Items []LivePerformance `json:"performances"`
}
