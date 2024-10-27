import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "./dataCompression";
export type TimeStampData = {
  time: string; // xx:xx or xx:xx:xx
  title: string;
};
type MinifiedTimeStampData = {
  i: string;
  ts: {
    s: number;
    t: string;
  }[];
};
export const getYoutubeId = (url: string): string | null => {
  const videoId =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/.exec(
      url
    );

  if (videoId?.[1]) {
    return videoId[1];
  }

  return null;
};

export const getFormattedTime = (currentSec: number) => {
  const sec = Math.floor(currentSec);
  const min = Math.floor(sec / 60);
  const hour = Math.floor(min / 60);
  const formattedSec = sec % 60 > 9 ? sec % 60 : `0${sec % 60}`;
  const formattedMin = min % 60 > 9 ? min % 60 : `0${min % 60}`;
  if (hour === 0) {
    return `${formattedMin}:${formattedSec}`;
  }
  return `${hour}:${formattedMin}:${formattedSec}`;
};

// timeはxx:xx:xxまたはxx:xxの形式
const getSeparatedTime = (time: string) => {
  const splitted = time.split(":").map(Number);
  if (splitted.length === 2) {
    return [0, ...splitted];
  }
  return splitted;
};
export const getSeconds = (time: string) => {
  const [hour, min, sec] = getSeparatedTime(time);
  if (
    Number.isNaN(hour) ||
    Number.isNaN(min) ||
    Number.isNaN(sec) ||
    hour === undefined ||
    min === undefined ||
    sec === undefined
  ) {
    return null;
  }
  return hour * 3600 + min * 60 + sec;
};

export const sortByTime = (a: TimeStampData, b: TimeStampData) => {
  const converetedA = a.time.length === 5 ? `0:${a.time}` : a.time;
  const converetedB = b.time.length === 5 ? `0:${b.time}` : b.time;

  return converetedA.localeCompare(converetedB, undefined, { numeric: true });
};

const compressTimestampData = async (data: MinifiedTimeStampData) => {
  const compressed = await compressToEncodedURIComponent(JSON.stringify(data));
  return compressed;
};

export const decompressTimestampData = async (compressed: string) => {
  const decompressed = await decompressFromEncodedURIComponent(compressed);
  const minified = JSON.parse(decompressed) as MinifiedTimeStampData;
  if (!minified.i || !minified.ts) {
    throw new Error("URLが不正です");
  }
  const convertToTimeStampData = minified.ts.map(
    (t) =>
      ({
        time: getFormattedTime(t.s),
        title: t.t,
      } as TimeStampData)
  );
  return {
    id: minified.i,
    timestamps: convertToTimeStampData,
  };
};

export const generateShareUrl = async ({
  youtubeId,
  timestamps,
}: {
  youtubeId: string | null;
  timestamps: TimeStampData[];
}) => {
  if (!youtubeId) {
    return "";
  }
  const minifiedData = {
    i: youtubeId,
    ts: timestamps
      .filter((t) => !!t)
      .map((t) => ({ s: getSeconds(t.time) ?? 0, t: t.title })),
  };
  const compressed = await compressTimestampData(minifiedData);
  return `${window.location.origin}/?d=${compressed}`;
};
