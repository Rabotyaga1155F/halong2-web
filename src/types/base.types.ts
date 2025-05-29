export type NewsType = {
  id: number;
  news_title: string;
  news_paragraph: string;
  image_url: string;
  created_at: Date;
};

export type ReviewType = {
  id: number;
  rating: number;
  review_name: string;
  review_text: string;
  created_at: string;
};
