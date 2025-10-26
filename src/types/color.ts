export interface ColorDto {
  id: string;
  name: string;
  hexCode: string; // #RGB or #RRGGBB
}

export interface CreateColorDto {
  id?: string; // optional for create, required for update
  name: string; // max 20
  hexCode: string; // /^#(?:[0-9a-fA-F]{3}){1,2}$/
}

export type ColorSort = 'name_asc' | 'name_desc';

export interface ColorFilter {
  name?: string;
  hexCode?: string;
}

export interface ColorSpecParams {
  pageNumber?: number; // default 1
  pageSize?: number; // default 6, max 50
  sort?: ColorSort; // default name_asc
  filter?: ColorFilter;
}

export interface Pagination<T> {
  pageNumber: number;
  pageSize: number;
  pageCount: number; // total items
  totalPages: number; // derived total pages
  data: T[];
}

export interface ApiEnvelope<T> {
  succeeded: boolean;
  statusCode: number;
  message: string;
  data: T;
  error?: string[];
  detail?: string;
}

