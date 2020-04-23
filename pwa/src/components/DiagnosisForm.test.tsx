import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DiagnosisForm from "./DiagnosisForm";

test("renders the form", async () => {
    const dom = render(<DiagnosisForm />);
    expect(dom.getByTestId("diagnosis-form-wrapper")).toBeTruthy();
  });