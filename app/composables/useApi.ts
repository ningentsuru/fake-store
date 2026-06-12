import type { UserPayload } from '@/types'

export function useApi() {
  const apiFetch = async (url: string, options: object) => {
    return await $fetch(url, options)
  }

  const authLogin = async (body: UserPayload) => {
    return await apiFetch('/api/auth/login', {
      method: 'post',
      body
    })
  }

  const authSignup = async (body: UserPayload) => {
    try {
      const data = await apiFetch('/api/auth/signup', {
        method: 'post',
        body
      })

      if (data.success) {
        return authLogin(body)
      }

      return null
    } catch (error) {
      return error?.response?.statusText ?? 'An unknown error occurred.'
    }
  }

  const authMe = async () => {
    try {
      return await apiFetch('/api/auth/me', {
        method: 'get'
      })
    } catch (error) {
      return error?.response?.statusText ?? 'An unknown error occurred.'
    }
  }

  const authLogout = async () => {
    try {
      return await apiFetch('/api/auth/logout', {
        method: 'post'
      })
    } catch (error) {
      return error?.response?.statusText ?? 'An unknown error occurred.'
    }
  }

  return { authLogin, authSignup, authMe, authLogout }
}
