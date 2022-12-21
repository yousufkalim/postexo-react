let baseUrl = 'http://localhost:5000/api';

if (window.location.host === 'postexo-dev.falconweb.app') {
  baseUrl = 'https://postexo-api-dev.falconweb.app/api';
} else if (window.location.host === 'postexo-qa.falconweb.app') {
  baseUrl = 'https://postexo-api-qa.falconweb.app/api';
} else if (window.location.host === 'postexo-staging.falconweb.app') {
  baseUrl = 'https://postexo-api-staging.falconweb.app/api';
} else if (window.location.host === 'postexo-prod.falconweb.app/') {
  baseUrl = 'https://postexo-api-prod.falconweb.app/api';
}

module.exports = { baseUrl };
