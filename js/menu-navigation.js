let links = {
    login: "login.html",
    summary: "dashboard.html",
}

let pages = [
    "summary",
    "board",
    "addtask",
    "contacts",
    "legal",
    "help"
]

let menus = [
    "menu-summary",
    "menu-board",
    "menu-addtask",
    "menu-contacts",
    "menu-legal",
]

function openLogin() {
    window.open('./login.html', '_self');
}


function openPage(pageName) {
    if (pageName === 'summary') {
        updateCounters();
    }
    hidePages();
    removeDarkMenu();
    let page = document.getElementById(`${pageName}`);
    page.classList.remove('d-none');
    if (pageName != 'help') {
        let menupoint = document.getElementById(`menu-${pageName}`);
        menupoint.classList.add('sidebar-menu-option-dark');
    }
    if (pageName === 'contacts') {
        renderContactList();
    }
}


function hidePages() {
    pages.forEach(page => {
        let canvas = document.getElementById(`${page}`);
        canvas.classList.add('d-none');
    });
}


function removeDarkMenu() {
    menus.forEach(menu => {
        let menupoint = document.getElementById(`${menu}`);
        if (menupoint.classList.contains('sidebar-menu-option-dark')) {
            menupoint.classList.remove('sidebar-menu-option-dark');
            menupoint.classList.add('sidebar-menu-option-light');
        }
    });
}
