import React from "react";
import { render} from "@testing-library/react";
import PatientInfoForm from "./PatientInfoForm";
/*
test("female-only div is only displayed if the sex is selected as female", async ()  => {
  const femaleOnlyFormFields = [
    "Pregnant",
    "LMP",
    "wants planning"
  ]

  // render(<PatientInfoForm />);
  const { getByText } = render(<PatientInfoForm />);

  // ensure the female-only div is not displayed
  femaleOnlyFormFields.forEach((fieldText) => {
    let re = new RegExp(fieldText, 'gi');
    expect(screen.queryByText(re)).toBeNull();
  })

  // click the radio button for 'female'
  fireEvent.click(screen.getByText(/Female/i));

  // ensure the female-only div is displayed
  femaleOnlyFormFields.forEach((fieldText) => {
    let re = new RegExp(fieldText, 'gi');
    expect(screen.getByText(re)).toBeInTheDocument();
  })
})
*/



test("renders the Patient Info Form fields", () => {
  const formFields = [
    "First Name",
    "First Name",
    "Last Name",
    "Last Name",
    "Sex",
    "Birth",
    "Age",
    "Phone",
    "Town",
    "Visit",
    "Nickname",
    "BP",
    "Temp",
    "Pulse",
    "Weight",
    "Height",
    "Z-Score",
    "Albendazole",
    "Alergies",
    "Medicines",
    "Chief Complaint",
    "History",
    "Exam"
  ];

  const { getByText } = render(<PatientInfoForm />);


  formFields.forEach((fieldText) => {
    let re = new RegExp(fieldText, 'gi');
    expect(getByText(re)).toBeInTheDocument();
  })
})