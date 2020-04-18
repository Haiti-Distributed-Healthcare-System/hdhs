import React, { ReactElement, useState } from "react";
import {
  InputItem,
  List,
  TextareaItem,
  Button,
  Radio,
  WhiteSpace,
} from "antd-mobile";
import "../scss/PatientInfoForm.scss";

const RadioItem = Radio.RadioItem;

export default function Form(): ReactElement {
  // State Hooks for Radio Buttons
  // useState returns a value, and a function to set that value
  const [sex, setSex] = useState(null as Number); // Default: null
  const [albendazole, setAlbendazole] = useState(0); // Default: No
  const [visit, setVisit] = useState(0); // Default: No
  const [pregnant, setPregnant] = useState(0); // Default: No
  const [planning, setPlanning] = useState(0); // Default: No

  // Data for Radio Buttons
  const sexValues = [
    { value: 0, label: "Male" },
    { value: 1, label: "Female" },
  ];

  const radioYesNo = [
    { value: 0, label: "No" },
    { value: 1, label: "Yes" },
  ];

  /* istanbul ignore next */
  const onSubmit = () => {
    if (process.env.NODE_ENV === "development") {
      // This shows how to access the values of the form
      const firstNameField: HTMLInputElement = document.getElementById(
        "firstname"
      ) as HTMLInputElement;
      const lastNameField: HTMLInputElement = document.getElementById(
        "lastname"
      ) as HTMLInputElement;
      const nicknameField: HTMLInputElement = document.getElementById(
        "nickname"
      ) as HTMLInputElement;
      const birthdateField: HTMLInputElement = document.getElementById(
        "birthdate"
      ) as HTMLInputElement;
      const complaintField1: HTMLInputElement = document.getElementById(
        "complaint1"
      ) as HTMLInputElement;
      const complaintField2: HTMLInputElement = document.getElementById(
        "complaint2"
      ) as HTMLInputElement;
      const complaintField3: HTMLInputElement = document.getElementById(
        "complaint3"
      ) as HTMLInputElement;

      console.log("First name:", firstNameField.value);
      console.log("Last name:", lastNameField.value);
      console.log("Nickname:", nicknameField.value);
      console.log("Birth Date:", birthdateField.value);
      console.log(
        "Complaints: ",
        complaintField1.value +
          " " +
          complaintField2.value +
          " " +
          complaintField3.value
      );
      console.log("Wants Planning?: " + planning);
    }
  };

  return (
    <div id="patient-info-wrapper">
      <TextareaItem
        title="First Name"
        placeholder="First Name"
        autoHeight
        id="firstname"
      />

      <TextareaItem
        title="Last Name"
        placeholder="Last Name"
        id="lastname"
        autoHeight
      />

      <TextareaItem
        title="Nickname"
        placeholder="Nickname"
        id="nickname"
        autoHeight
      />

      <List renderHeader={() => "Sex"}>
        {sexValues.map((i) => (
          <RadioItem
            data-testid={`${i.label.toLowerCase()}-button`}
            id={`${i.label.toLowerCase()}-button`}
            key={i.value}
            name="sex"
            checked={sex === i.value}
            onClick={() => setSex(i.value)}
          >
            {i.label}
          </RadioItem>
        ))}
      </List>

      <WhiteSpace />

      <InputItem placeholder="YYYY-MM-DD" id="birthdate" type="digit">
        Birth Date
      </InputItem>

      <InputItem type="number" placeholder="Age" id="age" maxLength={3}>
        Age{" "}
      </InputItem>

      <InputItem type="number" placeholder="Phone" id="phone">
        Phone
      </InputItem>

      <TextareaItem title="Town" placeholder="Town" id="town" autoHeight />

      <List renderHeader={() => "Visit?"}>
        {radioYesNo.map((i) => (
          <RadioItem
            key={i.value}
            data-testid={`visit-${i.label}`}
            name="visit"
            checked={visit === i.value}
            onClick={() => setVisit(i.value)}
          >
            {i.label}
          </RadioItem>
        ))}
      </List>

      {/* Only display the 'female-only' div if the patient is female */}
      {sex ? (
        <div id="female-only">
          <WhiteSpace />
          <List renderHeader={() => "Pregnant?"}>
            {radioYesNo.map((i) => (
              <RadioItem
                data-testid={`pregnant-${i.label}`}
                key={i.value}
                name="pregnant"
                checked={pregnant === i.value}
                onClick={() => setPregnant(i.value)}
              >
                {i.label}
              </RadioItem>
            ))}
          </List>

          <InputItem title="G" type="number" id="gravida">
            G
          </InputItem>

          <InputItem title="P" type="number" id="para">
            P
          </InputItem>

          <InputItem title="A" type="number" id="abortus">
            A
          </InputItem>

          <TextareaItem title="LMP" id="lmp" />

          <List renderHeader={() => "Wants Planning?"}>
            {radioYesNo.map((i) => (
              <RadioItem
                data-testid={`planning-${i.label}`}
                key={i.value}
                name="planning"
                checked={planning === i.value}
                onClick={() => setPlanning(i.value)}
              >
                {i.label}
              </RadioItem>
            ))}
          </List>
        </div>
      ) : null}

      <WhiteSpace />

      <InputItem type="number" placeholder="Weight" id="weight">
        Weight (kg)
      </InputItem>

      <InputItem type="number" placeholder="Height" id="height">
        Height (cm)
      </InputItem>

      <InputItem type="number" placeholder="Blood Pressure" id="bp">
        BP
      </InputItem>

      <InputItem type="number" placeholder="Temp" id="temp">
        Temp (F)
      </InputItem>

      <InputItem type="number" placeholder="Pulse" id="pulse">
        Pulse
      </InputItem>

      <InputItem type="number" placeholder="Z-Score" id="z-score">
        Z-Score
      </InputItem>

      <List renderHeader={() => "Albendazole?"}>
        {radioYesNo.map((i) => (
          <RadioItem
            data-testid={`albendazole-${i.label}`}
            key={i.value}
            checked={albendazole === i.value}
            onClick={() => setAlbendazole(i.value)}
          >
            {i.label}
          </RadioItem>
        ))}
      </List>

      <List renderHeader={() => "Alergies"}>
        <TextareaItem autoHeight id="alergies" />
      </List>

      <List renderHeader={() => "Medicines"}>
        <TextareaItem autoHeight id="medicines" />
      </List>

      <List renderHeader={() => "Chief Complaint"}>
        <TextareaItem
          placeholder="1."
          // autoHeight
          autoHeight
          id="complaint1"
        />
        <TextareaItem placeholder="2." autoHeight id="complaint2" />
        <TextareaItem placeholder="3." autoHeight id="complaint3" />
      </List>

      <List renderHeader={() => "History"}>
        <TextareaItem autoHeight id="history" />
      </List>

      <List renderHeader={() => "Exam"}>
        <TextareaItem autoHeight id="exam" />
      </List>

      <WhiteSpace />

      <div className="submit-button">
        <List>
          <Button onClick={onSubmit}>Submit!!</Button>
        </List>
      </div>
    </div>
  );
}
