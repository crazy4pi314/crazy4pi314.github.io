---
title: Customizing VS Code for every situation
description: How I choose what VS Code customization options to use
date: 2023-08-07
eyebrow: which-to-use-customization.md
tags:
  - customization
  - tools
  - tutorial
  - vscode
---
My workspace and editor needs to feel comfortable when I work or I can end up getting distracted. I do this by customizing my split ergo keyboard, PC lighting, terminals, and editor tuning. However, the more options or features for a tool, the more I can get sucked into the endless vortex of settings in trying to achieve what I want 😅

I want to cover in this post how to choose how and when to use the different customization tools in VS Code. I'll try and group the features by whether it's something I would use mainly personally or to share with others (though some fall in-between). At the end I'll mention how these different features interact 👍

> Disclaimer: These are not at all hard "rules" just some rough logic that I use to decide where I need to specify a customization.

## What can I customize about VS Code in the first place?

- [Editor settings](https://code.visualstudio.com/docs/getstarted/settings#_settings-editor) like themes, fonts, integrated git settings, run/debug tasks, keybindings, and code snippets
- [UI state](https://code.visualstudio.com/docs/editor/profiles#_profile-contents): what windows/panes are visible and where, what files are open, etc.
- Installed [extensions](https://code.visualstudio.com/docs/editor/extension-marketplace) and extension specific settings
- Where my code gets run (if I am working with [Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers)/Docker)

## Personal settings

### User settings

This is probably the most common way that folks are familiar with [settings in VS Code](https://code.visualstudio.com/docs/getstarted/settings), accessible via the command palette `Preferences: Open User Settings`. If you prefer to look at the settings files yourself, you can also use `Preferences: Open User Settings (JSON)` to edit the file directly.

### Settings Sync

If you work on more than one machine, [Settings Sync](https://code.visualstudio.com/docs/editor/settings-sync) can help keep your VS Code experience the same no matter where you are working.

> **When to use:** Settings Sync also syncs profiles so my strategy is to move any settings I want to sync to profiles, and turn setting sync on.

### GitHub Codespaces dotfiles

[GitHub Codespaces dotfiles](https://docs.github.com/en/codespaces/customizing-your-codespace/personalizing-github-codespaces-for-your-account#dotfiles) allow you to set up all of your creature comforts/dotfiles pre-added to any Codespace you start up.

## Project settings

### Workspaces

[Workspaces](https://code.visualstudio.com/docs/editor/workspaces) in VS Code are geared towards workflows comprised of multiple projects/directories.

### Dev Containers

My favorite customization option (and something I set up for nearly every project) are [Dev Containers](https://containers.dev). They combine a Docker/Docker Compose container specification with a JSON settings file to configure settings/extensions in the editor.

## Hybrid: personal and project

### Profiles

[Profiles](https://code.visualstudio.com/docs/editor/profiles) in VS Code are a way to specify everything about the editor, without anything about the execution environment. See my [earlier blog post](/journal/vscode-profiles/) to learn more about how I use profiles 😄

### Extension Packs

[Extension Packs](https://code.visualstudio.com/api/references/extension-manifest#extension-packs) create meta extensions that take dependencies on all the other extensions that you want to install at once.

## How do the different customization features interact?

In most cases you can combine multiple customization options here and VS Code will try and resolve the desired configuration based on a priority ranking [detailed in the docs](https://code.visualstudio.com/docs/getstarted/settings#_settings-precedence).

## Conclusion

Hopefully this helps you understand the different options you have to make customizing and sharing VS Code easier!

_If you have more questions or want to share how you use these features, find me on [Mastodon](https://mathstodon.xyz/@crazy4pi314)_ 💖
