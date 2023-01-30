---
title: How to get the best Conda environment experience in Codespaces
metaDescription: Tips and tricks to make conda fast and easy in Codespaces
date: 2023-01-30T00:00:00.000Z
slug: conda-codespaces
author: Sarah Kaiser
summary: Tips and tricks to make conda fast and easy in Codespaces
tags:
  - codespaces
  - devcontainers
  - tips
  - conda
---

I often use Conda enviroments when working on my Python projects, as it helps me manage dependancies for projects outside of just pure Python packages. In porting some of these projects to [Codespaces](https://github.com/features/codespaces) and [Dev Containers](https://containers.dev/), I have found some tricks to getting the fastest and most reliable experience with Conda and Codespaces.

> _tl;dr_ Check out this [template repo](https://github.com/crazy4pi314/conda-devcontainer-demo) for a sample Dev Container that is fast and reduces codespace resource consumption.

## Base image size matters

When you start a Codespace on a project, it will try to use whatever Dev Container you have specified in your repo, else it will try to use a kitchen sink container.
That default kitchen sink is can be way too much and so if you will be working with Conda environments with an Anaconda or Miniconda [Dev Container template](https://containers.dev/templates) instead.

- **Tip 1:** To use less of your Codespaces resources start with a smaller image like Miniconda or [miniforge](https://github.com/conda-forge/miniforge) and install only what you need.

It is worth noting as well that if you use one of these template docker images or start with the same original docker image on the `FROM` line, the memory for those layers is pre-cached in Codespaces and seems to download faster.

## Create new environments, don't install into base

The [default Anaconda/Miniconda templates](https://containers.dev/templates) in VS Code will look for an `environment.yml` file in your project root and then install those requirements in the base environment.
This can run into issues when there are conflicts between what is already in the base Conda environment and what you are trying to install.

- **Tip 2:** Change your Dockerfile to `conda create` a new environment as opposed to merging your environment with the base environment to avoid conflicts:

```Dockerfile
RUN if [ -f "/tmp/conda-tmp/environment.yml" ]; then umask 0002 && /opt/conda/bin/conda env create -f /tmp/conda-tmp/environment.yml; fi \
    && rm -rf /tmp/conda-tmp
```

## Conda process uses lots of memory, gets killed

The other challenge I ran into sometimes was that if I was running a lower memory/storage Codespace instance, when I tried to use Condafrom the command line to modify environments, the process would be killed after a few seconds.
This turns out to be related to some [performance issues](https://github.com/conda/conda/issues/5003) Condahas that make it consume a lot of memory when trying to work with the conda-forge installation channel.
You can always then just increase the size of the Codespace your are working with (just go to your Codespaces list and use the triple dots to change the settings for a Codespace).

There is another option that will fix the performance issues so that it can be run on smaller Codespaces.
[Mamaba](https://mamba.readthedocs.io/en/latest/index.html#) is a faster dependancy solver that can wrap Conda and resolve some of these performance issues.
You use all the same Conda syntax for things except use the command `mamba` and if it's not something Mamba improves on, it just drops back to `conda`.
To use mamba in your Dev Container to speed up working with environments, you will need to install it into your base Conda profile, and the use `mamba` to create the Condaenvironment for your environment.

- **Tip 3:** Install and use `mamba` to speed up the Condaenvironment creation process.

The snippet below is a minimal example of a Dockerfile for your dev containers and Codespaces with all the tips included:

```Dockerfile
FROM mcr.microsoft.com/devcontainers/miniconda:0-3
RUN conda install -n base -c conda-forge mamba
COPY environment.yml* .devcontainer/noop.txt /tmp/conda-tmp/
RUN if [ -f "/tmp/conda-tmp/environment.yml" ]; then umask 0002 && /opt/conda/bin/mamba env create -f /tmp/conda-tmp/environment.yml; fi \
    && rm -rf /tmp/conda-tmp
```

You can find a [template repo](https://github.com/crazy4pi314/conda-devcontainer-demo) where I have added all of these files into a blank repo that might help test some dev containers and Codespaces yourself!

## Other Troubleshooting

### Conda not working from the start in the terminal

Sometimes after the Codespace or Dev Container has started, the shell will not have been configured to use the `conda` or `mamba` commands. If you try to run either `conda` or `mamba` the error message will prompt you to run `conda init` and that should fix it. Make sure after you run the fix that you close that terminal and open a new one for the shell profile to be reloaded.


### Conda environments don't show up in the terminal/don't auto activate the right Conda environment

Depending on the loading order of the extensions in VS Code, if it has not seen any Python file or tool in use yet it will not necessarily load the terminal settings for environments right away.
If I open a Jupyter notebook or any Python file that will usually prompt the extension to load the terminal parts and then I just open another terminal window and it's all fixed.

Anyway, hope this helps you get the best Conda experience in Codespaces and Dev Containers! If you have any other questions, tips, or tricks, feel free to reach out to me on [Mastodon](https://mathstodon.xyz/@crazy4pi314) or in the comments below! 💖
