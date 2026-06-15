# CC-Switch Tutorial

<!-- Source: https://docs.goswitch.online/docs/ccswitch/ -->

Author: goswitch

Updated: 2026-06-13T10:02:01.000Z
## Common Steps

### CC-Switch Introduction

### Claude Code / Codex / Gemini CLI All-in-One Management Tool

[![Version](../../assets/external/img.shields.io/version-3.7.1-blue-5107c28e2a.svg)](https://github.com/farion1231/cc-switch/releases)
[![Trending](../../assets/external/img.shields.io/%F0%9F%94%A5_TypeScript_Trending-Daily%20_%20Weekly%20_%20Monthly-ff6b6b-144159f1ab.svg)](https://github.com/trending/typescript)
[![Platform](../../assets/external/img.shields.io/platform-Windows%20_%20macOS%20_%20Linux-lightgrey-bfbbacfa2c.svg)](https://github.com/farion1231/cc-switch/releases)
[![Built with Tauri](../../assets/external/img.shields.io/built%20with-Tauri%202-orange-2b712567e9.svg)](https://tauri.app/)
[![Downloads](../../assets/external/img.shields.io/endpoint-788a2fc426.svg)](https://github.com/farion1231/cc-switch/releases/latest)

[![farion1231%2Fcc-switch | Trendshift](../../assets/external/trendshift.io/15372-fb550795da.svg)](https://trendshift.io/repositories/15372)

[Changelog](https://github.com/farion1231/cc-switch/blob/main/CHANGELOG.md) | [Download](https://github.com/farion1231/cc-switch/releases/latest)

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

<DocTabs storage-key="docs-ccswitch-index-platform-1" :tabs="[{ label: 'Windows', value: 'windows' }, { label: 'MacOS', value: 'macos' }]">
<template #windows>

### Windows

1.  Click the download link → [Link](https://github.com/farion1231/cc-switch/releases/latest) ← to go to CC-Switch's GitHub Release page

2.  Scroll to the bottom and select the appropriate installer package. For Windows, we recommend downloading the regular .msi installer

![](../../assets/image-en/CC-Switch/001.webp)

3.  After installation, run the CC-Switch main program. The interface looks like this.

![](../../assets/image-en/CC-Switch/002.png)


</template>

<template #macos>

### MacOS

-   For MacOS, we recommend using HomeBrew

-   Open a terminal and run the following commands:

``` bash
# Add tap source
brew tap farion1231/ccswitch

# Install CC-Switch
brew install --cask cc-switch
```

-   After installation, find CC-Switch in "Launchpad" or the "Applications" folder and launch it.

![](../../assets/image-en/CC-Switch/002.png)


</template>
</DocTabs>

### Environment Check

<div class="warning custom-block"><div style="overflow-x:auto;display:flex;pad"><svg width="23" height="23" viewBox="0 0 1024 1024"    class="icon" xmlns="http://www.w3.org/2000/svg" ><path d="M576.286 752.57v-95.425q0-7.031-4.771-11.802t-11.3-4.772h-96.43q-6.528 0-11.3 4.772t-4.77 11.802v95.424q0 7.031 4.77 11.803t11.3 4.77h96.43q6.528 0 11.3-4.77t4.77-11.803zm-1.005-187.836 9.04-230.524q0-6.027-5.022-9.543-6.529-5.524-12.053-5.524H456.754q-5.524 0-12.053 5.524-5.022 3.516-5.022 10.547l8.538 229.52q0 5.023 5.022 8.287t12.053 3.265h92.913q7.032 0 11.803-3.265t5.273-8.287zM568.25 95.65l385.714 707.142q17.578 31.641-1.004 63.282-8.538 14.564-23.354 23.102t-31.892 8.538H126.286q-17.076 0-31.892-8.538T71.04 866.074q-18.582-31.641-1.004-63.282L455.75 95.65q8.538-15.57 23.605-24.61T512 62t32.645 9.04 23.605 24.61z" fill="#c28100"></path></svg><span style="color: #c28100;padding-left: 7px;">Important</span></div> It is highly recommended that you complete the environment check step! If you have experience and can confirm that your Node.js environment and the cc, codex, and gemini CLI installations are working properly, and that the configuration directories all exist, you can skip this step and proceed directly to the subsequent CC-Switch configuration. <p>Click the link on the right to view <a href="./../cli/1-env">How to perform an environment check?</a></p></div>
