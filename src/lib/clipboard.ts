export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

export const autoClearClipboard = (timeout: number = 15000) => {
  setTimeout(() => {
    navigator.clipboard.writeText('');
  }, timeout);
};