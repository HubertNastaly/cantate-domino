import { useState } from "react";

const COPY_TIMEOUT = 5000

export function useCopyToClipboard(text: string) {
  const [isCopied, setIsCopied] = useState(false)

  async function copyToClipboard() {
    await copyTextToClipboard(text)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), COPY_TIMEOUT)
  }

  return { copyToClipboard, isCopied }
}

async function copyTextToClipboard(text: string) {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand('copy', true, text);
  }
}
