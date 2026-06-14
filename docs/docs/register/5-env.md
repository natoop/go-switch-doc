# Environment Check

<!-- Source: https://docs.goswitch.online/docs/register/5-env.html -->

Author: goswitch

Updated: 2026-06-13T10:02:01.000Z
Before configuring Claude Code, Codex, or Gemini CLI, please confirm that Node.js is properly installed on your machine.

## Check Node.js Environment

Execute the following in a Windows, macOS, or Linux terminal:

```bash
npm list -g --depth-0
```

If the command runs successfully, Node.js and npm are available. Even if no global packages are shown in the output, it doesn't affect subsequent configuration.

If you see "command not found" or similar errors, it means Node.js isn't installed or hasn't been properly added to the system PATH. Please install Node.js first, then re-run the command to confirm.

::: warning Environment check must be completed first

CLI tools depend on Node.js and npm. If the environment isn't ready, subsequent installations of Claude Code, Codex, or Gemini CLI may fail.
:::
## Continue with CLI Installation

After passing the environment check, you can continue reading [Configure CLI Tools](./6-cli.md). For more detailed environment setup instructions, you can also refer to [CLI Environment Check General Steps](../cli/1-env.md).
