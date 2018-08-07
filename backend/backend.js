
const SentryCli = require('@sentry/cli');
const cli = new SentryCli();
cli.releases.uploadSourceMaps('RELEASE_VERSION_2', {
    include: ['build']
});

