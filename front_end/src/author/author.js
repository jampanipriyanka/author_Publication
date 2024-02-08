import React, {useEffect, useState} from "react";
import './author.css';
import { useNavigate } from 'react-router-dom';
import { getAllAuthors } from "../services/api";
import Table from "../shared/table";
import Header from "../shared/header";
/**
 * Description: This is for the author based search table.
 *
 * @author Om prakash
 * @lastModified 2023-11-29 LastModifiedDate
 */
function AuthorList() {
    const navigate = useNavigate();

    const [showData, setShowData] = useState(false);
    const [authors, setAuthors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [url, setUrl] = useState('');
    const [forceUpdate, setForceUpdate] = useState(false);

    useEffect(() => {
        getAuthors()
    },[]);

    useEffect(() => {
        if (url) {
            setForceUpdate(prevState => !prevState);
        }
    }, [url]);


    // unique authors
    const getAuthors = async () => {
        await getAllAuthors('allAuthors').then((response) => {
            if(response.status == 'success'){
                setAuthors(response.data)
            }
        })
    }
    //fetching authors data
    const authorData = (name) => {
        setShowData(false)
        let url = 'author?name=' + name;
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
                {authors.map(author => (
                    <button type="button" className="author-button" onClick={(e) => authorData(author.name)}>{author.name}</button>
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

export default AuthorList;