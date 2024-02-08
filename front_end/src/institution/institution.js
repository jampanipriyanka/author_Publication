import React, {useEffect, useState} from "react";
import './institution.css';
import { useNavigate } from 'react-router-dom';
import { getAllInstitutions } from "../services/api";
import Table from "../shared/table";
import Header from "../shared/header";
/**
 * Description: This is for the institution based search author table.
 *
 * @author Om prakash
 * @lastModified 2023-11-29 LastModifiedDate
 */
function InstitutionList() {
    const navigate = useNavigate();

    const [showData, setShowData] = useState(false);
    const [institutions, setInstitutions] = useState([{name: 'Naveen', id: 1}, {name: 'Arun', id: 2}, {name: 'Pavan', id: 3}]);
    const [searchQuery, setSearchQuery] = useState('');
    const [url, setUrl] = useState('');
    const [forceUpdate, setForceUpdate] = useState(false);

    useEffect(() => {
        getInstitutions()
    },[]);

    useEffect(() => {
        if (url) {
            setForceUpdate(prevState => !prevState);
        }
    }, [url]);

    const getInstitutions = async () => {
        await getAllInstitutions('allInstitutions').then((response) => {
            if(response.status == 'success'){
                let fInstitutions = response.data.filter((obj, index, self) =>
                index === self.findIndex((o) => o.institution === obj.institution)
              );
                setInstitutions(fInstitutions)
            }
        })
    }
   // fetching authors data
    const authorData = (institution) => {
        setShowData(false)
        let url = 'institution?name=' + institution;
        setUrl(url)
        setShowData(true)
    }

    //Global Search functionality
    const searchPublications = (search) => {
        setSearchQuery(search);
    }

    const listNavigate = (e) => {
        navigate('/home')
    }

    return(
        <>
            <Header />
            <button type="button" className="button" onClick={listNavigate}>Back</button>

            <span className='search-publications'>
            <input type="text" className="text" placeholder="Search here..." value={searchQuery} onChange={(e) => searchPublications(e.target.value)}/>
            </span>

            <div className="all-authors">
                {institutions.map(institution => (
                    <button type="button" className="author-button" onClick={(e) => authorData(institution.institution)}>{institution.institution}</button>
                ))}
            </div>
            
            <div className="publication-list-parent">
            <p>List of All Publications</p>
            {showData && (
                <Table key={forceUpdate} apiToUse={url} searchQuery={searchQuery}/>
            )}
            </div>
        </>
    )
}

export default InstitutionList