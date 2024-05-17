export interface Factores {
  idevaluacion: number;
  seccion: null;
  curso: null;
  proposito: null;
  feeback: null;
  hora: null;
  idfactor: number;
  factor: string;
  recomendacion?: string;
  compromiso: null;
  indicadores: Indicador[];
}

export interface Indicador {
  idindicador: number;
  indicador: string;
  valores: Valor[];
  currentValor?: string;
}

export interface Valor {
  idvaloracion: number;
  valoracion: Valoracion;
  descripcion: string;
  valor: number;
  idescala: number;
  dato: number;
}

export enum Valoracion {
  PerformanceAchieved = 'Performance achieved',
  PerformanceInProcess = 'Performance in process',
  PriorToPerformanceConditions = 'Prior to performance conditions',
  StartupPerformance = 'Startup performance',
}
