module.exports = {
    meta: {
        docs: {
            description: "correct invalid webpack chunk names",
        },
        fixable: "code",
        schema: [
            // fill in your schema
        ]
    },

    create: function (context) {
        console.log(context)
        return {
            CallExpression(node) {
                // Check if Callee is of type "Import"

                if (node.callee.type === 'Import') {
                    let commentArray = node.arguments[0].leadingComments;
                    for (let i = 0; i < commentArray.length; i++) {
                        let magicComment = commentArray[i].value;
                        // Check if import contains a  webpack magic comment
                        if (magicComment.match(/webpackChunkName/)) {
                            // Extract chunk name
                            let chunkName = magicComment.split(":")[1];
                            // Check if chunk name consists of only small case letters
                            // If not, fix using fixer
                            if (/[A-Z]/.test(chunkName)) {
                                context.report({
                                    node,
                                    message: "Webpack chunk name must consist only of lowercase letters.",
                                    fix: function (fixer) {
                                        return fixer.replaceText(
                                            commentArray[i],
                                            "/*webpackChunkName : " + chunkName.toLowerCase() + "*/"
                                        );
                                    }
                                });
                            }
                        }
                    }
                }
            }

        };
    }
}