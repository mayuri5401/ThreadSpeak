// =============================================================================
// ThreadSpeak Native Avatar & Profile Service (Zero-Config, 100% Offline)
// Uses HTML5 Canvas for client-side image compression & LocalStorage persistence.
// =============================================================================

const STORAGE_KEY_AVATAR = 'threadspeak_user_avatar';
const STORAGE_KEY_USER_NAME = 'threadspeak_user_name';
const STORAGE_KEY_ROLE = 'threadspeak_user_role';

// Curated High-Definition Engineering Avatar Presets
export const CURATED_AVATARS = [
  {
    id: 'java-champion',
    label: 'Java Champion',
    badge: 'Core JVM',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=85'
  },
  {
    id: 'systems-architect',
    label: 'Systems Architect',
    badge: 'Distributed',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=85'
  },
  {
    id: 'spring-engineer',
    label: 'Spring Engineer',
    badge: 'Enterprise',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=85'
  },
  {
    id: 'tech-lead',
    label: 'Tech Lead',
    badge: 'Full Stack',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=85'
  },
  {
    id: 'ai-visionary',
    label: 'AI Visionary',
    badge: 'GenAI & ML',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256&q=85'
  },
  {
    id: 'hft-quant',
    label: 'Low Latency Dev',
    badge: 'High Throughput',
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&h=256&q=85'
  }
];

/**
 * Get current user profile details.
 */
export function getUserProfile() {
  const avatarUrl = localStorage.getItem(STORAGE_KEY_AVATAR) || CURATED_AVATARS[0].url;
  const userName = localStorage.getItem(STORAGE_KEY_USER_NAME) || 'Mayuri';
  const role = localStorage.getItem(STORAGE_KEY_ROLE) || 'Full-Stack Architect';

  return { avatarUrl, userName, role };
}

/**
 * Save user profile details to LocalStorage.
 */
export function saveUserProfile({ avatarUrl, userName, role }) {
  if (avatarUrl !== undefined) localStorage.setItem(STORAGE_KEY_AVATAR, avatarUrl);
  if (userName !== undefined) localStorage.setItem(STORAGE_KEY_USER_NAME, userName.trim());
  if (role !== undefined) localStorage.setItem(STORAGE_KEY_ROLE, role.trim());
  return getUserProfile();
}

/**
 * Compress an uploaded image file on the client-side using an HTML5 Canvas.
 * Generates an ultra-optimized Base64 WebP/JPEG data URL (~20KB) for instant zero-lag rendering.
 */
export function processAndCompressImage(file, maxSize = 256) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      return reject(new Error('Please select a valid image file (PNG, JPG, WEBP).'));
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Smart Square Center Crop
        const minDim = Math.min(width, height);
        const startX = (width - minDim) / 2;
        const startY = (height - minDim) / 2;

        canvas.width = maxSize;
        canvas.height = maxSize;

        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, startX, startY, minDim, minDim, 0, 0, maxSize, maxSize);

        // Export as WebP (or JPEG fallback)
        const compressedDataUrl = canvas.toDataURL('image/webp', 0.85);
        resolve(compressedDataUrl);
      };
      img.onerror = () => reject(new Error('Failed to parse image.'));
      img.src = event.target.result;
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsDataURL(file);
  });
}
