/**
 * Downloads an audio file from an IPFS link or URL.
 * Progress reporting is opt-in so existing callers need no changes.
 *
 * @param ipfs_link - Audio URL to fetch
 * @param filename - Optional download filename
 * @param onProgress - Optional callback receiving progress (0-100)
 */
export const downloadAudio = async (
  ipfs_link: string,
  filename?: string,
  onProgress?: (progress: number) => void,
): Promise<void> => {
  try {
    const response = await fetch(ipfs_link);
    if (!response.ok) {
      throw new Error(`Failed to fetch audio: ${response.statusText}`);
    }

    let blob: Blob;
    if (onProgress && response.body) {
      const reader = response.body.getReader();
      const total = Number(response.headers.get("content-length"));
      const chunks: Uint8Array[] = [];
      let received = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
        received += value.byteLength;
        if (Number.isFinite(total) && total > 0) {
          onProgress(Math.min(99, Math.round((received / total) * 100)));
        }
      }

      const bytes = new Uint8Array(received);
      let offset = 0;
      for (const chunk of chunks) {
        bytes.set(chunk, offset);
        offset += chunk.byteLength;
      }
      blob = new Blob([bytes], {
        type: response.headers.get("content-type") || "application/octet-stream",
      });
    } else {
      blob = await response.blob();
    }

    const requestedName = filename || ipfs_link.split(/[?#]/)[0].split("/").pop();
    let finalFilename = requestedName || `audio-${Date.now()}`;
    if (!finalFilename.includes(".")) {
      const mime = blob.type.split(";")[0].toLowerCase();
      const extensions: Record<string, string> = {
        "audio/mpeg": "mp3",
        "audio/mp3": "mp3",
        "audio/wav": "wav",
        "audio/x-wav": "wav",
        "audio/ogg": "ogg",
        "audio/flac": "flac",
        "audio/mp4": "m4a",
        "audio/webm": "webm",
      };
      finalFilename += `.${extensions[mime] || "mp3"}`;
    }

    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = finalFilename;
    document.body.appendChild(link);
    try {
      link.click();
    } finally {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    }

    onProgress?.(100);
  } catch (error) {
    console.error("Error downloading audio:", error);
    throw new Error(
      `Failed to download audio: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};
