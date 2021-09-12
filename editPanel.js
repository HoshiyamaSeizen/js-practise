// Отображение формы редактирования
const openInfo = (e) => {
	clearInfo();
	document.getElementById('createButtons').hidden = true;
	document.getElementById('changeButtons').hidden = false;
	document.getElementById('newItemBtn').disabled = false;
	phone.parentElement.style.visibility = 'hidden';
	curObj = data.find((obj) => obj.id === e.target.parentNode.id || obj.id === e.target.id);
	if (curObj) {
		firstName.value = curObj.name.firstName;
		lastName.value = curObj.name.lastName;
		about.value = curObj.about;
		eyeColor.value = curObj.eyeColor;
	}
};

// Отображение формы создания новой строки
const openCreationWindow = () => {
	document.getElementById('newItemBtn').disabled = true;
	if (curObj) {
		clearInfo();
		document.getElementById('changeButtons').hidden = true;
		document.getElementById('createButtons').hidden = false;
	}
	phone.parentElement.style.visibility = 'visible';
};

// Поиск изменений/проверка заполненности формы редактирования (создания) строки
const lookForChanges = () => {
	// Кнопка изменения доступна, только когда есть изменения и поля не пустые
	if (curObj)
		saveBtn.disabled =
			(curObj.name.firstName === firstName.value &&
				curObj.name.lastName === lastName.value &&
				curObj.about === about.value &&
				curObj.eyeColor === eyeColor.value) ||
			!firstName.value ||
			!lastName.value ||
			!about.value ||
			!eyeColor.value;
	// Кнопка создания доступна, только когда все поля заполнены
	else
		createBtn.disabled =
			!firstName.value || !lastName.value || !about.value || !eyeColor.value || !phone.value;
};

// Очистка формы
const clearInfo = () => {
	firstName.value = '';
	lastName.value = '';
	about.value = '';
	eyeColor.value = '';
	phone.value = '';
	saveBtn.disabled = true;
	createBtn.disabled = true;
	curObj = null;
};

// Сохранение изменений в строке таблицы
const saveInfo = () => {
	if (curObj) {
		data.forEach((obj) => {
			if (obj.id === curObj.id) {
				obj.name.firstName = firstName.value;
				obj.name.lastName = lastName.value;
				obj.about = about.value;
				obj.eyeColor = eyeColor.value;
			}
		});
		info = JSON.stringify(data);
		saveBtn.disabled = true;
		renderTable();
	}
};

// Удаление строки из таблицы
const deleteInfo = () => {
	if (curObj && confirm('Вы действительно хотите удалить этот элемент?')) {
		data = data.filter((obj) => obj.id !== curObj.id);
		info = JSON.stringify(data);
		clearInfo();
		renderTable();
	}
};

// Добавление новой строки в таблицу
const createInfo = () => {
	data.push({
		id: String(Math.floor(Math.random() * 100000)),
		name: {
			firstName: firstName.value,
			lastName: lastName.value,
		},
		phone: phone.value,
		about: about.value,
		eyeColor: eyeColor.value,
	});
	info = JSON.stringify(data);
	clearInfo();
	renderTable();
};
