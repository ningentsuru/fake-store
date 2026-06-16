import { requireAuth } from '@/../server/utils/auth'
import { uploadStorageFile } from '@/../server/utils/storage'

export default eventHandler(async (event) => {
  await requireAuth(event)

  const form = await readFormData(event)
  const file = form.get('file')
  return uploadStorageFile(file)
})
