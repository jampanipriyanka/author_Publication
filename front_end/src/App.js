import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home/home";
import PublicationForm from "./publication-form/form";
import PublicationList from "./publication-list/list";
import AuthorList from "./author/author";
import DepartmentList from "./department/department";
import InstitutionList from "./institution/institution";
/**
 * Description: base app path to which we create the routes 
 *
 * @author Om prakash and saiTharun
 * @lastModified 2023-11-28 LastModifiedDate
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/list" element={<PublicationList />} />
        <Route path="/form" element={<PublicationForm />} />
        <Route path="/author" element={<AuthorList />} />
        <Route path="/department" element={<DepartmentList />} />
        <Route path="/institution" element={<InstitutionList />} />
      </Routes>
   </BrowserRouter>
  );
}

export default App;
