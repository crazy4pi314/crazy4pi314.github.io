---
title: Setting up a OSS Community Discord
metaDescription: My take on creating and moderating Discord communities
date: 2023-05-09T00:00:00.000Z
slug: discord-setup
author: Sarah Kaiser
summary: My take on creating and moderating Discord communities
tags:
  - community
  - oss
  - tutorial
  - discord
---
## I want to make my server!

Before you get started, it is useful to note that there are Discord server templates that will setup channels and roles for you (not bots or most settings).
You can search for particular server temlpalte types for your community, and [some sites](https://www.discord.style/browse?tag=all&page=1) collect lists of templates.
I generally have not used these as there is enough other things to configure that they can't control I just do it myself :)

I have also seen sometimes that a community server will have an accompanying wiki ([nice example](https://msft.chat/member/)) where all of the rules/info/tips/etc are kept as there are pretty limited formatting options for text on Discord channels.
Not something I have tried yet, as I want to keep as much of the community engagement in the server.

### 1. Setup channels

- **Welcome**: what do users see first when they join the server?
  Answer questions like what is this server about, what do they need to setup/customize and how can they get involved right now
  > Tip: Shorten invite link to make it easier for you and others to share. Just make sure that there is no time limit on the invite link.
- **Rules/info channel**: let users know what rules they need to follow and what they can do in the server.
  Make sure includes CoC!!!
  Other useful things you can include on this channel:
  - Channel guide - what can they post/expect to find on certian channels or groups of channels?
  - Roles guide - What roles will they see on the server and what do they mean?
  - Reporting - If a user sees/experiences something that they thing violates the CoC, what should they do?
- **Announcements channel**: what is happening on the server/in the community?
  There are special channel types that allow you to post and subscribe to announcements from other channels and other servers (think kinda like RSS feeds).
  This is useful when there might be other related servers in your community that you want everyone to stay up to date with.
- **Introduction channel**: where users can introduce themselves to the community.
- **Staff intro channel**: Server admin/mods introducing themselves to the community.
  This makes it easy to find out more about the server staff and helps folks put a person behind the username :)
- **Mod channel**: Moderators/admin can discuss things and have moderation bots post updates.
- **Voice channels**: Make regular topical and casual spaces for folks to chat and stream.
- **Fun/random channels**: Help people get to know each other and stay engaged on the server.
  Ideas:
  - Memes
  - Question of the day
  - Pets
  - Music/hobbies
  - Food
  - Self-promotion

### 2. Setup roles

Roles serve two main purposes, to control user permissions and to help users find each other.
They can be assigned by anyone with permissions to, or commonly servers use bots so users can self-assign roles.
See the bot section below for suggestions of bots to use, and check the bot documentation for how to use them.

Ideas for roles on your server:

- Pronouns
- Topic-specific: programming languages, research areas, tools, games, etc.
- Announcement ping roles: specific event, streaming live, general announcements.
- Affiliations: Company, School, etc.
- Skill level: beginner, intermediate, advanced, expert
  
### Enable community server

Designating your server a "community" server allows you to set some global policies for moderation as well as configure nice server welcome screen (different from the channel) and rules acceptance prompts.
See the [official docs](https://support.discord.com/hc/en-us/articles/360047132851-Enabling-Your-Community-Server) or [another guide for setting up a community server](https://www.howtogeek.com/739355/how-to-set-up-a-community-server-on-discord/) for more information.

> IMPORTANT: Have anyone who will mod/admin enable 2FA on their Discord account to ensure all of their permissions work properly.

### Add emoji/stickers

Everyone loves customizing their own server with emoji and stickers, you can make and upload your own, or there are tons of site that have ones you can download and use.
This can be especially helpful for the roles channel as users react with emoji to assign roles.

### BOTS

- General
  - https://yagpdb.xyz/ my most used bot
  - https://mee6.xyz/ supports crypto/NFT features, not a fan of that, but otherwise a great bot
- Specific
  - Guy bot
    - Don't say guys
  - Texit
    - Latex rendering
  - <https://chroniclebot.com/>
    - Good for google cal integration
  - Nightbot
    - Twitch integration
  - <https://serverstatsbot.com/setup>

## Other resources

- [Great Discord user guide for folks less familiar with the platform](https://domitriusclark.notion.site/domitriusclark/Making-the-most-out-of-Discord-e352fcb8fa09414b834a878e137ea103)
- [Discord Docs: Community start guide](https://discord.com/blog/best-practices-for-starting-a-great-community-on-discord)
- [Discord Docs: Getting the most out of your community server](https://discord.com/blog/how-to-get-the-most-out-of-your-community-server)
- [Example landing page for Discord](https://www.pythondiscord.com/)