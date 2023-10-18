/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: [
    "../components/**/*.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-styling",
      options: {
        sass: { implementation: require("sass") },
      },
    },
    "@storybook/addon-a11y",
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    config.resolve.extensions.push(".ts", ".tsx");

    // SASS;
    // config.module.rules.push({
    //   test: /\.s(a|c)ss$/,
    //   use: [
    //     "style-loader",
    //     {
    //       loader: "css-loader",
    //       options: {
    //         importLoaders: 1, // We always need to apply postcss-loader before css-loader
    //         modules: {
    //           auto: /\.module\.scss$/, // true
    //           localIdentName: "[name]__[local]--[hash:base64:5]",
    //         },
    //       },
    //     },
    //     {
    //       loader: "sass-loader",
    //       options: {
    //         implementation: require("sass"), // dart sass
    //         modules: {
    //           auto: /\.module\.scss$/, // true
    //           localIdentName: "[name]__[local]--[hash:base64:5]",
    //         },
    //       },
    //     },
    //   ],
    // });

    return config;
  },
};
export default config;
