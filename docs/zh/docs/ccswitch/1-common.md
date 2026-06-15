# 通用步骤

<!-- Source: https://docs.goswitch.online/docs/ccswitch/1-common.html -->

Author: goswitch

Updated: 2026-06-13T10:02:01.000Z
### CC-Switch介绍

### Claude Code / Codex / Gemini CLI 全方位辅助工具

[![Version](../../../assets/external/img.shields.io/version-3.7.1-blue-5107c28e2a.svg)](https://github.com/farion1231/cc-switch/releases)
[![Trending](../../../assets/external/img.shields.io/%F0%9F%94%A5_TypeScript_Trending-Daily%20_%20Weekly%20_%20Monthly-ff6b6b-144159f1ab.svg)](https://github.com/trending/typescript)
[![Platform](../../../assets/external/img.shields.io/platform-Windows%20_%20macOS%20_%20Linux-lightgrey-bfbbacfa2c.svg)](https://github.com/farion1231/cc-switch/releases)
[![Built with Tauri](../../../assets/external/img.shields.io/built%20with-Tauri%202-orange-2b712567e9.svg)](https://tauri.app/)
[![Downloads](../../../assets/external/img.shields.io/endpoint-788a2fc426.svg)](https://github.com/farion1231/cc-switch/releases/latest)

[![farion1231%2Fcc-switch | Trendshift](../../../assets/external/trendshift.io/15372-fb550795da.svg)](https://trendshift.io/repositories/15372)

[更新日志](https://docs.goswitch.online/docs/ccswitch/CHANGELOG.html) | [下载地址](https://github.com/farion1231/cc-switch/releases/latest)

**从供应商切换器到 AI CLI 一体化管理平台**

**统一管理 Claude Code、Codex 与 Gemini CLI 的供应商配置、MCP 服务器、Skills 扩展和系统提示词。**

使用 CC-Switch，您可以：

-   ✅ 一键切换 API 配置 - 在多个 API 提供商之间快速切换
-   ✅ 可视化配置管理 - 通过图形界面轻松管理所有配置
-   ✅ 内置 GoSwitch 模板 - 预设了 GoSwitch 的配置模板
-   ✅ MCP 服务器管理 - 管理 Model Context Protocol 服务器
-   ✅ 系统托盘快捷操作 - 通过托盘菜单快速切换

::: tip 温馨提示

CC-Switch 已经内置了 GoSwitch 的快捷配置模板，无需手动编辑配置文件！
:::
### 软件下载

Windows

1.  点击下载链接→[传送门](https://github.com/farion1231/cc-switch/releases/latest)←，进入CC-Switch的Github Release页面

2.  鼠标滚动到最下方选择适合自己版本的安装包，windows系统推荐下载普通msi后缀的安装包进行安装

![](../../../assets/image/CC-Switch/001.webp)

3.  安装后运行CC-Switch主程序，界面如下。

![](../../../assets/image/CC-Switch/002.png)

MacOS

-   MacOS安装推荐使用HomeBrew

-   开启终端后，分别运行以下命令：

``` bash
# 添加 tap 源
brew tap farion1231/ccswitch

# 安装 CC-Switch
brew install --cask cc-switch
```

-   安装完成后，在“启动台”或“应用程序”文件夹中找到 CC-Switch 并启动。

![](../../../assets/image/CC-Switch/002.png)

Linux

::: warning 重要

以下命令中的文件名包含占位符版本号 x.x.x，请访问[GitHub Releases](https://github.com/farion1231/cc-switch/releases/latest) 页面查看最新版本，并替换为实际的版本号和完整文件名。

::: 

Debian/Ubuntu 系统：


``` bash
# 下载 .deb 包
wget https://github.com/farion1231/cc-switch/releases/latest/download/cc-switch_x.x.x_amd64.deb

# 安装
sudo dpkg -i cc-switch_x.x.x_amd64.deb
```

### 环境检查

::: warning 注意

**请你最好进行此步的环境检查步骤！！！**
如果你有经验，能确认你的Nodejs环境以及cc、codex、gemini的cli安装没问题，配置目录也都存在，可以忽略这一步，直接进入后续的CC Switch配置

点击右侧传送门查看 [如何进行环境检查？](../cli/1-env.md)

:::
