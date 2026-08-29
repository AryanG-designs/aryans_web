export type Video = {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  /** A YouTube, Vimeo, or other shareable video link. */
  videoUrl: string;
};

export const seedVideos: Video[] = [];
