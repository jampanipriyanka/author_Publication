import React, {useEffect, useState} from "react";
import './form.css';
import { useNavigate } from 'react-router-dom';
import { storeFormData } from "../services/api";
/**
 * Description: this method will handle the publication and author entities form information 
 *
 * @author Om prakash and saiTharun
 * @lastModified 2023-11-30 LastModifiedDate
 */
function PublicationForm({onNext, storedData}) {
    
    const defaultPublicationData = {
        title: '',
        year: '',
        appearance: '',
        pages: ''
      };
    
      const [publicationFormData, setPublicationData] = useState(
        Object.keys(storedData || {}).length ? storedData : defaultPublicationData
      );

    const [error, setError] = useState([]);

    const valueChanged = (e) => {
        const { name, value } = e.target;
        setPublicationData({
          ...publicationFormData,
          [name]: value
        });
    }
   // calls when new publications are adding
    const addPublication = (e) => {
        e.preventDefault();

        const allErrors = []

        // Check for empty fields
        for (const key in publicationFormData) {
            if (!publicationFormData[key].trim()) {
                allErrors.push( key.charAt(0).toUpperCase()+key.slice(1) + ' is required');
            }
        }

        if (allErrors.length === 0) {
            //Navigate to next form
            onNext(publicationFormData);
        } else {
            setError(allErrors);
        }
    }

    return (
        <>
        <div className="form-parent">
            <form onSubmit={addPublication}>
            <p>Enter Publication details below</p>
                <div className="input-field">
                    <label className="input-title">Title<span className="star">*</span></label>
                    <input type="text" className="text" name="title"  value={publicationFormData.title} onChange={valueChanged}/>
                </div>

                <div className="input-field">
                    <label className="input-title">Year<span className="star">*</span></label>
                    <input type="number" className="text" name="year"  value={publicationFormData.year} onChange={valueChanged}/>
                </div>
                

                <div className="input-field">
                    <label className="input-title">Where the publications appeared<span className="star">*</span></label>
                    <input type="text" className="text" name="appearance"  value={publicationFormData.appearance} onChange={valueChanged}/>
                </div>
                

                <div className="input-field">
                    <label className="input-title">Pages<span className="star">*</span></label>
                    <input type="number" className="text" name="pages"  value={publicationFormData.pages} onChange={valueChanged}/>
                </div>
                {error.length>0 && <p className='error'>{error[0]}</p>}
                <button type="submit" className="submit-details">Next</button>  
            </form>
        </div>
        </>
    );
}

