# Claude Code Cache Optimization Proxy

<!-- Source: https://docs.goswitch.online/docs/cli/5-cache-fix.html -->

Author: goswitch

Updated: 2026-06-13T10:02:01.000Z
## One-line Summary

[claude-code-cache-fix](https://github.com/cnighswonger/claude-code-cache-fix) is a **third-party open-source tool** that helps Claude Code **save quota**.

Simply put: it acts as a "middleman" between your computer and the Claude server, "organizing" each request you send so Claude can more easily **reuse previous conversations** (i.e., **hit cache**), thereby consuming less quota.

> It doesn't make AI smarter, it just makes your quota last longer.

## Why Do You Need It?

The longer you use Claude Code, you may notice:

-   The same few sentences **consume quota faster than expected**;
-   Resuming an old conversation (`--resume`) feels **like paying again from scratch**;
-   After enabling MCP, Skills, and Hooks, **consumption inexplicably increases**.

These are mostly not bugs, but rather Claude Code's request structure being somewhat "unstable",
causing the server to not recognize "this is the same context" and **re-billing**.

`claude-code-cache-fix` does just one thing: **clean up requests, sort them properly,
and add correct cache markers**, so the Claude server immediately recognizes "I've seen this before",
and charges the cheaper cache price.

What it specifically does (you can skip this if you don't understand):

| What It Does | Benefit to You |
| --- | --- |
| Fixes request structure when resuming sessions | `--resume` is no longer treated as a new conversation with full re-billing |
| Removes unstable markers like version numbers | Cache won't suddenly become invalid after Claude Code upgrades |
| Arranges tool and MCP definitions in fixed order | Same configuration generates identical requests every time, enabling cache hits |
| Automatically adds `cache_control` markers | Proactively tells the server "please cache this" |
| Logs each cache hit and quota status | Makes troubleshooting easier when issues arise; files stored in `~/.claude/quota-status/` |
| Doesn't rely on old `NODE_OPTIONS` injection | Also works with the new Bun version of Claude Code |

## Who Should Use It?

-   ✅ Heavy Claude Code users who are quota-sensitive
-   ✅ Users who frequently `--resume` long sessions with many MCP/Skills enabled
-   ✅ Users comfortable with command-line operations
-   ❌ Users who don't want to touch terminals and just want plug-and-play (skip this for now)

::: warning It cannot solve all quota problems

This tool only optimizes local request structure and cache-related issues. Model pricing itself, long context consumption,
server quota degradation, incorrect model selection, frequent large file reads, etc., still need separate troubleshooting.
:::
::: danger Not suitable for native Windows environment

`claude-code-cache-fix` **is not recommended for use in native Windows CMD / PowerShell**.

Windows users should prioritize completing the full setup of Node.js, Claude Code,
GoSwitch, and `claude-code-cache-fix` in a **WSL Linux environment**. Don't mix native Windows
Claude Code with WSL proxy, as this can easily cause path, environment variable,
background service, and local port inconsistencies.
:::
::: warning Third-party tool notice

`claude-code-cache-fix` is not an officially maintained GoSwitch tool. It processes local API requests.
Please review the source code, dependencies, and configuration methods before installation.
:::
## Recommended: Use AI-Assisted Configuration

This tool involves local proxy, environment variables, and background service configuration. Manual configuration is prone to missing steps.
We recommend sending your system environment, GoSwitch Endpoint, and the GitHub project link together to an AI,
and having it generate commands specific to your machine.

You can directly use the following prompt:

```text
Based on the latest README from https://github.com/cnighswonger/claude-code-cache-fix,
help me configure the Claude Code cache optimization proxy on my current system.
Requirements:
1. I use GoSwitch, upstream must be https://goswitch.online
2. Claude Code's ANTHROPIC_BASE_URL should point to the local proxy http://127.0.0.1:9801
3. Keep ANTHROPIC_AUTH_TOKEN, replace with my GoSwitch CC group token
4. Windows users should configure in WSL Linux environment, do not use native Windows CMD / PowerShell
5. Provide commands to verify proxy health status and whether Claude Code responds normally
6. For long-term use, provide background service configuration suitable for the current system
```

## Minimal Verification Process

The following commands are suitable for verifying the proxy works in Linux / macOS / WSL:

```bash
npm install -g claude-code-cache-fix
CACHE_FIX_PROXY_UPSTREAM=https://goswitch.online cache-fix-proxy server
```

If you're using the optimized routing Endpoint, you can change `CACHE_FIX_PROXY_UPSTREAM` to:

```bash
https://api-slb.goswitch.online
```

## Configure Claude Code

After starting the proxy, change `ANTHROPIC_BASE_URL` in Claude Code's `settings.json` to the local proxy address, and continue filling in your GoSwitch **CC** group token for `ANTHROPIC_AUTH_TOKEN`:

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://127.0.0.1:9801",
    "ANTHROPIC_AUTH_TOKEN": "xxx",
    "CLAUDE_CODE_ATTRIBUTION_HEADER": "0",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "CLAUDE_CODE_DISABLE_TERMINAL_TITLE": "1"
  }
}
```

## Verify Proxy

Open another terminal and check the proxy health status:

```bash
curl http://127.0.0.1:9801/health
```

If it returns `{"status":"ok"}`, open a new terminal and run:

```bash
claude
```

If you can enter Claude Code normally and receive replies, the proxy and GoSwitch configuration are connected.

## Long-term Usage Recommendations

Manually starting the proxy is only suitable for temporary verification. For long-term use, we recommend having AI generate
`systemd`, `launchd`, or other background service configurations specific to your system, to avoid having to manually
start the proxy every time before using Claude Code.

Reminder again: Windows users should complete the entire setup in WSL, do not use native Windows
CMD / PowerShell as the runtime environment.
