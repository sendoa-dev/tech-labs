fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

### apps_release

```sh
[bundle exec] fastlane apps_release
```

Deploys Apps @ Production track

### apps_qa_release

```sh
[bundle exec] fastlane apps_qa_release
```

Deploys Apps @ Beta track

### apps_generate

```sh
[bundle exec] fastlane apps_generate
```

Generates Apps

### android_release

```sh
[bundle exec] fastlane android_release
```

Deploys on Google Play Console @ Production track

### android_qa_release

```sh
[bundle exec] fastlane android_qa_release
```

Deploys on Google Play Console @ Beta track

### android_generate_apk

```sh
[bundle exec] fastlane android_generate_apk
```

Generates .apk file

### android_generate_aab

```sh
[bundle exec] fastlane android_generate_aab
```

Generates .aab file

### ios_qa_release

```sh
[bundle exec] fastlane ios_qa_release
```

Deploys on App Store Connect @ Testflight

### ios_release

```sh
[bundle exec] fastlane ios_release
```

Deploys on App Store Connect @ Production

### ios_generate_ipa

```sh
[bundle exec] fastlane ios_generate_ipa
```

Generates .ipa file

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
