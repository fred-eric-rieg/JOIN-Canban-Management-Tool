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

/**
 * Toggles the small menu on the top right corner of the page.
 */
function openSignout() {
    let signout = document.getElementById('signout');
    if (signout.classList.contains('d-none')) {
        signout.classList.remove('d-none');
    } else {
        signout.classList.add('d-none');
    }
}

/**
 * Sends POST request to Django backend to logout user via token.
 * Redirects to Login page after successful logout.
 */
function logout() {
    fetch(baseUrl + 'logout/', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Authorization': " Token " + document.cookie.split('=')[1] },
        body: JSON.stringify("Oink")})
        .then(response => {response.json()
            .then(() => {
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "csrftoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                localStorage.removeItem('username');
                window.open('./login.html', '_self'); // Redirect to Login page
            })
        })
        .catch(error => {console.log(error)});
}


function openPage(pageName) {
    renderPageSpecificContent(pageName);
    hideAllPages(); // Needs to be called before showPage()!!!
    removeDarkMenu();
    showOnlySelectedPage(pageName);
    addMenuSelectionForPage(pageName);
}

/**
 * Content gets rendered to ensure the up-to-date information is displayed on the page.
 * @param {*} pageName as string.
 */
function renderPageSpecificContent(pageName) {
    pageName === 'summary' ? updateCounters() : "";
    pageName === 'contacts' ? renderContactList() : "";
    pageName === 'board' ? renderCards() : "";
    pageName === 'addtask' ? initNewTask() : ""; // TODO: Check if this is necessary
}


function hideAllPages() {
    pages.forEach(page => {
        let canvas = document.getElementById(`${page}`);
        canvas.classList.add('d-none');
    });
}

/**
 * Removes the dark class from all menu points on the left sidebar or the bottom menu.
 * Thus, only the selected menu point gets highlighted in darker color after this code is executed.
 */
function removeDarkMenu() {
    menus.forEach(menu => {
        let menupoint = document.getElementById(`${menu}`);
        if (menupoint.classList.contains('sidebar-menu-option-dark')) {
            menupoint.classList.remove('sidebar-menu-option-dark');
            menupoint.classList.add('sidebar-menu-option-light');
        }
    });
}


function showOnlySelectedPage(pageName) {
    let page = document.getElementById(`${pageName}`);
    page.classList.remove('d-none');
}


function addMenuSelectionForPage(pageName) {
    // Selected page gets highlighted in darker color
    if (pageName != 'help') {
        let menupoint = document.getElementById(`menu-${pageName}`);
        menupoint.classList.add('sidebar-menu-option-dark');
    }
}