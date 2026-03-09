    if (sessionStorage.getItem("loggedIn") !== "true") {
        window.location.href = "sign-up.html";
    }

    let allIssues = [];
    const API = "https://phi-lab-server.vercel.app/api/v1/lab";


    const startLoding = () => {
        const el = document.getElementById("loding");
        el.classList.remove("hidden");
        el.classList.add("flex");
    };

    const endLoding = () => {
        const el = document.getElementById("loding");
        el.classList.add("hidden");
        el.classList.remove("flex");
    };


    const allCardFetch = () => {
        startLoding();
        document.getElementById("error-banner").classList.add("hidden");

        fetch(`${API}/issues`)
            .then(res => res.json())
            .then(data => {
                allIssues = data.data;
                allCardDisplay(data.data);
            })
            .catch(err => {
                console.error("Fetch Error:", err);
                document.getElementById("error-banner").classList.remove("hidden");
            })
            .finally(() => endLoding());
    };


    const allCardDisplay = (cards) => {
        const parentDiv = document.getElementById("card-containar");
        parentDiv.innerHTML = "";

        if (!cards || cards.length === 0) {
            parentDiv.innerHTML = `
                <div class="col-span-full text-center py-16 text-gray-400">
                    <i class="fa-solid fa-inbox text-6xl block mb-3"></i>
                    <p class="text-base font-medium">No issues found</p>
                </div>`;
            document.getElementById("card-count").innerText = 0;
            return;
        }

        cards.forEach(card => {
            const childDiv = document.createElement("div");
            childDiv.innerHTML = `
                <div class="bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col h-full">
                    <div class="h-1.5 w-full" style="background:${topBarColor(card.status)};"></div>
                    <div class="flex justify-between items-center p-3">
                        <div>${statusIcon(card)}</div>
                        <div>${statusBadge(card)}</div>
                    </div>
                    <div class="px-3 pb-2 flex-1">
                        <h2 class="text-sm font-bold text-gray-900 mb-1">${card.title}</h2>
                        <p class="line-clamp-2 text-gray-500 text-xs">${card.description}</p>
                    </div>
                    <div class="px-3 pb-3 flex flex-wrap gap-1">
                        ${labelsShow(card.labels)}
                    </div>
                    <hr class="border-gray-100">
                    <div class="p-3">
                        <p class="text-gray-400 text-xs">#${card.id} by ${card.assignee}</p>
                        <p class="text-gray-400 text-xs">${formatDate(card.createdAt)}</p>
                    </div>
                </div>`;

            childDiv.addEventListener("click", () => showIssueDeteils(card.id));
            parentDiv.appendChild(childDiv);
        });

        document.getElementById("card-count").innerText = cards.length;
    };


    const showIssueDeteils = (id) => {
        
        document.getElementById("modal-body").innerHTML = `
            <div class="flex justify-center items-center py-10">
                <span class="loading loading-spinner loading-lg text-primary"></span>
            </div>`;

        document.getElementById("issue-modal").showModal();


    const card = allIssues.find(issue => issue.id === id);

        if (!card) {
            document.getElementById("modal-body").innerHTML = `
                <p class="text-red-500 text-center py-6">
                    <i class="fa-solid fa-circle-exclamation mr-2"></i>
                    Issue not found
                </p>`;
            document.getElementById("issue-modal").showModal();
            return;
        }

        document.getElementById("issue-modal").showModal();
        modalinfoDisplay(card);
};


    const modalinfoDisplay = (details) => {
        document.getElementById("modal-body").innerHTML = `
            <div class="space-y-2">
                <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 leading-snug">${details.title}</h2>
                <div class="flex flex-wrap gap-2 items-center">
                    ${statusText(details)}
                    <p class="text-gray-500 text-sm flex items-center gap-1">
                        <span class="status status-neutral"></span> Opened by ${details.assignee}
                    </p>
                    <p class="text-gray-500 text-sm flex items-center gap-1">
                        <span class="status status-neutral"></span> ${formatDate(details.createdAt)}
                    </p>
                </div>
            </div>
            <div class="flex flex-wrap gap-2">
                ${labelsShow(details.labels)}
            </div>
            <p class="text-gray-500 text-sm leading-relaxed">${details.description}</p>
            <div class="bg-slate-100 flex justify-evenly items-center p-4 rounded-xl gap-4">
                <div>
                    <p class="text-gray-500 text-sm">Assignee:</p>
                    <p class="text-lg font-bold text-gray-900">${details.assignee}</p>
                </div>
                <div class="w-px h-8 bg-gray-300"></div>
                <div>
                    <p class="text-gray-500 text-sm">Priority:</p>
                    <div class="mt-1">${statusBadge(details)}</div>
                </div>
            </div>`;
    };


    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        try {
            return new Date(dateStr).toLocaleDateString("en-US", {
                year: "numeric", month: "numeric", day: "numeric"
            });
        } catch(e) { return dateStr; }
    };

    const topBarColor = (status) => status === "open" ? "#00A96E" : "#A855F7";


    const statusIcon = (card) => {
        if (card.status === "open") {
            return `<img src="Image/Open-Status.png" alt="open" class="w-6 h-6" />`;
        }
        return `<img src="Image/Closed-Status.png" alt="closed" class="w-6 h-6" />`;
    };

    const statusText = (card) => {
        if (card.status === "open") {
            return `<span class="badge badge-success rounded-full font-semibold text-white px-3">Opened</span>`;
        }
        return `<span class="badge badge-error rounded-full font-semibold text-white px-3">Closed</span>`;
    };

    function statusBadge(card) {
        if (card.priority === "high") {
            return `<span class="badge badge-error badge-soft rounded-full font-semibold">HIGH</span>`;
        } else if (card.priority === "medium") {
            return `<span class="badge badge-warning badge-soft rounded-full font-semibold">MEDIUM</span>`;
        } else {
            return `<span class="badge badge-neutral badge-soft rounded-full font-semibold text-gray-500">LOW</span>`;
        }
    }

    const labelsShow = (labels) => {
        if (!labels || !labels.length) return "";
        return labels.map(label => {
            const l = label.toLowerCase();
            if (l === "bug") {
                return `<span style="background:#FEE2E2; color:#EF4444; border:1.5px solid #FCA5A5;" class="badge rounded-full font-bold text-[10px] gap-1">
                        <i class="fa-solid fa-bug"></i>BUG
                    </span>`;
            } else if (l === "help wanted") {
                return `<span style="background:#FEF9C3; color:#EAB308; border:1.5px solid #FDE047;" class="badge rounded-full font-bold text-[10px] gap-1">
                        <img src="image/Lifebuoy.png" alt=""></i>HELP WANTED
                    </span>`;
            } else if (l === "enhancement") {
                return  `<span style="background:#DCFCE7; color:#22C55E; border:1.5px solid #86EFAC;" class="badge rounded-full font-bold text-[10px] gap-1">
                        <img src="image/Sparkle.png" alt=""></i>ENHANCEMENT
                    </span>`;
            } else if (l === "documentation") {
                return `<span style="background:#DBEAFE; color:#3B82F6; border:1.5px solid #93C5FD;" class="badge rounded-full font-bold text-[10px] gap-1">
                        <i class="fa-solid fa-book"></i>DOCUMENTATION
                    </span>`;
            } else {
                return "";
            }
        }).join("");
    };


    const filterCards = (everyBtn, catagoryId) => {
        document.querySelectorAll(".filter-btn").forEach(btn => {
            btn.classList.add("btn-outline");
            btn.classList.remove("btn-primary");
        });
        everyBtn.classList.remove("btn-outline");
        everyBtn.classList.add("btn-primary");

        if (catagoryId === "all") {
            allCardDisplay(allIssues);
        } else {
            allCardDisplay(allIssues.filter(card => card.status === catagoryId));
        }
    };


    document.getElementById("search-btn").addEventListener("click", () => {
        const q = document.getElementById("search-input").value.trim().toLowerCase();
        if (!q) { allCardDisplay(allIssues); return; }

        startLoding();
        fetch(`${API}/issues/search?q=${encodeURIComponent(q)}`)
            .then(res => res.json())
            .then(data => allCardDisplay(data.data || []))
            .catch(err => console.error("Search Error:", err))
            .finally(() => endLoding());
    });

    document.getElementById("search-input").addEventListener("keydown", (e) => {
        if (e.key === "Enter") document.getElementById("search-btn").click();
    });


    allCardFetch();