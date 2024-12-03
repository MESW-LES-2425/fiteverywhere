import { Dispatch, SetStateAction } from "react";

interface User {
  username: string;
  role: "gym_manager" | "client" | "personal_trainer";
  email: string;
}

interface Client extends User {
  workoutsPerWeek: number;
  preferredTime: string;
  role: "client";
}

interface GymManager extends User {
  role: "gym_manager";
  linkedGyms: Gym[];
}

interface PersonalTrainer extends User {
  linkedGym: string;
  role: "personal_trainer";
}

type UserOptions = Client | GymManager | PersonalTrainer;

interface UseFetchUserResult {
  isAuthenticated: boolean;
  user: UserOptions | null;
  error: string | null;
  logout: () => void;
}

interface Event {
  id: string;
  summary: string;
  start: { dateTime: string };
  end: { dateTime: string };
  location?: string;
}

interface UseFetchEventsResult {
  events: Event[];
  loading: boolean;
  error: string | null;
}

interface Gym {
  id: number;
  name: string;
  dailyFee: number;
  latitude: number;
  longitude: number;
  distance?: number;
  tags?: GymSpec;
}

interface GymSpec {
  addrCity?: string;
  addrHouseNumber?: string;
  addrPostcode?: string;
  addrStreet?: string;
  phone?: string;
  website?: string;
  openingHours?: string;
}

interface GymResponse {
  id: number;
  tags: {
    name: string;
  };
  lat: number;
  lon: number;
}

interface GymsProps {
  error: string | null;
  gyms: Gym[];
  loading: boolean;
  onSelectGym?: Dispatch<SetStateAction<Gym | undefined>>;
}

export type {
  Client,
  Event,
  Gym,
  GymManager,
  GymResponse,
  GymsProps,
  PersonalTrainer,
  UseFetchEventsResult,
  UseFetchUserResult,
  User,
  UserOptions
};

