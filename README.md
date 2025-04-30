KUE Clinic Management System



 ### Improvments Should be applied ###

## FrontEnd

1, Nested Route for same parent Route
2, Import method like Use index.js file to import all Components
3, Error Page
4, Update component dirctory like to make components dynamic and make sure there are only components
5, in the UpdateAsign.jsx file the Notification should be determine based on the Patient asignment status using UseEffect
6, For New patient registration the 'Year' input should also include.


## BackEnd

5, Cache User Data After First DB Query
6, Patients can't have same phone number



   ### Functionality of the System ###

# MVP Functionality
-> Super Admin - creates Clinics And each Clinics has Default Admin(User)
-> Admin - Creates Receptionsists and Doctors
-> Receptionist - Creates Patient and assign to Doctor
-> Doctor - Access Assigned patients(by receptionist)
          - Create, Update Medical History for patients
          - Generate Referrals and Prescriptions for the patients


# MVP WorkFlow
1, Admin WorkFlow
-> admin create Users (reception and doctor)

# Admin -> create Users (Doctor or Receptionist)


2, Receptionist Workflow
-> for old patient - receptionist search patient and assign to doctor
-> for New patient - receptionist register the patient and then assign to doctor

# Receptionist -> Create New Patient -> Search Patient and Assigned to Doctors

3, Doctor WorkFlow
-> Doctor serve patients based on order of assigned
-> doctor access patients profile
-> If Patient has appointed MH doctor access the appointed MH then Update the MH
-> If Patient has no appointed MH doctor access the MHs Page -> Create New MH -> New MH Created ## (NOTE: after created MH Doctor can also Update the MH directly)
-> If the patient needs prescription Doctor -> generate prescription
-> If the patient needs Referral Doctor -> generate Referral

# DOCTOR | access asigned patient | -> Patient Profile -> if Appointed -> access old MH -> If Not -> Medical Histories -> Crreate New MH | after create it can Update it also | -> Generate Prescription OR Referral


