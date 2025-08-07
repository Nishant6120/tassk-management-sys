(function($) {
    "use strict";

    // --- MOCK DATA ---
    const mockData = {
        organizations: [{ _id: 'ORG001', name: 'Legrand', isActive: true }, { _id: 'ORG002', name: 'Accutech', isActive: true }, { _id: 'ORG003', name: 'Global Corp', isActive: false }],
        processes: [{ _id: 'PROC001', name: 'Legrand_CRM', organizationId: 'ORG001', isActive: true }, { _id: 'PROC002', name: 'Numeric_AMC', organizationId: 'ORG002', isActive: true }, { _id: 'PROC003', name: 'Numeric_Product', organizationId: 'ORG002', isActive: false }],
        campaigns: [{ _id: 'CAMP001', name: 'Bulk order', organizationId: 'ORG001', processId: 'PROC001', isActive: true }, { _id: 'CAMP002', name: 'Home Automation', organizationId: 'ORG001', processId: 'PROC001', isActive: true }, { _id: 'CAMP003', name: 'Legrand_eShop', organizationId: 'ORG002', processId: 'PROC002', isActive: false }],
        tasks: [{ id: 'TID001', taskDate: '2025-07-17', organization: 'ORG001', process: 'PROC001', assignedToEmployee: 'emp_001', status: 'Pending', generalComment: 'Initial task for Q3 sales.', isActive: true, leads: { dateFrom: '2025-07-01', dateTo: '2025-07-05', month: 'Jul-2025', year: '2025', region: 'North', campaign: 'CAMP001', quantity: 100, convertToProspects: 10, comment: 'Initial lead engagement', assignments: ['date-2025-07-01-2025-07-05', 'month-Jul-2025', 'region-North', 'campaign-CAMP001'] }, prospects: null, activeLeadsToProspects: 5, activeConvertToWon: 0, activeSales: 0 }, { id: 'TID002', taskDate: '2025-07-16', organization: 'ORG002', process: 'PROC002', assignedToEmployee: 'emp_002', status: 'In Progress', generalComment: 'Follow up on product inquiries.', isActive: true, leads: null, prospects: { dateFrom: '2025-07-06', dateTo: '2025-07-10', month: 'Jul-2025', year: '2025', region: 'East', campaign: 'CAMP003', quantity: 10, convertToWon: 2, employeeSaleTarget: 250000, comment: 'Client signed up.', assignments: ['date-2025-07-06-2025-07-10', 'month-Jul-2025', 'region-East', 'campaign-CAMP003'] }, activeLeadsToProspects: 0, activeConvertToWon: 1, activeSales: 125000 }, { id: 'TID003', taskDate: '2025-06-18', organization: 'ORG001', process: 'PROC001', assignedToEmployee: 'emp_001', status: 'Completed', generalComment: 'CRM system update analysis.', isActive: false, leads: { dateFrom: '2025-06-15', dateTo: '2025-06-20', month: 'Jun-2025', year: '2025', region: 'South', campaign: 'CAMP002', quantity: 50, convertToProspects: 5, comment: 'Reviewed current CRM usage.', assignments: ['date-2025-06-15-2025-06-20', 'month-Jun-2025', 'region-South', 'campaign-CAMP002'] }, prospects: null, activeLeadsToProspects: 5, activeConvertToWon: 0, activeSales: 0 }, { id: 'TID004', taskDate: '2025-07-15', organization: 'ORG002', process: 'PROC003', assignedToEmployee: 'emp_004', status: 'Overdue', generalComment: 'Launch new product line campaign.', isActive: true, leads: null, prospects: { dateFrom: '2025-07-01', dateTo: '2025-07-07', month: 'Jul-2025', year: '2025', region: 'West', campaign: 'CAMP003', quantity: 15, convertToWon: 3, employeeSaleTarget: 300000, comment: 'Awaiting final creative assets.', assignments: ['date-2025-07-01-2025-07-07', 'month-Jul-2025', 'region-West', 'campaign-CAMP003'] }, activeLeadsToProspects: 0, activeConvertToWon: 1, activeSales: 100000 }, { id: 'TID005', taskDate: '2025-07-19', organization: 'ORG001', process: 'PROC001', assignedToEmployee: 'emp_001', status: 'Pending', generalComment: 'Follow up on key accounts in North region.', isActive: true, leads: { dateFrom: '2025-07-10', dateTo: '2025-07-15', month: 'Jul-2025', year: '2025', region: 'North', campaign: 'CAMP001', quantity: 75, convertToProspects: 8, comment: 'Initial contact made with 5 accounts.', assignments: ['date-2025-07-10-2025-07-15', 'month-Jul-2025', 'region-North', 'campaign-CAMP001'] }, prospects: null, activeLeadsToProspects: 2, activeConvertToWon: 0, activeSales: 0 }, { id: 'TID006', taskDate: '2025-07-20', organization: 'ORG002', process: 'PROC002', assignedToEmployee: 'emp_002', status: 'In Progress', generalComment: 'Analyze market trends for Q3.', isActive: true, leads: null, prospects: { dateFrom: '2025-07-15', dateTo: '2025-07-20', month: 'Jul-2025', year: '2025', region: 'East', campaign: 'CAMP003', quantity: 8, convertToWon: 1, employeeSaleTarget: 150000, comment: 'Gathering data, preliminary findings positive.', assignments: ['date-2025-07-15-2025-07-20', 'month-Jul-2025', 'region-East', 'campaign-CAMP003'] }, activeLeadsToProspects: 0, activeConvertToWon: 0, activeSales: 0 }, { id: 'TID007', taskDate: '2025-06-25', organization: 'ORG001', process: 'PROC001', assignedToEmployee: 'emp_001', status: 'Completed', generalComment: 'June EOM report.', isActive: true, leads: { dateFrom: '2025-06-21', dateTo: '2025-06-25', month: 'Jun-2025', year: '2025', region: 'West', campaign: 'CAMP001', quantity: 60, convertToProspects: 6, comment: 'Finalizing EOM leads report.', assignments: ['date-2025-06-21-2025-06-25', 'month-Jun-2025', 'region-West', 'campaign-CAMP001'] }, prospects: null, activeLeadsToProspects: 6, activeConvertToWon: 0, activeSales: 0 }, ],
        hourlyUpdates: [{ date: '2025-07-30', timeSlot: '09:30AM-10:30AM', processId: 'PROC001', calls: 5, prospects: 2, wonCases: 1, sales: 50000 }, { date: '2025-07-30', timeSlot: '10:30AM-11:30AM', processId: 'PROC001', calls: 10, prospects: 3, wonCases: 0, sales: 0 }],
        allocatedTasks: [{ id: 'ATID001', assignedTo: 'emp_001', assignedDate: '2025-07-25', dueDate: '2025-07-30', taskCompletedDate: null, task: 'Prepare weekly sales report.', remark: 'Started working on it.', status: 'In process' }, { id: 'ATID002', assignedTo: 'emp_001', assignedDate: '2025-07-25', dueDate: '2025-07-28', taskCompletedDate: '2025-07-28', task: 'Follow up with client X.', remark: 'Client signed up.', status: 'Completed' }],
        employees: [{ id: 'emp_001', name: 'Kirti Agrawal', designation: 'Manager', department: 'Sales', organization: 'ORG001', isActive: true }, { id: 'emp_002', name: 'Harpreet Kaur', designation: 'Analyst', department: 'Marketing', organization: 'ORG002', isActive: true }, { id: 'emp_003', name: 'Chandani', designation: 'Developer', department: 'IT', organization: 'ORG001', isActive: false }, { id: 'emp_004', name: 'Raj Patel', designation: 'Sales Rep', department: 'Sales', organization: 'ORG002', isActive: true }]
    };

    // --- GLOBALS AND CACHED ELEMENTS ---
    let allTasks = [];
    const loggedInEmployeeId = 'emp_001';
    const allocatedTasks = mockData.allocatedTasks.filter(task => task.assignedTo === loggedInEmployeeId);
    let filteredPerformanceTasks = [];
    const elements = {
        mainNavbar: $('#main-admin-navbar'),
        welcomeMessage: $('#welcomeMessage'),
        logoutBtn: $('#logoutBtn'),
        contentSections: $('.content-section'),
        performanceFilterForm: $('#performanceFilterForm'),
        performanceDateFrom: $('#performanceDateFrom'),
        performanceDateTo: $('#performanceDateTo'),
        clearPerformanceFilterBtn: $('#clearPerformanceFilterBtn'),
        employeeTasksTableBody: $('#employeeTasksTableBody'),
        updateDailyWorkTableBody: $('#updateDailyWorkTableBody'),
        hourlyProcessSelect: $('#hourlyProcessSelect'),
        hourlyUpdateForm: $('#hourlyUpdateForm'),
        hourlyUpdatesTableBody: $('#hourlyUpdatesTableBody'),
        allocatedTasksTableBody: $('#allocatedTasksTableBody'),
        updateAllocatedTaskForm: $('#updateAllocatedTaskForm'),
        modalTaskId: $('#modalTaskId'),
        modalTaskDescription: $('#modalTaskDescription'),
        modalTaskCompletedDate: $('#modalTaskCompletedDate'),
        modalEmpRemark: $('#modalEmpRemark'),
        modalStatus: $('#modalStatus'),
        editAllocatedTaskModal: $('#editAllocatedTaskModal'),
    };

    // --- UTILITY FUNCTIONS ---
    function checkAuth() { return true; }

    function getStatusBadge(status) {
        let badgeClass = 'bg-secondary';
        switch (status) {
            case 'Pending': badgeClass = 'bg-warning text-dark'; break;
            case 'In process': badgeClass = 'bg-info text-dark'; break;
            case 'Completed': badgeClass = 'bg-success'; break;
            case 'On hold': badgeClass = 'bg-danger'; break;
            case 'Overdue': badgeClass = 'bg-danger'; break;
        }
        return `<span class="badge ${badgeClass}">${status}</span>`;
    }

    // New date parsing function for DD-MM-YYYY format
    const parseDate = (dateStr) => {
        if (!dateStr) return null;
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            // new Date(year, monthIndex, day)
            return new Date(parts[2], parts[1] - 1, parts[0]);
        }
        return null;
    };

    // --- DATA HANDLING AND RENDERING ---
    function loadData() {
        const { tasks, organizations, processes, campaigns, employees } = mockData;
        const orgMap = new Map(organizations.map(o => [o._id, o.name]));
        const processMap = new Map(processes.map(p => [p._id, p.name]));
        const campaignMap = new Map(campaigns.map(c => [c._id, c.name]));
        const employeeMap = new Map(employees.map(e => [e.id, e.name]));

        const employeeTasks = tasks.filter(task => task.assignedToEmployee === loggedInEmployeeId);
        allTasks = employeeTasks.map(task => ({
            ...task,
            organizationName: orgMap.get(task.organization) || '--',
            processName: processMap.get(task.process) || '--',
            leads: task.leads ? { ...task.leads, campaignName: campaignMap.get(task.leads.campaign) || '--' } : null,
            prospects: task.prospects ? { ...task.prospects, campaignName: campaignMap.get(task.prospects.campaign) || '--' } : null,
            employeeName: employeeMap.get(task.assignedToEmployee) || '--'
        }));
    }

    function initializeUIComponents() {
        $('.select2-enabled:not([disabled])').select2({ placeholder: "Select", allowClear: true, width: '100%' });
        $(".datepicker").datepicker({ dateFormat: 'dd-mm-yy' });
    }

    function displayTasks() {
        elements.employeeTasksTableBody.empty();
        const activeTasks = allTasks.filter(task => task.isActive);

        if (activeTasks.length === 0) {
            elements.employeeTasksTableBody.append('<tr><td colspan="18" class="text-center">No daily work plan tasks available.</td></tr>');
            return;
        }

        const rows = activeTasks.map(task => {
            const leads = task.leads || {};
            const prospects = task.prospects || {};
            const combinedComment = [task.generalComment, leads.comment, prospects.comment].filter(Boolean).join('; ') || '--';
            const leadsDateFromTo = (leads.dateFrom && leads.dateTo) ? `${new Date(leads.dateFrom).toLocaleDateString('en-GB')} - ${new Date(leads.dateTo).toLocaleDateString('en-GB')}` : '--';
            const prospectsDateFromTo = (prospects.dateFrom && prospects.dateTo) ? `${new Date(prospects.dateFrom).toLocaleDateString('en-GB')} - ${new Date(prospects.dateTo).toLocaleDateString('en-GB')}` : '--';
            const salesLacs = prospects.employeeSaleTarget ? (prospects.employeeSaleTarget / 100000).toFixed(2) : '0.00';

            return `
                <tr data-task-id="${task.id}">
                    <td>${new Date(task.taskDate).toLocaleDateString('en-GB')}</td>
                    <td>${task.organizationName}</td>
                    <td>${task.processName}</td>
                    <td>${task.employeeName}</td>
                    <td>${leadsDateFromTo}</td>
                    <td>${leads.month && leads.year ? `${leads.month}-${leads.year}` : '--'}</td>
                    <td>${leads.region || '--'}</td>
                    <td>${leads.campaignName || '--'}</td>
                    <td>${leads.quantity || 0}</td>
                    <td>${leads.convertToProspects || 0}</td>
                    <td>${prospectsDateFromTo}</td>
                    <td>${prospects.month && prospects.year ? `${prospects.month}-${prospects.year}` : '--'}</td>
                    <td>${prospects.region || '--'}</td>
                    <td>${prospects.campaignName || '--'}</td>
                    <td>${prospects.quantity || 0}</td>
                    <td>${prospects.convertToWon || 0}</td>
                    <td>${salesLacs}</td>
                    <td>${combinedComment}</td>
                </tr>`;
        }).join('');
        elements.employeeTasksTableBody.html(rows);
    }

    function displayUpdateTasks() {
        elements.updateDailyWorkTableBody.empty();
        const activeTasks = allTasks.filter(task => task.isActive);

        if (activeTasks.length === 0) {
            elements.updateDailyWorkTableBody.append('<tr><td colspan="21" class="text-center">No active tasks to update.</td></tr>');
            return;
        }

        const rows = activeTasks.map(task => {
            const leads = task.leads || {};
            const prospects = task.prospects || {};
            const combinedComment = [task.generalComment, leads.comment, prospects.comment].filter(Boolean).join('; ') || '';
            const leadsDateFromTo = (leads.dateFrom && leads.dateTo) ? `${new Date(leads.dateFrom).toLocaleDateString('en-GB')} - ${new Date(leads.dateTo).toLocaleDateString('en-GB')}` : '--';
            const prospectsDateFromTo = (prospects.dateFrom && prospects.dateTo) ? `${new Date(prospects.dateFrom).toLocaleDateString('en-GB')} - ${new Date(prospects.dateTo).toLocaleDateString('en-GB')}` : '--';
            const salesLacs = prospects.employeeSaleTarget ? (prospects.employeeSaleTarget / 100000).toFixed(2) : '0.00';
            const activeSalesLacs = task.activeSales ? (task.activeSales / 100000).toFixed(2) : '0.00';

            return `
                <tr data-task-id="${task.id}">
                    <td>${new Date(task.taskDate).toLocaleDateString('en-GB')}</td>
                    <td>${task.organizationName}</td>
                    <td>${task.processName}</td>
                    <td>${leadsDateFromTo}</td>
                    <td>${leads.month && leads.year ? `${leads.month}-${leads.year}` : '--'}</td>
                    <td>${leads.region || '--'}</td>
                    <td>${leads.campaignName || '--'}</td>
                    <td>${leads.quantity || 0}</td>
                    <td>${leads.convertToProspects || 0}</td>
                    <td><input type="number" class="form-control form-control-sm" id="active-prospects-${task.id}" value="${task.activeLeadsToProspects || ''}" placeholder="0"></td>
                    <td>${prospectsDateFromTo}</td>
                    <td>${prospects.month && prospects.year ? `${prospects.month}-${prospects.year}` : '--'}</td>
                    <td>${prospects.region || '--'}</td>
                    <td>${prospects.campaignName || '--'}</td>
                    <td>${prospects.quantity || 0}</td>
                    <td>${prospects.convertToWon || 0}</td>
                    <td><input type="number" class="form-control form-control-sm" id="active-won-${task.id}" value="${task.activeConvertToWon || ''}" placeholder="0"></td>
                    <td>${salesLacs}</td>
                    <td><input type="number" step="0.01" class="form-control form-control-sm" id="active-sales-${task.id}" value="${activeSalesLacs}" placeholder="0.00"></td>
                    <td><textarea class="form-control form-control-sm" id="remarks-${task.id}">${combinedComment}</textarea></td>
                    <td>
                        <button class="btn btn-success btn-sm update-task-inline-btn" data-task-id="${task.id}">Update</button>
                    </td>
                </tr>`;
        }).join('');
        elements.updateDailyWorkTableBody.html(rows);

        elements.updateDailyWorkTableBody.off('click', '.update-task-inline-btn').on('click', '.update-task-inline-btn', function() {
            handleUpdateTaskProgress($(this).data('taskId'));
        });
    }

    function populateHourlyFormDropdowns() {
        const employeeOrgId = mockData.employees.find(e => e.id === loggedInEmployeeId)?.organization;
        const activeProcesses = mockData.processes.filter(p => p.isActive && p.organizationId === employeeOrgId);
        
        elements.hourlyProcessSelect.empty().append('<option value="">Select Process</option>');
        activeProcesses.forEach(proc => {
            elements.hourlyProcessSelect.append(new Option(proc.name, proc._id));
        });
        
        if (elements.hourlyProcessSelect.length && !elements.hourlyProcessSelect.is(':disabled') && !elements.hourlyProcessSelect.data('select2')) {
            elements.hourlyProcessSelect.select2({ placeholder: "Select Process", allowClear: true, width: '100%' });
        }
        elements.hourlyProcessSelect.val('').trigger('change.select2');

        const $hourlyTimeSlot = $('#hourlyTimeSlot');
        if ($hourlyTimeSlot.length && !$hourlyTimeSlot.is(':disabled') && !$hourlyTimeSlot.data('select2')) {
            $hourlyTimeSlot.select2({ placeholder: "Choose", allowClear: true, width: '100%' });
        }
        $hourlyTimeSlot.val('').trigger('change.select2');
    }

    function renderHourlyUpdatesTable() {
        elements.hourlyUpdatesTableBody.empty();

        if (mockData.hourlyUpdates.length === 0) {
            elements.hourlyUpdatesTableBody.append('<tr><td colspan="7" class="text-center">No hourly updates submitted yet.</td></tr>');
            return;
        }

        const processMap = new Map(mockData.processes.map(p => [p._id, p.name]));
        const sortedUpdates = [...mockData.hourlyUpdates].sort((a, b) => {
            const dateA = new Date(`${a.date} ${a.timeSlot.split('-')[0].replace('AM', ' AM').replace('PM', ' PM')}`);
            const dateB = new Date(`${b.date} ${b.timeSlot.split('-')[0].replace('AM', ' AM').replace('PM', ' PM')}`);
            return dateB.getTime() - dateA.getTime();
        });

        const rows = sortedUpdates.map(entry => {
            const formattedDate = new Date(entry.date).toLocaleDateString('en-GB');
            return `
                <tr>
                    <td>${formattedDate}</td>
                    <td>${entry.timeSlot}</td>
                    <td>${processMap.get(entry.processId) || '--'}</td>
                    <td>${entry.calls || 0}</td>
                    <td>${entry.prospects || 0}</td>
                    <td>${entry.wonCases || 0}</td>
                    <td>${(entry.sales || 0).toFixed(2)}</td>
                </tr>`;
        }).join('');
        elements.hourlyUpdatesTableBody.html(rows);
    }

    function renderAllocatedTasks() {
        elements.allocatedTasksTableBody.empty();

        if (allocatedTasks.length === 0) {
            elements.allocatedTasksTableBody.append('<tr><td colspan="8" class="text-center">No tasks assigned to you.</td></tr>');
            return;
        }

        const rows = allocatedTasks.map(task => {
            const statusBadge = getStatusBadge(task.status);
            const taskCompletedDateDisplay = task.taskCompletedDate ? new Date(task.taskCompletedDate).toLocaleDateString('en-GB') : '--';
            const assignedDateDisplay = new Date(task.assignedDate).toLocaleDateString('en-GB');
            const dueDateDisplay = new Date(task.dueDate).toLocaleDateString('en-GB');

            return `
                <tr data-allocated-task-id="${task.id}">
                    <td>${task.id}</td>
                    <td>${assignedDateDisplay}</td>
                    <td>${taskCompletedDateDisplay}</td>
                    <td>${dueDateDisplay}</td>
                    <td>${task.task}</td>
                    <td>${task.remark || '--'}</td>
                    <td>${statusBadge}</td>
                    <td><button class="btn btn-primary btn-sm update-allocated-task-btn" data-id="${task.id}">Update</button></td>
                </tr>`;
        }).join('');
        elements.allocatedTasksTableBody.html(rows);

        elements.allocatedTasksTableBody.off('click', '.update-allocated-task-btn').on('click', '.update-allocated-task-btn', function() {
            const taskId = $(this).data('id');
            const taskToEdit = allocatedTasks.find(t => t.id === taskId);
            if (taskToEdit) {
                $('#editAllocatedTaskId').text(taskToEdit.id);
                elements.modalTaskId.val(taskToEdit.id);
                elements.modalTaskDescription.val(taskToEdit.task);
                elements.modalTaskCompletedDate.val(taskToEdit.taskCompletedDate ? new Date(taskToEdit.taskCompletedDate).toLocaleDateString('en-GB') : '');
                elements.modalEmpRemark.val(taskToEdit.remark);
                elements.modalStatus.val(taskToEdit.status);
                elements.editAllocatedTaskModal.modal('show');
            }
        });
    }

    // --- PERFORMANCE TAB LOGIC ---
    function filterTasksByDate(fromDateStr, toDateStr) {
        if (!fromDateStr && !toDateStr) {
            return allTasks.filter(task => task.isActive);
        }
        
        const start = fromDateStr ? parseDate(fromDateStr) : new Date(0);
        const end = toDateStr ? parseDate(toDateStr) : new Date();
        end.setHours(23, 59, 59, 999);
    
        return allTasks.filter(task => {
            const taskDate = new Date(task.taskDate);
            return task.isActive && taskDate >= start && taskDate <= end;
        });
    }

    function loadPerformanceSummary(tasksToSum = allTasks.filter(task => task.isActive)) {
        const summary = tasksToSum.reduce((acc, task) => {
            acc.leadsTarget += (task.leads?.convertToProspects || 0);
            acc.leadsAchieved += (task.activeLeadsToProspects || 0);
            acc.prospectsTarget += (task.prospects?.convertToWon || 0);
            acc.prospectsAchieved += (task.activeConvertToWon || 0);
            acc.salesTarget += (task.prospects?.employeeSaleTarget || 0);
            acc.salesAchieved += (task.activeSales || 0);
            return acc;
        }, { leadsTarget: 0, leadsAchieved: 0, prospectsTarget: 0, prospectsAchieved: 0, salesTarget: 0, salesAchieved: 0 });

        const leadsScore = summary.leadsTarget > 0 ? ((summary.leadsAchieved / summary.leadsTarget) * 100).toFixed(0) : 0;
        const prospectsScore = summary.prospectsTarget > 0 ? ((summary.prospectsAchieved / summary.prospectsTarget) * 100).toFixed(0) : 0;
        const salesScore = summary.salesTarget > 0 ? ((summary.salesAchieved / summary.salesTarget) * 100).toFixed(0) : 0;
        
        const validScores = [leadsScore, prospectsScore, salesScore].filter(score => score !== 0);
        const overallScore = validScores.length > 0 ? (validScores.reduce((sum, score) => sum + parseInt(score), 0) / validScores.length).toFixed(0) : 0;

        $('#leadsTarget').text(summary.leadsTarget);
        $('#leadsAchieved').text(summary.leadsAchieved);
        $('#leadsScore').text(`${leadsScore}%`);

        $('#prospectsTarget').text(summary.prospectsTarget);
        $('#prospectsAchieved').text(summary.prospectsAchieved);
        $('#prospectsScore').text(`${prospectsScore}%`);

        $('#salesTarget').text((summary.salesTarget / 100000).toFixed(2));
        $('#salesAchieved').text((summary.salesAchieved / 100000).toFixed(2));
        $('#salesScore').text(`${salesScore}%`);

        $('#overallScore').text(`${overallScore}%`);
    }

    // --- EVENT HANDLERS ---
    function handlePerformanceFilterSubmit(e) {
        e.preventDefault();
        const fromDateStr = elements.performanceDateFrom.val();
        const toDateStr = elements.performanceDateTo.val();

        if (fromDateStr && toDateStr) {
            const start = parseDate(fromDateStr);
            const end = parseDate(toDateStr);
            if (start > end) {
                alert('From Date cannot be after To Date.');
                return;
            }
        }

        filteredPerformanceTasks = filterTasksByDate(fromDateStr, toDateStr);
        loadPerformanceSummary(filteredPerformanceTasks);
    }

    function handleClearPerformanceFilter() {
        elements.performanceDateFrom.val('');
        elements.performanceDateTo.val('');
        filteredPerformanceTasks = allTasks.filter(task => task.isActive);
        loadPerformanceSummary(filteredPerformanceTasks);
    }
    
    function handleUpdateTaskProgress(taskId) {
        const task = allTasks.find(t => t.id === taskId);
        if (!task) {
            alert('Error: Task could not be found.');
            return;
        }

        task.activeLeadsToProspects = parseInt($(`#active-prospects-${taskId}`).val() || 0);
        task.activeConvertToWon = parseInt($(`#active-won-${taskId}`).val() || 0);
        task.activeSales = parseFloat($(`#active-sales-${taskId}`).val() || 0) * 100000;
        task.generalComment = $(`#remarks-${taskId}`).val();

        alert(`Progress and remarks for Task ${taskId} have been updated!`);
        loadPerformanceSummary(allTasks.filter(t => t.isActive));
        $(`tr[data-task-id="${taskId}"]`).css('background-color', '#d4edda').animate({ backgroundColor: '' }, 1500);
    }

    function handleUpdateAllocatedTask(e) {
        e.preventDefault();
        const taskId = elements.modalTaskId.val();
        const task = allocatedTasks.find(t => t.id === taskId);
        if (!task) {
            alert('Error: Allocated task could not be found.');
            return;
        }
        
        task.remark = elements.modalEmpRemark.val();
        task.status = elements.modalStatus.val();
        const completedDate = elements.modalTaskCompletedDate.val();
        task.taskCompletedDate = completedDate ? completedDate.split('-').reverse().join('-') : null;

        alert(`Allocated task ${taskId} updated successfully!`);
        renderAllocatedTasks();
        elements.editAllocatedTaskModal.modal('hide');
    }

    function handleHourlyUpdateSubmit(e) {
        e.preventDefault();
        const timeSlot = $('#hourlyTimeSlot').val();
        const processId = elements.hourlyProcessSelect.val();
        if (!timeSlot || !processId) {
            alert('Please select a Time Slot and a Process.');
            return;
        }

        const newHourlyEntry = {
            date: new Date().toISOString().split('T')[0],
            timeSlot: timeSlot,
            employeeId: loggedInEmployeeId,
            processId: processId,
            calls: parseInt($('#hourlyNumCalls').val() || 0),
            prospects: parseInt($('#hourlyNumProspects').val() || 0),
            wonCases: parseInt($('#hourlyNumWonCases').val() || 0),
            sales: parseFloat($('#hourlySalesValue').val() || 0)
        };
        mockData.hourlyUpdates.push(newHourlyEntry);
        if (window.parent && window.parent.hourlyUpdatesAdmin) {
            window.parent.hourlyUpdatesAdmin.push(newHourlyEntry);
        }

        alert('Hourly update submitted successfully! This will reflect on the Admin Dashboard.');
        elements.hourlyUpdateForm[0].reset();
        populateHourlyFormDropdowns();
        renderHourlyUpdatesTable();
    }
    
    // --- MAIN NAVIGATION AND PAGE LOAD ---
    function showSection(sectionId, updateUrl = true) {
        elements.contentSections.addClass('d-none');
        $(`#${sectionId}-section`).removeClass('d-none');
        elements.mainNavbar.find('.nav-link').removeClass('active');
        elements.mainNavbar.find(`[data-section="${sectionId}"]`).addClass('active');

        if (updateUrl) {
            history.pushState(null, '', `#${sectionId}`);
        }

        switch (sectionId) {
            case 'daily-work-plan-employee':
                displayTasks();
                break;
            case 'update-daily-work':
                displayUpdateTasks();
                break;
            case 'hourly-updates-employee':
                populateHourlyFormDropdowns();
                renderHourlyUpdatesTable();
                break;
            case 'my-task-employee':
                renderAllocatedTasks();
                break;
            case 'performance-employee':
                handleClearPerformanceFilter(); // Resets filter and loads default performance
                break;
        }
    }

    $(document).ready(() => {
        if (!checkAuth()) return;

        const employeeName = mockData.employees.find(emp => emp.id === loggedInEmployeeId)?.name || "Employee";
        elements.welcomeMessage.text(`Welcome, ${employeeName}!`);
        
        loadData();
        initializeUIComponents();

        // Attach event listeners
        elements.mainNavbar.on('click', '.nav-link', function(e) {
            e.preventDefault();
            showSection($(this).data('section'), true);
        });
        elements.performanceFilterForm.on('submit', handlePerformanceFilterSubmit);
        elements.clearPerformanceFilterBtn.on('click', handleClearPerformanceFilter);
        elements.updateDailyWorkTableBody.on('click', '.update-task-inline-btn', function() {
            handleUpdateTaskProgress($(this).data('taskId'));
        });
        elements.updateAllocatedTaskForm.on('submit', handleUpdateAllocatedTask);
        elements.hourlyUpdateForm.on('submit', handleHourlyUpdateSubmit);
        elements.logoutBtn.on('click', () => {
            localStorage.clear();
            window.location.href = 'login.html';
        });

        // Initial view
        const initialHash = window.location.hash.substring(1);
        const validSection = $(`#${initialHash}-section`).length ? initialHash : 'daily-work-plan-employee';
        showSection(validSection, false);
    });

})(jQuery);