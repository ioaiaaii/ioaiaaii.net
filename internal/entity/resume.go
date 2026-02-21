package entity

// Resume represents a detailed professional profile.
// swagger:model
type Resume struct {
	// Full name of the individual
	// example: Ioannis Savvaidis
	Name string `json:"name"`

	// Job title or professional headline
	// example: Senior Site Reliability Engineer
	Title string `json:"title"`

	// Contact email address
	// example: ioannis@example.com
	Email string `json:"email"`

	// LinkedIn profile link
	// example: https://linkedin.com/in/ioannis
	EngineeringProfile string `json:"engineeringProfile"`

	// A short summary profile
	// example: Experienced SRE with a strong background in cloud infrastructure.
	Profile string `json:"profile"`

	// Bio for artistic background
	// example: Composer drawing on quantum and distributed computing principles.
	ArtistBio string `json:"artistBio"`

	// ArtistStatement for artistic background
	ArtisticApproach string `json:"artisticApproach"`

	// SelectedWorks for artistic background
	SelectedWorks []SelectedWorksEntry `json:"selectedWorks"`

	// SelectedWorks for artistic background
	Collaborations []CollaborationsEntry `json:"collaborations"`

	// Bio for engineering background
	// example: Infrastructure Engineer with a focus on scalable systems.
	EngineerBio string `json:"engineerBio"`
}

// SelectedWorksEntry represents a single entry in the SelectedWorks section.
// swagger:model
type SelectedWorksEntry struct {
	// Title of the project
	// example: Quantum Security Research
	Title string `json:"title"`

	// Link to the project or repository
	// example: https://github.com/ioaiaaii/quantum-security
	Link string `json:"link"`
}

// CollaborationsEntry represents a single entry in the Collaborations section.
// swagger:model
type CollaborationsEntry struct {
	// Title of the project
	// example: Quantum Security Research
	Title string `json:"title"`

	// Link to the project or repository
	// example: https://github.com/ioaiaaii/quantum-security
	Link string `json:"link"`
}
