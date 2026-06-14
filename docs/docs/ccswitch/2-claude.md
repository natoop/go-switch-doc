# Claude Code Configuration

<!-- Source: https://docs.goswitch.online/docs/ccswitch/2-claude.html -->

Author: goswitch

Updated: 2026-06-13T10:02:01.000Z
1.  Open the CC-Switch software you downloaded, and you will see the initial interface as shown below

![](../../assets/image-en/CC-Switch/003.webp)

2.  In the group bar, select the "Claude / Claude Desktop" group

![](../../assets/image-en/CC-Switch/004.png)

3.  Switch to the console's API key section, click "More", and select "CC Switch"

![](../../assets/image-en/CC-Switch/005.png)

4.  Set your configuration name and the corresponding model, then click "Open CCSwitch"

![](../../assets/image-en/CC-Switch/006.png)
![](../../assets/image-en/CC-Switch/024.png)

5.  CC-Switch will automatically pop up a confirmation window. After verifying the information, click "Import". The window will automatically close once the import is complete

![](../../assets/image-en/CC-Switch/025.png)

6.  After successfully adding the configuration, you will see the configured group on the main interface. Click the "Enable" button on the right — when it shows "In Use", the configuration is complete

![](../../assets/image-en/CC-Switch/007.png)

7.  Click the "Settings" button in the upper left corner. On the General page, scroll down to find `Skip Claude Code initial installation confirmation` and make sure to check it

![](../../assets/image-en/CC-Switch/017.webp)

8.  Run `claude` in the terminal. If you see the conversation interface and can get normal responses, the configuration is complete

![](../../assets/image-en/Cli/016.webp)

::: warning Usage Note

If you are using the [CC Group](../token/#cc-group), please note that this group **does not support third-party integration**, so you cannot complete a full call test within CC-Switch.

To verify whether the configuration is working, please rely on the actual conversation results in Claude Code, and complete your final testing there.

:::