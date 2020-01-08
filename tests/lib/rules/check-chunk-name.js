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
    ecmaFeatures: {
        es6: true,
    },
}
var ruleTester = new RuleTester();
ruleTester.run("check-chunk-name", rule, {

    valid: [
        {
            code: 'import(/*webpackChunkName : "lodash" */ "lodash")',
            options,
            parserOptions
        }
    ],

    invalid: [
        {
            code: 'import(/*webpackChunkName : "Lodash" */ "lodash")',
            options,
            parserOptions,
            errors: [
                'Webpack chunk name must consist only of lowercase letters'
            ]
        }
    ]
});