/**
 * @fileoverview Validate webpack chunk imports 
 * @author cw-rb3198
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/check-chunk-name"),

RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
// var options = [{
//     "data-id": {
//         "components": ["a", "button"],
//         "reason": "So that it can be used in automated tests"
//     }
// }];
var parserOptions = {
    "ecmaVersion" : 6,
    sourceType : "module",
    ecmaFeatures: {
        es6: true,
        modules: true
    },
}

var options = [];

var ruleTester = new RuleTester();
ruleTester.run("check-chunk-name", rule, {

    valid: [
        {
            code: `import(/*webpackChunkName : "lodash" */ "lodash")`,
            options,
            parserOptions,
            parser: "babel-eslint",
        }
    ],

    invalid: [
        {
            code: 'import(/*webpackChunkName : "Lodash" */ "lodash")',
            options,
            parserOptions,
            parser: "babel-eslint",
            errors: [
                'Webpack chunk name must consist only of lowercase letters.'
            ]
        },
        {
            code: `const Images = loadable(
                () => import(/* webpackChunkName: "Images" */ "../containers/Images.js"),
                {
                  fallback: <PageLoader />,
                }
              );`,
            options,
            errors: ['Webpack chunk name must consist only of lowercase letters.'],
            parserOptions,
            parser: "babel-eslint",
        }
    ]
});