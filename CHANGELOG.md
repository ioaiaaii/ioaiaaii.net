<a name="unreleased"></a>
## [Unreleased]


<a name="v1.1.9"></a>
## [v1.1.9] - 2024-11-26
### ♻️ Code Refactoring
- **persistence:** minor naming
- **transport:** tbd

### ✨ Features
- **api:** enable otel
- **api:** introduce config package
- **deploy:** add rate limiting
- **deploy:** support otel in env
- **telemetry:** introduce otel instrumentation
- **transport:** use otel-fiber middleware for instrumentation

### 🐛 Bug Fixes
- **web:** mozila bug with w-full on img tag

### 👷 Continuous Integration
- add local otel target
- **otel:** add local otel config

### 🛠️ Chores
- go mod tidy and vendor
- **deploy:** bump chart appversion
- **deploy:** chart update
- **transport:** do not instrument health routes
- **web:** minor styling improvmenets
- **web:** introduce Metrics Instrumentation with OTEL
- **web:** minor display improvements

### Pull Requests
- Merge pull request [#43](https://github.com/ioaiaaii/ioaiaaii.net/issues/43) from ioaiaaii/feat/fontend-otel-instrumentation


<a name="v1.1.8"></a>
## [v1.1.8] - 2024-11-17
### 🛠️ Chores
- **deploy:** bump chart appversion
- **iac:** upload webp images
- **web:** migrate live to webp image
- **web:** migrate to webp image
- **web:** transparent home menu bar
- **web:** apply default bg color
- **web:** remove redundunt info
- **web:** remove gh profile from contancts

### Pull Requests
- Merge pull request [#42](https://github.com/ioaiaaii/ioaiaaii.net/issues/42) from ioaiaaii/chore/switch-to-webp-images


<a name="v1.1.7"></a>
## [v1.1.7] - 2024-11-15
### 🐛 Bug Fixes
- **website:** image path for dec-pdc

### 🛠️ Chores
- **deploy:** bump chart appversion
- **iac:** module update with new images

### Pull Requests
- Merge pull request [#41](https://github.com/ioaiaaii/ioaiaaii.net/issues/41) from ioaiaaii/chore/images-improvements
- Merge pull request [#40](https://github.com/ioaiaaii/ioaiaaii.net/issues/40) from ioaiaaii/chore/images-improvements
- Merge pull request [#39](https://github.com/ioaiaaii/ioaiaaii.net/issues/39) from ioaiaaii/chore/images-improvements


<a name="v1.1.6"></a>
## [v1.1.6] - 2024-11-15
### 🛠️ Chores
- **deploy:** bump chart appversion
- **website:** improvment mockups

### Pull Requests
- Merge pull request [#38](https://github.com/ioaiaaii/ioaiaaii.net/issues/38) from ioaiaaii/chore/images-improvements


<a name="v1.1.5"></a>
## [v1.1.5] - 2024-11-13
### 🐛 Bug Fixes
- image min h

### 🛠️ Chores
- **deploy:** bump chart appversion

### Pull Requests
- Merge pull request [#37](https://github.com/ioaiaaii/ioaiaaii.net/issues/37) from ioaiaaii/fix/image-h


<a name="v1.1.4"></a>
## [v1.1.4] - 2024-11-13
### ✨ Features
- **web:** minor imrovements on images

### 🛠️ Chores
- **deploy:** bump chart appversion
- **iac:** images sync

### Pull Requests
- Merge pull request [#36](https://github.com/ioaiaaii/ioaiaaii.net/issues/36) from ioaiaaii/feat/styling-improv


<a name="v1.1.3"></a>
## [v1.1.3] - 2024-11-12
### ✨ Features
- image rendering and styling improvements

### 🛠️ Chores
- **deploy:** bump chart appversion
- **iac:** image upload

### Pull Requests
- Merge pull request [#35](https://github.com/ioaiaaii/ioaiaaii.net/issues/35) from ioaiaaii/feat/images-desing
- Merge pull request [#34](https://github.com/ioaiaaii/ioaiaaii.net/issues/34) from ioaiaaii/master
- Merge pull request [#33](https://github.com/ioaiaaii/ioaiaaii.net/issues/33) from ioaiaaii/feat/images-desing


<a name="v1.1.2"></a>
## [v1.1.2] - 2024-11-11
### 🛠️ Chores
- **deploy:** bump chart appversion

### Pull Requests
- Merge pull request [#32](https://github.com/ioaiaaii/ioaiaaii.net/issues/32) from ioaiaaii/feat/improve-image-loading


<a name="v1.1.1"></a>
## [v1.1.1] - 2024-11-11
### ♻️ Code Refactoring
- move website data to website dir

### ⚡ Performance Improvements
- switch to newer lighter images
- **deploy:** probes fine-tuning
- **iac:** manage gcs decentralised

### 🐛 Bug Fixes
- **data:** minor text correction

### 🛠️ Chores
- **deploy:** bump appversion
- **deploy:** bump chart version
- **website:** migrate images from upstream
- **website:** deprecate embed

### Pull Requests
- Merge pull request [#31](https://github.com/ioaiaaii/ioaiaaii.net/issues/31) from ioaiaaii/chore/image-bump
- Merge pull request [#30](https://github.com/ioaiaaii/ioaiaaii.net/issues/30) from ioaiaaii/feat/images_improvements


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


[Unreleased]: https://github.com/ioaiaaii/ioaiaaii.net/compare/v1.1.9...HEAD
[v1.1.9]: https://github.com/ioaiaaii/ioaiaaii.net/compare/v1.1.8...v1.1.9
[v1.1.8]: https://github.com/ioaiaaii/ioaiaaii.net/compare/v1.1.7...v1.1.8
[v1.1.7]: https://github.com/ioaiaaii/ioaiaaii.net/compare/v1.1.6...v1.1.7
[v1.1.6]: https://github.com/ioaiaaii/ioaiaaii.net/compare/v1.1.5...v1.1.6
[v1.1.5]: https://github.com/ioaiaaii/ioaiaaii.net/compare/v1.1.4...v1.1.5
[v1.1.4]: https://github.com/ioaiaaii/ioaiaaii.net/compare/v1.1.3...v1.1.4
[v1.1.3]: https://github.com/ioaiaaii/ioaiaaii.net/compare/v1.1.2...v1.1.3
[v1.1.2]: https://github.com/ioaiaaii/ioaiaaii.net/compare/v1.1.1...v1.1.2
[v1.1.1]: https://github.com/ioaiaaii/ioaiaaii.net/compare/v1.1.0...v1.1.1
[v1.1.0]: https://github.com/ioaiaaii/ioaiaaii.net/compare/v1.0.0...v1.1.0
