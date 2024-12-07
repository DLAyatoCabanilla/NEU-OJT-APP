import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { addDoc, collection, collectionGroup, doc, getDocs, limit, orderBy, query, updateDoc } from "firebase/firestore";
import { Company } from "../../services/CompanyInterface/Company";
import { error } from "console";

interface Props {
  selectedCompany: Company | null;
}

const CompanyForm: React.FC<Props> = ({ selectedCompany }) => {
  const [CompanyName, setCompanyName] = useState("");
  const [CompanyAddress, setAddress] = useState("");
  const [RoleInCompany, setRole] = useState("");
  const [Mode, setMode] = useState("");
  const [RemainingSlot, setSlot] = useState(0);
  const [RegisterdStudents, setRegistered] = useState(0);

  //Set the company into runtime variable?
  useEffect(() => {
    if (selectedCompany) {
      setCompanyName(selectedCompany.CompanyName);
      setAddress(selectedCompany.CompanyAddress);
      setRole(selectedCompany.RoleInCompany);
      setMode(selectedCompany.Mode);
      setSlot(selectedCompany.RemainingSlot);
      setRegistered(selectedCompany.RegisterdStudents);
    }
  }, [selectedCompany]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (selectedCompany && selectedCompany.CompanyName) {
        const companyRef = doc(db, "companies", selectedCompany.CompanyName);
        await updateDoc(companyRef, { CompanyName, CompanyAddress, RoleInCompany, Mode, RemainingSlot, RegisterdStudents });
        console.log("update succesfully" + selectedCompany.CompanyName)
      } else {
        await addDoc(collection(db, "companies"), { CompanyName, CompanyAddress, RoleInCompany, Mode, RemainingSlot, RegisterdStudents })
        console.log("add succesfully" + CompanyName)
      }
    } catch (error) {
      console.error("Something is wrong in database");
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Company Name</h2>
      <input
        type="text"
        placeholder="Input Name"
        value={CompanyName}
        onChange={(e) => setCompanyName(e.target.value)}
        required
      />
      <h2>Company Address</h2>
      <input
        type="text"
        placeholder="input string"
        value={CompanyAddress}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <h2>Role in Company</h2>
      <input
        type="text"
        placeholder="Role"
        value={RoleInCompany}
        onChange={(e) => setRole(e.target.value)}
        required
      />
      <h2>Work Status</h2>
      <select value={Mode} onChange={(e) => setMode(e.target.value)}>
        <option value="WFH">Work From Home</option>
        <option value="OnPrem">OnSite </option>
        <option value="HYBRID">Hybrid (OnSite and Work From Home)</option>
      </select >
      <h2>Remaining Slots </h2>
      <input
        type="number"
        placeholder="Number of Slots"
        value={RemainingSlot}
        onChange={(e) => setSlot(Number(e.target.value))}
      />


      <button type="submit">{selectedCompany ? "Update" : "Add"} Company </button>
    </form>
  )


}

export default CompanyForm;
