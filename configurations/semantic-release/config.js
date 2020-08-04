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
        assets: [{ path: 'release/*.tgz' }, { path: `lib/dot.min.js*(.map)`, label: 'UMD build minified' }],
      },
    ],
    [
      '@semantic-release/git',
      {
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
        assets: ['CHANGELOG.md', 'package.json', 'yarn.lock', 'npm-shrinkwrap.json']
      },
    ],
  ],
};
