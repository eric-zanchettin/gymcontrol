const currentPage = window.location.pathname;
const menuItems = document.querySelectorAll('header div.links a');

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute('href'))) {
        item.classList.add('active');
    };
};

function paginate(selectedPage, totalPages) {

    let pages = [],
        oldPage = 0;

    for (let printablePage = 1; printablePage <= totalPages; printablePage++) {

        firstAndLastPage = printablePage == 1 || printablePage == totalPages;
        pagesAfter = printablePage <= selectedPage + 2;
        pagesBefore = printablePage >= selectedPage - 2;

        if (firstAndLastPage || pagesBefore && pagesAfter) {
            if (oldPage && (printablePage - oldPage) > 2 ) {
                pages.push('...');
            };
            
            if ((printablePage - oldPage) == 2) {
                pages.push(oldPage + 1);
            };
            pages.push(printablePage);

            oldPage = printablePage;
        };
    };

    return pages;
};

function createPagination(pagination) {
    const filter = pagination.dataset.filter;
    const page = +pagination.dataset.page;
    const total = +pagination.dataset.total;
    const pages = paginate(page, total);
    
    let elements = "";
    
    for (let page of pages) {
        if (String(page).includes('...')) {
            elements += `<span>${page}</span>`; 
        } else {
                if (filter) {
                    elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`;  
                } else {
                    elements += `<a href="?page=${page}">${page}</a>`;  
                };
            };
        };
    
    pagination.innerHTML = elements;
};

const pagination = document.querySelector(".pagination");

if (pagination) {
    createPagination(pagination);
};