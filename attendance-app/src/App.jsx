import './index.css'
// xlsx react-copy-to-clipboard
import React, { useState } from "react";
import * as XLSX from 'xlsx';
import CopyToClipboard from 'react-copy-to-clipboard';
import img1 from './img/StudentsData.png'
import img2 from './img/ParentsData.png'
// import 'bootstrap-icons/font/bootstrap-icons.css';

const App = () => {
  // onchange states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFile1, setExcelFile1] = useState(null);
  const [typeError, setTypeError] = useState(null);

  // submit state
  const [excelData, setExcelData] = useState(null);
  const [excelData1, setExcelData1] = useState(null);
  const [filteredData, setFilteredData] = useState(null);


  const [range, setRange] = useState();
  const [upload1, setUpload1] = useState("Upload");
  const [upload2, setUpload2] = useState("Upload");



  // onchange event
  const handleFile = (e) => {
    let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
          setExcelFile1(e.target.result);
        };
      } else {
        setTypeError('Please select only excel file types');
        setExcelFile(null);
        setExcelFile1(null);
      }
    } else {
      console.log('Please select your file');
    }
  };

  // submit event
  const handleFileSubmit1 = (e, file, setDataFunction) => {
    e.preventDefault();

    if (file !== null) {
      const workbook = XLSX.read(file, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      if (Object.keys(data[0])[0] === "StudentsName" && Object.keys(data[0])[1] === "Attendence") {
        setDataFunction(data.slice(0, 10));
        alert("File uploaded successfully!");
        setUpload1("Uploaded")
      } else {
        alert("File format is incorrect. Please check the format and try again.");
        alert(Object.keys(data[0])[0] + " is required same as 'StudentsName'")
        alert(Object.keys(data[0])[1] + " is required same as 'Attendence'")
      }
    }
  };

  const handleFileSubmit2 = (e, file, setDataFunction) => {
    e.preventDefault();

    if (file !== null) {
      const workbook = XLSX.read(file, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      if (Object.keys(data[0])[0] === "ParentsName" && Object.keys(data[0])[1] === "Email") {
        setDataFunction(data.slice(0, 10));
        alert("File uploaded successfully!");
        setUpload2("Uploaded")
      } else {
        alert("File format is incorrect. Please check the format and try again.");
        alert(Object.keys(data[0])[0] + " is required same as 'ParentsName'")
        alert(Object.keys(data[0])[1] + " is required same as 'Email'")
      }
    }
  };


  const onClickSetRange = () => {
    const filteredDataArray = [];

    excelData.forEach((individualExcelData, index) => {

      if (individualExcelData.Attendence < range) {
        if ((individualExcelData.StudentsName.toLowerCase()).includes((excelData1[index].ParentsName).toLowerCase())) {
          filteredDataArray.push(excelData1[index].Email);

        } else {
          filteredDataArray.push('Please check StudentsName and ParentsName Sequence');

        }
      }
    });
    setFilteredData(filteredDataArray);
  };

  const myData = () => {
    alert("Copied to Clipboard!");
  };



  return (
    <div className=' w-10/12  m-auto my-4'>
      <h1 className=' my-4 text-center text-white font-extrabold text-2xl' >Upload & View Excel Sheets + Fetch Emails According to Students Attendance</h1><hr />

      <div className="ImgData">
        <div className="A">
          <h4 className=' text-black my-2 font-semibold  text-xl'>Students Data Excel Sheet Format</h4><hr />
          <img src={img1} alt="" />

          <tr className="tableRow flex justify-between items-center my-2">
            <td>StudentsName</td>
            <td>Attendance</td>
          </tr>

        </div>
        <div className="B">
          <h4  className=' text-black my-2 font-semibold text-xl'>Parents Data Excel Sheet Format</h4><hr />
          <img src={img2} alt="" />
          <tr className="tableRow flex justify-between items-center my-2">
            <td>ParentsName</td>
            <td>Email</td>
          </tr>


        </div>
      </div>


      {/* Form for the first file */}
      <form className="form-group custom-form mt-5" onSubmit={(e) => handleFileSubmit1(e, excelFile, setExcelData)}>

        <p className=' font-semibold'>Upload Students Attendance Excel File Only!</p>
        <hr />

        <input type="file" className="form-control text-sm my-2" required onChange={handleFile} /><br />
        <button type="submit" className="btn btn-success btn-md my-2"><i class="bi bi-upload"></i>{upload1}</button>
        {typeError && (
          <div className="alert alert-danger" role="alert">{typeError}</div>
        )}
      </form>

      {/* View data for the first file */}
      <div className="viewer">
        {excelData ? (
          <div className="table-responsive">
            <table className="table w-full text-center ">
              <thead>
                <tr>
                  {Object.keys(excelData[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {excelData.map((individualExcelData, index) => (
                  <tr key={index}

                  >
                    {Object.keys(individualExcelData).map((key, index) => (
                      <td key={key}>{individualExcelData[key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No File is uploaded yet!</div>
        )}
      </div>

      {/* Form for the second file */}
      <form className="form-group custom-form mt-5" onSubmit={(e) => handleFileSubmit2(e, excelFile1, setExcelData1)}>

        <p className=' font-semibold'>Upload Students Attendance Excel File Only!</p>
        <hr />

        <input type="file" className="form-control my-2 text-sm" required onChange={handleFile} /><br />
        <button type="submit" className="btn btn-success btn-md my-2"><i class="bi bi-upload"></i>{upload2}</button>
        {typeError && (
          <div className="alert alert-danger" role="alert">{typeError}</div>
        )}
      </form>

      {/* View data for the second file */}
      <div className="viewer">
        {excelData1 ? (
          <div className="table-responsive">
            <table className="table w-full text-center">
              <thead>
                <tr>
                  {Object.keys(excelData1[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {excelData1.map((individualExcelData, index) => (
                  <tr key={index} >
                    {Object.keys(individualExcelData).map((key) => (
                      <td key={key} >{individualExcelData[key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div class="input-group mb-3" style={{ marginTop: "5%" }}>

              <input type="number" class="form-control"
                value={range}
                placeholder="Enter Attendence Range in %"
                className=' p-1'

                onChange={(e) => setRange(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    onClickSetRange();
                  }
                }}
              />

              <button class="btn btn-success btn-md" type="button"
                id="button-addon2"
                onClick={onClickSetRange}><i class="bi bi-database-check"></i>Get Email</button>
            </div>


            {/* Set range and display filtered data */}
            {filteredData ? (
              <div className="table-responsive ">

                <div className='font-semibold my-4 '>
                <h3>Parents Email </h3>
                <p>Following data According to Students has classroom attendance is below {range}%</p>
                </div>
                
                <table className="table w-full text-center ">
                  <thead>
                    <tr>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((individualExcelData, index) => (
                      <tr key={index}>
                        <td>{individualExcelData}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <CopyToClipboard text={filteredData.join(" , ")}>
                  <button className="btn btn-success btn-md my-2" onClick={myData}><i class="bi bi-copy"></i>Copy All Email</button>
                </CopyToClipboard>
              </div>

            ) : "Upload Excel File by Referance Above Image With Proper Heading"
            }




          </div>




        ) : (
          <div>No File is uploaded yet!</div>
        )}
      </div>


    </div>
  );
}

export default App;