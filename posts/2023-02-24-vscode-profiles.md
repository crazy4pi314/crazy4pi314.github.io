---
title: VS Code Profiles for fun and profit
summary: How to use profiles to customize VS Code
metaDescription: How to use profiles to customize VS Code
date: 2023-01-30T00:00:00.000Z # 2000-01-01T00:00:00.000Z
author: Sarah Kaiser
slug: vscode-profiles
tags:
  - vscode
  - customization
  - tips
---

> **tl;dr** Check out this [gist](https://gist.github.com/crazy4pi314/a3b1157dcd0873d471fb79cf5dffaba4) for some examples of VS Code profiles I use daily 📝🥳

VS Code is my daily driver for basically all of my projects, not just for writing Python code for work.
I use it for writing books, blogs, embedded devices for IoT projects, and presentations with [reveal.js](https://revealjs.com/).
My settings for each project using VS Code are pretty different, and I used to do a lot of manual setting switching and installing/uninstalling extensions.
For some of the embedded projects, extensions like [PlatformIO](https://marketplace.visualstudio.com/items?itemName=platformio.platformio-ide) and the [C/C++ extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) are great, but they take a lot of time to setup and install dependencies which are not needed for, say writing a blog post.
You could always use workspaces to help manage editor settings and what files open, but you cannot control which extensions are installed for each workspace.
This is where VS Code profiles come in!

## What are VS Code profiles?

VS Code profiles are like workspaces, but are less about the contents of the editor and more about what the VS Code window itself looks like.
Profiles were [officially launched](https://code.visualstudio.com/updates/v1_75#_profiles) in VS Code 1.75, and work anywhere you can use VS Code.
A Profile can include extensions, settings, keyboard shortcuts, UI state, tasks, and user snippets.
This means you can have a profile for writing Python code, one for web development, and one for writing blog posts that you can switch between with a few clicks.

Some ideas or use cases for profiles that I have tried or seen:

- Language specific development (e.g. Python, C++, etc.)
- Web development
- Work + personal profiles: you can log into different accounts for each (e.g. GitHub, Azure, etc.)
- Text editing
- Demos, live streams, or screencasts
- Teaching

There are definitely more ways to use profiles, and I would love to hear about them in the comments!

## Using profiles

To create a profile, you can either use the command palette (_Profiles: Create an empty profile_ / _Profiles: Create from current profile_) or click on the settings icon in the bottom left corner of the VS Code window.

<figure style="text-align: center;">
<img src="/static/img/2023-02-28-vscode-profiles-menu.png" alt="Screenshot of VS Code menu for selecting profiles" style="width: 100%;"><figcaption><strong>Screenshot of VS Code menu for selecting profiles, the yellow arrow points to the settings icon in the bottom left</strong></figcaption>
</figure>

Once you have opened the settings, select the _Create Profile_ menu option, which will give you the option of starting with a blank profile or copying the current window's settings to the new profile.

You can delete and rename profiles, import and export profiles, and switch between profiles them all from the gear icon menu.
When you go to export a profile, there is a helpful panel that opens up to show you what will be included in the export.
From that panel it is easy to inspect and edit if needed the settings, UI state, and extensions that will be included in the export.

<figure style="text-align: center;">
<img src="/static/img/2023-02-28-vscode-profiles-export.png" alt="Screenshot of VS Code menu for exporting profiles" style="width: 100%;"><figcaption><strong>Screenshot of VS Code menu for exporting profiles</strong></figcaption>
</figure>

When you export a profile, you can either save it as a file, or if you save it to a gist, it will give you a URL you can share with others.

> **NOTE:** The share URL will open to a vscode.dev editor window with the profile loaded. A profile management panel open on the left with a prompt for the user to import the profile!

Check out this [gist](https://gist.github.com/crazy4pi314/a3b1157dcd0873d471fb79cf5dffaba4) for some samples of profiles I use, which I'll try to update periodically.
The use-case specific profiles are also linked below which will give you a preview and an option to import yourself:

- [Presentations/Screenshots](https://vscode.dev/profile/github/46080e417c6b2abcb41a73802186c47f)
- [Notepad](https://vscode.dev/profile/github/5fb7723efc17f9b6119cef6ae84c7408)
- [Python Data Science Dev](https://vscode.dev/profile/github/75a4b34f763bfdb2e56a0afa4ececf73)

That's it for now, hopefully this helps you tweak your VS Code setup to be even more awesome!
If you have any questions or comments please leave them below or reach out to me on [Mastodon](https://mathstodon.xyz/crazy4pi314) 😎


