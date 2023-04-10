let baseUrl = 'https://postexo-api-dev.falconweb.app/api';
let mediaUrl = 'https://postexo-api-dev.falconweb.app';

if (window.location.host === 'postexo-dev.falconweb.app') {
  baseUrl = 'https://postexo-api-dev.falconweb.app/api';
  mediaUrl = 'https://postexo-api-dev.falconweb.app';
} else if (window.location.host === 'postexo-qa.falconweb.app') {
  baseUrl = 'https://postexo-api-qa.falconweb.app/api';
  mediaUrl = 'https://postexo-api-qa.falconweb.app';
} else if (window.location.host === 'postexo-staging.falconweb.app') {
  baseUrl = 'https://postexo-api-staging.falconweb.app/api';
  mediaUrl = 'https://postexo-api-staging.falconweb.app';
} else if (window.location.host === 'postexo-prod.falconweb.app/') {
  baseUrl = 'https://postexo-api-prod.falconweb.app/api';
  mediaUrl = 'https://postexo-api-prod.falconweb.app';
}

module.exports = { baseUrl, mediaUrl };
