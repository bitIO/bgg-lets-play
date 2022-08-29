const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

module.exports = {
  '*.{js,jsx,ts,tsx}': ['prettier --write', buildEslintCommand],
  '*.{png,jpeg,jpg,gif,svg}': 'imagemin-lint-staged',
  '*.css': 'stylelint',
  '*.md': 'markdownlint --fix --ignore CHANGELOG.md',
  '*.scss': ['postcss --config path/to/your/config --replace', 'stylelint'],
  '*': 'cspell --no-summary --no-progress',
};
