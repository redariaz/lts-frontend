import { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import appLabels from './CommonComponents/Labels'
import { Autocomplete, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import CustomReactDatePicker from './CommonComponents/CustomReactDatePicker';
import axios from 'axios';
import END_POINT from './CommonComponents/END_POINT';
import Spinner from './Spinner/Spinner';
import NotifyUser from './CommonComponents/NotifyUser';
import Table from './CommonComponents/Table';
import { Edit, Cached }  from "@mui/icons-material";
import TextFieldBox from './CommonComponents/TextField';

const UserProfile = () => {

  const [title, setTitle] = useState("");
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [empCode, setEmpCode] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [joiningDate, setJoiningDate] = useState();
  const [locationName, setLocationName] = useState();
  const [selectedLocationName, setSelectedLocationName] = useState(null);
  const [locationList, setLocationList] = useState([]);
  const [deptName, setDeptName] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departmentList, setDepartmentList] = useState([]);
  const [roleName, setRoleName] = useState();
  const [selectedRole, setSelectedRole] = useState(null);
  const [rolesList, setRolesList] = useState([]);
  const [shiftTime, setShiftTime] = useState();
  const [selectedShiftTime, setSelectedShiftTime] = useState(null);
  const [shiftsList, setShiftList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [originalUserData, setOriginalUserData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState();
  const [showDobCalendarIcon, setShowDobCalendarIcon] = useState(true);
  const [maritalStatus, setMaritalStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const options = [
    { value: 'Mr.', label: 'Mr.' },
    { value: 'Mrs.', label: 'Mrs.' },
    { value: 'Miss', label: 'Miss' },
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

  const getAllUsers = async() => {
      setIsLoading(true);
      const response = await axios.get(`${END_POINT.ltsUserURL}/users/getAllUsersForTable`);
      try {
        if (response.data.statusCode === 200) {
          const userData = response.data.data;
          if (Array.isArray(userData) && userData.length > 0) {
            const tableRows = userData.map((user, index) => ({
              ...user,
              id: user.id ?? user.userId ?? index
            }));
            setUsersList(tableRows);
            
            // Generate column definitions from API object keys
            const tableColumns = userData.length > 0
              ? Object.keys(userData[0]).map((key) => ({
              field: key,
              headerName: key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (char) => char.toUpperCase()),
              flex: 1,
              minWidth: 150
            }))
            : [];

            // Add the Modify column
            tableColumns.push({
              field: "action",
              headerName: "Action",
              width: 100,
              sortable: false,
              filterable: false,
              align: "center",
              headerAlign: "center",
              renderCell: (params) => {
                return (
                  <Tooltip title="Modify User">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(params.row)}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </Tooltip>
                );
              }
            })
            console.log(tableColumns, "tableColumns")
            setColumns(tableColumns);
          } else {
            setUsersList([]);
            setColumns([]);
          }
        }
      } catch (error) {
        console.error("error");
      }
      setIsLoading(false);
    }

  useEffect(() => {
    const getAllLocations = async() => {
      setIsLoading(true);
      const response = await axios.get(`${END_POINT.ltsUserURL}/location`);
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
      const response = await axios.get(`${END_POINT.ltsUserURL}/departments`);
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
      const response = await axios.get(`${END_POINT.ltsUserURL}/shifts`);
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
    if (!isEditMode) {
      if (selectedDepartment) {
        const getRolesByDeptId = async() => {
          setIsLoading(true);
          const response = await axios.get(`${END_POINT.ltsUserURL}/roles/department/${selectedDepartment?.value}`);
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
    }
  }, [selectedDepartment, isEditMode]);

  const handleSubmit = async() => {
    setIsLoading(true);
    const payload = {
      firstName: firstName,
      lastName: lastName,
      empCode: empCode,
      username: username,
      email: email,
      joiningDate: joiningDate,
      locationName: selectedLocationName?.label,
      deptName: selectedDepartment?.label,
      roleName: selectedRole?.label,
      shiftTime: selectedShiftTime?.inputLabel,
      gender: gender.toUpperCase(),
      dob: dob,
      maritalStatus: maritalStatus.toUpperCase(),
      createdDate: new Date(),
      modifiedDate: new Date()
    };
    console.log(payload, "payload")
    try {
      const response = await axios.post(`${END_POINT.ltsUserURL}/users/create-user`, payload);
      if (response.data.statusCode === 201) {
        NotifyUser(appLabels.toastMessage.labels.success, response.data.message);
        resetForm();
        generateRandomCode();
        setIsLoading(false);
      }
    } catch (error) {
      if (error.response) {
        NotifyUser(appLabels.toastMessage.labels.error, error.response.data.message);
      }
    }
    setIsLoading(false);
  }

  const resetForm = () => {
    setTitle("");
    setSelectedTitle(null);
    setFirstName("");
    setLastName("");
    setUsername("");
    setEmail("");
    setLocationName("");
    setSelectedLocationName(null);
    setDeptName("");
    setSelectedDepartment(null);
    setRoleName("");
    setSelectedRole(null);
    setShiftTime("");
    setSelectedShiftTime(null);
    setGender("");
    setDob("");
    setShowDobCalendarIcon(true);
    setMaritalStatus("");
    generateRandomCode();
  }

  const generateRandomCode = () => {
    const randomCode = Math.floor(Math.random() * (9999 - 1111 + 1)) + 1111;
    setEmpCode(randomCode);
  };

  const handleRefreshClick = () => {
    generateRandomCode();
  };

  const handleTitleChange = (event, newValue) => {
    setSelectedTitle(newValue);
  }

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  }

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setEmail(e.target.value + "@company.com");
  }

  const handleLocationChange = (event, newInputValue) => {
    setSelectedLocationName(newInputValue);
  }

  const handleDeptChange = (event, newValue) => {
    setSelectedDepartment(newValue);
  }

  const handleRoleChange = (event, newInputValue) => {
    setSelectedRole(newInputValue);
  }

  const handleShiftTimeChange = (event, newInputValue) => {
    setSelectedShiftTime(newInputValue);
    console.log(newInputValue, "payload")
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

  const handleEdit = async (user) => {
    console.log("Selected User:", user.empCode);
    try {
      const response = await axios.get(`${END_POINT.ltsUserURL}/users/${user.empCode}`);
      if (response.data.statusCode === 200) {
        const userData = response.data.data;
        console.log(userData, "userData")
        setOriginalUserData(userData);
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmpCode(userData.empCode);
        setUsername(userData.username);
        setEmail(userData.email);
        setJoiningDate(userData.joiningDate);
        setSelectedLocationName(userData.locationName);
        setSelectedDepartment(userData.deptName);
        setSelectedRole(userData.roleName);
        setSelectedShiftTime(userData.shiftTime);
        setGender(
          userData.gender
            ? userData.gender.charAt(0) + userData.gender.slice(1).toLowerCase()
            : ""
        );
        setDob(userData.dob);
        setMaritalStatus(
          userData.maritalStatus
            ? userData.maritalStatus.charAt(0) + userData.maritalStatus.slice(1).toLowerCase()
            : ""
        );
        setIsEditMode(true);
      }
    } catch (error) {
      console.error("Error fetching user details: ", error);
      NotifyUser(appLabels.toastMessage.labels.error,
        error.response?.data?.message || "Unable to fetch user details"
      );
    }
  }

  const buildUpdatePayload = () => {
    const currentUserData = {
      firstName,
      lastName,
      username,
      email,
      joiningDate,
      selectedLocationName,
      selectedDepartment,
      selectedRole,
      selectedShiftTime,
      dob,
      gender: gender ? gender.toUpperCase() : null,
      maritalStatus: maritalStatus ? maritalStatus.toUpperCase() : null
    };

    const updatePayload = {};

    Object.keys(currentUserData).forEach((key) => {
      if (currentUserData[key] !== originalUserData[key]) {
        updatePayload[key] = currentUserData[key];
      }
    });
    return updatePayload;
  }

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const updatePayload = buildUpdatePayload();
      const response = await axios.patch(`${END_POINT.ltsUserURL}/users/update-user/${empCode}`, updatePayload);
      if (response.data.statusCode === 200) {
        NotifyUser(appLabels.toastMessage.labels.success, response.data.message);
        setIsEditMode(false);
        resetForm();
        getAllUsers();
      }
    } catch (error) {
      NotifyUser(appLabels.toastMessage.labels.error,
        error.response?.data?.message || "Unable to update user"
      );
    }
  }

  const getMaxDate = () => {
      const today = new Date();
      today.setFullYear(today.getFullYear() - 18);
      return today;
    }

  const handleMaritalStatus = (e) => {
    setMaritalStatus(e.target.value);
  }

  const getLocationList = () => {
    return locationList.map((locations) => ({
      value: locations.locId,
      label: locations.locationName
    }));
  }

  const getDepartmentList = () => {
    return departmentList.map((dept) => ({
      value: dept.deptId,
      label: dept.deptName
    }));
  }

  const getRolesList = () => {
    return rolesList.map((roles) => ({
      value: roles.roleId,
      label: roles.roleName
    }));
  }

  const getShiftsList = () => {
    return shiftsList.map((shifts) => ({
      value: shifts.shiftId,
      inputLabel: shifts.shiftTime,
      label: shifts.shiftName + " - " + shifts.shiftTime
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
                      value={selectedTitle}
                      inputValue={title}
                      onInputChange={(event, newInputValue) => {
                        setTitle(newInputValue ?? "");
                      }}
                      options={options}
                      onChange={handleTitleChange}
                      renderInput={(params) => <TextFieldBox {...params} label={appLabels.userProfile.labels.title} />}
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
                    <TextFieldBox
                      fullWidth
                      name="firstName"
                      id="firstName"
                      value={firstName || ""}
                      onChange={handleFirstNameChange}
                      label={appLabels.userProfile.labels.firstName}
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
                    <TextFieldBox
                      fullWidth
                      name="lastName"
                      id="lastName"
                      value={lastName || ""}
                      onChange={handleLastNameChange}
                      label={appLabels.userProfile.labels.lastName}
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
                      value={empCode || ""}
                      aria-readonly
                      // label="Emp Code"
                      slotProps={{
                        input: {
                          endAdornment:
                            !isEditMode ? (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleRefreshClick}
                                  edge="end"
                                  aria-label="Clear text"
                                >
                                  <Cached/>
                                </IconButton>
                              </InputAdornment>
                            ) : null
                        }
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
                    <TextFieldBox
                      fullWidth
                      name="username"
                      id="username"
                      value={username || ""}
                      onChange={handleUsernameChange}
                      label={appLabels.userProfile.labels.username}
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
                    <TextFieldBox
                      fullWidth
                      aria-readonly
                      type="email"
                      name="email"
                      id="email"
                      value={email || ""}
                      label={appLabels.userProfile.labels.email}
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
                      // showCalendarIcon={true}
                      minDate={new Date()}
                      maxDate={new Date()}
                      disabled={true}
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
                      value={selectedLocationName}
                      inputValue={locationName}
                      options={getLocationList()}
                      onChange={handleLocationChange}
                      renderInput={(params) => <TextFieldBox {...params} label={appLabels.userProfile.labels.location} />}
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
                      value={selectedDepartment}
                      inputValue={deptName}
                      options={getDepartmentList()}
                      onChange={handleDeptChange}
                      renderInput={(params) => <TextFieldBox {...params} label={appLabels.userProfile.labels.dept} />}
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
                      name="roleName"
                      id="roleName"
                      value={selectedRole}
                      inputValue={roleName}
                      options={selectedDepartment ? getRolesList() : []}
                      onChange={handleRoleChange}
                      disabled={selectedDepartment ? false : true}
                      renderInput={(params) => <TextFieldBox {...params} label={appLabels.userProfile.labels.role} />}
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
                      value={selectedShiftTime}
                      inputValue={shiftTime}
                      options={getShiftsList()}
                      onChange={handleShiftTimeChange}
                      renderInput={(params) => <TextFieldBox {...params} label={appLabels.userProfile.labels.shiftTime} />}
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
                      maxDate={getMaxDate()}
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      yearDropdownItemNumber={100}
                      scrollableYearDropdown
                      showCalendarIcon={showDobCalendarIcon && !isEditMode}
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
                  <Col md={3}>
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
                    <Button onClick={!isEditMode ? handleSubmit : handleUpdate}>
                      { !isEditMode ? `${appLabels.commonLabels.submit}` : `${appLabels.commonLabels.update}` }
                    </Button>{" "}
                    <Button type="button" variant='secondary' onClick={resetForm}>
                      { !isEditMode ? `${appLabels.commonLabels.reset}` : `${appLabels.commonLabels.cancel}` }
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
          <Table
            rows={usersList}
            columns={columns}
            loading={isLoading}
            height={500}
            pageSizeOptions={[5, 10, 25]}
          />
        </Card.Body>
      </Card>

      <Spinner loading={isLoading} />
    </div>
  )
}

export default UserProfile