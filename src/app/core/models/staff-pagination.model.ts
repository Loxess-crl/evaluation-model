export interface StaffPagination {
  totalItems: number;
  data: Staff[];
  totalPages: number;
  currentPage: number;
}

interface Staff {
  id: number;
  docente: string;
  evaluacion: number;
}
