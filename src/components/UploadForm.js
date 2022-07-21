import React, { useState } from "react";
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'
import { useMoralis } from "react-moralis";
import { BookContext } from "../Context/BookContext";
import { v4 as uuidv4 } from "uuid";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// import Moralis from "moralis/types";

const axios = require('axios'); 

// const currentUser = Moralis.User.current();
// console.log(currentUser,"current user");

function UploadForm() {
const {Moralis,account} = useMoralis();

    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [category, setCategory] = useState("Book");
    const [file, setFile] = useState(null);
    const [coverPic, setCoverPic] = useState(null);
    const [website, setWebsite] = useState('');
    const [description, setDescription] = useState('');
    const [checkbox, setCheckbox] = useState();
    const[data, setData] = useState()

    const nameEvent = (e) => {
        setName(e.target.value)
    }
console.log(account,"account");
    const subjectEvent = (e) => {
        setSubject(e.target.value || null)
    }
   
    const websiteEvent = (e) => {
        setWebsite(e.target.value)
    }

    const descriptionEvent = (e) => {
        setDescription(e.target.value)
    }

    async function coverEvent(e){
        const file = e.target.files[0];
      var url = await storeFile(file);
      setCoverPic(url);
    console.log(url,'url ');
    }

    async function PdfStore(e){
        const file = e.target.files[0];
       var pdf = await storePdfFile(file);
       setFile(pdf);
       console.log(pdf,'pdf in upload');
    }

    const checkboxEvent = (e) => {
        setCheckbox(e.target.checked)
    }
   
    let Item = {
        name: name,
        subject: subject,
        category: category,
        file: file,
        coverPicture:coverPic,
        website: website,
        description: description,
        checkbox: checkbox,
        walletAddress:account
    }
  console.log(Item,"items");
console.log(Image,'in uploadS')

    
    function onFormSubmit(e) {
        e.preventDefault() 
        // addData();
        storeFiles(Item)
       
        setName('');
        setSubject('');
        setCategory('');
        setFile(null);
        setCoverPic(null);
        setWebsite('')
        setDescription('');
        setCheckbox(null);
       
       
    }
   

// Web3Storage

const bookContext = React.useContext(BookContext);
const {addData, storeFiles,storeFile,Image,storePdfFile,pdf} = bookContext;

const API_Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEIzOEQzNkJhOTIwOWU0NDhCMzZEOGYwNzQ2MzE4ZGFiNmUyNzUwQmYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTczNDI2NzMzMDcsIm5hbWUiOiJVbnRvdWNoZWQgYXJjaGlldmUifQ.t3zZU9B7HVdsJTKXajBRuNDsE6piX0tjWQqtSPP23h4";
const client = new Web3Storage({ token: API_Token})
const untouchedA = Moralis.Object.extend("UntouchedArchieve");
const UntoucheDdata  = new untouchedA();


    return (
        <div style={{ backgroundColor: "aliceblue" }} className="col">
            <div className="form-style-2 offset-4 row-8">
                <div className="form-style-2-heading">Upload any files from here</div>
                <form action="" method="" onSubmit={onFormSubmit}>
                    <label for="field1"><span>Name <span className="required">*</span></span><input value={name} onChange={nameEvent} placeholder="Your name" type="text" class="input-field" name="field1" /></label>

                    <label for="field2"><span>Subject <span className="required">*</span></span><input value={subject} placeholder="Subject" onChange={subjectEvent} type="text" class="input-field" name="field2" /></label>

                    <label for="field4"><span>Category</span><select value={category} name="field4" onChange={(e)=>setCategory(e.target.value)} className="select-field">
                        <option defaultChecked defaultValue="Book" value="Book">Book</option>
                        <option value="Documents">Documents</option>
                        <option value="Newspaper">Newspaper</option>
                        <option value="Website">Website / Snapshot</option>
                    </select></label>

                    
                    <label for="field6"><span>Choose file</span><input className="file-input" value={undefined} onChange={PdfStore} type="file"></input></label>

                    <label for="field6"><span>Cover Pic</span><input className="file-input" value={undefined} onChange={coverEvent} type="file"></input></label>

                    <label for="field7"><span>Add website</span><input value={website} className="add-url" placeholder="add URL" onChange={websiteEvent} type="url"></input></label>

                    <label for="field5"><span>Description</span><textarea value={description} onChange={descriptionEvent} name="field5" className="textarea-field"></textarea></label>

                    <label><input className="terms-checkbox" value={checkbox} onChange={checkboxEvent} type="checkbox"></input>I agree to terms and conditions.</label>

                    <label><span> </span><input type="submit" value="Submit" /></label>
                </form>
            </div>
        </div>
    )
}


export default UploadForm;