import { User } from './User';

export interface Plans {
  id: string;
  createdAt: Date;
  share: boolean;
  userId: string;
  plans: Plan[];
  owner?: User;
  title: string;
}

export interface Plan {
  id: string;
  place_id: string;
  latitude: number;
  longitude: number;
  place_phone: string;
  place_category_group_name: string;
  place_address: string;
  place_name: string;
  planId: string;
  owner: User
  plan?: Plans
  planImage?: PlainImage[]
}

export interface PlainImage {
  id: string;
  planId: string;
  imageUrl: string;
}

export interface UserPlans {
  plans: Plans[];
  owner: User;
}
