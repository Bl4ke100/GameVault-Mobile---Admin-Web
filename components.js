

document.addEventListener('DOMContentLoaded', () => {
    injectStyles();
    renderSidebar();
    renderHeader();
    setupLogout();
});

function injectStyles() {
    if (document.getElementById('components-styles')) return;
    const style = document.createElement('style');
    style.id = 'components-styles';
    style.innerHTML = `
        .nav-link { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
        .nav-link.active { 
            background-color: white !important; 
            color: black !important; 
            font-weight: 800;
            box-shadow: 0 4px 12px rgba(255,255,255,0.1);
        }
        .nav-link:not(.active):hover {
            background-color: rgba(255,255,255,0.05);
            color: white;
        }
        aside::-webkit-scrollbar { width: 4px; }
        aside::-webkit-scrollbar-track { background: transparent; }
        aside::-webkit-scrollbar-thumb { background: #1f1f1f; border-radius: 2px; }
    `;
    document.head.appendChild(style);
}

function renderSidebar() {
    const currentPage = window.location.pathname.split("/").pop() || "dashboard.html";
    
    const sidebarHTML = `
    <aside class="w-60 bg-[#0a0a0a] flex flex-col border-r border-[#1f1f1f] shrink-0 h-screen sticky top-0">
        <!-- Logo -->
        <div class="px-6 py-6 border-b border-[#1f1f1f]">
            <div class="text-xl font-black tracking-tighter text-white">GAME<span class="text-white opacity-40">VAULT</span></div>
            <div class="text-[10px] text-[#444] tracking-widest uppercase mt-0.5">Admin Console</div>
        </div>

        <!-- Nav -->
        <nav class="flex-1 px-3 py-4 space-y-1">
            <a href="dashboard.html" class="nav-link ${currentPage === 'dashboard.html' ? 'active' : 'text-[#888]'} flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm">
                <i class="fas fa-home w-4 text-center"></i> Dashboard
            </a>
            <a href="games.html" class="nav-link ${currentPage === 'games.html' ? 'active' : 'text-[#888]'} flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm">
                <i class="fas fa-gamepad w-4 text-center"></i> Games
            </a>
            <a href="users.html" class="nav-link ${currentPage === 'users.html' ? 'active' : 'text-[#888]'} flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm">
                <i class="fas fa-users w-4 text-center"></i> Users
            </a>
            <a href="orders.html" class="nav-link ${currentPage === 'orders.html' ? 'active' : 'text-[#888]'} flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm">
                <i class="fas fa-shopping-cart w-4 text-center"></i> Orders
            </a>
            <a href="reports.html" class="nav-link ${currentPage === 'reports.html' ? 'active' : 'text-[#888]'} flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm">
                <i class="fas fa-chart-bar w-4 text-center"></i> Reports & Comms
            </a>
            <a href="banners.html" class="nav-link ${currentPage === 'banners.html' ? 'active' : 'text-[#888]'} flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm">
                <i class="fas fa-images w-4 text-center"></i> Banners 
            </a>
        </nav>

        <!-- Logout -->
        <div class="p-3 border-t border-[#1f1f1f]">
            <button id="btnLogout" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-500/10 transition">
                <i class="fas fa-sign-out-alt w-4 text-center"></i> Logout
            </button>
        </div>
    </aside>
    `;

    const main = document.querySelector('main');
    if (main) {
        main.insertAdjacentHTML('beforebegin', sidebarHTML);
    } else {
        document.body.insertAdjacentHTML('afterbegin', sidebarHTML);
    }
}

function renderHeader() {
    const headerContainer = document.getElementById('header-container');
    if (!headerContainer) return;

    const pageTitles = {
        'dashboard.html': 'Business Overview',
        'games.html': 'Game Management',
        'users.html': 'User Account Management',
        'orders.html': 'Fulfillment Center',
        'reports.html': 'Reporting & Notifications',
        'banners.html': 'Mobile Banner Configuration'
    };

    const currentPage = window.location.pathname.split("/").pop() || "dashboard.html";
    const title = pageTitles[currentPage] || 'Admin Console';

    const actions = document.getElementById('header-actions');

    headerContainer.innerHTML = `
    <header class="h-14 bg-[#0a0a0a] border-b border-[#1f1f1f] flex items-center justify-between px-8 shrink-0">
        <div class="flex items-center gap-6">
            <h2 class="text-sm font-bold tracking-widest uppercase text-[#888]">${title}</h2>
            <div class="flex items-center gap-2" id="header-actions-container">
            </div>
        </div>
        <div class="flex items-center gap-3">
            <span class="text-xs text-[#444]">Admin Session Live</span>
            <div class="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
                <span class="absolute top-0 right-0 w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                <i class="fas fa-bolt text-white text-[10px]"></i>
            </div>
        </div>
    </header>
    `;

    if (actions) {
        const container = document.getElementById('header-actions-container');
        while (actions.firstChild) {
            container.appendChild(actions.firstChild);
        }
        actions.remove();
    }
}

function setupLogout() {
    // We use a delegated event listener because the button is injected dynamically
    document.addEventListener('click', (e) => {
        if (e.target.closest('#btnLogout')) {
            // Access the Firebase Auth from the global scope/module
            // Assuming auth is available on window or we can import it
            // For simplicity in a multi-file setup, we trigger a custom event
            // or directly use the Firebase SDK if it's already loaded.
            if (typeof window.firebaseLogout === 'function') {
                window.firebaseLogout();
            } else {
                // Fallback: search for the auth instance in the module scripts is hard,
                // so we expect the page to define window.firebaseLogout
                console.warn('window.firebaseLogout not defined. Please ensure your script defines it.');
            }
        }
    });
}
