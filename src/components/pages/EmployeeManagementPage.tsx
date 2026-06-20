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

    const fetchEmplyess = async () => {
        try {
            const resp = await fetch('http://localhost:8081/api/v1/employees');
            const data = await resp.json();
            setEmployees(data);
        } catch (error) {
            console.log(error);
        }
    };

    const addEmployee = async () => {
        try {
            const resp = await fetch('http://localhost:8081/api/v1/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (resp.ok) {
                setShowForm(false);
                setFormData({ name: '', designation: '', salary: 0 });
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
            <button onClick={() => setShowForm(true)}>Add Employee</button>

            {showForm && (
                <div>
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
                    <td>
                        Employee No
                    </td>
                    <td>
                        Employee Name
                    </td>
                    <td>
                        Designation
                    </td>
                    <td>
                        Salary
                    </td>
                    <td>
                        Actions
                    </td>
                </tr>
            </thead>
            <tbody>
                {
                    empolyees?.map((e) => (
                            <tr key={e.id}>
                                <td>
                                    {e.id}
                                </td>
                                <td>
                                    {e.name}
                                </td>
                                <td>
                                    {e.designation}
                                </td>
                                <td>
                                    {e.salary}
                                </td>
                                <td>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </td>
                            </tr>
                            ))
                }
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default EmployeeManagementPage