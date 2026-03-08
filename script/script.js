// Prevent access without login
if(sessionStorage.getItem("loggedIn") !== "true"){
    window.location.href = "index.html";
}

let allIssues = [];

// Loading functions
const loading = document.getElementById("loading");
const startLoading = () => loading.classList.remove("hidden");
const endLoading = () => loading.classList.add("hidden");

// Fetch all issues
const fetchIssues = () => {
    startLoading();
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then(data => {
        allIssues = data.data;
        renderIssues(data.data);
        endLoading();
    })
    .catch(err => console.log("Error fetching issues:", err));
}

// Render issues
const renderIssues = (issues) => {
    const container = document.getElementById("card-container");
    container.innerHTML = '';

    issues.forEach(issue => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div onclick="showIssueDetails(${issue.id})" class="card-bord shadow-sm border-t-4 ${getBorderColor(issue.priority)} rounded-md h-full">
            <div class="flex justify-between p-3">
                <div>${getStatusIcon(issue)}</div>
                <div>${getPriorityBadge(issue)}</div>
            </div>
            <div class="p-3">
                <h2 class="text-xl font-bold">${issue.title}</h2>
                <p class="line-clamp-2 text-gray-500">${issue.description}</p>
            </div>
            <div class="p-3 flex gap-1">
                ${renderLabels(issue.labels)}
            </div>
            <hr class="border-gray-400">
            <div class="p-3">
                <p class="text-gray-400 font-thin">#${issue.id} ${issue.assignee}</p>
                <p class="text-gray-400 font-thin">${issue.createdAt}</p>
            </div>
        </div>`;
        container.appendChild(div);
    });
}

// Filter cards
const filterCards = (btn, categoryId) => {
    startLoading();
    document.querySelectorAll(".filter-btn").forEach(b => {
        b.classList.add("btn-outline");
        b.classList.remove("btn-primary");
    });
    btn.classList.add("btn-primary");
    btn.classList.remove("btn-outline");

    if(categoryId === 'all'){
        renderIssues(allIssues);
    } else{
        renderIssues(allIssues.filter(i => i.status === categoryId));
    }
    endLoading();
}

// Status icon
const getStatusIcon = (issue) => issue.status === "open" 
    ? `<img class="w-full" src="image/Open-Status.png">`
    : `<img class="w-full" src="image/Closed-Status.png">`;

// Priority badge
const getPriorityBadge = (issue) => {
    if(issue.priority==="high") return `<h3 class="badge badge-error badge-soft rounded-full font-semibold">HIGH</h3>`;
    else if(issue.priority==="medium") return `<h3 class="badge badge-warning badge-soft rounded-full font-semibold">MEDIUM</h3>`;
    else return `<h3 class="badge badge-neutral badge-soft rounded-full font-semibold text-gray-500">LOW</h3>`;
}

// Border color
const getBorderColor = (priority) => {
    if(priority==="high") return "border-red-500";
    else if(priority==="medium") return "border-yellow-500";
    else return "border-gray-400";
}

// Render labels
const renderLabels = (labels) => {
    return labels.map(l => {
        const lower = l.toLowerCase();
        if(lower==="bug") return `<div class="badge badge-error badge-outline rounded-full pl-2 font-bold text-[10px]">BUG</div>`;
        if(lower==="help wanted") return `<div class="badge badge-warning badge-outline rounded-full pl-2 font-bold text-[10px]">HELP WANTED</div>`;
        if(lower==="enhancement") return `<div class="badge badge-success badge-outline rounded-full pl-2 font-bold text-[10px]">ENHANCEMENT</div>`;
        if(lower==="documentation") return `<div class="badge badge-primary badge-outline rounded-full pl-2 font-bold text-[10px]">DOCUMENTATION</div>`;
        return "";
    }).join("");
}

// Show modal
const showIssueDetails = (id) => {
    const issue = allIssues.find(i => i.id === id);
    if(!issue) return;

    const modal = document.getElementById("modal-body");
    modal.innerHTML = `
    <div class="space-y-2">
        <h2 class="text-2xl font-semibold">${issue.title}</h2>
        <p>Status: ${issue.status}</p>
        <p>Assignee: ${issue.assignee}</p>
        <p>Created: ${issue.createdAt}</p>
        <p>${issue.description}</p>
        ${renderLabels(issue.labels)}
    </div>`;
    document.getElementById("my_modal_5").showModal();
}

// Search
document.getElementById("search-btn").addEventListener('click', () => {
    const inputValue = document.getElementById("search-input").value.trim().toLowerCase();
    if(inputValue === "") return;
    startLoading();

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inputValue}`)
    .then(res => res.json())
    .then(data => {
        renderIssues(data.data);
        endLoading();
    })
    .catch(err => console.log(err));
});

// Initial fetch
fetchIssues();