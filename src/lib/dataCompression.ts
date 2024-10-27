// thanks: https://zenn.dev/chot/articles/lz-string-vs-compression-stream

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

enum ProsessType {
  compress = "compress",
  decompress = "decompress",
}

const getResponse = async (value: Uint8Array, streamType: ProsessType) => {
  const readableStream = new ReadableStream({
    start(controller) {
      controller.enqueue(value);
      controller.close();
    },
  });

  const stream =
    streamType === ProsessType.compress
      ? new CompressionStream("deflate")
      : new DecompressionStream("deflate");

  const response = await new Response(
    readableStream.pipeThrough(stream)
  ).arrayBuffer();

  return response;
};

export async function compressToBase64(input: string): Promise<string> {
  const value = textEncoder.encode(input);
  const compressed = await getResponse(value, ProsessType.compress);
  return btoa(
    new Uint8Array(compressed).reduce(
      (acc, c) => acc + String.fromCharCode(c),
      ""
    )
  );
}

export async function decompressFromBase64(input: string): Promise<string> {
  const value = Uint8Array.from(atob(input), (c) => c.charCodeAt(0));
  const decompressed = await getResponse(value, ProsessType.decompress);
  return textDecoder.decode(decompressed);
}

export async function compressToEncodedURIComponent(
  input: string
): Promise<string> {
  const withBase64 = await compressToBase64(input);
  return withBase64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function decompressFromEncodedURIComponent(
  input: string
): Promise<string> {
  let base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return decompressFromBase64(base64);
}
