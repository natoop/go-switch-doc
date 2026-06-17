# Gemini Configuration

<!-- Source: https://docs.goswitcher.com/docs/cli/4-gemini.html -->

Author: goswitcher

Updated: 2026-06-13T10:02:01.000Z
<DocTabs storage-key="cli-gemini-platform" :tabs="[{ label: 'Windows', value: 'windows' }, { label: 'MacOS', value: 'macos' }]">
<template #windows>

### Windows

1.  Press "Win+R" on your keyboard, enter the following and press Enter to open the Gemini CLI configuration directory

``` bash
%userprofile%\.gemini
```

![](../../assets/image-en/Cli/019.webp)

2.  If there's no `.env` file in the directory, create a new `.env` file and write the following content

-   **.env**: Gemini CLI configuration file, mainly setting custom endpoint, ApiKey, and model used

![](../../assets/image-en/Cli/020.webp)

``` bash
GOOGLE_GEMINI_BASE_URL=https://goswitcher.com
GEMINI_API_KEY=xxx
GEMINI_MODEL=gemini-2.5-pro
```

![](../../assets/image-en/Cli/021.webp)

3.  Review [Create API Token](../register/4-token.md), create a **Gemini** group token in GoSwitcher, copy the ApiKey and fill it in for `xxx`

![](../../assets/image-en/Cli/026.webp)

4.  Open a terminal and run `gemini`. When the interactive interface appears and responds normally, configuration is successful

![](../../assets/image-en/Cli/022.webp)

</template>

<template #macos>

### MacOS

1.  Press "Command+Shift+G", enter the following path and press Enter to open the configuration directory

``` bash
~/.gemini
```

![](../../assets/image-en/Cli/023.webp)

2.  If there's no `.env` file in the directory, create one and write the following content

-   **.env**: Gemini CLI configuration file, mainly setting custom endpoint, ApiKey, and model used

![](../../assets/image-en/Cli/024.webp)

``` bash
GOOGLE_GEMINI_BASE_URL=https://goswitcher.com
GEMINI_API_KEY=xxx
GEMINI_MODEL=gemini-2.5-pro
```

3.  Review [Create API Token](../register/4-token.md), create a **Gemini** group token in GoSwitcher, and fill in `xxx`

![](../../assets/image-en/Cli/026.webp)

4.  Run `gemini` in the terminal. If you can enter the dialogue normally and receive replies, configuration is complete

![](../../assets/image-en/Cli/022.webp)

</template>
</DocTabs>
