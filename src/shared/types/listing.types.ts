// src/shared/types/listing.types.ts
import type { Currency, ListingLanguage, ListingStatus, Platform, PropertyType } from '../enums';

export interface PropertyData {
  type: PropertyType;
  address: string;
  district: string;
  postalCode: string;
  sizeSqft: number;
  price: number;
  currency: Currency;
  bedrooms: number;
  bathrooms: number;
  nearestMrt: string;
  walkingMinutes: number;
  highlights: string[];
  availableDate: string;
  language: ListingLanguage;
}

export type GeneratedContent = Partial<Record<Platform, string>>;

export interface Listing {
  id: string;
  userId: string;
  teamId?: string;
  status: ListingStatus;
  statusLabel: string;
  propertyData: PropertyData;
  generatedContent: GeneratedContent;
  version: number;
  createdAt: string;
  updatedAt: string;
  archivedAt?: string;
}

export interface CreateListingInput {
  propertyData: PropertyData;
}

export interface UpdateListingInput {
  propertyData?: Partial<PropertyData>;
  generatedContent?: GeneratedContent;
}
