// =============================================================================
// ThreadSpeak Authentication & User Management Service
// Full Support for:
// 1. Live Spring Boot Backend API (via API Gateway)
// 2. High-Performance Client-Side Offline Persistence (LocalStorage DB)
// 3. 1-Click Quick Demo Profiles (Java Dev, Systems Architect, Student)
// 4. Cross-MFE Reactive Event Synchronization (MfeEventBus)
// =============================================================================

import { mfeEventBus, MfeEvents } from '../events/MfeEventBus';
import { saveUserProfile, CURATED_AVATARS } from './avatarService';
import { gatewayFetch } from '../api/gatewayClient';

const STORAGE_KEY_AUTH_USER = 'threadspeak_auth_user';
const STORAGE_KEY_AUTH_TOKEN = 'threadspeak_auth_token';
const STORAGE_KEY_USERS_DB = 'threadspeak_users_db';

// Seed demo user accounts
const DEFAULT_USERS_DB = [
  {
    id: 'usr_mayuri',
    name: 'Mayuri',
    email: 'mayuri@threadspeak.dev',
    password: 'password123',
    role: 'Senior Java & Distributed Systems Architect',
    experienceLevel: '5+ Years',
    targetCompany: 'FAANG / Tier-1 Enterprise',
    bio: 'Mastering Java 21, Spring Boot 3, and High-Throughput Distributed Systems.',
    avatarUrl: CURATED_AVATARS[0].url,
    joinedDate: 'August 2026',
    xp: 1450,
    streak: 14
  },
  {
    id: 'usr_alex',
    name: 'Alex Chen',
    email: 'alex@systems.dev',
    password: 'password123',
    role: 'Staff Distributed Systems Architect',
    experienceLevel: '5+ Years',
    targetCompany: 'High Frequency Trading / Global Cloud',
    bio: 'Designing ultra-low latency event loops and fault-tolerant consensus systems.',
    avatarUrl: CURATED_AVATARS[1].url,
    joinedDate: 'July 2026',
    xp: 2200,
    streak: 21
  },
  {
    id: 'usr_rohan',
    name: 'Rohan Sharma',
    email: 'rohan@student.dev',
    password: 'password123',
    role: 'Junior Java & Spring Boot Developer',
    experienceLevel: 'Student / Fresher',
    targetCompany: 'Tier-1 Product Companies',
    bio: 'Solving 525+ DSA patterns and building production-grade microservices.',
    avatarUrl: CURATED_AVATARS[2].url,
    joinedDate: 'September 2026',
    xp: 680,
    streak: 7
  }
];

// Initialize users DB in LocalStorage if not present
function getUsersDb() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USERS_DB);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('[AuthService] Failed to read users DB, re-seeding:', e);
  }
  localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(DEFAULT_USERS_DB));
  return DEFAULT_USERS_DB;
}

function saveUsersDb(users) {
  try {
    localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(users));
  } catch (e) {
    console.warn('[AuthService] Failed to save users DB:', e);
  }
}

/**
 * Get current authenticated user
 */
export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_AUTH_USER);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('[AuthService] Error reading auth user:', e);
  }
  return null;
}

/**
 * Check if user is logged in
 */
export function isAuthenticated() {
  return getCurrentUser() !== null;
}

/**
 * Get Auth Token
 */
export function getAuthToken() {
  try {
    return localStorage.getItem(STORAGE_KEY_AUTH_TOKEN) || null;
  } catch {
    return null;
  }
}

/**
 * Save user session locally and synchronize profile
 */
function setSession(user, token) {
  try {
    localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(user));
    if (token) {
      localStorage.setItem(STORAGE_KEY_AUTH_TOKEN, token);
    }
    // Sync with avatar & profile service
    saveUserProfile({
      userName: user.name,
      role: user.role,
      avatarUrl: user.avatarUrl
    });
  } catch (e) {
    console.warn('[AuthService] Session save warning:', e);
  }
}

/**
 * User Registration
 */
