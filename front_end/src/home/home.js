import React, {useState} from 'react';
import { Routes, useNavigate, BrowserRouter, Route, } from 'react-router-dom';
import './home.css';
import PublicationForm from '../publication-form/form';
import PublicationList from '../publication-list/list';
import AuthorList from '../author/author';
import DepartmentList from '../department/department';
import InstitutionList from '../institution/institution';
/**
 * Description: starting page to land the application and we can see different 
 *
 * @author saiTharun
 * @lastModified 2023-11-30 LastModifiedDate
 */
function Home() {
    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path)
    }

    return (
        <>
            <h2 className="app-title">Publication Listing Service</h2>
            <p class='buttons-header'>Filter List of Publications</p>
            <div className="navigation-buttons">
                <button type="button" className="button" onClick={(e) => navigateTo('/list')}>All Publications</button>
                <button type="button" className="button" onClick={(e) => navigateTo('/author')}>Publications by Author</button>
                <button type="button" className="button" onClick={(e) => navigateTo('/department')}>Publications by Department</button>
                <button type="button" className="button" onClick={(e) => navigateTo('/institution')}>Publications by Institution</button>
            </div>
            
            <p class='buttons-header'>Add New Publications</p>
            <div className='add-publication'>
                <button type="button" className="button add-publication" onClick={(e) => navigateTo('/form')}>Add Publication</button>
            </div>
            <Routes>
                <Route path="/list" element={<PublicationList />} />
                <Route path="/form" element={<PublicationForm />} />
                <Route path="/author" element={<AuthorList />} />
                <Route path="/department" element={<DepartmentList />} />
                <Route path="/institution" element={<InstitutionList />} />
            </Routes>
        </>
    )
}

export default Home;