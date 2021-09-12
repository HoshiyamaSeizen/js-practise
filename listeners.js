// Вывод постранично или на одной странице
const changeTableView = () => {
	if (changeView.attributes.view.value === '0') {
		changeView.attributes.view.value = 1;
		changeView.innerHTML = 'Отображать на одной странице';
		document.getElementById('pageInfo').hidden = false;
		pageView = true;
		changePage(1);
	} else {
		changeView.attributes.view.value = 0;
		changeView.innerHTML = 'Отображать на нескольких страницах';
		document.getElementById('pageInfo').hidden = true;
		pageView = false;
	}
	renderTable();
};

// Переход на другую страницу в постраничном выводе
const changePage = (p) => {
	if (page > 0 && page <= pageAmount) page = p;
	document.getElementById('prevPage').disabled = page === 1;
	document.getElementById('nextPage').disabled = page === pageAmount;
	document.getElementById('currentPage').innerHTML = page;
	renderTable();
};

// Отображение меню сокрытия столбцов
const showHideMenu = () =>
	(hideWindow.attributes.collapsed.value = !(hideWindow.attributes.collapsed.value === 'true'));
// Закрытие меню сокрытия столбцов при клике снаружи
document.addEventListener('click', (e) => {
	if (e.target.id !== 'hideBtn' && e.target.id !== 'hideWindow' && !hideWindow.contains(e.target))
		hideWindow.attributes.collapsed.value = true;
});
