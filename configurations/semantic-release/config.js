module.exports = {
  branches: [
    { name: 'master' },
    { name: 'next' },
    { name: 'pre/rc', channel: 'pre/rc', prerelease: 'rc' },
    { name: 'beta', channel: 'beta', prerelease: 'beta' },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/npm',
      {
        tarballDir: 'release',
      },
    ],
    // documentation https://github.com/semantic-release/github#readme
    [
      '@semantic-release/github',
      {
        assets: [
          { path: 'release/*.tgz' },
          { path: `lib/mapper.min.js*(.map)`, label: 'UMD build minified' },
          { path: `lib/mapper.pure.min.js*(.map)`, label: 'UMD build minified - without dependencies' }
        ],
      },
    ],
    [
      '@semantic-release/git',
      {
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
        assets: ['CHANGELOG.md', 'AUTHORS.md', 'package.json', 'yarn.lock', 'npm-shrinkwrap.json']
      },
    ],
  ],
};
