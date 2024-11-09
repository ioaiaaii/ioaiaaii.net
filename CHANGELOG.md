<a name="unreleased"></a>
## [Unreleased]

### 🐛 Bug Fixes
- ci
- **makefile:** disable iteractive and tty run
- **release:** parse tag correctly
- **release:** fetch submodules on checkout

### 👷 Continuous Integration
- make target for release
- add release workflow
- **release:** improve release notes

### 🛠️ Chores
- **changelog:** improve text


<a name="v1.0.1"></a>
## [v1.0.1] - 2024-11-09
### ♻️ Code Refactoring
- **web:** migrate to web dir from website

### ✨ Features
- **api:** Introduce Liveness and Readiness checks
- **deploy:** stability improvements
- **deploy:** Enable ingress
- **deploy:** Add Helth checks for Helm
- **web:** add image swap
- **web:** artist info addition

### 🐛 Bug Fixes
- **build:** web path in dockerfile
- **web:** homepage homebutton color fix

### 👷 Continuous Integration
- enable conventional commits and changelog
- remove trivy scanner from build depts
- **golint:** Move under build, imrove caching

### 🛠️ Chores
- **data:** update live json
- **data:** update live
- **deploy:** enable hpa
- **repo-operator:** bump
- **web:** footer and ftyling improvements
- **web:** bolder desing
- **web:** use local fonts, minor improvements
- **website:** Minor Improvements

### Pull Requests
- Merge pull request [#20](https://github.com/ioaiaaii/ioaiaaii.net/issues/20) from ioaiaaii/feat/website-improvements
- Merge pull request [#19](https://github.com/ioaiaaii/ioaiaaii.net/issues/19) from ioaiaaii/feat/website-improvements
- Merge pull request [#18](https://github.com/ioaiaaii/ioaiaaii.net/issues/18) from ioaiaaii/feat/k8s-native
- Merge pull request [#16](https://github.com/ioaiaaii/ioaiaaii.net/issues/16) from ioaiaaii/feat/k8s-native


<a name="v1.0.0"></a>
## v1.0.0 - 2024-10-30
### ♻️ Code Refactoring
- Project Restructure following Clean Architecture
- Project Restructure following Clean Architecture

### ✨ Features
- **Web Framework:** Migrate to Fabric
- **apps:** Init components
- **bff:** Add in-memory caching interface
- **bff:** Init OpenAPI Spec
- **data:** Migrate to embed native go FS
- **deploy:** Chart addition
- **fronted:** Init NGINX server for Frontend
- **fronted:** Add linter
- **repo-operator:** Fetch pre-commit-hooks
- **website:** Add production support

### 🐛 Bug Fixes
- pre-commit
- **build:** Fix path for nginx conf
- **ci:** Trivy cache
- **ci:** Support submodules
- **ci:** Support website ci
- **makefile:** Overwrite operator path

### 👷 Continuous Integration
- fix
- Add Kaniko
- Trivy cache
- test
- Migrate to Cache from Artifacts
- Deprecate frontend image
- Inlcude build changes
- Enhance caching
- **build:** Init packaging
- **frontend:** Feeling better to have front related in one place
- **frontend:** Linttttttt
- **gh:** Init CI Pipeline
- **gh-actions:** Init
- **go:** Update go.mod after lint
- **makefile:** Add target for qiuick env

### 🛠️ Chores
- repo-operator update
- Deprecate frontend
- **Makefile:** Fetch golang support
- **bff:** Run vite in 80
- **bff:** Remove deprecated funcs
- **data:** Move Content Data closer to bff
- **depts:** Update golang depts
- **gitingore:** Drop osx files
- **gitingore:** Generated gitingore from repo-operator!
- **go:** Update modules
- **repo operator:** Update
- **repo-operator:** update
- **repo-operator:** Update
- **repo-operator:** fetch golang gitingore
- **repo-operator:** Update
- **repo-operator:** Update
- **repo-operator:** bump
- **repo-operator:** Submodule update
- **website:** Migrate to api/v1 and add base URL

### Pull Requests
- Merge pull request [#13](https://github.com/ioaiaaii/ioaiaaii.net/issues/13) from ioaiaaii/feat/chart-addition
- Merge pull request [#14](https://github.com/ioaiaaii/ioaiaaii.net/issues/14) from ioaiaaii/feat/webframework-improvements
- Merge pull request [#12](https://github.com/ioaiaaii/ioaiaaii.net/issues/12) from ioaiaaii/ci/support-website-paths
- Merge pull request [#11](https://github.com/ioaiaaii/ioaiaaii.net/issues/11) from ioaiaaii/ci/support-website-paths
- Merge pull request [#10](https://github.com/ioaiaaii/ioaiaaii.net/issues/10) from ioaiaaii/ci/support-website-paths
- Merge pull request [#9](https://github.com/ioaiaaii/ioaiaaii.net/issues/9) from ioaiaaii/ci/gh-workflow-init
- Merge pull request [#8](https://github.com/ioaiaaii/ioaiaaii.net/issues/8) from ioaiaaii/chore/repo-operator


[Unreleased]: https://github.com/ioaiaaii/ioaiaaii.net/compare/v1.0.1...HEAD
[v1.0.1]: https://github.com/ioaiaaii/ioaiaaii.net/compare/v1.0.0...v1.0.1
