import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import appLabels from './CommonComponents/Labels'
import { Autocomplete, TextField } from '@mui/material';
import CustomReactDatePicker from './CommonComponents/CustomReactDatePicker';
import axios from 'axios';
import END_POINT from './CommonComponents/END_POINT';
import Spinner from './Spinner/Spinner';

const UserProfile = () => {

  const [title, setTitle] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [empCode, setEmpCode] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [joiningDate, setJoiningDate] = useState();
  const [location, setLocation] = useState();
  const [locationList, setLocationList] = useState([]);
  const [department, setDepartment] = useState();
  const [departmentList, setDepartmentList] = useState([]);
  const [role, setRole] = useState();
  const [rolesList, setRolesList] = useState([]);
  const [shiftTime, setShiftTime] = useState();
  const [shiftsList, setShiftList] = useState([]);
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState();
  const [showDobCalendarIcon, setShowDobCalendarIcon] = useState(true);
  const [maritalStatus, setMaritalStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const options = [
    { value: 'Miss', label: 'Miss' },
    { value: 'Mrs.', label: 'Mrs.' },
    { value: 'Mr.', label: 'Mr.' },
  ]

  useEffect(() => {
    const inputDate = new Date();
    const date = String(inputDate.getDate()).padStart(2, "0");
    const month = String(inputDate.getMonth() + 1).padStart(2, "0");
    const year = inputDate.getFullYear();
    const formattedDate = `${year}-${month}-${date}`;
    setJoiningDate(formattedDate);
    generateRandomCode();
  }, []);

  useEffect(() => {
    const getAllLocations = async() => {
      setIsLoading(true);
      const response = await axios.get(`${END_POINT.ltsUserURL}/locations/get-all-locations`);
      try {
        if (response.data.statusCode === 200) {
          setLocationList(response.data.data);
        }
      } catch (error) {
        console.error("error")
      }
      setIsLoading(false);
    }
    const getAllDepartments = async() => {
      setIsLoading(true);
      const response = await axios.get(`${END_POINT.ltsUserURL}/dept/get-all-departments`);
      try {
        if (response.data.statusCode === 200) {
          setDepartmentList(response.data.data);
        }
      } catch (error) {
        console.error("error");
      }
      setIsLoading(false);
    }
    const getAllShifts = async() => {
      setIsLoading(true);
      const response = await axios.get(`${END_POINT.ltsUserURL}/shifts/get-all-shifts`);
      try {
        if (response.data.statusCode === 200) {
          setShiftList(response.data.data);
        }
      } catch (error) {
        console.error("error");
      }
      setIsLoading(false);
    }
    getAllLocations();
    getAllDepartments();
    getAllShifts();
  }, []);

  useEffect(() => {
    if (department) {
      const getRolesByDeptId = async() => {
        setIsLoading(true);
        const response = await axios.get(`${END_POINT.ltsUserURL}/roles/get-roles-by-deptId/${department}`);
        try {
          if (response.data.statusCode === 200) {
            setRolesList(response.data.data);
          }
        } catch (error) {
          console.error("error");
        }
        setIsLoading(false);
      }
      getRolesByDeptId();
    }
  }, [department]);

  const resetForm = () => {
    setTitle("");
    setFirstName("");
    setLastName("");
    setUsername("");
    setEmail("");
    setLocation("");
    setDepartment("");
    setRole("");
    setShiftTime("");
    setGender("");
    setDob("");
    setMaritalStatus("");
  }

  const generateRandomCode = () => {
    const randomCode = Math.floor(Math.random() * (9999 - 1111 + 1)) + 1111;
    setEmpCode(randomCode.toString());
  };

  const handleRefreshClick = () => {
    generateRandomCode();
  };

  const handleTitleChange = (e, data) => {
    setTitle(data.value);
  }

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  }

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setEmail(e.target.value + "@galaxe.com");
  }

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  }

  const handleDeptChange = (e, data) => {
    setDepartment(data ? data.value : "");
  }

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  }

  const handleShiftTimeChange = (e) => {
    setShiftTime(e.target.value);
  }

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  }

  const handleDobChange = (date) => {
    if (date) {
      const inputDate = new Date(date);
      const day = String(inputDate.getDate()).padStart(2, "0");
      const month = String(inputDate.getMonth() + 1).padStart(2, "0");
      const year = String(inputDate.getFullYear());
      const formattedDate = `${year}-${month}-${day}`;
      setDob(formattedDate);
      setShowDobCalendarIcon(false)
    } else {
      setDob("");
      setShowDobCalendarIcon(true);
    }
  }

  const handleMaritalStatus = (e) => {
    setMaritalStatus(e.target.value);
  }

  const getLocationList = () => {
    return locationList.map((locations) => ({
      value: locations.id,
      label: locations.location
    }));
  }

  const getDepartmentList = () => {
    return departmentList.map((dept) => ({
      value: dept.id,
      label: dept.dept
    }));
  }

  const getRolesList = () => {
    return rolesList.map((roles) => ({
        value: roles.id,
        label: roles.role
    }));
  }

  const getShiftsList = () => {
    return shiftsList.map((shifts) => ({
      value: shifts.id,
      label: shifts.shiftTime
    }));
  }

  return (
    <div className='contentContainer'>
      <Card className='me-2 mb-3'>
        <Card.Header className='cardHeader'>
          <div className="cardHeading">
            {appLabels.userProfile.labels.userProfile}
          </div>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row className='mb-3'>
              <Col md={6}>
                <Row>
                  <Col md={3}>
                    <label>
                      {appLabels.userProfile.labels.title}:
                      <span className="classification_star">*</span>
                    </label>
                  </Col>
                  <Col md={6}>
                    <Autocomplete
                      name="title"
                      id="title"
                      value={title}
                      options={options}
                      onChange={handleTitleChange}
                      renderInput={(params) => <TextField {...params} label="Title" />}
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row>
                  <Col md={3}>
                    <label>
                      {appLabels.userProfile.labels.firstName}:
                      <span className="classification_star">*</span>
                    </label>
                  </Col>
                  <Col md={6}>
                    <TextField
                      fullWidth
                      name="firstName"
                      id="firstName"
                      value={firstName}
                      onChange={handleFirstNameChange}
                      label="First Name"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col md={6}>
                <Row>
                  <Col md={3}>
                    <label>
                      {appLabels.userProfile.labels.lastName}:
                      <span className="classification_star">*</span>
                    </label>
                  </Col>
                  <Col md={6}>
                    <TextField
                      fullWidth
                      name="lastName"
                      id="lastName"
                      value={lastName}
                      onChange={handleLastNameChange}
                      label="Last Name"
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row>
                  <Col md={3}>
                    <label>
                      {appLabels.userProfile.labels.empCode}:
                      <span className="classification_star">*</span>
                    </label>
                  </Col>
                  <Col md={6}>
                    <TextField
                      fullWidth
                      name="empCode"
                      id="empCode"
                      value={empCode}
                      aria-readonly
                      label="Emp Code"
                      InputProps={{
                        endAdornment: (
                          <i 
                            className="fa-solid fa-arrows-rotate"
                            onClick={handleRefreshClick}
                            style={{ cursor: 'pointer' }}
                          />
                        ),
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col md={6}>
                <Row>
                  <Col md={3}>
                    <label>
                      {appLabels.userProfile.labels.username}:
                      <span className="classification_star">*</span>
                    </label>
                  </Col>
                  <Col md={6}>
                    <TextField
                      fullWidth
                      name="username"
                      id="username"
                      value={username}
                      onChange={handleUsernameChange}
                      label="Username"
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row>
                  <Col md={3}>
                    <label>
                      {appLabels.userProfile.labels.email}:
                      <span className="classification_star">*</span>
                    </label>
                  </Col>
                  <Col md={6}>
                    <TextField
                      fullWidth
                      aria-readonly
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      label="Email"
                      InputLabelProps={{
                        shrink: !!email
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col md={6}>
                <Row>
                  <Col md={3}>
                    <label>
                      {appLabels.userProfile.labels.joiningDate}:
                      <span className="classification_star">*</span>
                    </label>
                  </Col>
                  <Col md={6}>
                    <CustomReactDatePicker
                      name="joiningDate"
                      id="joiningDate"
                      selected={joiningDate}
                      // onChange={handleJoiningDateChange}
                      showCalendarIcon={true}
                      minDate={new Date()}
                      maxDate={new Date()}
                      isClearable={false}
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row>
                  <Col md={3}>
                    <label>
                      {appLabels.userProfile.labels.location}:
                      <span className="classification_star">*</span>
                    </label>
                  </Col>
                  <Col md={6}>
                    <Autocomplete
                      name="location"
                      id="location"
                      value={location}
                      options={getLocationList()}
                      onChange={handleLocationChange}
                      renderInput={(params) => <TextField {...params} label="Location" />}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col md={6}>
                <Row>
                  <Col md={3}>
                    <label>
                      {appLabels.userProfile.labels.dept}:
                      <span className="classification_star">*</span>
                    </label>
                  </Col>
                  <Col md={6}>
                    <Autocomplete
                      name="dept"
                      id="dept"
                      value={department}
                      options={getDepartmentList()}
                      onChange={handleDeptChange}
                      renderInput={(params) => <TextField {...params} label="Department" />}
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row>
                  <Col md={3}>
                    <label>
                      {appLabels.userProfile.labels.role}:
                      <span className="classification_star">*</span>
                    </label>
                  </Col>
                  <Col md={6}>
                    <Autocomplete
                      name="role"
                      id="role"
                      value={role}
                      options={department ? getRolesList() : []}
                      onChange={handleRoleChange}
                      disabled={department ? false : true}
                      renderInput={(params) => <TextField {...params} label="Role" />}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col md={6}>
                <Row>
                  <Col md={3}>
                    <label>
                      {appLabels.userProfile.labels.shiftTime}:
                      <span className="classification_star">*</span>
                    </label>
                  </Col>
                  <Col md={6}>
                    <Autocomplete
                      name="shiftTime"
                      id="shiftTime"
                      value={shiftTime}
                      options={getShiftsList()}
                      onChange={handleShiftTimeChange}
                      renderInput={(params) => <TextField {...params} label="Shift Time" />}
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row>
                  <Col md={3}>
                    <label>
                      {appLabels.userProfile.labels.gender}:
                      <span className="classification_star">*</span>
                    </label>
                  </Col>
                  <Col md={2}>
                    <label>
                      <input
                        type='radio'
                        name='gender'
                        id='gender'
                        value="Male"
                        checked={gender === "Male"}
                        onChange={handleGenderChange}
                      />{" "}
                      {appLabels.userProfile.labels.male}
                    </label>
                  </Col>
                  <Col md={2}>
                    <label>
                      <input
                        type='radio'
                        name='gender'
                        id='gender'
                        value="Female"
                        checked={gender === "Female"}
                        onChange={handleGenderChange}
                      />{" "}
                      {appLabels.userProfile.labels.female}
                    </label>
                  </Col>
                  <Col md={2}>
                    <label>
                      <input
                        type='radio'
                        name='gender'
                        id='gender'
                        value="Others"
                        checked={gender === "Others"}
                        onChange={handleGenderChange}
                      />{" "}
                      {appLabels.userProfile.labels.others}
                    </label>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col md={6}>
                <Row>
                  <Col md={3}>
                    <label>
                      {appLabels.userProfile.labels.dob}:
                      <span className="classification_star">*</span>
                    </label>
                  </Col>
                  <Col md={6}>
                    <CustomReactDatePicker
                      name="dob"
                      id="dob"
                      selected={dob}
                      onChange={handleDobChange}
                      maxDate={new Date()}
                      showCalendarIcon={showDobCalendarIcon}
                      isClearable={dob ? true : false}
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row>
                  <Col md={3}>
                    <label>
                      {appLabels.userProfile.labels.maritalStatus}:
                      <span className="classification_star">*</span>
                    </label>
                  </Col>
                  <Col md={2}>
                    <label>
                      <input
                        type='radio'
                        name='maritalStatus'
                        id='maritalStatus'
                        value="Married"
                        checked={maritalStatus === "Married"}
                        onChange={handleMaritalStatus}
                      />{" "}
                      {appLabels.userProfile.labels.married}
                    </label>
                  </Col>
                  <Col md={3}>
                    <label>
                      <input
                        type='radio'
                        name='maritalStatus'
                        id='maritalStatus'
                        value="Unmarried"
                        checked={maritalStatus === "Unmarried"}
                        onChange={handleMaritalStatus}
                      />{" "}
                      {appLabels.userProfile.labels.unmarried}
                    </label>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col md={12}>
                <Row>
                  <Col md={9}></Col>
                  <Col md={3}>
                    <Button>
                      {appLabels.commonLabels.submit}
                    </Button>{" "}
                    <Button variant='secondary' onClick={resetForm}>
                      {appLabels.commonLabels.reset}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Spinner loading={isLoading} />
    </div>
  )
}

export default UserProfile