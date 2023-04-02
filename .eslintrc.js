module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "plugins": [
        "spellcheck"
    ],
    "rules": {
        "spellcheck/spell-checker": [2, {
            "strings": true,
            "comments": false,
            "identifiers": true,
            "templates": true,
            "lang": "en_US",
            "skipWords": [
                "dotenv",
                "req",
                "res",
                "jsonwebtoken",
                "Xuan",
                "Hoang",
                "Datphong",
                "nodemailer",
                "gmail",
                "bqolkurhokehdqia"
            ]
        }]
    }

}
