const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log(
    'Congratulations, your extension "alstailwindboilerplate" is now active!'
  );
 
  const htmlContent = `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="./css/site.css">
		<script src="./js/site.js" defer></script>
	
		<title>Al's Tailwind Css Boiler Plate</title>
	</head>
	<body>
		<header>
      <nav> this is the nav section! </nav>
    </header>
	</body>
	</html>
	`;

  //tailwind config file
  const tailwindConfigJS = `
	/** @type {import('tailwindcss').Config} */

//  Simple instructions before running npm run tailwind.
//  First create a package.json file by writing this command "npm init -y", in the terminal and press enter
//  If you are using pretiier run the line below the terminal 
//  "npm i -D prettier-plugin-tailwindcss" and then press enter
//  In the package.json file where "scripts" is, delete the line below it. 
//  "test": "echo \"Error: no test specified\" && exit 1". <- that line
//  then add the two lines below remember not to copy the "//" or the quotes
// "tailwind": " npx tailwindcss -i ./src/input.css -o ./build/css/site.css --watch",
// "prettier": "npx prettier --write **/*.html"
//  and then save the files
//  Finally,  run "npm run tailwind" command in the terminal



	module.exports = {
	  content: ["./build/*.html", "./build/**/*.js"],
	  theme: {
		extend: {},
	  },
	  plugins: [],
	}
	
	`;

  const inputCSS = `
	@tailwind base;
	@tailwind components;
	@tailwind utilities;


	`;

  const gitIgnore = `
	node_modules 
	`;

  const jsFile =
  `
  // JavaScript Goes here
  `
  let disposable = vscode.commands.registerCommand(
    "alstailwindboilerplate.createBoilerPlate",
    function () {
      const folderPath = vscode.workspace.workspaceFolders[0].uri["fsPath"];
      // console.log(folderPath);
      fs.mkdir(folderPath +'\\build', function(err){
          if(err){
            console.log("Did not create the build folder.")
          }
      })

      const buildPath = folderPath+'/build'

      fs.writeFile(path.join(buildPath, "index.html"), htmlContent, (err) => {
        if (err) {
          console.log("Your error is " + err);
          return vscode.window.showErrorMessage("Something went wrong with adding a folder." + err);
        }
        vscode.window.showInformationMessage("The html file loaded properly.");
      });

      fs.mkdir(buildPath +'\\js', function(err){
        if(err){
          console.log("Did not create the build folder.")
        }
    })

    const jsPath = buildPath+"/js";
    fs.writeFile(path.join(jsPath, "site.js"), jsFile, (err) => {
      if (err) {
        console.log("Your error is " + err);
        return vscode.window.showErrorMessage("Something went wrong with adding a folder." + err);
      }
      vscode.window.showInformationMessage("The html file loaded properly.");
    });

      fs.mkdir(folderPath +'\\src', function(err){
        if(err){
          console.log("Did not create the build folder.")
        }
    })

    const srcPath = folderPath+'/src'
      fs.writeFile(path.join(srcPath, "input.css"), inputCSS, (err) => {
        if (err) {
          console.log("Your error is " + err);
          return vscode.window.showErrorMessage("Something went wrong" + err);
        }
        vscode.window.showInformationMessage("The css file loaded properly.");
      });
  

      fs.writeFile(path.join(folderPath, "tailwind.config.js"), tailwindConfigJS , (err) => {
        if (err) {
          console.log("Your error is " + err);
          return vscode.window.showErrorMessage("Something went wrong" + err);
        }
        vscode.window.showInformationMessage("The tailwind javscript config file loaded properly.");
      });

      fs.writeFile(path.join(folderPath, ".gitignore"), gitIgnore , (err) => {
        if (err) {
          console.log("Your error is " + err);
          return vscode.window.showErrorMessage("Something went wrong" + err);
        }
        vscode.window.showInformationMessage("The tailwind javscript config file loaded properly.");
      });

      vscode.window.showInformationMessage(
        " AlThePal78s Tailwind CSS boiler plate has installed properly!"
      );

    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
