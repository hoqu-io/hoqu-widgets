# Tracker UI

## Installation

Install [Node.js](https://nodejs.org/en/download/)

### Windows only steps

Install [Microsoft Visual C++ 2005 Redistributable](https://www.microsoft.com/en-gb/download/details.aspx?id=3387)

Install [Yarn](https://yarnpkg.com/en/docs/install)

Install [git](https://git-scm.com/download/win) with git bash support (all commands should definitely work)

* Select "use git from git bash" when prompted
* Select "checkout as-is, commit unix style" when prompted
* Select "use MinTTY" when prompted
* Check "Enable symbolic links" when prompted

Open git bash and install Node-gyp (globally):

```
npm install -g yarn node-gyp
```

Close git bash and open it again (to reload PATH env). 
Go to the project root folder:

```
cd /<disk_letter>/<project_dir>
```

### Mac/Linux only steps

Install Yarn and Node-gyp (globally):

```
sudo npm install -g yarn node-gyp
```

### Common steps (Win/Mac/Linux)

Install Node modules (execute in project root folder): 

```
yarn install
```

## Development

To develop application run app dev server

```
npm run dev
```

Then go to localhost:6000. Any changes to any project files will be compiled automatically

## Building

Build project 

```
npm run build
```
