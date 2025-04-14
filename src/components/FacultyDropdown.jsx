import { useState, useEffect } from 'react';
import { getFaculties } from '../services/facultyService';

const FacultyDropdown = ({ onSelect }) => {
  const [faculties, setFaculties] = useState([]);
  const [showNewFaculty, setShowNewFaculty] = useState(false);

  useEffect(() => {
    const loadFaculties = async () => {
      const data = await getFaculties();
      setFaculties(data);
    };
    loadFaculties();
  }, []);

  return (
    <div>
      <select 
        onChange={(e) => {
          setShowNewFaculty(e.target.value === '__new__');
          onSelect(e.target.value);
        }}
      >
        <option value="">Select Faculty</option>
        {faculties.map(faculty => (
          <option key={faculty.id} value={faculty.id}>
            {faculty.name}
          </option>
        ))}
        <option value="__new__">Add New Faculty</option>
      </select>

      {showNewFaculty && (
        <input
          type="text"
          placeholder="Enter faculty name"
          id="newFacultyName"
        />
      )}
    </div>
  );
};

export default FacultyDropdown;