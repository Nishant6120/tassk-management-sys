(function($) {
    "use strict";

    // Mock data for the employee dashboard
    const mockData = {
        organizations: [
            { _id: 'ORG001', name: 'Legrand' },
            { _id: 'ORG002', name: 'Accutech' },
            { _id: 'ORG003', name: 'Global Corp' }
        ],
        processes: [
            { _id: 'PROC001', name: 'Legrand_CRM', organizationId: 'ORG001' },
            { _id: 'PROC002', name: 'Numeric_AMC', organizationId: 'ORG002' },
            { _id: 'PROC003', name: 'Numeric_Product', organizationId: 'ORG002' }
        ],
        campaigns: [
            { _id: 'CAMP001', name: 'Bulk order' },
            { _id: 'CAMP002', name: 'Home Automation' },
            { _id: 'CAMP003', name: 'Legrand_eShop' }
        ],
        tasks: [
            {
                id: 'TID001', taskDate: '2025-07-17', organization: 'ORG001', process: 'PROC001', assignedToEmployee: 'emp_001', status: 'Pending', generalComment: 'Initial task for Q3 sales.', isActive: true,
                leads: { dateFrom: '2025-07-01', dateTo: '2025-07-05', month: 'July', year: '2025', region: 'North', campaign: 'CAMP001', quantity: 100, convertToProspects: 10, comment: 'Initial lead engagement' },
                prospects: null, activeLeadsToProspects: 5, activeConvertToWon: 0, activeSales: 0
            },
            {
                id: 'TID002', taskDate: '2025-07-16', organization: 'ORG002', process: 'PROC002', assignedToEmployee: 'emp_002', status: 'In Progress', generalComment: 'Follow up on product inquiries.', isActive: true,
                leads: null,
                prospects: { dateFrom: '2025-07-06', dateTo: '2025-07-10', month: 'July', year: '2025', region: 'East', campaign: 'CAMP003', quantity: 10, convertToWon: 2, employeeSaleTarget: 250000, comment: 'Client signed up.' },
                activeLeadsToProspects: 0, activeConvertToWon: 1, activeSales: 125000
            },
            {
                id: 'TID003', taskDate: '2025-07-18', organization: 'ORG001', process: 'PROC001', assignedToEmployee: 'emp_003', status: 'Completed', generalComment: 'CRM system update analysis.', isActive: false,
                leads: { dateFrom: '2025-06-15', dateTo: '2025-06-20', month: 'June', year: '2025', region: 'South', campaign: 'CAMP002', quantity: 50, convertToProspects: 5, comment: 'Reviewed current CRM usage.' },
                prospects: null, activeLeadsToProspects: 5, activeConvertToWon: 0, activeSales: 0
            },
            {
                id: 'TID004', taskDate: '2025-07-15', organization: 'ORG002', process: 'PROC003', assignedToEmployee: 'emp_004', status: 'Overdue', generalComment: 'Launch new product line campaign.', isActive: true,
                leads: null,
                prospects: { dateFrom: '2025-07-01', dateTo: '2025-07-07', month: 'July', year: '2025', region: 'West', campaign: 'CAMP003', quantity: 15, convertToWon: 3, employeeSaleTarget: 300000, comment: 'Awaiting final creative assets.' },
                activeLeadsToProspects: 0, activeConvertToWon: 1, activeSales: 100000
            },
            {
                id: 'TID005', taskDate: '2025-07-19', organization: 'ORG001', process: 'PROC001', assignedToEmployee: 'emp_001', status: 'Pending', generalComment: 'Follow up on key accounts in North region.', isActive: true,
                leads: { dateFrom: '2025-07-10', dateTo: '2025-07-15', month: 'July', year: '2025', region: 'North', campaign: 'CAMP001', quantity: 75, convertToProspects: 8, comment: 'Initial contact made with 5 accounts.' },
                prospects: null, activeLeadsToProspects: 2, activeConvertToWon: 0, activeSales: 0
            },
            {
                id: 'TID006', taskDate: '2025-07-20', organization: 'ORG002', process: 'PROC002', assignedToEmployee: 'emp_002', status: 'In Progress', generalComment: 'Analyze market trends for Q3.', isActive: true,
                leads: null,
                prospects: { dateFrom: '2025-07-15', dateTo: '2025-07-20', month: 'July', year: '2025', region: 'East', campaign: 'CAMP003', quantity: 8, convertToWon: 1, employeeSaleTarget: 150000, comment: 'Gathering data, preliminary findings positive.' },
                activeLeadsToProspects: 0, activeConvertToWon: 0, activeSales: 0
            }
        ],
        // New allocated tasks mock data (for this specific employee)
        allocatedTasks: [
            { id: 'ATID001', assignedTo: 'emp_001', assignedDate: '2025-07-25', dueDate: '2025-07-30', task: 'Prepare weekly sales report.', remark: 'Started working on it.', status: 'In process' },
            { id: 'ATID002', assignedTo: 'emp_001', assignedDate: '2025-07-25', dueDate: '2025-07-28', task: 'Follow up with client X.', remark: '', status: 'Pending' }
        ]
    };

    let allTasks = [];
    const loggedInEmployeeId = 'emp_001'; // Static for demonstration purposes
    let allocatedTasks = mockData.allocatedTasks.filter(task => task.assignedTo === loggedInEmployeeId);

    // Function to check for user authentication
    function checkAuth() { 
        // In a real application, this would verify a token or session
        // For now, we assume the user is logged in.
        return true; 
    }
    
    // Function to handle fetching and processing data on load
    function loadData() {
        const { tasks, organizations, processes, campaigns } = mockData;
        const employeeTasks = tasks.filter(task =>
            task.assignedToEmployee === loggedInEmployeeId && task.isActive === true
        );
        allTasks = employeeTasks.map(task => ({
            ...task,
            organizationName: organizations.find(o => o._id === task.organization)?.name || 'N/A',
            processName: processes.find(p => p._id === task.process)?.name || 'N/A',
            leads: task.leads ? { ...task.leads, campaignName: campaigns.find(c => c._id === task.leads.campaign)?.name || 'N/A' } : null,
            prospects: task.prospects ? { ...task.prospects, campaignName: campaigns.find(c => c._id === task.prospects.campaign)?.name || 'N/A' } : null,
        }));
        displayTasks();
        loadPerformanceSummary();
        renderAllocatedTasks();
    }

    // Renders the 'My Tasks' table
    function displayTasks() {
        const $tableBody = $('#employeeTasksTableBody');
        $tableBody.empty();

        if (allTasks.length === 0) {
            $tableBody.append('<tr><td colspan="21" class="text-center">No active tasks assigned to you.</td></tr>');
            return;
        }

        allTasks.forEach(task => {
            const leads = task.leads || {};
            const prospects = task.prospects || {};
            const combinedComment = [task.generalComment, leads.comment, prospects.comment].filter(Boolean).join('; ');
            
            const rowHtml = `
                <tr data-task-id="${task.id}">
                    <td>${new Date(task.taskDate).toLocaleDateString('en-GB')}</td>
                    <td>${task.organizationName}</td>
                    <td>${task.processName}</td>
                    <td>${leads.dateFrom ? `${new Date(leads.dateFrom).toLocaleDateString('en-GB')} - ${new Date(leads.dateTo).toLocaleDateString('en-GB')}` : 'N/A'}</td>
                    <td>${leads.month ? `${leads.month}-${leads.year}` : 'N/A'}</td>
                    <td>${leads.region || 'N/A'}</td>
                    <td>${leads.campaignName || 'N/A'}</td>
                    <td>${leads.quantity || 0}</td>
                    <td>${leads.convertToProspects || 0}</td>
                    <td><input type="number" class="form-control form-control-sm" id="active-prospects-${task.id}" value="${task.activeLeadsToProspects || ''}" placeholder="0"></td>
                    <td>${prospects.dateFrom ? `${new Date(prospects.dateFrom).toLocaleDateString('en-GB')} - ${new Date(prospects.dateTo).toLocaleDateString('en-GB')}` : 'N/A'}</td>
                    <td>${prospects.month ? `${prospects.month}-${prospects.year}` : 'N/A'}</td>
                    <td>${prospects.region || 'N/A'}</td>
                    <td>${prospects.campaignName || 'N/A'}</td>
                    <td>${prospects.quantity || 0}</td>
                    <td>${prospects.convertToWon || 0}</td>
                    <td><input type="number" class="form-control form-control-sm" id="active-won-${task.id}" value="${task.activeConvertToWon || ''}" placeholder="0"></td>
                    <td>${prospects.employeeSaleTarget ? (prospects.employeeSaleTarget / 100000).toFixed(2) : '0.00'}</td>
                    <td><input type="number" step="0.01" class="form-control form-control-sm" id="active-sales-${task.id}" value="${task.activeSales ? (task.activeSales / 100000).toFixed(2) : ''}" placeholder="0.00"></td>
                    <td><textarea class="form-control form-control-sm" id="remarks-${task.id}">${combinedComment}</textarea></td>
                    <td><button class="btn btn-success btn-sm update-task-btn" data-task-id="${task.id}">Update</button></td>
                </tr>
            `;
            $tableBody.append(rowHtml);
        });
    }

    // New: Renders the 'Task Allocated' table
    function renderAllocatedTasks() {
        const $tableBody = $('#allocatedTasksTableBody');
        $tableBody.empty();

        if (allocatedTasks.length === 0) {
            $tableBody.append('<tr><td colspan="7" class="text-center">No tasks have been allocated to you.</td></tr>');
            return;
        }

        allocatedTasks.forEach(task => {
            const statusBadge = getStatusBadge(task.status);
            const rowHtml = `
                <tr data-allocated-task-id="${task.id}">
                    <td>${task.id}</td>
                    <td>${new Date(task.assignedDate).toLocaleDateString('en-GB')}</td>
                    <td>${new Date(task.dueDate).toLocaleDateString('en-GB')}</td>
                    <td>${task.task}</td>
                    <td>${task.remark || 'No remark yet'}</td>
                    <td>${statusBadge}</td>
                    <td><button class="btn btn-primary btn-sm edit-allocated-task-btn" data-id="${task.id}">Edit</button></td>
                </tr>
            `;
            $tableBody.append(rowHtml);
        });
        
        // Attach event listener for the edit button
        $tableBody.off('click', '.edit-allocated-task-btn').on('click', '.edit-allocated-task-btn', function() {
            const taskId = $(this).data('id');
            const taskToEdit = allocatedTasks.find(t => t.id === taskId);
            if (taskToEdit) {
                // Populate the modal with task data
                $('#editAllocatedTaskId').text(taskToEdit.id);
                $('#modalTaskId').val(taskToEdit.id);
                $('#modalTaskDescription').val(taskToEdit.task);
                $('#modalEmpRemark').val(taskToEdit.remark);
                $('#modalStatus').val(taskToEdit.status);
                // Show the modal
                $('#editAllocatedTaskModal').modal('show');
            }
        });
    }
    
    // New: Helper to get a Bootstrap badge for status
    function getStatusBadge(status) {
        let badgeClass = 'bg-secondary';
        switch (status) {
            case 'Pending': badgeClass = 'bg-warning text-dark'; break;
            case 'In process': badgeClass = 'bg-info text-dark'; break;
            case 'Completed': badgeClass = 'bg-success'; break;
            case 'On hold': badgeClass = 'bg-danger'; break;
        }
        return `<span class="badge ${badgeClass}">${status}</span>`;
    }

    // Updates progress for a task in the 'My Tasks' section
    function updateTaskProgress(taskId) {
        const taskIndex = allTasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) {
            alert('Error: Task could not be found.');
            return;
        }
        const activeProspects = parseInt($(`#active-prospects-${taskId}`).val() || 0);
        const activeWon = parseInt($(`#active-won-${taskId}`).val() || 0);
        const activeSales = parseFloat($(`#active-sales-${taskId}`).val() || 0) * 100000;
        const newRemark = $(`#remarks-${taskId}`).val();

        allTasks[taskIndex].activeLeadsToProspects = activeProspects;
        allTasks[taskIndex].activeConvertToWon = activeWon;
        allTasks[taskIndex].activeSales = activeSales;
        allTasks[taskIndex].generalComment = newRemark;

        alert(`Progress and remarks for Task ${taskId} have been updated!`);
        loadPerformanceSummary();
        $(`tr[data-task-id="${taskId}"]`).css('background-color', '#d4edda').animate({ backgroundColor: '' }, 1500);
    }
    
    // New: Function to update an allocated task
    function updateAllocatedTask(taskId, remark, status) {
        const taskIndex = allocatedTasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) {
            alert('Error: Allocated task could not be found.');
            return;
        }
        
        allocatedTasks[taskIndex].remark = remark;
        allocatedTasks[taskIndex].status = status;
        
        alert(`Allocated task ${taskId} updated successfully!`);
        
        renderAllocatedTasks();
        $('#editAllocatedTaskModal').modal('hide');
    }

    // Calculates and displays the performance summary
    function loadPerformanceSummary() {
        const summary = allTasks.reduce((acc, task) => {
            if (task.prospects && task.prospects.employeeSaleTarget) {
                acc.totalTarget += task.prospects.employeeSaleTarget;
            }
            if (task.activeSales) {
                acc.totalSales += task.activeSales;
            }
            return acc;
        }, { totalTarget: 0, totalSales: 0 });
        $('#cumulativeTarget').text(`${(summary.totalTarget / 100000).toFixed(2)} Lacs`);
        $('#cumulativeSales').text(`${(summary.totalSales / 100000).toFixed(2)} Lacs`);
    }

    // Function to switch between dashboard sections and handle URL hash
    function showSection(sectionId, updateUrl = true) {
        $('.content-section').addClass('d-none');
        $(`#${sectionId}-section`).removeClass('d-none');
        $('#main-admin-navbar .nav-link').removeClass('active');
        $(`#main-admin-navbar .nav-link[data-section="${sectionId}"]`).addClass('active');

        if (updateUrl) {
            history.pushState(null, '', `#${sectionId}`);
        }

        // Section-specific loading
        if (sectionId === 'my-tasks') {
            displayTasks();
            loadPerformanceSummary();
        } else if (sectionId === 'performance') {
            loadPerformanceSummary();
        } else if (sectionId === 'task-allocated') {
            renderAllocatedTasks();
        }
    }
    
    // Main initialization block
    $(document).ready(() => {
        if (!checkAuth()) return;
        
        // Welcome message logic
        const employeeName = "Kirti Agrawal"; // Hardcoded for demo
        $('#welcomeMessage').text(`Welcome, ${employeeName}!`);

        // Event listener for main navigation links
        $('#main-admin-navbar .nav-link').on('click', function(e) {
            e.preventDefault();
            const targetSection = $(this).data('section');
            showSection(targetSection, true);
        });

        // Event listener for the update button in the 'My Tasks' section
        $('#employeeTasksTableBody').on('click', '.update-task-btn', function() {
            const taskId = $(this).data('task-id');
            updateTaskProgress(taskId);
        });
        
        // Event handler for the modal form submission
        $('#updateAllocatedTaskForm').on('submit', function(e) {
            e.preventDefault();
            const taskId = $('#modalTaskId').val();
            const remark = $('#modalEmpRemark').val();
            const status = $('#modalStatus').val();
            updateAllocatedTask(taskId, remark, status);
        });

        $('#logoutBtn').on('click', () => {
             localStorage.clear();
             window.location.href = 'login.html';
        });

        // Initial load based on URL hash or default to 'my-tasks'
        const initialHash = window.location.hash.substring(1);
        if (initialHash && $(`#${initialHash}-section`).length) {
            showSection(initialHash, false);
        } else {
            showSection('my-tasks', true);
        }

        loadData();
    });

})(jQuery);