// =============================================================================
// API Gateway Client Base with Resilient Microservice Fallbacks & HLD Optimizations
// Features:
// 1. Adaptive Endpoint Timeouts (Longer for code execution sandbox, fast for metadata)
// 2. In-Flight Request Deduplication (Coalesces concurrent identical GET calls)
// 3. Distributed Tracing (Generates & forwards X-Correlation-Id)
// 4. Multi-Tier Direct Service Failover
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

// In-flight promise deduplication map for GET requests
const inFlightRequests = new Map();

function getDirectServiceUrl(endpoint) {
  for (const [prefix, directBase] of Object.entries(SERVICE_FALLBACK_MAP)) {
    if (endpoint.startsWith(prefix)) {
      const rest = endpoint.substring(prefix.length);
      return `${directBase}${rest}`;
    }
  }
  return null;
}

function getTimeoutForEndpoint(endpoint) {
  if (endpoint.includes('/code') || endpoint.includes('/simulators')) {
    return 12000; // 12 seconds for Java code compilation & execution
  }
  return 3500; // 3.5 seconds for standard REST queries
}

function generateCorrelationId() {
  return 'req-' + Math.random().toString(36).substring(2, 9) + '-' + Date.now().toString(36);
}

export async function gatewayFetch(endpoint, options = {}) {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const method = (options.method || 'GET').toUpperCase();

  // Deduplicate identical in-flight GET requests
  if (method === 'GET' && !options.noDedupe) {
    const dedupeKey = `${cleanEndpoint}`;
    if (inFlightRequests.has(dedupeKey)) {
      return inFlightRequests.get(dedupeKey);
    }
    const promise = executeGatewayFetch(cleanEndpoint, options)
      .finally(() => {
        inFlightRequests.delete(dedupeKey);
      });
    inFlightRequests.set(dedupeKey, promise);
    return promise;
  }

  return executeGatewayFetch(cleanEndpoint, options);
}

async function executeGatewayFetch(cleanEndpoint, options = {}) {
  const gatewayUrl = `${GATEWAY_BASE}${cleanEndpoint}`;
  const timeoutMs = options.timeout || getTimeoutForEndpoint(cleanEndpoint);
  const correlationId = options.correlationId || generateCorrelationId();

  const headers = {
    'Content-Type': 'application/json',
    'X-Correlation-Id': correlationId,
    ...(options.headers || {})
  };

  const createSignal = (ms) => {
    if (typeof AbortSignal !== 'undefined' && AbortSignal.timeout) {
      return AbortSignal.timeout(ms);
    }
    return undefined;
  };

  // 1. Try Primary API Gateway
  try {
    const response = await fetch(gatewayUrl, {
      ...options,
      headers,
      signal: options.signal || createSignal(timeoutMs)
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (gatewayErr) {
    // Gateway offline or timed out, attempt direct service fallback
  }

  // 2. Resilient Direct Microservice Fallback (Dev/Local)
  const directUrl = getDirectServiceUrl(cleanEndpoint);
  if (directUrl) {
    try {
      const directResponse = await fetch(directUrl, {
        ...options,
        headers,
        signal: options.signal || createSignal(timeoutMs)
      });
      if (directResponse.ok) {
        return await directResponse.json();
      }
    } catch (directErr) {
      // Direct service offline
    }
  }

  throw new Error(`[Gateway Client] All endpoints failed for ${cleanEndpoint}`);
}
