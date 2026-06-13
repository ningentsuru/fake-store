import type { UploadResponse } from '@/types'

export function useUpload() {
  const apiFetch = async (url: string, options: any) => {
    return await $fetch(url, options)
  }

  const uploadImage = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    return (await apiFetch('/api/storage/upload', {
      method: 'POST',
      body: formData
    })) as UploadResponse
  }

  const uploadDocument = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    return await apiFetch('/api/storage/upload/document', {
      method: 'POST',
      body: formData
    })
  }

  return { uploadImage, uploadDocument }
}
