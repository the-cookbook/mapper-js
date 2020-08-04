const { name } = require('../package.json');
const { exec } = require('child_process');

const scripts = `echo '### ${name} is authored by: \n\n'
  > AUTHORS.md
  | git log --format='* %aN <%aE>'
  | sort -u >> AUTHORS.md`;

exec(scripts.replace(/\n/gi, ''), function (err, stdout) {
  if (err) {
    console.error(err);
    return;
  }

  console.log(stdout);
});
