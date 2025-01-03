import { Client } from 'ssh2'
import { readFileSync } from 'fs'

function getConnectionConfig(data: any) {
  let config = {
    host: data.host,
    port: data.port,
    username: data.username,
    password: '',
    privateKey: '',
  }
  if (data.auth_type === 'password') {
    config.password = data.password
  }

  if (data.auth_type === 'key') {
    config.privateKey = readFileSync(data.key, 'utf8')
  }

  return config
}

export default {
  connect(event: any, data: any) {
    const conn = new Client()
    conn
      .on('ready', () => {
        event.reply('ssh.connect.reply', {
          connected: true,
          data: data,
        })
      })
      .on('close', () => {
        event.reply('ssh.connect.reply', {
          connected: false,
          data: data,
        })
      })
      .connect(getConnectionConfig(data))
  },
}
