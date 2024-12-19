export default function useAssets(path: string = '') {
  const ext = path.match(/\.[^.]+$/)?.[0] ?? ''
  const assets =
    ext === '.svg'
      ? import.meta.glob(`~/assets/images/**/*.svg`, { eager: true })
      : ext === '.png'
      ? import.meta.glob(`~/assets/images/**/*.png`, { eager: true })
      : import.meta.glob(`~/assets/images/**/*.jpg`, { eager: true })
  const fullpath = `/assets/images/${path}`
  if (!assets[fullpath]) return fullpath
  const imageSrc = (assets[fullpath] as Record<string, any>).default
  return imageSrc
}
