export type NewsType = {
  id: number;
  newsTitle: string;
  newsParagraph: string;
  imageUrl: string;
  createdAt: Date;
};

export type ReviewType = {
  id: number;
  rating: number;
  reviewName: string;
  reviewText: string;
  reviewDate: string;
};
