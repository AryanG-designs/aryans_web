export type Video = {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  /** A YouTube, Vimeo, or other shareable video link. */
  videoUrl: string;
  /** A directly uploaded video file (Blob URL) -- enables real browser Picture-in-Picture. */
  videoFile?: string;
};

export const seedVideos: Video[] = [];
