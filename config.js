const path = require('path')
global.rootPath = path.normalize(path.join(__dirname, '..', '..'))

module.exports = {
    tangle_info_url: 'http://api.tangle.engineering/network',
    bind_address: '127.0.0.1',
    bind_port: 9317
}
