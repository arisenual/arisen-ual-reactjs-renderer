import { Authenticator } from '@arisenual/core'

const PeepsIdJS = {
  peepsid: {
    connect: (appName) => {
      if (appName === 'My Working App') {
        return true
      }
      return Promise.resolve(false)
    },
  },
}

const peepsid = {
  logout: () => {},
}

class UALPeepsAuthError {
  constructor(message, type, error) {
    this.message = message
    this.type = type
    this.error = error
    this.source = 'PeepsID'
  }
}

class PeepsAuthUser {
  constructor(chain, peepsid) {
    this.chain = chain
    this.peepsid = peepsid
  }

  getKeys() {
    if (this.peepsid) {
      return Promise.resolve('keys!')
    }
    throw new Error()
  }
}

export class PeepsID extends Authenticator {
  constructor(chains, options = { appName: '' }) {
    super(chains)
    this.appName = options.appName
    this.peepsidIsLoading = false
    this.initError = null
    this.peepsid = false
  }

  async init() {
    this.peepsidIsLoading = false
    if (!await PeepsIdJS.peepsid.connect(this.appName)) {
      this.initError = new UALPeepsAuthError('Error occurred while connecting',
        'initialization',
        null)

      this.peepsidIsLoading = false

      return
    }
    this.peepsid = peepsid
    this.peepsidIsLoading = false
  }

  isLoading() {
    return false
  }

  isErrored() {
    return !!this.initError
  }

  getError() {
    return this.initError
  }

  getStyle() {
    return {
      icon: 'logo',
      text: 'PeepsID',
      textColor: 'white',
      background: '#62D0FD',
    }
  }

  shouldRender() {
    return true
  }

  shouldAutoLogin() {
    return false
  }

  requiresGetKeyConfirmation() {
    return false
  }

  async login() {
    try {
      for (const chain of this.chains) {
        const user = new PeepsAuthUser(chain, this.peepsid)
        await user.getKeys()
        this.users.push(user)
      }

      return this.users
    } catch (e) {
      throw new UALPeepsAuthError(
        'Unable to login',
        'login',
        e,
      )
    }
  }

  async logout() {
    try {
      this.peepsid.logout()
    } catch (error) {
      throw new UALPeepsAuthError('Error occurred during logout',
        'logout',
        error)
    }
  }

  async shouldRequestAccountName() {
    return true
  }

  getName() {
    return 'peepsid'
  }
}
