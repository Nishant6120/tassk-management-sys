(function($) { // Using jQuery wrapper for better $ scope
    "use strict"; // Enforce strict mode

    // --- Global Data Stores (Mock Data) ---
    // In a real application, this data would come from a backend API.
    let employees = [
        { id: 'emp_001', name: 'Kirti Agrawal', designation: 'Manager', department: 'Sales', organization: 'ORG001', isActive: true, username: 'kirti.a', password: 'password123', role: 'employee' },
        { id: 'emp_002', name: 'Harpreet Kaur', designation: 'Analyst', department: 'Marketing', organization: 'ORG002', isActive: true, username: 'harpreet.k', password: 'password123', role: 'employee' },
        { id: 'emp_003', name: 'Chandani', designation: 'Developer', department: 'IT', organization: 'ORG001', isActive: false, username: null, password: null, role: null },
        { id: 'emp_004', name: 'Raj Patel', designation: 'Sales Rep', department: 'Sales', organization: 'ORG002', isActive: true, username: null, password: null, role: null },
        { id: 'admin_account', name: 'Admin', designation: 'N/A', department: 'N/A', organization: 'N/A', isActive: true, username: 'admin', password: 'adminpassword', role: 'admin' }
    ];

    let organizations = [
        { _id: 'ORG001', name: 'Legrand' },
        { _id: 'ORG002', name: 'Accutech' },
        { _id: 'ORG003', name: 'Global Corp' }
    ];

    let processes = [
        { _id: 'PROC001', name: 'Legrand_CRM', organizationId: 'ORG001' },
        { _id: 'PROC002', name: 'Numeric_AMC', organizationId: 'ORG002' },
        { _id: 'PROC003', name: 'Numeric_Product', organizationId: 'ORG002' }
    ];

    let campaigns = [
        { _id: 'CAMP001', name: 'Bulk order', organizationId: 'ORG001', processId: 'PROC001' },
        { _id: 'CAMP002', name: 'Home Automation', organizationId: 'ORG001', processId: 'PROC001' },
        { _id: 'CAMP003', name: 'Legrand_eShop', organizationId: 'ORG002', processId: 'PROC002' }
    ];

    let allTasksData = [
        {
            id: 'TID001', taskDate: '2025-07-17', organization: 'ORG001', process: 'PROC001', assignedToEmployee: 'emp_001', status: 'Pending', generalComment: 'Initial task for Q3 sales.', isActive: true,
            leads: { dateFrom: '2025-07-01', dateTo: '2025-07-05', month: 'July-2025', region: 'North', campaign: 'CAMP001', quantity: 100, convertToProspects: 10, comment: 'Initial lead engagement', assignments: ['July-2025-North'] },
            prospects: null,
            activeLeadsToProspects: 5, activeConvertToWon: 0, activeSales: 0 // Mock active data
        },
        {
            id: 'TID002', taskDate: '2025-07-16', organization: 'ORG002', process: 'PROC002', assignedToEmployee: 'emp_002', status: 'In Progress', generalComment: 'Follow up on product inquiries.', isActive: true,
            leads: null,
            prospects: { dateFrom: '2025-07-06', dateTo: '2025-07-10', month: 'July-2025', region: 'East', campaign: 'CAMP003', quantity: 10, convertToWon: 2, employeeSaleTarget: 250000, comment: 'Client signed up.', assignments: ['July-2025-East', 'Aug-2025-East'] },
            activeLeadsToProspects: 0, activeConvertToWon: 1, activeSales: 125000 // Mock active data
        },
        {
            id: 'TID003', taskDate: '2025-07-18', organization: 'ORG001', process: 'PROC001', assignedToEmployee: 'emp_003', status: 'Completed', generalComment: 'CRM system update analysis.', isActive: false, // Deactivated task
            leads: { dateFrom: '2025-06-15', dateTo: '2025-06-20', month: 'June-2025', region: 'South', campaign: 'CAMP002', quantity: 50, convertToProspects: 5, comment: 'Reviewed current CRM usage.' , assignments: ['June-2025-South']},
            prospects: null,
            activeLeadsToProspects: 5, activeConvertToWon: 0, activeSales: 0 // Mock active data
        },
        {
            id: 'TID004', taskDate: '2025-07-15', organization: 'ORG002', process: 'PROC003', assignedToEmployee: 'emp_004', status: 'Overdue', generalComment: 'Launch new product line campaign.', isActive: true,
            leads: null,
            prospects: { dateFrom: '2025-07-01', dateTo: '2025-07-07', month: 'July-2025', region: 'West', campaign: 'CAMP003', quantity: 15, convertToWon: 3, employeeSaleTarget: 300000, comment: 'Awaiting final creative assets.' , assignments: ['July-2025-West', 'August-2025-West']},
            activeLeadsToProspects: 0, activeConvertToWon: 1, activeSales: 100000 // Mock active data
        },
        {
            id: 'TID005', taskDate: '2025-07-19', organization: 'ORG001', process: 'PROC001', assignedToEmployee: 'emp_001', status: 'Pending', generalComment: 'Follow up on key accounts in North region.', isActive: true,
            leads: { dateFrom: '2025-07-10', dateTo: '2025-07-15', month: 'July-2025', region: 'North', campaign: 'CAMP001', quantity: 75, convertToProspects: 8, comment: 'Initial contact made with 5 accounts.', assignments: ['July-2025-North', 'August-2025-North']},
            prospects: null,
            activeLeadsToProspects: 2, activeConvertToWon: 0, activeSales: 0 // Mock active data
        },
        {
            id: 'TID006', taskDate: '2025-07-20', organization: 'ORG002', process: 'PROC002', assignedToEmployee: 'emp_002', status: 'In Progress', generalComment: 'Analyze market trends for Q3.', isActive: true,
            leads: null,
            prospects: { dateFrom: '2025-07-15', dateTo: '2025-07-20', month: 'July-2025', region: 'East', campaign: 'CAMP003', quantity: 8, convertToWon: 1, employeeSaleTarget: 150000, comment: 'Gathering data, preliminary findings positive.', assignments: ['July-2025-East']},
            activeLeadsToProspects: 0, activeConvertToWon: 0, activeSales: 0 // Mock active data
        }
    ];

    let currentFilters = { searchTerm: '', taskDateFrom: '', taskDateTo: '', organization: '', process: '', employee: '', status: '' };
    let editingEmployeeLogin = null; // Stores the employee object currently being edited in the modal

    // --- Authentication (Uncomment in production) ---
    function checkAuth() {
        // Now expecting 'session_id' or 'user_role' directly, not 'jwt_token'
        const sessionId = localStorage.getItem('session_id');
        const role = localStorage.getItem('user_role');
        if (!sessionId || role !== 'admin') {
            alert('Unauthorized access. Please log in as Admin.');
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }

    // --- Mock API Simulation (for demonstration purposes) ---
    async function makeAuthRequest(url, method = 'POST', data = null) {
        console.log(`Mock API Call: ${method} ${url}`, data);
        // In a real application, you would send fetch requests here:
        /*
        const headers = { 'Content-Type': 'application/json' };
        // *** IMPORTANT CHANGE HERE ***
        // Use 'session_id' from localStorage for authorization
        const sessionId = localStorage.getItem('session_id');
        if (sessionId) {
            // This is a common way to send a session ID in a custom header
            // Your backend must be configured to read this header.
            headers['X-Session-ID'] = sessionId;
            // Alternatively, if your backend uses cookies for session management,
            // the browser will automatically send the session cookie and you might not need this header.
        }

        const options = { method, headers };
        if (data) options.body = JSON.stringify(data);

        const response = await fetch(url, options);
        if (!response.ok) {
            // Handle unauthorized (401) specifically for session expiration
            if (response.status === 401 || response.status === 403) {
                alert('Session expired or unauthorized. Please log in again.');
                localStorage.clear(); // Clear local storage on session expiration
                window.location.href = 'login.html';
                throw new Error('Unauthorized or session expired');
            }
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
        */

        // --- MOCK DATA SIMULATION (KEEP FOR LOCAL DEV) ---
        return new Promise(resolve => {
            setTimeout(() => {
                let responseData = null;
                if (url.includes('/admin/organizations')) {
                    const newOrg = { _id: `ORG${String(organizations.length + 1).padStart(3, '0')}`, name: data.name };
                    organizations.push(newOrg);
                    responseData = newOrg;
                } else if (url.includes('/admin/processes')) {
                    const newProc = { _id: `PROC${String(processes.length + 1).padStart(3, '0')}`, name: data.name, organizationId: data.organizationId };
                    processes.push(newProc);
                    responseData = newProc;
                } else if (url.includes('/admin/campaigns')) {
                    const newCampaign = { _id: `CAMP${String(campaigns.length + 1).padStart(3, '0')}`, name: data.name, organizationId: data.organizationId, processId: data.processId };
                    campaigns.push(newCampaign);
                    responseData = newCampaign;
                } else if (url.includes('/admin/tasks')) {
                    // For tasks, check if it's an existing task (PUT) or new (POST)
                    if (method === 'PUT' && data.id) {
                        const taskIndex = allTasksData.findIndex(t => t.id === data.id);
                        if (taskIndex !== -1) {
                            allTasksData[taskIndex] = { ...allTasksData[taskIndex], ...data };
                            responseData = allTasksData[taskIndex];
                        } else {
                            console.error('Task not found for update:', data.id);
                            responseData = null;
                        }
                    } else { // Assume POST for new task
                        const newTaskId = 'TID' + (allTasksData.length + 1).toString().padStart(3, '0');
                        const newTask = { id: newTaskId, ...data, isActive: true, // New tasks are active by default
                                         activeLeadsToProspects: 0, activeConvertToWon: 0, activeSales: 0 // Initialize active stats for new tasks
                                        };
                        allTasksData.push(newTask);
                        responseData = newTask;
                    }
                } else if (url.includes('/admin/employees_full')) { // Unified endpoint for employee and login details
                    if (method === 'POST') { // Add new employee
                        const newEmp = { ...data, isActive: true, username: null, password: null, role: null }; // New employee starts without login
                        employees.push(newEmp);
                        responseData = newEmp;
                    } else if (method === 'PUT') { // Update existing employee
                        const empIndex = employees.findIndex(e => e.id === data.id);
                        if (empIndex !== -1) {
                            employees[empIndex] = { ...employees[empIndex], ...data }; // Merge updates
                            responseData = employees[empIndex];
                        }
                    }
                }
                resolve(responseData);
            }, 300); // Simulate network delay
        });
    }

    // --- Helper Functions ---

    /**
     * Populates a select2 dropdown with data.
     * @param {jQuery} dropdown - The jQuery wrapped select element.
     * @param {Array} dataArray - Array of objects to populate the dropdown.
     * @param {string} valueKey - The key for the option's value.
     * @param {string} textKey - The key for the option's display text.
     * @param {string} defaultOptionText - Text for the default (empty) option.
     * @param {boolean} hasAllOption - If true, the default option's text will imply "All".
     */
    function populateDropdown(dropdown, dataArray, valueKey, textKey, defaultOptionText = 'Select', hasAllOption = false) {
        if (!dropdown.length) {
            console.warn("Dropdown element not found:", dropdown.selector);
            return;
        }
        const currentVal = dropdown.val();
        dropdown.empty();
        dropdown.append(new Option(hasAllOption ? defaultOptionText.replace('Select', 'All') : defaultOptionText, ''));
        dataArray.forEach(item => dropdown.append(new Option(item[textKey], item[valueKey])));
        dropdown.val(currentVal).trigger('change.select2');
    }

    /**
     * Initializes all Select2 and Datepicker instances.
     */
    function initializeUIComponents() {
        $('.select2-enabled').select2({ placeholder: "Select", allowClear: true, width: '100%' });
        $('.select2-enabled-filter').select2({ placeholder: "All", allowClear: true, width: '100%' });
        $(".datepicker").datepicker({ dateFormat: 'yy-mm-dd' });
        // Specific datepicker for task date (today or tomorrow)
        $('#taskDate').datepicker({
            dateFormat: 'yy-mm-dd',
            minDate: 0, // Cannot be before today (0 means today)
            maxDate: 1 // Allows today and tomorrow (+1 means tomorrow)
        });
        $(".datepicker-filter").datepicker({ dateFormat: 'yy-mm-dd' });
    }

    /**
     * Updates all relevant dropdowns across the dashboard.
     */
    function updateAllDashboardDropdowns() {
        populateDropdown($('#taskOrganizationSelect'), organizations, '_id', 'name', 'Select Organization');
        populateDropdown($('#employeeOrganizationSelect'), organizations, '_id', 'name', 'Select Organization');
        populateDropdown($('#processOrganizationSelect'), organizations, '_id', 'name', 'Select Organization');
        populateDropdown($('#campaignOrganizationSelect'), organizations, '_id', 'name', 'Select Organization');
        populateDropdown($('#filterOrganization'), organizations, '_id', 'name', 'All Organizations', true);
        populateDropdown($('#editOrganization'), organizations, '_id', 'name', 'Select Organization');

        populateDropdown($('#filterProcess'), processes, '_id', 'name', 'All Processes', true);
        populateDropdown($('#editProcess'), processes, '_id', 'name', 'Select Process');

        const activeEmployees = employees.filter(emp => emp.isActive);
        populateDropdown($('#taskEmployeeSelect'), activeEmployees, 'id', 'name', 'Select Employee');
        populateDropdown($('#filterEmployee'), activeEmployees, 'id', 'name', 'All Employees', true);
        populateDropdown($('#editEmployee'), activeEmployees, 'id', 'name', 'Select Employee');

        // Populate loginEmployeeId dropdown ONLY with employees who don't have a login
        const employeesForLoginDropdown = employees.filter(emp =>
            (emp.id !== 'admin_account' && emp.isActive && !emp.username) ||
            (emp.id === 'admin_account' && !emp.username)
        );
        populateDropdown($('#loginEmployeeId'), employeesForLoginDropdown, 'id', 'name', 'Select Employee');

        populateDropdown($('#leadsQuantityCampaignMaster'), campaigns, '_id', 'name', 'Select Campaign');
        populateDropdown($('#prospectsQuantityCampaignMaster'), campaigns, '_id', 'name', 'Select Campaign');
        populateDropdown($('#editLeadsCampaign'), campaigns, '_id', 'name', 'Select Campaign');
        populateDropdown($('#editProspectsCampaign'), campaigns, '_id', 'name', 'Select Campaign');
    }

    /**
     * Populates year dropdowns for dual listboxes.
     * Also sets initial default values for Month and Region.
     */
    function initializeTaskAssignmentBuilders() {
        // Populate Year dropdowns
        const currentYear = new Date().getFullYear();
        // Target all year dropdowns for both create and edit modals
        const yearSelects = $('#leadsAssignmentYear, #prospectsAssignmentYear, #editLeadsAssignmentYear, #editProspectsAssignmentYear');
        yearSelects.empty();
        // Loop from 7 years prior to current year, up to 7 years after current year (total 15 years)
        for (let i = currentYear - 7; i <= currentYear + 7; i++) {
            yearSelects.append(new Option(i, i));
        }

        // Set initial selections for new task form (create task form)
        const currentMonthAbbr = new Date().toLocaleString('default', { month: 'short' });
        $('#leadsAssignmentMonth, #prospectsAssignmentMonth').val(currentMonthAbbr);
        $('#leadsAssignmentYear, #prospectsAssignmentYear').val(currentYear);
        $('#leadsAssignmentRegion, #prospectsAssignmentRegion').val('All'); // Default to "All Regions"

        // Ensure "Select" placeholders are correctly set for Month/Region dropdowns in create task form
        const monthRegionSelects = $('#leadsAssignmentMonth, #prospectsAssignmentMonth, #leadsAssignmentRegion, #prospectsAssignmentRegion, #editLeadsAssignmentMonth, #editProspectsAssignmentMonth, #editLeadsAssignmentRegion, #editProspectsAssignmentRegion');
        monthRegionSelects.each(function() {
            // Check if a placeholder/empty option already exists, if not, add one.
            // This is especially for dropdowns not handled by populateDropdown (like static HTML ones)
            if ($(this).find('option[value=""]').length === 0) {
                const labelText = $(this).attr('id').includes('Month') ? 'Month' : 'Region';
                $(this).prepend(`<option value="" selected disabled hidden>Select ${labelText}</option>`);
                $(this).val(''); // Set it to the empty option
            }
        });
    }

    /**
     * Moves selected options between dual listboxes.
     * @param {string} fromBoxId - ID of the source select element.
     * @param {string} toBoxId - ID of the destination select element.
     */
    function moveOptions(fromBoxId, toBoxId) {
        const fromBox = document.getElementById(fromBoxId);
        const toBox = document.getElementById(toBoxId);
        if (!fromBox || !toBox) {
            console.error(`Missing one of the listboxes: #${fromBoxId} or #${toBoxId}`);
            return;
        }
        // Move selected options only
        Array.from(fromBox.selectedOptions).forEach(option => {
            toBox.appendChild(option);
        });
        // Deselect moved options from source to clean up UI
        Array.from(fromBox.options).forEach(option => option.selected = false);
    }

    /**
     * Adds a new assignment (month, year, region) to the left dual listbox.
     * This function takes a prefix to determine which set of dropdowns/listboxes to target.
     * @param {string} prefix - 'leads', 'prospects', 'editLeads', or 'editProspects'.
     */
    function addAssignment(prefix) {
        const monthSelect = document.getElementById(`${prefix}AssignmentMonth`);
        const yearSelect = document.getElementById(`${prefix}AssignmentYear`);
        const regionSelect = document.getElementById(`${prefix}AssignmentRegion`);

        if (!monthSelect || !yearSelect || !regionSelect) {
            console.error(`Could not find assignment dropdowns for prefix: ${prefix}`);
            alert('Failed to add assignment. UI elements not found.');
            return;
        }

        const monthValue = monthSelect.value;
        const yearValue = yearSelect.value;
        const regionValue = regionSelect.value;

        if (!monthValue || !yearValue || !regionValue) {
            alert('Please select a month, year, and region to add an assignment.');
            return;
        }

        // Display text for the option
        const monthText = monthValue === 'All' ? 'All Months' : monthSelect.options[monthSelect.selectedIndex].text;
        const regionText = regionValue === 'All' ? 'All Regions' : regionSelect.options[regionSelect.selectedIndex].text;

        const displayText = `${monthText} ${yearValue} - ${regionText}`;
        const valueText = `${monthValue}-${yearValue}-${regionValue}`;

        // Determine which listboxes to target based on the prefix (remove 'edit' from prefix if present)
        const targetType = prefix.replace('edit', ''); // 'leads' or 'prospects'

        // Correctly target the left and right boxes based on the prefix
        const leftBoxId = prefix.includes('edit') ? `leftBoxEdit${targetType.charAt(0).toUpperCase() + targetType.slice(1)}` : `leftBox${targetType.charAt(0).toUpperCase() + targetType.slice(1)}`;
        const rightBoxId = prefix.includes('edit') ? `rightBoxEdit${targetType.charAt(0).toUpperCase() + targetType.slice(1)}` : `rightBox${targetType.charAt(0).toUpperCase() + targetType.slice(1)}`;

        const actualLeftBox = document.getElementById(leftBoxId);
        const actualRightBox = document.getElementById(rightBoxId);

        if (!actualLeftBox || !actualRightBox) {
             console.error(`Could not find listboxes for prefix: ${prefix} (target IDs: ${leftBoxId}, ${rightBoxId})`);
             alert('Failed to add assignment. Listbox elements not found.');
             return;
        }

        const optionExists = Array.from(actualLeftBox.options).some(opt => opt.value === valueText) ||
                               Array.from(actualRightBox.options).some(opt => opt.value === valueText);

        if (optionExists) {
            alert('This assignment already exists.');
            return;
        }
        actualLeftBox.appendChild(new Option(displayText, valueText));

        // Reset the assignment builder dropdowns to their default values for next entry
        $(monthSelect).val(new Date().toLocaleString('default', { month: 'short' }));
        $(yearSelect).val(new Date().getFullYear());
        $(regionSelect).val('All');
    }

    /**
     * Retrieves all options from a multi-select listbox (used to get assignments).
     * @param {string} boxId - ID of the select element.
     * @returns {Array<string>} An array of all option values.
     */
    function getSelectionsFromListbox(boxId) {
        const box = document.getElementById(boxId);
        if (!box) {
            console.error(`Listbox with ID #${boxId} not found!`);
            return [];
        }
        return Array.from(box.options).map(opt => opt.value);
    }

    /**
     * Toggles the active status of a task.
     * @param {string} taskId - The ID of the task to toggle.
     * @param {boolean} newStatus - The status to set (true for active, false for inactive).
     */
    async function toggleTaskActivation(taskId, newStatus) {
        const taskIndex = allTasksData.findIndex(t => t.id === taskId);
        if (taskIndex === -1) {
            alert('Task not found.');
            return;
        }

        const confirmMessage = newStatus
            ? `Are you sure you want to ACTIVATE task ${taskId}?`
            : `Are you sure you want to DEACTIVATE task ${taskId}? Deactivated tasks will not appear on employee dashboards.`;

        if (!confirm(confirmMessage)) {
            return; // User cancelled
        }

        // Simulate API call to update status
        try {
            const updatedTask = { ...allTasksData[taskIndex], isActive: newStatus };
            await makeAuthRequest('/admin/tasks', 'PUT', updatedTask);

            // Update local mock data
            allTasksData[taskIndex].isActive = newStatus;

            alert(`Task ${taskId} has been ${newStatus ? 'activated' : 'deactivated'} (simulated).`);
            $('#taskEditModal').modal('hide'); // Hide modal if toggled from there
            applyFiltersAndRenderTasks(); // Re-render tables to reflect status change
        } catch (error) {
            console.error(`Failed to toggle task activation for ${taskId}:`, error);
            alert(`Error toggling task status: ${error.message}`);
        }
    }


    // --- Core Data Loading/Rendering Functions ---

    /**
     * Renders the combined employee and login table for "Manage User" section
     * and "Employee Master" section.
     * @param {string} targetTableBodyId - The ID of the tbody element to render into.
     * @param {boolean} displayLoginDetails - Whether to show username/role columns.
     */
    function renderEmployeesTable(targetTableBodyId = 'employeesTableBody', displayLoginDetails = true) {
        console.log(`renderEmployeesTable() called for #${targetTableBodyId}. Display Login: ${displayLoginDetails}`);
        const $tableBody = $(`#${targetTableBodyId}`);

        if (!$tableBody.length) {
            console.error(`Error: #${targetTableBodyId} DOM element not found for rendering employees.`);
            return;
        }
        $tableBody.empty();

        // The logic for which employees to display (all or only non-admin)
        const employeesToDisplay = (targetTableBodyId === 'employeeMasterTableBody')
            ? employees.filter(emp => emp.id !== 'admin_account') // Employee Master tab doesn't show the generic admin user
            : [...employees]; // Manage User tab shows all employees including generic admin user

        if (employeesToDisplay.length === 0) {
            // Adjust colspan based on column visibility in the specific table
            const colspan = displayLoginDetails ? 9 : 7; // Assuming 9 columns for manage user, 7 for employee master
            $tableBody.append(`<tr><td colspan="${colspan}" class="text-center">No employees available.</td></tr>`);
            return;
        }

        employeesToDisplay.forEach(emp => {
            const isEmployee = emp.id !== 'admin_account';
            const orgName = organizations.find(org => org._id === emp.organization)?.name || 'N/A';
            const statusText = emp.isActive ? 'Active' : 'Inactive';
            const statusClass = emp.isActive ? 'text-success' : 'text-danger';
            const usernameDisplay = emp.username || '<span class="text-muted">N/A</span>';
            const roleDisplay = emp.role ? (emp.role.charAt(0).toUpperCase() + emp.role.slice(1)) : '<span class="text-muted">N/A</span>';

            let rowHtml = `
                <tr data-id="${emp.id}">
                    <td>${emp.id}</td>
                    <td>${emp.name}</td>
                    <td>${isEmployee ? (emp.designation || 'N/A') : 'N/A'}</td>
                    <td>${isEmployee ? (emp.department || 'N/A') : 'N/A'}</td>
                    <td>${orgName}</td>`;

            if (displayLoginDetails) {
                rowHtml += `<td>${usernameDisplay}</td><td>${roleDisplay}</td>`;
            }

            rowHtml += `<td class="${statusClass}">${statusText}</td>
                    <td>
                        <button class="btn btn-sm btn-primary edit-employee-login me-2" data-id="${emp.id}"><i class="fas fa-edit"></i> Edit</button>
                    </td>
                </tr>`;
            $tableBody.append(rowHtml);
        });

        // Event delegation for the 'Edit' button
        $tableBody.off('click', '.edit-employee-login').on('click', '.edit-employee-login', function() {
            const empId = $(this).data('id');
            const selectedEmployee = employees.find(e => e.id === empId);

            if (selectedEmployee) {
                editingEmployeeLogin = selectedEmployee; // Store for modal update
                populateEmployeeEditModal(selectedEmployee);
                $('#employeeEditModal').modal('show');
            }
        });
    }

    /**
     * Populates the Employee Edit/Login Modal with the selected employee's data.
     * @param {object} employee - The employee object to populate the modal from.
     */
    function populateEmployeeEditModal(employee) {
        $('#editEmployeeModalId').text(employee.id); // Display ID
        $('#currentEditEmployeeId').val(employee.id); // Hidden field for actual ID

        // Populate Employee Details
        $('#editEmployeeName').val(employee.name || '');
        $('#editEmployeeDesignation').val(employee.designation || '');
        $('#editEmployeeDepartment').val(employee.department || '');
        // Trigger change.select2 to update Select2 display
        $('#editEmployeeOrganization').val(employee.organization || '').trigger('change.select2');
        $('#editEmployeeStatus').val(employee.isActive ? 'true' : 'false'); // Set status dropdown

        // Populate Login Details
        $('#editLoginUsername').val(employee.username || '');
        $('#editLoginPassword').val(''); // Password always blank for security (user must re-enter if changing)
        $('#editLoginRole').val(employee.role || '');

        // Control field enablement/visibility based on employee vs. admin
        const isRegularEmployee = employee.id !== 'admin_account';
        if (isRegularEmployee) {
            $('#editEmployeeName, #editEmployeeDesignation, #editEmployeeDepartment, #editEmployeeOrganization').prop('disabled', false);
            $('#editEmployeeStatus').prop('disabled', false); // Employee status is editable
        } else { // General Admin user (admin_account)
            $('#editEmployeeName, #editEmployeeDesignation, #editEmployeeDepartment, #editEmployeeOrganization').prop('disabled', true); // Admin user details not editable here
            $('#editEmployeeStatus').prop('disabled', true); // Admin user status not managed here (always active)
        }
        // Username, password, role are always editable for login management, even for admin
        $('#editLoginUsername, #editLoginPassword, #editLoginRole').prop('disabled', false);
    }

    /**
     * Handles the saving of changes from the Employee Edit Modal.
     */
    async function saveEmployeeLoginChanges() {
        if (!editingEmployeeLogin) {
            alert('No employee selected for editing.');
            return;
        }

        const isRegularEmployee = editingEmployeeLogin.id !== 'admin_account';

        const updatedData = {
            id: editingEmployeeLogin.id, // Ensure ID is passed for update
            name: isRegularEmployee ? $('#editEmployeeName').val().trim() : editingEmployeeLogin.name,
            designation: isRegularEmployee ? $('#editEmployeeDesignation').val().trim() : editingEmployeeLogin.designation,
            department: isRegularEmployee ? $('#editEmployeeDepartment').val().trim() : editingEmployeeLogin.department,
            organization: isRegularEmployee ? $('#editEmployeeOrganization').val() : editingEmployeeLogin.organization,
            isActive: $('#editEmployeeStatus').val() === 'true',
            username: $('#editLoginUsername').val().trim(),
            password: $('#editLoginPassword').val() || editingEmployeeLogin.password, // Only update if new password is provided
            role: $('#editLoginRole').val()
        };

        if (updatedData.username && employees.some(e => e.username === updatedData.username && e.id !== updatedData.id)) {
            alert('Username already exists for another user. Please choose a different username.');
            return;
        }

        // Validate password only if it's new, otherwise reuse existing logic from mock data
        if (!updatedData.username || (!updatedData.password && !editingEmployeeLogin.password) || !updatedData.role) {
            alert('Username, Password (if new), and Role are required for login details.');
            return;
        }

        try {
            await makeAuthRequest('/admin/employees_full', 'PUT', updatedData);
            alert(`Employee ${updatedData.name} details and login updated successfully (simulated)!`);
            $('#employeeEditModal').modal('hide');
            loadEmployees(); // Refresh the main employee table
            updateAllDashboardDropdowns(); // Refresh dropdowns that depend on employee data
        } catch (error) {
            console.error('Failed to update employee/login:', error);
            alert('Error updating employee/login.');
        }
    }

    async function loadEmployees() {
        console.log("loadEmployees() called (for Manage User section).");
        renderEmployeesTable('employeesTableBody', true); // Show login details for Manage User
        updateAllDashboardDropdowns();
    }

    async function loadEmployeesMaster() {
        console.log("loadEmployeesMaster() called (for Employee Master tab).");
        renderEmployeesTable('employeeMasterTableBody', false); // Hide login details for Employee Master
        updateAllDashboardDropdowns();
    }

    async function loadOrganizations() {
        console.log("loadOrganizations() called.");
        try {
            const orgsTableBody = document.getElementById('organizationsTableBody');
            if (!orgsTableBody) { console.error("Error: #organizationsTableBody not found."); return; }
            orgsTableBody.innerHTML = '';
            organizations.forEach(org => {
                const row = `<tr><td>${org._id}</td><td>${org.name}</td><td><button class="btn btn-sm btn-info edit-org-btn me-2" data-id="${org._id}" data-name="${org.name}">Edit</button> <button class="btn btn-sm btn-danger delete-org-btn" data-id="${org._id}">Delete</button></td></tr>`;
                orgsTableBody.insertAdjacentHTML('beforeend', row);
            });
            $(orgsTableBody).off('click').on('click', '.delete-org-btn', async (e) => {
                if (confirm('Deleting this organization will also delete all associated processes, campaigns, and *employees* (and their logins). Are you sure?')) {
                    const orgId = e.target.dataset.id;
                    organizations = organizations.filter(org => org._id !== orgId);
                    processes = processes.filter(p => p.organizationId !== orgId);
                    campaigns = campaigns.filter(c => c.organizationId !== orgId);
                    // Filter employees and also handle their logins (ensure admin_account is not deleted)
                    employees = employees.filter(emp => emp.organization !== orgId && emp.id !== 'admin_account');

                    alert(`Simulating deletion of Organization ${orgId} and all related data.`);
                    loadOrganizations();
                    loadProcesses();
                    loadCampaigns();
                    loadEmployees(); // Refresh employees in manage user (includes login status)
                    updateAllDashboardDropdowns();
                    applyFiltersAndRenderTasks(); // Re-render tasks as some may now be invalid
                }
            }).on('click', '.edit-org-btn', function() {
                const orgId = $(this).data('id');
                const orgName = $(this).data('name');
                alert(`Editing Organization: ${orgName} (ID: ${orgId}) - Implement your edit modal/form here.`);
            });
        } catch (error) {
            console.error('Failed to load organizations:', error);
        }
    }

    async function loadProcesses() {
        console.log("loadProcesses() called.");
        try {
            const processesTableBody = document.getElementById('processesTableBody');
            if (!processesTableBody) { console.error("Error: #processesTableBody not found."); return; }
            processesTableBody.innerHTML = '';
            processes.forEach(proc => {
                const orgName = organizations.find(o => o._id === proc.organizationId)?.name || 'N/A';
                const row = `<tr>
                    <td>${proc._id}</td>
                    <td>${proc.name}</td>
                    <td>${orgName}</td>
                    <td>
                        <button class="btn btn-sm btn-info edit-proc-btn me-2" data-id="${proc._id}" data-name="${proc.name}">Edit</button>
                        <button class="btn btn-sm btn-danger delete-proc-btn" data-id="${proc._id}">Delete</button>
                    </td>
                    </tr>`;
                processesTableBody.insertAdjacentHTML('beforeend', row);
            });
            $(processesTableBody).off('click').on('click', '.delete-proc-btn', async (e) => {
                if (confirm('Are you sure you want to delete this process? This may affect linked campaigns and tasks assigned to it.')) {
                    const procId = e.target.dataset.id;
                    processes = processes.filter(proc => proc._id !== procId);
                    campaigns = campaigns.filter(c => c.processId !== procId);
                    allTasksData.forEach(task => { // Update tasks
                        if (task.process === procId) task.process = null;
                    });
                    alert(`Simulating deletion of Process ${procId} and related data.`);
                    loadProcesses();
                    loadCampaigns();
                    updateAllDashboardDropdowns();
                    applyFiltersAndRenderTasks();
                }
            }).on('click', '.edit-proc-btn', function() {
                const procId = $(this).data('id');
                const procName = $(this).data('name');
                alert(`Editing Process: ${procName} (ID: ${procId})`);
            });
        } catch (error) {
            console.error('Failed to load processes:', error);
        }
    }

    async function loadCampaigns() {
        console.log("loadCampaigns() called.");
        try {
            const campaignsTableBody = document.getElementById('campaignsTableBody');
            if (!campaignsTableBody) { return; }
            campaignsTableBody.innerHTML = '';

            campaigns.forEach(camp => {
                const orgName = organizations.find(o => o._id === camp.organizationId)?.name || 'N/A';
                const procName = processes.find(p => p._id === camp.processId)?.name || 'N/A';
                const row = `<tr>
                                <td>${camp._id}</td>
                                <td>${camp.name}</td>
                                <td>${orgName}</td>
                                <td>${procName}</td>
                                <td>
                                    <button class="btn btn-sm btn-info edit-camp-btn me-2" data-id="${camp._id}" data-name="${camp.name}">Edit</button>
                                    <button class="btn btn-sm btn-danger delete-camp-btn" data-id="${camp._id}">Delete</button>
                                </td>
                            </tr>`;
                campaignsTableBody.insertAdjacentHTML('beforeend', row);
            });

            $(campaignsTableBody).off('click').on('click', '.delete-camp-btn', async (e) => {
                if (confirm('Are you sure you want to delete this campaign? This may affect linked tasks.')) {
                    const campId = e.target.dataset.id;
                    campaigns = campaigns.filter(camp => camp._id !== campId);
                    allTasksData.forEach(task => { // Update tasks
                        if (task.leads?.campaign === campId) task.leads.campaign = null;
                        if (task.prospects?.campaign === campId) task.prospects.campaign = null;
                    });
                    alert(`Simulating deletion of Campaign ${campId} and updating related tasks.`);
                    loadCampaigns();
                    updateAllDashboardDropdowns();
                    applyFiltersAndRenderTasks();
                }
            }).on('click', '.edit-camp-btn', function() {
                const campId = $(this).data('id');
                const campName = $(this).data('name');
                alert(`Editing Campaign: ${campName} (ID: ${campId})`);
            });
        } catch (error) {
            console.error('Failed to load campaigns:', error);
        }
    }

    // --- All Tasks & View Current Task Status Tasks Functionality ---

    /**
     * Applies current filters to tasks and renders the appropriate table.
     */
    function applyFiltersAndRenderTasks() {
        console.log("applyFiltersAndRenderTasks() called with filters:", currentFilters);
        let filteredTasks = [...allTasksData];

        // Filter tasks based on isActive status: only show active tasks on employee dashboards
        // For 'All Tasks' section, we show ALL tasks (active/inactive)
        // For 'View Current Task Status Tasks' section, we show only active tasks by default or based on filter
        const currentSectionId = $('.content-section:not(.d-none)').attr('id');

        // This is a crucial change: For 'view-update-tasks', we only show active tasks from employee perspective
        // The admin's 'All Tasks' view shows all tasks regardless of active status for management.
        if (currentSectionId === 'view-update-tasks-section') {
            filteredTasks = filteredTasks.filter(task => task.isActive);
        }


        if (currentFilters.searchTerm) {
            const searchTermLower = currentFilters.searchTerm.toLowerCase();
            filteredTasks = filteredTasks.filter(task => {
                const employeeName = employees.find(emp => emp.id === task.assignedToEmployee)?.name || '';
                const organizationName = organizations.find(org => org._id === task.organization)?.name || '';
                const processName = processes.find(proc => proc._id === task.process)?.name || '';

                return task.id.toLowerCase().includes(searchTermLower) ||
                    employeeName.toLowerCase().includes(searchTermLower) ||
                    organizationName.toLowerCase().includes(searchTermLower) ||
                    processName.toLowerCase().includes(searchTermLower) ||
                    (task.generalComment && task.generalComment.toLowerCase().includes(searchTermLower)) ||
                    (task.leads && task.leads.comment && task.leads.comment.toLowerCase().includes(searchTermLower)) ||
                    (task.prospects && task.prospects.comment && task.prospects.comment.toLowerCase().includes(searchTermLower));
            });
        }

        if (currentFilters.taskDateFrom && currentFilters.taskDateTo) {
            const from = new Date(currentFilters.taskDateFrom);
            const to = new Date(currentFilters.taskDateTo);
            filteredTasks = filteredTasks.filter(task => {
                const taskDate = new Date(task.taskDate);
                // Set hours to ensure comparison works correctly across full days
                const taskDateStartOfDay = new Date(taskDate.getFullYear(), taskDate.getMonth(), taskDate.getDate());
                const fromStartOfDay = new Date(from.getFullYear(), from.getMonth(), from.getDate());
                const toEndOfDay = new Date(to.getFullYear(), to.getMonth(), to.getDate(), 23, 59, 59, 999);
                return taskDateStartOfDay >= fromStartOfDay && taskDateStartOfDay <= toEndOfDay;
            });
        }

        if (currentFilters.organization) { filteredTasks = filteredTasks.filter(task => task.organization === currentFilters.organization); }
        if (currentFilters.process) { filteredTasks = filteredTasks.filter(task => task.process === currentFilters.process); }
        if (currentFilters.employee) { filteredTasks = filteredTasks.filter(task => task.assignedToEmployee === currentFilters.employee); }
        if (currentFilters.status) { filteredTasks = filteredTasks.filter(task => task.status === currentFilters.status); }

        const currentSection = document.querySelector('.content-section:not(.d-none)');
        if (currentSection && currentSection.id === 'all-tasks-section') {
            renderTasksTable(document.getElementById('allTasksTableBody'), filteredTasks, 'all-tasks');
        } else if (currentSection && currentSection.id === 'view-update-tasks-section') {
            renderTasksTable(document.getElementById('filteredTasksTableBody'), filteredTasks, 'view-update-tasks');
        } else {
            console.warn("Tasks sections not active. Not rendering tasks.");
        }
        renderActiveFilters();
    }

    /**
     * Renders tasks into a specified table body based on section type.
     * @param {HTMLElement} tableBodyElement - The tbody element to render into.
     * @param {Array<object>} tasksToRender - Array of task objects to display.
     * @param {string} sectionType - 'all-tasks' or 'view-update-tasks'.
     */
    function renderTasksTable(tableBodyElement, tasksToRender, sectionType) {
        if (!tableBodyElement) {
            console.error(`Error: Table body element for type '${sectionType}' not found.`);
            return;
        }

        tableBodyElement.innerHTML = '';

        // Determine colspan based on section type
        let colspan;
        if (sectionType === 'all-tasks') {
            colspan = 19; // Your specified 19 columns for All Tasks
        } else if (sectionType === 'view-update-tasks') {
            colspan = 13; // Task ID, Emp Name, Leads Date, Leads Qty, Conv. to Prospects, Active Conv. to Prospects, Prospects Date, Prospects Qty, Conv. to Won, Active Conv. to Won, Sales, Active Sales, Remarks
        } else {
            colspan = 9; // Default or fallback
        }

        if (tasksToRender.length === 0) {
            tableBodyElement.innerHTML = `<tr><td colspan="${colspan}" class="text-center">No tasks matching current filters.</td></tr>`;
            return;
        }

        tasksToRender.forEach(task => {
            const getOrgName = (orgId) => organizations.find(o => o._id === orgId)?.name || 'N/A';
            const getProcessName = (procId) => processes.find(p => p._id === procId)?.name || 'N/A';
            const getEmployeeName = (empId) => employees.find(e => e.id === empId)?.name || 'N/A';
            const getCampaignName = (campId) => campaigns.find(c => c._id === campId)?.name || 'N/A';

            const taskDateFormatted = task.taskDate ? new Date(task.taskDate).toLocaleDateString('en-IN') : 'N/A';
            const orgName = getOrgName(task.organization);
            const processName = getProcessName(task.process);
            const employeeName = getEmployeeName(task.assignedToEmployee);

            const leadsInfo = task.leads || {};
            const prospectsInfo = task.prospects || {};

            const leadsDateFromTo = (leadsInfo.dateFrom && leadsInfo.dateTo) ? `${new Date(leadsInfo.dateFrom).toLocaleDateString('en-IN')} - ${new Date(leadsInfo.dateTo).toLocaleDateString('en-IN')}` : 'N/A';
            const prospectsDateFromTo = (prospectsInfo.dateFrom && prospectsInfo.dateTo) ? `${new Date(prospectsInfo.dateFrom).toLocaleDateString('en-IN')} - ${new Date(prospectsInfo.dateTo).toLocaleDateString('en-IN')}` : 'N/A';

            // IMPORTANT: Using month and region directly from leadsInfo/prospectsInfo as per your HTML headers
            const leadsMonthYear = leadsInfo.month || 'N/A';
            const prospectsMonthYear = prospectsInfo.month || 'N/A';

            const leadsRegion = leadsInfo.region || 'N/A';
            const prospectsRegion = prospectsInfo.region || 'N/A';

            const salesLacs = prospectsInfo.employeeSaleTarget ? (prospectsInfo.employeeSaleTarget / 100000).toFixed(2) : '0.00';
            
            // This combines all comments for the 'All Tasks' view
            const combinedRemarks = [task.generalComment, leadsInfo.comment, prospectsInfo.comment].filter(Boolean).join('; ');

            let rowHtml = '';
            if (sectionType === 'all-tasks') {
                const activationButtonClass = task.isActive ? 'btn-danger' : 'btn-success';
                const activationButtonIcon = task.isActive ? 'fas fa-times-circle' : 'fas fa-check-circle'; // Deactivate: X-circle, Activate: Check-circle
                rowHtml = `
                    <tr>
                        <td>${taskDateFormatted}</td>
                        <td>${orgName}</td>
                        <td>${processName}</td>
                        <td>${employeeName}</td>
                        <td>${leadsDateFromTo}</td>
                        <td>${leadsMonthYear}</td>
                        <td>${leadsRegion}</td>
                        <td>${getCampaignName(leadsInfo.campaign)}</td>
                        <td>${leadsInfo.quantity || '0'}</td>
                        <td>${leadsInfo.convertToProspects || '0'}</td>
                        <td>${prospectsDateFromTo}</td>
                        <td>${prospectsMonthYear}</td>
                        <td>${prospectsRegion}</td>
                        <td>${getCampaignName(prospectsInfo.campaign)}</td>
                        <td>${prospectsInfo.quantity || '0'}</td>
                        <td>${prospectsInfo.convertToWon || '0'}</td>
                        <td>${salesLacs}</td>
                        <td>${combinedRemarks}</td>
                        <td>
                            <button class="btn btn-sm btn-primary edit-task-btn me-2" data-id="${task.id}"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-sm ${activationButtonClass} toggle-task-status-btn" data-id="${task.id}" data-status="${!task.isActive}" title="${task.isActive ? 'Deactivate Task' : 'Activate Task'}">
                                <i class="${activationButtonIcon}"></i>
                            </button>
                        </td>
                    </tr>
                `;
            } else if (sectionType === 'view-update-tasks') {
                const activeSalesLacs = task.activeSales ? (task.activeSales / 100000).toFixed(2) : '0.00';
                rowHtml = `
                    <tr>
                        <td>${task.id}</td>
                        <td>${employeeName}</td>
                        <td>${leadsInfo.dateFrom && leadsInfo.dateTo ? leadsDateFromTo : 'N/A'}</td>
                        <td>${leadsInfo.quantity || '0'}</td>
                        <td>${leadsInfo.convertToProspects || '0'}</td>
                        <td>${task.activeLeadsToProspects || '0'}</td>
                        <td>${prospectsInfo.dateFrom && prospectsInfo.dateTo ? prospectsDateFromTo : 'N/A'}</td>
                        <td>${prospectsInfo.quantity || '0'}</td>
                        <td>${prospectsInfo.convertToWon || '0'}</td>
                        <td>${task.activeConvertToWon || '0'}</td>
                        <td>${salesLacs}</td>
                        <td>${activeSalesLacs}</td>
                        <td>${task.generalComment || 'N/A'}</td>
                    </tr>
                `;
            }
            tableBodyElement.insertAdjacentHTML('beforeend', rowHtml);
        });

        const $tableBody = $(tableBodyElement);
        // Clear previous event handlers to prevent duplicates
        $tableBody.off('click change');

        // Attach event handlers based on section type
        if (sectionType === 'all-tasks') {
            $tableBody.on('click', '.view-task-details-btn', function() {
                const taskId = $(this).data('id');
                const task = allTasksData.find(t => t.id === taskId);
                if (task) { alert('Viewing Task ID: ' + taskId + '\nDetails: ' + JSON.stringify(task, null, 2)); }
            });
            $tableBody.on('click', '.edit-task-btn', function() {
                const taskId = $(this).data('id');
                const task = allTasksData.find(t => t.id === taskId);
                if (task) {
                    populateEditTaskModal(task);
                    $('#taskEditModal').modal('show');
                }
            });
            // New: Toggle activation button listener
            $tableBody.on('click', '.toggle-task-status-btn', function() {
                const taskId = $(this).data('id');
                const newStatus = $(this).data('status'); // This will be true or false directly
                toggleTaskActivation(taskId, newStatus);
            });
        }
    }

    /**
     * Populates the Task Edit Modal with the selected task's data.
     * @param {object} task - The task object to populate the modal from.
     */
    function populateEditTaskModal(task) {
        console.log("Populating edit modal for task:", task.id);
        $('#editTaskModalId').text(task.id);
        $('#editTaskId').val(task.id);

        // Populate main task details
        $('#editTaskDate').val(task.taskDate || '');
        $('#editOrganization').val(task.organization || '').trigger('change.select2');

        // Setup and trigger cascades for Organization, Process, Employee, and Campaigns in Edit Modal
        // These listeners were defined outside populateEditTaskModal, which is good.
        // We just need to trigger the initial change manually if needed, and set values AFTER options are loaded.

        // Detach previous event handlers to prevent multiple bindings on modal open
        $('#editOrganization').off('change.editTaskCascade');
        $('#editProcess').off('change.editTaskCampaignCascade');

        $('#editOrganization').on('change.editTaskCascade', function() {
            const orgId = $(this).val();
            const $editProcessSelect = $('#editProcess');
            const $editEmployeeSelect = $('#editEmployee');
            const $editCampaignSelects = $('#editLeadsCampaign, #editProspectsCampaign');

            $editProcessSelect.prop('disabled', true).empty().append('<option value="">Select Process</option>').val('').trigger('change.select2');
            $editEmployeeSelect.prop('disabled', true).empty().append('<option value="">Select Employee</option>').val('').trigger('change.select2');
            $editCampaignSelects.prop('disabled', true).empty().append('<option value="">Select Process First</option>').val('').trigger('change.select2');

            if (orgId) {
                const filteredProcesses = processes.filter(p => p.organizationId === orgId);
                if (filteredProcesses.length > 0) {
                    filteredProcesses.forEach(proc => $editProcessSelect.append(new Option(proc.name, proc._id)));
                    $editProcessSelect.prop('disabled', false);
                } else {
                    $editProcessSelect.empty().append('<option value="">No Processes Found</option>').val('').trigger('change.select2');
                }

                const filteredEmployees = employees.filter(e => e.organization === orgId && e.isActive);
                if (filteredEmployees.length > 0) {
                    filteredEmployees.forEach(emp => $editEmployeeSelect.append(new Option(`${emp.name} (${emp.id})`, emp.id)));
                    $editEmployeeSelect.prop('disabled', false);
                } else {
                    $editEmployeeSelect.empty().append('<option value="">No Employees Found</option>').val('').trigger('change.select2');
                }
            }
        });

        $('#editProcess').on('change.editTaskCampaignCascade', function() {
            const processId = $(this).val();
            const orgId = $('#editOrganization').val();
            const $editCampaignSelects = $('#editLeadsCampaign, #editProspectsCampaign');

            $editCampaignSelects.prop('disabled', true).empty().append('<option value="">Select Campaign</option>').val('').trigger('change.select2');

            if (processId && orgId) {
                const filteredCampaigns = campaigns.filter(c => c.organizationId === orgId && c.processId === processId);
                if (filteredCampaigns.length > 0) {
                    filteredCampaigns.forEach(camp => $editCampaignSelects.append(new Option(camp.name, camp._id)));
                    $editCampaignSelects.prop('disabled', false);
                } else {
                    $editCampaignSelects.empty().append('<option value="">No Campaigns Found</option>').val('').trigger('change.select2');
                }
            }
        });

        // Trigger initial cascade for edit modal main dropdowns
        // Small delays are crucial here to let options load before setting their values
        setTimeout(() => {
            $('#editOrganization').trigger('change.editTaskCascade'); // Trigger org change to load processes/employees
            setTimeout(() => {
                $('#editProcess').val(task.process || '').trigger('change.select2'); // Set process
                $('#editEmployee').val(task.assignedToEmployee || '').trigger('change.select2'); // Set employee
                $('#editProcess').trigger('change.editTaskCampaignCascade'); // Trigger process change to load campaigns
                setTimeout(() => { // Even smaller delay for campaigns
                    $('#editLeadsCampaign').val(task.leads?.campaign || '').trigger('change.select2');
                    $('#editProspectsCampaign').val(task.prospects?.campaign || '').trigger('change.select2');
                }, 50);
            }, 50);
        }, 50);

        $('#editGeneralComment').val(task.generalComment || '');

        // Leads Information - Populate ALL fields
        const leads = task.leads || {};
        $('#editLeadsDateFrom').val(leads.dateFrom || '');
        $('#editLeadsDateTo').val(leads.dateTo || '');
        $('#editLeadsQty').val(leads.quantity || '0'); // Quantity field
        $('#editConvertToProspects').val(leads.convertToProspects || '0'); // Convert to Prospects field
        $('#editLeadsComment').val(leads.comment || ''); // Comment field

        // Pre-fill "Add Assignment" dropdowns for Leads with existing task's month/year/region data
        const currentYear = new Date().getFullYear();
        const leadsYearSelect = $('#editLeadsAssignmentYear');
        // Ensure year options are populated first for this specific dropdown in the modal
        leadsYearSelect.empty();
        for (let i = currentYear - 7; i <= currentYear + 7; i++) {
            leadsYearSelect.append(new Option(i, i));
        }

        if (leads.month) {
            const [monthAbbr, yearStr] = leads.month.split('-');
            $('#editLeadsAssignmentMonth').val(monthAbbr);
            $('#editLeadsAssignmentYear').val(yearStr);
        } else {
            $('#editLeadsAssignmentMonth').val(new Date().toLocaleString('default', { month: 'short' }));
            $('#editLeadsAssignmentYear').val(currentYear);
        }
        $('#editLeadsAssignmentRegion').val(leads.region || 'All');


        // Dual listbox for Leads assignments in edit modal
        $('#leftBoxEditLeads, #rightBoxEditLeads').empty(); // Clear existing options
        if (leads.assignments && leads.assignments.length > 0) {
            leads.assignments.forEach(assign => {
                const [monthAbbr, yearStr, regionStr] = assign.split('-');
                const monthMap = { 'Jan': 'January', 'Feb': 'February', 'Mar': 'March', 'Apr': 'April', 'May': 'May', 'Jun': 'June', 'Jul': 'July', 'Aug': 'August', 'Sep': 'September', 'Oct': 'October', 'Nov': 'November', 'Dec': 'December' };
                const displayMonth = monthMap[monthAbbr] || monthAbbr;

                const display = `${displayMonth} ${yearStr} - ${regionStr}`;
                $('#rightBoxEditLeads').append(new Option(display, assign));
            });
        }
        // Re-initialize default placeholders for month/region selects in assignment builder
        // This is important to ensure 'Select Month/Region' appears if no existing data or after clearing
        const monthRegionSelectsForEdit = $('#editLeadsAssignmentMonth, #editLeadsAssignmentRegion, #editProspectsAssignmentMonth, #editProspectsAssignmentRegion');
        monthRegionSelectsForEdit.each(function() {
            if ($(this).find('option[value=""]').length === 0) {
                const labelText = $(this).attr('id').includes('Month') ? 'Month' : 'Region';
                $(this).prepend(`<option value="" selected disabled hidden>Select ${labelText}</option>`);
            }
        });


        // Prospects Information - Populate ALL fields
        const prospects = task.prospects || {};
        $('#editProspectsDateFrom').val(prospects.dateFrom || '');
        $('#editProspectsDateTo').val(prospects.dateTo || '');
        $('#editProspectsQty').val(prospects.quantity || '0'); // Quantity field
        $('#editConvertToWon').val(prospects.convertToWon || '0'); // Convert to Won field
        $('#editEmployeeSaleTarget').val(prospects.employeeSaleTarget ? (prospects.employeeSaleTarget / 100000).toFixed(2) : '0.00'); // Sale Target field
        $('#editProspectsComment').val(prospects.comment || ''); // Comment field

        // Pre-fill "Add Assignment" dropdowns for Prospects
        const prospectsYearSelect = $('#editProspectsAssignmentYear');
        prospectsYearSelect.empty();
        for (let i = currentYear - 7; i <= currentYear + 7; i++) {
            prospectsYearSelect.append(new Option(i, i));
        }
        if (prospects.month) {
            const [monthAbbr, yearStr] = prospects.month.split('-');
            $('#editProspectsAssignmentMonth').val(monthAbbr);
            $('#editProspectsAssignmentYear').val(yearStr); // Set the selected year
        } else {
            $('#editProspectsAssignmentMonth').val(new Date().toLocaleString('default', { month: 'short' }));
            $('#editProspectsAssignmentYear').val(currentYear);
        }
        $('#editProspectsAssignmentRegion').val(prospects.region || 'All');

        // Dual listbox for Prospects assignments in edit modal
        $('#leftBoxEditProspects, #rightBoxEditProspects').empty(); // Clear existing options
        if (prospects.assignments && prospects.assignments.length > 0) {
            prospects.assignments.forEach(assign => {
                const [monthAbbr, yearStr, regionStr] = assign.split('-');
                const monthMap = { 'Jan': 'January', 'Feb': 'February', 'Mar': 'March', 'Apr': 'April', 'May': 'May', 'Jun': 'June', 'Jul': 'July', 'Aug': 'August', 'Sep': 'September', 'Oct': 'October', 'Nov': 'November', 'Dec': 'December' };
                const displayMonth = monthMap[monthAbbr] || monthAbbr;

                const display = `${displayMonth} ${yearStr} - ${regionStr}`;
                $('#rightBoxEditProspects').append(new Option(display, assign));
            });
        }

        // Re-initialize datepickers and select2 for the modal content to ensure they apply to new elements if modal is re-rendered
        initializeUIComponents();

        // Update the Deactivate/Activate button text and class based on current task status
        const $toggleBtn = $('#toggleTaskActivationBtn');
        if (task.isActive) {
            $toggleBtn.text('Deactivate Task').removeClass('btn-success').addClass('btn-warning');
            $toggleBtn.data('status', false); // Next click will deactivate
        } else {
            $toggleBtn.text('Activate Task').removeClass('btn-warning').addClass('btn-success');
            $toggleBtn.data('status', true); // Next click will activate
        }
        $toggleBtn.data('task-id', task.id); // Store task ID on the button
    }

    /**
     * Renders active filters as "pills" on the dashboard.
     */
    function renderActiveFilters() {
        // Determine which active filters display area is visible
        const currentSectionId = $('.content-section:not(.d-none)').attr('id');
        let activeFiltersDisplayElementId = 'activeFiltersDisplay'; // For All Tasks
        let searchInputId = 'universalTaskSearchInput'; // Universal search input

        if (currentSectionId === 'view-update-tasks-section') {
            activeFiltersDisplayElementId = 'activeFiltersDisplayView'; // For View Current Task Status Tasks
        }
        const activeFiltersDisplay = document.getElementById(activeFiltersDisplayElementId);
        if (!activeFiltersDisplay) return;
        activeFiltersDisplay.innerHTML = '';

        const filterLabels = {
            searchTerm: 'Search', taskDateFrom: 'Task Date From', taskDateTo: 'Task Date To',
            organization: 'Organization', process: 'Process', employee: 'Employee', status: 'Status'
        };

        for (const key in currentFilters) {
            let value = currentFilters[key];
            if (value && value !== '' && value !== 'All') {
                let displayValue = value;
                // Resolve IDs to names for display
                if (key === 'organization') displayValue = organizations.find(o => o._id === value)?.name || value;
                else if (key === 'process') displayValue = processes.find(p => p._id === value)?.name || value;
                else if (key === 'employee') displayValue = employees.find(e => e.id === value)?.name || value;
                else if (key.includes('Date')) displayValue = new Date(value).toLocaleDateString('en-IN');

                const pill = `
                    <span class="filter-pill badge bg-primary me-2 mb-2">
                        ${filterLabels[key] || key}: <strong>${displayValue}</strong>
                        <span class="remove-filter ms-2" data-filter-key="${key}">×</span>
                    </span>
                `;
                activeFiltersDisplay.insertAdjacentHTML('beforeend', pill);
            }
        }

        // Attach click handler for removing filters
        $(activeFiltersDisplay).off('click', '.remove-filter').on('click', '.remove-filter', function() {
            const keyToRemove = $(this).data('filter-key');
            currentFilters[keyToRemove] = ''; // Clear the filter value

            // Reset the corresponding UI element in the universal filter offcanvas or universal search input
            if (keyToRemove === 'searchTerm') {
                $('#universalTaskSearchInput').val(''); // Clear universal search input
            } else if (keyToRemove === 'taskDateFrom' || keyToRemove === 'taskDateTo') {
                $(`#filterTaskDateFrom`).val('');
                $(`#filterTaskDateTo`).val('');
            } else {
                $(`#${keyToRemove}`).val(null).trigger('change.select2'); // For select2 dropdowns in offcanvas
            }

            // Re-apply filters based on the active section
            applyFiltersAndRenderTasks();
            // renderActiveFilters will be called inside applyFiltersAndRenderTasks
        });
    }

    // --- Section Switching & Cascading Logic ---

    /**
     * Sets up cascading dropdown logic for the "Create Task" form.
     */
    function setupCreateTaskCascades() {
        console.log("Setting up Create Task cascading dropdowns.");

        // Disable process, employee, and campaign dropdowns initially
        $('#taskProcessSelect, #taskEmployeeSelect, #leadsQuantityCampaignMaster, #prospectsQuantityCampaignMaster')
            .prop('disabled', true).empty().append('<option value="">Select Organization First</option>').trigger('change.select2');

        // Organization select change handler
        $('#taskOrganizationSelect').off('change.taskFilter').on('change.taskFilter', function() {
            const orgId = $(this).val();
            const $processSelect = $('#taskProcessSelect');
            const $employeeSelect = $('#taskEmployeeSelect');
            const $campaignSelects = $('#leadsQuantityCampaignMaster, #prospectsQuantityCampaignMaster');

            // Reset dependent dropdowns
            $processSelect.prop('disabled', true).empty().append('<option value="">Select Process</option>').val('').trigger('change.select2');
            $employeeSelect.prop('disabled', true).empty().append('<option value="">Select Employee</option>').val('').trigger('change.select2');
            $campaignSelects.prop('disabled', true).empty().append('<option value="">Select Process First</option>').val('').trigger('change.select2');

            if (orgId) {
                // Populate Process dropdown
                const filteredProcesses = processes.filter(p => p.organizationId === orgId);
                if (filteredProcesses.length > 0) {
                    filteredProcesses.forEach(proc => $processSelect.append(new Option(proc.name, proc._id)));
                    $processSelect.prop('disabled', false);
                } else {
                    $processSelect.empty().append('<option value="">No Processes Found</option>').val('').trigger('change.select2');
                }

                // Populate Employee dropdown (only active employees for the selected organization)
                const filteredEmployees = employees.filter(e => e.organization === orgId && e.isActive);
                if (filteredEmployees.length > 0) {
                    filteredEmployees.forEach(emp => $employeeSelect.append(new Option(`${emp.name} (${emp.id})`, emp.id)));
                    $employeeSelect.prop('disabled', false);
                } else {
                    $employeeSelect.empty().append('<option value="">No Employees Found</option>').val('').trigger('change.select2');
                }
            }
        });

        // Process select change handler (for campaigns)
        $('#taskProcessSelect').off('change.campaignFilter').on('change.campaignFilter', function() {
            const processId = $(this).val();
            const orgId = $('#taskOrganizationSelect').val(); // Get selected organization too
            const $campaignSelects = $('#leadsQuantityCampaignMaster, #prospectsQuantityCampaignMaster');

            $campaignSelects.prop('disabled', true).empty().append('<option value="">Select Campaign</option>').val('').trigger('change.select2');

            if (processId && orgId) {
                const filteredCampaigns = campaigns.filter(c => c.organizationId === orgId && c.processId === processId);
                if (filteredCampaigns.length > 0) {
                    filteredCampaigns.forEach(camp => $campaignSelects.append(new Option(camp.name, camp._id)));
                    $campaignSelects.prop('disabled', false);
                } else {
                    $campaignSelects.empty().append('<option value="">No Campaigns Found</option>').val('').trigger('change.select2');
                }
            }
        });
    }

    /**
     * Sets up cascading dropdowns for Master tabs (Process and Campaign forms).
     */
    function setupMasterCascades() {
        console.log("Setting up Master cascading dropdowns.");

        // Process Master: Enable process name input only if organization is selected
        $('#processOrganizationSelect').off('change.processMaster').on('change.processMaster', function() {
            const orgId = $(this).val();
            const $processNameInput = $('#processNameInput');
            if (orgId) {
                $processNameInput.prop('disabled', false).attr('placeholder', 'Enter Process Name');
            } else {
                $processNameInput.prop('disabled', true).val('').attr('placeholder', 'Select Organization First');
            }
        }).trigger('change.processMaster'); // Trigger on load to set initial state

        // Campaign Master: Enable process dropdown only if organization is selected
        $('#campaignOrganizationSelect').off('change.campaignMasterOrg').on('change.campaignMasterOrg', function() {
            const orgId = $(this).val();
            const $processSelect = $('#campaignProcessSelect');
            const $campaignNameInput = $('#campaignNameInput');

            $processSelect.prop('disabled', true).empty().append('<option value="">Select Process</option>').val('').trigger('change.select2');
            $campaignNameInput.prop('disabled', true).val('').attr('placeholder', 'Select Organization and Process First');

            if (orgId) {
                const filteredProcesses = processes.filter(p => p.organizationId === orgId);
                if (filteredProcesses.length > 0) {
                    filteredProcesses.forEach(proc => $processSelect.append(new Option(proc.name, proc._id)));
                    $processSelect.prop('disabled', false);
                } else {
                    $processSelect.empty().append('<option value="">No Processes Found</option>').val('').trigger('change.select2');
                }
            }
        }).trigger('change.campaignMasterOrg'); // Trigger on load to set initial state

        // Campaign Master: Enable campaign name input only if process is selected
        $('#campaignProcessSelect').off('change.campaignMasterProc').on('change.campaignMasterProc', function() {
            const processId = $(this).val();
            const $campaignNameInput = $('#campaignNameInput');
            if (processId) {
                $campaignNameInput.prop('disabled', false).attr('placeholder', 'Enter Campaign Name');
            } else {
                $campaignNameInput.prop('disabled', true).val('').attr('placeholder', 'Select Process First');
            }
        }).trigger('change.campaignMasterProc'); // Trigger on load to set initial state
    }

    /**
     * Shows a specific content section and updates navigation/URL.
     * @param {string} sectionId - The ID of the section to show (e.g., 'manage-user').
     * @param {boolean} updateUrl - Whether to update the browser's URL hash.
     */
    function showSection(sectionId, updateUrl = true) {
        console.log(`showSection called for: ${sectionId}`);

        // Hide all content sections
        $('.content-section').addClass('d-none');
        // Show the target section
        $(`#${sectionId}-section`).removeClass('d-none');

        // Update active navigation link
        $('#main-admin-navbar .nav-link').removeClass('active');
        $(`#main-admin-navbar .nav-link[data-section="${sectionId}"]`).addClass('active');

        // Update URL hash
        if (updateUrl) {
            history.pushState(null, '', `#${sectionId}`);
        }

        // Always update dropdowns when switching sections as data might have changed
        updateAllDashboardDropdowns();

        // Perform section-specific initializations
        switch (sectionId) {
            case 'manage-user':
                loadEmployees();
                $('#manageLoginForm')[0].reset(); // Reset form for new login creation
                $('#loginEmployeeId').val('').trigger('change.select2'); // Clear login form select
                $('#username, #password, #userRole').prop('disabled', false); // Ensure inputs are enabled for new login
                editingEmployeeLogin = null; // Reset editing state
                break;
            case 'masters':
                setupMasterCascades();
                // Load data for the initially active master tab
                const activeTabButton = document.querySelector('#masterTabs button.active');
                const masterType = activeTabButton ? activeTabButton.dataset.masterPane : 'organization-master';
                // Trigger the correct load function for the master tab
                switch (masterType) {
                    case 'organization-master': loadOrganizations(); break;
                    case 'process-master': loadProcesses(); break;
                    case 'employee-master': loadEmployeesMaster(); break;
                    case 'campaign-master': loadCampaigns(); break;
                }
                break;
            case 'create-task':
                setupCreateTaskCascades();
                initializeTaskAssignmentBuilders(); // For dual listboxes
                // Clear dual listboxes on new task form to ensure clean state
                $('#leftBoxLeads, #rightBoxLeads, #leftBoxProspects, #rightBoxProspects').empty();
                $('#createTaskForm')[0].reset(); // Reset the form
                initializeUIComponents(); // Re-init datepickers etc for this form specifically
                break;
            case 'all-tasks':
                // Reset filters when entering this section to their defaults
                currentFilters = { searchTerm: '', taskDateFrom: '', taskDateTo: '', organization: '', process: '', employee: '', status: '' };
                // Also reset the universal search input and offcanvas filters visually
                $('#universalTaskSearchInput').val('');
                $('#universalFilterForm')[0].reset();
                $('.select2-enabled-filter').val(null).trigger('change.select2');
                $('.datepicker-filter').val('');

                applyFiltersAndRenderTasks();
                break;
            case 'view-update-tasks':
                // Reset filters when entering this section
                currentFilters = { searchTerm: '', taskDateFrom: '', taskDateTo: '', organization: '', process: '', employee: '', status: '' };
                // Reset the universal search input and offcanvas filters visually
                $('#universalTaskSearchInput').val('');
                $('#universalFilterForm')[0].reset();
                $('.select2-enabled-filter').val(null).trigger('change.select2');
                $('.datepicker-filter').val('');

                applyFiltersAndRenderTasks();
                break;
        }
    }

    // --- Event Listeners and Initializations ---

    $(document).ready(() => {
        console.log("DOM Content Loaded - admin_dashboard.js started.");

        // if (!checkAuth()) { // Uncomment in production
        //     return;
        // }

        // Initial UI component setup (datepickers, select2)
        initializeUIComponents();

        // Logout Button
        $('#logoutBtn').on('click', () => {
            localStorage.clear();
            window.location.href = 'login.html';
        });

        // Main Navigation Links (Section Switching)
        $('#main-admin-navbar .nav-link').on('click', function(e) {
            e.preventDefault();
            const targetSection = $(this).data('section');
            if (targetSection) {
                showSection(targetSection, true);
            } else {
                console.warn("Clicked nav link has no data-section attribute:", this);
            }
        });

        // Master Tabs (Internal Master Section Navigation for tab buttons)
        $('#masterTabs button[data-bs-toggle="tab"]').on('shown.bs.tab', function(e) {
            const masterType = $(e.target).data('master-pane');
            console.log(`Master tab shown: ${masterType}`);
            switch (masterType) {
                case 'organization-master': loadOrganizations(); break;
                case 'process-master': loadProcesses(); break;
                case 'employee-master': loadEmployeesMaster(); break;
                case 'campaign-master': loadCampaigns(); break;
            }
            // Re-setup cascades as they depend on the available data in the current master section
            setupMasterCascades();
            updateAllDashboardDropdowns();
        });

        // --- Form Submission Handlers ---

        // Add Organization Form
        $('#orgForm').on('submit', async function(e) {
            e.preventDefault();
            const orgNameInput = $(this).find('#organizationNameInput');
            const orgName = orgNameInput.val().trim();
            if (!orgName) { alert('Organization name cannot be empty.'); return; }
            await makeAuthRequest('/admin/organizations', 'POST', { name: orgName });
            alert(`Simulating addition of Organization: ${orgName}`);
            orgNameInput.val('');
            loadOrganizations(); // Refresh table
            updateAllDashboardDropdowns(); // Refresh dropdowns affected by new organization
        });

        // Add Process Form
        $('#processForm').on('submit', async function(e) {
            e.preventDefault();
            const processNameInput = $(this).find('#processNameInput');
            const processName = processNameInput.val().trim();
            const organizationId = $('#processOrganizationSelect').val();

            if (!processName || !organizationId) { alert('Process name and organization are required.'); return; }

            await makeAuthRequest('/admin/processes', 'POST', { name: processName, organizationId: organizationId });
            alert(`Simulating addition of Process: ${processName}`);

            processNameInput.val('');
            $('#processOrganizationSelect').val('').trigger('change.select2');
            loadProcesses(); // Refresh table
            updateAllDashboardDropdowns(); // Refresh dropdowns
            setupMasterCascades(); // Re-setup cascades for fresh state
        });

        // Add Employee Form (Employee Master Tab)
        $('#addEmployeeForm').on('submit', async function(e) {
            e.preventDefault();
            console.log("addEmployeeForm submitted.");

            const employeeId = $('#employeeId').val().trim();
            const employeeName = $('#employeeName').val().trim();
            const employeeDesignation = $('#employeeDesignation').val().trim();
            const employeeDepartment = $('#employeeDepartment').val().trim();
            const employeeOrganization = $('#employeeOrganizationSelect').val(); // Corrected ID

            if (!employeeId || !employeeName || !employeeDesignation || !employeeDepartment || !employeeOrganization) {
                alert('Please fill in all fields for the new employee.');
                return;
            }

            if (employees.some(emp => emp.id === employeeId)) {
                alert('Employee ID must be unique. Please use a different ID.');
                return;
            }

            const newEmployee = {
                id: employeeId,
                name: employeeName,
                designation: employeeDesignation,
                department: employeeDepartment,
                organization: employeeOrganization,
                isActive: true, // New employees are active by default
                username: null, password: null, role: null // No login created yet
            };

            try {
                await makeAuthRequest('/admin/employees_full', 'POST', newEmployee);
                alert('Employee added successfully!');
                $(this)[0].reset(); // Reset the form
                $('#employeeOrganizationSelect').val('').trigger('change.select2');
                loadEmployeesMaster(); // Refresh employee master table
                loadEmployees(); // Refresh manage user table (if visible/needed)
                updateAllDashboardDropdowns(); // Refresh dropdowns
            } catch (error) {
                console.error('Failed to add employee:', error);
                alert('Error adding employee: ' + error.message);
            }
        });

        // Create/Edit Login Form (Manage User Tab)
        $('#manageLoginForm').on('submit', async function(e) {
            e.preventDefault();
            console.log("manageLoginForm submitted.");

            const username = $('#username').val().trim();
            const password = $('#password').val().trim();
            const role = $('#userRole').val();

            if (!username || !password || !role) {
                alert('Username, Password, and Role are required for login creation.');
                return;
            }

            let targetEmployee = null;
            if (editingEmployeeLogin) {
                // If we are in "edit" mode from the table, use the stored employee
                targetEmployee = editingEmployeeLogin;
            } else {
                // If we are creating a new login via dropdown, get the selected employee
                const employeeIdSelected = $('#loginEmployeeId').val();
                if (!employeeIdSelected) {
                    alert('Please select an Employee or "General Admin" for login creation.');
                    return;
                }
                targetEmployee = employees.find(e => e.id === employeeIdSelected);
            }

            if (!targetEmployee) {
                alert('Selected employee not found for login creation/update.');
                return;
            }

            // Check for unique username (excluding the currently editing employee if applicable)
            const isUsernameTaken = employees.some(e => e.username === username && e.id !== targetEmployee.id);
            if (isUsernameTaken) {
                alert('Username already exists for another user. Please choose a different username.');
                return;
            }

            const updatedLoginData = {
                id: targetEmployee.id,
                username: username,
                password: password, // In a real app, hash this before sending
                role: role
            };

            try {
                // Use PUT for update operation on the unified employee_full endpoint
                await makeAuthRequest('/admin/employees_full', 'PUT', updatedLoginData);
                alert(`Login for ${targetEmployee.name} created/updated successfully!`);
                $(this)[0].reset(); // Reset the form
                $('#loginEmployeeId').val('').trigger('change.select2'); // Reset dropdown
                loadEmployees(); // Refresh manage user table to show updated login status
                updateAllDashboardDropdowns(); // Refresh login dropdown options
                editingEmployeeLogin = null; // Reset editing state
            } catch (error) {
                console.error('Failed to create/update login:', error);
                alert('Error creating/updating login.');
            }
        });

        // Save Employee/Login Changes from Modal
        $('#saveEmployeeChangesBtn').on('click', saveEmployeeLoginChanges);

        // Reset state when employee edit modal is hidden
        $('#employeeEditModal').on('hidden.bs.modal', function () {
            // Reset form and editing state when modal is hidden
            $('#manageLoginForm')[0].reset();
            $('#loginEmployeeId').val('').trigger('change.select2');
            $('#username, #password, #userRole').prop('disabled', false); // Ensure inputs are enabled for new login
            editingEmployeeLogin = null;
            updateAllDashboardDropdowns(); // Re-populate login dropdown to show newly available employees
        });

        // Logic for when an employee is selected in the "Create Login" dropdown
        $('#loginEmployeeId').on('change', function() {
            const empId = $(this).val();
            const selectedItem = employees.find(emp => emp.id === empId);

            $('#username').val('');
            $('#password').val(''); // Always clear password for security
            $('#userRole').val('');
            $('#username, #password, #userRole').prop('disabled', false); // Assume new creation

            if (selectedItem) {
                if (selectedItem.username) {
                    alert(`Employee ${selectedItem.name} already has a login: ${selectedItem.username}. Use the 'Edit' button in the list to modify their record.`);
                    $('#username').val(selectedItem.username);
                    $('#userRole').val(selectedItem.role);
                    // Disable fields for direct entry on this form, force edit via modal
                    $('#username, #password, #userRole').prop('disabled', true);
                } else {
                    // Pre-fill username for new logins for regular employees
                    $('#username').val(selectedItem.id.toLowerCase().replace('_', '.') || '');
                    $('#userRole').val('employee'); // Default role for new employee logins
                }
            } else {
                // If nothing selected (or default empty option)
                // Special handling for 'admin_account' if it's explicitly selected from dropdown
                if (empId === 'admin_account') {
                    const adminAccount = employees.find(e => e.id === 'admin_account');
                    if (adminAccount.username) {
                        alert('General Admin account already has a login. Use the "Edit" button in the list to modify it.');
                        $('#username').val(adminAccount.username);
                        $('#userRole').val(adminAccount.role);
                        $('#username, #password, #userRole').prop('disabled', true);
                    } else {
                        $('#username').val('admin');
                        $('#userRole').val('admin');
                    }
                }
            }
        });

        // Add Campaign Form
        $('#campaignForm').on('submit', async function(e) {
            e.preventDefault();
            const campaignNameInput = $(this).find('#campaignNameInput');
            const campaignName = campaignNameInput.val().trim();
            const organizationId = $('#campaignOrganizationSelect').val();
            const processId = $('#campaignProcessSelect').val();

            if (!campaignName || !organizationId || !processId) { alert('Campaign name, organization, and process are required.'); return; }

            await makeAuthRequest('/admin/campaigns', 'POST', { name: campaignName, organizationId: organizationId, processId: processId });
            alert(`Simulating addition of Campaign: ${campaignName}`);

            campaignNameInput.val('');
            $('#campaignOrganizationSelect').val('').trigger('change.select2');
            $('#campaignProcessSelect').val('').trigger('change.select2');
            loadCampaigns(); // Refresh table
            updateAllDashboardDropdowns(); // Refresh dropdowns
            setupMasterCascades(); // Re-setup cascades for fresh state
        });

        // Create Task Form
        $('#createTaskForm').on('submit', async function(e) {
            e.preventDefault();
            console.log("createTaskForm submitted.");

            const organization = $('#taskOrganizationSelect').val();
            const process = $('#taskProcessSelect').val();
            const assignedToEmployee = $('#taskEmployeeSelect').val();
            const taskDate = $('#taskDate').val();
            const generalComment = $('#generalComment').val() || ''; // Defensive: use || ''

            if (!organization || !process || !assignedToEmployee || !taskDate) {
                alert('Please fill all required fields: Organization, Process, Employee, and Task Date.');
                return;
            }

            const leadsAssignments = getSelectionsFromListbox('rightBoxLeads');
            const leadsQty = parseFloat($('#leadsQty').val() || 0);
            const convertToProspects = parseFloat($('#convertToProspects').val() || 0);
            const leadsComment = $('#leadsComment').val() || ''; // Defensive: use || ''
            const leadsRegion = $('#leadsAssignmentRegion').val();
            const leadsMonthYear = $('#leadsAssignmentMonth').val() && $('#leadsAssignmentYear').val() ? `${$('#leadsAssignmentMonth').val()}-${$('#leadsAssignmentYear').val()}` : '';

            // Determine if leads data actually exists to be saved (beyond just default 0s or empty strings)
            // It seems from your mock data, 'month' and 'region' are still directly on the leads object when created.
            // So, check for their presence here too, if they are meant to be part of the created data.
            const hasLeadsData = leadsAssignments.length > 0 || leadsQty > 0 || convertToProspects > 0 || leadsComment !== '' || $('#leadsDateFrom').val() || $('#leadsDateTo').val() || leadsRegion || leadsMonthYear;

            let leadsData = null;
            if (hasLeadsData) {
                leadsData = {
                    dateFrom: $('#leadsDateFrom').val(),
                    dateTo: $('#leadsDateTo').val(),
                    month: leadsMonthYear, // Ensure this is captured from the assignment builder, not just inferred from assignments
                    region: leadsRegion,    // Ensure this is captured
                    assignments: leadsAssignments, // Array of selected assignments from the dual listbox
                    campaign: $('#leadsQuantityCampaignMaster').val(),
                    quantity: leadsQty,
                    convertToProspects: convertToProspects,
                    comment: leadsComment
                };
            }

            const prospectsAssignments = getSelectionsFromListbox('rightBoxProspects');
            const prospectsQty = parseFloat($('#prospectsQty').val() || 0);
            const convertToWon = parseFloat($('#convertToProspects').val() || 0);
            const employeeSaleTarget = parseFloat($('#employeeSaleTarget').val() || 0) * 100000; // Convert to actual value
            const prospectsComment = $('#prospectsComment').val() || ''; // Defensive: use || ''
            const prospectsRegion = $('#prospectsAssignmentRegion').val();
            const prospectsMonthYear = $('#prospectsAssignmentMonth').val() && $('#prospectsAssignmentYear').val() ? `${$('#prospectsAssignmentMonth').val()}-${$('#prospectsAssignmentYear').val()}` : '';

            // Determine if prospects data actually exists to be saved
            const hasProspectsData = prospectsAssignments.length > 0 || prospectsQty > 0 || convertToWon > 0 || employeeSaleTarget > 0 || prospectsComment !== '' || $('#prospectsDateFrom').val() || $('#prospectsDateTo').val() || prospectsRegion || prospectsMonthYear;

            let prospectsData = null;
            if (hasProspectsData) {
                prospectsData = {
                    dateFrom: $('#prospectsDateFrom').val(),
                    dateTo: $('#prospectsDateTo').val(),
                    month: prospectsMonthYear, // Ensure this is captured
                    region: prospectsRegion,    // Ensure this is captured
                    assignments: prospectsAssignments, // Array of selected assignments from the dual listbox
                    campaign: $('#prospectsQuantityCampaignMaster').val(),
                    quantity: prospectsQty,
                    convertToWon: convertToWon,
                    employeeSaleTarget: employeeSaleTarget,
                    comment: prospectsComment
                };
            }

            if (!hasLeadsData && !hasProspectsData) {
                alert('Please fill in either Leads Information or Prospects Information (or both) to create the task.');
                return;
            }

            const taskFinalData = {
                organization: organization,
                process: process,
                assignedToEmployee: assignedToEmployee,
                taskDate: taskDate,
                status: 'Pending', // Default status for new tasks
                generalComment: generalComment,
                leads: leadsData,
                prospects: prospectsData,
                isActive: true // New tasks are active by default
            };

            try {
                await makeAuthRequest('/admin/tasks', 'POST', taskFinalData);
                alert('Task Created Successfully (Simulated)!');
                $(this)[0].reset(); // Reset the form
                $('.select2-enabled').val(null).trigger('change.select2'); // Reset select2 dropdowns
                // Clear dual listboxes after submission
                $('#leftBoxLeads, #rightBoxLeads, #leftBoxProspects, #rightBoxProspects').empty();
                // Re-setup cascades for fresh form state
                setupCreateTaskCascades();
                initializeTaskAssignmentBuilders(); // Re-initialize defaults for next task
                applyFiltersAndRenderTasks(); // Refresh task tables
            } catch (error) {
                console.error('Failed to create task:', error);
                alert('Error creating task: ' + error.message);
            }
        });

        // Save Task Changes from Modal (All Tasks Edit Button)
        $('#saveTaskChangesBtn').on('click', async function() {
            const taskId = $('#editTaskId').val();
            const taskIndex = allTasksData.findIndex(t => t.id === taskId);
            if (taskIndex === -1) { alert('Task not found for updating.'); return; }

            // Get current values from the modal form
            const updatedOrganization = $('#editOrganization').val();
            const updatedProcess = $('#editProcess').val();
            const updatedAssignedToEmployee = $('#editEmployee').val();
            const updatedTaskDate = $('#editTaskDate').val();
            const updatedGeneralComment = $('#editGeneralComment').val() || ''; // Defensive: use || ''

            if (!updatedOrganization || !updatedProcess || !updatedAssignedToEmployee || !updatedTaskDate) {
                alert('Please fill all required fields: Organization, Process, Employee, and Task Date.');
                return;
            }

            // Leads Information from Edit Modal
            const updatedLeadsAssignments = getSelectionsFromListbox('rightBoxEditLeads');
            const updatedLeadsQty = parseFloat($('#editLeadsQty').val() || 0);
            const updatedConvertToProspects = parseFloat($('#editConvertToProspects').val() || 0);
            const updatedLeadsComment = $('#editLeadsComment').val() || ''; // Defensive: use || ''
            const updatedLeadsCampaign = $('#editLeadsCampaign').val();
            const updatedLeadsDateFrom = $('#editLeadsDateFrom').val();
            const updatedLeadsDateTo = $('#editLeadsDateTo').val();
            // Capture month and region from the assignment builder dropdowns
            const updatedLeadsMonthYear = $('#editLeadsAssignmentMonth').val() && $('#editLeadsAssignmentYear').val() ? `${$('#editLeadsAssignmentMonth').val()}-${$('#editLeadsAssignmentYear').val()}` : '';
            const updatedLeadsRegion = $('#editLeadsAssignmentRegion').val();

            const hasUpdatedLeadsData = updatedLeadsAssignments.length > 0 || updatedLeadsQty > 0 || updatedConvertToProspects > 0 || updatedLeadsComment !== '' || updatedLeadsDateFrom || updatedLeadsDateTo || updatedLeadsCampaign || updatedLeadsMonthYear || updatedLeadsRegion;

            let updatedLeadsData = null;
            if (hasUpdatedLeadsData) {
                updatedLeadsData = {
                    dateFrom: updatedLeadsDateFrom,
                    dateTo: updatedLeadsDateTo,
                    month: updatedLeadsMonthYear, // Ensure this is saved
                    region: updatedLeadsRegion,    // Ensure this is saved
                    assignments: updatedLeadsAssignments,
                    campaign: updatedLeadsCampaign,
                    quantity: updatedLeadsQty,
                    convertToProspects: updatedConvertToProspects,
                    comment: updatedLeadsComment
                };
            }

            // Prospects Information from Edit Modal
            const updatedProspectsAssignments = getSelectionsFromListbox('rightBoxEditProspects');
            const updatedProspectsQty = parseFloat($('#editProspectsQty').val() || 0);
            const updatedConvertToWon = parseFloat($('#editConvertToWon').val() || 0);
            const updatedEmployeeSaleTarget = parseFloat($('#editEmployeeSaleTarget').val() || 0) * 100000;
            const updatedProspectsComment = $('#editProspectsComment').val() || ''; // Defensive: use || ''
            const updatedProspectsCampaign = $('#editProspectsCampaign').val();
            const updatedProspectsDateFrom = $('#editProspectsDateFrom').val();
            const updatedProspectsDateTo = $('#editProspectsDateTo').val();
            // Capture month and region from the assignment builder dropdowns
            const updatedProspectsMonthYear = $('#editProspectsAssignmentMonth').val() && $('#editProspectsAssignmentYear').val() ? `${$('#editProspectsAssignmentMonth').val()}-${$('#editProspectsAssignmentYear').val()}` : '';
            const updatedProspectsRegion = $('#editProspectsAssignmentRegion').val();


            const hasUpdatedProspectsData = updatedProspectsAssignments.length > 0 || updatedProspectsQty > 0 || updatedConvertToWon > 0 || updatedEmployeeSaleTarget > 0 || updatedProspectsComment !== '' || updatedProspectsDateFrom || updatedProspectsDateTo || updatedProspectsCampaign || updatedProspectsMonthYear || updatedProspectsRegion;

            let updatedProspectsData = null;
            if (hasUpdatedProspectsData) {
                updatedProspectsData = {
                    dateFrom: updatedProspectsDateFrom,
                    dateTo: updatedProspectsDateTo,
                    month: updatedProspectsMonthYear, // Ensure this is saved
                    region: updatedProspectsRegion,    // Ensure this is saved
                    assignments: updatedProspectsAssignments,
                    campaign: updatedProspectsCampaign,
                    quantity: updatedProspectsQty,
                    convertToWon: updatedConvertToWon,
                    employeeSaleTarget: updatedEmployeeSaleTarget,
                    comment: updatedProspectsComment
                };
            }

            if (!hasUpdatedLeadsData && !hasUpdatedProspectsData) {
                alert('A task must have at least one Lead or Prospect assignment/quantity to be saved.');
                return;
            }

            const taskUpdatePayload = {
                id: taskId, // Crucial for identifying the task to update
                organization: updatedOrganization,
                process: updatedProcess,
                assignedToEmployee: updatedAssignedToEmployee,
                taskDate: updatedTaskDate,
                generalComment: updatedGeneralComment,
                leads: updatedLeadsData,
                prospects: updatedProspectsData,
                isActive: allTasksData[taskIndex].isActive // Keep current activation status
            };

            try {
                // Perform the update (simulated API call)
                await makeAuthRequest('/admin/tasks', 'PUT', taskUpdatePayload);
                alert(`Task ${taskId} changes saved successfully (simulated)!`);
                $('#taskEditModal').modal('hide');
                applyFiltersAndRenderTasks(); // Re-render table to show updated data
            } catch (error) {
                console.error('Failed to save task changes:', error);
                alert('Error saving task changes: ' + error.message);
            }
        });

        // Event listener for the Deactivate/Activate button inside the Edit modal
        $('#toggleTaskActivationBtn').on('click', function() {
            const taskId = $(this).data('task-id');
            const newStatus = $(this).data('status'); // true or false
            toggleTaskActivation(taskId, newStatus);
        });


        // --- All Tasks Filter Event Handlers ---
        // Universal Search input listener
        $('#universalTaskSearchInput').on('input', function() {
            currentFilters.searchTerm = $(this).val();
            applyFiltersAndRenderTasks();
        });
        // Clear Universal Search button
        $('#clearUniversalSearchBtn').on('click', function() {
            $('#universalTaskSearchInput').val('');
            currentFilters.searchTerm = '';
            applyFiltersAndRenderTasks();
        });

        // Apply Filters button inside the Universal Filter Offcanvas
        $('#universalFilterForm').on('submit', function(e) {
            e.preventDefault();
            console.log("Universal Filter Form submitted.");

            // Capture all filter values from the universal offcanvas
            currentFilters.taskDateFrom = $('#filterTaskDateFrom').val();
            currentFilters.taskDateTo = $('#filterTaskDateTo').val();
            currentFilters.organization = $('#filterOrganization').val();
            currentFilters.process = $('#filterProcess').val();
            currentFilters.employee = $('#filterEmployee').val();
            currentFilters.status = $('#filterStatus').val(); // Status is also universal now

            // Apply filters to tasks and render
            applyFiltersAndRenderTasks();
            // Close the offcanvas after applying filters
            const offcanvasElement = document.getElementById('filterOffcanvas');
            const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
            if (bsOffcanvas) {
                bsOffcanvas.hide();
            } else {
                new bootstrap.Offcanvas(offcanvasElement).hide();
            }
        });

        // Clear All Filters Button for "All Tasks" section
        $('#clearAllMainFiltersBtn').on('click', function() {
            // Reset filters to their defaults
            currentFilters = { searchTerm: '', taskDateFrom: '', taskDateTo: '', organization: '', process: '', employee: '', status: '' };

            // Clear UI elements in the main section and offcanvas
            $('#universalTaskSearchInput').val('');
            $('#universalFilterForm')[0].reset(); // Resets all offcanvas form elements
            // Also explicitly clear select2 and datepickers if reset() doesn't
            $('.select2-enabled-filter').val(null).trigger('change.select2');
            $('.datepicker-filter').val('');

            applyFiltersAndRenderTasks(); // Re-apply filters
        });

        // Clear All Filters Button for "View Current Task Status" section
        $('#clearAllViewFiltersBtn').on('click', function() {
            // Reset filters to their defaults
            currentFilters = { searchTerm: '', taskDateFrom: '', taskDateTo: '', organization: '', process: '', employee: '', status: '' };

            // Clear UI elements in this section and offcanvas
            $('#universalTaskSearchInput').val('');
            $('#universalFilterForm')[0].reset(); // Resets all offcanvas form elements
            // Also explicitly clear select2 and datepickers if reset() doesn't
            $('.select2-enabled-filter').val(null).trigger('change.select2');
            $('.datepicker-filter').val('');

            applyFiltersAndRenderTasks(); // Re-apply filters
        });


        // --- Dual Listbox Event Listeners (Create Task Form) ---
        $('#leadsAddAssignmentBtn').on('click', () => addAssignment('leads'));
        $('#leadsMoveRightBtn').on('click', () => moveOptions('leftBoxLeads', 'rightBoxLeads'));
        $('#leadsMoveLeftBtn').on('click', () => moveOptions('rightBoxLeads', 'leftBoxLeads'));

        $('#prospectsAddAssignmentBtn').on('click', () => addAssignment('prospects'));
        $('#prospectsMoveRightBtn').on('click', () => moveOptions('leftBoxProspects', 'rightBoxProspects'));
        $('#prospectsMoveLeftBtn').on('click', () => moveOptions('rightBoxProspects', 'leftBoxProspects'));

        // Dual Listbox Event Listeners (Edit Task Modal)
        // These will use the "editLeads" and "editProspects" prefixes
        $('#editLeadsAddAssignmentBtn').on('click', () => addAssignment('editLeads'));
        $('#editLeadsMoveRightBtn').on('click', () => moveOptions('leftBoxEditLeads', 'rightBoxEditLeads'));
        $('#editLeadsMoveLeftBtn').on('click', () => moveOptions('rightBoxEditLeads', 'leftBoxEditLeads'));

        $('#editProspectsAddAssignmentBtn').on('click', () => addAssignment('editProspects'));
        $('#editProspectsMoveRightBtn').on('click', () => moveOptions('leftBoxEditProspects', 'rightBoxEditProspects'));
        $('#editProspectsMoveLeftBtn').on('click', () => moveOptions('rightBoxEditProspects', 'leftBoxEditProspects'));


        // --- Initial Load Logic ---
        // Determine which section to show on initial page load based on URL hash
        const initialHash = window.location.hash.substring(1);
        if (initialHash && document.getElementById(initialHash + '-section')) {
            showSection(initialHash, false); // Don't update URL hash again
        } else {
            showSection('manage-user', true); // Default to 'manage-user' section
        }

        console.log("admin_dashboard.js initialization complete.");
    });

})(jQuery); // Pass jQuery to the IIFE