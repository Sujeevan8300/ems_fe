import React, { useEffect, useState } from 'react'
import '../../App.css'
import type { Employee } from '../../modal/Employee';

const EmployeeManagementPage = () => {

    const [empolyees, setEmployees] = useState<Employee[]>();

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        designation: '',
        salary: 0
    });

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editFormData, setEditFormData] = useState({
        name: '',
        designation: '',
        salary: 0
    });

    const fetchEmplyess = async () => {
        try {
            const resp = await fetch('http://localhost:8081/api/v1/employees');
            const data = await resp.json();
            setEmployees(data);
        } catch (error) {
            console.log(error);
            alert(error)
        }
    };

    const addEmployee = async () => {
        try {
            const resp = await fetch('http://localhost:8081/api/v1/employees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (resp.ok) {
                setShowForm(false);
                setFormData({ name: '', designation: '', salary: 0 });
                fetchEmplyess();
            }
        } catch (error) {
            console.log(error);
            alert(error)
        }
    };

    const handleEditClick = (e: Employee) => {
        setEditingId(e.id);
        setEditFormData({ name: e.name, designation: e.designation, salary: e.salary });
    };

    const updateEmployee = async (id: string) => {
        try {
            const resp = await fetch(`http://localhost:8081/api/v1/employees/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editFormData)
            });
            if (resp.ok) {
                setEditingId(null);
                fetchEmplyess();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteEmployee = async (id: string) => {
        try {
            const resp = await fetch(`http://localhost:8081/api/v1/employees/${id}`, {
                method: 'DELETE'
            });
            if (resp.ok) {
                fetchEmplyess();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchEmplyess();
    }, []);

  return (
    <div className='em_div'>
        <div className='em_div_1'>
            <div className='em_header'>
                <span>Employee Management System</span>
                <button onClick={() => setShowForm(true)}>Add Employee</button>
            </div>

            {showForm && (
                <div className='em_form'>
                    <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Designation"
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Salary"
                        value={formData.salary}
                        onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
                    />
                    <button onClick={addEmployee}>Submit</button>
                    <button onClick={() => setShowForm(false)}>Cancel</button>
                </div>
            )}
        </div>
        <div className='em_div_2'>
        <table>
            <thead>
                <tr>
                    <td>Employee No</td>
                    <td>Employee Name</td>
                    <td>Designation</td>
                    <td>Salary</td>
                    <td>Actions</td>
                </tr>
            </thead>
            <tbody>
                {
                    empolyees?.map((e) => (
                        <React.Fragment key={e.id}>
                            <tr>
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                                <td>{e.designation}</td>
                                <td>{e.salary}</td>
                                <td>
                                    <button onClick={() => handleEditClick(e)}>Edit</button>
                                    <button onClick={() => deleteEmployee(e.id)}>Delete</button>
                                </td>
                            </tr>

                            {editingId === e.id && (
                                <tr>
                                    <td colSpan={5}>
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            value={editFormData.name}
                                            onChange={(ev) => setEditFormData({ ...editFormData, name: ev.target.value })}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Designation"
                                            value={editFormData.designation}
                                            onChange={(ev) => setEditFormData({ ...editFormData, designation: ev.target.value })}
                                        />
                                        <input
                                            type="number"
                                            placeholder="Salary"
                                            value={editFormData.salary}
                                            onChange={(ev) => setEditFormData({ ...editFormData, salary: Number(ev.target.value) })}
                                        />
                                        <button onClick={() => updateEmployee(e.id)}>Update</button>
                                        <button onClick={() => setEditingId(null)}>Cancel</button>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))
                }
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default EmployeeManagementPage