# Common Steps

<!-- Source: https://docs.goswitch.online/docs/ccswitch/1-common.html -->

Author: goswitch

Updated: 2026-06-13T10:02:01.000Z
### CC-Switch Introduction

### Claude Code / Codex / Gemini CLI All-in-One Management Tool

[![Version](../../assets/external/img.shields.io/version-3.7.1-blue-5107c28e2a.svg)](https://github.com/farion1231/cc-switch/releases)
[![Trending](../../assets/external/img.shields.io/%F0%9F%94%A5_TypeScript_Trending-Daily%20_%20Weekly%20_%20Monthly-ff6b6b-144159f1ab.svg)](https://github.com/trending/typescript)
[![Platform](../../assets/external/img.shields.io/platform-Windows%20_%20macOS%20_%20Linux-lightgrey-bfbbacfa2c.svg)](https://github.com/farion1231/cc-switch/releases)
[![Built with Tauri](../../assets/external/img.shields.io/built%20with-Tauri%202-orange-2b712567e9.svg)](https://tauri.app/)
[![Downloads](../../assets/external/img.shields.io/endpoint-788a2fc426.svg)](https://github.com/farion1231/cc-switch/releases/latest)

[![farion1231%2Fcc-switch | Trendshift](../../assets/external/trendshift.io/15372-fb550795da.svg)](https://trendshift.io/repositories/15372)

[Changelog](https://docs.goswitch.online/docs/ccswitch/CHANGELOG.html) | [Download](https://github.com/farion1231/cc-switch/releases/latest)

**From Provider Switcher to AI CLI All-in-One Management Platform**

**Unified management of Claude Code, Codex, and Gemini CLI provider configurations, MCP servers, Skills extensions, and system prompts.**

With CC-Switch, you can:

-   ✅ One-click API switching - Quickly switch between multiple API providers
-   ✅ Visual configuration management - Easily manage all configurations through a graphical interface
-   ✅ Built-in GoSwitch templates - Pre-configured GoSwitch template presets
-   ✅ MCP server management - Manage Model Context Protocol servers
-   ✅ System tray quick actions - Quick switching through tray menu

::: tip Tip

CC-Switch has built-in GoSwitch quick configuration templates — no need to manually edit configuration files!
:::
### Software Download

Windows

1.  Click the download link → [Link](https://github.com/farion1231/cc-switch/releases/latest) ← to go to CC-Switch's GitHub Release page

2.  Scroll to the bottom and select the appropriate installer package. For Windows, we recommend downloading the regular .msi installer

![](../../assets/image-en/CC-Switch/001.webp)

3.  After installation, run the CC-Switch main program. The interface looks like this.

![](../../assets/image-en/CC-Switch/002.webp)

MacOS

-   For MacOS, we recommend using HomeBrew

-   Open a terminal and run the following commands:

```bash
# Add tap source
brew tap farion1231/ccswitch

# Install CC-Switch
brew install --cask cc-switch
```

-   After installation, find CC-Switch in "Launchpad" or the "Applications" folder and launch it.

![](../../assets/image-en/CC-Switch/002.png)

Linux

::: warning Important

The file names in the following commands contain placeholder version numbers x.x.x. Please visit the [GitHub Releases](https://github.com/farion1231/cc-switch/releases/latest) page to check the latest version and replace with the actual version number and complete file name.

:::

Debian/Ubuntu systems:

``` bash
# Download .deb package
wget https://github.com/farion1231/cc-switch/releases/latest/download/cc-switch_x.x.x_amd64.deb

# Install
sudo dpkg -i cc-switch_x.x.x_amd64.deb
```

### Environment Check

::: warning Note

**We recommend completing the environment check steps!!!**
If you're experienced and can confirm your Node.js environment and CC, Codex, Gemini CLI installations are fine with configuration directories present, you can skip this step and proceed directly to CC-Switch configuration

Click the link to view [How to perform environment check?](../cli/1-env.md)

:::
