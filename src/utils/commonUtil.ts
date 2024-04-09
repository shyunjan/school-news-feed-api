export function getModuleFileName(fullFileName: string): string {
  const filenameMatch = /([^/\\]+?).(js|ts)$/.exec(fullFileName);
  return (filenameMatch && filenameMatch[1]) ?? "";
}

export default { getModuleFileName };