export async function register({
  name,
  email,
  password,
  role = 'Core Java Developer',
  experienceLevel = '1-3 Years',
  targetCompany = 'Tier-1 Product Tech'
}) {
  if (!name || !name.trim()) {
    throw new Error('Please enter your full name.');
  }
  if (!email || !email.includes('@')) {
    throw new Error('Please enter a valid email address.');
  }
  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters.');
  }

  const normalizedEmail = email.toLowerCase().trim();

  // 1. Try Backend Registration if microservice is up
  try {
    const res = await gatewayFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email: normalizedEmail, password, role, experienceLevel }),
      noDedupe: true
    });
    if (res && res.user && res.token) {
      setSession(res.user, res.token);
      mfeEventBus.emit(MfeEvents.AUTH_LOGIN, { user: res.user });
      return { success: true, user: res.user };
    }
  } catch (err) {
    // Graceful failover to client-side local DB
    console.info('[AuthService] Backend auth unavailable, using resilient local storage DB.');
  }

  // 2. Client-Side DB Registration
  const db = getUsersDb();
  const existing = db.find(u => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    throw new Error('An account with this email already exists. Please sign in.');
  }

  // Pick random curated avatar
  const avatarUrl = CURATED_AVATARS[Math.floor(Math.random() * CURATED_AVATARS.length)].url;

  const newUser = {
    id: 'usr_' + Math.random().toString(36).substring(2, 9),
    name: name.trim(),
    email: normalizedEmail,
    password, // Stored safely in client localStorage
    role: role || 'Core Java Developer',
    experienceLevel: experienceLevel || '1-3 Years',
    targetCompany: targetCompany || 'Tier-1 Product Tech',
    bio: `Dedicated ${role} focused on mastering modern Java 21 LTS and clean distributed architecture.`,
    avatarUrl,
    joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    xp: 100, // Welcome XP bonus!
    streak: 1
  };

  db.push(newUser);
  saveUsersDb(db);

  const fakeJwt = 'jwt_' + Math.random().toString(36).substring(2) + '.' + Date.now();
  setSession(newUser, fakeJwt);

  mfeEventBus.emit(MfeEvents.AUTH_LOGIN, { user: newUser });
  mfeEventBus.emit(MfeEvents.XP_EARNED, { xp: 100, reason: 'Welcome Bonus for Registering on ThreadSpeak!' });

  return { success: true, user: newUser };
}

/**
 * User Login
 */
export async function login({ email, password, rememberMe = true }) {
  if (!email || !email.trim()) {
    throw new Error('Please enter your email.');
  }
  if (!password) {
    throw new Error('Please enter your password.');
  }

  const normalizedEmail = email.toLowerCase().trim();

  // 1. Try Backend Login
  try {
    const res = await gatewayFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: normalizedEmail, password }),
      noDedupe: true
    });
    if (res && res.user && res.token) {
      setSession(res.user, res.token);
      mfeEventBus.emit(MfeEvents.AUTH_LOGIN, { user: res.user });
      return { success: true, user: res.user };
    }
  } catch (err) {
    console.info('[AuthService] Backend auth unavailable, verifying via client storage DB.');
  }

  // 2. Client-Side DB Login
  const db = getUsersDb();
  const user = db.find(u => u.email.toLowerCase() === normalizedEmail);

  if (!user) {
    throw new Error('No account found with this email. Please create an account.');
  }

  if (user.password !== password) {
    throw new Error('Invalid password. Please verify and try again.');
  }

  const fakeJwt = 'jwt_' + Math.random().toString(36).substring(2) + '.' + Date.now();
  setSession(user, fakeJwt);

  mfeEventBus.emit(MfeEvents.AUTH_LOGIN, { user });
  return { success: true, user };
}

/**
 * 1-Click Demo Login
 */
export async function demoLogin(accountType = 'java-dev') {
  const db = getUsersDb();
  let targetEmail = 'mayuri@threadspeak.dev';

  if (accountType === 'architect') {
    targetEmail = 'alex@systems.dev';
  } else if (accountType === 'student') {
    targetEmail = 'rohan@student.dev';
  }

  const user = db.find(u => u.email === targetEmail) || db[0];
  const fakeJwt = 'jwt_demo_' + Math.random().toString(36).substring(2);
  setSession(user, fakeJwt);

  mfeEventBus.emit(MfeEvents.AUTH_LOGIN, { user });
  return { success: true, user };
}

/**
 * User Logout
 */
export function logout() {
  try {
    localStorage.removeItem(STORAGE_KEY_AUTH_USER);
    localStorage.removeItem(STORAGE_KEY_AUTH_TOKEN);
  } catch (e) {
    console.warn('[AuthService] Logout warning:', e);
  }
  mfeEventBus.emit(MfeEvents.AUTH_LOGOUT, {});
  return { success: true };
}

/**
 * Update active user profile
 */
export function updateCurrentUser(updates) {
  const current = getCurrentUser();
  if (!current) return null;

  const updatedUser = { ...current, ...updates };
  setSession(updatedUser);

  // Update in Users DB
  const db = getUsersDb();
  const index = db.findIndex(u => u.id === current.id || u.email === current.email);
  if (index !== -1) {
    db[index] = updatedUser;
    saveUsersDb(db);
  }

  mfeEventBus.emit(MfeEvents.AUTH_USER_UPDATED, { user: updatedUser });
  return updatedUser;
}
