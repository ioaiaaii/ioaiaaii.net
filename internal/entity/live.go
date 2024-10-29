package entity

// LivePerformance represents details about a single live performance.
// swagger:model LivePerformance
type LivePerformance struct {
	// Title of the performance
	// example: Quantum Concert
	Title string `json:"title"`

	// Date of the performance in YYYY-MM-DD format
	// example: 2024-11-15
	Date string `json:"date"`

	// URL link to the event or ticketing information
	// example: https://example.com/event
	EventLink *string `json:"event_link,omitempty"`

	// URL link to the performance recording or streaming
	// example: https://example.com/listen
	ListenLink *string `json:"listen_link,omitempty"`
}

// LivePerformances represents a collection of live performances.
// swagger:model LivePerformances
type LivePerformances struct {
	// List of live performances
	// example: [{"title": "Quantum Concert", "date": "2024-11-15", "event_link": "https://example.com/event", "listen_link": "https://example.com/listen"}]
	Items []LivePerformance `json:"performances"`
}
