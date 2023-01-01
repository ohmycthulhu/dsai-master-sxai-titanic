# Templates Repository

The Fred Hutch templates repository stores the minimum file requirements for several project types. Each project folder serves as a template and guide for following best coding practices. Please visit the [Scientific Computing Wiki](https://sciwiki.fredhutch.org/scicomputing/software_standards/) to review the coding standards at Fred Hutch.

Supported project types are detailed in the following sections, and include both stand-alone data analysis and package/tool creation. The standards vary between the two projects, with greater organizational structure and testing requirements for tool development projects. Both project types require a license and README file, as well as a designated location for separate raw and processed data. Each project folder contains a README file detailing usage and all template components.

Currently, only Python templates are supported. However, a similar framework is anticipated for R development in the near future.

For more information on Flask applications, please see [this repository](https://github.com/FredHutch/scicomp_flask_examples) with examples from SciComp.

#### Usage

It is recommended to clone this repository to your local machine, then copy and rename the folder for the project type you wish to develop:
```
local:~/$ git clone https://github.com/FredHutch/wiki-templates.git
local:~/$ cp -r wiki-templates/ToolDev-Python-Template/ MyPythonProject/
```

To manage version control of your project in git, create a local repository from your new project folder:
```
local:~/$ cd MyPythonProject
local:~/$ git init
local:~/$ git add *
local:~/$ git commit -am "initial commit from template"
```
> Note: for more resources on using git, see the [Scientific Computing Wiki](https://sciwiki.fredhutch.org/scicomputing/software_managecode/).

#### Examples

A growing repository of examples developed from these templates is available [here](https://github.com/FredHutch/wiki-code-examples/). Contributions to the examples repository are welcome and encouraged. We hope to develop a robust resource for researchers to see applications of existing packages, as well as share their own results and homegrown code across an open science framework for the Hutch. 

To keep the examples repo lightweight for easy cloning, we request that data not be stored directly in any project repo that is submitted. Please take a look at existing examples to figure out some options for accessing data in your project code.

## Data Analysis Project ([+DataAnalysis-Python-Template](DataAnalysis-Python-Template/))

This project template is built to accommodate a Python project used primarily for data analysis. With this template, you can choose between building your data analysis project in an interactive Jupyter notebook, or in a python script to be run on the command line. All additional files in the template are documented in the local [README](DataAnalysis-Python-Template/README.md) file and represent the minimum requirements to keep in mind when developing or sharing any data analysis project.

While sharing results is encouraged, it is not anticipated that the underlying code for this type of project will be packaged for re-use.

## Tool and Package Development ([+ToolDev-Python-Template](ToolDev-Python-Template/))

This project template is built to accommodate any Python project focused on tool or package development, which can ultimately be shared or imported by other users. The template file structure has the flexibility to support a notebook interface, an automated script, package creation, or some hybrid thereof. Some projects will require building out additional subfolders and modules, but the basic skeleton should be consistent across all projects at Fred Hutch. This will aid in reproducibility, and make it easier for other researches to review and adapt code to their own purposes. All template components are documented in the local [README](ToolDev-Python-Template/README.md) file.

## Flask application template ([+Flask-Python-Template](Flask-Python-Template/))

This project template is built for a simple flask web application that only consists of a few pages and relatively simple functionality.  More complex projects can likely use a very similar template but if you find yourself using thigns like blueprints, a complex service layer, AMQP, etc. then this is probably too simplistic of a template for you to use as-is.  All template components are documented in the local [README](Flask-Python-Template/README.md) file.
README file

# Flask app template

This is a template for flask apps.  It is meant as a very basic skeleton for a typical flask application to reduce the overhead of creating a new website.  This is not meant for large, complex apps but should suffice for small web apps that consist only of a few pages and don't need to do anything particularly fancy.

## Overview and contents
Included is a basic flask app, Bootstrap 4, and the various libraries (jquery, etc.) necesary to support bootstrap 4.  All versions in the Pipfile.lock were the latest available at the time this README was written.

## Running the app
Run `run.sh` to run the app.

## Directory structure and files
`run.py`: imports the app and is meant to be run with `flask run` along with the `FLASK_APP` environment variable set (see `run.sh`).
`run.sh`: use this to start the app.  It will set the `FLASK_APP` environment variable required by flask's default development server.

`app`: this folder contains the actual code to do anything useful.

`app/templates`: is where all Jinja templates should be located by default.

`app/templates/layout.html`: base Jinja template that can be inherited and provides a simple layout for content, includes the relevant CSS/javascript files including external resources (e.g. Bootstrap 4), and avoids the need to duplicate code for additional pages.

`app/templates/index.html`: effectively empty "hello, world" default landing page that inherits from `layout.html`

`app/static`: directory contains files served statically from the site, such as css, js, images, etc.

`app/static/style.css`: empty css file for use with the project.  Automatically included by `layout.html`

`app/static/script.js`: empty javascript file for use with the project.  Automatically included by `layout.html`

`config.py.ex`: example config file.  Use an actual `config.py` file for configuration.  It will automatically be loaded when the app starts.

`app/__init__.py`: flask is initialized in this file, including configuration

`app/routes.py`: location of routes for flask.  Imported automatically in `__init__.py`

`test/test_app.py`: contains a sample unit test that can be run with pytest

`test/__init__.py`: makes test folder into a package so that it can just import app in order to test things in the `app/` directory
