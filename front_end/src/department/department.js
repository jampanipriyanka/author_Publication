import React, {useEffect, useState} from "react";
import './department.css';
import { useNavigate } from 'react-router-dom';
import { getAllDepartments } from "../services/api";
import Table from "../shared/table";
import Header from "../shared/header";
/**
 * Description: This is for the department based search author table.
 *
 * @author saiTharun
 * @lastModified 2023-11-29 LastModifiedDate
 */
function DepartmentList() {
    const navigate = useNavigate();

    const [showData, setShowData] = useState(false);
    const [departments, setDepartments] = useState([{name: 'Psycho', id: 1}, {name: 'Novel', id: 2}, {name: 'Fantacy', id: 3},{name: 'Action', id: 3}]);
    const [searchQuery, setSearchQuery] = useState('');
    const [url, setUrl] = useState('');
    const [forceUpdate, setForceUpdate] = useState(false);

    useEffect(() => {
        getDepartments()
    },[]);

    useEffect(() => {
        if (url) {
            setForceUpdate(prevState => !prevState);
        }
    }, [url]);

   //unique departments 
    const getDepartments = async () => {
        await getAllDepartments('allDepartments').then((response) => {
            if(response.status === 'success'){
                let fdepartments = response.data.filter((obj, index, self) =>
                index === self.findIndex((o) => o.department === obj.department)
              );
              setDepartments(fdepartments)
            }
        })
    }
    // fetching authors data based on department
    const authorData = (department) => {
        setShowData(false)
        let url = 'department?name=' + department;
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
                {departments.map(department => (
                    <button type="button" className="author-button" onClick={(e) => authorData(department.department)}>{department.department}</button>
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

export default DepartmentList;