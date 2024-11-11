export interface LabelState {
  labels: Label[];
  loading: boolean;
  error: string | null;
}

export interface Label {
  _id: string;
  name?: string;
  color?: string;
  userId?: string;
  createdAt?: string;
}

export interface CreateLabelDto {
  name: string;
  color: string;
}

export interface FetchLabelsResponse {
  labels: Label[];
  totalLabels: number;
  totalPages: number;
  currentPage: number;
}