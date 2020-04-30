import React, { ReactElement } from 'react'
import { TextareaItem, Button, Accordion, Checkbox } from 'antd-mobile'
import '../scss/Login.scss'

const CheckboxItem = Checkbox.CheckboxItem;

export default function TreatmentForm(): ReactElement {

    const onSubmit = () => {
      const testField = document.getElementById('1') as HTMLInputElement
      console.log("Test:", testField.checked)
    }

    return (
    <>
        <div>
            <Accordion defaultActiveKey="0" className="my-accordion">
            <Accordion.Panel header="Multivitamins">
                <CheckboxItem>Multivitamins - Childrens</CheckboxItem>
                <CheckboxItem>Multivitamins - Adult</CheckboxItem>
                <CheckboxItem>Multivitamins - Prenatal</CheckboxItem>
            </Accordion.Panel>
            <Accordion.Panel header="Pain">
                <CheckboxItem>Acetaminophen - 500 tab</CheckboxItem>
                <CheckboxItem>Acetaminophen - 80 chew</CheckboxItem>
                <CheckboxItem>Acetaminophen - 160 mg/5 cc</CheckboxItem>
                <CheckboxItem>Ibuprofen - 200 mg</CheckboxItem>
                <CheckboxItem>Ibuprofen - 100 mg/5 cc</CheckboxItem>
            </Accordion.Panel>            
            <Accordion.Panel header="GI">
                <CheckboxItem>Omeprazole</CheckboxItem>
                <CheckboxItem>Pepto Bismol</CheckboxItem>
                <CheckboxItem>Ranitdine</CheckboxItem>
                <CheckboxItem>Zinc</CheckboxItem>
                <CheckboxItem>Tums</CheckboxItem>
                <CheckboxItem>ORS</CheckboxItem>
            </Accordion.Panel>
            <Accordion.Panel header="Cardiac">
                <CheckboxItem>Amlodipine</CheckboxItem>
                <CheckboxItem>Aspirin</CheckboxItem>
                <CheckboxItem>Atenolol</CheckboxItem>
                <CheckboxItem>Lisinopril</CheckboxItem>
                <CheckboxItem>HCTZ</CheckboxItem>
                <CheckboxItem>Lasix tab</CheckboxItem>
            </Accordion.Panel>
            <Accordion.Panel header="Anti-infectives">
                <CheckboxItem>Albendazole</CheckboxItem>
                <CheckboxItem>Amoxicillin - 500 tab</CheckboxItem>
                <CheckboxItem>Amoxicillin - 250 chew</CheckboxItem>
                <CheckboxItem>Amoxicillin - 250 mg/cc</CheckboxItem>
                <CheckboxItem>Augmentin</CheckboxItem>
                <CheckboxItem>Azithromycin - 250 tab</CheckboxItem>
                <CheckboxItem>Azithromycin - 200 mg/5 cc</CheckboxItem>
                <CheckboxItem>Bactrim - DS tab</CheckboxItem>
                <CheckboxItem>Bactrim - 40 mg/5 cc</CheckboxItem>
                <CheckboxItem>Cipro</CheckboxItem>
                <CheckboxItem>Chloroquine</CheckboxItem>                
                <CheckboxItem>Doxycycline</CheckboxItem>
                <CheckboxItem>Flagyl</CheckboxItem>
                <CheckboxItem>Fluconazole</CheckboxItem>
                <CheckboxItem>Griseofulvin - 500 mg</CheckboxItem>
                <CheckboxItem>Griseofulvin - 125 mg</CheckboxItem>
                <CheckboxItem>Ivermectin</CheckboxItem>
                <CheckboxItem>Keflex 500 mg tab</CheckboxItem>
                <CheckboxItem>Nitrofurantoin</CheckboxItem>                
                <CheckboxItem>Rocephin Inj. - 50 mg/kg</CheckboxItem>
                <CheckboxItem>Rocephin Inj. - 250 mg</CheckboxItem>
                <CheckboxItem>Rocephin Inj. - 1 gm</CheckboxItem>
            </Accordion.Panel>
            <Accordion.Panel header="Topical">
                <CheckboxItem>Clotrimazole</CheckboxItem>
                <CheckboxItem>Triple Antibiotic</CheckboxItem>
                <CheckboxItem>Hydrocortisone</CheckboxItem>
                <CheckboxItem>Permethrine</CheckboxItem>
                <CheckboxItem>Silvadine</CheckboxItem>
            </Accordion.Panel>
            <Accordion.Panel header="IM">
                <CheckboxItem>Dexamethasone</CheckboxItem>
                <CheckboxItem>Lasix Injection</CheckboxItem>
            </Accordion.Panel>
            <Accordion.Panel header="Misc.">
                <CheckboxItem>Albuterol</CheckboxItem>
                <CheckboxItem>Benadryl - 25 mg</CheckboxItem>
                <CheckboxItem>Benadryl - 12.5 mg/5 cc</CheckboxItem>
                <CheckboxItem>Depo-Provera</CheckboxItem>
                <CheckboxItem>Ferrous sulfate</CheckboxItem>
                <CheckboxItem>Paroxetine</CheckboxItem>
                <CheckboxItem>Labetolol</CheckboxItem>
                <CheckboxItem>Methyldopa</CheckboxItem>
                <CheckboxItem>Metformin</CheckboxItem>
                <CheckboxItem>OCP</CheckboxItem>
                <CheckboxItem>IUD</CheckboxItem>
                <CheckboxItem>Carbamazepine</CheckboxItem>
                <CheckboxItem>Keppra</CheckboxItem>
                <CheckboxItem>Prednisone</CheckboxItem>
                <CheckboxItem>Terazosin</CheckboxItem>
                <TextareaItem 
                    placeholder="Other misc.:" 
                    data-seed="other-misc" 
                    autoHeight 
                    id="other-misc"/>
            </Accordion.Panel>
            <Accordion.Panel header="Referrals">
                <CheckboxItem>Saw dentist</CheckboxItem>
                <CheckboxItem>Saw eye doctor</CheckboxItem>
                <CheckboxItem>CHW</CheckboxItem>
                <CheckboxItem>Given Glasses</CheckboxItem>
                <CheckboxItem>Outside</CheckboxItem>
            </Accordion.Panel>
            <Accordion.Panel header="Comments">
                <TextareaItem 
                    placeholder="Treatment Comments" 
                    data-seed="comments" 
                    autoHeight 
                    id="comments"/>
            </Accordion.Panel>
            </Accordion>
        </div>
        
        <Button onClick={onSubmit} >Submit</Button>
    </>
    )
}