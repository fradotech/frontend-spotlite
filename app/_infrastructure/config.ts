
const host = process.env.SERVER_HOST || 'https://spotlite.onrender.com'
const prefix = process.env.APP_PREFIX || '/api/v1'

export const config = {
  server: {
    nodeEnv: process.env.NODE_ENV || 'local',
    prefix: prefix,
    host,
    hostApi: `${host}${prefix}`,
  },
}
