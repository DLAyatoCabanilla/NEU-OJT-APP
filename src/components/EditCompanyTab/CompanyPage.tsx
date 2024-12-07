import { useState } from "react";
import CompanyForm from "./CompanyForm"
import { Company } from "../../services/CompanyInterface/Company";
import CompanyList from "./CompanyList";
const CompanyPage: React.FC = () => {
  const [selectedCompany, setSelected] = useState<Company | null>(null);



  return (
    <div style={{ textAlign: 'center' }}>
      <h1> Edit Company </h1>
      <CompanyForm
        selectedCompany={selectedCompany}
      />

      <CompanyList onSelectedCompany={(company: Company) => setSelected} />
    </div>

  );

}

export default CompanyPage;
