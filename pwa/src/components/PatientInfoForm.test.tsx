import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import PatientInfoForm from "./PatientInfoForm";

test("female-only div is only displayed if the sex is selected as female", () => {
    const femaleOnlyFormFields = [
        "pregnant",
        "LMP",
        "wants planning"
    ]

    render(<PatientInfoForm />);

    // ensure the female-only div is not displayed
    femaleOnlyFormFields.forEach((fieldText) => {
        let re = new RegExp(fieldText, 'gi');
        expect(screen.queryByText(re)).toBeNull();
    })

    // click the radio button for 'female'
    fireEvent.click(screen.getByText(/female/i))

    // ensure the female-only div is displayed
    femaleOnlyFormFields.forEach((fieldText) => {
        let re = new RegExp(fieldText, 'gi');
        expect(screen.getByText(re)).toBeInTheDocument();
    })
})


test("renders the Patient Info Form fields", () => {
    const formFields = [
        "First Name", 
        "Last Name", 
        "Nickname",
        "Town",
        "Sex",
        "Birth",
        "Age",
        "Phone",
        "Temp",
        "Pulse",
        "Weight",
        "Height",
        "Albendazole",
        "Alergies",
        "Medicines",
        "Exam"
    ];
    
    const { getByText } = render(<PatientInfoForm/>);


    formFields.forEach((fieldText) => {
        let re = new RegExp(fieldText, 'gi');
        expect(getByText(re)).toBeInTheDocument();
    })
})