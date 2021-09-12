var data = JSON.parse(info);

var table = document.getElementById('tbody');
var firstName = document.getElementById('firstName');
var lastName = document.getElementById('lastName');
var about = document.getElementById('about');
var eyeColor = document.getElementById('eyeColor');
var phone = document.getElementById('phone');
var saveBtn = document.getElementById('saveBtn');
var createBtn = document.getElementById('createBtn');
var hideWindow = document.getElementById('hideWindow');
var firstNameTitle = document.querySelector('.firstName.title');
var lastNameTitle = document.querySelector('.lastName.title');
var aboutTitle = document.querySelector('.about.title');
var eyeColorTitle = document.querySelector('.eyeColor.title');
var firstNameVisible = document.getElementById('firstNameVisible');
var lastNameVisible = document.getElementById('lastNameVisible');
var aboutVisible = document.getElementById('aboutVisible');
var eyeColorVisible = document.getElementById('eyeColorVisible');
var sortBtns = document.querySelectorAll('.sortBtn');
var changeView = document.getElementById('changeView');

var curObj = null;
var pageView = false;
var page = 1;
var pageAmount = 1;

// Создание ячейки таблицы для заданного столбца
const createTd = (field, value) => {
	var td = document.createElement('td');
	td.classList.add(field);
	td.innerHTML = value;
	if (field === 'eyeColor') td.style.color = value;
	return td;
};

// Вывод таблицы на экран
const renderTable = () => {
	table.innerHTML = ''; // Очистка таблицы после предыдущего выводв
	pageAmount = Math.ceil(data.length / 10); // Подсчёт кол-ва страниц для постраничного вывода

	// Сокрытие заголовков сокрытых столбцов
	firstNameTitle.hidden = !firstNameVisible.checked;
	lastNameTitle.hidden = !lastNameVisible.checked;
	aboutTitle.hidden = !aboutVisible.checked;
	eyeColorTitle.hidden = !eyeColorVisible.checked;

	//Создание элементов таблицы для каждого элемента JSON
	data.forEach((obj, index) => {
		// 10 строк на страницу при постраничном выводе, иначе все
		if (!pageView || Math.floor(index / 10) === page - 1) {
			var row = document.createElement('tr');
			row.id = obj.id;

			// Пропуск элементов сокрытых столбцов
			if (firstNameVisible.checked) row.appendChild(createTd('firstName', obj.name.firstName));
			if (lastNameVisible.checked) row.appendChild(createTd('lastName', obj.name.lastName));
			if (aboutVisible.checked) row.appendChild(createTd('about', obj.about));
			if (eyeColorVisible.checked) row.appendChild(createTd('eyeColor', obj.eyeColor));

			row.addEventListener('click', openInfo); // При клике открывается форма для изменения
			table.appendChild(row); // Добавление строки в таблицу;
		}
	});
};

// Добавление возможности сортировки для каждой колонки
sortBtns.forEach((el) => {
	el.addEventListener('click', () => {
		var direction = el.attributes.descending.value === 'true' ? 1 : -1; // Направление: 1(А-Я) и -1(Я-А)
		var column = el.attributes.column.value; // Выбранный столбец для сортировки

		// При сортировки одного столбца другие столбцы сбрасываются
		sortBtns.forEach((el) => {
			if (el.attributes.column.value !== column) {
				el.attributes.descending.value = true;
				el.attributes.sorted.value = false;
			}
		});

		// Непосредственно сортировка
		if (column === 'firstName' || column === 'lastName')
			data.sort((a, b) => {
				return a.name[column].localeCompare(b.name[column]) * direction;
			});
		else
			data.sort((a, b) => {
				return a[column].localeCompare(b[column]) * direction;
			});

		// Изменение атрибутов отсортированного столбца
		el.attributes.descending.value = !(el.attributes.descending.value === 'true');
		el.attributes.sorted.value = true;
		renderTable();
	});
});

renderTable();
