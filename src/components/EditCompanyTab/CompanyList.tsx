import React, { useEffect } from "react";
import { Company } from "../../services/CompanyInterface/Company"
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

interface Props {
  onSelectedCompany: (company: Company) => void;
}
const CompanyList: React.FC<Props> = ({ onSelectedCompany }) => {
  const [companies, setCompanies] = React.useState<Company[]>([]);

  React.useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "companies"), (snapshot) => {
      const companyData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Company, 'id'>), // Type-safe mapping
      })) as Company[];
      setCompanies(companyData);
    });

    return () => unsubscribe(); // Clean up listener
  }, []);

  // Delete a company document
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "companies", id));
      console.log(`Company with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting company: ", error);
    }
  };

  return (
    <div>
      <h2>Company list</h2>
      <ul>
        {companies.length > 0 ? (
          companies.map((company) => (
            <li key={company.CompanyName}>
              <span>
                <strong>{company.CompanyName}</strong> - {company.CompanyAddress}
              </span>
              <button onClick={() => onSelectedCompany(company)}>Edit</button>
              <button onClick={() => handleDelete(company.id)}>
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No companies available.</p>
        )}
      </ul>
    </div>
  )

}

export default CompanyList;
