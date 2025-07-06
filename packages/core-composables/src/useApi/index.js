import { isFilled } from '@tech-labs/core-utils'
import { reactive } from 'vue'

const STATUS = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  FAILED: 'FAILED',
  SUCCESS: 'SUCCESS',
}

export default ({ resource } = {}) => {
  return reactive(new ApiComposable(resource))
}

class ApiComposable {
  constructor (resource = async () => {}) {
    this.resource = resource

    this.reset()
  }

  reset () {
    this.status = STATUS.IDLE
    this.response = undefined
    this.retried = false
    this.data = undefined
    this.nextPage = null
    this.currentPage = null
    this.totalPages = undefined
    this.totalCount = undefined
    this.paginationSize = undefined
    this.currentPageStart = undefined
    this.currentPageEnd = undefined
  }

  get isLoading () { return this.status === STATUS.LOADING }
  get isSuccess () { return this.status === STATUS.SUCCESS }
  get isFailed () { return this.status === STATUS.FAILED }

  get isPending () { return (this.status === STATUS.IDLE || this.status === STATUS.LOADING) }
  get isEmpty () { return this.isSuccess && !isFilled(this.data) }

  async load (payload) {
    try {
      const alreadyCalled = ![STATUS.IDLE, STATUS.FAILED].includes(this.status)

      !alreadyCalled
        ? await this._fetchData(payload)
        : await this._waitAlreadyCalled()
    } catch (error) {
      return Promise.reject(error)
    }

    return this
  }

  async run (payload) {
    try {
      await this._fetchData(payload)
    } catch (error) {
      return Promise.reject(error)
    }

    return this
  }

  async page ({ payload, page }) {
    try {
      await this._fetchData({ ...payload, page })
    } catch (error) {
      return Promise.reject(error)
    }

    return this
  }

  async next (payload) {
    try {
      if (this.nextPage !== null) {
        const pageData = await this._fetchData({ ...payload, page: this.nextPage }, { override: false })

        this.data = this.data
          ? [...this.data, ...pageData]
          : pageData
      }
    } catch (error) {
      return Promise.reject(error)
    }

    return this
  }

  async _fetchData (payload = {}, { override = true } = {}) {
    this.status = STATUS.LOADING

    try {
      this.response = await this.resource(payload)

      if (!!this.response && typeof this.response === 'object' && 'pagination' in this.response) {
        this.paginationSize = this.response.pagination.size
        this.currentPage = this.response.pagination.page
        this.totalPages = this.response.pagination.pages
        this.totalCount = this.response.pagination.total
        this.nextPage = this.currentPage === this.totalPages
          ? null
          : this.currentPage + 1
        this.currentPageStart = ((this.currentPage - 1) * this.paginationSize) + 1
        this.currentPageEnd = this.currentPage * this.paginationSize
        this.status = STATUS.SUCCESS

        if (override) {
          this.data = this.response.data
        }

        return this.response.data
      } else {
        this.status = STATUS.SUCCESS
        this.data = this.response

        return this.response
      }
    } catch (error) {
      const unauthorizedCode = error?.status === 401
      const tokenExpiredError = error?.data?.detail?.code === 'token_expired' && unauthorizedCode

      if (tokenExpiredError && !this.retried) {
        this.retried = true
        return await this._fetchData(payload)
      } else {
        this.response = error
        this.status = STATUS.FAILED

        return Promise.reject(error)
      }
    }
  }

  async _waitAlreadyCalled () {
    while (![STATUS.SUCCESS, STATUS.FAILED].includes(this.status)) {
      await new Promise(resolve => setTimeout(resolve, 20))
    }
  }
}
