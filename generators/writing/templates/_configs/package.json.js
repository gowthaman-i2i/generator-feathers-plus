const semver = require('semver');

module.exports = function(generator) {
  const major = semver.major(process.version);
  const { props, _specs: specs } = generator;
  const [ packager, version ] = specs.app.packager.split('@');

  const pkg = {
    name: specs.app.name,
    description: specs.app.description,
    version: '0.0.0',
    homepage: '',
    main: specs.app.src,
    keywords: [
      'feathers'
    ],
    author: {
      name: (specs.overrides || {}).authorName || generator.user.git.name(),
      email: (specs.overrides || {}).authorEmail || generator.user.git.email()
    },
    contributors: [],
    bugs: {},
    directories: {
      lib: specs.app.src,
      test: 'test/',
      // config: specs.app.config || 'config'
    },
    engines: {
      node: `^${major}.0.0`,
      [packager]: version
    },
    scripts: {}
  };

  pkg.scripts = Object.assign(pkg.scripts, specs.options.ts ? {
    test: `${packager} run tslint && npm run mocha`,
    'test:all': `${packager} run tslint && NODE_ENV= npm run mocha`,
    tslint: 'tslint -p tsconfig.json -c tslint.json && tslint -p tsconfig.test.json -c tslint.json',
    start: `ts-node --files ${specs.app.src}/`,
    'start:seed': 'NODE_ENV= ts-node --seed --files src/',
    mocha: 'ts-mocha -p tsconfig.test.json "test/**/*.test.ts" --timeout 10000 --exit',
    compile: 'tsc -p tsconfig.json',
  } : {
    test: `${packager} run eslint && ${packager} run mocha`,
    'test:all': `${packager} run eslint && NODE_ENV= npm run mocha`,
    eslint: `eslint ${specs.app.src}/. test/. --config .eslintrc.json`,
    dev: `nodemon ${specs.app.src}/`,
    start: `node ${specs.app.src}/`,
    'start:seed': 'NODE_ENV= node src/ --seed',
    mocha: 'mocha test/ --recursive --exit --timeout 10000'
  });

  return pkg;
};
