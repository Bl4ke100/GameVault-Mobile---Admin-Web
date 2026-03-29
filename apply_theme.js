const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/User/AndroidStudioProjects/Gamevault-AdminWeb';
const files = ['games.html', 'users.html', 'orders.html', 'reports.html', 'banners.html'];

const newStyle = `<style>
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #3a3a3a; }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .stat-card, .section-card { background: #111111; border: 1px solid #1f1f1f; transition: transform 0.2s, border-color 0.2s; }
        .stat-card:hover { border-color: #333333; transform: translateY(-2px); }
        .nav-link { transition: background 0.15s, color 0.15s; }
        .nav-link:hover { background: #1a1a1a; color: #ffffff; }
        .nav-link.active { background: #ffffff; color: #000000; font-weight: 700; }
        .nav-link.active i { color: #000000; }
        table th { background: #0a0a0a !important; color: #888 !important; border-bottom: 1px solid #1f1f1f !important; border-top: 1px solid #1a1a1a !important; font-size: 10px !important; letter-spacing: 0.1em; }
        table td { border-bottom: 1px solid #151515 !important; color: #ccc !important; }
        tr:hover td { background: rgba(255,255,255,0.02) !important; }
        .custom-input, select, input, textarea { background: #0a0a0a !important; border: 1px solid #1f1f1f !important; color: #fff !important; outline: none; transition: border 0.3s; }
        .custom-input:focus, select:focus, input:focus, textarea:focus { border-color: #555 !important; }
        .modal-bg { background: rgba(0,0,0,0.85) !important; backdrop-filter: blur(4px); }
        .modal-content { background: #0d0d0d !important; border: 1px solid #1f1f1f !important; }
        .btn-primary { background: #ffffff !important; color: #000000 !important; border: 1px solid #fff !important; transition: 0.2s; font-weight: bold; }
        .btn-primary:hover { background: #e5e5e5 !important; }
        .btn-sub { background: #1a1a1a !important; color: #fff !important; border: 1px solid #333 !important; }
        .btn-sub:hover { background: #2a2a2a !important; }
        .badge-completed { color: #ffffff; background: #1a1a1a; border: 1px solid #333; }
        .badge-pending { color: #f59e0b; background: rgba(245, 158, 11, 0.1); }
        .badge-shipped { color: #ffffff; background: #1f1f1f; }
        .badge-cancelled { color: #ef4444; background: rgba(239, 68, 68, 0.1); }
        .bg-gray-800 { background-color: #111 !important; border-color: #1f1f1f !important; }
        .bg-gray-900 { background-color: #0d0d0d !important; }
        .text-gray-400 { color: #888 !important; }
        .text-gray-300 { color: #ccc !important; }
        .text-gray-500 { color: #555 !important; }
    </style>`;

function getSidebar(activePage) {
    return `<body class="bg-black text-white flex h-screen font-sans hidden" id="bodyContent">
    <aside class="w-60 bg-[#0a0a0a] flex flex-col border-r border-[#1f1f1f] shrink-0">
        <div class="px-6 py-6 border-b border-[#1f1f1f]">
            <div class="text-xl font-black tracking-tighter text-white">GAME<span class="text-white opacity-40">VAULT</span></div>
            <div class="text-[10px] text-[#444] tracking-widest uppercase mt-0.5">Admin Console</div>
        </div>
        <nav class="flex-1 px-3 py-4 space-y-1">
            <a href="dashboard.html" class="nav-link ` + (activePage==='dashboard.html'?'active':(activePage!=='dashboard.html'?'text-[#888]':'')) + ` flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm">
                <i class="fas fa-home w-4 text-center"></i> Dashboard
            </a>
            <a href="games.html" class="nav-link ` + (activePage==='games.html'?'active':(activePage!=='games.html'?'text-[#888]':'')) + ` flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm">
                <i class="fas fa-gamepad w-4 text-center"></i> Games
            </a>
            <a href="users.html" class="nav-link ` + (activePage==='users.html'?'active':(activePage!=='users.html'?'text-[#888]':'')) + ` flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm">
                <i class="fas fa-users w-4 text-center"></i> Users
            </a>
            <a href="orders.html" class="nav-link ` + (activePage==='orders.html'?'active':(activePage!=='orders.html'?'text-[#888]':'')) + ` flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm">
                <i class="fas fa-shopping-cart w-4 text-center"></i> Orders
            </a>
            <a href="reports.html" class="nav-link ` + (activePage==='reports.html'?'active':(activePage!=='reports.html'?'text-[#888]':'')) + ` flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm">
                <i class="fas fa-chart-bar w-4 text-center"></i> Reports & Comms
            </a>
            <a href="banners.html" class="nav-link ` + (activePage==='banners.html'?'active':(activePage!=='banners.html'?'text-[#888]':'')) + ` flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm">
                <i class="fas fa-images w-4 text-center"></i> Banners Hub
            </a>
        </nav>
        <div class="p-3 border-t border-[#1f1f1f]">
            <button id="btnLogout" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-500/10 transition">
                <i class="fas fa-sign-out-alt w-4 text-center"></i> Logout
            </button>
        </div>
    </aside>`;
}