function AuthorForm({onNext, onBack, storedData}) {
    const defaultAuthorData = {
        name: '',
        institution: '',
        department: '',
        email: '',
        address: '',
        homePage: null
    };
    
    const [authorFormData, setAuthorFormData] = useState(
    Object.keys(storedData || {}).length ? storedData : defaultAuthorData
    );

    const [error, setError] = useState([]);
    const [valid, isValid] = useState(false)

    const addAuthors = (e) => {
        e.preventDefault();
        const allErrors = []

        // Check for empty fields
        for (const key in authorFormData) {
            if (!authorFormData[key] || !authorFormData[key].trim()) {
                allErrors.push( key.charAt(0).toUpperCase()+key.slice(1) + ' is required');
            }
        }

        if(!valid) {
            allErrors.push('URL is not Valid');
        }

        if (allErrors.length === 0) {
            setError([]);
            onNext(authorFormData);
        } else {
            setError(allErrors);
        }

    }

    const previousForm = (e) => {
        e.preventDefault();
        onBack(authorFormData)
    }

    const valueChanged = (e) => {
        const { name, value } = e.target;
        setAuthorFormData({
          ...authorFormData,
          [name]: value
        });
    }

    const homePageValueChanged = (e, key) => {
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        const { name, value } = e.target;
        setAuthorFormData({
          ...authorFormData,
          [name]: value
        });
        if(urlRegex.test(value)) {
            isValid(true)
        } else {

        }
    }


    return (
        <div className="form-parent">
            <form onSubmit={addAuthors}>
                <p>Enter Author details below</p>
                <div className="input-field">
                    <label className="input-title">Name<span className="star">*</span></label>
                    <input type="text" className="text" name="name"  value={authorFormData.name} onChange={valueChanged}/>
                </div>
                

                <div className="input-field">
                    <label className="input-title">Institution<span className="star">*</span></label>
                    <input type="text" className="text" name="institution"  value={authorFormData.institution} onChange={valueChanged}/>
                </div>
                

                <div className="input-field">
                    <label className="input-title">Department<span className="star">*</span></label>
                    <input type="text" className="text" name="department"  value={authorFormData.department} onChange={valueChanged}/>
                </div>
                

                <div className="input-field">
                    <label className="input-title">Email<span className="star">*</span></label>
                    <input type="email" className="text" name="email"  value={authorFormData.email} onChange={valueChanged}/>
                </div>
                

                <div className="input-field">
                    <label className="input-title">Address<span className="star">*</span></label>
                    <textarea className="text author-adress" name="address"  column={30} row={5} value={authorFormData.address} onChange={valueChanged}></textarea>
                </div>

                <div className="input-field">
                    <label className="input-title">Home Page<span className="star">*</span></label>
                    <input type="text" className="text" name="homePage"  value={authorFormData.homePage} onChange={(e) => {homePageValueChanged(e, 'homePage')}}/>
                </div>

                {error.length>0 && <p className='error'>{error[0]}</p>}
                <div className="authorsForm-buttons">
                    <button type="button" className="submit-details back-button" onClick={previousForm}>Back</button> 
                    <button type="submit" className="submit-details">Submit</button> 
                </div> 
            </form>
        </div>
    )
}

function ParentForm() {
    const [step, setStep] = useState(1);
    const [publicationData, setPublicationData] = useState({});
    const [authorData, setAuthorData] = useState({});
    const [twoFormsData, setTwoFormsData] = useState({});
    const [status, setStatus] = useState(false);
    const [message, setMessage] =useState('');
    const navigate = useNavigate();
  
    const handleNextStep = (formData) => {
      let data = {...twoFormsData, ...formData}
      setTwoFormsData(data)
      if (step === 1) {
        setPublicationData(formData);
        setStep(2);
      }
    };

    const handleAuthorStep = (formData) => {
        let authors = {authors: []};
        authors.authors.push(formData);
        let data = {...twoFormsData, ...authors}
        if(step === 2) {
            setAuthorData(formData);
            setTwoFormsData(data);
        }
    }

    useEffect(() => {
        if(Object.values(authorData).length !== 0) {
            storePublicationData(twoFormsData)
        }
    }, [twoFormsData])
  
    const handlePrevStep = (formData) => {
      if (step === 2) {
        setAuthorData(formData);
        setStep(1);
      }
    };

    const storePublicationData = (payload) => {
        storeFormData('storePublication', payload).then(response => {
            if(response.status == 'success') {
                setMessage('Data successufully inserted.')
                setStatus(true);
            } else if(response.status == 'duplicate') {
                setMessage('Duplicate records found for Publication')
                setStatus(true);
            } else {
                setMessage('Something went wrong')
                setStatus(true);
            }
        }).catch((error) => {
            throw new Error("Publication API request failed: ", error)
        })
    }

    const togglePopup = () => {
        setTimeout(() => {
            navigate('/home')
        }, 200);
        setStatus(false);
    };

    const formNavigate = (e) => {
        navigate('/home')
    }

    return (
        <div>
            <header>
                <h2 className="app-title">Publication Listing Service</h2>
            </header>
            <button type="button" className="button" onClick={formNavigate}>Home</button>
            <div>
                {step === 1 && (
                    <PublicationForm onNext={handleNextStep} storedData={publicationData}/>
                )}
                {step === 2 && (
                    <AuthorForm onNext={handleAuthorStep} onBack={handlePrevStep} storedData={authorData}/>
                )}

                {status && (
                    <div className="popup">
                        <div className="popup-content">
                            <span className="close" onClick={togglePopup}>&times;</span>
                            <p>{message}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ParentForm