interface TaxProfile {
  id?: number;
  name: string;
  rfc: string;
  taxRegimeCode: string;
  invoices?: {
    id: number;
    name: string;
  }[];
}

export default TaxProfile;
