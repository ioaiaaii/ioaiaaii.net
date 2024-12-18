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
	LinkedIn string `json:"linkedIn"`

	// GitHub profile link
	// example: https://github.com/ioaiaaii
	GitHub string `json:"gitHub"`

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

	// List of professional experiences
	Experience []ExperienceEntry `json:"experience"`

	// List of educational qualifications
	Education []EducationEntry `json:"education"`

	// List of project entries
	Projects []ProjectEntry `json:"projects"`

	// Grouped skills categorized by field
	SkillGroups []SkillCategory `json:"skillGroups"`

	// List of references or endorsements
	// example: ["Reference 1", "Reference 2"]
	References []string `json:"references"`
}

// ExperienceEntry represents a single entry in the work experience section.
// swagger:model
type ExperienceEntry struct {
	// Job role or title
	// example: Senior Developer
	Role string `json:"role"`

	// Company name
	// example: Quantum Solutions Ltd
	Company string `json:"company"`

	// Location of the job, can be remote or physical
	// example: Athens, Greece
	Location string `json:"location"`

	// Start date in YYYY-MM-DD format
	// example: 2021-01-15
	StartDate string `json:"startDate"`

	// End date in YYYY-MM-DD format; can be empty if currently employed
	// example: 2023-10-15
	EndDate string `json:"endDate"`

	// Description of responsibilities or achievements
	// example: ["Led infrastructure redesign", "Improved CI/CD pipelines"]
	Description []string `json:"description"`
}

// EducationEntry represents a single entry in the education section.
// swagger:model
type EducationEntry struct {
	// Degree or certification obtained
	// example: Master's in Quantum Computing
	Degree string `json:"degree"`

	// Institution or university name
	// example: University of Athens
	Institution string `json:"institution"`

	// Location of the institution
	// example: Athens, Greece
	Location string `json:"location"`

	// Specialized area of study, if applicable
	// example: Quantum Computing and Cryptography
	Specialization string `json:"specialization,omitempty"`

	// Title of dissertation or thesis, if applicable
	// example: Quantum Security Applications
	Dissertation string `json:"dissertation,omitempty"`

	// Start date in YYYY-MM-DD format
	// example: 2019-09-01
	StartDate string `json:"startDate,omitempty"`

	// End date in YYYY-MM-DD format
	// example: 2021-06-15
	EndDate string `json:"endDate,omitempty"`
}

// ProjectEntry represents a single entry in the project section.
// swagger:model
type ProjectEntry struct {
	// Title of the project
	// example: Quantum Security Research
	Title string `json:"title"`

	// Brief description of the project
	// example: Research on the impact of quantum algorithms on modern cryptography.
	Description string `json:"description"`

	// Link to the project or repository
	// example: https://github.com/ioaiaaii/quantum-security
	Link string `json:"link"`
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

// SkillCategory groups related skills under a category.
// swagger:model
type SkillCategory struct {
	// Category name for the skill group
	// example: Programming Languages
	Category string `json:"category"`

	// List of skills within the category
	// example: ["Go", "Python", "Rust"]
	Skills []string `json:"skills"`
}
