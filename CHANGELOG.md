<a name="unreleased"></a>
## [Unreleased]

### ♻️ Code Refactoring
- move website data to website dir

### ⚡ Performance Improvements
- switch to newer lighter images
- **deploy:** probes fine-tuning
- **iac:** manage gcs decentralised

### 🐛 Bug Fixes
- **data:** minor text correction

### 🛠️ Chores
- **deploy:** bump chart version
- **website:** migrate images from upstream
- **website:** deprecate embed


<a name="v1.1.0"></a>
## [v1.1.0] - 2024-11-09
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
- ci
- **build:** web path in dockerfile
- **makefile:** disable iteractive and tty run
- **release:** parse tag correctly
- **release:** fetch submodules on checkout
- **web:** homepage homebutton color fix

### 👷 Continuous Integration
- create resuable workflow for packaging
- make target for release
- add release workflow
- enable conventional commits and changelog
- remove trivy scanner from build depts
- **golint:** Move under build, imrove caching
- **release:** improve release notes

### 🛠️ Chores
- **changelog:** improve text
- **data:** update live
- **data:** update live json
- **deploy:** enable hpa
- **deploy:** bump chart
- **release:** print only tag name
- **repo-operator:** bump
- **repo-operator:** bump
- **repo-operator:** bump
- **repo-operator:** bump
- **repo-operator:** bump
- **web:** footer and ftyling improvements
- **web:** bolder desing
- **web:** use local fonts, minor improvements
- **website:** Minor Improvements

### Pull Requests
- Merge pull request [#29](https://github.com/ioaiaaii/ioaiaaii.net/issues/29) from ioaiaaii/chore/repo-operator-bump
- Merge pull request [#28](https://github.com/ioaiaaii/ioaiaaii.net/issues/28) from ioaiaaii/chore/repo-operator-bump
- Merge pull request [#27](https://github.com/ioaiaaii/ioaiaaii.net/issues/27) from ioaiaaii/feat/build-tag
- Merge pull request [#26](https://github.com/ioaiaaii/ioaiaaii.net/issues/26) from ioaiaaii/fix/release-action
- Merge pull request [#25](https://github.com/ioaiaaii/ioaiaaii.net/issues/25) from ioaiaaii/fix/release-action
- Merge pull request [#24](https://github.com/ioaiaaii/ioaiaaii.net/issues/24) from ioaiaaii/fix/release-action
- Merge pull request [#23](https://github.com/ioaiaaii/ioaiaaii.net/issues/23) from ioaiaaii/fix/release-action
- Merge pull request [#22](https://github.com/ioaiaaii/ioaiaaii.net/issues/22) from ioaiaaii/fix/release-action
- Merge pull request [#21](https://github.com/ioaiaaii/ioaiaaii.net/issues/21) from ioaiaaii/feat/website-improvements
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


[Unreleased]: https://github.com/ioaiaaii/ioaiaaii.net/compare/v1.1.0...HEAD
[v1.1.0]: https://github.com/ioaiaaii/ioaiaaii.net/compare/v1.0.0...v1.1.0
