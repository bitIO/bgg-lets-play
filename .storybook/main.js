module.exports = {
  stories: ['../**/*.story.mdx', '../**/*.story.@(js|jsx|ts|tsx)'],
  addons: [
    'storybook-addon-actions',
    'storybook-addon-viewport',
    'storybook-addon-docs',
    'storybook-dark-mode',
    {
      name: 'storybook-addon-turbo-build',
      options: { optimizationLevel: 2 },
    },
    'storybook-addon-next-auth0',
  ],
  framework: '@storybook/react',
};
