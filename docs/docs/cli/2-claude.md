# Claude Code Configuration

<!-- Source: https://docs.goswitch.online/docs/cli/2-claude.html -->

Author: goswitch

Updated: 2026-06-13T10:02:01.000Z
Windows

1.  Press "Win+R" on your keyboard, enter the following and press Enter to open the Claude Code configuration directory

```bash
%userprofile%\.claude
```

![](../../assets/image-en/Cli/013.webp)

2.  The directory contents are shown in the image. If `settings.json` doesn't exist in the directory, you need to create it manually

-   **settings.json**: Claude's main configuration file, used to configure the relay address, ApiKey, hooks, plugins, etc.

![](../../assets/image-en/Cli/014.webp)

3.  Write the following content to `settings.json`

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://goswitch.online",
    "ANTHROPIC_AUTH_TOKEN": "xxx",
    "CLAUDE_CODE_ATTRIBUTION_HEADER": "0",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "CLAUDE_CODE_DISABLE_TERMINAL_TITLE": "1"
  }
}
```

![](../../assets/image-en/Cli/015.webp)

4.  Review [Create API Token](../register/4-token.md), create a token in the **CC** group in GoSwitch, and replace the `xxx` part above

![](../../assets/image-en/Cli/025.webp)

5.  Run `claude` in the Windows terminal. When the dialogue interface appears, test the conversation. If you receive a reply, configuration is successful

![](../../assets/image-en/Cli/016.webp)

MacOS

1.  Press "Command+Shift+G" in Finder, enter the following path and press Enter to open the configuration directory

```bash
~/.claude
```

![](../../assets/image-en/Cli/017.webp)

2.  If `settings.json` doesn't exist in the directory, you need to create it manually

-   **settings.json**: Claude's main configuration file, used to configure the relay address, ApiKey, hooks, plugins, etc.

![](../../assets/image-en/Cli/018.webp)

3.  Write the following content to `settings.json`

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://goswitch.online",
    "ANTHROPIC_AUTH_TOKEN": "xxx",
    "CLAUDE_CODE_ATTRIBUTION_HEADER": "0",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "CLAUDE_CODE_DISABLE_TERMINAL_TITLE": "1"
  }
}
```

![](../../assets/image-en/Cli/015.webp)

4.  Review [Create API Token](../register/4-token.md), create a token in the **CC** group in GoSwitch, and replace `xxx` above

![](../../assets/image-en/Cli/025.webp)

5.  Run `claude` in the terminal. When the dialogue interface appears and responds normally, configuration is complete

![](../../assets/image-en/Cli/016.webp)

::: warning Important

**Note: If you still encounter errors after configuration, such as a prompt requiring login, please refer to the following link for resolution**
[claude-code-cannot-connect-to-anthropic-service](../faq/CC.md#claude-code-cannot-connect-to-anthropic-service)

:::
