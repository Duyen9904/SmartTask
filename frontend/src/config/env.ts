const readEnv = (key: string, fallback = ''): string => {
  const value = import.meta.env[key]
  return typeof value === 'string' ? value : fallback
}

export const env = {
  apiBaseUrl: readEnv('VITE_API_BASE_URL', 'http://localhost:8080'),
  apiVersion: readEnv('VITE_API_VERSION', 'v1'),
  appName: readEnv('VITE_APP_NAME', 'SmartTask'),
} as const
