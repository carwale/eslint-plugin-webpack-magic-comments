# eslint-plugin-webpack-magic-comments

Checks the names of webpack chunk imports and corrects them to all-lowercase

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-webpack-magic-comments`:

```
$ npm install eslint-plugin-webpack-magic-comments --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-webpack-magic-comments` globally.

## Usage

Add `webpack-magic-comments` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "webpack-magic-comments"
    ]
}
```

Add --fix while running the linter to automatically fix the errors.


Then configure the rules you want to use under the rules section.
Since we want to show an error on invalid name, set it to "error"

```json
{
    "rules": {
        "webpack-magic-comments/check-chunk-name": "error"
    }
}
```

## Supported Rules

* check-chunk-name : 
    Checks the webpack chunk names written by the user in webpack dynamic imports. 
    If the chunk name does not obey the convention of all small-case letters, it displays an error.
    It can also automatically fix the error by appending --fix while running the linter.





