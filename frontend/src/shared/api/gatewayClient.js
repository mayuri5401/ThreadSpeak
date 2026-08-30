// =============================================================================
// API Gateway Client Base with Resilient Microservice Fallbacks
// Central HTTP dispatcher forwarding requests to backend microservices
// =============================================================================

export const GATEWAY_BASE = 'http://localhost:8080/api';

const SERVICE_FALLBACK_MAP = {
  '/topics': 'http://localhost:8081/api/topics',
  '/tracks': 'http://localhost:8081/api/tracks',
  '/system-design': 'http://localhost:8081/api/topics',
  '/progress': 'http://localhost:8082/api/progress',
  '/users': 'http://localhost:8082/api/users',
  '/quizzes': 'http://localhost:8083/api/quizzes',
  '/code': 'http://localhost:8084/api/code',
};

function getDirectServiceUrl(endpoint) {
  for (const [prefix, directBase] of Object.entries(SERVICE_FALLBACK_MAP)) {
    if (endpoint.startsWith(prefix)) {
      const rest = endpoint.substring(prefix.length);
      return `${directBase}${rest}`;
    }
  }
  return null;
}

export async function gatewayFetch(endpoint, options = {}) {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const gatewayUrl = `${GATEWAY_BASE}${cleanEndpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  try {
    const response = await fetch(gatewayUrl, {
      ...options,
      headers
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (gatewayErr) {
    console.warn(`[Gateway Client] Gateway error on ${gatewayUrl}:`, gatewayErr.message);
  }

  // Resilient Direct Service Fallback
  const directUrl = getDirectServiceUrl(cleanEndpoint);
  if (directUrl) {
    try {
      const directResponse = await fetch(directUrl, {
        ...options,
        headers
      });
      if (directResponse.ok) {
        return await directResponse.json();
      }
    } catch (directErr) {
      console.warn(`[Gateway Client] Direct service fallback failed on ${directUrl}:`, directErr.message);
    }
  }

  throw new Error(`[Gateway Client] All endpoints failed for ${endpoint}`);
}
