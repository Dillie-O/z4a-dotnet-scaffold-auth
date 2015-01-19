# Foundation for Apps .Net Scaffold with Authentication

## NuGet Package Found [here](http://www.nuget.org/packages/z4a-dotnet-scaffold-auth/).

This is the default template project for Foundation for Apps for .Net with Authentication. It's powered by Node, Gulp, Angular, and libsass. It also runs off the .Net WebApi with Token authentication. It provides you with a basic template to get started with Angular and Foundation for Apps.

## Requirements

You'll need the following software installed to get started.

  * [Node.js](http://nodejs.org): Use the installer provided on the NodeJS website.
  * [Git](http://git-scm.com/downloads): Use the installer for your OS.
    * Windows users can also try [Git for Windows](http://git-for-windows.github.io/).
  * [Ruby](https://www.ruby-lang.org/en/): Use the installer for your OS. For Windows users, [JRuby](http://jruby.org/) is a popular alternative.
    * With Ruby installed, run `gem install bundler sass`.
  * [Gulp](http://gulpjs.com/) and [Bower](http://bower.io): Run `[sudo] npm install -g gulp bower`

## Get Started

Once you've added this NuGet package to an empty solution, you need to rebuild the client side assets by running the following commands from the project root (not solution root):

```npm install
bower install
bundle
gulp build```

## Update .Net Packages

Once this is complete, you'll need to update the packages library (to prevent an odd OWIN mismatch). Open the Package Manager Console and enter the following command:

`Update-Package`

## Configure and Update the Database

Next, update your Web.config file and set the connection string to target your database. We will create and run the initial database migration sine leaving an existing migration in the NuGet package will not work. Enter the following commands at the Package Manager Console:

```Enable-Migrations
Add-Migration CreateInitialTables
Update-Database```

From here you should be able to build and run the app.

## Service Configuration
After the first time you run the app, make note of the base Url of the app. You'll need to update the client/assets/js/factories.js file on line 4 to set the serviceBase variable properly. Make sure to include the trailing slash at the end of the Url. 

## Configuration Complete
Now you sholud be able to go to the signup page, create an account (all fields are required), and then login with those credentials to interact with the app.

Build your app and enjoy!