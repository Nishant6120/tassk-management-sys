(function($) {
    "use strict";

    // --- Global Data Stores (Mock Data) ---
    let employees = [
        { id: 'emp_001', name: 'Kirti Agrawal', designation: 'Manager', department: 'Sales', organization: 'ORG001', isActive: true, username: 'kirti.a', password: 'password123', role: 'employee' },
        { id: 'emp_002', name: 'Harpreet Kaur', designation: 'Analyst', department: 'Marketing', organization: 'ORG002', isActive: true, username: 'harpreet.k', password: 'password123', role: 'employee' },
        { id: 'emp_003', name: 'Chandani', designation: 'Developer', department: 'IT', organization: 'ORG001', isActive: false, username: null, password: null, role: null },
        { id: 'emp_004', name: 'Raj Patel', designation: 'Sales Rep', department: 'Sales', organization: 'ORG002', isActive: true, username: null, password: null, role: null },
        { id: 'admin_account', name: 'Admin', designation: '--', department: '--', organization: '--', isActive: true, username: 'admin', password: 'adminpassword', role: 'admin' }
    ];

    let organizations = [
        { _id: 'ORG001', name: 'Legrand', isActive: true },
        { _id: 'ORG002', name: 'Accutech', isActive: true },
        { _id: 'ORG003', name: 'Global Corp', isActive: false }
    ];

    let processes = [
        { _id: 'PROC001', name: 'Legrand_CRM', organizationId: 'ORG001', isActive: true },
        { _id: 'PROC002', name: 'Numeric_AMC', organizationId: 'ORG002', isActive: true },
        { _id: 'PROC003', name: 'Numeric_Product', organizationId: 'ORG002', isActive: false }
    ];

    let campaigns = [
        { _id: 'CAMP001', name: 'Bulk order', organizationId: 'ORG001', processId: 'PROC001', isActive: true },
        { _id: 'CAMP002', name: 'Home Automation', organizationId: 'ORG001', processId: 'PROC001', isActive: true },
        { _id: 'CAMP003', name: 'Legrand_eShop', organizationId: 'ORG002', processId: 'PROC002', isActive: false }
    ];

    let allTasksData = [
        {
            id: 'TID001', taskDate: '2025-07-17', organization: 'ORG001', process: 'PROC001', assignedToEmployee: 'emp_001', status: 'Pending', generalComment: 'Initial task for Q3 sales.', isActive: true,
            leads: { dateFrom: '2025-07-01', dateTo: '2025-07-05', month: 'Jul-2025', region: 'North', campaign: 'CAMP001', quantity: 100, convertToProspects: 10, comment: 'Initial lead engagement', assignments: ['date-2025-07-01-2025-07-05', 'month-Jul-2025', 'region-North', 'campaign-CAMP001'] },
            prospects: null,
            activeLeadsToProspects: 5, activeConvertToWon: 0, activeSales: 0
        },
        {
            id: 'TID002', taskDate: '2025-07-16', organization: 'ORG002', process: 'PROC002', assignedToEmployee: 'emp_002', status: 'In Progress', generalComment: 'Follow up on product inquiries.', isActive: true,
            leads: null,
            prospects: { dateFrom: '2025-07-06', dateTo: '2025-07-10', month: 'Jul-2025', region: 'East', campaign: 'CAMP003', quantity: 10, convertToWon: 2, employeeSaleTarget: 250000, comment: 'Client signed up.', assignments: ['date-2025-07-06-2025-07-10', 'month-Jul-2025', 'region-East', 'campaign-CAMP003'] },
            activeLeadsToProspects: 0, activeConvertToWon: 1, activeSales: 125000
        },
        {
            id: 'TID003', taskDate: '2025-07-18', organization: 'ORG001', process: 'PROC001', assignedToEmployee: 'emp_003', status: 'Completed', generalComment: 'CRM system update analysis.', isActive: false,
            leads: { dateFrom: '2025-06-15', dateTo: '2025-06-20', month: 'Jun-2025', region: 'South', campaign: 'CAMP002', quantity: 50, convertToProspects: 5, comment: 'Reviewed current CRM usage.' , assignments: ['date-2025-06-15-2025-06-20', 'month-Jun-2025', 'region-South', 'campaign-CAMP002']},
            prospects: null,
            activeLeadsToProspects: 5, activeConvertToWon: 0, activeSales: 0
        },
        {
            id: 'TID004', taskDate: '2025-07-15', organization: 'ORG002', process: 'PROC003', assignedToEmployee: 'emp_004', status: 'Overdue', generalComment: 'Launch new product line campaign.', isActive: true,
            leads: null,
            prospects: { dateFrom: '2025-07-01', dateTo: '2025-07-07', month: 'Jul-2025', region: 'West', campaign: 'CAMP003', quantity: 15, convertToWon: 3, employeeSaleTarget: 300000, comment: 'Awaiting final creative assets.' , assignments: ['date-2025-07-01-2025-07-07', 'month-Jul-2025', 'region-West', 'campaign-CAMP003']},
            activeLeadsToProspects: 0, activeConvertToWon: 1, activeSales: 100000
        },
        {
            id: 'TID005', taskDate: '2025-07-19', organization: 'ORG001', process: 'PROC001', assignedToEmployee: 'emp_001', status: 'Pending', generalComment: 'Follow up on key accounts in North region.', isActive: true,
            leads: { dateFrom: '2025-07-10', dateTo: '2025-07-15', month: 'Jul-2025', region: 'North', campaign: 'CAMP001', quantity: 75, convertToProspects: 8, comment: 'Initial contact made with 5 accounts.', assignments: ['date-2025-07-10-2025-07-15', 'month-Jul-2025', 'region-North', 'campaign-CAMP001']},
            prospects: null,
            activeLeadsToProspects: 2, activeConvertToWon: 0, activeSales: 0
        },
        {
            id: 'TID006', taskDate: '2025-07-20', organization: 'ORG002', process: 'PROC002', assignedToEmployee: 'emp_002', status: 'Under process', generalComment: 'Analyze market trends for Q3.', isActive: true, // Changed from 'In Progress' to 'Under process'
            leads: { dateFrom: '2025-07-01', dateTo: '2025-07-05', month: 'Jul-2025', region: 'East', campaign: 'CAMP003', quantity: 10, convertToProspects: 1, comment: 'Gathering data, preliminary findings positive.', assignments: ['date-2025-07-01-2025-07-05', 'month-Jul-2025', 'region-East', 'campaign-CAMP003']},
            prospects: null,
            activeLeadsToProspects: 0, activeConvertToWon: 0, activeSales: 0
        }
    ];

    let allocatedTasksData = [
        { id: 'ATID001', assignedTo: 'emp_001', assignedDate: '2025-07-25', taskCompletedDate: null, dueDate: '2025-07-30', task: 'Prepare weekly sales report.', remark: 'Started working on it.', status: 'Under process', isActive: true }, // Changed status to 'Under process'
        { id: 'ATID002', assignedTo: 'emp_002', assignedDate: '2025-07-25', taskCompletedDate: '2025-07-28', dueDate: '2025-07-28', task: 'Follow up with client X.', remark: 'Client signed up.', status: 'Completed', isActive: true },
        { id: 'ATID003', assignedTo: 'emp_001', assignedDate: '2025-07-20', taskCompletedDate: null, dueDate: '2025-07-26', task: 'Review Q2 performance.', remark: 'Pending review.', status: 'Pending', isActive: true }
    ];

    let currentFilters = { searchTerm: '', taskDateFrom: '', taskDateTo: '', organization: '', process: '', employee: '', campaign: '', status: '' };
    let editingEmployeeLogin = null;

    // --- Authentication ---
    // The checkAuth function is commented out to prevent a ReferenceError and allow development
    /*
    function checkAuth() {
        const sessionId = localStorage.getItem('session_id');
        const role = localStorage.getItem('user_role');
        if (!sessionId || role !== 'admin') {
            alert('Unauthorized access. Please log in as Admin.');
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }
    */

    // --- Mock API Simulation (bypassing auth for development) ---
    async function makeAuthRequest(url, method = 'POST', data = null) {
        console.log(`Mock API Call: ${method} ${url}`, data);
        return new Promise(resolve => {
            setTimeout(() => {
                let responseData = null;
                if (url.includes('/admin/organizations')) {
                    const newOrg = { _id: `ORG${String(organizations.length + 1).padStart(3, '0')}`, name: data.name, isActive: true };
                    organizations.push(newOrg);
                    responseData = newOrg;
                } else if (url.includes('/admin/processes')) {
                    const newProc = { _id: `PROC${String(processes.length + 1).padStart(3, '0')}`, name: data.name, organizationId: data.organizationId, isActive: true };
                    processes.push(newProc);
                    responseData = newProc;
                } else if (url.includes('/admin/campaigns')) {
                    const newCampaign = { _id: `CAMP${String(campaigns.length + 1).padStart(3, '0')}`, name: data.name, organizationId: data.organizationId, processId: data.processId, isActive: true };
                    campaigns.push(newCampaign);
                    responseData = newCampaign;
                } else if (url.includes('/admin/tasks')) {
                    if (method === 'PUT' && data.id) {
                        const taskIndex = allTasksData.findIndex(t => t.id === data.id);
                        if (taskIndex !== -1) {
                            allTasksData[taskIndex] = { ...allTasksData[taskIndex], ...data };
                            responseData = allTasksData[taskIndex];
                        } else {
                            console.error('Task not found for update:', data.id);
                            responseData = null;
                        }
                    } else {
                        const newTaskId = 'TID' + (allTasksData.length + 1).toString().padStart(3, '0');
                        const newTask = { id: newTaskId, ...data, isActive: true,
                                        activeLeadsToProspects: 0, activeConvertToWon: 0, activeSales: 0
                                        };
                        allTasksData.push(newTask);
                        responseData = newTask;
                    }
                } else if (url.includes('/admin/employees_full')) {
                    if (method === 'POST') {
                        const newEmp = { ...data, isActive: true, username: null, password: null, role: null };
                        employees.push(newEmp);
                        responseData = newEmp;
                    } else if (method === 'PUT') {
                        const empIndex = employees.findIndex(e => e.id === data.id);
                        if (empIndex !== -1) {
                            employees[empIndex] = { ...employees[empIndex], ...data };
                            responseData = employees[empIndex];
                        }
                    }
                } else if (url.includes('/admin/allocated_tasks')) {
                    if (method === 'PUT' && data.id) {
                        const taskIndex = allocatedTasksData.findIndex(t => t.id === data.id);
                        if (taskIndex !== -1) {
                            allocatedTasksData[taskIndex] = { ...allocatedTasksData[taskIndex], ...data };
                            responseData = allocatedTasksData[taskIndex];
                        } else {
                            console.error('Allocated Task not found for update:', data.id);
                            responseData = null;
                        }
                    }
                }
                resolve(responseData);
            }, 300);
        });
    }

    // --- Helper Functions ---
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

    function initializeUIComponents() {
        $('.select2-enabled').select2({ placeholder: "Select", allowClear: true, width: '100%' });
        $('.select2-enabled-filter').select2({ placeholder: "All", allowClear: true, width: '100%' });
        // Set date format to dd/mm/yyyy
        $(".datepicker").datepicker({ dateFormat: 'dd/mm/yy' });
        $('#taskDate').datepicker({
            dateFormat: 'dd/mm/yy',
            minDate: 0,
            maxDate: 1
        });
        $(".datepicker-filter").datepicker({ dateFormat: 'dd/mm/yy' });
    }

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

        const employeesForLoginDropdown = employees.filter(emp =>
            (emp.id !== 'admin_account' && emp.isActive && !emp.username) ||
            (emp.id === 'admin_account' && !emp.username)
        );
        populateDropdown($('#loginEmployeeId'), employeesForLoginDropdown, 'id', 'name', 'Select Employee');

        populateDropdown($('#leadsQuantityCampaignMaster'), campaigns, '_id', 'name', 'Select Campaign');
        populateDropdown($('#prospectsQuantityCampaignMaster'), campaigns, '_id', 'name', 'Select Campaign');
        populateDropdown($('#editLeadsCampaign'), campaigns, '_id', 'name', 'Select Campaign');
        populateDropdown($('#editProspectsCampaign'), campaigns, '_id', 'name', 'Select Campaign');
        
        populateDropdown($('#filterCampaign'), campaigns, '_id', 'name', 'All Campaigns', true);
        
        // Populate the status filter dropdown with static options
        const statusOptions = [
            {value: 'Pending', text: 'Pending'},
            {value: 'Under process', text: 'Under process'}, // Changed text to 'Under process'
            {value: 'Completed', text: 'Completed'},
            {value: 'Overdue', text: 'Overdue'}
        ];
        populateDropdown($('#filterStatus'), statusOptions, 'value', 'text', 'All Statuses', true);
        
        populateDropdown($('#allocateEmployeeSelect'), employees, 'id', 'name', 'Select Employee', false);
    }

    function initializeTaskAssignmentBuilders() {
        const currentYear = new Date().getFullYear();
        const yearSelects = $('#leadsAssignmentYear, #prospectsAssignmentYear, #editLeadsAssignmentYear, #editProspectsAssignmentYear');
        yearSelects.empty();
        for (let i = currentYear - 5; i <= currentYear + 5; i++) {
            yearSelects.append(new Option(i, i));
        }

        const monthSelects = $('#leadsAssignmentMonth, #prospectsAssignmentMonth, #editLeadsAssignmentMonth, #editProspectsAssignmentMonth');
        monthSelects.each(function() {
            const $this = $(this);
            $this.empty();
            $this.append('<option value="" selected disabled hidden>Select Month</option>');
            $this.append('<option value="All">All</option>'); 
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            months.forEach(m => $this.append(new Option(m, m))); 
            $this.val('');
        });
        
        // Set initial year value to current year for consistency
        $('#leadsAssignmentYear').val(currentYear); 
        $('#prospectsAssignmentYear').val(currentYear); 
        $('#leadsAssignmentRegion').val(''); 
        $('#leadsQuantityCampaignMaster').val(null).trigger('change.select2');

        $('#prospectsAssignmentMonth').val(''); 
        $('#prospectsAssignmentYear').val(currentYear); // Set initial year value to current year
        $('#prospectsAssignmentRegion').val(''); 
        $('#prospectsQuantityCampaignMaster').val(null).trigger('change.select2');

        $('#leftBoxLeads, #rightBoxLeads, #leftBoxProspects, #rightBoxProspects').empty();
    }

    function moveOptions(fromBoxId, toBoxId) {
        const fromBox = document.getElementById(fromBoxId);
        const toBox = document.getElementById(toBoxId);
        if (!fromBox || !toBox) {
            console.error(`Missing one of the listboxes: #${fromBoxId} or #${toBoxId}`);
            return;
        }
        Array.from(fromBox.selectedOptions).forEach(option => {
            toBox.appendChild(option);
        });
        Array.from(fromBox.options).forEach(option => option.selected = false);
    }

    function addAssignment(type, listboxPrefix) {
        let displayText = '';
        let valueText = '';
        let isValid = false;

        const monthMap = { 'Jan': 'January', 'Feb': 'February', 'Mar': 'March', 'Apr': 'April', 'May': 'May', 'Jun': 'June', 'Jul': 'July', 'Aug': 'August', 'Sep': 'September', 'Oct': 'October', 'Nov': 'November', 'Dec': 'December' };

        if (type === 'dateRange') {
            const dateFrom = $(`#${listboxPrefix}DateFrom`).val();
            const dateTo = $(`#${listboxPrefix}DateTo`).val();
            if (dateFrom && dateTo) {
                // Ensure format DD/MM/YYYY
                displayText = `${dateFrom} - ${dateTo}`;
                // Store in YYYY-MM-DD for easier parsing if needed later
                valueText = `date-${dateFrom.split('/').reverse().join('-')}-${dateTo.split('/').reverse().join('-')}`;
                isValid = true;
            } else {
                alert('Please select both Date From and Date To.');
            }
        } else if (type === 'monthYear') {
            const monthValue = $(`#${listboxPrefix}AssignmentMonth`).val();
            const yearValue = $(`#${listboxPrefix}AssignmentYear`).val();
            if (monthValue && yearValue) {
                const monthText = monthValue === 'All' ? 'All Months' : monthValue; // Use abbreviation for display
                displayText = `${monthText}-${yearValue}`;
                valueText = `month-${monthValue}-${yearValue}`;
                isValid = true;
            } else {
                alert('Please select both Month and Year.');
            }
        } else if (type === 'region') {
            const regionValue = $(`#${listboxPrefix}AssignmentRegion`).val();
            if (regionValue) {
                const regionText = regionValue === 'All' ? 'All Regions' : regionValue;
                displayText = `Region: ${regionText}`;
                valueText = `region-${regionValue}`;
                isValid = true;
            } else {
                alert('Please select a Region.');
            }
        } else if (type === 'campaign') {
            const campaignValue = $(`#${listboxPrefix}QuantityCampaignMaster`).val();
            if (campaignValue) {
                const campaignText = campaigns.find(c => c._id === campaignValue)?.name || campaignValue;
                displayText = `Campaign: ${campaignText}`;
                valueText = `campaign-${campaignValue}`;
                isValid = true;
            } else {
                alert('Please select a Campaign.');
            }
        }

        if (!isValid) {
            return;
        }
        
        const leftBoxId = `leftBox${listboxPrefix.charAt(0).toUpperCase() + listboxPrefix.slice(1)}`;
        const rightBoxId = `rightBox${listboxPrefix.charAt(0).toUpperCase() + listboxPrefix.slice(1)}`;
        const leftBox = document.getElementById(leftBoxId);
        const rightBox = document.getElementById(rightBoxId);

        if (!leftBox || !rightBox) {
            console.error(`Could not find listboxes for prefix: ${listboxPrefix} (IDs: ${leftBoxId}, ${rightBoxId})`);
            alert('Failed to add assignment. Listbox elements not found.');
            return;
        }

        const optionExists = Array.from(leftBox.options).some(opt => opt.value === valueText) ||
                               Array.from(rightBox.options).some(opt => opt.value === valueText);

        if (optionExists) {
            alert('This assignment already exists.');
            return;
        }
        
        leftBox.appendChild(new Option(displayText, valueText));

        if (type === 'dateRange') {
            $(`#${listboxPrefix}DateFrom`).val('');
            $(`#${listboxPrefix}DateTo`).val('');
        } else if (type === 'monthYear') {
            $(`#${listboxPrefix}AssignmentMonth`).val('');
            $(`#${listboxPrefix}AssignmentYear`).val(new Date().getFullYear());
        } else if (type === 'region') {
            $(`#${listboxPrefix}AssignmentRegion`).val('All');
        } else if (type === 'campaign') {
            $(`#${listboxPrefix}QuantityCampaignMaster`).val(null).trigger('change.select2');
        }
    }

    function getSelectionsFromListbox(boxId) {
        const box = document.getElementById(boxId);
        if (!box) {
            console.error(`Listbox with ID #${boxId} not found!`);
            return [];
        }
        return Array.from(box.options).map(opt => opt.value);
    }

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
            return;
        }

        try {
            const updatedTask = { ...allTasksData[taskIndex], isActive: newStatus };
            await makeAuthRequest('/admin/tasks', 'PUT', updatedTask);

            allTasksData[taskIndex].isActive = newStatus;

            alert(`Task ${taskId} has been ${newStatus ? 'activated' : 'deactivated'} (simulated).`);
            $('#taskEditModal').modal('hide');
            applyFiltersAndRenderTasks();
        } catch (error) {
            console.error(`Failed to toggle task activation for ${taskId}:`, error);
            alert(`Error toggling task status: ${error.message}`);
        }
    }

    async function toggleEmployeeActivation(empId, newStatus) {
        const employeeIndex = employees.findIndex(e => e.id === empId);
        if (employeeIndex === -1) {
            alert('Employee not found.');
            return;
        }

        if (empId === 'admin_account') {
            alert('Cannot deactivate the main admin account.');
            return;
        }

        const confirmMessage = newStatus
            ? `Are you sure you want to ACTIVATE employee ${empId}?`
            : `Are you sure you want to DEACTIVATE employee ${empId}? Deactivated employees will lose access and not appear on dashboards.`;

        if (!confirm(confirmMessage)) {
            return;
        }

        try {
            const updatedEmployee = { ...employees[employeeIndex], isActive: newStatus, username: newStatus ? employees[employeeIndex].username : null, password: newStatus ? employees[employeeIndex].password : null, role: newStatus ? employees[employeeIndex].role : null };
            await makeAuthRequest('/admin/employees_full', 'PUT', updatedEmployee);

            employees[employeeIndex].isActive = newStatus;
            employees[employeeIndex].username = updatedEmployee.username;
            employees[employeeIndex].password = updatedEmployee.password;
            employees[employeeIndex].role = updatedEmployee.role;

            alert(`Employee ${empId} has been ${newStatus ? 'activated' : 'deactivated'} (simulated).`);
            loadEmployees();
            updateAllDashboardDropdowns();
        } catch (error) {
            console.error(`Failed to toggle employee activation for ${empId}:`, error);
            alert(`Error toggling employee status: ${error.message}`);
        }
    }

    async function toggleMasterActivation(id, type, newStatus) {
        let dataArray, itemIndex, itemName;

        switch (type) {
            case 'organization':
                dataArray = organizations;
                itemIndex = organizations.findIndex(org => org._id === id);
                itemName = organizations[itemIndex]?.name;
                // Cascade deactivation/activation to dependent processes, campaigns, and employees
                processes.filter(p => p.organizationId === id).forEach(p => p.isActive = newStatus);
                campaigns.filter(c => c.organizationId === id).forEach(c => c.isActive = newStatus);
                employees.filter(emp => emp.organization === id).forEach(emp => emp.isActive = newStatus);
                allTasksData.filter(task => task.organization === id).forEach(task => task.isActive = newStatus);
                break;
            case 'process':
                dataArray = processes;
                itemIndex = processes.findIndex(proc => proc._id === id);
                itemName = processes[itemIndex]?.name;
                // Cascade deactivation/activation to dependent campaigns and tasks
                campaigns.filter(c => c.processId === id).forEach(c => c.isActive = newStatus);
                allTasksData.filter(task => task.process === id).forEach(task => task.isActive = newStatus);
                break;
            case 'campaign':
                dataArray = campaigns;
                itemIndex = campaigns.findIndex(camp => camp._id === id);
                itemName = campaigns[itemIndex]?.name;
                // Cascade deactivation/activation to dependent tasks
                allTasksData.filter(task => (task.leads && task.leads.campaign === id) || (task.prospects && task.prospects.campaign === id)).forEach(task => task.isActive = newStatus);
                break;
            default:
                console.error('Unknown master type:', type);
                return;
        }

        if (itemIndex === -1) {
            alert(`${type} not found.`);
            return;
        }

        const confirmMessage = newStatus
            ? `Are you sure you want to ACTIVATE ${type} "${itemName}" (ID: ${id})?`
            : `Are you sure you want to DEACTIVATE ${type} "${itemName}" (ID: ${id})? This will also affect related records (processes, campaigns, tasks, employees).`;

        if (!confirm(confirmMessage)) {
            return;
        }

        try {
            dataArray[itemIndex].isActive = newStatus;
            // For a real API, you'd send an update request here.
            // await makeAuthRequest(`/admin/${type}s`, 'PUT', dataArray[itemIndex]);

            alert(`${type} "${itemName}" has been ${newStatus ? 'activated' : 'deactivated'} (simulated).`);
            
            // Re-render relevant tables
            if (type === 'organization') {
                loadOrganizations();
                loadProcesses();
                loadCampaigns();
                loadEmployees();
                applyFiltersAndRenderTasks();
            } else if (type === 'process') {
                loadProcesses();
                loadCampaigns();
                applyFiltersAndRenderTasks();
            } else if (type === 'campaign') {
                loadCampaigns();
                applyFiltersAndRenderTasks();
            }
            updateAllDashboardDropdowns();

        } catch (error) {
            console.error(`Failed to toggle ${type} activation for ${id}:`, error);
            alert(`Error toggling ${type} status: ${error.message}`);
        }
    }


    function renderEmployeesTable(targetTableBodyId = 'employeesTableBody', displayLoginDetails = true) {
        console.log(`renderEmployeesTable() called for #${targetTableBodyId}. Display Login: ${displayLoginDetails}`);
        const $tableBody = $(`#${targetTableBodyId}`);

        if (!$tableBody.length) {
            console.error(`Error: #${targetTableBodyId} DOM element not found for rendering employees.`);
            return;
        }
        $tableBody.empty();

        const employeesToDisplay = (targetTableBodyId === 'employeeMasterTableBody')
            ? employees.filter(emp => emp.id !== 'admin_account')
            : [...employees];

        if (employeesToDisplay.length === 0) {
            const colspan = displayLoginDetails ? 9 : 7;
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

            // Button for toggling activation
            const toggleBtnClass = emp.isActive ? 'btn-danger' : 'btn-success';
            const toggleBtnIcon = emp.isActive ? 'fa-times-circle' : 'fa-check-circle';
            // Removed text from button, only icon as requested.
            const toggleBtnHtml = `<button class="btn btn-sm ${toggleBtnClass} toggle-employee-status-btn" data-id="${emp.id}" data-status="${!emp.isActive}" title="${emp.isActive ? 'Deactivate' : 'Activate'}"><i class="fas ${toggleBtnIcon}"></i></button>`;

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
                        ${toggleBtnHtml}
                    </td>
                </tr>`;
            $tableBody.append(rowHtml);
        });

        $tableBody.off('click', '.edit-employee-login').on('click', '.edit-employee-login', function() {
            const empId = $(this).data('id');
            const selectedEmployee = employees.find(e => e.id === empId);

            if (selectedEmployee) {
                editingEmployeeLogin = selectedEmployee;
                populateEmployeeEditModal(selectedEmployee);
                $('#employeeEditModal').modal('show');
            }
        });
        
        $tableBody.off('click', '.toggle-employee-status-btn').on('click', '.toggle-employee-status-btn', function() {
            const empId = $(this).data('id');
            const newStatus = $(this).data('status');
            toggleEmployeeActivation(empId, newStatus);
        });
    }

    function populateEmployeeEditModal(employee) {
        $('#editEmployeeModalId').text(employee.id);
        $('#currentEditEmployeeId').val(employee.id);
        $('#editEmployeeName').val(employee.name || '');
        $('#editEmployeeDesignation').val(employee.designation || '');
        $('#editEmployeeDepartment').val(employee.department || '');
        $('#editEmployeeOrganization').val(employee.organization || '').trigger('change.select2');
        $('#editEmployeeStatus').val(employee.isActive ? 'true' : 'false');

        $('#editLoginUsername').val(employee.username || '');
        $('#editLoginPassword').val('');
        $('#editLoginRole').val(employee.role || '');

        const isRegularEmployee = employee.id !== 'admin_account';
        if (isRegularEmployee) {
            $('#editEmployeeName, #editEmployeeDesignation, #editEmployeeDepartment, #editEmployeeOrganization').prop('disabled', false);
            $('#editEmployeeStatus').prop('disabled', false);
        } else {
            $('#editEmployeeName, #editEmployeeDesignation, #editEmployeeDepartment, #editEmployeeOrganization').prop('disabled', true);
            $('#editEmployeeStatus').prop('disabled', true);
        }
        $('#editLoginUsername, #editLoginPassword, #editLoginRole').prop('disabled', false);
    }

    async function saveEmployeeLoginChanges() {
        if (!editingEmployeeLogin) {
            alert('No employee selected for editing.');
            return;
        }

        const isRegularEmployee = editingEmployeeLogin.id !== 'admin_account';

        const updatedData = {
            id: editingEmployeeLogin.id,
            name: isRegularEmployee ? $('#editEmployeeName').val().trim() : editingEmployeeLogin.name,
            designation: isRegularEmployee ? $('#editEmployeeDesignation').val().trim() : editingEmployeeLogin.designation,
            department: isRegularEmployee ? $('#editEmployeeDepartment').val().trim() : editingEmployeeLogin.department,
            organization: isRegularEmployee ? $('#editEmployeeOrganization').val() : editingEmployeeLogin.organization,
            isActive: $('#editEmployeeStatus').val() === 'true',
            username: $('#editLoginUsername').val().trim(),
            password: $('#editLoginPassword').val() || editingEmployeeLogin.password,
            role: $('#editLoginRole').val()
        };

        if (updatedData.username && employees.some(e => e.username === updatedData.username && e.id !== updatedData.id)) {
            alert('Username already exists for another user. Please choose a different username.');
            return;
        }

        if (!updatedData.username || (!updatedData.password && !editingEmployeeLogin.password) || !updatedData.role) {
            alert('Username, Password (if new), and Role are required for login details.');
            return;
        }

        try {
            await makeAuthRequest('/admin/employees_full', 'PUT', updatedData);
            alert(`Employee ${updatedData.name} details and login updated successfully (simulated)!`);
            $('#employeeEditModal').modal('hide');
            loadEmployees();
            updateAllDashboardDropdowns();
        } catch (error) {
            console.error('Failed to update employee/login:', error);
            alert('Error updating employee/login.');
        }
    }

    async function loadEmployees() {
        console.log("loadEmployees() called (for Manage User section).");
        renderEmployeesTable('employeesTableBody', true);
        updateAllDashboardDropdowns();
    }

    async function loadEmployeesMaster() {
        console.log("loadEmployeesMaster() called (for Employee Master tab).");
        renderEmployeesTable('employeeMasterTableBody', false);
        updateAllDashboardDropdowns();
    }

    async function loadOrganizations() {
        console.log("loadOrganizations() called.");
        try {
            const orgsTableBody = document.getElementById('organizationsTableBody');
            if (!orgsTableBody) { console.error("Error: #organizationsTableBody not found."); return; }
            orgsTableBody.innerHTML = '';
            organizations.forEach(org => {
                const activationButtonClass = org.isActive ? 'btn-danger' : 'btn-success';
                const activationButtonIcon = org.isActive ? 'fa-times-circle' : 'fa-check-circle';
                
                const row = `<tr><td>${org._id}</td><td>${org.name}</td>
                             <td>
                                 <button class="btn btn-sm btn-info edit-master-btn me-2" data-id="${org._id}" data-name="${org.name}" data-type="organization"><i class="fas fa-edit"></i></button>
                                 <button class="btn btn-sm ${activationButtonClass} toggle-master-status-btn" data-id="${org._id}" data-type="organization" data-status="${!org.isActive}" title="${org.isActive ? 'Deactivate' : 'Activate'}"><i class="fas ${activationButtonIcon}"></i></button>
                             </td></tr>`;
                orgsTableBody.insertAdjacentHTML('beforeend', row);
            });
            $(orgsTableBody).off('click').on('click', '.toggle-master-status-btn', async (e) => {
                const id = $(e.currentTarget).data('id');
                const type = $(e.currentTarget).data('type');
                const newStatus = $(e.currentTarget).data('status');
                toggleMasterActivation(id, type, newStatus);
            }).on('click', '.edit-master-btn', function() {
                const id = $(this).data('id');
                const name = $(this).data('name');
                alert(`Editing Organization: ${name} (ID: ${id}) - Implement your edit modal/form here.`);
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
                const activationButtonClass = proc.isActive ? 'btn-danger' : 'btn-success';
                const activationButtonIcon = proc.isActive ? 'fa-times-circle' : 'fa-check-circle';

                const row = `<tr>
                    <td>${proc._id}</td>
                    <td>${proc.name}</td>
                    <td>${orgName}</td>
                    <td>
                        <button class="btn btn-sm btn-info edit-master-btn me-2" data-id="${proc._id}" data-name="${proc.name}" data-type="process"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm ${activationButtonClass} toggle-master-status-btn" data-id="${proc._id}" data-type="process" data-status="${!proc.isActive}" title="${proc.isActive ? 'Deactivate' : 'Activate'}"><i class="fas ${activationButtonIcon}"></i></button>
                    </td>
                    </tr>`;
                processesTableBody.insertAdjacentHTML('beforeend', row);
            });
            $(processesTableBody).off('click').on('click', '.toggle-master-status-btn', async (e) => {
                const id = $(e.currentTarget).data('id');
                const type = $(e.currentTarget).data('type');
                const newStatus = $(e.currentTarget).data('status');
                toggleMasterActivation(id, type, newStatus);
            }).on('click', '.edit-master-btn', function() {
                const id = $(this).data('id');
                const name = $(this).data('name');
                alert(`Editing Process: ${name} (ID: ${id})`);
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
                const activationButtonClass = camp.isActive ? 'btn-danger' : 'btn-success';
                const activationButtonIcon = camp.isActive ? 'fa-times-circle' : 'fa-check-circle';

                const row = `<tr>
                                 <td>${camp._id}</td>
                                 <td>${camp.name}</td>
                                 <td>${orgName}</td>
                                 <td>${procName}</td>
                                 <td>
                                     <button class="btn btn-sm btn-info edit-master-btn me-2" data-id="${camp._id}" data-name="${camp.name}" data-type="campaign"><i class="fas fa-edit"></i></button>
                                     <button class="btn btn-sm ${activationButtonClass} toggle-master-status-btn" data-id="${camp._id}" data-type="campaign" data-status="${!camp.isActive}" title="${camp.isActive ? 'Deactivate' : 'Activate'}"><i class="fas ${activationButtonIcon}"></i></button>
                                 </td>
                             </tr>`;
                campaignsTableBody.insertAdjacentHTML('beforeend', row);
            });

            $(campaignsTableBody).off('click').on('click', '.toggle-master-status-btn', async (e) => {
                const id = $(e.currentTarget).data('id');
                const type = $(e.currentTarget).data('type');
                const newStatus = $(e.currentTarget).data('status');
                toggleMasterActivation(id, type, newStatus);
            }).on('click', '.edit-master-btn', function() {
                const id = $(this).data('id');
                const name = $(this).data('name');
                alert(`Editing Campaign: ${name} (ID: ${id})`);
            });
        } catch (error) {
            console.error('Failed to load campaigns:', error);
        }
    }

    function applyFiltersAndRenderTasks() {
        console.log("applyFiltersAndRenderTasks() called with filters:", currentFilters);
        let filteredTasks = [...allTasksData];

        const currentSectionId = $('.content-section:not(.d-none)').attr('id');

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
            const from = new Date(currentFilters.taskDateFrom.split('/').reverse().join('-'));
            const to = new Date(currentFilters.taskDateTo.split('/').reverse().join('-'));
            filteredTasks = filteredTasks.filter(task => {
                const taskDate = new Date(task.taskDate);
                const taskDateStartOfDay = new Date(taskDate.getFullYear(), taskDate.getMonth(), taskDate.getDate());
                const fromStartOfDay = new Date(from.getFullYear(), from.getMonth(), from.getDate());
                const toEndOfDay = new Date(to.getFullYear(), to.getMonth(), to.getDate(), 23, 59, 59, 999);
                return taskDateStartOfDay >= fromStartOfDay && taskDateStartOfDay <= toEndOfDay;
            });
        }

        if (currentFilters.organization) { filteredTasks = filteredTasks.filter(task => task.organization === currentFilters.organization); }
        if (currentFilters.process) { filteredTasks = filteredTasks.filter(task => task.process === currentFilters.process); }
        if (currentFilters.employee) { filteredTasks = filteredTasks.filter(task => task.assignedToEmployee === currentFilters.employee); }
        if (currentFilters.campaign) { filteredTasks = filteredTasks.filter(task => (task.leads && task.leads.campaign === currentFilters.campaign) || (task.prospects && task.prospects.campaign === currentFilters.campaign)); }
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

    function renderTasksTable(tableBodyElement, tasksToRender, sectionType) {
        if (!tableBodyElement) {
            console.error(`Error: Table body element for type '${sectionType}' not found.`);
            return;
        }

        tableBodyElement.innerHTML = '';

        let colspan;
        if (sectionType === 'all-tasks') {
            colspan = 19;
        } else if (sectionType === 'view-update-tasks') {
            colspan = 13;
        } else {
            colspan = 9;
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

            const leadsDateFromTo = (leadsInfo.dateFrom && leadsInfo.dateTo) ? `${new Date(leadsInfo.dateFrom).toLocaleDateString('en-GB')} - ${new Date(leadsInfo.dateTo).toLocaleDateString('en-GB')}` : 'N/A';
            const prospectsDateFromTo = (prospectsInfo.dateFrom && prospectsInfo.dateTo) ? `${new Date(prospectsInfo.dateFrom).toLocaleDateString('en-GB')} - ${new Date(prospectsInfo.dateTo).toLocaleDateString('en-GB')}` : 'N/A';

            const leadsMonthYear = leadsInfo.month || 'N/A';
            const prospectsMonthYear = prospectsInfo.month || 'N/A';

            const leadsRegion = leadsInfo.region || 'N/A';
            const prospectsRegion = prospectsInfo.region || 'N/A';

            const salesLacs = prospectsInfo.employeeSaleTarget ? (prospectsInfo.employeeSaleTarget / 100000).toFixed(2) : '0.00';
            
            const combinedRemarks = [task.generalComment, leadsInfo.comment, prospectsInfo.comment].filter(Boolean).join('; ');

            let rowHtml = '';
            if (sectionType === 'all-tasks') {
                const activationButtonClass = task.isActive ? 'btn-danger' : 'btn-success';
                const activationButtonIcon = task.isActive ? 'fas fa-times-circle' : 'fas fa-check-circle';
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
        $tableBody.off('click change');

        if (sectionType === 'all-tasks') {
            $tableBody.on('click', '.edit-task-btn', function() {
                const taskId = $(this).data('id');
                const task = allTasksData.find(t => t.id === taskId);
                if (task) {
                    populateEditTaskModal(task);
                    $('#taskEditModal').modal('show');
                }
            });
            $tableBody.on('click', '.toggle-task-status-btn', function() {
                const taskId = $(this).data('id');
                const newStatus = $(this).data('status');
                toggleTaskActivation(taskId, newStatus);
            });
        }
    }

    function populateEditTaskModal(task) {
        console.log("Populating edit modal for task:", task.id);
        $('#editTaskModalId').text(task.id);
        $('#editTaskId').val(task.id);

        $('#editTaskDate').val(task.taskDate || '');
        $('#editOrganization').val(task.organization || '').trigger('change.select2');

        $('#editOrganization').off('change.editTaskCascade');
        $('#editProcess').off('change.editTaskCampaignCascade');

        $('#editOrganization').on('change.editTaskCascade', function() {
            const orgId = $(this).val();
            const $editProcessSelect = $('#editProcess');
            const $editEmployeeSelect = $('#editEmployee');
            const $editCampaignSelects = $('#editLeadsCampaign, #editProspectsCampaign');

            $editProcessSelect.prop('disabled', true).empty().append('<option value="">Select Process</option>').val('').trigger('change.select2');
            $editEmployeeSelect.prop('disabled', true).empty().append('<option value="">Select Employee</option>').val('').trigger('change.select2');
            $campaignSelects.prop('disabled', true).empty().append('<option value="">Select Process First</option>').val('').trigger('change.select2');

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

        setTimeout(() => {
            $('#editOrganization').trigger('change.editTaskCascade');
            setTimeout(() => {
                $('#editProcess').val(task.process || '').trigger('change.select2');
                $('#editEmployee').val(task.assignedToEmployee || '').trigger('change.select2');
                $('#editProcess').trigger('change.editTaskCampaignCascade');
                setTimeout(() => {
                    $('#editLeadsCampaign').val(leads.campaign || '').trigger('change.select2');
                    $('#editProspectsCampaign').val(prospects.campaign || '').trigger('change.select2');
                }, 50);
            }, 50);
        }, 50);

        $('#editGeneralComment').val(task.generalComment || '');

        const leads = task.leads || {};
        $('#editLeadsDateFrom').val(leads.dateFrom || '');
        $('#editLeadsDateTo').val(leads.dateTo || '');
        $('#editLeadsQty').val(leads.quantity || '0');
        $('#editConvertToProspects').val(leads.convertToProspects || '0');
        $('#editLeadsComment').val(leads.comment || '');

        const currentYear = new Date().getFullYear();
        const leadsYearSelect = $('#editLeadsAssignmentYear');
        leadsYearSelect.empty();
        for (let i = currentYear - 5; i <= currentYear + 5; i++) { // Changed range to 5 years before/after current
            leadsYearSelect.append(new Option(i, i));
        }
        leadsYearSelect.val(leads.month ? leads.month.split('-')[1] : currentYear); // Set year based on stored data or currentYear


        const monthSelects = $('#editLeadsAssignmentMonth');
        monthSelects.empty();
        monthSelects.append('<option value="" selected disabled hidden>Select Month</option>');
        monthSelects.append('<option value="All">All</option>');
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        months.forEach(m => monthSelects.append(new Option(m, m)));
        if (leads.month) {
            monthSelects.val(leads.month.split('-')[0]); // Set month based on stored data
        } else {
            monthSelects.val('');
        }
        
        $('#leftBoxEditLeads, #rightBoxEditLeads').empty();
        if (leads.assignments && leads.assignments.length > 0) {
            leads.assignments.forEach(assign => {
                 const parts = assign.split('-');
                 let displayText = '';
                 if (parts[0] === 'date') {
                    displayText = `${parts[1]} - ${parts[2]}`;
                 } else if (parts[0] === 'month') {
                    displayText = `Month: ${parts[1]}-${parts[2]}`; // Corrected display
                 } else if (parts[0] === 'region') {
                    displayText = `Region: ${parts[1]}`;
                 } else if (parts[0] === 'campaign') {
                    const campaignName = campaigns.find(c => c._id === parts[1])?.name || parts[1];
                    displayText = `Campaign: ${campaignName}`;
                 }
                 if (displayText) {
                    $('#rightBoxEditLeads').append(new Option(displayText, assign));
                 }
            });
        }
        
        const prospects = task.prospects || {};
        $('#editProspectsDateFrom').val(prospects.dateFrom || '');
        $('#editProspectsDateTo').val(prospects.dateTo || '');
        $('#editProspectsQty').val(prospects.quantity || '0');
        $('#editConvertToWon').val(prospects.convertToWon || '0');
        $('#editEmployeeSaleTarget').val(prospects.employeeSaleTarget ? (prospects.employeeSaleTarget / 100000).toFixed(2) : '0.00');
        $('#editProspectsComment').val(prospects.comment || '');

        const prospectsYearSelect = $('#editProspectsAssignmentYear');
        prospectsYearSelect.empty();
        for (let i = currentYear - 5; i <= currentYear + 5; i++) { // Changed range to 5 years before/after current
            prospectsYearSelect.append(new Option(i, i));
        }
        prospectsYearSelect.val(prospects.month ? prospects.month.split('-')[1] : currentYear); // Set year based on stored data or currentYear

        const prospectsMonthSelects = $('#editProspectsAssignmentMonth');
        prospectsMonthSelects.empty();
        prospectsMonthSelects.append('<option value="" selected disabled hidden>Select Month</option>');
        prospectsMonthSelects.append('<option value="All">All</option>');
        months.forEach(m => prospectsMonthSelects.append(new Option(m, m)));
        if (prospects.month) {
            prospectsMonthSelects.val(prospects.month.split('-')[0]); // Set month based on stored data
        } else {
            prospectsMonthSelects.val('');
        }

        $('#leftBoxEditProspects, #rightBoxEditProspects').empty();
        if (prospects.assignments && prospects.assignments.length > 0) {
            prospects.assignments.forEach(assign => {
                 const parts = assign.split('-');
                 let displayText = '';
                 if (parts[0] === 'date') {
                    displayText = `${parts[1]} - ${parts[2]}`;
                 } else if (parts[0] === 'month') {
                    displayText = `${parts[1]}-${parts[2]}`; // Corrected display
                 } else if (parts[0] === 'region') {
                    displayText = `Region: ${parts[1]}`;
                 } else if (parts[0] === 'campaign') {
                    const campaignName = campaigns.find(c => c._id === parts[1])?.name || parts[1];
                    displayText = `Campaign: ${campaignName}`;
                 }
                 if (displayText) {
                    $('#rightBoxEditProspects').append(new Option(displayText, assign));
                 }
            });
        }
        
        initializeUIComponents();

        const $toggleBtn = $('#toggleTaskActivationBtn');
        if (task.isActive) {
            $toggleBtn.text('Deactivate Task').removeClass('btn-success').addClass('btn-warning');
            $toggleBtn.data('status', false);
        } else {
            $toggleBtn.text('Activate Task').removeClass('btn-warning').addClass('btn-success');
            $toggleBtn.data('status', true);
        }
        $toggleBtn.data('task-id', task.id);
    }

    function renderActiveFilters() {
        const currentSectionId = $('.content-section:not(.d-none)').attr('id');
        let activeFiltersDisplayElementId = 'activeFiltersDisplay';
        let searchInputId = 'universalTaskSearchInput';

        if (currentSectionId === 'view-update-tasks-section') {
            activeFiltersDisplayElementId = 'activeFiltersDisplayView';
        }
        const activeFiltersDisplay = document.getElementById(activeFiltersDisplayElementId);
        if (!activeFiltersDisplay) return;
        activeFiltersDisplay.innerHTML = '';

        const filterLabels = {
            searchTerm: 'Search', taskDateFrom: 'Task Date From', taskDateTo: 'Task Date To',
            organization: 'Organization', process: 'Process', employee: 'Employee', campaign: 'Campaign', status: 'Status'
        };

        for (const key in currentFilters) {
            let value = currentFilters[key];
            if (value && value !== '' && value !== 'All') {
                let displayValue = value;
                if (key === 'organization') displayValue = organizations.find(o => o._id === value)?.name || value;
                else if (key === 'process') displayValue = processes.find(p => p._id === value)?.name || value;
                else if (key === 'employee') displayValue = employees.find(e => e.id === value)?.name || value;
                else if (key === 'campaign') displayValue = campaigns.find(c => c._id === value)?.name || value;
                else if (key.includes('Date')) displayValue = new Date(value.split('/').reverse().join('-')).toLocaleDateString('en-GB');

                const pill = `
                    <span class="filter-pill badge bg-primary me-2 mb-2">
                        ${filterLabels[key] || key}: <strong>${displayValue}</strong>
                        <span class="remove-filter ms-2" data-filter-key="${key}">×</span>
                    </span>
                `;
                activeFiltersDisplay.insertAdjacentHTML('beforeend', pill);
            }
        }

        $(activeFiltersDisplay).off('click', '.remove-filter').on('click', '.remove-filter', function() {
            const keyToRemove = $(this).data('filter-key');
            currentFilters[keyToRemove] = '';

            if (keyToRemove === 'searchTerm') {
                $('#universalTaskSearchInput').val('');
            } else if (keyToRemove === 'taskDateFrom' || keyToRemove === 'taskDateTo') {
                $(`#filterTaskDateFrom`).val('');
                $(`#filterTaskDateTo`).val('');
            } else {
                $(`#${keyToRemove}`).val(null).trigger('change.select2');
            }
            applyFiltersAndRenderTasks();
        });
    }

    function setupCreateTaskCascades() {
        console.log("Setting up Daily Work Plan cascading dropdowns.");

        $('#taskProcessSelect, #taskEmployeeSelect')
            .prop('disabled', true).empty().append('<option value="">Select Organization First</option>').trigger('change.select2');

        $('#leadsQuantityCampaignMaster, #prospectsQuantityCampaignMaster')
            .prop('disabled', true).empty().append('<option value="">Select Process First</option>').trigger('change.select2');


        $('#taskOrganizationSelect').off('change.taskFilter').on('change.taskFilter', function() {
            const orgId = $(this).val();
            const $processSelect = $('#taskProcessSelect');
            const $employeeSelect = $('#taskEmployeeSelect');
            const $campaignSelects = $('#leadsQuantityCampaignMaster, #prospectsQuantityCampaignMaster');

            $processSelect.prop('disabled', true).empty().append('<option value="">Select Process</option>').val('').trigger('change.select2');
            $employeeSelect.prop('disabled', true).empty().append('<option value="">Select Employee</option>').val('').trigger('change.select2');
            $campaignSelects.prop('disabled', true).empty().append('<option value="">Select Process First</option>').val('').trigger('change.select2');

            if (orgId) {
                const filteredProcesses = processes.filter(p => p.organizationId === orgId);
                if (filteredProcesses.length > 0) {
                    filteredProcesses.forEach(proc => $processSelect.append(new Option(proc.name, proc._id)));
                    $processSelect.prop('disabled', false);
                } else {
                    $processSelect.empty().append('<option value="">No Processes Found</option>').val('').trigger('change.select2');
                }

                const filteredEmployees = employees.filter(e => e.organization === orgId && e.isActive);
                if (filteredEmployees.length > 0) {
                    filteredEmployees.forEach(emp => $employeeSelect.append(new Option(`${emp.name} (${emp.id})`, emp.id)));
                    $employeeSelect.prop('disabled', false);
                } else {
                    $employeeSelect.empty().append('<option value="">No Employees Found</option>').val('').trigger('change.select2');
                }
            }
        });

        $('#taskProcessSelect').off('change.campaignFilter').on('change.campaignFilter', function() {
            const processId = $(this).val();
            const orgId = $('#taskOrganizationSelect').val();
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

    function setupMasterCascades() {
        console.log("Setting up Master cascading dropdowns.");

        $('#processOrganizationSelect').off('change.processMaster').on('change.processMaster', function() {
            const orgId = $(this).val();
            const $processNameInput = $('#processNameInput');
            if (orgId) {
                $processNameInput.prop('disabled', false).attr('placeholder', 'Enter Process Name');
            } else {
                $processNameInput.prop('disabled', true).val('').attr('placeholder', 'Select Organization First');
            }
        }).trigger('change.processMaster');

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
        }).trigger('change.campaignMasterOrg');

        $('#campaignProcessSelect').off('change.campaignMasterProc').on('change.campaignMasterProc', function() {
            const processId = $(this).val();
            const $campaignNameInput = $('#campaignNameInput');
            if (processId) {
                $campaignNameInput.prop('disabled', false).attr('placeholder', 'Enter Campaign Name');
            } else {
                $campaignNameInput.prop('disabled', true).val('').attr('placeholder', 'Select Process First');
            }
        }).trigger('change.campaignMasterProc');
    }
    
    function renderAllocatedTasksAdmin() {
        const $tableBody = $('#allocatedTasksTableBody');
        $tableBody.empty();

        if (allocatedTasksData.length === 0) {
            // Updated colspan for new column and actions column
            $tableBody.append('<tr><td colspan="9" class="text-center">No tasks have been allocated yet.</td></tr>'); 
            return;
        }

        allocatedTasksData.forEach(task => {
            const employeeName = employees.find(e => e.id === task.assignedTo)?.name || 'N/A';
            const statusBadge = getStatusBadge(task.status);
            
            // Format task completed date
            const taskCompleteDateDisplay = task.taskCompletedDate ? new Date(task.taskCompletedDate).toLocaleDateString('en-GB') : '--'; 

            // Buttons for actions
            const toggleBtnClass = task.isActive ? 'btn-danger' : 'btn-success';
            const toggleBtnIcon = task.isActive ? 'fa-times-circle' : 'fa-check-circle';
            const toggleBtnHtml = `<button class="btn btn-sm ${toggleBtnClass} toggle-allocated-task-status-btn" data-id="${task.id}" data-status="${!task.isActive}" title="${task.isActive ? 'Deactivate' : 'Activate'}"><i class="fas ${toggleBtnIcon}"></i></button>`;
            
            const editBtnHtml = `<button class="btn btn-sm btn-primary edit-allocated-task-btn me-2" data-id="${task.id}" title="Edit Task"><i class="fas fa-edit"></i></button>`;


            const rowHtml = `
                <tr data-id="${task.id}">
                    <td>${task.id}</td>
                    <td>${employeeName}</td>
                    <td>${new Date(task.assignedDate).toLocaleDateString('en-GB')}</td>
                    <td>${taskCompleteDateDisplay}</td>
                    <td>${new Date(task.dueDate).toLocaleDateString('en-GB')}</td>
                    <td>${task.task}</td>
                    <td>${task.remark || 'No remark yet'}</td>
                    <td>${statusBadge}</td>
                    <td>
                        <div class="d-flex align-items-center"> ${editBtnHtml}
                            ${toggleBtnHtml}
                        </div>
                    </td>
                </tr>
            `;
            $tableBody.append(rowHtml);
        });

        // Event listeners for allocated task actions
        $tableBody.off('click').on('click', '.toggle-allocated-task-status-btn', function() {
            const taskId = $(this).data('id');
            const newStatus = $(this).data('status');
            toggleAllocatedTaskActivation(taskId, newStatus);
        }).on('click', '.edit-allocated-task-btn', function() {
            const taskId = $(this).data('id');
            alert(`Editing allocated task: ${taskId} (Implement edit modal/functionality here)`);
        });
    }

    // This function can be called from the browser console to simulate an employee updating a task status
    // Example: setAllocatedTaskStatus('ATID001', 'Completed', 'Task finished ahead of schedule.');
    // Example: setAllocatedTaskStatus('ATID001', 'Under process', 'Resumed work.');
    window.setAllocatedTaskStatus = async function(taskId, newStatus, remark = '') {
        const taskIndex = allocatedTasksData.findIndex(task => task.id === taskId);
        if (taskIndex === -1) {
            alert(`Task ${taskId} not found in allocated tasks.`);
            return;
        }

        allocatedTasksData[taskIndex].status = newStatus;
        allocatedTasksData[taskIndex].remark = remark;

        if (newStatus === 'Completed') {
            allocatedTasksData[taskIndex].taskCompletedDate = new Date().toISOString().split('T')[0]; // Set current date
        } else {
            allocatedTasksData[taskIndex].taskCompletedDate = null; // Clear if not completed
        }
        
        // Simulate API call for demonstration
        await makeAuthRequest('/admin/allocated_tasks', 'PUT', allocatedTasksData[taskIndex]);

        alert(`Simulated status update for Task ${taskId}: Status to "${newStatus}", Remark: "${remark || 'None'}".`);
        renderAllocatedTasksAdmin(); // Re-render the table to show changes
    };

    // Function to toggle isActive status for allocated tasks
    async function toggleAllocatedTaskActivation(taskId, newStatus) {
        const taskIndex = allocatedTasksData.findIndex(t => t.id === taskId);
        if (taskIndex === -1) {
            alert('Allocated Task not found.');
            return;
        }

        const confirmMessage = newStatus
            ? `Are you sure you want to ACTIVATE allocated task ${taskId}?`
            : `Are you sure you want to DEACTIVATE allocated task ${taskId}?`;

        if (!confirm(confirmMessage)) {
            return;
        }

        try {
            const updatedTask = { ...allocatedTasksData[taskIndex], isActive: newStatus };
            await makeAuthRequest('/admin/allocated_tasks', 'PUT', updatedTask); // Simulate API call

            allocatedTasksData[taskIndex].isActive = newStatus;

            alert(`Allocated Task ${taskId} has been ${newStatus ? 'activated' : 'deactivated'} (simulated).`);
            renderAllocatedTasksAdmin(); // Re-render the table
        } catch (error) {
            console.error(`Failed to toggle allocated task activation for ${taskId}:`, error);
            alert(`Error toggling allocated task status: ${error.message}`);
        }
    }


    function getStatusBadge(status) {
        let badgeClass = 'bg-secondary';
        switch (status) {
            case 'Pending': badgeClass = 'bg-warning text-dark'; break;
            case 'Under process': badgeClass = 'bg-info text-dark'; break; // Mapped 'Under process' to info badge
            case 'Completed': badgeClass = 'bg-success'; break;
            case 'On hold': badgeClass = 'bg-danger'; break;
            case 'Overdue': badgeClass = 'bg-danger'; break; // Added mapping for Overdue if needed
        }
        return `<span class="badge ${badgeClass}">${status}</span>`;
    }

    function showSection(sectionId, updateUrl = true) {
        console.log(`showSection called for: ${sectionId}`);
        $('.content-section').addClass('d-none');
        $(`#${sectionId}-section`).removeClass('d-none');
        $('#main-admin-navbar .nav-link').removeClass('active');
        $(`#main-admin-navbar .nav-link[data-section="${sectionId}"]`).addClass('active');

        if (updateUrl) {
            history.pushState(null, '', `#${sectionId}`);
        }
        updateAllDashboardDropdowns();

        switch (sectionId) {
            case 'manage-user':
                loadEmployees();
                $('#manageLoginForm')[0].reset();
                $('#loginEmployeeId').val('').trigger('change.select2');
                $('#username, #password, #userRole').prop('disabled', false);
                editingEmployeeLogin = null;
                break;
            case 'masters':
                setupMasterCascades();
                const activeTabButton = document.querySelector('#masterTabs button.active');
                const masterType = activeTabButton ? activeTabButton.dataset.masterPane : 'organization-master';
                switch (masterType) {
                    case 'organization-master': loadOrganizations(); break;
                    case 'process-master': loadProcesses(); break;
                    case 'employee-master': loadEmployeesMaster(); break;
                    case 'campaign-master': loadCampaigns(); break;
                }
                break;
            case 'create-task':
                setupCreateTaskCascades();
                initializeTaskAssignmentBuilders();
                $('#createTaskForm')[0].reset();
                initializeUIComponents();
                break;
            case 'all-tasks':
                currentFilters = { searchTerm: '', taskDateFrom: '', taskDateTo: '', organization: '', process: '', employee: '', campaign: '', status: '' };
                $('#universalTaskSearchInput').val('');
                $('#universalFilterForm')[0].reset();
                $('.select2-enabled-filter').val(null).trigger('change.select2');
                $('.datepicker-filter').val('');
                applyFiltersAndRenderTasks();
                break;
            case 'view-update-tasks':
                currentFilters = { searchTerm: '', taskDateFrom: '', taskDateTo: '', organization: '', process: '', employee: '', campaign: '', status: '' };
                $('#universalTaskSearchInput').val('');
                $('#universalFilterForm')[0].reset();
                $('.select2-enabled-filter').val(null).trigger('change.select2');
                $('.datepicker-filter').val('');
                applyFiltersAndRenderTasks();
                break;
            case 'task-allocation':
                populateDropdown($('#allocateEmployeeSelect'), employees, 'id', 'name', 'Select Employee', false);
                renderAllocatedTasksAdmin();
                break;
        }
    }

    $(document).ready(() => {
        console.log("DOM Content Loaded - admin_dashboard.js started.");

        initializeUIComponents();
        // The checkAuth() call is commented out to allow development without auth
        // if (!checkAuth()) {
        //     return;
        // }

        const initialHash = window.location.hash.substring(1);
        if (initialHash && document.getElementById(initialHash + '-section')) {
            showSection(initialHash, false);
        } else {
            showSection('manage-user', true);
        }

        // The logout button functionality is commented out for development
        // $('#logoutBtn').on('click', () => {
        //     localStorage.clear();
        //     window.location.href = 'login.html';
        // });

        $('#main-admin-navbar .nav-link').on('click', function(e) {
            e.preventDefault();
            const targetSection = $(this).data('section');
            if (targetSection) {
                showSection(targetSection, true);
            } else {
                console.warn("Clicked nav link has no data-section attribute:", this);
            }
        });

        $('#masterTabs button[data-bs-toggle="tab"]').on('shown.bs.tab', function(e) {
            const masterType = $(e.target).data('master-pane');
            console.log(`Master tab shown: ${masterType}`);
            switch (masterType) {
                case 'organization-master': loadOrganizations(); break;
                case 'process-master': loadProcesses(); break;
                case 'employee-master': loadEmployeesMaster(); break;
                case 'campaign-master': loadCampaigns(); break;
            }
            setupMasterCascades();
            updateAllDashboardDropdowns();
        });


        $('#orgForm').on('submit', async function(e) {
            e.preventDefault();
            const orgNameInput = $(this).find('#organizationNameInput');
            const orgName = orgNameInput.val().trim();
            if (!orgName) { alert('Organization name cannot be empty.'); return; }
            await makeAuthRequest('/admin/organizations', 'POST', { name: orgName });
            alert(`Simulating addition of Organization: ${orgName}`);
            orgNameInput.val('');
            loadOrganizations();
            updateAllDashboardDropdowns();
        });

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
            loadProcesses();
            updateAllDashboardDropdowns();
            setupMasterCascades();
        });

        $('#addEmployeeForm').on('submit', async function(e) {
            e.preventDefault();
            console.log("addEmployeeForm submitted.");

            const employeeId = $('#employeeId').val().trim();
            const employeeName = $('#employeeName').val().trim();
            const employeeDesignation = $('#employeeDesignation').val().trim();
            const employeeDepartment = $('#employeeDepartment').val().trim();
            const employeeOrganization = $('#employeeOrganizationSelect').val();

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
                isActive: true,
                username: null, password: null, role: null
            };

            try {
                await makeAuthRequest('/admin/employees_full', 'POST', newEmployee);
                alert('Employee added successfully!');
                $(this)[0].reset();
                $('#employeeOrganizationSelect').val('').trigger('change.select2');
                loadEmployeesMaster();
                loadEmployees();
                updateAllDashboardDropdowns();
            } catch (error) {
                console.error('Failed to add employee:', error);
                alert('Error adding employee: ' + error.message);
            }
        });

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
                targetEmployee = editingEmployeeLogin;
            } else {
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

            const isUsernameTaken = employees.some(e => e.username === username && e.id !== targetEmployee.id);
            if (isUsernameTaken) {
                alert('Username already exists for another user. Please choose a different username.');
                return;
            }

            const updatedLoginData = {
                id: targetEmployee.id,
                username: username,
                password: password,
                role: role
            };

            try {
                await makeAuthRequest('/admin/employees_full', 'PUT', updatedLoginData);
                alert(`Login for ${targetEmployee.name} created/updated successfully!`);
                $(this)[0].reset();
                $('#loginEmployeeId').val('').trigger('change.select2');
                loadEmployees();
                updateAllDashboardDropdowns();
                editingEmployeeLogin = null;
            } catch (error) {
                console.error('Failed to create/update login:', error);
                alert('Error creating/updating login.');
            }
        });

        $('#saveEmployeeChangesBtn').on('click', saveEmployeeLoginChanges);

        $('#employeeEditModal').on('hidden.bs.modal', function () {
            $('#manageLoginForm')[0].reset();
            $('#loginEmployeeId').val('').trigger('change.select2');
            $('#username, #password, #userRole').prop('disabled', false);
            editingEmployeeLogin = null;
            updateAllDashboardDropdowns();
        });

        $('#loginEmployeeId').on('change', function() {
            const empId = $(this).val();
            const selectedItem = employees.find(emp => emp.id === empId);

            $('#username').val('');
            $('#password').val('');
            $('#userRole').val('');
            $('#username, #password, #userRole').prop('disabled', false);

            if (selectedItem) {
                if (selectedItem.username) {
                    alert(`Employee ${selectedItem.name} already has a login: ${selectedItem.username}. Use the 'Edit' button in the list to modify their record.`);
                    $('#username').val(selectedItem.username);
                    $('#userRole').val(selectedItem.role);
                    $('#username, #password, #userRole').prop('disabled', true);
                } else {
                    $('#username').val(selectedItem.id.toLowerCase().replace('_', '.') || '');
                    $('#userRole').val('employee');
                }
            } else {
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
            loadCampaigns();
            updateAllDashboardDropdowns();
            setupMasterCascades();
        });
        
        $('#createTaskForm').on('submit', async function(e) {
            e.preventDefault();
            console.log("createTaskForm submitted.");

            const organization = $('#taskOrganizationSelect').val();
            const process = $('#taskProcessSelect').val();
            const assignedToEmployee = $('#taskEmployeeSelect').val();
            const taskDate = $('#taskDate').val();
            const generalComment = $('#generalComment').val() || '';

            if (!organization || !process || !assignedToEmployee || !taskDate) {
                alert('Please fill all required fields: Organization, Process, Employee, and Task Date.');
                return;
            }

            const leadsAssignments = getSelectionsFromListbox('rightBoxLeads');
            const leadsQty = parseFloat($('#leadsQty').val() || 0);
            const convertToProspects = parseFloat($('#convertToProspects').val() || 0);
            const leadsComment = $('#leadsComment').val() || '';

            const hasLeadsData = leadsAssignments.length > 0 || leadsQty > 0 || convertToProspects > 0 || leadsComment !== '';

            let leadsData = null;
            if (hasLeadsData) {
                let month = null, region = null, campaign = null, dateFrom = null, dateTo = null;

                leadsAssignments.forEach(assign => {
                    const parts = assign.split('-');
                    if (parts[0] === 'month') {
                        month = `${parts[1]}-${parts[2]}`;
                    } else if (parts[0] === 'region') {
                        region = parts[1];
                    } else if (parts[0] === 'campaign') {
                        campaign = parts[1];
                    } else if (parts[0] === 'date') {
                        dateFrom = parts[1];
                        dateTo = parts[2];
                    }
                });
                
                leadsData = {
                    dateFrom: dateFrom,
                    dateTo: dateTo,
                    month: month,
                    region: region,
                    campaign: campaign,
                    assignments: leadsAssignments,
                    quantity: leadsQty,
                    convertToProspects: convertToProspects,
                    comment: leadsComment
                };
            }

            const prospectsAssignments = getSelectionsFromListbox('rightBoxProspects');
            const prospectsQty = parseFloat($('#prospectsQty').val() || 0);
            const convertToWon = parseFloat($('#convertToWon').val() || 0);
            const employeeSaleTarget = parseFloat($('#employeeSaleTarget').val() || 0) * 100000;
            const prospectsComment = $('#prospectsComment').val() || '';

            const hasProspectsData = prospectsAssignments.length > 0 || prospectsQty > 0 || convertToWon > 0 || employeeSaleTarget > 0 || prospectsComment !== '';

            let prospectsData = null;
            if (hasProspectsData) {
                let month = null, region = null, campaign = null, dateFrom = null, dateTo = null;

                prospectsAssignments.forEach(assign => {
                    const parts = assign.split('-');
                    if (parts[0] === 'month') {
                        month = `${parts[1]}-${parts[2]}`;
                    } else if (parts[0] === 'region') {
                        region = parts[1];
                    } else if (parts[0] === 'campaign') {
                        campaign = parts[1];
                    } else if (parts[0] === 'date') {
                        dateFrom = parts[1];
                        dateTo = parts[2];
                    }
                });

                prospectsData = {
                    dateFrom: dateFrom,
                    dateTo: dateTo,
                    month: month,
                    region: region,
                    campaign: campaign,
                    assignments: prospectsAssignments,
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
                status: 'Pending',
                generalComment: generalComment,
                leads: leadsData,
                prospects: prospectsData,
                isActive: true
            };

            try {
                await makeAuthRequest('/admin/tasks', 'POST', taskFinalData);
                alert('Task Created Successfully (Simulated)!');
                $(this)[0].reset();
                $('.select2-enabled').val(null).trigger('change.select2');
                $('#leftBoxLeads, #rightBoxLeads, #leftBoxProspects, #rightBoxProspects').empty();
                setupCreateTaskCascades();
                initializeTaskAssignmentBuilders();
                applyFiltersAndRenderTasks();
            } catch (error) {
                console.error('Failed to create task:', error);
                alert('Error creating task: ' + error.message);
            }
        });

        $('#saveTaskChangesBtn').on('click', async function() {
            const taskId = $('#editTaskId').val();
            const taskIndex = allTasksData.findIndex(t => t.id === taskId);
            if (taskIndex === -1) { alert('Task not found for updating.'); return; }

            const updatedOrganization = $('#editOrganization').val();
            const updatedProcess = $('#editProcess').val();
            const updatedAssignedToEmployee = $('#editEmployee').val();
            const updatedTaskDate = $('#editTaskDate').val();
            const updatedGeneralComment = $('#editGeneralComment').val() || '';

            if (!updatedOrganization || !updatedProcess || !updatedAssignedToEmployee || !updatedTaskDate) {
                alert('Please fill all required fields: Organization, Process, Employee, and Task Date.');
                return;
            }
            
            const updatedLeadsAssignments = getSelectionsFromListbox('rightBoxEditLeads');
            const updatedLeadsQty = parseFloat($('#editLeadsQty').val() || 0);
            const updatedConvertToProspects = parseFloat($('#editConvertToProspects').val() || 0);
            const updatedLeadsComment = $('#editLeadsComment').val() || '';
            
            const hasUpdatedLeadsData = updatedLeadsAssignments.length > 0 || updatedLeadsQty > 0 || updatedConvertToProspects > 0 || updatedLeadsComment !== '';

            let updatedLeadsData = null;
            if (hasUpdatedLeadsData) {
                let month = null, region = null, campaign = null, dateFrom = null, dateTo = null;
                updatedLeadsAssignments.forEach(assign => {
                    const parts = assign.split('-');
                    if (parts[0] === 'month') {
                        month = `${parts[1]}-${parts[2]}`;
                    } else if (parts[0] === 'region') {
                        region = parts[1];
                    } else if (parts[0] === 'campaign') {
                        campaign = parts[1];
                    } else if (parts[0] === 'date') {
                        dateFrom = parts[1];
                        dateTo = parts[2];
                    }
                });
                
                updatedLeadsData = {
                    dateFrom: dateFrom,
                    dateTo: dateTo,
                    month: month,
                    region: region,
                    campaign: campaign,
                    assignments: updatedLeadsAssignments,
                    quantity: updatedLeadsQty,
                    convertToProspects: updatedConvertToProspects,
                    comment: updatedLeadsComment
                };
            }

            const updatedProspectsAssignments = getSelectionsFromListbox('rightBoxEditProspects');
            const updatedProspectsQty = parseFloat($('#editProspectsQty').val() || 0);
            const updatedConvertToWon = parseFloat($('#editConvertToWon').val() || 0);
            const updatedEmployeeSaleTarget = parseFloat($('#editEmployeeSaleTarget').val() || 0) * 100000;
            const updatedProspectsComment = $('#editProspectsComment').val() || '';
            
            const hasUpdatedProspectsData = updatedProspectsAssignments.length > 0 || updatedProspectsQty > 0 || updatedConvertToWon > 0 || updatedEmployeeSaleTarget > 0 || updatedProspectsComment !== '';

            let updatedProspectsData = null;
            if (hasUpdatedProspectsData) {
                let month = null, region = null, campaign = null, dateFrom = null, dateTo = null;
                updatedProspectsAssignments.forEach(assign => {
                    const parts = assign.split('-');
                    if (parts[0] === 'month') {
                        month = `${parts[1]}-${parts[2]}`;
                    } else if (parts[0] === 'region') {
                        region = parts[1];
                    } else if (parts[0] === 'campaign') {
                        campaign = parts[1];
                    } else if (parts[0] === 'date') {
                        dateFrom = parts[1];
                        dateTo = parts[2];
                    }
                });

                updatedProspectsData = {
                    dateFrom: dateFrom,
                    dateTo: dateTo,
                    month: month,
                    region: region,
                    campaign: campaign,
                    assignments: updatedProspectsAssignments,
                    quantity: updatedProspectsQty,
                    convertToWon: updatedConvertToWon,
                    employeeSaleTarget: updatedEmployeeSaleTarget,
                    comment: prospectsComment
                };
            }

            if (!hasUpdatedLeadsData && !hasUpdatedProspectsData) {
                alert('A task must have at least one Lead or Prospect assignment/quantity to be saved.');
                return;
            }

            const taskUpdatePayload = {
                id: taskId,
                organization: updatedOrganization,
                process: updatedProcess,
                assignedToEmployee: updatedAssignedToEmployee,
                taskDate: updatedTaskDate,
                generalComment: updatedGeneralComment,
                leads: updatedLeadsData,
                prospects: prospectsData,
                isActive: allTasksData[taskIndex].isActive
            };

            try {
                await makeAuthRequest('/admin/tasks', 'PUT', taskUpdatePayload);
                alert(`Task ${taskId} changes saved successfully (simulated)!`);
                $('#taskEditModal').modal('hide');
                applyFiltersAndRenderTasks();
            } catch (error) {
                console.error('Failed to save task changes:', error);
                alert('Error saving task changes: ' + error.message);
            }
        });

        $('#toggleTaskActivationBtn').on('click', function() {
            const taskId = $(this).data('task-id');
            const newStatus = $(this).data('status');
            toggleTaskActivation(taskId, newStatus);
        });

        $('#universalTaskSearchInput').on('input', function() {
            currentFilters.searchTerm = $(this).val();
            applyFiltersAndRenderTasks();
        });
        
        $('#clearUniversalSearchBtn').on('click', function() {
            $('#universalTaskSearchInput').val('');
            currentFilters.searchTerm = '';
            applyFiltersAndRenderTasks();
        });

        $('#universalFilterForm').on('submit', function(e) {
            e.preventDefault();
            console.log("Universal Filter Form submitted.");
            currentFilters.taskDateFrom = $('#filterTaskDateFrom').val();
            currentFilters.taskDateTo = $('#filterTaskDateTo').val();
            currentFilters.organization = $('#filterOrganization').val();
            currentFilters.process = $('#filterProcess').val();
            currentFilters.employee = $('#filterEmployee').val();
            currentFilters.campaign = $('#filterCampaign').val();
            currentFilters.status = $('#filterStatus').val(); 
            
            applyFiltersAndRenderTasks();
            const offcanvasElement = document.getElementById('filterOffcanvas');
            const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
            if (bsOffcanvas) {
                bsOffcanvas.hide();
            } else {
                new bootstrap.Offcanvas(offcanvasElement).hide();
            }
        });

        $('#clearAllMainFiltersBtn').on('click', function() {
            currentFilters = { searchTerm: '', taskDateFrom: '', taskDateTo: '', organization: '', process: '', employee: '', campaign: '', status: '' };
            $('#universalTaskSearchInput').val('');
            $('#universalFilterForm')[0].reset();
            $('.select2-enabled-filter').val(null).trigger('change.select2');
            $('.datepicker-filter').val('');
            applyFiltersAndRenderTasks();
        });

        $('#clearAllViewFiltersBtn').on('click', function() {
            currentFilters = { searchTerm: '', taskDateFrom: '', taskDateTo: '', organization: '', process: '', employee: '', campaign: '', status: '' };
            $('#universalTaskSearchInput').val('');
            $('#universalFilterForm')[0].reset();
            $('.select2-enabled-filter').val(null).trigger('change.select2');
            $('.datepicker-filter').val('');
            applyFiltersAndRenderTasks();
        });

        $('#create-task-section').on('click', '#leadsAddDateRangeBtn', function() {
            addAssignment('dateRange', 'leads');
        });
        $('#create-task-section').on('click', '#leadsAddMonthYearBtn', function() {
            addAssignment('monthYear', 'leads');
        });
        $('#create-task-section').on('click', '#leadsAddRegionBtn', function() {
            addAssignment('region', 'leads');
        });
        $('#create-task-section').on('click', '#leadsAddCampaignBtn', function() {
            addAssignment('campaign', 'leads');
        });

        $('#create-task-section').on('click', '#prospectsAddDateRangeBtn', function() {
            addAssignment('dateRange', 'prospects');
        });
        $('#create-task-section').on('click', '#prospectsAddMonthYearBtn', function() {
            addAssignment('monthYear', 'prospects');
        });
        $('#create-task-section').on('click', '#prospectsAddRegionBtn', function() {
            addAssignment('region', 'prospects');
        });
        $('#create-task-section').on('click', '#prospectsAddCampaignBtn', function() {
            addAssignment('campaign', 'prospects');
        });

        $('#leadsMoveRightBtn').on('click', () => moveOptions('leftBoxLeads', 'rightBoxLeads'));
        $('#leadsMoveLeftBtn').on('click', () => moveOptions('rightBoxLeads', 'leftBoxLeads'));

        $('#prospectsMoveRightBtn').on('click', () => moveOptions('leftBoxProspects', 'rightBoxProspects'));
        $('#prospectsMoveLeftBtn').on('click', () => moveOptions('rightBoxProspects', 'leftBoxProspects'));

        $('#taskEditModal').on('click', '#editLeadsAddDateRangeBtn', function() {
            addAssignment('dateRange', 'editLeads');
        });
        $('#taskEditModal').on('click', '#editLeadsAddMonthYearBtn', function() {
            addAssignment('monthYear', 'editLeads');
        });
        $('#taskEditModal').on('click', '#editLeadsAddRegionBtn', function() {
            addAssignment('region', 'editLeads');
        });
        $('#taskEditModal').on('click', '#editLeadsAddCampaignBtn', function() {
            addAssignment('campaign', 'editLeads');
        });

        $('#editProspectsMoveRightBtn').on('click', () => moveOptions('leftBoxEditProspects', 'rightBoxEditProspects'));
        $('#editProspectsMoveLeftBtn').on('click', () => moveOptions('rightBoxEditProspects', 'leftBoxEditProspects'));

        $('#taskEditModal').on('click', '#editProspectsAddDateRangeBtn', function() {
            addAssignment('dateRange', 'editProspects');
        });
        $('#taskEditModal').on('click', '#editProspectsAddMonthYearBtn', function() {
            addAssignment('monthYear', 'editProspects');
        });
        $('#taskEditModal').on('click', '#editProspectsAddRegionBtn', function() {
            addAssignment('region', 'editProspects');
        });
        $('#taskEditModal').on('click', '#editProspectsAddCampaignBtn', function() {
            addAssignment('campaign', 'editProspects');
        });
        
        $('#allocateTaskForm').on('submit', function(e) {
            e.preventDefault();
            const employeeId = $('#allocateEmployeeSelect').val();
            const dueDate = $('#allocateDueDate').val();
            const taskDescription = $('#allocateTaskDescription').val();

            if (!employeeId || !dueDate || !taskDescription) {
                alert('Please fill out all fields to allocate the task.');
                return;
            }

            const newTaskId = 'ATID' + String(allocatedTasksData.length + 1).padStart(3, '0');
            const newTask = {
                id: newTaskId,
                assignedTo: employeeId,
                assignedDate: new Date().toISOString().split('T')[0],
                taskCompletedDate: null, // Initialize as null
                dueDate: dueDate,
                task: taskDescription,
                remark: '',
                status: 'Pending',
                isActive: true // New allocated tasks are active by default
            };

            allocatedTasksData.push(newTask);
            alert(`Task ${newTaskId} allocated successfully!`);
            
            renderAllocatedTasksAdmin();
            this.reset();
            $('#allocateEmployeeSelect').val(null).trigger('change.select2');
        });

        console.log("admin_dashboard.js initialization complete.");
    });
})(jQuery);