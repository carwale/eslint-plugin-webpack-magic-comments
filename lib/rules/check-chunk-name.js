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
        return {
            ExpressionStatement(node) {
                // Check if ExpressionStatement is of type "Import"
                // console.log(JSON.stringify(node.expression));
                if (node.expression.type == "ImportExpression") {
                    let commentArray = node.expression.source.leadingComments;
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