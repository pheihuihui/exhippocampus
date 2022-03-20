export const CONF_SERVER = {
    CONNSTR_NODE: 'mongodb://pheihuihui.local:27017/?readPreference=primary&directConnection=true&ssl=false'
} as const

export const CONF_CLIENT = {
    SERVER: '127.0.0.1:30000',
    CONNSTR_BROWSER: 'http://localhost:28017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
} as const