function getHeader(title) {
    return `<main class="flex-1 flex flex-col overflow-hidden bg-[#0d0d0d] relative">
        <header class="h-14 bg-[#0a0a0a] border-b border-[#1f1f1f] flex items-center justify-between px-8 shrink-0 relative z-40">
            <h2 class="text-sm font-bold tracking-widest uppercase text-[#888]">`+title+`</h2>
            <div class="flex items-center gap-3">
                <span class="text-xs text-[#444]">Admin Session Live</span>
                <div class="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
                    <span class="absolute top-0 right-0 w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                    <i class="fas fa-bolt text-white text-[10px]"></i>
                </div>
            </div>
        </header>`;
}

files.forEach(filename => {
    let content = fs.readFileSync(path.join(dir, filename), 'utf8');
    
    // 1. Swap Style
    content = content.replace(new RegExp("<style>[\\\\s\\\\S]*?</style>", "gi"), newStyle);
    
    // 2. Swap Sidebar
    content = content.replace(new RegExp("<body[^>]*>[\\\\s\\\\S]*?</aside>", "gi"), getSidebar(filename));
    
    // 3. Swap Header
    let hTitle = "Section View";
    if(filename==='games.html') hTitle = "Game Catalog Overview";
    if(filename==='users.html') hTitle = "User Account Management";
    if(filename==='orders.html') hTitle = "Fulfillment Center";
    if(filename==='reports.html') hTitle = "System Reports & Broadcasts";
    if(filename==='banners.html') hTitle = "Mobile Banner Configuration";
    
    content = content.replace(new RegExp("<main[^>]*>[\\\\s\\\\S]*?<header[^>]*>[\\\\s\\\\S]*?</header>", "gi"), getHeader(hTitle));
    
    // 4. Monochrome Class Replacements
    content = content.replace(/bg-gray-800/g, 'bg-[#1a1a1a]');
    content = content.replace(/bg-gray-900/g, 'bg-[#0a0a0a]');
    content = content.replace(/border-gray-700/g, 'border-[#1f1f1f]');
    content = content.replace(/border-gray-600/g, 'border-[#2a2a2a]');
    content = content.replace(/text-gray-400/g, 'text-[#888]');
    content = content.replace(/text-gray-500/g, 'text-[#555]');
    content = content.replace(/text-gray-300/g, 'text-[#ccc]');
    
    // Replace buttons globally
    content = content.replace(/bg-blue-600/g, 'bg-white text-black hover:bg-gray-200 border-white text-xs text-center');
    content = content.replace(/hover:bg-blue-700/g, 'hover:bg-gray-200');
    content = content.replace(/bg-green-600/g, 'bg-white text-black hover:bg-gray-200');
    content = content.replace(/hover:bg-green-700/g, 'hover:bg-gray-200');
    content = content.replace(/bg-amber-600/g, 'bg-white text-black hover:bg-gray-200');
    content = content.replace(/hover:bg-amber-700/g, 'hover:bg-gray-200');
    content = content.replace(/bg-red-600/g, 'bg-[#ff3333] hover:bg-[#cc0000]');
    content = content.replace(/text-amber-500/g, 'text-yellow-400');
    
    content = content.replace(/bg-emerald-600/g, 'bg-white text-black');
    content = content.replace(/hover:bg-emerald-700/g, 'hover:bg-gray-200');
    content = content.replace(/hover:bg-gray-600/g, 'hover:bg-[#2a2a2a]');

    content = content.replace(/text-blue-500/g, 'text-white');
    content = content.replace(/text-blue-400/g, 'text-[#fff] font-bold');
    
    content = content.replace(/focus:border-blue-500/g, 'focus:border-white');
    content = content.replace(/focus:ring-blue-500/g, 'focus:ring-white/20');

    fs.writeFileSync(path.join(dir, filename), content);
    console.log("Successfully updated " + filename);
});
