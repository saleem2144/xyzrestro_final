import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Staffs() {
    // Sample data for list of staff members
    const [staffs, setStaffs] = useState([]);

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + '/users?role=staff')
            .then((response) => response.json())
            .then((data) => {
                // setStaffs(data);
                // set staffs only role is staff
                const _staffs = data.filter((staff) => staff.role === 'staff');
                setStaffs(_staffs);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const handleAddStaff = () => {
        // Logic to add a staff member
        console.log('Add Staff button clicked');
    };

    const handleDeleteStaff = (id) => {
        console.log('Delete Staff button clicked for id: ' + id);
        fetch(import.meta.env.VITE_API_URL + '/users/' + id, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                // remove the deleted staff member from the staffs state
                // alert
                alert('Staff member deleted successfully');
                const newStaffs = staffs.filter((staff) => staff.id !== id);
                setStaffs(newStaffs);
            })
            .catch((error) => {
                console.error('Error:', error);
                // alert
                alert('Error deleting staff member');
            });
    }

    return (
        <Container>
            <h1>Staffs</h1>
            <div className="d-flex justify-content-end mb-2">
                <Button as={Link} to="/dashboard/staffs/add" variant="primary" onClick={handleAddStaff}>
                    Add Staff
                </Button>
            </div>

            {/* if staffs size is 0 display not staffs found other wise display table */}
            {staffs.length === 0 ? <p>No staffs found</p> : (

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffs.map((staff) => (
                            <tr key={staff.id}>
                                <td>{staff.id}</td>
                                <td>{staff.name}</td>
                                <td>{staff.email}</td>
                                <td>{staff.address}</td>
                                <td>
                                    {/* delete */}
                                    <Button variant="danger" onClick={() => handleDeleteStaff(staff.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}

export default Staffs;
