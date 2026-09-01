// =============================================================================
// API Gateway Client Base with Resilient Microservice Fallbacks
// Central HTTP dispatcher forwarding requests to backend microservices
// =============================================================================

const IS_LOCAL_DEV = typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

export const GATEWAY_BASE = IS_LOCAL_DEV
  ? 'http://localhost:8080/api'
  : '/api';

const SERVICE_FALLBACK_MAP = IS_LOCAL_DEV
  ? {
      '/topics': 'http://localhost:8081/api/topics',
      '/tracks': 'http://localhost:8081/api/tracks',
      '/system-design': 'http://localhost:8081/api/topics',
      '/progress': 'http://localhost:8082/api/progress',
      '/users': 'http://localhost:8082/api/users',
      '/quizzes': 'http://localhost:8083/api/quizzes',
      '/code': 'http://localhost:8084/api/code',
    }
  : {};

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

  const createSignal = () => {
    if (typeof AbortSignal !== 'undefined' && AbortSignal.timeout) {
      return AbortSignal.timeout(400);
    }
    return undefined;
  };

  try {
    const response = await fetch(gatewayUrl, {
      ...options,
      headers,
      signal: options.signal || createSignal()
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (gatewayErr) {
    // Fail fast
  }

  // Resilient Direct Service Fallback
  const directUrl = getDirectServiceUrl(cleanEndpoint);
  if (directUrl) {
    try {
      const directResponse = await fetch(directUrl, {
        ...options,
        headers,
        signal: options.signal || createSignal()
      });
      if (directResponse.ok) {
        return await directResponse.json();
      }
    } catch (directErr) {
      // Fail fast
    }
  }

  throw new Error(`[Gateway Client] All endpoints failed for ${endpoint}`);
}
