export type BlogType = "video" | "article";

export type BlogPreview = {
  id: string;
  title: string;
  url: string;
  platform: string;
  type: BlogType;
  date: string;
  thumbnail: string;
};
