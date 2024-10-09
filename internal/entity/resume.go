package entity

type Resume struct {
	Name        string            `json:"name"`
	Title       string            `json:"title"`
	Email       string            `json:"email"`
	LinkedIn    string            `json:"linkedIn"`
	GitHub      string            `json:"gitHub"`
	Profile     string            `json:"profile"`
	ArtistBio   string            `json:"artistBio"`
	EngineerBio string            `json:"engineerBio"`
	Experience  []ExperienceEntry `json:"experience"`
	Education   []EducationEntry  `json:"education"`
	Projects    []ProjectEntry    `json:"projects"`
	SkillGroups []SkillCategory   `json:"skillGroups"`
	References  []string          `json:"references"`
}

type ExperienceEntry struct {
	Role        string   `json:"role"`
	Company     string   `json:"company"`
	Location    string   `json:"location"`
	StartDate   string   `json:"startDate"`
	EndDate     string   `json:"endDate"`
	Description []string `json:"description"`
}

type EducationEntry struct {
	Degree         string `json:"degree"`
	Institution    string `json:"institution"`
	Location       string `json:"location"`
	Specialization string `json:"specialization,omitempty"`
	Dissertation   string `json:"dissertation,omitempty"`
	StartDate      string `json:"startDate,omitempty"`
	EndDate        string `json:"endDate,omitempty"`
}

type ProjectEntry struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Link        string `json:"link"`
}

type SkillCategory struct {
	Category string   `json:"category"`
	Skills   []string `json:"skills"`
}
