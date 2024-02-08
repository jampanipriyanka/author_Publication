import React, {useEffect, useState} from "react";
import './table.css';
import { getAllPublications } from "../services/api";

/**
 * Description: base app path to which we create the routes 
 *
 * @author Om prakash and saiTharun
 * @lastModified 2023-11-30 LastModifiedDate
 */
function Table({apiToUse, searchQuery}) {

    const [headerData, setHeaderData] = useState([]);
    let [fPublicationList, filterPublications] = useState([]);
    const [publiscationList, setPublicationList] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    useEffect(() => {
        if(!searchQuery) {
            getPublications(apiToUse)
        } else {
            filterData(searchQuery)
        }
    },[searchQuery])
    //fetching publication data 
    const getPublications = async (path)=>{
        await getAllPublications(path).then((response) => {
            if(response.status === 'success'){
                let valuesToRemove = ['publication_id', 'author_id'];
                let filteredArray = Object.keys(response.data[0]).filter(item => !valuesToRemove.includes(item));
                setHeaderData(filteredArray);
                setPublicationList(response.data);
                filterPublications(response.data);
            }
        })
    }

    const filterData = (key) => {
        filterPublications(publiscationList.filter(pubList => {
            return Object.values(pubList).some(value =>
                value.toString().toLowerCase().includes(key.toLowerCase())
              );
        }));
    }
   //sorting table data 
    const sortData = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
          direction = 'descending';
        }
        setSortConfig({ key: key, direction: direction });
    }

    useEffect(() => {
        if (sortConfig.key) {
          sortColumnData(sortConfig.key);
        }
      }, [sortConfig]);
    //sorting based on teh selected columns
    function sortColumnData(key) {
        const sortedList = [...fPublicationList].sort((a, b) => {
            const valueA = a[key]?.toString().toLowerCase() || '';
            const valueB = b[key]?.toString().toLowerCase() || '';
            return sortConfig.direction === 'ascending'
              ? valueA.localeCompare(valueB)
              : valueB.localeCompare(valueA);
          });
          filterPublications(sortedList);
    }

    return (
        <table className="publication-table"> 
            <thead>
                <tr>
                {Object.entries(headerData).map(([key,value]) => (
                    <th onClick={() => sortData(value)}>{value}
                    {sortConfig.key === value && (
                        <span>{sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'}</span>
                    )}</th>

                ))}
                </tr>
            </thead>
            <tbody>
            {fPublicationList.map(item => (
                <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.year}</td>
                    <td>{item.publication_location}</td>
                    <td>{item.pages}</td>
                    <td>{item.name}</td>
                    <td>{item.institution}</td>
                    <td>{item.department}</td>
                    <td>{item.email}</td>
                    <td>{item.address}</td>
                    <td><a href={item.homepage} target="_blank">{item.homepage}</a></td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default Table