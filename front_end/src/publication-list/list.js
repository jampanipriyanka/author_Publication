/**
 * Description: list of all publication table display
 *
 * @author Om prakash
 * @lastModified 2023-11-30 LastModifiedDate
 */

import React, {useEffect, useState} from "react";
import './list.css';
import { useNavigate } from 'react-router-dom';
import { getAllPublications } from "../services/api";
import Table from "../shared/table";
import Header from "../shared/header";

function PublicationList() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        
    },[]);

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
                <input type="text" className="text" placeholder="Type here" value={searchQuery} onChange={(e) => searchPublications(e.target.value)}/>
            </span>
            
            <div className="publication-list-parent">
            <p>List of All Publications</p>
            <Table apiToUse="allPublications" searchQuery={searchQuery}/>
        </div>
        </>
    )
}

export default PublicationList;