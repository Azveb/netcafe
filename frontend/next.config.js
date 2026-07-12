const withNextIntl = require('next-intl/plugin')();

module.exports = withNextIntl({
  images: {
    domains: ['your-s3-bucket.s3.amazonaws.com'],
  },
});
