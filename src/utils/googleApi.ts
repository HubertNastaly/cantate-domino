import { google } from 'googleapis'

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, GOOGLE_REFRESH_TOKEN } = process.env

export function getDriveInstance() {
  const client = new google.auth.OAuth2({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET, redirectUri: GOOGLE_REDIRECT_URI })
  client.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN
  })
  
  return google.drive({ version: 'v3', auth: client })
}
