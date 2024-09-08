export function getPathWithoutQuery(url: string): string {
  const path = url.split('?')[0] // 去掉查询参数
  const parts = path.split('/').filter((part) => part) // 分割路径并移除空白部分
  return `${parts[parts.length - 2]}/${parts[parts.length - 1]}` // 返回最后两个部分
}
