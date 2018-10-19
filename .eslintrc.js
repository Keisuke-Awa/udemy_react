module.exports = {
    "extends": "airbnb",
    "env": {
      "browser": true
    },
    "rules": {
      "jsx-a11y/anchor-is-valid": [ "error", {
          "components": [ "Link" ],
          "specialLink": ["to"]
      }],
      "no-underscore-dangle": [
        "error",
        { "allow": ["__REDUX_DEVTOOLS_EXTENSION__"] }
      ]
    }
};
