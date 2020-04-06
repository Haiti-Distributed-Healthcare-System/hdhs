import React, { ReactElement } from 'react'
import { TextareaItem, Button, Radio, Accordion, List } from 'antd-mobile'
import '../scss/Login.scss'

export default function TreatmentForm(): ReactElement {

    const onSubmit = () => {
      //const testField: HTMLInputElement = document.getElementById('test') as HTMLInputElement
      //console.log("Test:", testField.value)
    }

    return (
    <>
        <div>
            <Accordion defaultActiveKey="0" className="my-accordion">
            <Accordion.Panel header="Multivitamins">
                <List className="vitamins">
                <List.Item><Radio>Multivitamins - Childrens</Radio></List.Item>
                <List.Item><Radio>Multivitamins - Adult</Radio></List.Item>
                <List.Item><Radio>Multivitamins - Prenatal</Radio></List.Item>
                </List>
            </Accordion.Panel>
            <Accordion.Panel header="Pain">
                <List className="pain">
                <List.Item><Radio>Acetaminophen - 500 tab</Radio></List.Item>
                <List.Item><Radio>Acetaminophen - 80 chew</Radio></List.Item>
                <List.Item><Radio>Acetaminophen - 160 mg/5 cc</Radio></List.Item>
                <List.Item><Radio>Ibuprofen - 200 mg</Radio></List.Item>
                <List.Item><Radio>Ibuprofen - 100 mg/5 cc</Radio></List.Item>
                </List>
            </Accordion.Panel>            
            <Accordion.Panel header="GI">
                <List className="gi">
                <List.Item><Radio>Omeprazole</Radio></List.Item>
                <List.Item><Radio>Pepto Bismol</Radio></List.Item>
                <List.Item><Radio>Ranitdine</Radio></List.Item>
                <List.Item><Radio>Zinc</Radio></List.Item>
                <List.Item><Radio>Tums</Radio></List.Item>
                <List.Item><Radio>ORS</Radio></List.Item>
                </List>
            </Accordion.Panel>
            <Accordion.Panel header="Cardiac">
                <List className="cardiac">
                <List.Item><Radio>Amlodipine</Radio></List.Item>
                <List.Item><Radio>Aspirin</Radio></List.Item>
                <List.Item><Radio>Atenolol</Radio></List.Item>
                <List.Item><Radio>Lisinopril</Radio></List.Item>
                <List.Item><Radio>HCTZ</Radio></List.Item>
                <List.Item><Radio>Lasix tab</Radio></List.Item>
                </List>
            </Accordion.Panel>
            <Accordion.Panel header="Anti-infectives">
                <List className="infectives">
                <List.Item><Radio>Albendazole</Radio></List.Item>
                <List.Item><Radio>Amoxicillin - 500 tab</Radio></List.Item>
                <List.Item><Radio>Amoxicillin - 250 chew</Radio></List.Item>
                <List.Item><Radio>Amoxicillin - 250 mg/cc</Radio></List.Item>
                <List.Item><Radio>Augmentin</Radio></List.Item>
                <List.Item><Radio>Azithromycin - 250 tab</Radio></List.Item>
                <List.Item><Radio>Azithromycin - 200 mg/5 cc</Radio></List.Item>
                <List.Item><Radio>Bactrim - DS tab</Radio></List.Item>
                <List.Item><Radio>Bactrim - 40 mg/5 cc</Radio></List.Item>
                <List.Item><Radio>Cipro</Radio></List.Item>
                <List.Item><Radio>Chloroquine</Radio></List.Item>                <List.Item><Radio>Cipro</Radio></List.Item>
                <List.Item><Radio>Doxycycline</Radio></List.Item>
                <List.Item><Radio>Flagyl</Radio></List.Item>
                <List.Item><Radio>Fluconazole</Radio></List.Item>
                <List.Item><Radio>Griseofulvin - 500 mg</Radio></List.Item>
                <List.Item><Radio>Griseofulvin - 125 mg</Radio></List.Item>
                <List.Item><Radio>Ivermectin</Radio></List.Item>
                <List.Item><Radio>Keflex 500 mg tab</Radio></List.Item>
                <List.Item><Radio>Nitrofurantoin</Radio></List.Item>                <List.Item><Radio>Nitrofurantoin</Radio></List.Item>
                <List.Item><Radio>Rocephin Inj. - 50 mg/kg</Radio></List.Item>
                <List.Item><Radio>Rocephin Inj. - 250 mg</Radio></List.Item>
                <List.Item><Radio>Rocephin Inj. - 1 gm</Radio></List.Item>
                </List>
            </Accordion.Panel>
            <Accordion.Panel header="Topical">
                <List className="topical">
                <List.Item><Radio>Clotrimazole</Radio></List.Item>
                <List.Item><Radio>Triple Antibiotic</Radio></List.Item>
                <List.Item><Radio>Hydrocortisone</Radio></List.Item>
                <List.Item><Radio>Permethrine</Radio></List.Item>
                <List.Item><Radio>Silvadine</Radio></List.Item>
                </List>
            </Accordion.Panel>
            <Accordion.Panel header="IM">
                <List className="im">
                <List.Item><Radio>Dexamethasone</Radio></List.Item>
                <List.Item><Radio>Lasix Injection</Radio></List.Item>
                </List>
            </Accordion.Panel>
            <Accordion.Panel header="Misc.">
                <List className="misc">
                <List.Item><Radio>Albuterol</Radio></List.Item>
                <List.Item><Radio>Benadryl - 25 mg</Radio></List.Item>
                <List.Item><Radio>Benadryl - 12.5 mg/5 cc</Radio></List.Item>
                <List.Item><Radio>Depo-Provera</Radio></List.Item>
                <List.Item><Radio>Ferrous sulfate</Radio></List.Item>
                <List.Item><Radio>Paroxetine</Radio></List.Item>
                <List.Item><Radio>Labetolol</Radio></List.Item>
                <List.Item><Radio>Methyldopa</Radio></List.Item>
                <List.Item><Radio>Metformin</Radio></List.Item>
                <List.Item><Radio>OCP</Radio></List.Item>
                <List.Item><Radio>IUD</Radio></List.Item>
                <List.Item><Radio>Carbamazepine</Radio></List.Item>
                <List.Item><Radio>Keppra</Radio></List.Item>
                <List.Item><Radio>Prednisone</Radio></List.Item>
                <List.Item><Radio>Terazosin</Radio></List.Item>
                <List.Item><TextareaItem 
                            placeholder="Other misc.:" 
                            data-seed="other-misc" 
                            autoHeight 
                            id="other-misc"/></List.Item>
                </List>
            </Accordion.Panel>
            <Accordion.Panel header="Referrals">
                <List className="referrals">
                <List.Item><Radio>Saw dentist</Radio></List.Item>
                <List.Item><Radio>Saw eye doctor</Radio></List.Item>
                <List.Item><Radio>CHW</Radio></List.Item>
                <List.Item><Radio>Given Glasses</Radio></List.Item>
                <List.Item><Radio>Outside</Radio></List.Item>
                </List>
            </Accordion.Panel>
            <Accordion.Panel header="Comments">
                <List className="comments">
                <List.Item><TextareaItem 
                            placeholder="Treatment Comments" 
                            data-seed="comments" 
                            autoHeight 
                            id="comments"/></List.Item>
                </List>
            </Accordion.Panel>
            </Accordion>
        </div>
        

        <Button onClick={onSubmit} >Submit</Button>
    </>
    )
}